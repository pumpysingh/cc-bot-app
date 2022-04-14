var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow2: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. help logging in." || callbacks.message.toLowerCase().includes("logging in")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "TopicLoggingIn";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. questions about my payment plan." || callbacks.message.toLowerCase().includes("payment plan")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "TopicPaymentPlan";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. how to contact nelnet." || callbacks.message.toLowerCase().includes("contact nelnet")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "ContactNelnet";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "4. help with something else." || callbacks.message.toLowerCase().includes("something else")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "SomethingElse";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "TopicLoggingIn") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "TopicPaymentPlan") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "ContactFacts") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "ContactNelnet";
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "SomethingElse") {
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