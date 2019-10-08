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
        /* Turn on textarea hover */
        case 8: 
            $(".turnnumber").toggleClass ("turnnumber turnnumber-hover"); window.newGameSelectedOption = 0
            break;
        case 9: 
            $(".playerfund").toggleClass ("playerfund playerfund-hover"); window.newGameSelectedOption = 1
            break;
        case 10: 
            $(".bankfund").toggleClass ("bankfund bankfund-hover"); window.newGameSelectedOption = 2
            break;
        case 11:
            $(".btn-nhc-createnewgame").toggleClass ("btn-nhc-createnewgame btn-hc-createnewgame"); window.newGameSelectedOption = 3
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
        /* Turn off textarea hover */
        case 12: 
            $(".turnnumber-hover").toggleClass ("turnnumber-hover turnnumber")
            break;
        case 13: 
            $(".playerfund-hover").toggleClass ("playerfund-hover playerfund")
            break;
        case 14: 
            $(".bankfund-hover").toggleClass ("bankfund-hover bankfund")
            break;
        case 15: 
            $(".btn-hc-createnewgame").toggleClass ("btn-hc-createnewgame btn-nhc-createnewgame")
            break;
        /** **/
    }
}

function init_uart () {
    window.stm32 = new Serial({baudRate: 115200});
    window.stm32.open(() => {
        window.stm32.on('data', (data) => {
            try {
                window.stm32.message = JSON.parse (window.stm32.message + data.toString().replace (/\0/g, ''))
                console.log ("Parsed as JSON: " + JSON.stringify (window.stm32.message))
                uart_control (window.stm32.message)
                window.stm32.message = ""
            }
            catch (ex) {
                console.log (data.toString())
                window.stm32.message += data.toString().replace (/\0/g, '')
                if (window.stm32.message.includes ("}")) {
                    try {
                        uart_control (JSON.parse (window.stm32.message))
                    }
                    catch (ex) {
                        console.log ("Full message received, but still got an error parsing: " + window.stm32.message)
                    }
                    window.stm32.message = ""
                }
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
                case 'NEWGAME':
                    newGameScroll (stm32_json ['direction'])
                break;
            }
        break;
        case 'poweroff':
            document.getElementById("welcome").style.display = "none";
            document.getElementById("gameboard").style.display = "none";
            document.getElementById("div_poweroff").style.opacity = 0
            document.getElementById("div_poweroff").style.display = "block";
            openSettingsOpacityInterval = setInterval (function () {
                if (document.getElementById("div_poweroff").style.opacity == 1.0)
                    clearInterval (openSettingsOpacityInterval)
                else
                {
                    opacity = parseFloat (document.getElementById("div_poweroff").style.opacity)
                    document.getElementById("div_poweroff").style.opacity = opacity + 0.1
                }
            }, 4)
            setTimeout (function () {
                location.reload()
            }, 3000);
        break;
        case 'click':
            switch (window.gameState) {
                case 'MAIN':
                    switch (window.mainMenuSelectedOption) {
                        case 0: showNewGame(); break;
                        case 1: showLoadGame(); break;
                        case 2: showHighScore(); break;
                        case 3: showCredits(); break;
                    }
                break;
                case 'NEWGAME':
                    switch (window.newGameSelectedOption) {
                        case 0: if (document.getElementsByClassName ("").classlist) {

                        }
                        break;
                        case 1: if (document.getElementsByClassName ("").classlist) {

                        }
                        break;
                        case 2: if (document.getElementsByClassName ("").classlist) {

                        }
                        break;
                        case 3: hideNewGamePhaseOut(); showGameBoard(); break;
                    }  
                break;
            }
        break;
    }
}

init_uart()
