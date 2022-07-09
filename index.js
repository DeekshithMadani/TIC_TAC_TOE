const board = document.getElementById("board");
const gridItem = document.getElementsByClassName("grid-item");
const refreshBtn = document.getElementById("refresh-btn");
let cp = 'player-1';
let filled = [];
let posValue = {};
let horway = [0, 0, 0];
let verway = [0, 0, 0];
let crossway = [0, 0];
let flag=true;
let undoFlag=true;

refreshBtn.addEventListener("click",refresh);


for (let i = 0; i < gridItem.length; i++) {
    gridItem[i].addEventListener("click", function () {
        cp_bkp = cp;
        if (cp == 'player-1' && !filled.includes(i)) {
            gridItem[i].innerText = 'X';
            posValue[i] = 1;
            cp = "player-2";
            filled.push(i);
            undoFlag = true;
            //console.log(posValue);
        }
        else if (!filled.includes(i)) {
            gridItem[i].innerText = 'O';
            cp = "player-1";
            posValue[i] = -1;
            filled.push(i);
            undoFlag = true;
            //console.log(posValue);
        }
        //checkwin(cp_bkp, filled) 
        setTimeout(() => { checkwin(cp_bkp, filled) }, 0);
    })
}

function checkwin(cp, filled) {
    horway[0] = posValue[0] + posValue[1] + posValue[2];
    horway[1] = posValue[3] + posValue[4] + posValue[5];
    horway[2] = posValue[6] + posValue[7] + posValue[8];

    verway[0] = posValue[0] + posValue[3] + posValue[6];
    verway[1] = posValue[1] + posValue[4] + posValue[7];
    verway[2] = posValue[2] + posValue[5] + posValue[8];

    crossway[0] = posValue[0] + posValue[4] + posValue[8];
    crossway[1] = posValue[2] + posValue[4] + posValue[6];


    if (cp == 'player-1') {
        if (horway.includes(3) || verway.includes(3) || crossway.includes(3)) {
            alert("player 1 wins");
            flag=false;
            refresh();
        }
    }
    else if (cp == 'player-2') {
        if (horway.includes(-3) || verway.includes(-3) || crossway.includes(-3)) {
            alert("player 2 wins");
            flag=false;
            refresh();
        }
    }

    if (filled.includes(0) &&
        filled.includes(1) &&
        filled.includes(2) &&
        filled.includes(3) &&
        filled.includes(4) &&
        filled.includes(5) &&
        filled.includes(6) &&
        filled.includes(7) &&
        filled.includes(8) &&
        flag) {
        alert("No player wins");
        refresh();
    }
    flag=true;
}

function refresh() {
    cp = 'player-1';
    filled = [];
    posValue = {};
    horway = [0, 0, 0];
    verway = [0, 0, 0];
    crossway = [0, 0];
    for (let i = 0; i < gridItem.length; i++) {
        gridItem[i].innerText = '';
    }
}


function undo() {
    if(!undoFlag) {
        return
    }
    undoFlag=false;
    k = filled.pop();
    delete posValue[k];
    gridItem[k].innerText='';
    if(cp=='player-1') {
        cp='player-2'
    }
    else {
        cp='player-1'
    }
}