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
            token : token
        };
        
        players.push(player);
    };
    
    
    
    const getPlayers = (index) => players[index];
    
    return {
        addPlayer,
        getPlayers,
    }
}


const CheckVictory = function (){
    

    const row = function(board) {
        let result;
        
        for (let i = 0; i < 3; i++){
            if (result) break;
            
            for (let j = 0; j < 1; j++){
                
                if (board[i][j] !== 0 ){
                    const value = board[i][j];
                    const check1 = board[i][j+1];
                    const check2 = board[i][j+2];
                    
                    if (check1 === value && check2 === value){
                        result = true;
                    };
                };
            };
        }

        return result;
    }
    
    
    const column = function(board){
        let result;
        
        for (let i = 0; i < 1; i++){
            
            for (let j = 0; j < 3; j++){
                if (result) break;
                
                if (board[i][j] !== 0){
                    const value = board[i][j];
                    const check1 = board[i+1][j];
                    const check2 = board[i+2][j];
                    
                    if (check1 === value && check2 === value){
                        result = true;
                        break;
                    };
                };
            };           
        };
        
        return result;
    };
    
    
    const diag = function(board){
        let result;
        
        
        if (board[0][0] !== 0){
            const value = board[0][0];
            const check1 = board[1][1];
            const check2 = board[2][2];
            
            if (check1 === value && check2 === value){
                result = true;
            };
        };
        
        if (board[0][2] !== 0){
            const value = board[0][2];
            const check1 = board[1][1];
            const check2 = board[2][0];
            
            if (check1 === value && check2 === value){
                result = true;
            };
        };
        
        return result;
    };
    
    
    const win = function(board){
        if (row(board) === true || column(board) === true || diag(board) === true) {return true;}
    }
    
    
    const tie = function(board){

        let temoin = 0;

        for (let i=0; i<3; i++){
            for(let j=0; j<3; j++){

                if(board[i][j] === 0) continue;
                else temoin += 1
                
            };
        }
        
        if (temoin === 9) {return true;}
        
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

    
    const getNewPlayer = function(event){
        
        let playerData = new FormData(event.target);
        playerData = Object.fromEntries(playerData.entries());
        
        
        player.addPlayer(playerData.p1Name, "X");
        player.addPlayer(playerData.p2Name, "O");
        
        
        activePlayer = player.getPlayers(0);
        
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

    
    const stopGame = function(){
        
        const cell = container.children;
        
        for ( let i = 0; i < cell.length; i++){
            cell[i].setAttribute("disabled", true);
        }
        
        resetBoard();
    };
    
    
    const playRound = function(row, column){
        
        game.pickACell(row, column, getActivePlayer().token);
        
        const temoin = game.getBoardWithValue();
        
        
        if(check.win(temoin)){
            stopGame();
            alert(`${activePlayer.name} victory !`)
        } else if(check.tie(temoin)){
            stopGame();
            alert("IT'S A TIE !");
        } else {
            switchPlayers();
        }
        
    };
    
    
    return{
        playRound,
        getNewPlayer,
        getBoard: game.getBoard,
    }
    
};


const ScreenControl = function(){
    
    const game = GameControl();
    
    
    const container = document.querySelector("#container");
    const askNewGameButton = document.querySelector("#askNewGame");
    const newPlayerData= document.querySelector("#newPlayerData");

    
    const newBoard = function(){
        
        const grid = container.children;
        if (grid.length === 9){
            container.replaceChildren();
        } 
        
        game.getBoard().forEach((row, index) => {
            const arg = index
            row.forEach((cell, index) => {
                const button = document.createElement("button");
                button.setAttribute("class", "cell");

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
        
        
    }
    
    
    askNewGameButton.addEventListener("click", function(){initNewGame()})
    

    newPlayerData.addEventListener("submit", function(event){
        event.preventDefault();
        
        game.getNewPlayer(event);
        hidePanelShowScore();
        newBoard();
        
    })
    

    const initNewGame = function(){
        // newGameButton.classList.toggle("hidden");
        newPlayerData.classList.toggle("hidden");
    }
    
    const hidePanelShowScore = function(){
        newPlayerData.classList.toggle("hidden")
    }
    
    
    return{
        newBoard,
    }
    
}


const game = ScreenControl().newBoard();