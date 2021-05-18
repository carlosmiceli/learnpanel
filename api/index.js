import express, { json, urlencoded } from "express"
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import cors from "cors"
import initDB from "./app/config/initDB.js"
import routes from "./app/routes/index.js"
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

initDB()

const app = express();
app.use(morgan("dev"))

// if run behind proxy (e.g.: nginx)
// app.set('trust proxy', 1);

// the less people know the stack the better
app.disable('x-powered-by');

// parse application/json
app.use(json())

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

const redisStore = connectRedis(session)

const redisClient = redis.createClient({
  port: 6379
})

redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(session({
  store: new redisStore({client: redisClient}),
  secret: process.env.TOKEN_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: true,
    secure: false, //set to true when running production -- if true: only transmit cookie over https
    httpOnly: true, // it prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 7 //session max age in milliseconds
  }
}))

var corsOptions = {
  credentials: true,
  origin: 'http://localhost:8080',
  exposedHeaders: ['set-cookie']
}
// use cors options
app.use(cors(corsOptions))

app.use(routes);

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});