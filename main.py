def on_log_full():
    global logging
    logging = False
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
datalogger.on_log_full(on_log_full)

def on_button_pressed_a():
    global logging
    logging = True
    basic.show_icon(IconNames.YES)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global logging
    logging = False
    basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.B, on_button_pressed_b)

logging = False
display = grove.create_display(DigitalPin.P1, DigitalPin.P15)
logging = False
datalogger.set_column_titles("angle")
basic.show_icon(IconNames.NO)

def on_forever():
    display.show(pins.map(pins.analog_read_pin(AnalogPin.P0), 0, 1023, 0, 180))
    if logging:
        led.toggle(4, 4)
        datalogger.log(datalogger.create_cv("angle", pins.analog_read_pin(AnalogPin.P0)))
basic.forever(on_forever)
