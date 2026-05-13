import fs from "fs"
import { loadMemory } from "./memory.js"

/**
 * 🔥 Risposta rapida migliorata
  */
  export async function reply(sock, chatId, text, msg) {
      if (!text) text = "⚠️ Risposta vuota."

          await sock.sendMessage(
                  chatId,
                          { text: String(text).trim() },
                                  { quoted: msg }
                                      )
                                      }

                                      /**
                                       * 🔥 Log colorati con timestamp
                                        */
                                        export function log(type, message) {
                                            const colors = {
                                                    info: "\x1b[36m%s\x1b[0m",
                                                            warn: "\x1b[33m%s\x1b[0m",
                                                                    error: "\x1b[31m%s\x1b[0m",
                                                                            success: "\x1b[32m%s\x1b[0m"
                                                                                }

                                                                                    const time = new Date().toLocaleTimeString("it-IT")
                                                                                        console.log(colors[type] || "%s", `[${type.toUpperCase()} - ${time}] ${message}`)
                                                                                        }

                                                                                        /**
                                                                                         * 🔥 Controlla se l'utente è owner del bot
                                                                                          */
                                                                                          export function isOwner(userId) {
                                                                                              const memory = loadMemory()
                                                                                                  return memory.global.owner === userId
                                                                                                  }

                                                                                                  /**
                                                                                                   * 🔥 Controlla se l'utente è admin WhatsApp
                                                                                                    * (NON usato per i permessi del bot)
                                                                                                     */
                                                                                                     export async function isAdmin(sock, groupId, userId) {
                                                                                                         const metadata = await sock.groupMetadata(groupId)
                                                                                                             const admins = metadata.participants
                                                                                                                     .filter(p => p.admin === "admin" || p.admin === "superadmin")
                                                                                                                             .map(p => p.id)

                                                                                                                                 return admins.includes(userId)
                                                                                                                                 }

                                                                                                                                 /**
                                                                                                                                  * 🔥 Pulisce testo
                                                                                                                                   */
                                                                                                                                   export function clean(text) {
                                                                                                                                       return text.trim().toLowerCase()
                                                                                                                                       }

                                                                                                                                       /**
                                                                                                                                        * 🔥 Converte numero in JID
                                                                                                                                         */
                                                                                                                                         export function toJid(num) {
                                                                                                                                             num = num.replace(/\D/g, "")
                                                                                                                                                 if (!num.startsWith("39")) num = "39" + num
                                                                                                                                                     return num + "@c.us"
                                                                                                                                                     }

                                                                                                                                                     /**
                                                                                                                                                      * 🔥 Estrae il primo @tag dal messaggio
                                                                                                                                                       */
                                                                                                                                                       export function extractMention(body) {
                                                                                                                                                           const match = body.match(/@(\d{5,})/)
                                                                                                                                                               if (!match) return null
                                                                                                                                                                   return match[1] + "@c.us"
                                                                                                                                                                   }

                                                                                                                                                                   /**
                                                                                                                                                                    * 🔥 Accorcia un JID (per log)
                                                                                                                                                                     */
                                                                                                                                                                     export function shortJid(jid) {
                                                                                                                                                                         return jid.replace("@s.whatsapp.net", "").replace("@c.us", "")
                                                                                                                                                                         }

                                                                                                                                                                         /**
                                                                                                                                                                          * 🔥 Formatta una lista di comandi
                                                                                                                                                                           */
                                                                                                                                                                           export function formatList(arr) {
                                                                                                                                                                               if (!arr || arr.length === 0) return "— Nessuno —"
                                                                                                                                                                                   return arr.map(i => `• ${i}`).join("\n")
                                                                                                                                                                                   }