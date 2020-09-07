import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
// from here user can change its profile pic

const UpdatePic = () => {
  const history = useHistory()
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const user2 = localStorage.getItem('user')
  const user3 = JSON.parse(user2)
  const _id = user3._id
  const email = user3.email

  useEffect(() => {

    if (url) {
      fetch("/updatepic", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          _id,
          pic: url,
          email
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" })
          }
          else {
            localStorage.removeItem('pic')
            localStorage.setItem('pic', url)
            M.toast({ html: "updated Successfully", classes: "#43a047 green darken-1" })
            history.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }, [url])

  const postpic = () => {
    if (!image) {
      M.toast({ html: "plase select image", classes: "#c62828 red darken-3" })
      return
    }
    document.getElementById('loading-w').style.display = 'inline'
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "tweeter-clone")
    data.append("cloud_name", "dqxpziuie")
    //dont foget to add /image/upload in end of cloudnary api
    fetch('https://api.cloudinary.com/v1_1/dqxpziuie/image/upload', {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div> <h5 className="center">update profile pic</h5>

      <div className="card input-filed"
        style={{
          margin: "20px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center"
        }}>

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="waves-effect waves-light btn #64b5f6 blue darken-2"
          onClick={() => postpic()}
        > UPDATE</button>
      </div>
      <br />
      <div style={{ textAlign: "center" }}><h3 id="loading-w">Updating...please wait</h3></div>
      <div id="cancel-b1-con"><div className="btn" id="cancel-b1" onClick={() => {
        history.push('/')
      }}>cancel</div></div>
    </div>
  )
}

export default UpdatePic