"use strict";
document.body.onload = addElement;
let board = document.getElementById('gameBoard');
let buttomSmile = document.getElementById('button');
let scoreboardStopwatch = document.getElementById('scoreboardMeaningZero');
let taimer = document.getElementById('taimer')

let nombersArroundsBomb = {};
let coordinatesElements = [];
let coordinatesNumber = [];
let isEndGame = false;
let isInitialClick = true;

let timer
let sum = 0
let scoreboardMeaningLibrary = {
    0: 'scoreboardMeaningZero',
    1: 'scoreboardMeaningOne',
    2: 'scoreboardMeaningTwo',
    3: 'scoreboardMeaningThree',
    4: 'scoreboardMeaningFour',
    5: 'scoreboardMeaningFive',
    6: 'scoreboardMeaningSix',
    7: 'scoreboardMeaningSeven',
    8: 'scoreboardMeaningEight',
    9: 'scoreboardMeaningNine',
}


function renderNumericFields(conter, arrElements){
    let stringCounter = String(conter)
    let startConterRender = 0
    arrElements.forEach((numeritem,index)=>{
        numeritem.classList.add('scoreboardMeaningZero');
        numeritem.classList.add('numeric');
        if(arrElements.length - index <= stringCounter.length){
            let classPotFix = scoreboardMeaningLibrary[+stringCounter[startConterRender]]
            numeritem.classList.add(classPotFix)
            console.log(classPotFix);
            startConterRender++
            return
        }

        numeritem.classList.add('scoreboardMeaningZero')
    })
}

function renderscoreboardMeaning(){
    taimer.querySelectorAll('.numeric').forEach((numeritem) =>{
        numeritem.remove()
    })

    let first = document.createElement('div');
    let second = document.createElement('div');
    let third = document.createElement('div');

    let arrayCountersElems = [first,second,third];

    renderNumericFields(sum,arrayCountersElems)

    taimer.appendChild(first);
    taimer.appendChild(second);
    taimer.appendChild(third); 
}

function beginningTimer(){
    timer = setTimeout(function(){
        beginningTimer()
        renderscoreboardMeaning();
        sum++
        let second = scoreboardMeaningLibrary[sum];
    }, 1000)
    console.log("1 sec")
}
beginningTimer()


function clear(){
    nombersArroundsBomb = {};
    coordinatesElements = [];
    coordinatesNumber = [];
    isEndGame = false;
    isInitialClick = true;
    sum = 0
    clearTimeout(timer);
    beginningTimer()
    buttomSmile.classList = "button"

    for( let i=0; i < 256; i++){
        document.querySelector(".cell").remove()
    }
    addElement()
}

let numberLibrary = {
    1: 'numberOne',
    2: 'numberTwo',
    3: 'numberTree',
    4: 'numberFour',
    5: 'numberFive',
    6: 'numberSix',
    7: 'numberSeven',
    8: 'numberEight'
}


function victory(){
    if(document.querySelectorAll(".Active").length >= 255){
        buttomSmile.classList.add("buttonWin");
        isEndGame = true;
        clearTimeout(timer);
        
    }
}

function addElement(){ // Генерация ячеек поля
    for (let i = 0; i < 256; i++){
        let newElement = document.createElement("div");
        newElement.id = "cell-" + i;
        newElement.classList.add("cell");

        newElement.addEventListener("click", function(cell){
        
        if (isInitialClick){
            isInitialClick = false
            spawnBomb(cell.target)
        }
        if(isEndGame == true)return
            clickCell(cell.target)
        })
        newElement.addEventListener("mousedown", function(smile){
            buttomSmile.classList.add("buttonScared");
        })
        newElement.addEventListener("mouseup", function(smile){
            buttomSmile.classList.remove("buttonScared");
        })
        
        newElement.addEventListener("contextmenu", function(flag){
            flag.preventDefault();
            
        if(isEndGame == true || flag.target.classList.contains("emptyCell") )return


            if(newElement.classList.contains("putFlag")){
                newElement.classList.remove("putFlag");
                newElement.classList.add("questionMark");

            }else if(newElement.classList.contains("questionMark")){
                newElement.classList.remove("questionMark");
                newElement.classList.add("cell");

            }else{
                newElement.classList.add("putFlag");
            } 
            
        })   
        board.appendChild(newElement);
        renderscoreboardMeaning();
    }
    

}

function clickCell(cell){ // Отображение инф. клеток после нажатия

    if(cell.classList.contains("Active"))return
    let currentCoordinate = cell.dataset.x + ',' + cell.dataset.y
    console.log(nombersArroundsBomb[currentCoordinate]);


    if( cell.dataset.bomb == "hereBomb"){
        clearTimeout(timer);
        isEndGame = true
        cell.classList.add("pressBomb");
        buttomSmile.classList.add("buttonLose")

        for( let i=0; i < document.querySelectorAll(".cell").length; i++){
            let currentBomb = document.getElementById("cell-" + i)

            if(currentBomb.classList.contains("putFlag")){
                currentBomb.classList.add('detectedBomb');
            }
            else if(currentBomb.dataset.bomb == "hereBomb" && cell != currentBomb){
                currentBomb.classList.add("openBomb");
            }
        }return  
    }
    else if(nombersArroundsBomb[currentCoordinate] != undefined){
        let number = numberLibrary[nombersArroundsBomb[currentCoordinate]];
        cell.classList.add("Active")
        cell.classList.add(number);
        setTimeout (function(){
            victory();
        }, 100)
        return
    }
    
    else{
        cell.classList.add("Active")
        cell.classList.add("emptyCell");
        checkCell(cell);
    }
}

function checkCell(cell){ // Проверяет рядом стоящие ячейки
    let x = +cell.dataset.x
    let y = +cell.dataset.y

    setTimeout(function(){
        if(x>0){
            let newCell = document.querySelector(`[data-x="${x-1}"][data-y="${y}"]`)
            clickCell(newCell);
        }
        if(x<15){
            let newCell = document.querySelector(`[data-x="${x+1}"][data-y="${y}"]`)
            clickCell(newCell); 
        }
        if(y>0){
            let newCell = document.querySelector(`[data-x="${x}"][data-y="${y-1}"]`)
            clickCell(newCell);
        }
        if(y<15){
            let newCell = document.querySelector(`[data-x="${x}"][data-y="${y+1}"]`)
            clickCell(newCell);
        }
        if(x>0 && y>0){
            let newCell = document.querySelector(`[data-x="${x-1}"][data-y="${y-1}"]`)
            clickCell(newCell);
        }
        if(x<15 && y>0){
            let newCell = document.querySelector(`[data-x="${x+1}"][data-y="${y-1}"]`)
            clickCell(newCell);
        }
        if(x>0 && y<15){
            let newCell = document.querySelector(`[data-x="${x-1}"][data-y="${y+1}"]`)
            clickCell(newCell);
        }
        if(x<15 && y<15){
            let newCell = document.querySelector(`[data-x="${x+1}"][data-y="${y+1}"]`)
            clickCell(newCell);
        } 
    }, 10)
}

function spawnBomb(cell){ // Логика появления бомб
    let x = 0
    let y = 0
    let quantityBomb = 40;
// Координаты x и y клеток 
    for( let i=0; i < document.querySelectorAll(".cell").length; i++){
        // cell.id = x
        document.getElementById("cell-" + i).dataset.x = x;
        document.getElementById("cell-" + i).dataset.y = y;

        coordinatesElements.push(`${x},${y}`);
        
         
// Рандомно раскидывает бомбы
        let hereBomb = Math.random() < 0.2;

        if (cell != document.getElementById("cell-" + i) && hereBomb == true && quantityBomb > 0){
            document.getElementById("cell-" + i).dataset.bomb = "hereBomb";
            quantityBomb--
            

            //Записывает координаты где есть цифры 
            if (x > 0 && y > 0)coordinatesNumber.push(`${x-1},${y-1}`);
            if (y > 0)coordinatesNumber.push(`${x},${y-1}`);
            if (x < 15 && y > 0)coordinatesNumber.push(`${x+1},${y-1}`);
            if (x > 0)coordinatesNumber.push(`${x-1},${y}`);
            if (x < 15)coordinatesNumber.push(`${x+1},${y}`);
            if (x > 0 && y < 15)coordinatesNumber.push(`${x-1},${y+1}`);
            if (y<15)coordinatesNumber.push(`${x},${y+1}`);
            if (x < 15 && y < 15)coordinatesNumber.push(`${x+1},${y+1}`);
        }
        

// Ограничение координат по 16 на строчку 
        x++
       if(x > 15 ){
        y++
        x = 0
       }

    }

// Показывает сколько бомб есть вокруг клетки
    coordinatesNumber.forEach(function(coords){
        if(Object.hasOwn(nombersArroundsBomb,coords)){
            nombersArroundsBomb[coords]++
            return
        }
        nombersArroundsBomb[coords] = 1
    })   
}

//Главная кнопка
buttomSmile.addEventListener("mousedown", function(cell){
    buttomSmile.classList.add("buttonPressed");
})
buttomSmile.addEventListener("mouseup", function(cell){
    buttomSmile.classList.remove("buttonPressed");
})
buttomSmile.addEventListener('click', function(remove){
    clear();
})
