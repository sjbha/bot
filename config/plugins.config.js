// plugins
import Ping from '../plugins/echos/Ping'
import Echos from '../plugins/echos/Echos'
import Subscribe from '../plugins/Subscribe'
import Poll from '../plugins/Poll'
import TLDR from '../plugins/Tldr'
import Strava from '../plugins/Strava'
import StockChart from '../plugins/StockChart'
import Ban from '../plugins/Ban'
import Events from '../plugins/Events'
import Ask from '../plugins/Ask'
import Stats from '../plugins/Stats'
import Eval from '../plugins/Eval'
import db from '../plugins/db'
import Teams from '../plugins/Teams'
import Outbreak from '../plugins/Outbreak'
import AutoTag from '../plugins/AutoTag'
import Upvotes from '../plugins/Upvotes'
import Dungeon from '../plugins/Dungeon'
import Reddit from '../plugins/Reddit'
import DuckHunt from '../plugins/DuckHunt'
import RoyRoyBucks from '../plugins/RoyRoyBucks'
import Lotto from '../plugins/Lotto'
import Music from '../plugins/Music'
import Fools from '../plugins/Fools'
import Olympics from '../plugins/Olympics'
import UrbanDictionary from '../plugins/UrbanDictionary'
import Trading from '../plugins/Trading'
import AskDiscussion from '../plugins/AskDiscussion'
import Yelling from '../plugins/yelling'

const subscriptions = {
    "photomeet": "486330820114513920",
    "carmeet": "486331665870749707",
    "drinks": "486331712645758996",
    // "boombot": "486331751963164692",
    "overwatch": "488848900900388884",
    "dota": "488848948598145026",
    "food": "488849102243889152",
    "trivia": "519355421652156419",
    "apex": "558064314301546496",
    "discgolf": "597852704227721216"
}

export default bastion => ([ 
    db(bastion, {
        mongoUrl: process.env.MONGO_URL
    }),
    Ask,
    Ping,
    Echos,
    Poll,
    TLDR(bastion, {
        listRestrict: ["shitpost", "admin"]
    }),
    Ban,
    Stats(bastion, {
        restrict: ["616751303162593313"]
    }),
    Teams(bastion, {
        listRestrict: ["shitpost", "admin"]
    }),
    StockChart(bastion, {
        restrict: ["stocks"]
    }),
    Subscribe(bastion, { subscriptions }),
    Strava(bastion, {
        restrict: ["strava", "616751303162593313"]
    }),
    Events(bastion, {
        command: "meetup",
        announcementChannel: bastion.channels.announcement,
        compactChannel: bastion.channels.compact,

        // dev
        // compact: {"todayId":"598646940770631800","thisWeekId":"598646943412912139","nextWeekId":"598646944465813504","twoWeeksId":"598646945317388309","threeWeeksId":"598646946420359170","laterId":"598646962463571975"}
        // prod
        compact: {
            "todayId":"471806505365143552",
            "thisWeekId":"471806506321575936",
            "nextWeekId":"471806507093065749",
            "twoWeeksId":"471806508041109504",
            "threeWeeksId":"471806508913655828",
            "laterId":"471806527603212298"
        }
    }),
    Outbreak(bastion, {
        restrict: ["shitpost", "616751303162593313"]
    }),
    AutoTag(bastion, {
        restrict: ["416708557984104448"]
    }),
    Upvotes,
    Dungeon,
    Reddit(bastion, {
        channel: "506911331257942027"
    }),
    DuckHunt(bastion, {
        listRestrict: ["shitpost", "616751303162593313"]
    }),
    RoyRoyBucks,
    Lotto(bastion, {
        restrict: ["506911331257942027", "616751303162593313"]
    }),
    Music,
    Olympics,
    UrbanDictionary,
    Trading,
    AskDiscussion,
    Yelling,
    Eval
    // Fools(bastion, {
    //     listRestrict: ["shitpost", "616751303162593313"]
    // })
])
