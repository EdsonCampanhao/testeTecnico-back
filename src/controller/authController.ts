import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Jwt } from "jsonwebtoken";
import { instanceOfModel } from "./pkmController.js";


type user = {
    id: number;
    name: string;
    email: string;
    password: string;
    jwt: string | null
}

export default class authController {



    static async createUser(req: Request, res: Response) {
        const userInfos: user = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!emailRegex.test(userInfos.email)) {
            return res.status(422).json("Email com formato inválido!")
        }

        if (!passwordRegex.test(userInfos.password)) {
            return res.status(422).json("Senha com formato inválido!")
        }

        const project = await User.findOne({ where: { email: userInfos.email } });
        if (project != null) {
            return res.status(409).json("Email já cadastrado!")
        }

        const hashedPassword = await bcrypt.hash(userInfos.password, 10)
            .then(function (hash) {
                return hash
            });

        try {
            userInfos.password = hashedPassword
            const currentUser = await User.create(userInfos) as unknown as instanceOfModel
            return res.status(200).json("Usuário criado com sucesso!");
        } catch (err) {
            return res.status(500).json("Erro ao criar usuário!");
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction) {

        console.log(process.env.JWT_KEY)

        const userInfos: user = req.body

        try {
            const currentUser = await User.findOne({ where: { email: userInfos.email } }) as unknown as user

            if (currentUser == null) {
                return res.status(404).json("Email não cadastrado!")
            }

            bcrypt.compare(userInfos.password, currentUser.password).then(function (result) {
                const authedUser: user = {
                    id:currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    password: currentUser.password,
                    jwt: null
                }

                const privateKey = process.env.JWT_KEY
                const token: string = jwt.sign(authedUser, privateKey!, { algorithm: 'HS256' })

                authedUser.jwt = token;

                return res.status(200).json(authedUser)
            });

        } catch {
            return res.status(500).json("Erro ao conectar ao banco!");
        }




    }

}