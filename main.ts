basic.forever(function () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    basic.pause(500)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(1000)
    serial.writeString("!7:HUMID:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(2000)
})
