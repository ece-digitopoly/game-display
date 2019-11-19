load_disp = setInterval (function () {
    opacity = document.getElementById ("welcome").style ['opacity']
    if (opacity == 1)
    {
        // setTimeout (flashInitialize, 1500)
        setTimeout (initDisappears, 1500)
        clearInterval (load_disp)
    }
    else
        document.getElementById ("welcome").style ['opacity'] = parseFloat (opacity) + 0.01
}, 1)

function initDisappears() {
    if (document.getElementById ("welcome").style ['padding-top'] == '50px')
    {
        document.getElementById ("mainmenu").style ['display'] = 'inline';
        setTimeout (showMainMenu, 500)
    }
    else
    {
        loc = parseFloat (document.getElementById ("welcome").style ['padding-top'].replace ('px', ''))
        loc -= 0.5
        document.getElementById ("welcome").style ['padding-top'] = loc + 'px'
        setTimeout (initDisappears, (150.0 - loc) / 15.0)
    }
}

function showMainMenu() {
    if (document.getElementById ("mainmenu").style ['opacity'] == '1')
    {
        window.gameState = 'MAIN'
        btnhover (0);
    }
    else
    {
        loc = parseFloat (document.getElementById ("welcome").style ['padding-top'].replace ('px', ''))
        loc += 1.0
        if (document.getElementById ("mainmenu").style ['opacity'] >= 0)
            document.getElementById ("mainmenu").style ['padding-top'] = loc + 'px'
        document.getElementById ("mainmenu").style ['opacity'] = parseFloat (document.getElementById ("mainmenu").style ['opacity']) + 0.01
        setTimeout (showMainMenu, 3)
    }
}

function mainMenuScroll (dir) {
    btnhover (window.mainMenuSelectedOption + 4)
    switch (window.mainMenuSelectedOption) {    
        case 0:
            btnhover (dir == 'up' ? 3 : 1); break;
        case 1:
            btnhover (dir == 'up' ? 0 : 2); break;
        case 2:
            btnhover (dir == 'up' ? 1 : 3); break;
        case 3:
            btnhover (dir == 'up' ? 2 : 0); break;
    }
}

function newGameScroll (dir) {
    // deselect
    btnhover (window.newGameSelectedOption + 13)
    // select
    switch (window.newGameSelectedOption) {    
        case 0: // 13
            btnhover (dir == 'up' ? 12 : 9); break;
        case 1: // 14
            btnhover (dir == 'up' ? 8 : 10); break;
        case 2: // 15
            btnhover (dir == 'up' ? 9 : 11); break;
        case 3: // 16
            btnhover (dir == 'up' ? 10 : 12); break;
        case 4: // 17
            btnhover (dir == 'up' ? 11 : 8); break;
    }
}

function changeNewGameTextbox (ch) {
    switch (ch) {
        case 0:            
            break;

        case 1:
            break;

        case 2:
            break;
    }
}

function showNewGame() {
    if (document.getElementById ("welcome").style ['opacity'] == '0')
    {
        btnhover (8)
        window.gameState = 'NEWGAME'

        document.getElementById ("welcome").style ['display'] = 'none'
        document.getElementById ("newgame").style ['display'] = 'block'
        showNewGamePhaseIn()
    }
    else
    {
        document.getElementById ("welcome").style ['opacity'] = parseFloat (document.getElementById ("welcome").style ['opacity']) - 0.01
        id = setTimeout (showNewGame, 2)
    }
}

function showNewGamePhaseIn() {
    if (document.getElementById ("newgame").style ['opacity'] == '1')
    {
        return
    }
    else
    {
        document.getElementById ("newgame").style ['opacity'] = parseFloat (document.getElementById ("newgame").style ['opacity']) + 0.01
        id = setTimeout (showNewGamePhaseIn, 2)
    }
}

function hideNewGamePhaseOutToGameBoard() {
    if (document.getElementById ("newgame").style ['opacity'] == '0')
    {
        document.getElementById ("newgame").style ['display'] = 'none'
        showGameBoard()
        return
    }
    else
    {
        document.getElementById ("newgame").style ['opacity'] = parseFloat (document.getElementById ("newgame").style ['opacity']) - 0.01
        id = setTimeout (hideNewGamePhaseOutToGameBoard, 2)
    }
}

function hideNewGamePhaseOutToMainMenu() {
    if (document.getElementById ("newgame").style ['opacity'] == '0')
    {
        document.getElementById ("newgame").style ['display'] = 'none'
        document.getElementById ("welcome").style ['display'] = 'block'
        showMainMenu()
        return
    }
    else
    {
        document.getElementById ("newgame").style ['opacity'] = parseFloat (document.getElementById ("newgame").style ['opacity']) - 0.01
        document.getElementById ("welcome").style ['opacity'] = parseFloat (document.getElementById ("welcome").style ['opacity']) + 0.01
        id = setTimeout (hideNewGamePhaseOutToMainMenu, 2)
    }
}

function showGameBoard() {
    window.gameState = 'START'
    $("#gameboard").css ('display', 'flex')
    $("#gameboard").css ('opacity', '1')
    $("#overlay").css ('display', 'flex')
    $("#overlay").css ('opacity', '1')
    $("#border").css ('display', 'flex')
    $("#border").css ('opacity', '1')
    init_board()

    setTimeout (function () {
        uart_control ({"action": "dicerolling"})
    }, 2000)
    
    setTimeout (function () {
        uart_control ({"action": "diceroll", "roll": ROLL_TEST.toString()})
    }, 4000)    // Assume motor movement has started
    
    setTimeout (function () {
        uart_control ({"action": "piecemoved"})
    }, 6000)    // Assume motor movement has started
}
