const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { VoiceChannel } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
 
module.exports = {
    name: 'play',
    description: 'odpala muze',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('gdzie mam to grac? wejdz na kanal');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('nie masz uprawnienia connect');
        if (!permissions.has('SPEAK')) return message.channel.send('nie masz uprawnienia speak');
        if (!args.length) return message.channel.send('ale co ja mam grac?');
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('wychodze');
            });
 
            await message.reply(`odpalam muze`)
 
            return
        }
 
        
        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
 
            await message.reply(`znalazlem i odpalam: ${video.title}`)
        } else {
            message.channel.send('nic nie znalazlem');
        }
    }
}