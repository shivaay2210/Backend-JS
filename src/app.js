import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser' 

const app = express()
// middlewares and configuration settings --> app.use()

// app.use(cors()) --> this will also work, below to modify additional settings
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use(express.json()) --> this will also work, below to modify additional settings
app.use(express.json({ /* used for accepting json inputs(like form) */
    limit: "16kb"
}))

// app.use(express.urlencoded()) --> this will also work, below to modify additional settings
app.use(express.urlencoded({ /* to make sure that express understands data from url */
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public")) // for storing files and folder inside our own server

app.use(cookieParser()) // used for applying crud operations on users browser cookies

export { app }