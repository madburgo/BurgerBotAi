import { generateMenu } from "./menu.js"
import { createCustomCommand, runCustomCommand } from "./customCommands.js"
import { generateErrorMessage } from "./ai.js"
import { executeActions } from "./actions.js"
import { detectActions } from "./parser.js"
import { extractMention } from "./utils.js"

/**
 * 🔥 Gestione comandi normali + custom
  */
  export async function handleCommand(cmd, args, sock, msg, ai, sender, groupId, roles) {

      // Ruolo dell’utente
          const userRole = roles.getRole(sender, groupId)

              // Carica comandi globali
                  const allCommands = loadCommands()

                      // ============================
                          // 🔥 1) COMANDO GLOBALE
                              // ============================
                                  if (allCommands[cmd]) {

                                          const command = allCommands[cmd]
                                                  const requiredRole = command.role || "user"

                                                          const hierarchy = ["user", "mod", "capo", "owner"]

                                                                  // Permessi
                                                                          if (hierarchy.indexOf(userRole) < hierarchy.indexOf(requiredRole)) {
                                                                                      return await generateErrorMessage(cmd, userRole)
                                                                                              }

                                                                                                      // Esegui comando globale
                                                                                                              return await command.execute(sock, msg, args, ai, sender, groupId)
                                                                                                                  }

                                                                                                                      // ============================
                                                                                                                          // 🔥 2) MENU AUTOMATICO
                                                                                                                              // ============================
                                                                                                                                  if (cmd === "menu" || cmd === "panel") {
                                                                                                                                          return generateMenu(userRole, groupId)
                                                                                                                                              }

                                                                                                                                                  // ============================
                                                                                                                                                      // 🔥 3) CREAZIONE COMANDO PERSONALIZZATO
                                                                                                                                                          // ============================
                                                                                                                                                              if (cmd === "newcommand") {

                                                                                                                                                                      if (userRole === "user") {
                                                                                                                                                                                  return await generateErrorMessage(cmd, userRole)
                                                                                                                                                                                          }

                                                                                                                                                                                                  const name = args.shift()
                                                                                                                                                                                                          const role = args.shift()?.replace("(", "").replace(")", "") || "user"
                                                                                                                                                                                                                  const description = args.join(" ")

                                                                                                                                                                                                                          const actions = detectActions(description)

                                                                                                                                                                                                                                  createCustomCommand(name, role, description, groupId, actions)

                                                                                                                                                                                                                                          return `✨ Comando /${name} creato con successo!`
                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                  // ============================
                                                                                                                                                                                                                                                      // 🔥 4) ELIMINA COMANDO PERSONALIZZATO
                                                                                                                                                                                                                                                          // ============================
                                                                                                                                                                                                                                                              if (cmd === "delcommand") {

                                                                                                                                                                                                                                                                      if (userRole === "user") {
                                                                                                                                                                                                                                                                                  return await generateErrorMessage(cmd, userRole)
                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                  const name = args[0]
                                                                                                                                                                                                                                                                                                          return deleteCustomCommand(name, groupId)
                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                  // ============================
                                                                                                                                                                                                                                                                                                                      // 🔥 5) LISTA COMANDI PERSONALIZZATI
                                                                                                                                                                                                                                                                                                                          // ============================
                                                                                                                                                                                                                                                                                                                              if (cmd === "cmdlist") {
                                                                                                                                                                                                                                                                                                                                      return listCustomCommands(groupId)
                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                              // ============================
                                                                                                                                                                                                                                                                                                                                                  // 🔥 6) ESECUZIONE COMANDI PERSONALIZZATI
                                                                                                                                                                                                                                                                                                                                                      // ============================
                                                                                                                                                                                                                                                                                                                                                          const executed = await runCustomCommand(cmd, sock, msg, ai, groupId, sender, userRole)
                                                                                                                                                                                                                                                                                                                                                              if (executed) return executed

                                                                                                                                                                                                                                                                                                                                                                  return null
                                                                                                                                                                                                                                                                                                                                                                  }