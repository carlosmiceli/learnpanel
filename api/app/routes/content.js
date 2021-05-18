import userSchema from "../models/user.js";
import { contentValidation } from '../middlewares/schema-validation.js'
import { Router } from "express";

const contentRouter = Router()

contentRouter.get("/", async (req, res) => {
    const content = await userSchema.findOne({ _id: req.query.user })
    res.send(content.content)
});

contentRouter.post("/", async (req, res) => {

    const content = {
        title: req.body.title,
        url: req.body.url,
        category: req.body.category,
        createdOn: req.body.createdOn
    }

    const { error } = contentValidation(content);
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
        await userSchema.updateOne( {_id: req.body.user}, { $push: {content: content }})
        res.send({ data: content });
    } 

    catch (error) {
        res.status(400).send({ error });
    }
})

contentRouter.delete("/", async (req, res) => {
    await userSchema.updateOne( {_id: req.query.user}, { $pull: {content: { _id: req.query.content }}})
    res.send("Successfully deleted")
});

export default contentRouter