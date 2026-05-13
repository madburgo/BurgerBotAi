import { loadMemory, saveMemory } from "./memory.js"
import { executeActions } from "./actions.js"
import { extractMention } from "./utils.js"

/**
 * 🔥 Crea un comando personalizzato
  */
  export function createCustomCommand(name, role, description, groupId, actions) {
      const memory = loadMemory()

          // Se il gruppo non esiste, crealo
              if (!memory.groups[groupId]) {
                      memory.groups[groupId] = {
                                  capo: null,
                                              mods: [],
                                                          customCommands: {}
                                                                  }
                                                                      }

                                                                          memory.groups[groupId].customCommands[name] = {
                                                                                  name,
                                                                                          role,
                                                                                                  description,
                                                                                                          actions
                                                                                                              }

                                                                                                                  saveMemory(memory)
                                                                                                                  }

                                                                                                                  /**
                                                                                                                   * 🔥 Elimina un comando personalizzato
                                                                                                                    */
                                                                                                                    export function deleteCustomCommand(name, groupId) {
                                                                                                                        const memory = loadMemory()

                                                                                                                            if (!memory.groups[groupId]) return "❌ Nessun comando in questo gruppo."
                                                                                                                                if (!memory.groups[groupId].customCommands[name]) return "❌ Comando inesistente."

                                                                                                                                    delete memory.groups[groupId].customCommands[name]
                                                                                                                                        saveMemory(memory)

                                                                                                                                            return `🗑️ Comando /${name} eliminato!`
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * 🔥 Lista comandi personalizzati
                                                                                                                                              */
                                                                                                                                              export function listCustomCommands(groupId) {
                                                                                                                                                  const memory = loadMemory()

                                                                                                                                                      if (!memory.groups[groupId]) return "📭 Nessun comando personalizzato."

                                                                                                                                                          const cmds = Object.keys(memory.groups[groupId].customCommands)
                                                                                                                                                              if (cmds.length === 0) return "📭 Nessun comando personalizzato."

                                                                                                                                                                  return `📜 *Comandi personalizzati del gruppo:*\n\n${cmds
                                                                                                                                                                          .map(c => `• /${c}`)
                                                                                                                                                                                  .join("\n")}`
                                                                                                                                                                                  }

                                                                                                                                                                                  /**
                                                                                                                                                                                   * 🔥 Esegue un comando personalizzato
                                                                                                                                                                                    */
                                                                                                                                                                                    export async function runCustomCommand(cmd, sock, msg, ai, groupId, sender, userRole) {
                                                                                                                                                                                        const memory = loadMemory()

                                                                                                                                                                                            // Se il gruppo non esiste → nessun comando
                                                                                                                                                                                                if (!memory.groups[groupId]) return null

                                                                                                                                                                                                    const found = memory.groups[groupId].customCommands[cmd]
                                                                                                                                                                                                        if (!found) return null

                                                                                                                                                                                                            // Controllo permessi
                                                                                                                                                                                                                const hierarchy = ["user", "mod", "capo", "owner"]
                                                                                                                                                                                                                    if (hierarchy.indexOf(userRole) < hierarchy.indexOf(found.role)) {
                                                                                                                                                                                                                            return "❌ Non hai i permessi per usare questo comando."
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                    // Target (es: @utente)
                                                                                                                                                                                                                                        const target = extractMention(msg.message.conversation || msg.message.extendedTextMessage?.text || "")

                                                                                                                                                                                                                                            // Partecipanti del gruppo (per kickall)
                                                                                                                                                                                                                                                let participants = []
                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                            const metadata = await sock.groupMetadata(groupId)
                                                                                                                                                                                                                                                                    participants = metadata.participants.map(p => p.id)
                                                                                                                                                                                                                                                                        } catch {}

                                                                                                                                                                                                                                                                            // Esegui tutte le azioni in sequenza
                                                                                                                                                                                                                                                                                const response = await executeActions(found.actions, {
                                                                                                                                                                                                                                                                                        sock,
                                                                                                                                                                                                                                                                                                from: groupId,
                                                                                                                                                                                                                                                                                                        sender,
                                                                                                                                                                                                                                                                                                                target,
                                                                                                                                                                                                                                                                                                                        ai,
                                                                                                                                                                                                                                                                                                                                description: found.description,
                                                                                                                                                                                                                                                                                                                                        participants,
                                                                                                                                                                                                                                                                                                                                                groupId
                                                                                                                                                                                                                                                                                                                                                    })

                                                                                                                                                                                                                                                                                                                                                        return response || null
                                                                                                                                                                                                                                                                                                                                                        }