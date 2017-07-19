const util = require('util')
exports.run = function (client, msg, args) {

	if (!config.devs.includes(msg.author.id)) return

	let res
	let evalTime
	try {
		const rep = new RegExp(client.token, 'gi')
		const before = Date.now()
		res = eval(args.join(' '))
		evalTime = Date.now() - before
		if (typeof res === 'string')
			res = res.replace(rep, '*')
		else res = util.inspect(res, {
				depth: 0
			})
			.replace(rep, '*')
	} catch (err) {
		res = err
	}
	const embed = {
		color: '5881576',
		fields: [{
				name: "Input",
				value: `\`\`\`js\n${args.join(' ')}\`\`\``
			},
			{
				name: "Output",
				value: `\`\`\`js\n${res}\`\`\``
			}
		],
		footer: {
			text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : ''
		}
	};

	msg.channel.send({
		embed: embed
	})
}