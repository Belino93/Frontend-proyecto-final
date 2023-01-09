import React from 'react'
import './SearchInput.css'

function SearchInput({handler}) {
  return (
    <form className="form-search">
    <input className="input" placeholder="Search by Imei" required="" type="text" onChange={(e)=>{handler(e.target.value)}}></input>
    
</form>
  )
}

export default SearchInput