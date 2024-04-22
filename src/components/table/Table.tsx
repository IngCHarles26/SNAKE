import { useEffect } from 'react';
import { useKeybaord } from '../../hooks/useKeyboard';
import useStore from '../../hooks/useStore';
import Row from './children/Row';
import './table.css'
import { cols, rows, startPos } from '../../assets/paremeters';
import { newPlay } from '../../assets/nextPlay';

const lenRows = rows;
const lenCols = cols;


function Table() {
  const {table,direction,snake,count,walls,win,lose,time,isSpecial
    ,stopCount,setIsSpecial,setFood,setDirection,setTable,setLose,setSnake,setTime,setWalls,setWin,setPage,setDifficulty} = useStore(st=>st)
  const newDirection = useKeybaord();
  const restPlays = rows*cols-(walls.length+snake.length)

  // console.log(time)

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

  const handleReset = ()=>{
    setPage(0)
    setDifficulty('none')
    setTable([])
    setDirection('moveRight')
    setTime(150)
    setWalls([])
    setSnake([startPos])
    setLose(false)
    setWin(false)
    setFood([0,0])
    setIsSpecial(false)
    stopCount()
  }


  return (
    <div className="table">
      <div className='title-table'>
        <p >
          {
            win 
              ? 'Congratulations'
              : lose 
                ? 'Ups'
                : restPlays + ' for the Victory'
          }
        </p>
        <button 
          className='reset-button'
          onClick={()=>handleReset()}
          >
          RESET
        </button>
      </div>

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