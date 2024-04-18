import { useEffect, useState } from "react";

type Direct = 'moveLeft'|'moveUp'|'moveDown'|'moveRight';

const keyboardActions:{[key:string]:Direct} = {
  KeyW:       'moveUp',
  KeyS:       'moveDown',
  KeyA:       'moveLeft',
  KeyD:       'moveRight',
  ArrowUp:    'moveUp',
  ArrowDown:  'moveDown',
  ArrowLeft:  'moveLeft',
  ArrowRight: 'moveRight',
}


const initialDirection = 'moveRight'

export const useKeybaord = ()=>{
  const [direction, setDirection] = useState<Direct>(initialDirection);

  useEffect(()=>{
    const handleKey = (e:KeyboardEvent)=>{
      const action = keyboardActions[e.code];

      if(action) setDirection(_=>action)
    }

    const handleKeyDown = (e:KeyboardEvent) => handleKey(e)
    const handleKeyUp   = (e:KeyboardEvent) => handleKey(e)

    document.addEventListener('keydown',handleKeyDown);
    document.addEventListener('keyup',handleKeyUp);
    
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
      document.removeEventListener('keyup',handleKeyUp);
    }
  },[])
  return direction;
}