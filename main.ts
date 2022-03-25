function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    temp = NPNBitKit.DHT11Temp()
    humi = NPNBitKit.DHT11Hum()
    NPNLCD.ShowString("Temp:", 0, 0)
    NPNLCD.ShowNumber(temp, 5, 0)
    NPNLCD.ShowString("Humi:", 8, 0)
    NPNLCD.ShowNumber(humi, 13, 0)
    serial.writeString("!7:TEMP:" + temp + "#")
    basic.pause(100)
    serial.writeString("!7:HUMID:" + humi + "#")
    basic.pause(100)
}
function light_sensor () {
    light_level = pins.analogReadPin(AnalogPin.P4)
    if (light_level <= 300) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P9, 1)
        if (tmp_light != 1) {
            serial.writeString("!13:LIGHT:" + "1" + "#")
            tmp_light = 1
        }
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P9, 0)
        if (tmp_light != 0) {
            serial.writeString("!13:LIGHT:" + "0" + "#")
            tmp_light = 0
        }
    }
}
function door () {
    if (tmp_on == 1) {
        if (NPNBitKit.ButtonDoorOpen(DigitalPin.P1)) {
            pins.digitalWritePin(DigitalPin.P5, 1)
            pins.digitalWritePin(DigitalPin.P6, 0)
            if (tmp_door != 1) {
                serial.writeString("!8:MAGNETIC:" + "1" + "#")
                tmp_door = 1
            }
        } else {
            pins.digitalWritePin(DigitalPin.P5, 0)
            pins.digitalWritePin(DigitalPin.P6, 1)
            if (tmp_door != 0) {
                serial.writeString("!8:MAGNETIC:" + "0" + "#")
                tmp_door = 0
            }
        }
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P6, 0)
    }
}
function gas () {
    gas_raw = pins.analogReadPin(AnalogPin.P10)
    gas_percent = Math.map(gas_raw, 0, 1023, 0, 100)
    NPNLCD.ShowNumber(gas_percent, 0, 1)
    if (gas_percent >= 54) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        if (tmp_gas != 1) {
            serial.writeString("!8:GAS:" + "1" + "#")
            tmp_gas = 1
        }
    } else {
        pins.digitalWritePin(DigitalPin.P2, 0)
        if (tmp_gas != 0) {
            serial.writeString("!8:GAS:" + "0" + "#")
            tmp_gas = 0
        }
    }
}
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "s") {
        tmp_light = 2
        tmp_door = 2
        tmp_gas = 2
        basic.pause(100)
    } else if (cmd == "door1") {
        tmp_on = 1
        basic.pause(100)
    } else if (cmd == "door0") {
        tmp_on = 0
        basic.pause(100)
    } else {
    	
    }
})
let cmd = ""
let gas_percent = 0
let gas_raw = 0
let light_level = 0
let humi = 0
let temp = 0
let tmp_on = 0
let tmp_gas = 0
let tmp_door = 0
let tmp_light = 0
led.enable(false)
NPNLCD.LcdInit()
tmp_light = 2
tmp_door = 2
tmp_gas = 2
tmp_on = 0
basic.pause(100)
basic.forever(function () {
    door()
    gas()
    light_sensor()
    dht11()
    basic.pause(5000)
})
