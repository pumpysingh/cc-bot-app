var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow13_5_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type1: "wordunderline",
                        text: "cannot"
                    },
                    directline: {
                        type1: "wordunderline",
                        text: "cannot"
                    }
                })
                .text(get_questions(session, questions.Flow13.Flow13_5.Flow13_5_1.prompt))
                .speak(get_questions_ssml(session, questions.Flow13.Flow13_5.Flow13_5_1.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow13_5_1', session);
            setTimeout(() => {
                session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}