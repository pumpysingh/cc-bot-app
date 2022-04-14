module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow24_PaymentPlan", [
    function (session, results, next) {
      session.beginDialog("Flow24_PaymentPlan_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow24_PaymentPlan_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow24_PaymentPlan_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
