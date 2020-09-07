import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
//signin page , from here user can sign in
//if user try to access any page without login he will be redirected to this page
function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const postData = () => {
    if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      return M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" })
        }
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("pic", data.pic)
          localStorage.setItem("user", JSON.stringify(data.user))

          M.toast({ html: "login success", classes: "#43a047 green darken-1" })
          history.push('/')
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field" style={{ boxShadow: "none" }}>
          <h3 style={{ fontFamily: "Helvetica Neue" }}>Login in</h3>
          <input
            type="text" placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="waves-effect waves-light btn #64b5f6 blue darken-2 s6"
            id="signup-button"
            onClick={() => postData()}
          >signin</button>
          <h5>

          </h5>
        </div>
        <Link to="/signup"><h4 style={{ textAlign: "center" }}>create a new account</h4></Link>
      </div>
    </div>
  )
}
export default Signin