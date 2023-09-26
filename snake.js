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
//make a variable which decides the direction of the snake movement
//shouldnt allow opposite directions (for example cant go up if current direction is down,)
let direction;
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
        if(((prevPixel-1) % 20 == 0) && currentPixel % 20 == 0) currentPixel += 20;
        if(score < 3) score++;
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
