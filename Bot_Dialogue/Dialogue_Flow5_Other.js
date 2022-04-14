
module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow5_Other", [
        function (session, results, next) {
            session.beginDialog("Flow31_Login");
        },
        function (session, results, next) {
            session.endDialog();
        },
    ]);
};
