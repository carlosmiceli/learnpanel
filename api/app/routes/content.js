import userSchema from "../models/user.js";
import { contentValidation } from '../middlewares/schema-validation.js'
import { Router } from "express";
import getMetaData from 'metadata-scraper';
import got from 'got';
import cheerio from 'cheerio';

const contentRouter = Router()

contentRouter.get("/", async (req, res) => {
    if (req.session.user) {
        const content = await userSchema.findOne({ _id: req.session.user._id })
        res.send(content.content)    
    }
});

contentRouter.post("/", async (req, res) => {

    const content = {
        title: req.body.title,
        url: req.body.url,
        image: req.body.image,
        videoId: req.body.videoId,
        text: req.body.text,
        category: req.body.category,
        notes: "",
        createdOn: req.body.createdOn
    }

    const { error } = contentValidation(content);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    try {
        await userSchema.updateOne( {_id: req.session.user._id}, { $push: {content: content }})
        res.send({ data: content });
    } 

    catch (error) {
        res.status(400).send({ error });
    }
})

contentRouter.post('/scrape', async (req, res) => {
    
    const html = await got(req.body.url)
    const text = cheerio.load(html.body)
    let parsedText = text.text()

    getMetaData(req.body.url)
    .then(data => {
        let vidId = "https://www.youtube.com/embed/" + data.url.split("https://www.youtube.com/watch?v=")[1]
        let scraped = {
            img: data.image,
            text: parsedText,
            videoId: vidId
        }

        res.send(scraped)
    })
    .catch(err => console.log(err))
    
});

contentRouter.delete("/", async (req, res) => {
    await userSchema.updateOne( {_id: req.session.user._id}, { $pull: {content: { _id: req.query.content }}})
    res.send("Successfully deleted")
});

contentRouter.put("/note", async (req, res) => {
    await userSchema.updateOne( 
        {
            _id: req.session.user._id,
            "content._id": req.body.id
        },
        { 
            $set: { "content.$.notes": req.body.note }
        }
    )
    res.send(true)
});

contentRouter.put("/previous", async (req, res) => {
    const oldCard = await userSchema.findOne({ _id: req.session.user._id }, {content: {$slice: -1 } })
    await userSchema.updateOne({ _id: req.session.user._id }, { $pop: { content: 1 } })
    await userSchema.updateOne({ _id: req.session.user._id }, { $push: {content: { $each: [oldCard.content[0]], $position: 0 } } })
    res.send(true)
});

contentRouter.put("/next", async (req, res) => {
    const oldCard = await userSchema.findOne({ _id: req.session.user._id }, {content: {$slice: 1 } })
    await userSchema.updateOne({ _id: req.session.user._id }, { $pop: { content: -1 } })
    await userSchema.updateOne({ _id: req.session.user._id }, { $push: {content: oldCard.content[0] } } )
    res.send(true)
});

export default contentRouter