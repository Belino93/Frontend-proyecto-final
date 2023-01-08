import React from 'react'
import './SearchInput.css'

function SearchInput({handler}) {
  return (
    <form className="form">
    <input className="input" placeholder="Type your text" required="" type="text" onChange={(e)=>{handler(e.target.value)}}></input>
    
</form>
  )
}

export default SearchInput