import fs from "fs"

const MEMORY_PATH = "./memory.json"

/**
 * Carica la memoria dal file JSON
  */
  export function loadMemory() {
      if (!fs.existsSync(MEMORY_PATH)) {
              const empty = {
                          groups: {},   // ogni gruppo ha capo, mod, users, comandi
                                      global: {     // impostazioni globali del bot
                                                      owner: null,
                                                                      botStatus: "on"
                                                                                  }
                                                                                          }

                                                                                                  fs.writeFileSync(MEMORY_PATH, JSON.stringify(empty, null, 2))
                                                                                                          return empty
                                                                                                              }

                                                                                                                  return JSON.parse(fs.readFileSync(MEMORY_PATH))
                                                                                                                  }

                                                                                                                  /**
                                                                                                                   * Salva la memoria nel file JSON
                                                                                                                    */
                                                                                                                    export function saveMemory(data) {
                                                                                                                        fs.writeFileSync(MEMORY_PATH, JSON.stringify(data, null, 2))
                                                                                                                        }

                                                                                                                        /**
                                                                                                                         * Ottiene il ruolo dell'utente nel gruppo
                                                                                                                          */
                                                                                                                          export function getRole(user, groupId) {
                                                                                                                              const memory = loadMemory()

                                                                                                                                  // Se il gruppo non esiste → ruolo user
                                                                                                                                      if (!memory.groups[groupId]) return "user"

                                                                                                                                          const group = memory.groups[groupId]

                                                                                                                                              if (memory.global.owner === user) return "owner"
                                                                                                                                                  if (group.capo === user) return "capo"
                                                                                                                                                      if (group.mods?.includes(user)) return "mod"

                                                                                                                                                          return "user"
                                                                                                                                                          }

                                                                                                                                                          /**
                                                                                                                                                           * Imposta il capo del gruppo
                                                                                                                                                            */
                                                                                                                                                            export function setCapo(groupId, user) {
                                                                                                                                                                const memory = loadMemory()

                                                                                                                                                                    if (!memory.groups[groupId]) {
                                                                                                                                                                            memory.groups[groupId] = {
                                                                                                                                                                                        capo: null,
                                                                                                                                                                                                    mods: [],
                                                                                                                                                                                                                users: [],
                                                                                                                                                                                                                            customCommands: {}
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                            memory.groups[groupId].capo = user
                                                                                                                                                                                                                                                saveMemory(memory)
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                /**
                                                                                                                                                                                                                                                 * Aggiunge un moderatore
                                                                                                                                                                                                                                                  */
                                                                                                                                                                                                                                                  export function addMod(groupId, user) {
                                                                                                                                                                                                                                                      const memory = loadMemory()

                                                                                                                                                                                                                                                          if (!memory.groups[groupId]) return

                                                                                                                                                                                                                                                              if (!memory.groups[groupId].mods.includes(user)) {
                                                                                                                                                                                                                                                                      memory.groups[groupId].mods.push(user)
                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                              saveMemory(memory)
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                              /**
                                                                                                                                                                                                                                                                               * Rimuove un moderatore
                                                                                                                                                                                                                                                                                */
                                                                                                                                                                                                                                                                                export function removeMod(groupId, user) {
                                                                                                                                                                                                                                                                                    const memory = loadMemory()

                                                                                                                                                                                                                                                                                        if (!memory.groups[groupId]) return

                                                                                                                                                                                                                                                                                            memory.groups[groupId].mods = memory.groups[groupId].mods.filter(m => m !== user)

                                                                                                                                                                                                                                                                                                saveMemory(memory)
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                /**
                                                                                                                                                                                                                                                                                                 * Ottiene tutti i comandi del gruppo
                                                                                                                                                                                                                                                                                                  */
                                                                                                                                                                                                                                                                                                  export function getGroupCommands(groupId) {
                                                                                                                                                                                                                                                                                                      const memory = loadMemory()

                                                                                                                                                                                                                                                                                                          if (!memory.groups[groupId]) return {}

                                                                                                                                                                                                                                                                                                              return memory.groups[groupId].customCommands || {}
                                                                                                                                                                                                                                                                                                              }