const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
};


function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0 ){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playSound("GameOver");

        // Exibe uma mensagem de "Game Over" no DOM
        const gameOverOverlay = document.createElement("div");
        gameOverOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            color: white;
        `;

        const gameOverMessage = document.createElement("h1");
        gameOverMessage.textContent = `Game Over! O seu resultado foi: ${state.values.result}`;
        gameOverMessage.style.marginBottom = "20px";

        const restartButton = document.createElement("button");
        restartButton.textContent = "Reiniciar";
        restartButton.style.cssText = `
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
        `;

        // Adiciona funcionalidade ao botão de Reiniciar
        restartButton.addEventListener("click", () => {
            document.body.removeChild(gameOverOverlay); // Remove a tela de Game Over
            restartGame(); // Reinicia o jogo
        });

        // Adiciona a mensagem e o botão ao overlay
        gameOverOverlay.appendChild(gameOverMessage);
        gameOverOverlay.appendChild(restartButton);

        // Adiciona o overlay ao corpo do documento
        document.body.appendChild(gameOverOverlay);
    }
}

function restartGame(){
    // Reinicia os valores do estado do jogo
    state.values.result = 0;
    state.values.curretTime = 60;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;

    // Reinicia os temporizadores
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit")
            }   
        })
    })
}

function init() {
    addListenerHitBox()
}

init();