var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow14_ExitBlock: function (callbacks) {
        if ((callbacks.message.toLowerCase() == "1. more payment plan topics." || callbacks.message.toLowerCase().includes("more pay plan")) || callbacks.message.toLowerCase().includes("payment plan")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "MorePaymentTopics";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. back to help topics." || callbacks.message.toLowerCase().includes("return back")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "HelpTopics";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. i'm all set. end chat." || callbacks.message.toLowerCase().includes("end chat")) {
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
                    if (response.queryResult.intent.displayName == "MorePaymentTopics") {
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