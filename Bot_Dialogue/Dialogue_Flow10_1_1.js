module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow10_1_1", [
        function (session, results, next) {
            session.beginDialog("Flow10_1_1_1");
        },
        function (session, results, next) {
            session.beginDialog("Flow10_1_1_2");
        },
        function (session, results, next) {
            session.endDialog();
        },
    ]);
};
