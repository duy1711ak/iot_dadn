let door_status = 0
basic.forever(function () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    basic.pause(500)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(500)
    serial.writeString("!7:HUMID:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(500)
    serial.writeString("!1:DOOR:" + pins.digitalReadPin(DigitalPin.P1) + "#")
    door_status = pins.digitalReadPin(DigitalPin.P1)
    basic.pause(500)
    if (door_status == 0) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(500)
})
