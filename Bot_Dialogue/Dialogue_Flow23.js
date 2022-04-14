module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow23", [
    function (session, results, next) {
      session.beginDialog("Flow23_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow23_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
