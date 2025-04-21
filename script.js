const Gameboard = function(){

    const grid = 3;
    const board = [];

    for (let i = 0; i< grid; i++){
        // créer une rangée
        board[i] = []
        for (let j = 0; j< grid; j++){
            // qui créer une cellule
            board[i].push(Cell());
        }
    };

    // renvoyer le tableau
    const getBoard = () => board;


    const printBoard = function(){
        const boardWithValue = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValue);
    }


    const pickACell = function(row, column, player){
        board[row][column].addToken(player);
    };


    return{
        getBoard,
        printBoard,
        pickACell,
    }
};


const Cell = function(){
    let value = 0;


    // change la value par rapport au player
    // DOIT IMPERATIVEMENT METTRE LA VALEUR DU PLAYER ET NON PAS L'OBJ
    // vérifie qui la valeur n'est pas 0 
    const addToken = function(player){
        if (value !== 0) {
            console.log("This cell's taken please try again")
            return;
        }
        value = player;
    };

    // retourn la valeur de la cellule ciblée
    const getValue = () => value;

    return {
        // Chaque cellule crééer dans le tableau pourra appeler ces deux fonctions
        addToken,
        getValue,
    }
}



const Player = function(){

    const players = [];

    const addPlayer = function(name, token){
        if (players.length === 2) {alert("2 Players max"); return};

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




// const GameControl = function(){

//     const game = Gameboard();
//     const player = Player();

//     player.addPlayer("Player One", 1);
//     player.addPlayer("Player Two", 2);


//     let activePlayer = player.getPlayers(0);


//     const switchPlayers = function(){
//         activePlayer = activePlayer === player.getPlayers(0) ? player.getPlayers(1) : player.getPlayers(0);
//     };


//     const getActivePlayer = () => activePlayer;

    
//     const playRound = function(row, column){
//         row = row -1;
//         column = column -1;

//         game.pickACell(row, column, getActivePlayer().token);
//         switchPlayers();
//         game.printBoard();
//     };

//     return {
//         playRound,
//     }


// };

// Gameboard().printBoard();
// GameControl();

