import { CellValue, Options } from "./paremeters"

function createMatrix(
  row:number,
  col:number
):CellValue[][]{
  return Array.from({length:row},()=>Array.from({length:col},()=>'empty'))
}


export function tableGenerator(
  row: number,
  col: number,
  difficulty: Options
){
  // none and sorprise case
  let table = createMatrix(row,col)
  let wallsPos:[number,number][] = [];

  if (['none','sorprise'].includes(difficulty)) return {table,wallsPos}
  
  // square case
  if (difficulty == 'square'){
    for(let r in table){
      for(let c in table[0]){
        const valR = +r == 0 || +r == (row-1)
        const valC = +c == 0 || +c == (col-1)
        if (valR || valC){
          table[r][c] = 'wall'
          wallsPos.push([+r,+c])
        }
      }
    }
  }
  
  // labth case
  if (difficulty == 'labth'){
    const {floor} = Math
    // estan la 35% de la pared
    // su longitud es del 50%
    const [r40,c40] = [floor(row*.35),floor(col*.35)]
    
    // horizontal
    const [ih1,ih2] = [r40,row-1-r40]
    for(let i = 0; i<=r40; i++){
      wallsPos.push([ih2,i],[ih1,col-1-i,])
    }
    // vertical
    const [ic1,ic2] = [c40,col-1-c40]
    for(let i = 0; i<=c40; i++){
      wallsPos.push([i,ic1],[row-1-i,ic2])
    }
    wallsPos.forEach(([_r,_c])=>table[_r][_c] = 'wall')
    
  }
  return {table,wallsPos}
}