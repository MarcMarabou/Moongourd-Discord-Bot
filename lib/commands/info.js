const request = require('request-promise-native');
const { MOONGOURD_AREA } = require("../../data/moongourd-data.json");
const utils = require('../utils.js');
module.exports = {
    command: "info",
    callback: function (client, message, args) {
        if (args.length < 3) return message.channel.send('Please list: {server} {username} {dungeon} {optional: boss number}');
        const servers = ["killian", "mystel", "seren", "yurian"];
        const postData = { region: "EU" };
        if (!servers.includes(args[0].toLowerCase())) return message.channel.send('First argument must be server. Acceptable servers are: ', servers.join(' '));
        if (!MOONGOURD_AREA.hasOwnProperty(args[2].toLowerCase())) return message.channel.send('Dungeon acronym not recognized. Please try again');

        let bossNumber = 3;
        if (args[3] == undefined) message.channel.send('Defaulting to 3rd boss.');
        else if (['1', 'first', 'ph2', 'f1',].includes(args[3].toLowerCase())) bossNumber = 1;
        else if (['2', 'second', 'ph3', 'f2'].includes(args[3].toLowerCase())) bossNumber = 2;
        else if (['3', 'third', 'last', 'ph4', 'f3'].includes(args[3].toLowerCase())) bossNumber = 3;
        else if (['4', 'f4'].includes(args[3].toLowerCase())) bossNumber = 4;
        else if (['5', 'f5'].includes(args[3].toLowerCase())) bossNumber = 5;
        else if (['6', 'f6'].includes(args[3].toLowerCase())) bossNumber = 6;
        else if (['7', 'f7'].includes(args[3].toLowerCase())) bossNumber = 7;
        else if (['8', 'f8'].includes(args[3].toLowerCase())) bossNumber = 8;
        else if (['9', 'f9'].includes(args[3].toLowerCase())) bossNumber = 9;
        else if (['10', 'f10'].includes(args[3].toLowerCase())) bossNumber = 10;

        Object.assign(postData, {
            playerServer: args[0][0].toUpperCase() + args[0].toLowerCase().slice(1),
            playerName: args[1],
            areaId: MOONGOURD_AREA[args[2].toLowerCase()][0],
            bossId: MOONGOURD_AREA[args[2],toLowerCase()][bossNumber].id
        });

        request({
            method: 'post',
            body: postData,
            json: true,
            url: 'https://moongourd.com/api/helpbot/info'
        }).then(function (body) {
            if (body[0][0].avg == null) return message.channel.send('User not found.');
            const thumbnail = body[0][0].avatar;
            const author = body[0][0].playerName;
            const color = Number(body[0][0].color);
            const playerClass = body[0][0].playerClass;
            const killCount = body[0][0].count;
            const avg = Number(body[0][0].avg).toLocaleString();
            const max = Number(body[0][0].max).toLocaleString();

            const fields = [
                {
                    'name': 'Boss',
                    'value': MOONGOURD_AREA[args[2]][bossNumber].string
                },
                {
                    'name': 'Class',
                    'value': playerClass,
                    'inline': true
                },
                {
                    'name': 'Kill Count',
                    'value': killCount,
                    'inline': true
                },
                {
                    'name': 'Average DPS',
                    'value': avg,
                    'inline': true
                },
                {
                    'name': 'Maximum DPS',
                    'value': max,
                    'inline': true
                }
            ];
            return message.channel.send('', utils.formatEmbeddedPost(thumbnail, color, author, fields));
        });
    }
}
