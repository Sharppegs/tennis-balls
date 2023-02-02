import React from 'react'
import {useParams, Link} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { Context } from "../Context"
import { nanoid } from 'nanoid'
import playerdata from '../playerdata'



function Game() {
  const showId = useParams()
  const pageData = playerdata[showId.id]
  console.log(showId.id)
  console.log(playerdata)

  return (
    
    <div className='show-container' key={pageData.id}>
      <h1 className='logo-show'>Logo</h1>
      <h2>{pageData.name}</h2>
      <h2>{pageData.age}</h2>

      <Link to={`/`}>Go back!</Link>
      
          
            
        </div>  

        
        
  )
}

export default Game