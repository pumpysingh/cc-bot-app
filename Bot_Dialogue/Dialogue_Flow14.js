module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow14", [
    function (session, results, next) {
      session.beginDialog("Flow14_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow14_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow14_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
