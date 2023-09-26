//generate a grid of divs (will start with 20x20 but will make customizable later on)
//this will be done with a for loop, by creating divs with the same class name, but ids matching the current iteration
//then use css to match correct size
let currentDiv;
gameContainer = document.querySelector('.gameContainer');
for(i = 1; i <= 400; i ++){
    currentDiv = document.createElement('div');
    currentDiv.style.backgroundColor = "black";
    currentDiv.setAttribute('class', 'tile');
    currentDiv.setAttribute('id', `pixel${i}`);
    gameContainer.appendChild(currentDiv);
}
//make a moving green pixel 
//start by making just a single pixel green, then make a timed function which changes the green pixel one to the left
//just start by looping this 10 times
let currentPixel = 212;
let prevPixel = 213;
let pixelHistory = new Array;
let score = 0;
let prevScore = 0;
let fruitPixel;
let fruit;
let gameStart = false;
let scoreBoard = document.querySelector('.scoreBoard');
let scoreNum = document.querySelector('.scoreNum');
//make a variable which decides the direction of the snake movement
//shouldnt allow opposite directions (for example cant go up if current direction is down,)
let direction;
fruitGen();
document.addEventListener('keydown', (e) =>{
    console.log(e.key)
    if(e.key == 'ArrowLeft' && direction != 'right'){
        direction = 'left';
    }
    else if(e.key == 'ArrowRight' && direction != 'left'){
        direction = 'right';
    }
    else if(e.key == 'ArrowUp' && direction != 'down'){
        direction = 'up';
    }
    else if(e.key == 'ArrowDown' && direction != 'up'){
        direction = 'down';
    }
    console.log(direction);
})

setInterval(pixelColorChanger, 100);
function pixelColorChanger(){
    if (currentPixel > 400 || currentPixel < 0 ||(((prevPixel-1) % 20 == 0) && currentPixel % 20 == 0)
     || ((prevPixel) % 20 == 0 && (currentPixel-1) % 20 == 0) || (pixelHistory.includes(currentPixel))){
        direction = "";
        clearInterval(pixelColorChanger);
        gameOver();
    }
    if(currentPixel == fruitPixel){
        score++
        scoreNum.textContent = score;
        fruit.style.backgroundColor = "black";
        fruitGen();
    }
    gameStart = true;
    if(direction == 'left'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        leadPixel.style.backgroundColor = "green";
        let offPixel = document.getElementById(`pixel${pixelHistory[0]}`);
        offPixel.style.backgroundColor = "black";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel -= 1;
    }
    else if(direction == 'right'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        leadPixel.style.backgroundColor = "green";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        offPixel.style.backgroundColor = "black";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel += 1;
    }
    else if(direction == 'up'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        leadPixel.style.backgroundColor = "green";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        offPixel.style.backgroundColor = "black";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel -= 20;
    }
    else if(direction == 'down'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        leadPixel.style.backgroundColor = "green";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        offPixel.style.backgroundColor = "black";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel += 20;
    }
    
}
//make apple appear randomly using rng, if the apple placement is where the snake currently is, reroll

function fruitGen(){
    let notSnake = false;
    while(notSnake == false){
        let rng = Math.random() * 400;
        fruitPixel = Math.round(rng);
        if(pixelHistory.includes(fruitPixel) && gameStart == true){
            notSnake = false;
        }
        else{
            notSnake = true;
        };
    }
    fruit = document.getElementById(`pixel${fruitPixel}`);
    fruit.style.backgroundColor = "rgba(233, 26, 18, 0.8)";
}
//make game over screen which displays score and gives option to replay
function gameOver(){
    let gameOverScreen = document.querySelector('.gameOver');
    gameOverScreen.style.display = "flex";
    setTimeout(function(){
        let gameOverText = document.querySelector('.gameOverText');
        let restartButton = document.querySelector('.restartButton');
        gameOverText.textContent = (`You ate ${score} apples!`);
        restartButton.style.display = ('block');
        restartButton.addEventListener('click', () => {
            location.reload()
        })
    }, 2000)
}

let S = document.getElementById('S');
let N = document.getElementById('N');
let A = document.getElementById('A');
let K = document.getElementById('K');
let E = document.getElementById('E');
let exclamation = document.getElementById('exclamation');
let title = document.querySelector('.title');
title.addEventListener('mouseover', (e) => {
    setTimeout(function(){
    S.classList.add('animate');
    setTimeout(function(){
        N.classList.add('animate');
        setTimeout(function(){
            A.classList.add('animate');
            setTimeout(function(){
                K.classList.add('animate');
                setTimeout(function(){
                    E.classList.add('animate');
                    setTimeout(function(){
                        exclamation.classList.add('animate');
                    }, 150)
                }, 150)
            }, 150)
        }, 150)
    }, 150)
}, 150)
})
title.addEventListener('mouseleave', () => {
    S.classList.remove('animate');
    N.classList.remove('animate');
    A.classList.remove('animate');
    K.classList.remove('animate');
    E.classList.remove('animate');
    exclamation.classList.remove('animate');
    
})
gameContainer.addEventListener('mouseover', () => {
    S.classList.remove('animate');
    N.classList.remove('animate');
    A.classList.remove('animate');
    K.classList.remove('animate');
    E.classList.remove('animate');
    exclamation.classList.remove('animate');
    
})

