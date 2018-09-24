"use strict";
const utils = require("../utils.js");
const request = require("request-promise-native");
const { MOONGOURD_AREA, CLASS_ALIASES } = require("../../data/moongourd-data.json");
module.exports = {
    command: "rank",
    callback: function (client, message, args) {
        if (!args.length) return message.channel.send('ok done');
        let dungeon, dungeonName, boss, bossNumber, bossName, lookup, euc, slay;
        const username = args.shift();
        //DEFAULTS
        dungeonName = 'aahm';
        bossNumber = 3;
        dungeon = MOONGOURD_AREA[dungeonName][0];
        boss = MOONGOURD_AREA[dungeonName][bossNumber].id;
        bossName = MOONGOURD_AREA[dungeonName][bossNumber].string;
        lookup = 'All Classes';
        euc = '0';
        slay = '1';

        if (args[0] === undefined) {
            message.channel.send('No arguments passed. Looking up in default settings');
        } else {
            for (let val of args) {
                if (MOONGOURD_AREA.hasOwnProperty(val.toLowerCase())) dungeonName = val.toLowerCase();
                else if (['1', 'first', 'ph2', 'f1',].includes(val.toLowerCase())) bossNumber = 1;
                else if (['2', 'second', 'ph3', 'f2'].includes(val.toLowerCase())) bossNumber = 2;
                else if (['3', 'third', 'last', 'ph4', 'f3'].includes(val.toLowerCase())) bossNumber = 3;
                else if (['4', 'f4'].includes(val.toLowerCase())) bossNumber = 4;
                else if (['5', 'f5'].includes(val.toLowerCase())) bossNumber = 5;
                else if (['6', 'f6'].includes(val.toLowerCase())) bossNumber = 6;
                else if (['7', 'f7'].includes(val.toLowerCase())) bossNumber = 7;
                else if (['8', 'f8'].includes(val.toLowerCase())) bossNumber = 8;
                else if (['9', 'f9'].includes(val.toLowerCase())) bossNumber = 9;
                else if (['10', 'f10'].includes(val.toLowerCase())) bossNumber = 10;
                else if (val.toLowerCase() == 'cap') euc = '1';
                else if (val.toLowerCase() == 'non-slay') slay = '0';
                else {
                    for (let job in CLASS_ALIASES) {
                        if (CLASS_ALIASES[job].includes(val.toLowerCase())) lookup = job;
                    }
                }
            }
            if(bossNumber >= MOONGOURD_AREA[dungeonName].length) return message.channel.send('Invalid boss/dungeon number selected'); 
            dungeon = MOONGOURD_AREA[dungeonName][0];
            boss = MOONGOURD_AREA[dungeonName][bossNumber].id;
            bossName = MOONGOURD_AREA[dungeonName][bossNumber].string;
        }
        let replace;
        if (lookup == 'All Classes') {
            replace = '<a.*>(.*)<\\/a>.*\\s*.*class-icons-t/(.*).png.*\\s*<b>(' + username + ')<\\/b><br>(.*)<\\/a>.*\\s*.*<a href="(.*)">(.*)<\\/a>';
        } else {
            replace = '<a.*>(.*)<\\/a>.*\\s*.*\\s*<b>(' + username + ')<\\/b><br>(.*)<\\/a>.*\\s*.*<a href="(.*)">(.*)<\\/a>';
        }
        message.channel.send(`Looking up in ${dungeonName.toUpperCase()}, ${bossName}, ${(euc == '1') ? 'EUC' : 'non-EUC'}, ${(slay == '1') ? 'Slaying' : 'Non-Slaying'}, ${lookup}`);
        request('https://moongourd.com/eu/hiscores?area=' + dungeon + '&boss=' + boss + '&class=' + lookup + '&filter=nh&euc=' + euc + '&slay=' + slay, function (error, response, body) {
            const re = new RegExp(replace, 'gi');
            const content = re.exec(body);
            if (content != null) {
                const thumbnail = (lookup == 'All Classes') ? utils.getClassImage(content[2].toLowerCase()) : utils.getClassImage(lookup.toLowerCase());
                const author = (lookup == 'All Classes') ? content[3] : content[2];
                const fields = [{ 'name': 'Boss', 'value': bossName }, { 'name': 'Server', 'value': (lookup == 'All Classes') ? content[4] : content[3], 'inline': true }, { 'name': 'Rank', 'value': content[1], 'inline': true }, { 'name': 'DPS', 'value': (lookup == 'All Classes') ? content[6] : content[5] }, { 'name': 'Run', 'value': '[Moongourd Link](https://moongourd.com/eu/' + ((lookup == 'All Classes') ? content[5] : content[4]) + ')' }
                ];
                return message.channel.send('', utils.formatEmbeddedPost(thumbnail, 6077929, author, fields));
            } else return message.channel.send('User could not be found. Consider more specific options.');
        });
    }
}