const server = require("express")();
const line = require("@line/bot-sdk");

const line_config = {
	channelAccessToken: process.env.LINE_ACCESS_TOKEN,
	channelSecret: process.env.LINE_CHANNEL_SECRET,
};

server.listen(process.env.PORT || 3000);

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
	res.sendStatus(200);
	console.log(req.body);
});
	
const bot = new line.Client(line_config);

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

	res.sendStatus(200);

	var events_processed = [];

	req.body.events.forEach((event) => {

		if (event.type == 'message' && event.message.type == 'text'){
			if (event.message.text == 'こんにちは'){
				events_processed.push(bot.replyMessage(event.replyToken, {
					type: "text",
					text: "これはこれは"
				}));
			}
		}
	});


	Promise.all(events_processed).then(
		(response) => {
			console.log(`${response.length} events(s) processed.`);
		}
	);
});
