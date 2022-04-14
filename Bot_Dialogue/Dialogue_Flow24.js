module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow24", [
    function (session, results, next) {
      session.beginDialog("Flow24_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow24_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow24_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
