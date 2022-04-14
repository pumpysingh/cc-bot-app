var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow7_3: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. try to recover my account using a different username or email." || callbacks.message.toLowerCase().includes("recover my account")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "TryToRecover";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. return to help topics." || callbacks.message.toLowerCase().includes("return back")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "HelpTopics";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. end chat." || callbacks.message.toLowerCase().includes("end chat")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "EndChat";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "TryToRecover") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "HelpTopics") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "HelpTopics";
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "EndChat") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "EndChat";
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