import {useContext, useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Context} from "../Context.jsx"

function ListItem(props) {
const params = useParams()
const {removeFromList, list} = useContext(Context) 








  return (
    
    <Link to={`/game/${props.id}`}
        className='list-item'
    >   
    <div className='list-item-container' id={props.id}>
      <h2>{props.name}</h2>
      <p>{props.age}</p>
        <div className='list-item-title'>
        
        
        </div>
        </div>
    </Link>

   

  )
}

export default ListItem