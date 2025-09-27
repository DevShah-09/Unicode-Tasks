import './style.css'

const ovo_btn = document.querySelector("#onevsone");
const ovb_btn = document.querySelector("#onevsbot");
const curr_mode = document.querySelector("#mode");
const grid = document.querySelector("#grid");
const selector = document.querySelector("#select");
const reset = document.querySelector("#reset");

let board = [];
let curr = "X";
let curr_state = false;
let bot_state = false;

const win = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const grid_create = () => {
  board = Array(9).fill("");
  curr_state = true;
  curr = "X";

  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'w-32 h-32 bg-gray-400 rounded-3xl flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-700';
    cell.dataset.index = i;
    cell.textContent = '';
    grid.appendChild(cell);
    cell.addEventListener("click", cell_click);
  }
};

const new_load = () => {
  selector.classList.add('scale-70');
  selector.classList.remove('flex-col', 'space-y-5', 'flex-1');
  selector.classList.add('flex-row', 'space-x-7', 'h-22');
  grid.innerHTML = '';
};

const reset_button = () => {
  reset.innerHTML = '';

  const reset_btn = document.createElement('button');
  reset_btn.textContent = "Reset Game";
  reset_btn.className = 'mt-6 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold text-xl hover:bg-red-700 transition';

  reset_btn.addEventListener("click", () => {
    curr_mode.innerHTML = '';
    selector.classList.remove('scale-70', 'flex-row', 'space-x-7', 'h-24');
    selector.classList.add('flex-col', 'space-y-5', 'flex-1');
    grid.innerHTML = '';
    reset.innerHTML = '';
  });

  reset.append(reset_btn);
};

ovo_btn.addEventListener("click", () => {
  curr_mode.innerHTML = `<h2>You are playing Player1 vs Player2</h2>`;
  bot_state = false;
  new_load();
  grid_create();
  reset_button();
});

ovb_btn.addEventListener("click", () => {
  curr_mode.innerHTML = `<h2>You are playing Player vs Computer</h2>`;
  bot_state = true;
  new_load();
  grid_create();
  reset_button();
});

const check_win = (player) => {
  return win.some(combo =>
    combo.every(index => board[index] === player)
  );
};

const bot_move = () => {
  const empty = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (empty.length === 0) return;

  const random = empty[Math.floor(Math.random() * empty.length)];
  board[random] = "O";

  const cell = grid.querySelector(`[data-index="${random}"]`);
  if (cell) cell.textContent = "O";

  if (check_win("O")) {
    curr_mode.innerHTML = `<h2>Computer wins!</h2>`;
    curr_state = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    curr_mode.innerHTML = `<h2>It's a Draw!</h2>`;
    curr_state = false;
    return;
  }

  curr = "X";
};

const cell_click = (e) => {
  const idx = e.target.dataset.index;

  if (!curr_state || board[idx] !== "") return;

  board[idx] = curr;
  e.target.textContent = curr;

  if (check_win(curr)) {
    curr_mode.innerHTML = `<h2>Player ${curr} wins!</h2>`;
    curr_state = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    curr_mode.innerHTML = `<h2>It's a Draw!</h2>`;
    curr_state = false;
    return;
  }

  if (curr === "X") curr = "O";
  else curr = "X";


  if (bot_state && curr === "O" && curr_state) {
    setTimeout(
      ()=>{
        bot_move();
      },300
    )
  }
};
