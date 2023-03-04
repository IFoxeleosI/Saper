document.body.onload = addElement;
let board = document.getElementById('gameBoard')



function addElement(){
    for (let i = 0; i < 256; i++){
        let newElement = document.createElement("div");
        newElement.id = i;
        newElement.classList.add("cell")
        // newElement.innerHTML = i;
        board.appendChild(newElement);
    }
}
