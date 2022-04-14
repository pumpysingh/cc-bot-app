module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow23_PaymentPlan_2", [
    function (session, results, next) {
      session.beginDialog("Flow23_PaymentPlan_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow23_PaymentPlan_2_2");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
