# BurgerBotAi
Bot per la gestione e il divertimento nei gruppi whatsapp basato su modello ai "llama3"
🍔 BurgerAI — WhatsApp Bot con Baileys + AI

BurgerAI è un bot WhatsApp avanzato basato su Baileys, progettato per offrire automazione, moderazione e risposte AI intelligenti. Include comandi personalizzati, ruoli, memory JSON e supporto completo a Docker e Koyeb.

---

⭐ Funzionalità principali
- 🤖 Risposte AI naturali  
- 🛡️ Moderazione (kick, clear, antispam…)  
- ⚙️ Comandi personalizzati in linguaggio naturale  
- 👑 Ruoli: owner → capo → mod → user  
- 📦 Memory JSON per impostazioni e comandi  
- 🧩 Sistema modulare (actions, parser, utils)  
- 🐳 Docker-ready  
- ☁️ Deploy su Koyeb

---

📦 Installazione locale

1️⃣ Clona il repository
git clone https://github.com/madburgo/BurgerBotAI.git
cd BurgerBotAI

2️⃣ Installa le dipendenze
npm install

3️⃣ Avvia il bot
npm start

---

🐳 Deploy con Docker

Build
docker build -t burgerai .

Run
docker run -it --restart=always burgerai .

---

☁️ Deploy su Koyeb

1. Carica il progetto su GitHub  
2. Vai su Koyeb → Create App  
3. Seleziona il repository  
4. Koyeb rileva il Dockerfile  
5. Avvia il bot

---

🧠 Struttura del progetto

BurgerAI/
│── index.js
│── actions.js
│── parser.js
│── commands.js
│── customCommands.js
│── menu.js
│── memory.js
│── ai.js
│── utils.js
│── config.js
│── Dockerfile
│── .dockerignore
│── .gitignore
│── package.json
└── session/ (ignorata)

---

🗂️ Esempio memory.json

`json
{
  "global": {
      "owner": "NUMERO@c.us",
          "botStatus": "on"
            },
              "groups": {
                  "ID-GRUPPO@g.us": {
                        "capo": "NUMERO@c.us",
                              "mods": [],
                                    "customCommands": {}
                                        }
                                          }
                                          }

                                          ---

                                          📜 Licenza
                                          Progetto open‑source creato da @madurgo.
