var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow14_2_2', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            utility.say(session, get_questions(session, questions.Flow14.Flow14_2.Flow14_2_2.prompt), get_questions_ssml(session, questions.Flow14.Flow14_2.Flow14_2_2.prompt_ssml), { intentName: 'Flow14_2_2' })
                .then(function (data) {
                    setTimeout(() => {
                        session.endDialog();
                    }, configtime.longMultipleMessageTimeout);
                }, function (err) {
                    console.log("error in say ", err);
                });
        }
    ]);
}