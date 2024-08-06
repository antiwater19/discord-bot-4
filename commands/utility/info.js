const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('user information')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user information')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        // target 자체가 여기서 json형태임.
        console.log("작동확인");
        console.log(target);
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        //const userName = massage
        await interaction.reply(`${target.globalName}님의 정보입니다.`)
        console.log("작동종료");

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(target.globalName)
            .setURL(target.url)
            .setAuthor({ name: target.username, iconURL: target.avatarURL(), url: target.url })
            .setDescription(`이 명령어는 '${target.globalName}' 가 실행했습니다. \n계정생성날짜: ${target.createdAt} \n서버가입날짜: ${target.joinedAt}`)

            .setThumbnail(target.avatarURL()) // 썸네일 이미지

        await interaction.followUp({ embeds: [exampleEmbed] });
    },
};