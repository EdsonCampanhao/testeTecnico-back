import { Router } from "express"
import pkmController from "../controller/pkmController.js"


export const router : Router = Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req,res) => {
  res.send('About birds')
})
router.get("/getPKM",pkmController.getPokemon)

