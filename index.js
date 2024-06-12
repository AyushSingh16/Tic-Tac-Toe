const boxes = document.querySelectorAll('.box');

const gameInfo = document.querySelector(".game-info");

const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];        //initially the game grid should be empty
    //UI should be empty too for boxes
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';
        //we also have to remove the green color i.e. initialise CSS properties again
        box.classList = `box box${index + 1}`;
    })

    newGameBtn.classList.remove("active");          //game button should not be visible
    gameInfo.innerText = `Current Player - ${currentPlayer}`;   //the current player should be visible(X by default)
}

initGame();


function swapTurn(){
    if(currentPlayer === "X")
        {
            currentPlayer = "O";
        }
    else{
        currentPlayer = "X";
    }

    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) =>{
        //all 3 boxes should be non- empty and exactly same in value
        if( (gameGrid[position[0]] !==  "" || gameGrid[position[1]] !==  "" || gameGrid[position[2]] !==  "" ) && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] ===  gameGrid[position[2]]))
            {
                //check if winner is X
                if(gameGrid[position[0]] === 'X')
                    {
                        answer = "X";
                    }
                else{
                    answer = "O";
                }

                //stopping the pointer events
                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                })

                //now we know the winner between X or O
                boxes[position[0]].classList.add('win');
                boxes[position[1]].classList.add('win');
                boxes[position[2]].classList.add('win');
            }  
        });

        // it means we have a winner
            if(answer !== "")
                {
                    gameInfo.innerText = `Winner - ${answer}`;
                    newGameBtn.classList.add("active");
                    return;
                }
            // let's check whether there is tie
            let fillCount = 0;
            gameGrid.forEach((box)=>{
                if(box !== "")
                    {
                        fillCount++;
                    }
            });        

            //board is filled
            if(fillCount === 9)
                {
                    gameInfo.innerText = "Game Tied !";
                    newGameBtn.classList.add("active");
                }
    }

function handleClick(index){
    if(gameGrid[index] === "")
        {
            boxes[index].innerText = currentPlayer;
            gameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvents = 'none';
            //change the turn
            swapTurn();
            //check if any person won
            checkGameOver();        // important function
        }

}

boxes.forEach((box,index) =>{
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);