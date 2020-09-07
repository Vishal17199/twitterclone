import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'

//to create a new account
function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const postData = () => {
    if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      return M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" })
        }
        else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" })
          history.push('/signin')
        }
      }).catch(error => {
        console.log(error)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field" style={{ boxShadow: "none" }}>
          <h3 style={{ fontFamily: "Helvetica Neue" }}>Join  Twitee today</h3>
          <input
            type="text" placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text" placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password" placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="waves-effect waves-light btn #64b5f6 blue darken-2 s6"
            id="signup-button"
            onClick={() => postData()}
          >signup</button>
          <h5>

          </h5>
        </div>
      </div>
      <Link to="/signin"><h4 style={{ textAlign: "center" }}>Already have an account</h4></Link>

    </div>
  )
}
export default Signup