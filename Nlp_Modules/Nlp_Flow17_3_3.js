var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow17_3_3: function (callbacks) {
        console.log("callbackscallbacks", callbacks.message);
        if (callbacks.message.toLowerCase() == "1. contact nelnet." || callbacks.message.toLowerCase().includes("contact")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "ContactNelnet";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. continue." || callbacks.message.toLowerCase().includes("continue")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "Continue";
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
                    else if (response.queryResult.intent.displayName == "Continue") {
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