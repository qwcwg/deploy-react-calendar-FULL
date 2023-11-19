import { Link } from "react-router-dom"

export const LinkButtons = () => {
  return(
  <div className='link-buttons-container'>
    <div className="left-sort-container">
      <Link to='/'><button>home</button></Link>      
    </div>
    <div className="right-sort-container">
      <Link to='/test'><button>add schedule</button></Link>      
    </div>
  </div>
  )
}