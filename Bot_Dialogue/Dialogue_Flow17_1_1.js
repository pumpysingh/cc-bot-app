var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow17_1_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            utility.say(session, get_questions(session, questions.Flow17.Flow17_1.Flow17_1_1.prompt), get_questions_ssml(session, questions.Flow17.Flow17_1.Flow17_1_1.prompt_ssml), { intentName: 'Flow17_1_1' })
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