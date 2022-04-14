module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow15", [
    function (session, results, next) {
      session.beginDialog("Flow15_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow15_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow15_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
