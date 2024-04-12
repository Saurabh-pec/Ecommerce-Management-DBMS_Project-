import React, { useState } from 'react'
import Child from './Child';

const Parent = () => {
   const [text, setText] = useState('');
   function updateText(message){
    setText(message);
   }

  return (
    <div>
        Text: {text}
        <Child updateText={updateText}>
            </Child>

    </div>

  )
}

export default Parent