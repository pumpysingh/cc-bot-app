module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow23_2", [
    function (session, results, next) {
      session.beginDialog("Flow23_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow23_2_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
