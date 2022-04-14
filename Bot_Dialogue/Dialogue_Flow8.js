module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow8", [
    function (session, results, next) {
      session.beginDialog("Flow8_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow8_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
