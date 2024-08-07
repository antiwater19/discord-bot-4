const express = require("express");
const fs = require('node:fs');
const path = require('node:path');
const wait = require('node:timers/promises').setTimeout;
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { token } = require('./config.json');

// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// 명령어 파일들 commands폴더 뒤저서 실행해주는 코드
client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// event 폴더 안의 봇활성화 .js 들 작동시키는 거
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//디스코드 채팅메시지 로그 기록하기 만들어보는중
// 이거 디스코드 봇 설정에 가서 Message Content Intents 활성화 해줘야함(와 씨 소름 돋네이거 방금 copilot이 지알아서 작성함;;)
client.on('messageCreate', (message) => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
	if (message.content === 'hi') {
		message.reply('hello');
	}
	if (message.content === '던파하쉴?') {
		message.reply('올ㅋ');
	}
	if (message.content === '이민수') {
		message.reply('GOAT (Greatest Of All Time)');
	}
	if (message.content === '집') {
		message.reply('다치지 말고 건강하게 돌아오다오..');
	}
	console.log(`${message.author.username}:${message.content}`);
});

client.login(token);