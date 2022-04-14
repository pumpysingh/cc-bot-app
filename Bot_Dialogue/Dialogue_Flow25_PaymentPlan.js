module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow25_PaymentPlan", [
    function (session, results, next) {
      session.beginDialog("Flow25_PaymentPlan_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow25_PaymentPlan_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
