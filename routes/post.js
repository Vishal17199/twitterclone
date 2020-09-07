const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')
const requireLogin = require('./../middleware/requireLogin')
const e = require('express')
const { route } = require('./auth')

/*  old update pic
router.post('/updatepic',requireLogin,(req,res)=>{
       const {pic,_id} = req.body
       if(!pic){
           res.status(422).json({message:"please add a image"})
       }else{
       User.findByIdAndUpdate({_id:_id},{$set:{pic:pic}},{new:true},
           (error,result)=>{
               if(error){
                   return res.status(422).json({error:"pic cannot update"})
               }else{
                   res.json(result)
               }
           })
       }
   })*/

//this routr is used to update profile pic
//login needed
router.post('/updatepic', requireLogin, (req, res) => {
    const { pic, _id, email } = req.body
    if (!pic) {
        res.status(422).json({ message: "please add a image" })
    } else {
        User.findByIdAndUpdate({ _id: _id }, { $set: { pic: pic } }, { new: true },
            (error, result) => {
                if (error) {
                    return res.status(422).json({ error: "pic cannot update" })
                } else {
                    Post.find({ email: email })
                        .then(result2 => {
                            for (x = 0; x < result2.length; x++) {
                                Post.findByIdAndUpdate(result2[x]._id, { $set: { pic: req.body.pic } }, { new: true },
                                    (error, result3) => {
                                        if (error) {
                                            return res.status(422).json({ error: "pic cannot update" })
                                        } else {

                                        }
                                    })

                            }
                            res.json({ msg: "done" })

                        })
                        .catch(error => {
                            res.json({ error: error })
                        })

                    res.json(result)
                }
            })
    }
})




/*

router.post("/test", (req, res) => {
    const { email } = req.body
    Post.find({ email: email })
        .then(result => {
            for (x = 0; x < result.length; x++) {
                Post.findByIdAndUpdate(result[x]._id, { $set: { pic: req.body.pic } }, { new: true },
                    (error, result) => {
                        if (error) {
                            return res.status(422).json({ error: "pic cannot update" })
                        } else {

                        }
                    })

            }
            res.json({ msg: "done" })

        })
        .catch(error => {
            res.json({ error: error })
        })
})
*/

//to post a new tweet
router.post('/createpost', requireLogin, (req, res) => {
    const { name, email, title, pic } = req.body
    if (!name || !email || !title) {
        return res.json({ error: "please enter all the fields" })
    } else {
        const post = new Post({
            title,
            name,
            email,
            pic
        })
        post.save()
            .then((result) => {
                res.json({ msg: result })
            })
            .catch((error) => {
                res.json({ error: error })
            })
    }
})

//see all tweets on home page
router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .sort('-createdAt')
        .then((posts) => {
            res.json({ posts: posts })
        })
        .catch((error) => {
            res.json({ errror: error })
        })
})


/* Post.find({email:email})
     .sort('-createdAt')
     .then((posts) => {
         res.json({ posts: posts })
     })
     .catch((error) => {
         res.json({ errror: error })
     })
*/


//it is used for profile , in user profile page user can see its all posts
router.post('/mypost', requireLogin, (req, res) => {
    const { email } = req.body
    Post.find({ email: email })
        .then((posts) => {
            User.find({ email: email })
                .then(user => {
                    const followers = user[0].followers
                    const following = user[0].following
                    res.json({ posts: posts, followers, following })
                })
                .catch(err => {
                    res.json({ err: error })
                })
        })
        .catch((error) => {
            res.json({ error: error })
        })
})

//used to like a tweet
router.put('/like', requireLogin, (req, res) => {
    const { id, postId } = req.body
    Post.findByIdAndUpdate(postId, {
        $push: { likes: id }
    }, {
        new: true
    }).exec((error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        } else {
            res.json(result)
        }
    })
})

//to unlike a tweet
router.put('/unlike', requireLogin, (req, res) => {
    const { id, postId } = req.body
    Post.findByIdAndUpdate(postId, {
        $pull: { likes: id }
    }, {
        new: true
    }).exec((error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        } else {
            res.json(result)
        }
    })
})

//to follow a user
//a user can follow other and then follow button will replace with unfollow
router.put('/follow', requireLogin, (req, res) => {
    const { id, followId } = req.body
    User.findByIdAndUpdate(followId, {
        $push: { followers: id }
    }, {
        new: true
    }).exec((error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        } else {
            User.findByIdAndUpdate(req.body.id, {
                $push: { following: req.body.followId }
            }, { new: true })
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
        }
    })
})

//to unfollow a user
//a user can unfollow other and then unfollow button will replace with follow
router.put('/unfollow', requireLogin, (req, res) => {
    const { id, followId } = req.body
    User.findByIdAndUpdate(followId, {
        $pull: { followers: id }
    }, {
        new: true
    }).exec((error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        } else {
            User.findByIdAndUpdate(req.body.id, {
                $pull: { following: req.body.followId }
            }, { new: true })
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
        }
    })
})

/*this route send all data needed to show on profile , name , number of followers
, no of following, no of tweets , user posts etc*/
// this same route will show other profile with all details
router.post('/profile', requireLogin, (req, res) => {
    const { email } = req.body
    User.findOne({ email: email })
        .then((user) => {
            Post.find({ email: email })
                .then((posts) => {
                    res.json({ posts, user })
                })
                .catch((error) => {
                    res.json({ errror: error })
                })
        })
        .catch((error) => {
            res.json({ errror: error })
        })
})

//user can delete its posts
router.delete('/deletepost', requireLogin, (req, res) => {
    Post.findByIdAndDelete({ _id: req.body.postId })
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = router;
