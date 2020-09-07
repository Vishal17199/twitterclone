const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')

//for signup 
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ error: "please fill all the fields" })
    }
    User.findOne({ email: email })
        .then((saveduser) => {
            if (saveduser) {
                return res.json({ msg: "user already exists" })
            } else {
                bcrypt.hash(password, 10)
                    .then((hashedPassword) => {
                        const user = new User({
                            name,
                            email,
                            password: hashedPassword
                        })
                        user.save()
                            .then((user) => {
                                res.json({ message: "signup sucessful" })
                            })
                            .catch(error => {
                                res.json({ error: error })
                            })
                    })

            }

        })
})

//for Login
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: "please fill all the fields" })
    }
    User.findOne({ email: email })
        .then((saveduser) => {
            if (!saveduser) {
                return res.json({ error: "user not found" })
            } else {
                bcrypt.compare(password, saveduser.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET)
                            const { _id, name, email, pic, followers, following } = saveduser;
                            res.json({ token, user: { _id, name, email, pic, followers, following }, pic, followers, following })
                        } else {
                            return res.json({ error: "invaild emailor password" })
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch(error => {
            console.log(error)
        })
})



module.exports = router;
