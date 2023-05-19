let hamburger = document.getElementById("hamburger");

let html = `<button class="menu-button" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu">
<svg width="100" height="100" viewBox="0 0 100 100">
  <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
  <path class="line line2" d="M 20,50 H 80" />
  <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
</svg>
</button>`;

hamburger.insertAdjacentHTML("beforeend", html);

// GAME

var lostGif = document.getElementById("lostGif");

var easyDiff = document.getElementById("easyDifficulty");
var mediumDiff = document.getElementById("mediumDifficulty");
var hardDiff = document.getElementById("hardDifficulty");

var isEasy = false;
var isMedium = true;
var isHard = false;
mediumDiff.style.textDecoration = "underline";

function changeEasy() {
  components = componentsEasy;
  isEasy = true;
  isMedium = false;
  isHard = false;
  easyDiff.style.textDecoration = "underline";
  mediumDiff.style.textDecoration = "none";
  hardDiff.style.textDecoration = "none";
}

function changeMedium() {
  components = componentsMedium;
  isEasy = false;
  isMedium = true;
  isHard = false;
  easyDiff.style.textDecoration = "none";
  mediumDiff.style.textDecoration = "underline";
  hardDiff.style.textDecoration = "none";
}

function changeHard() {
  components = componentsHard;
  isEasy = false;
  isMedium = false;
  isHard = true;
  easyDiff.style.textDecoration = "none";
  mediumDiff.style.textDecoration = "none";
  hardDiff.style.textDecoration = "underline";
}

var componentsEasy = {
  num_of_rows: 6,
  num_of_cols: 12,
  num_of_bombs: 15,
  num_of_cells: 72,
  num_of_safe: 57,
  bomb: String.fromCodePoint(0x1f4a3),
  flag: String.fromCodePoint(0x1f6a9),
  alive: true,
  colors: {
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
    5: "maroon",
    6: "turquoise",
    7: "black",
    8: "grey",
  },
};

var componentsMedium = {
  num_of_rows: 9,
  num_of_cols: 18,
  num_of_bombs: 44,
  num_of_cells: 162,
  num_of_safe: 134,
  bomb: String.fromCodePoint(0x1f4a3),
  flag: String.fromCodePoint(0x1f6a9),
  alive: true,
  colors: {
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
    5: "maroon",
    6: "turquoise",
    7: "black",
    8: "grey",
  },
};

var componentsHard = {
  num_of_rows: 12,
  num_of_cols: 24,
  num_of_bombs: 95,
  num_of_cells: 288,
  num_of_safe: 163,
  bomb: String.fromCodePoint(0x1f4a3),
  flag: String.fromCodePoint(0x1f6a9),
  alive: true,
  colors: {
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
    5: "maroon",
    6: "turquoise",
    7: "black",
    8: "grey",
  },
};

var components = componentsMedium;

function diffChecker() {
  if (isEasy == true) {
    startGame();
  }

  if (isMedium == true) {
    startGame();
  }

  if (isHard == true) {
    startGame();
  }
}

var firstClick = true;
var cellsRemaining;
function startGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("startButton").style.pointerEvents = "none";
  document.getElementById("restartButton").style.display = "block";
  document.getElementById("restartButton").style.pointerEvents = "all";
  components.num_of_bombs = placeBombs();
  cellsRemaining = components.num_of_cells;
  document.getElementById("field").appendChild(createTable());
  document.querySelectorAll("td").forEach(function (td) {
    td.unopened = true;
    td.addEventListener("mousedown", function (event) {
      if (
        firstClick &&
        components.num_of_bombs[this.dataset.row][this.dataset.col]
      ) {
        components.num_of_bombs[this.dataset.row][this.dataset.col] = false;
        var newBombRow, newBombCol;
        do {
          newBombRow = Math.floor(Math.random() * components.num_of_rows);
          newBombCol = Math.floor(Math.random() * components.num_of_cols);
        } while (components.num_of_bombs[newBombRow][newBombCol]);
        components.num_of_bombs[newBombRow][newBombCol] = true;
        if (
          adjacentBombs(
            parseInt(this.dataset.row),
            parseInt(this.dataset.col)
          ) === 0
        ) {
          performMassClick(
            this,
            parseInt(this.dataset.row),
            parseInt(this.dataset.col)
          );
        }
      }
      firstClick = false;
      components.mousebuttons += event.button;
      if (event.button === 2) {
        return;
      }
      if (this.flagged) {
        return;
      }
      this.style.backgroundColor = "lightGrey";
    });
  });
}

function placeBombs() {
  var i,
    rows = [];

  for (i = 0; i < components.num_of_bombs; i++) {
    placeSingleBomb(rows);
  }
  return rows;
}

function placeSingleBomb(bombs) {
  var nrow, ncol, row, col;
  nrow = Math.floor(Math.random() * components.num_of_rows);
  ncol = Math.floor(Math.random() * components.num_of_cols);
  row = bombs[nrow];

  if (!row) {
    row = [];
    bombs[nrow] = row;
  }

  col = row[ncol];

  if (!col) {
    row[ncol] = true;
    return;
  } else {
    placeSingleBomb(bombs);
  }
}

function cellID(i, j) {
  return "cell-" + i + "-" + j;
}

function createTable() {
  var table, row, td, i, j;
  table = document.createElement("table");

  for (i = 0; i < components.num_of_rows; i++) {
    row = document.createElement("tr");
    for (j = 0; j < components.num_of_cols; j++) {
      td = document.createElement("td");
      td.id = cellID(i, j);
      td.dataset.row = i;
      td.dataset.col = j;
      row.appendChild(td);
      addCellListeners(td, i, j);
    }
    table.appendChild(row);
  }
  return table;
}

function addCellListeners(td, i, j) {
  td.addEventListener("mousedown", function (event) {
    if (!components.alive) {
      return;
    }
    components.mousewhiches += event.which;
    if (event.which === 3) {
      return;
    }
    if (this.flagged) {
      return;
    }
    this.style.backgroundColor = "#319B54";
  });
  td.addEventListener("mouseup", function (event) {
    if (!components.alive) {
      return;
    }
    if (this.clicked && components.mousewhiches == 4) {
      performMassClick(this, i, j);
    }
    components.mousewhiches = 0;
    if (event.which === 3) {
      if (this.clicked) {
        return;
      }
      if (this.flagged) {
        this.flagged = false;
        this.textContent = "";
      } else {
        this.flagged = true;
        this.textContent = components.flag;
      }
      event.preventDefault();
      event.stopPropagation();
      return false;
    } else {
      handleCellClick(this, i, j);
    }
  });

  td.oncontextmenu = function () {
    return false;
  };
}

function handleCellClick(cell, i, j) {
  if (!components.alive) {
    return;
  }

  if (cell.flagged) {
    return;
  }

  cell.clicked = true;

  if (components.num_of_bombs[i][j] && firstClick === false) {
    cell.style.color = "red";
    cell.textContent = components.bomb;
    gameOver();
  } else {
    cell.style.backgroundColor = "lightGrey";
    num_of_bombs = adjacentBombs(i, j);
    if (num_of_bombs) {
      cell.style.color = components.colors[num_of_bombs];
      cell.textContent = num_of_bombs;
    } else {
      performMassClick(cell, i, j);
    }
    if (cell.unopened) {
      cellsRemaining -= 1;
      cell.unopened = false;
    }
  }

  if (cellsRemaining === components.num_of_bombs) {
    gameWon();
  }
}

function adjacentBombs(row, col) {
  var i, j, num_of_bombs;
  num_of_bombs = 0;

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      if (
        components.num_of_bombs[row + i] &&
        components.num_of_bombs[row + i][col + j]
      ) {
        num_of_bombs++;
      }
    }
  }
  return num_of_bombs;
}

function adjacentFlags(row, col) {
  var i, j, num_flags;
  num_flags = 0;

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      cell = document.getElementById(cellID(row + i, col + j));
      if (!!cell && cell.flagged) {
        num_flags++;
      }
    }
  }
  return num_flags;
}

function clickAdjacentBombs(row, col) {
  var i, j, cell;

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      cell = document.getElementById(cellID(row + i, col + j));

      if (!!cell && !cell.clicked && !cell.flagged) {
        handleCellClick(cell, row + i, col + j);
      }
    }
  }
}

function performMassClick(cell, row, col) {
  var i, j;
  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      var adjacentCell = document.getElementById(cellID(row + i, col + j));
      if (adjacentCell && !adjacentCell.clicked && !adjacentCell.flagged) {
        handleCellClick(adjacentCell, row + i, col + j);
      }
    }
  }
}

var clientX;
var clientY;
var gifWidth = lostGif.clientWidth / 2;
var gifHeight = lostGif.clientHeight / 2;
document.onclick = (event) => {
  deathCenterX = event.clientX - gifWidth;
  deathCenterY = event.clientY - gifHeight;
};

function gameOver() {
  components.alive = false;
  document.getElementById("lostText").style.display = "block";
  lostGif.style.display = "block";
  lostGif.style.position = "absolute";
  lostGif.style.left = deathCenterX + "px";
  lostGif.style.top = deathCenterY + "px";
  lostGif.style.zIndex = "10";
  lostGif.style.pointerEvents = "none";
}

function gameWon() {
  document.getElementById("wonText").style.display = "block";
}

function reload() {
  window.location.reload();
}
