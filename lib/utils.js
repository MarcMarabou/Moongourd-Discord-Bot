"use strict";
module.exports = {
    getClassImage: function (arg) {
        switch (arg) {
            case "warrior":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-warrior.png";
            case "lancer":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-lancer.png";
            case "slayer":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-slayer.png";
            case "berserker":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-berserker.png";
            case "sorcerer":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-sorcerer.png";
            case "archer":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-archer.png";
            case "priest":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-priest.png";
            case "mystic":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-mystic.png";
            case "reaper":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-reaper.png";
            case "gunner":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-gunner.png";
            case "brawler":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-brawler.png";
            case "ninja":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-ninja.png";
            case "valkyrie":
                return "http://download.enmasse.com/images/tera/race-class/classpage/class-selector-valkyrie.png";
            default:
                return "https://cdn.discordapp.com/embed/avatars/0.png";
        }
    },
    formatEmbeddedPost: function(thumbUrl = "https://cdn.discordapp.com/embed/avatars/0.png", color = 6077929, author = "Unknown", fields = [{name:'',value:''}]){
        return {
            "embed":{
                "thumbnail": {
                    "url": thumbUrl
                },
                "color": color,
                "author": {
                    "name": author
                },
                "fields": fields
            }
        }
    }
}