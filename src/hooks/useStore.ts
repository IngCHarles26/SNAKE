import { create } from "zustand";
import { CellValue, startPos } from "../assets/paremeters";

export const limit = 5;

type State = {
  page: number,
  difficulty: 'none'|'square'|'labth'|'sorprise',
  table: CellValue[][],
  direction: 'moveLeft'|'moveUp'|'moveDown'|'moveRight',
  time: number,
  count: number,
  walls: [number,number][],
  snake: [number,number][],
  lose: boolean,
  win: boolean,
  food: [number,number],
  isSpecial: boolean,
  idInterval: number | null,
}

type Action = {
  setPage: (type:number)=>void,
  setDifficulty: (type:State['difficulty'])=>void,
  setTable: (type:CellValue[][])=>void,
  setDirection: (type:State['direction'])=>void,
  setTime: (type:number) => void,
  runCount: (type:number)=>void,
  stopCount: ()=>void,
  setWalls: (type:State['walls'])=>void,
  setSnake: (type:State['snake'])=>void,
  setLose: (type:boolean)=>void,
  setWin: (type:boolean)=>void,
  setFood: (type:State['food'])=>void,
  setIsSpecial: (type:boolean)=>void,
}

const useStore = create<State & Action>((set)=>({
  // pagina
  page: 0,
  setPage: (_page)=>set(()=>({page:_page})),

  //difficulty
  difficulty: 'none',
  setDifficulty: (_diff)=>set(()=>({difficulty:_diff})),

  //table
  table: [],
  setTable: (_table)=>set(()=>({table:_table})),
  
  // direction
  direction: 'moveRight',
  setDirection: (_direction)=>set(()=>({direction:_direction})),
  
  // time
  time: 150,
  setTime: (_time)=>set(()=>({time:_time})),
  
  // counter
  count: 1,
  idInterval: null,
  runCount: (_time)=>{
    const idInterval = setInterval(()=>{set((state)=>({count:(state.count+1)%limit}))}
    ,_time);
    set({idInterval})
  },
  stopCount: ()=>{
    const {idInterval} = useStore.getState()
    if (idInterval){
      clearInterval(idInterval)
      set({idInterval:null})
    }
  },
  
  // walls
  walls: [],
  setWalls: (_walls)=>set(()=>({walls:_walls})),
  
  // snake
  snake: [startPos],
  setSnake: (_snake)=>set(()=>({snake:_snake})),

  // lose
  lose: false,
  setLose: (_lose)=>set(()=>({lose:_lose})),

  // win
  win: false,
  setWin: (_win)=>set(()=>({win:_win})),

  // food
  food: [0,0],
  setFood: (_food)=>set(()=>({food:_food})),

  // food
  isSpecial: false,
  setIsSpecial: (_isSpecial)=>set(()=>({isSpecial:_isSpecial})),

}))


export default useStore;