def dht11():
    global temp, humi
    NPNBitKit.dht11_read(DigitalPin.P0)
    temp = NPNBitKit.dht11_temp()
    humi = NPNBitKit.dht11_hum()
    NPNLCD.show_string("Temp:", 0, 0)
    NPNLCD.show_number(temp, 5, 0)
    NPNLCD.show_string("Humi:", 8, 0)
    NPNLCD.show_number(humi, 13, 0)
    serial.write_string("!7:TEMP:" + str(temp) + "#")
    basic.pause(100)
    serial.write_string("!7:HUMID:" + str(humi) + "#")
    basic.pause(100)
def light_sensor():
    global light_level, tmp_light
    light_level = pins.analog_read_pin(AnalogPin.P4)
    if light_level <= 300:
        pins.digital_write_pin(DigitalPin.P8, 1)
        pins.digital_write_pin(DigitalPin.P9, 1)
        if tmp_light != 1:
            serial.write_string("!13:LIGHT:" + "1" + "#")
            tmp_light = 1
    else:
        pins.digital_write_pin(DigitalPin.P8, 0)
        pins.digital_write_pin(DigitalPin.P9, 0)
        if tmp_light != 0:
            serial.write_string("!13:LIGHT:" + "0" + "#")
            tmp_light = 0
def door():
    global tmp_door
    if tmp_on == 1:
        if NPNBitKit.button_door_open(DigitalPin.P1):
            pins.digital_write_pin(DigitalPin.P5, 1)
            pins.digital_write_pin(DigitalPin.P6, 0)
            if tmp_door != 1:
                serial.write_string("!8:MAGNETIC:" + "1" + "#")
                tmp_door = 1
        else:
            pins.digital_write_pin(DigitalPin.P5, 0)
            pins.digital_write_pin(DigitalPin.P6, 1)
            if tmp_door != 0:
                serial.write_string("!8:MAGNETIC:" + "0" + "#")
                tmp_door = 0
    else:
        pins.digital_write_pin(DigitalPin.P5, 0)
        pins.digital_write_pin(DigitalPin.P6, 0)
def gas():
    global gas_raw, gas_percent, tmp_gas
    gas_raw = pins.analog_read_pin(AnalogPin.P10)
    gas_percent = Math.map(gas_raw, 0, 1023, 0, 100)
    NPNLCD.show_number(gas_percent, 0, 1)
    if gas_percent >= 54:
        pins.digital_write_pin(DigitalPin.P2, 1)
        if tmp_gas != 1:
            serial.write_string("!8:GAS:" + "1" + "#")
            tmp_gas = 1
    else:
        pins.digital_write_pin(DigitalPin.P2, 0)
        if tmp_gas != 0:
            serial.write_string("!8:GAS:" + "0" + "#")
            tmp_gas = 0

def on_data_received():
    global cmd, tmp_light, tmp_door, tmp_gas, tmp_on
    cmd = serial.read_until(serial.delimiters(Delimiters.HASH))
    if cmd == "s":
        tmp_light = 2
        tmp_door = 2
        tmp_gas = 2
        basic.pause(100)
    elif cmd == "door1":
        tmp_on = 1
        basic.pause(100)
    elif cmd == "door0":
        tmp_on = 0
        basic.pause(100)
    else:
        pass
serial.on_data_received(serial.delimiters(Delimiters.HASH), on_data_received)

cmd = ""
gas_percent = 0
gas_raw = 0
light_level = 0
humi = 0
temp = 0
tmp_on = 0
tmp_gas = 0
tmp_door = 0
tmp_light = 0
led.enable(False)
NPNLCD.lcd_init()
tmp_light = 2
tmp_door = 2
tmp_gas = 2
tmp_on = 0
basic.pause(100)

def on_forever():
    door()
    gas()
    light_sensor()
    dht11()
    basic.pause(5000)
basic.forever(on_forever)
