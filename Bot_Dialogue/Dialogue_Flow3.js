module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow3", [
    function (session, results, next) {
      session.beginDialog("Flow3_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow3_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow3_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
