import { useEffect } from 'react';
import { useKeybaord } from '../../hooks/useKeyboard';
import useStore from '../../hooks/useStore';
import Row from './children/Row';
import './table.css'
import { cols, rows } from '../../assets/paremeters';
import { newPlay } from '../../assets/nextPlay';

const lenRows = rows;
const lenCols = cols;


function Table() {
  const {table,direction,snake,count,walls,win,lose,time,isSpecial
    ,setDirection,setTable,setLose,setSnake,setTime,setWalls,setWin} = useStore(st=>st)
  const newDirection = useKeybaord();
  const restPlays = rows*cols-(walls.length+snake.length)

  useEffect(()=>{
    const ruleV = ['moveUp','moveDown'];
    const ruleH = ['moveLeft','moveRight'];
    const valV = ruleV.includes(direction) && ruleV.includes(newDirection);
    const valH = ruleH.includes(direction) && ruleH.includes(newDirection);
    if(!valH && !valV) setDirection(newDirection);
  },[newDirection])


  useEffect(()=>{
    // console.log(lose)
    if (!win && !lose){
      const _snake =  [...snake]
      const {table:newTable,snake:newSnake,lose:_lose,walls:_walls} = newPlay(direction,table,snake,lenRows,lenCols,walls,isSpecial);

      if(newSnake.length > _snake.length) setTime(time-1)
      if(isSpecial) setWalls(_walls)
      setTable(newTable)
      setSnake(newSnake)
      
      if(_lose) setLose(true)
      if( restPlays == 0 ) setWin(true)
    }
    
  },[count])



  return (
    <div className="table">
      <p className='title-table'>
        {
          win 
            ? 'Congratulations'
            : lose 
              ? 'Ups'
              : restPlays + ' for the Victory'
        }
      </p>

      <div className="container-table">
        {
          table.map((row,ix)=>(
            <Row
              key={'Row'+ix+row}
              row={+row}
              values={table[ix]}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Table;