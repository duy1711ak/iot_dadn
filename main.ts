let gas_val = 0
let gas_mV = 0
let gas_percent = 0
let cmd = ""
function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    basic.pause(100)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(100)
    serial.writeString("!7:HUMID:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(100)
}
function door () {
    if (NPNBitKit.ButtonDoorOpen(DigitalPin.P3)) {
        NPNBitKit.Buzzer(DigitalPin.P6, true)
        serial.writeString("!8:MAGNETIC:" + "1" + "#")
    } else {
        NPNBitKit.Buzzer(DigitalPin.P6, false)
        serial.writeString("!8:MAGNETIC:" + "0" + "#")
    }
    basic.pause(100)
}
function gas () {
    gas_val = pins.analogReadPin(AnalogPin.P3)
    gas_mV = Math.map(0, 0, 1023, 0, 330)
    gas_percent = Math.map(0, 0, 1023, 0, 100)
    serial.writeString("!23:GAS:" + gas_percent + "#")
    basic.pause(100)
}
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "0") {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
})
basic.forever(function () {
	
})
