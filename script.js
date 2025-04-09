let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let showmain = document.querySelector(".gamediv");
let cnt = 0;
let checkwin = false;


let turnO = false;// it is x turn

const winPatterns = [
    [0, 1, 2],[0, 3, 6],[0, 4, 8],
    [1, 4, 7],[2, 5, 8],[2, 4, 6],
    [3, 4, 5],[6, 7, 8]
]


const resetGame = () =>
{
    for(let box of boxes)
    {
        box.style.backgroundColor = "#e9c46a";
    }
    checkwin = false;
    cnt = 0;
    turnO = true;
    enableBoxes();   
    msgContainer.classList.add("hide");
    showmain.classList.remove("hide");

}

boxes.forEach((box) =>
{
    box.addEventListener("click", () =>
    {
        if(turnO)
        {
            box.innerText = "O";
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            turnO = true;
            box.style.backgroundColor = "#e76f51";
        }
        box.disabled = true;

        checkWinner();

        cnt++;

        if(cnt == 9 && !checkwin)
        {
            checkdraw();
        }
    })
})

const checkdraw = () =>
{
    msg.innerText = `Oops the game is draw`;
    msgContainer.classList.remove("hide");
    showmain.classList.add("hide");
    disableBoxes();
}

const checkWinner = () =>
{
    for(let pattern of winPatterns)
    {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2 && pos2 === pos3)
            {
                showWinner(pos1);
            }
        }
    }
}

const showWinner = (winner) =>
{
    msg.innerText = `Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    showmain.classList.add("hide");
    disableBoxes();
    checkwin = true;
}

const disableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}
    
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
