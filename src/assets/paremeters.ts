
export type Options = 'none'|'square'|'labth'|'sorprise';

export const difficulty:Options[] = [
  'none', 'square','labth','sorprise'
]

export const rows = 21
export const cols = 21

export const startPos:[number,number] = [
  rows % 2 ? (rows-1)/2 : rows/2-1,
  cols % 2 ? (cols-1)/2 : cols/2-1,
]


export type CellValue = 'snake' | 'empty' | 'wall' | 'food'


const foods = ['🍇','🍉','🍒','🍓','🍍']

const randNum = ( max:number , min:number = 0 ) => Math.round(Math.random() * (max - min)) + min;

export const printValues = {
  snake:'⚫',
  empty:' ',
  wall:'🟧',
  food:foods[randNum(foods.length-1)],
}