import express from "express"
import { startBot, getLastQR } from "./index.js"

const app = express()

app.get("/", (req, res) => {
    res.send("BurgerBotAI attivo! Vai su /qr per il QR.")
    })

    app.get("/qr", (req, res) => {
        res.setHeader("Content-Type", "text/plain")
            res.send(getLastQR())
            })

            const PORT = process.env.PORT || 3000
            app.listen(PORT, () => {
                console.log("Server Express attivo sulla porta " + PORT)
                    startBot() // Avvia il bot DOPO che Express è partito
                    })