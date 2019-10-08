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

window.initializeCount = 0
function flashInitialize() {
    if (window.initializeCount == 8)
    {
        document.getElementById ("status").innerHTML = ""
        setTimeout (initDisappears, 500)
    }
    else
    {
        document.getElementById ("status").innerHTML = "Initializing" + '.'.repeat (initializeCount % 4)
        window.initializeCount += 1
        setTimeout (flashInitialize, 500)
    }
}

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
    btnhover (window.newGameSelectedOption + 12)
    switch (window.newGameSelectedOption) {    
        case 0: // 8
            btnhover (dir == 'up' ? 11 : 9); break;
        case 1: // 9
            btnhover (dir == 'up' ? 8 : 10); break;
        case 2: // 10
            btnhover (dir == 'up' ? 9 : 11); break;
        case 3: // 11
            btnhover (dir == 'up' ? 10 : 8); break;
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

function hideNewGamePhaseOut() {
    if (document.getElementById ("newgame").style ['opacity'] == '0')
    {
        return
    }
    else
    {
        document.getElementById ("newgame").style ['opacity'] = parseFloat (document.getElementById ("newgame").style ['opacity']) - 0.01
        id = setTimeout (showNewGamePhaseIn, 2)
    }
}

// Legacy function - remove after deployment //

function waitForInput() {
    if (document.getElementById ("welcome").style ['opacity'] == '0')
    {
        document.getElementById ("welcome").style ['display'] = 'none'
        id = setTimeout (showGameBoard, 250)
    }
    else
    {
        document.getElementById ("welcome").style ['opacity'] = parseFloat (document.getElementById ("welcome").style ['opacity']) - 0.01
        id = setTimeout (waitForInput, 3)
    }
}

function showGameBoard() {
    window.gameState = 'START'
    initialize();
    document.getElementById("gameboard").style ['display'] = 'block';

    load_canv = setInterval (function () {
        opacity = document.getElementById ("gameboard").style ['opacity']
        console.log(opacity);
        if (opacity == 1)
        {
            clearInterval (load_canv)
        }
        else
            document.getElementById ("gameboard").style ['opacity'] = parseFloat (opacity) + 0.01
    }, 1)
}