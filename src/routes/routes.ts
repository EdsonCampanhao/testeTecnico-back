import { Router } from "express"
import pkmController from "../controller/pkmController.js"
import authController from "../controller/authController.js"


export const router : Router = Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req,res) => {
  res.send('About birds')
})
router.get("/catchedPokemon",pkmController.getPokemonsCatched)
router.post("/catchPokemon",pkmController.catchPokemon)
router.get("/getPKM",pkmController.getPokemon)
router.post("/createUser",authController.createUser)
router.post("/login",authController.loginUser)

