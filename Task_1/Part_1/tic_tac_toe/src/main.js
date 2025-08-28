import './style.css'

const ovo_btn=document.querySelector("#onevsone");
const ovb_btn=document.querySelector("#onevsbot");
const curr_mode=document.querySelector("#mode");
const grid=document.querySelector("#grid");
const selector=document.querySelector("#select")


//one vs one button
ovo_btn.addEventListener("click",()=>{
  curr_mode.innerHTML=`<h2 class="">You are playing Player vs Player</h2>`;
  selector.classList.add('scale-70');
  selector.classList.remove('flex-col','space-y-5','flex-1');
  selector.classList.add('flex-row','space-x-7','h-24');
  grid.innerHTML='';

  for(let i=0;i<9;i++){
    const cell=document.createElement('div');
    cell.className='w-30 h-30 bg-gray-400 rounded-3xl flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-700';
    cell.dataset.index = i;
    cell.textContent = '';
    grid.appendChild(cell);
  }
})


//one vs bot button
ovb_btn.addEventListener("click",()=>{
  curr_mode.innerHTML=`<h2>You are playing Player vs Computer</h2>`
})