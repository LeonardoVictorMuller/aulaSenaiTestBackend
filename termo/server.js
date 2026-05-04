import 'dotenv/config'
import express from 'express'
import * as db from "./bd.js"
import cors from "cors";

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors());

app.get("/", (req, res)=>{
    res.json({
        messge: "Funcionou"
    })
})

app.get("/palavra", async (req, res)=>{
    const funcs = await db.palavraRandom();
    res.json(funcs)
    //res.json({messge: "Funcionou"})
})

app.listen(port);