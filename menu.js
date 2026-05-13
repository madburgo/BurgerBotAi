import { loadMemory } from "./memory.js"

/**
 * 🔥 Genera il menu corretto in base al ruolo
  */
  export function generateMenu(role, groupId) {
      const memory = loadMemory()

          // Se il gruppo non esiste ancora → menu base
              if (!memory.groups[groupId]) {
                      return baseUserMenu([])
                          }

                              const group = memory.groups[groupId]

                                  // Comandi personalizzati del gruppo
                                      const custom = group.customCommands || {}

                                          // Filtra i comandi per ruolo
                                              const userCmds = Object.values(custom).filter(c => c.role === "user")
                                                  const modCmds = Object.values(custom).filter(c => c.role === "mod")
                                                      const capoCmds = Object.values(custom).filter(c => c.role === "capo")
                                                          const ownerCmds = Object.values(custom).filter(c => c.role === "owner")

                                                              // Genera il menu corretto
                                                                  if (role === "owner") return ownerMenu(ownerCmds, capoCmds, modCmds, userCmds)
                                                                      if (role === "capo") return capoMenu(capoCmds, modCmds, userCmds)
                                                                          if (role === "mod") return modMenu(modCmds, userCmds)

                                                                              return baseUserMenu(userCmds)
                                                                              }

                                                                              /**
                                                                               * 🔥 MENU USER
                                                                                */
                                                                                function baseUserMenu(cmds) {
                                                                                    return `
                                                                                    ╭⭒─⊱ *𝐌𝐄𝐍𝐔 𝐔𝐓𝐄𝐍𝐓𝐄* ⊰
                                                                                    │ ✦ 👤 Ruolo: *Utente*
                                                                                    │ ✧ 💬 Per parlare con me:
                                                                                    │      ➜ Tagga il bot nel gruppo
                                                                                    │
                                                                                    │ ✦ 📌 Comandi base:
                                                                                    │    • /menu
                                                                                    │    • /help
                                                                                    │
                                                                                    │ ✦ 🧩 Comandi disponibili:
                                                                                    ${cmds.length > 0 ? cmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando personalizzato"}
                                                                                    ╰───────────────⭒
                                                                                    `
                                                                                    }

                                                                                    /**
                                                                                     * 🔥 MENU MOD
                                                                                      */
                                                                                      function modMenu(modCmds, userCmds) {
                                                                                          return `
                                                                                          ╭⭒─⊱ *𝐌𝐄𝐍𝐔 𝐌𝐎𝐃* ⊰
                                                                                          │ ✦ 🛡️ Moderatore
                                                                                          │ ✧ 🔧 Ruolo: *Supporto capo*
                                                                                          │
                                                                                          │ ✦ ⚙️ Strumenti mod:
                                                                                          │    • /newcommand
                                                                                          │    • /delcommand
                                                                                          │    • /cmdlist
                                                                                          │
                                                                                          │ ✦ 🧩 Comandi mod:
                                                                                          ${modCmds.length > 0 ? modCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando mod"}
                                                                                          │
                                                                                          │ ✦ 📌 Comandi user:
                                                                                          ${userCmds.length > 0 ? userCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando user"}
                                                                                          ╰───────────────⭒
                                                                                          `
                                                                                          }

                                                                                          /**
                                                                                           * 🔥 MENU CAPO
                                                                                            */
                                                                                            function capoMenu(capoCmds, modCmds, userCmds) {
                                                                                                return `
                                                                                                ╭⭒─⊱ *𝐌𝐄𝐍𝐔 𝐂𝐀𝐏𝐎* ⊰
                                                                                                │ ✦ 👑 Capo del gruppo
                                                                                                │ ✧ 🛡️ Ruolo: *Gestione gruppo*
                                                                                                │
                                                                                                │ ✦ ⚙️ Strumenti capo:
                                                                                                │    • /addmod @utente
                                                                                                │    • /delmod @utente
                                                                                                │    • /modlist
                                                                                                │    • /setperm <cmd> on/off
                                                                                                │
                                                                                                │ ✦ 🧩 Comandi capo:
                                                                                                ${capoCmds.length > 0 ? capoCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando capo"}
                                                                                                │
                                                                                                │ ✦ 🛡️ Comandi mod:
                                                                                                ${modCmds.length > 0 ? modCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando mod"}
                                                                                                │
                                                                                                │ ✦ 📌 Comandi user:
                                                                                                ${userCmds.length > 0 ? userCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando user"}
                                                                                                ╰───────────────⭒
                                                                                                `
                                                                                                }

                                                                                                /**
                                                                                                 * 🔥 MENU OWNER
                                                                                                  */
                                                                                                  function ownerMenu(ownerCmds, capoCmds, modCmds, userCmds) {
                                                                                                      return `
                                                                                                      ╭⭒─⊱ *𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑* ⊰
                                                                                                      │ ✦ 👤 Owner del bot
                                                                                                      │ ✧ 🪐 Controllo totale
                                                                                                      │
                                                                                                      │ ✦ ⚙️ Strumenti owner:
                                                                                                      │    • /on
                                                                                                      │    • /off
                                                                                                      │    • /ping
                                                                                                      │    • /stats
                                                                                                      │    • /restart
                                                                                                      │
                                                                                                      │ ✦ 🧩 Comandi owner:
                                                                                                      ${ownerCmds.length > 0 ? ownerCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando owner"}
                                                                                                      │
                                                                                                      │ ✦ 👑 Comandi capo:
                                                                                                      ${capoCmds.length > 0 ? capoCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando capo"}
                                                                                                      │
                                                                                                      │ ✦ 🛡️ Comandi mod:
                                                                                                      ${modCmds.length > 0 ? modCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando mod"}
                                                                                                      │
                                                                                                      │ ✦ 📌 Comandi user:
                                                                                                      ${userCmds.length > 0 ? userCmds.map(c => `│    • /${c.name} — ${c.description}`).join("\n") : "│    Nessun comando user"}
                                                                                                      ╰───────────────⭒
                                                                                                      `
                                                                                                      }