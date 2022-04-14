module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow32", [
    function (session, results, next) {
      session.beginDialog("Flow32_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_4");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_5");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_6");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_7");
    },
    function (session, results, next) {
      session.beginDialog("Flow32_ExitBlock");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
