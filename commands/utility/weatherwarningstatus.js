const { SlashCommandBuilder, messageLink } = require('discord.js');

var request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weatherwarningstatus')
        .setDescription('기상특보 현황을 알려줍니다.')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('날짜를 입력해주세요. 예)2024년8월8일이면 20240808로 입력')
                .setRequired(true)),
    async execute(interaction) {
        const dateInfo = interaction.options.getString('date', true);
        await interaction.reply('Pong!');

        var url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus';

        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=9mTk0%2FxkXqrLmNNHjWBa%2F1miAzFFB9rxSS7KKuTq3FtOvlxeXCNHt6ix0GJvj%2FoEUnQdzxqBr0fuGEHQ1uARSQ%3D%3D'; /* 서비스 인증키 */

        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */

        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */

        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* 요청자료형식(XML/JSON) Default: XML */

        //https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus?serviceKey=9mTk0%2FxkXqrLmNNHjWBa%2F1miAzFFB9rxSS7KKuTq3FtOvlxeXCNHt6ix0GJvj%2FoEUnQdzxqBr0fuGEHQ1uARSQ%3D%3D&pageNo=1&numOfRows=10&dataType=JSON

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            console.log('Status', response.statusCode);
            console.log('Headers', JSON.stringify(response.headers));
            console.log('Reponse received', body);
        });

        try {
            const myJson = body;
            console.log(myJson);
        }
        catch {
            interaction.followUp('날짜를 다시 입력해주세요.');
            console.log(dateInfo);
        }


    },
}; 