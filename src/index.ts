import dotenv from "dotenv";


console.log(process.env.DB_NAME)

import express, { request, response } from "express";
import { router } from "./routes/routes.js"

import cors from "cors";
import { conn } from "./conn/conn.js"
import { User } from "./models/User.js";



export const app = express()
const port = 3000
app.use(express.json());
app.use(cors());
app.use(router)



app.get('/', router)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const testConn = async () => {
  try {
    await conn.authenticate();
    await User.sync()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConn()
