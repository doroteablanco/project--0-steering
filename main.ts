radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        logging = true
        basic.showIcon(IconNames.Yes)
    } else {
        logging = false
        basic.showIcon(IconNames.No)
    }
})
datalogger.onLogFull(function () {
    logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
let logging = false
radio.setGroup(21)
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
logging = false
datalogger.setColumnTitles("Angle Value")
basic.showIcon(IconNames.No)
basic.forever(function () {
    display.show(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    radio.sendNumber(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    if (logging) {
        led.toggle(4, 4)
        datalogger.log(datalogger.createCV("Angle Value", pins.map(
        pins.analogReadPin(AnalogPin.P0),
        0,
        1023,
        0,
        180
        )))
    }
})
