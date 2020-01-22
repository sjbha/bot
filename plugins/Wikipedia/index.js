/*
 * Wikipedia plugin to look up wikipedia extracts.
 *
 * This uses the Wikipedia summary API here:
 *
 * https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_*
 * The !wp command retrieves a page summary, and the !unwp command will
 * remove the same summary.
 */
import Axios from "axios";

const baseConfig = {
   command: "ban"
}

let recentDefinitions = {}

export default function(bastion, opt={}) {

   return [

       {
           // Command to start it
           command: `wp`, 

           // Core of the command
           resolve: async function(context) {
              const [cmd, ...words] = context.message.split(" ")
              const word = words.join(' ')

              if (!word) return;

              const {data} = await Axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${word}`)
              console.log("response?", data)
              if (!data) {
                return `No extracts returned from wikipedia for **${word}**`
              }

              let embed = {
                "color": 16201999,
                "author": {
                  "name": data.title,
                  "icon_url": "https://en.wikipedia.org/static/images/project-logos/enwiki.png"
                },
                "fields": [
                  {
                    "name": "Extract",
                    "value": data.extract
                  }
                ]
              }

	      if (data.hasOwnProperty("thumbnail")) {
	        embed["thumbnail"] = {
		  "url": data.thumbnail.source
		}
              }

              const msg = await bastion.bot.sendMessage({
                to: context.channelID,
                embed
              })

              recentDefinitions[context.userID] = [
                msg.id,
                context.channelID
              ]
           }
       },

       {
           // Command to start it
           command: `unwp`, 

           // Core of the command
           resolve: async function(context) {
             const userID = context.userID

             if (!recentDefinitions[userID]) return;

             const [msgId, channelID] = recentDefinitions[userID]

            await bastion.bot.deleteMessage({
                channelID: channelID,
                messageID: msgId
            })

            recentDefinitions[userID] = null

             return '<:shitfuck:555554433048510475>'
           }
       }

   ]
}
