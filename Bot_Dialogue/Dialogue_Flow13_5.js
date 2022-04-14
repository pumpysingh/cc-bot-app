module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow13_5", [
        function (session, results, next) {
            session.beginDialog("Flow13_5_1");
        },
        function (session, results, next) {
            session.beginDialog("Flow13_5_2");
        },
        function (session, results, next) {
            session.beginDialog("Flow13_5_4");
        },
        function (session, results, next) {
            session.beginDialog("Flow13_5_5");
        },
        function (session, results, next) {
            session.endDialog();
        },
    ]);
};
