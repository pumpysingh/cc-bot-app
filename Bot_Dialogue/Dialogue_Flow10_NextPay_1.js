var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow10_NextPay_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            utility.say(session, get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_1.prompt), get_questions_ssml(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_1.prompt_ssml), { intentName: 'Flow10_NextPay_1' })
                .then(function (data) {
                    setTimeout(() => {
                        session.beginDialog("ContinueButton");
                        // session.endDialog();
                    }, configtime.longMultipleMessageTimeout);
                }, function (err) {
                    console.log("error in say ", err);
                });
        },
        function (session, args) {
            session.endDialog();
        }
    ]);
}