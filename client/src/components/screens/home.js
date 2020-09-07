import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

//here all the tweets are avilable,with name and pic

function Home() {
    const history = useHistory()
    if (localStorage.getItem('jwt') == undefined) {
        localStorage.clear()
        history.push('/signup')
    }
    const user3 = localStorage.getItem('user')
    const user4 = JSON.parse(user3)
    if (user4) {
        var pic2 = user4.pic
        var myid = user4._id
        var myemail = user4.email
        var newpic2 = localStorage.getItem('pic')
    } else {
        localStorage.clear()
        history.push('/signin')
    }
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
            .then((result) => {
                setPosts(result.posts)

            })
    }, [])

    const createPost = () => {
        const user = localStorage.getItem('user')
        const user2 = JSON.parse(user);
        const name = user2.name
        const email = user2.email
        const pic = localStorage.getItem('pic')
        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                name,
                email,
                pic
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Created post Successfully", classes: "#43a047 green darken-1" })
                    history.push('/')
                    window.location.reload(false)
                }
            }).catch(err => {
                console.log(err)
            })

    }
    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
                id: myid
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    window.location.reload(false);

                }
            }).catch(err => {
                console.log(err)
            })

    }
    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
                id: myid
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    window.location.reload(false);
                }
            }).catch(err => {
                console.log(err)
            })

    }
    const Logout = () => {
        localStorage.clear()
        history.push('/signin')
    }


    return (
        <div>
            <div className="row">
                <div className="col s12 m4 l3" id="home1">
                    <br></br>
                    <div className="row">
                        <Link to="/"> <div className="home-one-con">  <i className="material-icons">home</i>&nbsp;&nbsp;&nbsp;<span>Home</span></div></Link>
                    </div>
                    <div className="row">
                        <Link to="/profile"><div className="home-one-con">  <i className="material-icons">account_circle</i>&nbsp;&nbsp;&nbsp;<span>Profile</span></div></Link>
                    </div>
                    <div className="row">
                        <Link to="/updatepic"><div className="home-one-con">  <i className="material-icons">photo_library</i>&nbsp;&nbsp;&nbsp;<span>update profile</span></div></Link>
                    </div>
                    <div className="row">
                        <div
                            className="home-one-con">  <i className="material-icons">notifications</i>&nbsp;&nbsp;&nbsp;<span>notifications</span></div>
                    </div>
                    <div className="row">
                        <div
                            className="home-one-con">  <i className="material-icons">message</i>&nbsp;&nbsp;&nbsp;<span>message</span></div>
                    </div>
                    <div className="row">
                        <div
                            className="home-one-con">  <i className="material-icons">bookmark</i>&nbsp;&nbsp;&nbsp;<span>Bookmark</span></div>
                    </div>
                    <div className="row">
                        <div
                            className="home-one-con"
                            onClick={() => Logout()}>
                            <i className="material-icons">exit_to_app</i>&nbsp;&nbsp;&nbsp;<span>Logout</span></div>
                    </div>
                    <div className="row">
                        <div
                            className="home-one-con">  <i className="material-icons">more_horiz</i>&nbsp;&nbsp;&nbsp;<span>More</span></div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn "
                            id="tweet-button" >tweet</button>
                    </div>
                    <div className="row"></div>
                </div>
                <div className="col s12 m4 l6" id="home2">


                    <div>
                        <div><span id="home-font">Home </span><i className="material-icons" id="noti-icon">notifications</i></div>
                        <hr />
                    </div>
                    <div>
                        <div className="home2-t-c2">
                            <img className="home2-profile" src={newpic2} alt="not found" />

                            <input type="text" placeholder="whats happening" className="home2-input-m"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <span className="home2-input-m2" style={{ color: "white" }}>d</span>
                            <button className="waves-effect waves-light btn" id="tweet-button2"
                                onClick={() => createPost()}
                            >tweet</button>
                        </div>
                        <br /><hr />

                        {posts.map((items, i) => {
                            return (
                                <div key={i}>
                                    <div className="card1">
                                        <img className="home2-profile2" src={items.pic} alt="not found" />

                                        <Link to={items.email !== myemail ? "/userprofile/" + items.email : "/profile"}>
                                            <span className="name1">{items.name}</span>
                                        </Link>

                                        <i className="material-icons" id="more-icon">expand_more</i>
                                    </div>
                                    <div style={{ display: "inline" }}>
                                        <p>{items.title}</p>
                                        <br />
                                        <i className="material-icons" id="more-icon1">chat_bubble_outline</i>
                                        <i className="material-icons" id="more-icon2">import_export</i>
                                        {items.likes.includes(myid) ?
                                            <i className="material-icons" id="more-icon3"
                                                style={{ color: "red" }}
                                                onClick={() => unlikePost(items._id)}
                                            >favorite</i>
                                            :
                                            <i className="material-icons" id="more-icon3"
                                                onClick={() => likePost(items._id)}
                                            >favorite_border</i>
                                        }

                                        <i className="material-icons" id="more-icon4">file_upload</i>
                                    </div>
                                    <hr />
                                </div>

                            )
                        })
                        }

                    </div>



                </div>

                <div className="col s12 m4 l3" id="home3">
                    <input className="home3-search" type="text" placeholder="search tweeter" />
                    <div className="home3-con">
                        <p className="home3-happen">whats happening</p>
                        <hr />
                        <p className="home3-title">javaScript</p>
                        <p className="home3-dis">best javaScript framework 2020</p>
                        <hr />
                        <p className="home3-title">world war 3</p>
                        <p className="home3-dis">pressure between india and china</p>
                        <hr />
                        <p className="home3-title">MP Board</p>
                        <p className="home3-dis">all exams cancelled.
                        general promotion for all students</p>
                        <hr />
                        <p className="home3-title">happy yoga day</p>
                        <p className="home3-dis">Yoga for all</p>
                        <hr />
                        <p className="home3-title">moz</p>
                        <p className="home3-dis">latest facts about seo</p>
                        <hr />
                        <p className="home3-title">#ISRO</p>
                        <p className="home3-dis">ISRO formally welcomes private industry into space sector</p>
                        <hr />
                        <p className="home3-title">TourEiffel</p>
                        <p className="home3-dis">The Eiffel Tower reopens after more than 100 days</p>
                        <hr />
                        <p className="home3-title">Gadgets360</p>
                        <p className="home3-dis">Everything Apple Announced at WWDC 2020</p>
                        <hr />
                        <p className="home3-title">The news Indian Express</p>
                        <p className="home3-dis">Trump presses pause button on H-1B visa; All you need to know</p>
                        <hr />
                        <p className="home3-title">#Cyclone</p>
                        <p className="home3-dis">Cyclone threat: 'red alert' for Mumbai, Thane</p>
                        <br />

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home