import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

/*this page show user its own profile, profile image , all tweets , 
no of tweets ,no of followers , following , also delete button to delete tweets etc*/
function Myprofile() {
    const history = useHistory()
    const [mypost, setMypost] = useState([])
    const [upadtedfollowers, setUpadtedfollowers] = useState([])
    const [upadtedfollowing, setUpadtedfollowing] = useState([])

    const user = localStorage.getItem('user')
    const user2 = JSON.parse(user);
    if (user2) {
        var myname = user2.name
        var email = user2.email
        var mypic = localStorage.getItem('pic')
        var myid = user2._id
        var followers = user2.followers
        var following = user2.following
    } else {
        history.push('/signin')
    }
    useEffect(() => {
        fetch('/mypost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                email
            })
        }).then(res => res.json())
            .then((result) => {
                setMypost(result.posts)
                setUpadtedfollowers(result.followers)
                setUpadtedfollowing(result.following)
            })
    }, [])
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


    const deletePost = (id) => {
        fetch("/deletepost", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
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
            <div class="row">
                <div class="col s12 m4 l3" id="home1">
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
                            className="home-one-con">  <i class="material-icons">more_horiz</i>&nbsp;&nbsp;&nbsp;<span>Home</span></div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn "
                            id="tweet-button" >tweet</button>
                    </div>
                    <div className="row"></div>
                </div>
                <div class="col s12 m4 l6" id="myprofile">


                    <div className="pro-main1">
                        <div className="pro-main2"></div>
                        <div class="pro-head">
                            <div>
                                <img src={mypic} id="pro-head-pic" alt="not found" />
                            </div>
                            <div id="pro-head-name">{myname}</div>
                            <div id="pro-head-f">
                                <span>{mypost.length} tweets &nbsp; {upadtedfollowers.length} followers  &nbsp; {upadtedfollowing.length}following</span>
                            </div>
                        </div>

                        <hr />
                        {mypost.map(items => {
                            return (
                                <div>
                                    <div class="pro-card1">
                                        <img class="pro-profile2" src={mypic} alt="not found" />
                                        <span class="pro-name1">{items.name}</span>
                                        <i class="material-icons" id="more-icon">expand_more</i>
                                    </div>
                                    <div style={{ display: "inline" }}>
                                        <p>{items.title}</p>
                                        <br />
                                        <i class="material-icons" id="more-icon1">chat_bubble_outline</i>
                                        <i class="material-icons" id="more-icon2">import_export</i>
                                        {items.likes.includes(myid) ?
                                            <i class="material-icons" id="more-icon3"
                                                style={{ color: "red" }}
                                                onClick={() => unlikePost(items._id)}
                                            >favorite</i>
                                            :
                                            <i class="material-icons" id="more-icon3"
                                                onClick={() => likePost(items._id)}
                                            >favorite_border</i>
                                        }
                                        <i class="material-icons" id="more-icon4"
                                            onClick={() => deletePost(items._id)}
                                        >delete</i>
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
export default Myprofile