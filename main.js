const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);
/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //
  // To find all the <td>s in the table, you might query the DOM for them, or you
  // could choose to collect them when we create them in createTable.
  // 
  // HINT:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
let cells = document.getElementsByTagName("td");
for(let cell of cells) {
   let row = cell.getAttribute('data-row');
   let col = cell.getAttribute('data-col');
   if(gol.board[row][col] === 1) {
     cell.classList.toggle("alive",true);
   }  
   else { 
     cell.classList.toggle("alive",false);
   }
  } 
}

/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  // TODO: Toggle clicked cell (event.target) and paint
   let index = tds.indexOf(event.target); 

   let row = tds[index].getAttribute('data-row');
   let col = tds[index].getAttribute('data-col');

   gol.toggleCell(row,col);

   paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  // TODO: Do one gol tick and paint
   gol.tick();
  
   paint();
});

let intervalID = false;
document.getElementById("play_btn").addEventListener("click", event => {
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
  // HINT:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
  
  let enableAutoPlay = () => {
    gol.tick();  

    paint();
  }

  intervalID = setInterval(enableAutoPlay,300);
});

document.getElementById("random_btn").addEventListener("click", event => {
  // TODO: Randomize the board and paint
  let board = gol.board;
  for(let r=0;r<height;r++) {
    for(let c=0;c<width;c++) {
       board[r][c] = Math.floor(Math.random() * 2);
    }
  }
  
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  // TODO: Clear the board and paint
   let board = gol.board;
    
   for(let r=0;r<height;r++) {
     for(let c=0;c<width;c++) {
        board[r][c] = 0;
     }
   }
   
   paint();
});

document.getElementById("pause_btn").addEventListener("click", event => { 
   clearInterval(intervalID);
});
