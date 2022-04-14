var app = require("./Api_Ai_Request");

module.exports = {
    Get_Nlp_AskToUserToChooseFlow5_Other: function (callbacks) {
        if (callbacks.message.toLowerCase() == "1. yes" || callbacks.message.toLowerCase().includes("yes")) {
            console.log("Matched............. ");
            var obj = {};
            obj.result = {};
            obj.result.parameters = {};
            obj.result.metadata = {};
            obj.result.metadata.intentName = "YES";
            callbacks.match(obj);
        }
        else {
            app.sendToapiai(callbacks.session, callbacks.message,
                function (response) {
                    if (response.queryResult.intent.displayName == "YES") {
                        var obj = {};
                        obj.result = {};
                        obj.result.parameters = {};
                        obj.result.metadata = {};
                        obj.result.metadata.intentName = response.queryResult.intent.displayName;
                        callbacks.match(obj);
                    }
                },
                function (error) {
                    console.log("Error In API AI Request" + error)
                })
        }
    }
}