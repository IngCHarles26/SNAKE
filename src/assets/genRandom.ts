//@ts-ignore
const random = (max,min=0)=>Math.round(Math.random()*(max-1-min))+min;
//@ts-ignore
const valInArray = ([r,c],inf)=>inf.some(([n1,n2])=> n1==r && n2==c);


export function getRandom(
  lenRow:number,
  lenCol:number,
  data:[number,number][],
){
  let newVal:[number,number];
  do{
    newVal = [random(lenRow),random(lenCol)];
  }while(valInArray(newVal,data));
  return newVal
}