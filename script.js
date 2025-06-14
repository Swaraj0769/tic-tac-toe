// Selecting all 9 boxes
let boxes = document.querySelectorAll(".box");

// Use querySelector (not querySelectorAll) for single elements
let resetBtn = document.querySelector("#reset")
let newGameBtn = document.querySelector("#newBtn")
let msgContainer = document.querySelector(".msgContainer")
let msg = document.querySelector("#msg")
// let hide = document.querySelectorAll(".hide")

let turn0 = true;//player0, playerX
let count = 0; // to track number of moves

// All possible winning combinations
let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],    
    [0,4,8],
    [2,4,6],
]


const resetGame =() =>{
    turn0 = true
    count = 0
    enabledBtn()
    msgContainer.classList.add("hide")
}

// Add click listener to each box
boxes.forEach((box)=> {
    box.addEventListener("click", () =>{
        // console.log("cli");
        if(turn0){
            // player0
            box.innerHTML = "0"
            turn0 = false
        }else{
            // playerX    
            box.innerHTML = "X"
            turn0 = true
        }
        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
        }
        
        // checkWinner()
    })
})

const gameDraw = () => {
    msg.innerText = `Game is Draw`
    msgContainer.classList.remove("hide");
    disabledBtn();
}

const disabledBtn =() =>{
    for(let box of boxes){
        box.disabled = true
    }
}
const enabledBtn =() =>{
    for(let box of boxes){
        box.disabled = false
        box.innerText = ""
    }
}
const showWinner = (winner)=>{
    msg.innerText= `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBtn();
}


const checkWinner = () =>{
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innertext,
        //     boxes[pattern[2]].innertext
        // );
        
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                // console.log("winner");
                showWinner(pos1Val)
                return true
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame); 
resetBtn.addEventListener("click", resetGame);