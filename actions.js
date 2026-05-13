import { loadMemory, saveMemory, addMod, removeMod } from "./memory.js"
import { reply } from "./utils.js"

/**
 * 🔥 Azioni predefinite del bot
  */
  export const predefinedActions = {

      // 🔥 Kick singolo
          kick: async ({ sock, from, target }) => {
                  if (!target) return
                          await sock.groupParticipantsUpdate(from, [target], "remove")
                              },

                                  // 🔥 Kick all (tranne owner e capo)
                                      kickall: async ({ sock, from, participants, owner, capo }) => {
                                              const toKick = participants.filter(p => p !== owner && p !== capo)
                                                      if (toKick.length > 0) {
                                                                  await sock.groupParticipantsUpdate(from, toKick, "remove")
                                                                          }
                                                                              },

                                                                                  // 🔥 Clear chat
                                                                                      clear: async ({ sock, from }) => {
                                                                                              await sock.sendMessage(from, { text: "\n".repeat(200) })
                                                                                                  },

                                                                                                      // 🔥 Reset funzioni
                                                                                                          resetfunzioni: async ({ memory }) => {
                                                                                                                  for (const f in memory.features) memory.features[f] = false
                                                                                                                          saveMemory(memory)
                                                                                                                              },

                                                                                                                                  // 🔥 Reset comportamenti AI
                                                                                                                                      resetcomportamenti: async ({ memory }) => {
                                                                                                                                              memory.behaviors = []
                                                                                                                                                      saveMemory(memory)
                                                                                                                                                          },

                                                                                                                                                              // 🔥 Manda un messaggio
                                                                                                                                                                  send: async ({ sock, from, text }) => {
                                                                                                                                                                          if (!text) return
                                                                                                                                                                                  await sock.sendMessage(from, { text })
                                                                                                                                                                                      },

                                                                                                                                                                                          // 🔥 Aggiungi mod
                                                                                                                                                                                              addmod: async ({ groupId, target }) => {
                                                                                                                                                                                                      if (!target) return
                                                                                                                                                                                                              addMod(groupId, target)
                                                                                                                                                                                                                  },

                                                                                                                                                                                                                      // 🔥 Rimuovi mod
                                                                                                                                                                                                                          delmod: async ({ groupId, target }) => {
                                                                                                                                                                                                                                  if (!target) return
                                                                                                                                                                                                                                          removeMod(groupId, target)
                                                                                                                                                                                                                                              },

                                                                                                                                                                                                                                                  // 🔥 Risposta AI
                                                                                                                                                                                                                                                      ai: async ({ ai, description, sender }) => {
                                                                                                                                                                                                                                                              return await ai(description, sender)
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                  /**
                                                                                                                                                                                                                                                                   * 🔥 Esegue una singola azione
                                                                                                                                                                                                                                                                    */
                                                                                                                                                                                                                                                                    export async function executeAction(action, context) {
                                                                                                                                                                                                                                                                        const memory = loadMemory()

                                                                                                                                                                                                                                                                            const name = action.type

                                                                                                                                                                                                                                                                                // 1) Azione predefinita
                                                                                                                                                                                                                                                                                    if (predefinedActions[name]) {
                                                                                                                                                                                                                                                                                            return await predefinedActions[name]({
                                                                                                                                                                                                                                                                                                        ...context,
                                                                                                                                                                                                                                                                                                                    ...action,
                                                                                                                                                                                                                                                                                                                                memory
                                                                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                // 2) Azione custom salvata in memoria
                                                                                                                                                                                                                                                                                                                                                    if (memory.customActions && memory.customActions[name]) {
                                                                                                                                                                                                                                                                                                                                                            return memory.customActions[name]
                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                    return null
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                    /**
                                                                                                                                                                                                                                                                                                                                                                     * 🔥 Esegue una lista di azioni in sequenza
                                                                                                                                                                                                                                                                                                                                                                      */
                                                                                                                                                                                                                                                                                                                                                                      export async function executeActions(actions, context) {
                                                                                                                                                                                                                                                                                                                                                                          let lastResponse = null

                                                                                                                                                                                                                                                                                                                                                                              for (const action of actions) {
                                                                                                                                                                                                                                                                                                                                                                                      const result = await executeAction(action, context)
                                                                                                                                                                                                                                                                                                                                                                                              if (typeof result === "string") {
                                                                                                                                                                                                                                                                                                                                                                                                          lastResponse = result
                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                          return lastResponse
                                                                                                                                                                                                                                                                                                                                                                                                                          }