// uart.js
// Talk to STM32 using the Raspi serial module

/*

    Functions to be finished:
     - init_uart () 
     - uart_control (stm32_json)
     - btnhover ()

*/

// const Serial = require('raspi-serial').Serial;

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
            $(".playerfundch").toggleClass ("playerfundch playerfundch-hover"); window.newGameSelectedOption = 1
            break;
        case 10: 
            $(".bankfund").toggleClass ("bankfund bankfund-hover"); window.newGameSelectedOption = 2
            break;
        case 11:
            $(".btn-nhc-createnewgame").toggleClass ("btn-nhc-createnewgame btn-hc-createnewgame"); window.newGameSelectedOption = 3
        break;
        case 12:
            $(".btn-nhc-backmainmenu").toggleClass ("btn-nhc-backmainmenu btn-hc-backmainmenu"); window.newGameSelectedOption = 4
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
        case 13: 
            $(".turnnumber-hover").toggleClass ("turnnumber-hover turnnumber")
            break;
        case 14: 
            $(".playerfundch-hover").toggleClass ("playerfundch-hover playerfundch")
            break;
        case 15: 
            $(".bankfund-hover").toggleClass ("bankfund-hover bankfund")
            break;
        case 16: 
            $(".btn-hc-createnewgame").toggleClass ("btn-hc-createnewgame btn-nhc-createnewgame")
            break;
        case 17: 
            $(".btn-hc-backmainmenu").toggleClass ("btn-hc-backmainmenu btn-nhc-backmainmenu")
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

document.onkeydown = function (e) {
    if (e.keyCode == 13) {
        // enters
        uart_control ({"action": "click"})
    }
    else if (e.keyCode == 38) {
        // up
        uart_control ({"action": "scroll", "direction": "up"})
    }
    else if (e.keyCode == 40) {
        // down
        uart_control ({"action": "scroll", "direction": "down"})
    }
}

function uart_control (stm32_json) {
    switch (stm32_json ['action']) {
        case 'scroll':
            switch (window.gameState) {
                case 'MAIN':
                    mainMenuScroll (stm32_json ['direction'])
                break;
                case 'NEWGAME':
                    check_turnnumber = $(".turnnumber-hover").length != 0 && $(".turnnumber-hover").css ('text-decoration').includes ('underline')
                    check_playerfundch = $(".playerfundch-hover").length != 0 && $(".playerfundch-hover").css ('text-decoration').includes ('underline')
                    check_bankfund = $(".bankfund-hover").length != 0 && $(".bankfund-hover").css ('text-decoration').includes ('underline')

                    // if the option was selected, scroll through the options for each setting
                    if (check_turnnumber) {
                        changeNewGameTextbox (0, stm32_json ['direction'])
                        window.turnnumber = $(".turnnumber-hover").html()
                    }
                    else if (check_playerfundch) {
                        changeNewGameTextbox (1, stm32_json ['direction'])  
                        window.playerfundch = $(".playerfundch-hover").html()
                    }
                    else if (check_bankfund) {
                        changeNewGameTextbox (2, stm32_json ['direction'])
                        window.bankfund = $(".bankfund-hover").html()
                    }
                    // else scroll through settings
                    else {
                        newGameScroll (stm32_json ['direction'])
                    }
                break;
                case 'GAME':
                    gamePlayKeyHandler (stm32_json)
                break;
            }
        break;
        case 'dicerolling':
            detectedDiceRoll ()
            break;
        case 'diceroll':
            handleDiceRoll (stm32_json ['roll'])
            break;
        case 'piecemoved':
            landed_on_tile()
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
                        case 0: if ($(".turnnumber-hover").css ('text-decoration').includes ('underline')) {
                            $(".turnnumber-hover").css ('text-decoration', '');
                        }
                        else {
                            $(".turnnumber-hover").css ('text-decoration', 'underline');
                        }
                        break;
                        case 1: if ($(".playerfundch-hover").css ('text-decoration').includes ('underline')) {
                            $(".playerfundch-hover").css ('text-decoration', '');
                        }
                        else {
                            $(".playerfundch-hover").css ('text-decoration', 'underline');
                        }
                        break;
                        case 2: if ($(".bankfund-hover").css ('text-decoration').includes ('underline')) {
                            $(".bankfund-hover").css ('text-decoration', '');
                        }
                        else {
                            $(".bankfund-hover").css ('text-decoration', 'underline');
                        }
                        break;
                        case 3: $(".btn-hc-createnewgame").toggleClass ("btn-hc-createnewgame btn-nhc-createnewgame"); hideNewGamePhaseOutToGameBoard(); break;
                        case 4: $(".btn-hc-backmainmenu").toggleClass ("btn-hc-backmainmenu btn-nhc-backmainmenu"); hideNewGamePhaseOutToMainMenu(); break;
                    }
                break;
                case 'GAME':
                    gamePlayKeyHandler (stm32_json)
                break;
            }
        break;
    }
}

// init_uart()
