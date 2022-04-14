module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow31", [
    function (session, results, next) {
      session.beginDialog("Flow31_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow31_2");
    },
    function (session, results, next) {
      session.beginDialog("CommanOptOut");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
