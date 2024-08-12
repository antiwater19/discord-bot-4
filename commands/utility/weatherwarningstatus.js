const { SlashCommandBuilder, messageLink } = require('discord.js');
const { WeatherToken } = require('./ApiToken.json');
var request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weatherwarningstatus')
        .setDescription('기상특보 현황을 알려줍니다.'),
    // .addStringOption(option =>
    //     option.setName('date')
    //         .setDescription('날짜를 입력해주세요. 예)2024년8월8일이면 20240808로 입력')
    //         .setRequired(true)),
    async execute(interaction) {
        //const dateInfo = interaction.options.getString('date', true);

        var url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus';

        var queryParams = '?' + encodeURIComponent('ServiceKey') + WeatherToken; /* 서비스 인증키 */

        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */

        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */

        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* 요청자료형식(XML/JSON) Default: XML */

        console.log('호출한 url: ' + url + queryParams);
        //https://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus?serviceKey=9mTk0%2FxkXqrLmNNHjWBa%2F1miAzFFB9rxSS7KKuTq3FtOvlxeXCNHt6ix0GJvj%2FoEUnQdzxqBr0fuGEHQ1uARSQ%3D%3D&pageNo=1&numOfRows=10&dataType=JSON

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            // console.log('\n\nStatus출력\n\n', response.statusCode);
            // console.log('\n\nHeaders출력\n\n', JSON.stringify(response.headers));
            // console.log('\n\nresponse 파라미터 출력\n\n', response.body);
            // const needData = body;
            // console.log('\n\nReponse received출력\n\n', needData);
            try {
                const resultObject = JSON.parse(response.body); // 우리가 원하는 데이터 파싱

                // console.log('\n\n\n테스트용--------------------------------------------\n\n\n');
                // console.log(resultObject.response.body.items.item[0].t6, '\n\n');// 폭염주의보인지 띄우기

                let findWord1 = "폭염경보";
                let findWord2 = "폭염주의보";
                if (resultObject.response.body.items.item[0].t6.indexOf(findWord1) !== -1 && resultObject.response.body.items.item[0].t6.indexOf(findWord2) !== -1) {
                    interaction.reply(`# __현재 전국특보발효중!!__\n\n## 특보현황내용\n${resultObject.response.body.items.item[0].t6}\n\n발표시각: ${resultObject.response.body.items.item[0].tmFc}\n특보발효현황시각: ${resultObject.response.body.items.item[0].tmEf}\n기상청 주소: https://www.weather.go.kr/ \n\n출력되었습니다.`);
                }
                else {
                    interaction.reply(`# __현재 전국특보발효중이 아님__\n\n## 특보현황내용\n${resultObject.response.body.items.item[0].t6}\n\n발표시각: ${resultObject.response.body.items.item[0].tmFc}\n특보발효현황시각: ${resultObject.response.body.items.item[0].tmEf}\n기상청 주소: https://www.weather.go.kr/ \n\n출력되었습니다.`);
                }

            }
            catch {
                interaction.reply('날짜를 다시 입력해주세요.');
                //console.log(dateInfo);
            }


        });

        // 내용안에 띄워야 할것들

        // 특보발효현황 시각 
        // 발표시각 
        // 측보 발효 현황 내용
        // 가장 중요한거 현재 특보가 발효중인지 아닌지만 확인할 수 있으면 된다.

    },
}; 