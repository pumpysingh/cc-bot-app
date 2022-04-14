var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow5: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. i don't know my username or password." || callbacks.message.toLowerCase().includes("username or password")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "ForgotUP";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. my account is locked." || callbacks.message.toLowerCase().includes("account locked")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "AccountLocked";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. i don't have a current plan." || callbacks.message.toLowerCase().includes("current plan")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "CurrentPlan";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "4. other logging-in problems." || callbacks.message.toLowerCase().includes("other problems")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "OtherLoggingInProblems";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "ForgotUP") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "AccountLocked") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "CurrentPlan") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "OtherLoggingInProblems") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    // put else if for all possible options
                    else {
                        callbacks.repromptquestion(response);
                    }
                },
                function (error) {
                    console.log("Error In API AI Request" + error);
                    if (error.details.includes('exceeds 256 characters')) {
                        callbacks.tooLargeMessage(error);
                    }
                    else {
                        callbacks.repromptquestion(error);
                    }
                })
        }
    }
}