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

const CheckVictory = function (){
    let result = false;

    const row = function(board) {

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


    const win = function(board, player){
        if (row(board) === true || column(board) === true || diag(board) === true) alert(`${player} win !`)
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

        if (temoin === 9) {alert("IT'S A TIE")}
        
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

    player.addPlayer("Player One", 1);
    player.addPlayer("Player Two", 2);


    let activePlayer = player.getPlayers(0);


    const switchPlayers = function(){
        activePlayer = activePlayer === player.getPlayers(0) ? player.getPlayers(1) : player.getPlayers(0);
    };


    const getActivePlayer = () => activePlayer;

    
    const playRound = function(row, column){
        // row = row -1;
        // column = column -1;
        
        game.pickACell(row, column, getActivePlayer().token);
        
        const temoin = game.getBoardWithValue();
        check.win(temoin, getActivePlayer().name);
        check.tie(temoin);
        

        switchPlayers();
        game.printBoard();
    };

    return {
        playRound,
    }


};

Gameboard().printBoard();
GameControl();
const game = GameControl();