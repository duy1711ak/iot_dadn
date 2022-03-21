function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    basic.pause(100)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(100)
    serial.writeString("!7:HUMID:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(100)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        pins.digitalWritePin(DigitalPin.P4, 1)
        pins.digitalWritePin(DigitalPin.P5, 0)
    } else if (receivedNumber == 2) {
        pins.digitalWritePin(DigitalPin.P4, 0)
        pins.digitalWritePin(DigitalPin.P5, 1)
    } else {
    	
    }
})
function gas () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    basic.pause(100)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(100)
    serial.writeString("!7:HUMID:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(100)
}
function turn_led () {
	
}
basic.forever(function () {
    dht11()
    basic.pause(2000)
})
