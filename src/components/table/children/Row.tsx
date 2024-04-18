import { CellValue } from "../../../assets/paremeters";
import Cell from "./Cell";

interface Props{
  row: number,
  values: CellValue[],
}

function Row(props:Props) {
  const {row,values} = props;  
  
  
  return (
    <div className="row-table">
      {
        values.map((col,ix)=>(
          <Cell
            key={'Cell'+ix+col}
            col={+col}
            row={+row}
            value={values[ix]}
          />
        ))
      }
    </div>
  );
}

export default Row;