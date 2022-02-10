module.exports = {
    name: 'leave',
    description: 'wyjazd z kanalu',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("musisz byc na kanale zeby wylaczyc muze");
        await voiceChannel.leave();
        await message.channel.send('spierdalam')
 
    }
}