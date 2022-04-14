module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow13_6", [
        function (session, results, next) {
            session.beginDialog("Flow13_6_1");
        },
        function (session, results, next) {
            session.beginDialog("Flow13_6_2");
        },
        function (session, results, next) {
            session.endDialog();
        },
    ]);
};
