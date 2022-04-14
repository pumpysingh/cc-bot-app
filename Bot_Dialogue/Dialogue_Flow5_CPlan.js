
module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow5_CPlan", [
        function (session, results, next) {
            session.beginDialog("Flow10_CP");
        },
        function (session, results, next) {
            session.endDialog();
        },
    ]);
};
