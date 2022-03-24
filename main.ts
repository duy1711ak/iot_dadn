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
        pins.digitalWritePin(DigitalPin.P3, 1)
        pins.digitalWritePin(DigitalPin.P4, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P3, 0)
        pins.digitalWritePin(DigitalPin.P4, 0)
    }
}
function door () {
    if (NPNBitKit.ButtonDoorOpen(DigitalPin.P1)) {
        pins.digitalWritePin(DigitalPin.P5, 1)
        pins.digitalWritePin(DigitalPin.P6, 0)
        serial.writeString("!8:MAGNETIC:" + "1" + "#")
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P6, 1)
        serial.writeString("!8:MAGNETIC:" + "0" + "#")
    }
}
function gas () {
    gas_raw = pins.analogReadPin(AnalogPin.P10)
    gas_percent = Math.map(gas_raw, 0, 1023, 0, 100)
    if (gas_percent >= 54) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        serial.writeString("!23:GAS:" + "1" + "#")
    } else {
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
}
let gas_percent = 0
let gas_raw = 0
let light_level = 0
let humi = 0
let temp = 0
led.enable(false)
NPNLCD.LcdInit()
basic.forever(function () {
    gas()
    dht11()
    door()
    light_sensor()
    basic.pause(1000)
})
