const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

const token = 'OTQxMDEyODgzMDQ5OTQ3MTc2.YgPwig.TGdu4x0UVcdTq3KaWAwnBC8xyAE';
const prefix = "giecik ";
const SERGIUSZ1 = "https://cdn.discordapp.com/attachments/941013833839935541/941083508565241936/sergiusz.png";
const ytdl = require("ytdl-core");
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}




client.on("ready", () => {
    console.log('bot dziala');
    console.log(`--- ${client.user.tag} ---`)
})


client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === "siema"){
        client.commands.get('siema').execute(message, args);
    } else if(command === "wyslij sergiusza"){
        message.reply(SERGIUSZ1);
    } else if(command === "graj"){
        client.commands.get('play').execute(message, args);
    } else if(command === "wyjdz"){
        client.commands.get('leave').execute(message, args);
    };

});



client.login(token);