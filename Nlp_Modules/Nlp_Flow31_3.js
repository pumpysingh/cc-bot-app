var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow31_3: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. submit." || callbacks.message.toLowerCase().includes("submit")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "Submit";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "2. cancel." || callbacks.message.toLowerCase().includes("cancel")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "Cancel";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "Submit") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "Cancel") {
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