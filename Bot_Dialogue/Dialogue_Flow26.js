module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow26", [
    function (session, results, next) {
      session.beginDialog("Flow26_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_4");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_5");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_6");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_7");
    },
    function (session, results, next) {
      session.beginDialog("Flow26_8");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
