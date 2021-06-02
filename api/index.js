import express, { json, urlencoded } from "express"
import session, { Store } from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import cors from "cors"
import initDB from "./app/config/initDB.js"
import routes from "./app/routes/index.js"
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import url from 'url-parse'

dotenv.config()

initDB()

const app = express();
app.use(morgan("dev"))

// if run behind proxy (e.g.: nginx)
app.set('trust proxy', 1);

// the less people know the stack the better
app.disable('x-powered-by');

// parse application/json
app.use(json())

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

const RedisStore = connectRedis(session)

let rtg = new url(process.env.REDISTOGO_URL)

const redisClient = redis.createClient({
  host: rtg.hostname,
  port: rtg.port
})

redisClient.auth(rtg.auth.split(":")[1]); 

redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(cookieParser())

app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: process.env.TOKEN_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true, // it prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 7 //session max age in milliseconds
  }
}))

redisClient.on('error', console.error)

var corsOptions = {
  credentials: true,
  origin: 'https://flamboyant-euler-94f8f7.netlify.app',
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