import { getRandom } from "../../../assets/genRandom";
import { tableGenerator } from "../../../assets/genTable";
import { cols, rows, startPos } from "../../../assets/paremeters";
import useStore from "../../../hooks/useStore";

interface Props{
  url: string,
  diff: 'none'|'square'|'labth'|'sorprise',
}

function ChoiseDiff(props:Props) {
  const {setPage,setDifficulty,setTable,runCount,time,setWalls,setIsSpecial} = useStore(st=>st)
  const{url,diff} = props

  const handleDiff = ()=>{
    const [sR,sC] = startPos;
    setPage(1)
    setDifficulty(diff)
    let newTable = tableGenerator(rows,cols,diff)
    let table = newTable.table
    let [fR,fC] = getRandom(rows,cols,[startPos])
    table[sR][sC] = 'snake'
    table[fR][fC] = 'food'
    setTable(table)
    setIsSpecial(diff=='sorprise') 
    setWalls(newTable.wallsPos)
    runCount(time)
  }

  return (
    <button onClick={()=>handleDiff()}>
      <img src={url} alt={'alt '+url} />
    </button>
  );
}

export default ChoiseDiff;