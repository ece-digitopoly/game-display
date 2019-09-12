load_disp = setInterval (function () {
    opacity = document.getElementById ("welcome").style ['opacity']
    if (opacity == 1)
    {
        setTimeout (flashInitialize, 1500)
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
    if (document.getElementById ("welcome").style ['opacity'] == '0')
    {
        document.getElementById ("welcome").style ['display'] = 'none'
        setTimeout (showGameBoard, 1000)
    }
    else
    {
        loc = parseFloat (document.getElementById ("welcome").style ['padding-top'].replace ('px', ''))
        loc -= 0.5
        document.getElementById ("welcome").style ['padding-top'] = loc + 'px'
        document.getElementById ("welcome").style ['opacity'] = parseFloat (document.getElementById ("welcome").style ['opacity']) - 0.01
        setTimeout (initDisappears, 5)
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