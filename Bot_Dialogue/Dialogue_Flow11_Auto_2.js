module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("Flow11_Auto_2", [
    function (session, results, next) {
      session.beginDialog("Flow11_Auto_2_1");
    },
    function (session, results, next) {
      session.beginDialog("Flow11_Auto_2_2");
    },
    function (session, results, next) {
      session.beginDialog("Flow11_Auto_2_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
