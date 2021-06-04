import userSchema from "../models/user.js";
import { registerValidation, loginValidation, passwordChangeValidation } from '../middlewares/schema-validation.js'
import { Router } from "express";
import bcrypt from 'bcrypt'

const userRouter = Router()

userRouter.get("/checklogin", (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    }
    else {
        res.status(404).send("No user")
    }
})

userRouter.post("/signup", async (req, res) => {

    const { error } = registerValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ error: error.details[0].message });

    const doesEmailExist = await userSchema.findOne({ email: req.body.email });
    if (doesEmailExist) return res.status(400).send({ error: "Email already exists" });
    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        await user.save()
        req.session.user = user
        res.send(req.session.user);
    } 

    catch (error) {
        res.status(400).send({ error });
    }
});

userRouter.post("/login", async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: "User not found with given email" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
        req.session.user = user
        res.send(req.session.user)
    }
    else return res.status(400).send({ error: "Wrong password" }); 
});

userRouter.put("/change-pw", async (req, res) => {

    const user = await userSchema.findOne({ _id: req.session.user._id });
    if (!user) return res.status(400).send({ error: "User not found" })

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (validPassword) {

        const newPassword = {password: req.body.newPassword }

        const { error } = passwordChangeValidation(newPassword);
        if (error) return res.status(400).send({ error: error.details[0].message });
        
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.newPassword, salt);
    
        await userSchema.updateOne({ _id: req.session.user._id }, { $set: { password: password }});
    
        res.send("Password changed successfully")
    }
    else return res.status(400).send("Current password is wrong")

});

userRouter.delete("/logout", async (req, res) => {
    try {
        const user = req.session.user
        if (user) {
            req.session.destroy()
            res.clearCookie('connect.sid', {
                path: '/'}).status(200).send("Logged out successfully")
        }
    }
    catch (error) {
        res.status(400).send({ error });
    }
});

userRouter.get("/ping", (req, res) => {
    res.status(200).send("Ping successful")
})

export default userRouter
