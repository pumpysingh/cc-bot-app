module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow17_3", [
    function (session, results, next) {
      session.beginDialog("Flow17_3_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow17_3_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow17_3_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
