import { getRandom } from "./genRandom";
import { CellValue } from "./paremeters";

export function newPlay(
  direction:'moveLeft'|'moveUp'|'moveDown'|'moveRight',
  table:CellValue[][],
  snakePos:[number,number][],
  lenRow:number,
  lenCol:number,
  walls:[number,number][],
  isSpecial?:boolean,
){
    let lose = false;
    let _table = [...table];
    let _walls = [...walls]
    let _snakePos:[number,number][] = [...snakePos];
    const nP = (n:number,len:number) => n>=0 ? n%len : len-1 
    
    const next = {
      moveLeft: (r:number,c:number) =>[r,nP(c-1,lenCol)],
      moveRight: (r:number,c:number) =>[r,nP(c+1,lenCol)],
      moveUp: (r:number,c:number) =>[nP(r-1,lenRow),c],
      moveDown: (r:number,c:number) =>[nP(r+1,lenRow),c],
    } 
    
    const [newPosRow,newPosCol] = next[direction](...snakePos[0])
    const valNewPos = table[newPosRow][newPosCol]
    if(['snake','wall'].includes(valNewPos)) lose = true
    
    _table[newPosRow][newPosCol] = 'snake'
    _snakePos.unshift([newPosRow,newPosCol])
  
    if(valNewPos != 'food'){
      //@ts-ignore
      const [lastPosR,lastPosC] = snakePos.at(-1);
      _snakePos.pop()
      _table[+lastPosR][+lastPosC] = 'empty';
    }else{
      const [nRF,nCF] = getRandom(lenRow,lenCol,[..._snakePos,...walls])
      _table[nRF][nCF] = 'food'
      if(isSpecial){
        const [nRW,nCW] = getRandom(lenRow,lenCol,[[nRF,nCF],..._snakePos,...walls])
        _table[nRW][nCW] = 'wall'
        _walls.push([nRW,nCW])
      }
    }

    
    return {table:_table,lose,snake:_snakePos,walls:_walls}
}
