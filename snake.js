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
let updated = true;
let speedChoice;
let body = document.querySelector(".fullContainer");
let ultraOn = false;
let impossibleOn = false;
let S = document.getElementById('S');
let N = document.getElementById('N');
let A = document.getElementById('A');
let K = document.getElementById('K');
let E = document.getElementById('E');
let exclamation = document.getElementById('exclamation');
//make a variable which decides the direction of the snake movement
//shouldnt allow opposite directions (for example cant go up if current direction is down,)
let direction;

function buttonPicker(){
    slowButton = document.getElementById('slow');
    medButton = document.getElementById('med');
    fastButton = document.getElementById('fast');
    ultraButton = document.getElementById('ultra');
    impossibleButton = document.getElementById('impossible');
    slowButton.addEventListener('click', () => {
        speedChoice = 200;
        slowButton.style.backgroundColor = "rgba(9, 255, 0, 0.668)";
        medButton.style.display = "none";
        fastButton.style.display = "none";
        ultraButton.style.display = "none";
        impossibleButton.style.display = "none";
        gameContent();
    })
    medButton.addEventListener('click', () => {
        speedChoice = 100;
        medButton.style.backgroundColor = "rgba(9, 255, 0, 0.668)";
        slowButton.style.display = "none";
        fastButton.style.display = "none";
        ultraButton.style.display = "none";
        impossibleButton.style.display = "none";
        gameContent();
    })
    fastButton.addEventListener('click', () => {
        speedChoice = 70;
        fastButton.style.backgroundColor = "rgba(9, 255, 0, 0.668)";
        medButton.style.display = "none";
        slowButton.style.display = "none";
        ultraButton.style.display = "none";
        impossibleButton.style.display = "none";
        gameContent();
    })
    ultraButton.addEventListener('click', () => {
        speedChoice = 30;
        ultraButton.style.backgroundColor = "rgba(9, 255, 0, 0.668)";
        medButton.style.display = "none";
        fastButton.style.display = "none";
        slowButton.style.display = "none";
        impossibleButton.style.display = "none";
        body.classList.add ('rainbow');
        S.classList.add('titleRotation');
        N.classList.add('titleRotation');
        A.classList.add('titleRotation');
        K.classList.add('titleRotation');
        E.classList.add('titleRotation');
        exclamation.classList.add('titleRotation');
        ultraOn = true;
        gameContent();
    })
    impossibleButton.addEventListener('click', () => {
        speedChoice = 70;
        impossibleButton.style.backgroundColor = "rgba(9, 255, 0, 0.668)";
        medButton.style.display = "none";
        fastButton.style.display = "none";
        slowButton.style.display = "none";
        ultraButton.style.display = "none";
        body.classList.add ('rainbow');
        S.classList.add('titleRotation');
        N.classList.add('titleRotation');
        A.classList.add('titleRotation');
        K.classList.add('titleRotation');
        E.classList.add('titleRotation');
        exclamation.classList.add('titleRotation');
        title.classList.add('animate');
        ultraOn = true;
        impossibleOn = true;
        gameContent();
    })
    
}
buttonPicker();
function gameContent(){
fruitGen();
document.addEventListener('keydown', (e) =>{
    console.log(e.key)
    if(e.key == 'ArrowLeft' && direction != 'right'){
        if(updated == true) direction = 'left';
        updated = false;
    }
    else if(e.key == 'ArrowRight' && direction != 'left'){
        if(updated == true) direction = 'right';
        updated = false;
    }
    else if(e.key == 'ArrowUp' && direction != 'down'){
        if(updated == true) direction = 'up';
        updated = false;
    }
    else if(e.key == 'ArrowDown' && direction != 'up'){
        if(updated == true) direction = 'down';
        updated = false;
    }
    console.log(direction);
})

setInterval(pixelColorChanger, speedChoice);
function pixelColorChanger(){
    if (currentPixel > 400 || currentPixel < 0 ||(((prevPixel-1) % 20 == 0) && currentPixel % 20 == 0)
     || ((prevPixel) % 20 == 0 && (currentPixel-1) % 20 == 0) || (pixelHistory.includes(currentPixel))){
        direction = "";
        clearInterval(pixelColorChanger);
        gameOver();
    }
    if(currentPixel == fruitPixel){
        if(impossibleOn == true){
            gameContainer.style.transition = '1.3s'
            let yAxis = (Math.random() * 75).toFixed();
            let plusOrMinusY = Math.round(Math.random() * 4);
            let xAxis = (Math.random() * 75).toFixed();
            if(plusOrMinusY == 0){
                gameContainer.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg`
            }
            else if (plusOrMinusY == 1){
                gameContainer.style.transform = `rotateY(-${yAxis}deg) rotateX(-${xAxis}deg`
            }
            else if (plusOrMinusY == 3){
                gameContainer.style.transform = `rotateY(${yAxis}deg) rotateX(-${xAxis}deg`
            }
            else if (plusOrMinusY == 4){
                gameContainer.style.transform = `rotateY(-${yAxis}deg) rotateX(${xAxis}deg`
            }
        }
        score++
        scoreNum.textContent = score;
        fruit.style.backgroundColor = "black";
        fruitGen();
    }
    gameStart = true;
    updated = true;
    if(direction == 'left'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        if(ultraOn == true){
            leadPixel.classList.add('rainbow');
        }
        else{
        leadPixel.style.backgroundColor = "green";
        }
        leadPixel.style.border = "1.5px solid rgb(88, 88, 88)";
        let offPixel = document.getElementById(`pixel${pixelHistory[0]}`);
        if(ultraOn == true)offPixel.classList.remove('rainbow');
        offPixel.style.backgroundColor = "black";
        offPixel.style.border = "0px";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel -= 1;
    }
    else if(direction == 'right'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        if(ultraOn == true){
            leadPixel.classList.add('rainbow');
        }
        else{
        leadPixel.style.backgroundColor = "green";
        }
        leadPixel.style.border = "1.5px solid rgb(88, 88, 88)";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        if(ultraOn == true)offPixel.classList.remove('rainbow');
        offPixel.style.backgroundColor = "black";
        offPixel.style.border = "0px";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel += 1;
    }
    else if(direction == 'up'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        if(ultraOn == true){
            leadPixel.classList.add('rainbow');
        }
        else{
        leadPixel.style.backgroundColor = "green";
        }
        leadPixel.style.border = "1.5px solid rgb(88, 88, 88)";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        if(ultraOn == true)offPixel.classList.remove('rainbow');
        offPixel.style.backgroundColor = "black";
        offPixel.style.border = "0px";
        if (score==prevScore) pixelHistory.shift();
        prevScore = score;
        prevPixel = currentPixel;
        currentPixel -= 20;
    }
    else if(direction == 'down'){
        pixelHistory.push(prevPixel);
        let leadPixel = document.getElementById(`pixel${currentPixel}`);
        if(ultraOn == true){
            leadPixel.classList.add('rainbow');
        }
        else{
        leadPixel.style.backgroundColor = "green";
        }
        leadPixel.style.border = "1.5px solid rgb(88, 88, 88)";
        let offPixel = document.getElementById(`pixel${pixelHistory[(0)]}`);
        if(ultraOn == true)offPixel.classList.remove('rainbow');
        offPixel.style.backgroundColor = "black";
        offPixel.style.border = "0px";
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
        if((pixelHistory.includes(fruitPixel) || currentPixel == fruitPixel) && gameStart == true){
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
        gameOverText.style.display = ('block');
        restartButton.style.display = ('block');
        restartButton.addEventListener('click', () => {
            location.reload();
        })
        document.addEventListener('keydown', () => {
            location.reload();
        })
    }, 2000);
}
}
let hover = false;
let title = document.querySelector('.title');
title.addEventListener('mouseover', (e) => {
    title.addEventListener('mouseleave', () => {
        hover = false;
    });
    hover = true;
    setTimeout(function(){
    if(hover == true) S.classList.add('animate');
    setTimeout(function(){
        if(hover == true) N.classList.add('animate');
        setTimeout(function(){
            if(hover == true) A.classList.add('animate');
            setTimeout(function(){
                if(hover == true) K.classList.add('animate');
                setTimeout(function(){
                    if(hover == true) E.classList.add('animate');
                    setTimeout(function(){
                        if(hover == true) exclamation.classList.add('animate');
                    }, 150);
                }, 150);
            }, 150);
        }, 150);
    }, 150);
}, 150);
});
title.addEventListener('mouseleave', () => {
    S.classList.remove('animate');
    N.classList.remove('animate');
    A.classList.remove('animate');
    K.classList.remove('animate');
    E.classList.remove('animate');
    exclamation.classList.remove('animate');
});
gameContainer.addEventListener('mouseover', () => {
    S.classList.remove('animate');
    N.classList.remove('animate');
    A.classList.remove('animate');
    K.classList.remove('animate');
    E.classList.remove('animate');
    exclamation.classList.remove('animate');
});