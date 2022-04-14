module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow7", [
    function (session, results, next) {
      session.beginDialog("Flow7_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow7_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow7_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
