import React from 'react'

const great = ({name,age,children}) => {

    const test =()=>{console.log("Hello! ");}

    const name2=["sk", "Era", "Priya"];
  return (
    <div>great
    Hello {name}
    age {age}
   {children}
   <button onClick={()=>{console.log("Hello! ")}}>click</button>
   {
    name2.map((name,index)=> (
        <div>
            {name} {index}
        </div>
    ))
   }
    </div>
  )
}

export default great