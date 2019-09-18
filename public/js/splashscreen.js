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
        document.getElementById ("mainmenu").style ['display'] = 'block';
        setTimeout (showMainMenu, 500)
    }
    else
    {
        loc = parseFloat (document.getElementById ("welcome").style ['padding-top'].replace ('px', ''))
        loc -= 0.5
        console.log (loc)
        document.getElementById ("welcome").style ['padding-top'] = loc + 'px'
        setTimeout (initDisappears, (150.0 - loc) / 15.0)
    }
}

function showMainMenu() {
    if (document.getElementById ("mainmenu").style ['opacity'] == '1')
    {
        // setTimeout (waitForInput, 1000)
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