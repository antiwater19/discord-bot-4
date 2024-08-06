const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild

		//초기 테스트용
		// await interaction.reply({ content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.\n 이 명령어는 '${interaction.user.username}' 가 실행했습니다. 이 서버에 가입한 시기는 ${interaction.member.joinedAt} 입니다.\n\n${interaction.user.avatarURL()}\n\n${interaction.user.createdAt}`, ephemeral: true });
		// const createdAt = interaction.user.createdAt;

		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(interaction.user.globalName)
			.setURL(interaction.user.url)
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL(), url: interaction.user.url })
			.setDescription(`이 명령어는 '${interaction.user.globalName}' 가 실행했습니다. \n계정생성날짜: ${interaction.user.createdAt.getFullYear()}년 ${interaction.user.createdAt.getMonth()}월 ${interaction.user.createdAt.getDate()}일 \n서버가입날짜: ${interaction.member.joinedAt.getFullYear()}년 ${interaction.member.joinedAt.getMonth()}월 ${interaction.member.joinedAt.getDate()}일`)

			.setThumbnail(interaction.user.avatarURL()) // 썸네일 이미지
		await interaction.deferReply();
		await interaction.followUp({ embeds: [exampleEmbed] });
	},
};