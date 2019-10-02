// uart.js
// Talk to STM32 using the Raspi serial module

/*

    Functions to be finished:
     - init_uart () 
     - uart_control (stm32_json)
     - btnhover ()

*/

const Serial = require('raspi-serial').Serial;

function btnhover (btn) {
    switch (btn) {

        /* Turn on button hover */
        case 0: 
            $(".btn-nhc-anew").toggleClass ("btn-nhc-anew btn-hc-anew"); window.mainMenuSelectedOption = 0
            break;
        case 1: 
            $(".btn-nhc-load").toggleClass ("btn-nhc-load btn-hc-load"); window.mainMenuSelectedOption = 1
            break;
        case 2: 
            $(".btn-nhc-high").toggleClass ("btn-nhc-high btn-hc-high"); window.mainMenuSelectedOption = 2
            break;
        case 3: 
            $(".btn-nhc-cred").toggleClass ("btn-nhc-cred btn-hc-cred"); window.mainMenuSelectedOption = 3
            break;
        /** **/

        /* Turn off button hover */
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
        /** **/
    }
}

function init_uart () {
    window.stm32 = new Serial({baudRate: 115200});
    window.stm32.open(() => {
        message = ""
        window.stm32.on('data', (data) => {
            try {
                message = JSON.parse (message + data.toString().replace (/\0/g, ''))
		console.log (message)
                uart_control (message)
                message = ""
            }
            catch (ex) {
                message += data.toString().replace (/\0/g, '')
            }
        });
    });
}

function uart_control (stm32_json) {
    switch (stm32_json ['action']) {
        case 'scroll':
            switch (window.gameState) {
                case 'MAIN':
                    mainMenuScroll (stm32_json ['direction'])
                break;
            }
            break;
    }
}

init_uart()
