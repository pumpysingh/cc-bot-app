module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow15_2", [
    function (session, results, next) {
      session.beginDialog("Flow15_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow15_2_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow15_2_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
