const { SlashCommandBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder } = require('discord.js');
const { wait, a } = require('partial-js');

module.exports = {
    // 명령어 쿨타임 cooldown변수 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('input')
        .setDescription('입력한거 반환하기.'),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('Input_Data')
            .setTitle('뭐 입력하는 곳');

        const InputBox = new TextInputBuilder()
            .setMaxLength(1000) // 글자 최대길이가 1000이 최대라는 뜻임
            .setCustomId('input_data')
            //레이블은 이 입력에 대해 사용자에게 표시되는 프롬프트입니다.
            .setLabel("Input your data")
            .setPlaceholder('뭐 입력하고 싶은거 있나?')
            //짧다는 것은 한 줄의 텍스트만 의미합니다.
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(InputBox);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);

        // editReply는 응답을 다시 바꾸는 것이다.
        // await interaction.editReply({ content: 'Secret Pong!', ephemeral: true });

        // 응답 삭제하기
        // await interaction.deleteReply();

        // followUp 자기가 했던말에 위에 답변으로 다는 것 (ephemeral: true는 개인에게 만 보이게 하는것)
        await interaction.followUp({ content: 'ㅇㅇ', ephemeral: true })
        const message = await interaction.fetchReply();
        console.log(message);
    },
};