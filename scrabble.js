var Botkit = require('botkit');

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

if (!process.env.clientId) {
  console.log('Error: Specify clientId in environment')
  process.exit(1)
}

if (!process.env.clientSecret) {
  console.log('Error: Specify clientSecret in environment')
  process.exit(1)
}


var controller = Botkit.slackbot({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: ['bot'],
    redirectUri: 'http://localhost:3000/oauth',
    json_file_store: __dirname + '/.data/db/'

});


controller.startTicking();

controller.setupWebserver(3000, function(err, express) {
    controller.createOauthEndpoints(express);
    controller.createWebhookEndpoints(express);
});

controller.hears('hello','direct_message', function(bot, message) {
    bot.reply(message,'Hello yourself!');
});
