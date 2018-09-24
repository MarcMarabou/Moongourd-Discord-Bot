"use strict";
const {prefix} = require('../../config.json');
const utils = require('../utils');
module.exports = {
    command: "usage",
    callback: function(client, message, args){
        const dungeons = "HH, DS, BP, RG, SF, KC, KD, TRNM/HM, RKNM/HM/EM, RMNM/HM, RRNM/HM, AANM/HM, LKNM/HM, SCNM"
        const defaults = "AAHM, Third Boss, All Classes, non-EUC, Slaying"
        return message.channel.send('', {
            "embed":{
                "color": 6077929,
                "fields": [{
                    "name": "mg.rank {username} {dungeon} {class} {1 .. 10} {cap} {non-slay}",
                    "value": `Supports following dungeons: ${dungeons}.\n
                    Besides full class names it supports the following:\n\t
                    Archer: arch\n\t
                    Berserker: zerk, bers\n\t
                    Gunner: gun\n\t
                    Lancer: lanc\n\t
                    Mystic: myst\n\t
                    Ninja: ninj\n\t
                    Priest: pri, not_mystic\n\t
                    Reaper: reap\n\t
                    Valkyrie: valk\n\t
                    Sorcerer: sorc\n\t
                    Slayer: --\n\t
                    Warrior: warr, war
                    \n
                    \n
                    Default setting is ${defaults}.
                    `
                }]
            }
        });
    }
}