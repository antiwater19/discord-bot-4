const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, InteractionResponse, InteractionCollector, ComponentType, ButtonInteraction } = require('discord.js');
const { response } = require('express');
const { wait, a } = require('partial-js');

module.exports = {
    // 명령어 쿨타임 cooldown변수 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('가위바위보 게임 하기!'),
    async execute(interaction) {

        const RandomeBot = Math.floor(Math.random() * (3 - 1) + 1);
        // 1: 주먹, 2: 보, 3: 가위

        const Rock = new ButtonBuilder()
            .setCustomId('rock')
            .setLabel('주먹')
            .setStyle(ButtonStyle.Primary);
        //.setvalue(1);

        const Paper = new ButtonBuilder()
            .setCustomId('paper')
            .setLabel('보')
            .setStyle(ButtonStyle.Primary);
        //.setvalue(2);

        const Scissors = new ButtonBuilder()
            .setCustomId('scissors')
            .setLabel('가위')
            .setStyle(ButtonStyle.Primary);
        // .setvalue(3); //요거 오류뜸  함수가 아니라고 함

        const row = new ActionRowBuilder()
            .addComponents(Rock, Paper, Scissors);

        const games = await interaction.reply({ content: interaction.user.globalName + '님아 가위바위보중 어떤걸 내시겠습니까?', components: [row], });
        await wait(5_000);

        const filter = i => i.user.id === interaction.user.id;

        const collector = games.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
            time: 10_000,
        });

        collector.on('collect', (inter) => {

            if (inter.customId === 'rock') {
                if (RandomeBot === 1) {
                    interaction.followUp('비겼습니다!');
                } else if (RandomeBot === 2) {
                    interaction.followUp('졌습니다!');
                } else if (RandomeBot === 3) {
                    interaction.followUp('이겼습니다!');
                }

            }

            if (inter.customId === 'paper') {
                if (RandomeBot === 1) {
                    interaction.followUp('이겼습니다!');
                } else if (RandomeBot === 2) {
                    interaction.followUp('비겼습니다!');
                } else if (RandomeBot === 3) {
                    interaction.followUp('졌습니다!');
                }

            }

            if (inter.customId === 'scissors') {
                if (RandomeBot === 1) {
                    interaction.followUp('졌습니다!');
                } else if (RandomeBot === 2) {
                    interaction.followUp('이겼습니다!');
                } else if (RandomeBot === 3) {
                    interaction.followUp('비겼습니다!');
                }

            }


            console.log('\n\n' + RandomeBot);
            console.log(inter.customId);
        });








        // const message = await interaction.fetchReply();
        // console.log(message);
    },
};