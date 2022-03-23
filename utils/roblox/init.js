const roblox = require('noblox.js')
require('dotenv').config()


roblox.setCookie(process.env.COOKIE).then(async function() { //Use COOKIE from our .env file.
    let person = await roblox.getCurrentUser()
    console.log(`[NOBLOX] Logged in as ${person.UserName}!`)
}).catch(function(err) {
    console.log("[NOBLOX] Unable to log in!", err)
})