import express, { request, response } from "express";
import { router } from "./routes/routes.js"
import dotenv from "dotenv";


dotenv.config();
export const app = express()
const port = 3000
app.use(express.json());
app.use(router)
app.get('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
