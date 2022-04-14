module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow14_2", [
    function (session, results, next) {
      session.beginDialog("Flow14_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow14_2_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow14_2_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow14_2_4");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
