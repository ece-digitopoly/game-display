// uart.js
// Talk to STM32 using the Raspi serial module

/*

    Functions to be finished:
     - init_uart ()         (async)
     - read_from_STM (data) (blocking)

*/

const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

function init_uart () {
    window.stm32 = new Serial();
    window.stm32.open(() => {
        window.stm32.on('data', (data) => {
            process.stdout.write(data);
        });
    });
}
