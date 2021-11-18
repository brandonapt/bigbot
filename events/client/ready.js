module.exports = (client) => {
	const botStatus = [
		`with ${client.users.cache.size} users!`,
	];

	setInterval(() => {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(status, { type: 'PLAYING' });
	}, 5000);

	client.user.setStatus('dnd'); // sets the bots status

	console.log(`[DJS] ${client.user.username} is now online!`); // consoles logs this when bot is turned on
};
