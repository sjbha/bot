import dotenv from 'dotenv'

dotenv.config()

import Bastion from './lib/bastion'
import botModules from './config/plugins.config'
import Boombot from './plugins/Boombot'

const channels = {
    "admin": process.env.C_ADMIN,
    "shitpost": "616751303162593313",
    "strava": "616751303162593313",
    "boombot": "616751303162593313",
    "stocks": "616751303162593313",
    "dungeon": "616751303162593313",
    "announcement": process.env.C_ANNOUNCEMENT,
    "compact": process.env.C_COMPACT
}

const bastion = Bastion({
    token: process.env.DISCORD_TOKEN,
    channels,
    serverId: process.env.SERVER_ID,
    prefix: process.env.NODE_ENV === "production" ? "!" : (process.env.npm_config_symbol || "_")
})

// Load modules
// bastion.use(botModules(bastion), { ignore: [channels.boombot] })
bastion.use(botModules(bastion))
bastion.use(Boombot(bastion, {
    restrict: [channels.boombot]
}))

bastion.connect()
