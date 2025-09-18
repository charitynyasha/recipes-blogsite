import { notFound } from 'next/navigation'
import React from 'react'







const getData = async () => {
const res= await fetch("http://localhost:3000/api/post",{cache:"no-store"})
if(!res.ok) return notFound()
return res.json()
}









const NewComp = async() => {
    const data =  await getData();
  return (
    <div>
        {data.map((post)=>(
            
            <div className='text-red-600 p-4 m-4' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>

            </div>
            
            
            ))};



    </div>
  )
}

export default NewComp