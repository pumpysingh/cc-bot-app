var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_Flow7_4_RecoverAccount: function (callbacks) {
        console.log("callbackkkkkkkkkkkkk", callbacks.message)
        if ((callbacks.message.toLowerCase() == "1. yes." || callbacks.message.toLowerCase().includes("yes")) && !callbacks.message.toLowerCase().includes("no")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "Yes";
            callbacks.match(obj);
        }
        else if (callbacks.message.toLowerCase() == "3. now my account is locked." || callbacks.message.toLowerCase().includes("account locked")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "AccountLocked";
            callbacks.match(obj);
        }
        else if ((callbacks.message.toLowerCase() == "2. no." || callbacks.message.toLowerCase().includes("no")) && !callbacks.message.toLowerCase().includes("yes")) {
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "No";
            callbacks.match(obj);
        }

        // put else if for all possible options
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "Yes") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                    else if (response.queryResult.intent.displayName == "No") {
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