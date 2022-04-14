module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow25", [
    function (session, results, next) {
      session.beginDialog("Flow25_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow25_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
