module.exports = function (bot, builder) {
    var restapicall = require('../restapicall');
    var utility = require('../utility');
    var questions = require('../questions');
    var get_questions = require('../get_questions');
    var get_questions_ssml = require('../get_questions_ssml');
    var configtime = require('../config');

    bot.dialog('Flow5_ForgotUP', [
        function (session, args, next) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            utility.say(session, get_questions(session, questions.Flow5.Flow5_ForgotUP.Flow5_ForgotUP_1.prompt),
                    get_questions_ssml(session, questions.Flow5.Flow5_ForgotUP.Flow5_ForgotUP_1.prompt_ssml),
                    { intentName: "Flow5_ForgotUP_1" }
                )
                .then( function (data) {
                        setTimeout(() => {
                            next();
                        }, configtime.longMultipleMessageTimeout);
                    },
                    function (err) {
                        console.log("error in say ", err);
                    }
                );
        },
        function (session, args, next) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "buttonwithlink",
                        link: "https://login.nelnet.net/recover/request?companyname=FACTS&InstKey=",
                        Text: "Click here to recover your account"
                    },
                    directline: {
                        type: "buttonwithlink",
                        link: "https://login.nelnet.net/recover/request?companyname=FACTS&InstKey=",
                        Text: "Click here to recover your account"
                    }
                })
                .text(get_questions(session, questions.Flow5.Flow5_ForgotUP.Flow5_ForgotUP_2.prompt))
                .speak(get_questions_ssml(session, questions.Flow5.Flow5_ForgotUP.Flow5_ForgotUP_2.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow5_ForgotUP_2', session);
            setTimeout(() => {
                session.beginDialog('Flow5_UP_Code');
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}


