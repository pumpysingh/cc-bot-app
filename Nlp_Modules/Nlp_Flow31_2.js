var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow31_2: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. contact nelnet campus commerce." || callbacks.message.toLowerCase().includes("contact nelnet")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "ContactNelnet";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. send comments and end chat." || callbacks.message.toLowerCase().includes("send comments")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "SendCommentEndChat";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. return to help topics." || callbacks.message.toLowerCase().includes("return")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "HelpTopics";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "ContactNelnet") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "ContactNelnet";
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "SendCommentEndChat") {
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