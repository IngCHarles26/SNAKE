import { CellValue, printValues } from "../../../assets/paremeters";

interface Props{
  row: number,
  col: number,
  value: CellValue,
}

function Cell(props:Props) {

  const {value} = props

  return (
    <p className={'cell-table'}>
      {printValues[value]}
    </p>
  );
}

export default Cell;