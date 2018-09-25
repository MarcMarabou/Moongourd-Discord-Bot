"use strict";
const {prefix} = require('../../config.json');
module.exports = {
    command: "usage",
    callback: function(client, message, args){
        const dungeons = "HH, DS, BP, RG, SF, KC, KD, TRNM/HM, RKNM/HM/EM, RMNM/HM, RRNM/HM, AANM/HM, LKNM/HM, SCNM"
        const defaults = "AAHM, Third Boss, All Classes, non-EUC, Slaying"
        return message.channel.send('', {
            "embed":{
                "color": 6077929,
                "fields": [{
                    "name": `${prefix}rank {username} {dungeon} {class} {1 .. 10} {cap} {non-slay}`,
                    "value": `Supports following dungeons: **${dungeons}**.
                    Besides full class names it supports the following:
                    **Archer**: arch
                    **Berserker**: zerk, bers
                    **Gunner**: gun
                    **Lancer**: lanc
                    **Mystic**: myst
                    **Ninja**: ninj
                    **Priest**: pri, not_mystic
                    **Reaper**: reap
                    **Valkyrie**: valk
                    **Sorcerer**: sorc
                    **Slayer**: --
                    **Warrior**: warr, war
                    Default setting is **${defaults}**.
                    `
                }]
            }
        });
    }
}