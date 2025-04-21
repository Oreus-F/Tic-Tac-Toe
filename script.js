const Gameboard = function(){

    const grid = 3;
    const board = [];

    for (let i = 0; i<grid; i++){
        // créer une rangée
        board[i] = []
        for (let j=0; j<grid; j++){
            // qui créer une cellule
            board[i].push(Cell());
        }
    };

    // renvoier le tableau
    const getBoard = function(){
        return board;
    }


    return{
        getBoard,
    }
};


const Cell = function(){
    let value = 0;


    // change la value par rapport au player
    // DOIT IMPERATIVEMENT METTRE LA VALEUR DU PLAYER ET NON PAS L'OBJ
    // vérifie qui la valeur n'est pas 0 
    const addToken = function(player){
        if (value !== 0) return
        value = player;
    };

    // retourn la valeur de la cellule ciblée
    const getValue = function(){
        return value;
    };

    return {
        // Chaque cellule crééer dans le tableau pourra appeler ces deux fonctions
        addToken,
        getValue,
    }
}




const GameControl = function(){

};

