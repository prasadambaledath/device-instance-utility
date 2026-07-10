import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="waffle">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} />
          ))}
        </span>
        <Link to="/" className="logo">
          <span className="i">i</span>Trac
        </Link>
        
      </div>
      <div className="poc-info tool-name">
        POC - Device Instance Utility
      </div>
    </div>
  )
}

export default Header
