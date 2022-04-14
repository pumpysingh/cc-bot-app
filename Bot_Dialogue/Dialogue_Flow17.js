module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow17", [
    function (session, results, next) {
      session.beginDialog("Flow17_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow17_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow17_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow17_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
