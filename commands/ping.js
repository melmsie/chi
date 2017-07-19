exports.run = function (client, msg) {
	msg.channel.send(`H-Hi, am I late? ${client.ping.toFixed(2)} ms`)
}
