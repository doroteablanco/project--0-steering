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
radio.onReceivedValue(function (name, value) {
    let angle = 0
    if (angle) {
        display.show(angle)
        if (logging) {
            led.toggle(4, 4)
            datalogger.log(datalogger.createCV("Angle Value - Actuator 1", angle))
        }
    }
})
let logging = false
let display: grove.TM1637 = null
radio.setGroup(21)
display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
logging = false
datalogger.setColumnTitles("Angle Value - Actuator 1")
basic.showIcon(IconNames.No)
basic.forever(function () {
	
})
