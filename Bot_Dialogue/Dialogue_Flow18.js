module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow18", [
    function (session, results, next) {
      session.beginDialog("Flow18_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow18_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
