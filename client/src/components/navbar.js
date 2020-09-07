import React from "react"
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
//navbar -> login , logout and all other navigation links are available here

function Navbar() {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
  const history = useHistory()
  const Logout = () => {
    localStorage.clear()
    history.push('/signin')
  }

  const RenderList = () => {
    const state = localStorage.getItem('jwt')
    if (state) {
      return [
        <li><Link to="/">Home</Link></li>,
        <li><Link to="/profile">profile</Link></li>,
        <li><Link to="/updatepic">update pic</Link></li>,
        <li onClick={() => Logout()}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn" style={{ backgroundColor: "red" }}>Logout</button>&nbsp;&nbsp;
        </li>,
      ]
    } else {
      return [
        <li><Link to="/signin">Log in</Link></li>,
        <li><Link to="/signup">sign up</Link></li>
      ]
    }
  }

  const RenderList2 = () => {
    const state = localStorage.getItem('jwt')
    if (state) {
      return [

      ]
    } else {
      return [
        <li><Link to="/signin">Log in</Link></li>,
        <li><Link to="/signup">sign up</Link></li>
      ]
    }
  }



  return (
    <div>
      <nav>
        <div className="nav-wrapper" style={{ backgroundColor: "#1DA1F2" }}>
          <Link to="/" className="brand-logo">&nbsp;Twitee</Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {RenderList2()}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {RenderList()}
      </ul>
    </div>
  )
}

export default Navbar;