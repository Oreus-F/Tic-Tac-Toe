const Gameboard = function(){
    
    const grid = 3;
    const board = [];
    
    
    
    
    for (let i = 0; i< grid; i++){
        board[i] = []
        for (let j = 0; j< grid; j++){
            board[i].push(Cell());
        }
    };
    
    
    const getBoard = () => board;
    
    const getBoardWithValue = function(){
        return boardWithValue = board.map((row) => row.map((cell) => cell.getValue()));        
    }
    
    const pickACell = function(row, column, player){
        board[row][column].addToken(player);
    };
    
    return{
        getBoard,
        getBoardWithValue,
        pickACell,
    }
};


const Cell = function(){
    let value = 0;
    
    const addToken = function(player){
        value = player;
    };
    
    const getValue = () => value;
    
    return {
        addToken,
        getValue,
    }
}


const Player = function(){
    
    let players = [];
    
    const addPlayer = function(name, token){
        if (players.length === 2) {players = []};
        
        
        let player = {
            name : name,
            token : token,
            score : 0
        };
        
        players.push(player);
    };
    
    
    const getPlayers = (index) => players[index];
    
    
    const addPoint = (player) => player.score += 1;
    
    
    const getScore = (player) => player.score;
    
    return {
        addPlayer,
        getPlayers,
        addPoint,
        getScore,
    }
}


const CheckVictory = function (){
    

    let result = {};
    
    const row = function(board) {
        result = {};
        
        for (let i = 0; i < 3; i++){
            if (result.win) break;
            
            for (let j = 0; j < 1; j++){
                
                if (board[i][j] !== 0 ){
                    const value = board[i][j];
                    const check1 = board[i][j+1];
                    const check2 = board[i][j+2];
                    
                    if (check1 === value && check2 === value){
                        result.win = true;

                        board[0].map((_, index1) => board.map((column, index2) => {
                            if((index1 === i && index2 === j) || (index1 === i && index2 === j+1) || (index1 === i && index2 === j+2)){
                                return board[index1][index2] = "win";};
                        }))


                        result.temoin = board.flat();

                    };
                };
            };
        }
        
        return result;
    }
    
    
    const column = function(board){
        result = {};
        
        for (let i = 0; i < 1; i++){
            
            for (let j = 0; j < 3; j++){
                if (result.win) break;
                
                if (board[i][j] !== 0){
                    const value = board[i][j];
                    const check1 = board[i+1][j];
                    const check2 = board[i+2][j];
                    
                    if (check1 === value && check2 === value){
                        result.win = true;


                        board[0].map((_, index1) => board.map((column, index2) => {
                            if((index1 === i && index2 === j) || (index1 === i+1 && index2 === j) || (index1 === i+2 && index2 === j)){
                                return board[index1][index2] = "win";};
                        }))

                        result.temoin = board.flat();


                        break;
                    };
                };
            };           
        };
        
        return result;
    };
    
    
    const diag = function(board){
        result = {};
        
        
        if (board[0][0] !== 0){
            const value = board[0][0];
            const check1 = board[1][1];
            const check2 = board[2][2];
            
            if (check1 === value && check2 === value){
                result.win = true;


                board[0].map((_, index1) => board.map((column, index2) => {
                    if((index1 === 0 && index2 === 0) || (index1 === 1 && index2 === 1) || (index1 === 2 && index2 === 2)){
                        return board[index1][index2] = "win";};
                }))

                result.temoin = board.flat();

            };
        };
        
        if (board[0][2] !== 0){
            const value = board[0][2];
            const check1 = board[1][1];
            const check2 = board[2][0];
            
            if (check1 === value && check2 === value){
                result.win = true;


                board[0].map((_, index1) => board.map((column, index2) => {
                    if((index1 === 0 && index2 === 2) || (index1 === 1 && index2 === 1) || (index1 === 2 && index2 === 0)){
                        return board[index1][index2] = "win";};
                }))

                result.temoin = board.flat();
            };

        };
        
        return result;
    };
    
    
    const win = function(board){
        if (row(board).win === true || column(board).win === true || diag(board).win === true) {return result;}
    }
    
    
    const tieCount = function(board){
        
        let result = {};
        let temoin = 0;
        
        for (let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                
                if(board[i][j] === 0) continue;
                else temoin += 1
                
            };
        }

        result.temoin = board.flat();
        
        if (temoin === 9) {result.tie = true;}
        return result;
        
    };

    const tie = function(board){
        if (tieCount(board).tie === true) return result;
    };
    
    
    return {
        win,
        tie,
    }
    
}


const GameControl = function(){
    
    const game = Gameboard();
    const player = Player();
    const check = CheckVictory();
    
    const container = document.querySelector("#container");
    const buttonsContainer = document.querySelector(".additionnalButton");
    
    const p1Score = document.querySelector("#p1Score");
    const p2Score = document.querySelector("#p2Score");
    
    
    const getNewPlayer = function(event){
        
        let playerData = new FormData(event.target);
        playerData = Object.fromEntries(playerData.entries());
        
        
        player.addPlayer(playerData.p1Name, "X");
        player.addPlayer(playerData.p2Name, "O");
        
        
        activePlayer = player.getPlayers(0);
        firstPlayer = activePlayer;
        p1Score.classList.toggle("activeTurn");

        updateScore();
        
    }
    
    
    const switchPlayers = function(){
        activePlayer = activePlayer === player.getPlayers(0) ? player.getPlayers(1) : player.getPlayers(0);
    };
    
    
    const getActivePlayer = () => activePlayer;
    
    
    const resetBoard = function(){
        
        const board = game.getBoard();
        
        for (let i = 0; i< 3; i++){
            board[i].slice(2, 3);
            board[i] = [];
            for (let j = 0; j< 3; j++){
                board[i].push(Cell());
            }
        };
    }
    

    const rematch = function(){
        firstPlayer = firstPlayer === player.getPlayers(0) ? player.getPlayers(1) : player.getPlayers(0);
        activePlayer = firstPlayer;
        firstPlayer === player.getPlayers(0) ? p1Score.classList.toggle("activeTurn") : p2Score.classList.toggle("activeTurn");
        resetBoard()
    }    

    
    const stopGame = function(temoin){
        temoin = temoin || game.getBoardWithValue();

        const cell = container.children;
        
        for (let i = 0; i < cell.length; i++){
            cell[i].setAttribute("disabled", true);
            if(temoin[i] === "win"){
                cell[i].classList.toggle("win")
            } else {cell[i].classList.toggle("end")};
        }
        
        

        resetBoard();
        updateScore();
        
        p1Score.getAttribute("class") === "activeTurn" ? p1Score.classList.toggle("activeTurn") : p2Score.classList.toggle("activeTurn");
        buttonsContainer.classList.toggle("hidden")
        
        
    };


    const winPoint = () => player.addPoint(activePlayer);
    
    
    const playRound = function(row, column){
        
        game.pickACell(row, column, getActivePlayer().token);
        
        const temoin = game.getBoardWithValue();
        
       
        
        if(check.win(temoin)){

            let result = check.win(temoin);
            console.log(result)
            result = result.temoin;
            console.log(result)
            winPoint();
            stopGame(result);
            
        } 
        else if(check.tie(temoin)){

            let result = check.tie(temoin);
            result = result.temoin;

            stopGame(result);

        } else {

            switchPlayers();
            changeDisplay();

        }
        
    };

    
    const updateScore = function(){        
        const p1 = p1Score.children;
        const p2 = p2Score.children;
        
        p1[0].textContent = player.getPlayers(0).name;
        p1[1].textContent = player.getPlayers(0).score;
        
        p2[0].textContent = player.getPlayers(1).name;
        p2[1].textContent = player.getPlayers(1).score;
        
    }


    const changeDisplay = function(){
        p1Score.classList.toggle("activeTurn");
        p2Score.classList.toggle("activeTurn");
    }
    
    
    return{
        playRound,
        getNewPlayer,
        getBoard: game.getBoard,
        rematch,
    }
    
};


const ScreenControl = function(){
    
    const game = GameControl();
    
    
    const container = document.querySelector("#container");
    const buttonsContainer = document.querySelector(".additionnalButton");

    const newGameButton = document.querySelector("#askNewGame");
    const newPlayerData= document.querySelector("#newPlayerData");
    const resetButton = document.querySelector("#reset");
    
    
    const newDisplay = function(){
        
        const grid = container.children;
        if (grid.length === 9){
            container.replaceChildren();
        } 
        
        game.getBoard().forEach((row, index) => {
            const arg = index
            row.forEach((cell, index) => {
                const button = document.createElement("button");
                button.setAttribute("class", "cell");
                
                button.setAttribute("data-row", arg);
                button.setAttribute("data-column", index);
                
                button.addEventListener("click", function(){
                    const span = document.createElement("span");
                    span.setAttribute("data-token", activePlayer.token)

                    //playRound after setting data-token attribute
                    game.playRound(arg, index);

                    span.textContent = cell.getValue();
                    button.appendChild(span);
                }, {once:true})
                
                container.appendChild(button);
            })
        })
        
        
    }
    
    
    
    
    newPlayerData.addEventListener("submit", function(event){
        event.preventDefault();
        
        game.getNewPlayer(event);
        hidePanelShowScore();
        newDisplay();
        
    })
    
    
    const initNewGame = function(){
        buttonsContainer.classList.toggle("hidden");
        newPlayerData.classList.toggle("hidden")
    }
    
    
    const resetGame = function(){
        buttonsContainer.classList.toggle("hidden");
        game.rematch();
        newDisplay();
    };
    
    
    const hidePanelShowScore = function(){
        newPlayerData.classList.toggle("hidden")
    };
    
    
    newGameButton.addEventListener("click", function(){initNewGame()});
    resetButton.addEventListener("click", function(){resetGame()});
    
    
    const initDisplay = (function(){
        
        game.getBoard().forEach((row, index) => {
            const arg = index
            row.forEach((cell, index) => {
                const button = document.createElement("button");
                button.setAttribute("class", "cell");
                button.setAttribute("disabled", true)
                
                // A SUPPRIMER SI PAS UTILISER CSS
                button.setAttribute("data-row", arg);
                button.setAttribute("data-column", index);
                
                button.addEventListener("click", function(){
                    game.playRound(arg, index);
                    button.textContent = cell.getValue();
                    
                }, {once:true})
                
                container.appendChild(button);
            })
        })
        
    })();
    
}


const game = ScreenControl()
