let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnsO = true;
let count = 0; 

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnsO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    count = 0;

}


boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        
        if (turnsO){
            box.innerText = "O";
            box.classList.add("o-color");
            turnsO = false;
        }else{
            box.innerText = "X";
            box.classList.add("x-color");
            turnsO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner){
            gameDraw();
        }

    });

});

const gameDraw = () => {
    msg.innerText = `Game was a Draw. Play again!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color","o-color","winner-highlight");
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for( pattern of winPatterns) {
        let box1 = boxes [pattern[0]];
        let box2 = boxes [pattern[1]];
        let box3 = boxes [pattern[2]];

        let pos1val = box1.innerText;
        let pos2val = box2.innerText;
        let pos3val = box3.innerText;






        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val){

                box1.classList.add("winner-highlight");
                box2.classList.add("winner-highlight");
                box3.classList.add("winner-highlight");


                showWinner(pos1val);
                return true;
            }
        }
    
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
 