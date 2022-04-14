module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow16", [
    function (session, results, next) {
      session.beginDialog("Flow16_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow16_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
