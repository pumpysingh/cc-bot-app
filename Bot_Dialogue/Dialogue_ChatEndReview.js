module.exports = function (bot, builder) {
  var restapicall = require("../restapicall");
  var utility = require("../utility");

  bot.dialog("ChatEndReview", [
    function (session, results, next) {
      session.beginDialog("ChatEndReview_1");
    },
    function (session, results, next) {
      session.beginDialog("ChatEndReview_2");
    },
    function (session, results, next) {
      session.beginDialog("ChatEndReview_3");
    },
    function (session, results, next) {
      session.endDialog();
    },
  ]);
};
