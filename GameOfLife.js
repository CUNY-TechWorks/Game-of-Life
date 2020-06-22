class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }
  /**
   * Returns a 2D Array
   */
  makeBoard() {
    // TODO: Create and return an 2D Array
    // with `this.height` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    let array = [];
    for(let r=0;r<this.height;r++) {
      let innerArr = [];
      for(let c=0;c<this.width;c++) {
          innerArr.push(0)
       }
       array.push(innerArr);
    }
    return array;
  }
  
  getCell(row,col) {
    let board = this.board;
    if(row < 0 || col < 0) {
      return 'dead';
    }
    else if(row > this.height || col > this.width) {
      return 'dead'; 
    }
    return board[row][col];
  }

  setCell(value,row,col) {
     let board = this.board;
     if(row < 0 || col < 0) {
       return 'illegal cord';
     }
     else if(row > this.height || col > this.width) {
       return 'illegal cord';
     }
     board[row][col] = value;
  }
  
  toggleCell(row,col) {
     let board = this.board;
     if(board[row][col] === 0) {
        board[row][col] = 1;
     }
     else {
        board[row][col] = 0;
     }
  }
  hasEmptyBoard() {
     let board = this.board;
     let countEmpty = 0;

     for(let r=0;r<this.height;r++) {
       for(let c=0;c<this.height;c++) {
          if(board[r][c] === 0) {
             countEmpty++;
          }
       }
     }
     return countEmpty === 400; // returns either true or false.
  }
  
  livingNeighbors(row, col) {
    // array of all possible neighbors  
    let array = [[row-1,col-1],[row-1,col],[row+1,col],[row-1,col+1],[row,col+1],[row,col-1],[row+1,col-1],[row+1,col+1]];
    
    let board = this.board;
    
    let count = 0;
    for(let i=0;i<array.length;i++) {
      if((array[i][0] >= 0 && array[i][1] >= 0) && (array[i][0] < this.height && array[i][1] < this.width)) {
        if(board[array[i][0]][array[i][1]] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */
  tick() {
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    const newBoard = this.makeBoard();

    for(let r=0;r<this.height;r++) {
      for(let c=0;c<this.width;c++) {
         if(this.livingNeighbors(r,c) < 2 && this.getCell(r,c) === 1) { // LIVE CELL dies
            newBoard[r][c] = 0;
         }
         if((this.livingNeighbors(r,c) === 2 || this.livingNeighbors(r,c) === 3) && (this.getCell(r,c) === 1)) { // LIVE CELL survives
            newBoard[r][c] = 1;
         }
         if(this.livingNeighbors(r,c) > 3 && this.getCell(r,c) === 1) { // LIVE CELL dies
            newBoard[r][c] = 0;
         }
         if(this.livingNeighbors(r,c) === 3 && this.getCell(r,c) === 0) { // DEAD CELL reproduces/comes back to life
            newBoard[r][c] = 1;
         }
      }
    }
    
    this.board = newBoard;
  }
}