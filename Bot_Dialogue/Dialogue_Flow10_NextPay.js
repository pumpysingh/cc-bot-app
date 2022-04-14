module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow10_NextPay", [
    function (session, results, next) {
      session.beginDialog("Flow10_NextPay_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow10_NextPay_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow10_NextPay_3");
    },
    function (session, results, next) {
      session.beginDialog("Flow10_NextPay_4");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
