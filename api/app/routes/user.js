import userSchema from "../models/user.js";
import { registerValidation, loginValidation } from '../middlewares/schema-validation.js'
import { Router } from "express";
import bcrypt from 'bcrypt'

const userRouter = Router()

userRouter.post("/signup", async (req, res) => {

    const { error } = registerValidation(req.body);
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
        const savedUser = await user.save()
        res.send({ data: savedUser });
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
        res.send(req.session)
    }
    else return res.status(400).send({ error: "Wrong password" }); 
});

userRouter.delete("/logout", async (req, res) => {
    try {
        const user = req.session.user
        console.log("user", user)
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

export default userRouter
