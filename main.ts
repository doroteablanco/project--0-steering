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
input.onButtonPressed(Button.A, function () {
    logging = true
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    logging = false
    basic.showIcon(IconNames.No)
})
let logging = false
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
logging = false
datalogger.setColumnTitles("angle")
basic.showIcon(IconNames.No)
basic.forever(function () {
    display.show(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    if (logging) {
        led.toggle(4, 4)
        datalogger.log(datalogger.createCV("angle", display))
    }
})
