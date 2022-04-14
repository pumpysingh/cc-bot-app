
module.exports = function (bot, builder) {
    var restapicall = require("../restapicall");
    var utility = require("../utility");

    bot.dialog("Flow30", [
        function (session, results, next) {
            session.beginDialog("ChatEndReview");
        },
        function (session, results, next) {
            session.beginDialog("ChatComment");
        },
        function (session, results, next) {
            session.beginDialog("CommanOptOut");
        },
    ]);
};
