const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
// const noteModel = require('../models/noteModel');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("All the users")
})

userRouter.post("/register", (req, res) => {

    const { name, email, password } = req.body;

   
    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) return res.send({ message: "something went wrong", status: 0 })
        try {
            let user = new UserModel({ name, email, password: hash })
            await user.save()
            res.send({
                message: "user created",
                status: 1
            })
        } catch (e) {
            res.send({
                message: e.message,
                status: 0
            })
        }

    });
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let option={
        expiresIn:"10m"
    }


    try {
        let data = await UserModel.find({ email })
        if (data.length > 0) {

            let token = jwt.sign({ userId: data[0]._id }, "dev",option)
            bcrypt.compare(password, data[0].password, (err, result) => {
                if (err) return res.send({ message: "something went wrong" + err, status: 0 })

                if (result) {
                    res.send({
                        message: "user login successfull",
                        token: token,
                        status: 1,
                    });
                } else {
                    res.send({
                        message: "incorrect password",
                        status: 0,
                    });
                }
            });
        } else {
            res.send({
                message: "user does not exist",
                status: 0,
            });
        }
    } catch (e) {
        res.send({
            message: e.message,
            status: 0,
        })

    }

});

module.exports = userRouter;