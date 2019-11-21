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

function changeNewGameTextbox (ch, dir) {
    switch (ch) {
        case 0:
            switch ($(".turnnumber-hover").html()) 
            {
                case "50":
                    $(".turnnumber-hover").html (dir == 'up' ? "500" : "100")
                    break;
                case "100":
                    $(".turnnumber-hover").html (dir == 'up' ? "50" : "200")
                    break;
                case "200":
                    $(".turnnumber-hover").html (dir == 'up' ? "100" : "300")
                    break;
                case "300":
                    $(".turnnumber-hover").html (dir == 'up' ? "200" : "500")
                    break;
                case "500":
                    $(".turnnumber-hover").html (dir == 'up' ? "300" : "50")
                    break;
            }
        break;

        case 1:
            switch ($(".playerfundch-hover").html()) 
            {
                case "$1000":
                    $(".playerfundch-hover").html (dir == 'up' ? "$5000" : "$1500")
                    break;
                case "$1500":
                    $(".playerfundch-hover").html (dir == 'up' ? "$1000" : "$2000")
                    break;
                case "$2000":
                    $(".playerfundch-hover").html (dir == 'up' ? "$1500" : "$2500")
                    break;
                case "$2500":
                    $(".playerfundch-hover").html (dir == 'up' ? "$2000" : "$5000")
                    break;
                case "$5000":
                    $(".playerfundch-hover").html (dir == 'up' ? "$2500" : "$1000")
                    break;
            }
        break;

        case 2:
            switch ($(".bankfund-hover").html()) 
            {
                case "$10000":
                    $(".bankfund-hover").html (dir == 'up' ? "$100000" : "$15000")
                    break;
                case "$15000":
                    $(".bankfund-hover").html (dir == 'up' ? "$10000" : "$30000")
                    break;
                case "$30000":
                    $(".bankfund-hover").html (dir == 'up' ? "$15000" : "$50000")
                    break;
                case "$50000":
                    $(".bankfund-hover").html (dir == 'up' ? "$30000" : "$100000")
                    break;
                case "$100000":
                    $(".bankfund-hover").html (dir == 'up' ? "$50000" : "$10000")
                    break;
            }
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
	
}
