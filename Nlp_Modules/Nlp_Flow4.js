var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow4: function (callbacks) {
        if ((callbacks.message.toLowerCase() == "1. yes, return to help topics." || callbacks.message.toLowerCase().includes("yes return")) && !callbacks.message.toLowerCase().includes("no")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "YesReturn";
            callbacks.match(obj);
        }
        else if ((callbacks.message.toLowerCase() == "2. no, end chat." || callbacks.message.toLowerCase().includes("no end")) && !callbacks.message.toLowerCase().includes("yes")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "NoEnd";
            callbacks.match(obj);
        }
        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "YESRETURN" || response.queryResult.intent.displayName == "YES") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "YesReturn";
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "NoEnd" || response.queryResult.intent.displayName == "NO") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = "NoEnd";
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