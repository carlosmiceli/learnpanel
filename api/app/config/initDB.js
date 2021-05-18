import mongoose from "mongoose"

export let db

const initDB = () => {
    const uri = process.env.DB_URI;
    mongoose.connect(uri, {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connection established with MongoDB');
    })
    .catch(error => console.error(error.message));
}

export default initDB