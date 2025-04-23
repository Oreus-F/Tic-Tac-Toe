const Gameboard = function(){
    
    const grid = 3;
    let board = [];
    


    const createBoard = function(){

        let newBoard = []
        for (let i = 0; i< grid; i++){
            // créer une rangée
            newBoard[i] = []
            for (let j = 0; j< grid; j++){
                // qui créer une cellule
                newBoard[i].push(Cell());
            }
        };

        return board = newBoard;
    }
    
    // renvoyer le tableau
    const getBoard = () => board;
    
    const getBoardWithValue = function(){
        return boardWithValue = board.map((row) => row.map((cell) => cell.getValue()));        
    }
    
    const printBoard = function(){
        console.log(getBoardWithValue());
    }

    
    
    const pickACell = function(row, column, player){
        board[row][column].addToken(player);
    };
    
    return{
        getBoard,
        getBoardWithValue,
        printBoard,
        pickACell,
        createBoard
    }
};


const Cell = function(){
    let value = 0;
    
    const addToken = function(player){
        value = player;
    };
    
    // retourn la valeur de la cellule ciblée
    const getValue = () => value;
    
    return {
        // Chaque cellule créée dans le tableau pourra appeler ces deux fonctions
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
            // boucle à travers toutes les lignes
            // s'arrête si result a été repéré
            if (result) break;
            
            //boucle uniquement sur les premières cases de chaque lignes
            for (let j = 0; j < 1; j++){
                
                //si la valeur est celle d'un joueur on vérifie que les autres le sont aussi
                if (board[i][j] !== 0 ){
                    const value = board[i][j];
                    const check1 = board[i][j+1];
                    const check2 = board[i][j+2];
                    
                    if (check1 === value && check2 === value){
                        //si les valeurs sont bonnes on change la condition de result
                        result = true;
                    };
                };
            };
        }
        // on retourne la valeur pour le check 
        return result;
    }
    
    
    const column = function(board){
        let result;

        
        //Boucle uniquement sur la première ligne
        for (let i = 0; i < 1; i++){
            
            for (let j = 0; j < 3; j++){
                // Boucle sur les 3 premières cellules pour vérifier si une colonne a été achevé.
                if (result) break;
                
                if (board[i][j] !== 0){
                    const value = board[i][j];
                    const check1 = board[i+1][j];
                    const check2 = board[i+2][j];
                    
                    if (check1 === value && check2 === value){
                        //si les valeurs sont bonnes on change la condition de result
                        //et on arrête la boucle
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
                
                //si les valeurs sont bonnes on change la condition de result
                result = true;
            };
        };
        
        if (board[0][2] !== 0){
            const value = board[0][2];
            const check1 = board[1][1];
            const check2 = board[2][0];
            
            if (check1 === value && check2 === value){
                //si les valeurs sont bonnes on change la condition de result
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
                
                // ignore if the value it's neutral
                if(board[i][j] === 0) continue;
                else temoin += 1
                
            };
        }
        
        if (temoin === 9) {return true;}
        
    }
    
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
    
    const startGame = function(){

        game.createBoard();

    }
    
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
    
    // const resetBoard = function(){
    //     const board = game.getBoard();

    //     for (let i = 0; i< 3; i++){
    //         // delete previous Cell();
    //         board[i].slice(2, 3);
    //         board[i] = [];
    //         for (let j = 0; j< 3; j++){
    //             // qui créer une cellule
    //             board[i].push(Cell());
    //         }
    //     };
    
    // }
    
    const stopGame = function(){
        
        const cell = container.children;
        
        for ( let i = 0; i < cell.length; i++){
            cell[i].setAttribute("disabled", true);
        }
        
        // resetBoard();
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
        startGame,
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
                // IF NO USE IN CSS DELETE THESE TWO LINES
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
        game.startGame();
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