'use strict';

// Import the discord.js module
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
// Create an instance of a Discord client
const client = new Client();
const fs = require("fs");
const { count } = require('./pog');
//var pog = count; // need to interpret from array
var pog = count;

client.on('ready', () => {
	console.log('Initialized');
	setPog();
	//console.log(pog);
});

client.on('message', async message => {


if (message.author.bot) return;

const string = message.content.toLowerCase();

if (string.includes("pog")) {
	pog = pog + 1;
	message.channel.send(`Thats another pog! \nCurrent count: ***${pog}***`);
	setPog();
}

if (!message.content.startsWith(prefix)) return;
   
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

if (command.charAt(0) == "") return;	

console.log(`Command Entered: ${command} by ${message.author.username} in ${message.guild}`);

switch(command){
 case 'reset': {
	pog = 0;
	message.channel.send("Reset pogs to ***0***");
	setPog();
 break;
 }
 case 'count': {
	 message.channel.send(`Current count: ***${pog}***`);
 break;
 }
 default:
message.channel.send(`${message.author}, the command '${command}' is not a valid command! Please contact the developer if this is an unexpected occurrence.`)
};
  });

 function setPog() {

client.user.setActivity(`with ${pog} pogs`, { type: 'PLAYING' }) // type options: WATCHING, PLAYING, STREAMING
  .then(presence => console.log(`Activity set to ${presence.activities[0].type} ${presence.activities[0].name}`))
  .catch(console.error);
  
console.log(pog);


 const customer = {
    count: pog,
}
const jsonString = JSON.stringify(customer)
fs.writeFile('./pog.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
}; 

client.login(process.env.BOT_TOKEN);