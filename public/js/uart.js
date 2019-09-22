// uart.js
// Talk to STM32 using the Raspi serial module

/*

    Functions to be finished:
     - init_uart ()         (async)
     - read_from_STM (data) (blocking)

*/

const Serial = require('raspi-serial').Serial;

function btnhover (btn) {
    switch (btn) {
        case 0: 
            $(".btn-nhc-anew").toggleClass ("btn-nhc-anew btn-hc-anew")
            break;
        case 1: 
            $(".btn-nhc-load").toggleClass ("btn-nhc-load btn-hc-load")
            break;
        case 2: 
            $(".btn-nhc-high").toggleClass ("btn-nhc-high btn-hc-high")
            break;
        case 3: 
            $(".btn-nhc-cred").toggleClass ("btn-nhc-cred btn-hc-cred")
            break;
        case 4: 
            $(".btn-hc-anew").toggleClass ("btn-hc-anew btn-nhc-anew")
            break;
        case 5: 
            $(".btn-hc-load").toggleClass ("btn-hc-load btn-nhc-load")
            break;
        case 6: 
            $(".btn-hc-high").toggleClass ("btn-hc-high btn-nhc-high")
            break;
        case 7: 
            $(".btn-hc-cred").toggleClass ("btn-hc-cred btn-nhc-cred")
            break;
    }
}

function init_uart () {
    window.stm32 = new Serial();
    window.stm32.open(() => {
        window.stm32.on('data', (data) => {
            process.stdout.write(data);
        });
    });
}
