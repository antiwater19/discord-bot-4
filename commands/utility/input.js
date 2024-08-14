const { SlashCommandBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder, Events, ModalSubmitInteraction, ModalSubmitFields } = require('discord.js');
const { wait, a, filter } = require('partial-js');

module.exports = {
    // 명령어 쿨타임 cooldown변수 
    //cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('input')
        .setDescription('입력한거 반환하기.'),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('Input_Data')
            .setTitle('뭐 입력하는 곳');



        const InputBox = new TextInputBuilder()
            .setMaxLength(1_000) // 글자 최대길이가 1000이 최대라는 뜻임
            .setCustomId('input_data')
            //레이블은 이 입력에 대해 사용자에게 표시되는 프롬프트입니다.
            .setLabel("Input your data")
            .setPlaceholder('뭐 입력하고 싶은거 있나?')
            //짧다는 것은 한 줄의 텍스트만 의미합니다.
            .setRequired(true)
            .setStyle(TextInputStyle.Short);


        const firstActionRow = new ActionRowBuilder().addComponents(InputBox);

        modal.addComponents(firstActionRow);

        //submit

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === 'Input_Data';

        interaction.awaitModalSubmit({ filter, time: 30_000 }).then((modalInteraction) => {
            const ddata = modalInteraction.fields.getTextInputValue('input_data')
            console.log(ddata);

            modalInteraction.reply({ content: `입력한 데이터는 ${ddata} 입니다.` });
        });


    },
};