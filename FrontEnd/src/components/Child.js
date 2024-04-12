import React from 'react'

const Child = (props) => {
   
  return (
    <div>
        
        <button onClick={()=>props.updateText('Hello')}>Text</button>
       
        </div>
  )
}

export default Child