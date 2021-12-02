const express = require('express');
const app = express();
const Stats  = require('discord-live-stats');
const roblox = require('noblox.js')
const discord = require('discord.js')
require('dotenv').config()
const db = require('block.db')
const fetch = require('node-fetch')
const rankUtils = require('../roblox/rankUtils')
//const client = require('./index')

module.exports = async (client) => {

const session = require('express-session');


app.get('/', async (request, response) => {
     response.send('welcome to da api');
});
app.use(express.json())


app.get('/', async (request, response) => {
     response.send('welcome to da api');
});


app.get('/getMute', async (req, res) => {
  if (!req.query.id) return res.sendStatus(401)

  const id = req.query.id
  let muted = await db.get(`${id}_muted`)
  if (muted == null) {
    db.set(`${id}_muted`, true)
  }
  muted = await db.get(`${id}_muted`)
  res.json({"muted": muted});
})

app.get('/setMute', async (req, res) => {
  if (!req.query.id || !req.query.muted) return res.sendStatus(401)

  const id = req.query.id
  const muted = req.query.muted

    db.set(`${id}_muted`, muted)

  res.json({"status": 'done'});
})

app.get('/callMod',async (req, res) => {
  if (!req.query.user || !req.query.reason) {
    //console.log(req.body.user)
    //console.log(req.body.reason)
    return res.sendStatus(401)
  }
  const channel = client.channels.cache.get('911687628171145316')
  const embed = new discord.MessageEmbed()
    .setTitle('New Moderator Call From ' + req.query.user)
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`${req.query.reason}`)

  channel.send(embed)
  res.send('done')
}) 
app.post('/setrank', async (req, res) => {
    if (req.body.key !== process.env.key) return res.sendStatus(401);
    if (!req.body.user || !req.body.rank || !req.body.author) return res.sendStatus(400);
    let username = req.body.user;
    let rank = Number(req.body.rank);
    if (!rank) {
        rank = await rankUtils.getRankFromName(req.body.rank, Number(process.env.groupId))
        if (rank == 'NOT_FOUND') return res.sendStatus(400);
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return res.sendStatus(400);
    }
    let rankInGroup = await rankUtils.getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await rankUtils.getRankName(Number(process.env.groupId), id);
    if (Number(process.env.maxRank) <= rankInGroup || Number(process.env.maxRank) <= rank) {
        return res.sendStatus(400);
    }
    let setRankResponse;
    try {
        setRankResponse = await roblox.setRank(Number(process.env.groupId), id, rank);
    } catch (err) {
        console.log(chalk.red('An error occured when running the setrank function: ' + err));
        return res.sendStatus(500);
    }
    let newRankName = await rankUtils.getRankName(Number(process.env.groupId), id);
    res.sendStatus(200);
    if (process.env.logwebhook === 'false') return;
    fetch(process.env.logwebhook, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                color: 2127726,
                description: `${req.body.author} has ranked ${username} from ${rankNameInGroup} (${rankInGroup}) to ${setRankResponse.name} (${setRankResponse.rank}).`,
                footer: {
                    text: 'Action Logs'
                },
                timestamp: new Date(),
                thumbnail: {
                    url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
                }
            }]
        })
    });
});
app.post('/getUsers', async (request, response) => {
     response.send('welcome to da api');
});


app.post('/promote', async (req, res) => {
    if (req.body.key !== process.env.key) return res.sendStatus(401);
    if (!req.body.user || !req.body.author) return res.sendStatus(400);
    let username = req.body.user;
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return res.sendStatus(400);
    }
    let rankInGroup = await rankUtils.getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await rankUtils.getRankName(Number(process.env.groupId), id);
    if (Number(process.env.maxRank) <= rankInGroup || Number(process.env.maxRank) <= rankInGroup + 1) {
        return res.sendStatus(400);
    }
    let promoteResponse;
    try {
        promoteResponse = await roblox.promote(Number(process.env.groupId), id);
    } catch (err) {
        console.log(chalk.red('An error occured when running the promote function: ' + err));
        return res.sendStatus(500);
    }
    let newRankName = await rankUtils.getRankName(Number(process.env.groupId), id);
    res.sendStatus(200);
    if (process.env.logwebhook === 'false') return;
    fetch(process.env.logwebhook, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                color: 2127726,
                description: `${req.body.author} has promoted ${username} from ${rankNameInGroup} (${rankInGroup}) to ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank}).`,
                footer: {
                    text: 'Action Logs'
                },
                timestamp: new Date(),
                thumbnail: {
                    url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
                }
            }]
        })
    });
});

app.post('/demote', async (req, res) => {
    if (req.body.key !== process.env.key) return res.sendStatus(401);
    if (!req.body.user || !req.body.author) return res.sendStatus(400);
    let username = req.body.user;
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return res.sendStatus(400);
    }
    let rankInGroup = await rankUtils.getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await rankUtils.getRankName(Number(process.env.groupId), id);
    if (Number(process.env.maxRank) <= rankInGroup) {
        return res.sendStatus(400);
    }
    let demoteResponse;
    try {
        demoteResponse = await roblox.demote(Number(process.env.groupId), id);
    } catch (err) {
        console.log(chalk.red('An error occured when running the promote function: ' + err));
        return res.sendStatus(500);
    }
    let newRankName = await rankUtils.getRankName(Number(process.env.groupId), id);
    res.sendStatus(200);
    if (process.env.logwebhook === 'false') return;
    fetch(process.env.logwebhook, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                color: 2127726,
                description: `${req.body.author} has demoted ${username} from ${rankNameInGroup} (${rankInGroup}) to ${demoteResponse.newRole.name} (${demoteResponse.newRole.rank}).`,
                footer: {
                    text: 'Action Logs'
                },
                timestamp: new Date(),
                thumbnail: {
                    url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
                }
            }]
        })
    });
});

app.post('/fire', async (req, res) => {
    if (req.body.key !== process.env.key) return res.sendStatus(401);
    if (!req.body.user || !req.body.author) return res.sendStatus(400);
    let username = req.body.user;
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return res.sendStatus(400);
    }
    let rankInGroup = await rankUtils.getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await rankUtils.getRankName(Number(process.env.groupId), id);
    if (Number(process.env.maxRank) <= rankInGroup) {
        return res.sendStatus(400);
    }
    let fireResponse;
    try {
        fireResponse = await roblox.setRank(Number(process.env.groupId), id, 1);
    } catch (err) {
        console.log(chalk.red('An error occured when running the fire function: ' + err));
        return res.sendStatus(500);
    }
    res.sendStatus(200);
    if (process.env.logwebhook === 'false') return;
    fetch(process.env.logwebhook, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                color: 2127726,
                description: `${req.body.author} has fired ${username} from ${rankNameInGroup} (${rankInGroup}).`,
                footer: {
                    text: 'Action Logs'
                },
                timestamp: new Date(),
                thumbnail: {
                    url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
                }
            }]
        })
    });
});

app.post('/shout', async (req, res) => {
    if (req.body.key !== process.env.key) return res.sendStatus(401);
    let msg = req.body.msg;
    let shoutResponse;
    try {
        shoutResponse = await roblox.shout(Number(process.env.groupId), msg);
    } catch (err) {
        console.log(chalk.red('An error occured when running the shout function: ' + err));
        return res.sendStatus(500);
    }
    res.sendStatus(200);
    if (process.env.logwebhook === 'false') return;
    fetch(process.env.logwebhook, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                color: 2127726,
                description: `${req.body.author} has posted a shout:\n\`\`\`${msg}\`\`\``,
                footer: {
                    text: 'Action Logs'
                },
                timestamp: new Date(),
                thumbnail: {
                    url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${req.body.author}`
                }
            }]
        })
    });
});


app.get(`/get-request`, async (request, response) => {
    response.status(200).send(client.request);
});

app.post(`/verify-request`, async (request, response) => {
    let commandRequest = client.request;
    if(commandRequest === "No request") return response.sendStatus(200);
    let successStatus = request.headers.success;
    let message = request.headers.message;

    let channel = client.channels.cache.get(commandRequest.channelID);
    if(!channel) {
        return response.sendStatus(200);
    }

    if(successStatus == "true") {
        if("moderator" in request.headers) {
            channel.send(`<@${commandRequest.authorID}>`);
            let embed = client.embed("Success", message)
            embed.addField("Ban Information", `**Moderator**: ${request.headers.moderator}\n**Reason**: ${request.headers.reason}`);
            channel.send(embed);
        } else {
            channel.send(`<@${commandRequest.authorID}>,`);
                    let string = message.replace(/--/g, '\n')
            channel.send(client.embed("Success", string));
        }
    } else {
        channel.send(`<@${commandRequest.authorID}>`);
        channel.send(client.embed("Failure", message));
    }

    client.request = "No request";

    return response.sendStatus(200);
});

let listener = app.listen(3000, () => {
    console.log(`[EXPRESS] Your app is currently listening on port: ${listener.address().port}`);
});

}