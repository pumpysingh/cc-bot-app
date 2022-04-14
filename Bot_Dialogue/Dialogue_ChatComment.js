module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("ChatComment", [
    function (session, results, next) {
      session.beginDialog("ChatComment_1");
    },
    function (session, results, next) {
      session.beginDialog("ChatComment_2");
    }
  ]);
};
