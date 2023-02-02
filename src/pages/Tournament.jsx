import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Context } from "../Context"
import { nanoid } from 'nanoid'
import PlayerCard from '../components/PlayerCard'
import playerdata from '../playerdata'

function Tournament() {
  const{list, getWatchList} = useContext(Context) 
  
  

  useEffect(() => {
    getWatchList()
    localStorage.setItem('myShows', JSON.stringify(list))
  }, [])

 
  
  return (
    <>
    <h1 className='watchlist-title'>Wimbledon</h1>
    <div className='list-items'>
        {playerdata?.map(player => 
        <PlayerCard 
            key={nanoid()}
            id={player.id}
            name={player.name}
            age={player.age}  
        />
        
        )}
    </div>
    </>
  )
}

export default Tournament