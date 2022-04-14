module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow13", [
    function (session, results, next) {
      session.beginDialog("Flow13_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow13_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow13_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow13_4");
    },
    function (session, results, next) {
      session.beginDialog("Flow13_5");
    },
    function (session, results, next) {
      session.beginDialog("Flow13_6");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
