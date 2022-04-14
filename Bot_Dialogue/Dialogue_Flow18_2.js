module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow18_2", [
    function (session, results, next) {
      session.beginDialog("Flow18_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow18_2_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow18_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
