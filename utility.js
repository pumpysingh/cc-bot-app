var builder = require('botbuilder');
var restapicall = require('./restapicall');
var config = require('./config');
var ua = require('universal-analytics');
const uuid = require('uuidv4');


module.exports = {
    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    createRepaymentPlanSummary: function(session, data, builder, title) {
        var title = title;
        var items = [];
        var offered_plan = [];

        data.repaymentoption.forEach(function(item) {
            items.push(builder.ReceiptItem.create(session, "$" + item.totalamountpaid, item.repaymentplan + " " + item.months + " Months"))
            offered_plan.push(item.repaymentplan);
        });

        session.conversationData.filedata.userloan.offered_plan = offered_plan;

        return new builder.ReceiptCard(session)
            .title(title)
            .items(items)
    },
    setConversationDatas: function(session, keys, values,addtoReporting = false,intentName ="",optionvalue ="") {
        var keystr = "";
        var variables =[];
        for (var i = 0; i < keys.length; i++) {
            var objectkey ={
                key:keys[i],
                value:values[i]
            }
            variables.push(objectkey);
            if (keys[i].split(".").length > 0) {
                var temp = keys[i];
                var temparray = temp.split('.');
                var tempdata = session.conversationData;
                for (var j = 0; j < temparray.length - 1; j++) {
                    tempdata = tempdata[temparray[j]];
                }
                tempdata[temparray[temparray.length - 1]] = values[i];
            } else {
                session.conversationData[keys[i]] = values[i];
            }
            keystr = keystr + keys[i];
            if (i != keys.length - 1) {
                keystr = keystr + ",";
            }
        }

        if (session.conversationData["keystacks"] == undefined) {
            session.conversationData["keystacks"] = [];
        }
        var index = session.conversationData["keystacks"].indexOf(keystr);
        if (index != -1) {
            session.conversationData["keystacks"].splice(index, 1)
        }
        session.conversationData["keystacks"].push(keystr);

        if(addtoReporting === true){
            console.log("addtoreportingh ",session.message.address.conversation.id);
            if (variables.length > 0) {
                console.log("variables array ",variables);
                // restapicall.PushReportingVariable(session.message.address.conversation.id,variables)
                // .then(function(data) {
                //     console.log("Response of reporting update "+data);
                // },
                // function(err) {
                //     console.log("Error in reporting update");
                //     console.log(err);
                // })

                restapicall.PushReportingVariable(session.message.address.conversation.id,
                    variables
                    ).then(function(data) {
                    // console.log(data);
                    console.log("Response of reporting update "+data);
                },
                function(err) {
                    console.log(err);
                })

            }
        }

        try{
            // user's answer
            if(intentName && intentName != ""){
                var params ={};
                if(optionvalue && optionvalue != "")
                {
                    params = {
                        ec: "User",
                        ea: "Intent",
                        el: intentName,
                        cd4: optionvalue,
                        dl: session.conversationData.websiteurl
                    };
                }
                else{
                    params = {
                        ec: "User",
                        ea: "Intent",
                        el: intentName,
                        dl: session.conversationData.websiteurl
                    };
                }
                if(intentName == "AskUserAnnualIncome"){
                    params.cm1 = session.conversationData.annualGrossIncome;
                }
                else if(intentName == "AskUserMonthlyTotalLoanAmount" || intentName == "AskUserMonthlyTotalLoanAmount_HasOtherLoanServicer" || intentName == "AskUserMonthlyTotalLoanAmount_OnlyIBRLoanServicer"){
                    params.cm2 = session.conversationData.usermonthlytotalloanamount;
                }
                else if(intentName == "AskUserNelnetTotalBalance"){
                    params.cm3 = session.conversationData.IBRtotalloanamount;
                    params.cm5 = (Number(session.conversationData.IBRtotalloanamount) + Number(session.conversationData.nonIBRborrowerservicebalance));
                }
                else if(intentName == "AskUserNonServiceBalance"){
                    params.cm4 = session.conversationData.nonIBRborrowerservicebalance;
                }
                else if(intentName == "AskUserMaritialStatus" || intentName == "MarriedUser" || intentName == "SingleUser"){
                    if(session.conversationData.usermaritialstatus == "Single"){
                        params.cd5 = "No";
                    }
                    else{
                        params.cd5 = "Yes";
                    }
                }
                else if (intentName == "AskUserFamilySize" || intentName == "MarriedUserAskUserFamilySize" || intentName == "SingleUserAskUserFamilySize") {
                    params.cd6 = session.conversationData.familysize;
                }
                console.log("Params Object ",params);
                this.SendEvent(params,session.conversationData.uuid,session.conversationData.cid);
            }
         }
         catch(err){
             console.log("error in send event to visitor ",err);
         }
    },
    say(session, text, speak, options) {

        return new Promise(function (resolve, reject) {

            if (typeof text === 'string') {
                var temp = text;
                text = [];
                text.push(temp);
            }
            if (typeof speak === 'string') {
                var temp = speak;
                speak = [];
                speak.push(temp);
            }
            if (Array.isArray(speak) && (typeof options === 'undefined' || typeof options === 'object')) {

            } else if (typeof speak === 'object') {
                options = speak;
                speak = [];
            }

            if (speak.length == 0) {
                speak = text.concat(speak);
            }
            if (typeof options === 'undefined') {
                // options = {}
                options = { inputHint: builder.InputHint.ignoringInput }
            }
            else{
                options.inputHint= builder.InputHint.ignoringInput;
            }
            var minlength = text.length > speak.length ? speak.length : text.length;
            var i = Math.floor(Math.random() * minlength);
            
            try{
                if(options.intentName && options.intentName != ""){
                    var params = {
                        ec: "Bot",
                        ea: "Intent",
                        el: options.intentName,
                        dl: session.conversationData.websiteurl
                    };
                    var cid =session.conversationData.cid;
                    // this.SendEvent(params,session.conversationData.uuid,cid);
                    var visitor = ua(config.GoogleAnalyticsId, {
                        cid: cid,
                        uid: session.conversationData.uuid
                    });
                    if(visitor){
                        visitor.event(params).send();
                        console.log("send successfully ", params);    
                    }
                    else{
                        console.log("Visitor not defined");
                    }
                }
            }
            catch(err){
                console.log("error to send event ",err);
            }

            session.say(text[i], speak[i], options);
            // setTimeout(() => {
            resolve(session); 
            // }, 1500);
            
        });
    },
    prompt_text(builder, session, prompt, options) {
        if (typeof prompt === 'string' || Array.isArray(prompt)) {


            if (typeof prompt === 'string') {
                var temp = prompt;
                prompt = [];
                prompt.push(temp);
            }
            if (typeof options === 'undefined') {
                options = {};
                options.speak = prompt;
            }
            if (!Array.isArray(options.speak)) {
                var temp = options.speak;
                options.speak = [];
                options.speak.push(temp);
            }
            var speak = options.speak;
            var minlength = prompt.length > speak.length ? speak.length : prompt.length;
            var i = Math.floor(Math.random() * minlength);
            options.speak = speak[i];
            // try{
            //     if(options.intentName && options.intentName != ""){
            //         var params = {
            //             ec: "Bot",
            //             ea: "Intent",
            //             el: options.intentName,
            //             dl: session.conversationData.websiteurl
            //         };
            //         var cid =session.conversationData.cid;
            //         this.SendEvent(params,session.conversationData.uuid,cid);
            //     }
            // }
            // catch(err){
            //     console.log("error to send event ",err);
            // }
            try{
                if (options.isReprompt == true) {
                    var params = {
                        ec: "Bot",
                        ea: "Error",
                        el: options.intentName,
                        dl: session.conversationData.websiteurl
                    };
                    var cid =session.conversationData.cid;
                    this.SendEvent(params,session.conversationData.uuid,cid);
                }
                else{
                    if(options.intentName && options.intentName != ""){
                        var params = {
                            ec: "Bot",
                            ea: "Intent",
                            el: options.intentName,
                            dl: session.conversationData.websiteurl
                        };
                        var cid =session.conversationData.cid;
                        this.SendEvent(params,session.conversationData.uuid,cid);
                    }
                }
            }
            catch(e){
                console.log("error to send event ",err);
            }
            builder.Prompts.text(session, prompt[i], options);
        } else {
            var text = prompt.data.text;
            var speak = prompt.data.speak;

            if(Array.isArray(text) && Array.isArray(speak)){
                var minlength = text.length > speak.length ? speak.length : text.length;
                var i = Math.floor(Math.random() * minlength);
                prompt.data.text = text[i];
                prompt.data.speak = speak[i];
            }
            
            // try{
            //     if(options.intentName && options.intentName != ""){
            //         var params = {
            //             ec: "Bot",
            //             ea: "Intent",
            //             el: options.intentName,
            //             dl: session.conversationData.websiteurl
            //         };
            //         var cid =session.conversationData.cid;
            //         this.SendEvent(params,session.conversationData.uuid,cid);
            //     }
            // }
            // catch(err){
            //     console.log("error to send event ",err);
            // }
            try{
                if (options && options.isReprompt == true) {
                    var params = {
                        ec: "Bot",
                        ea: "Error",
                        el: options.intentName,
                        dl: session.conversationData.websiteurl
                    };
                    var cid =session.conversationData.cid;
                    this.SendEvent(params,session.conversationData.uuid,cid);
                }
                else{
                    if(options && options.intentName && options.intentName != ""){
                        var params = {
                            ec: "Bot",
                            ea: "Intent",
                            el: options.intentName,
                            dl: session.conversationData.websiteurl
                        };
                        var cid =session.conversationData.cid;
                        this.SendEvent(params,session.conversationData.uuid,cid);
                    }
                }
            }
            catch(e){
                console.log("error to send event ",e);
            }
            builder.Prompts.text(session, prompt, options);
        }
    },
    prompt_choice(builder, session, prompt, choice, options) {
        if (typeof prompt === 'string') {
            var temp = prompt;
            prompt = [];
            prompt.push(temp);
        }
        if (typeof options === 'undefined') {
            options = {};
            options.speak = prompt;
        }
        if (!Array.isArray(options.speak)) {
            var temp = options.speak;
            options.speak = [];
            options.speak.push(temp);
        }
        var speak = options.speak;
        var minlength = prompt.length > speak.length ? speak.length : prompt.length;
        var i = Math.floor(Math.random() * minlength);
        if(options.isReprompt == true && options.isLargePrompt == true){
            prompt[i] = prompt[i] +" Please select/type from given options.";
            // prompt[i] = prompt[i] +" Please select/type from given options. Or type 1 for the first option or 2 for the second:";
            // options.speak = speak[i] + " Please select/type from given options. Or type 1 for the first option or 2 for the second:";
            options.speak = speak[i] + " Please select/type from given options.";
        }
        // else if(options.isReprompt == true){
        //     prompt[i] = prompt[i] +" Or type 1 for the first option or 2 for the second:";
        //     options.speak = speak[i] + " Or type 1 for the first option or 2 for the second:";
        // }
        // else{
        //     prompt[i] = prompt[i] +" Type 1 for the first option or 2 for the second:";
        //     options.speak = speak[i] +" Type 1 for the first option or 2 for the second:";
        // }
        // try{
        //     if(options.intentName && options.intentName != ""){
        //         var params = {
        //             ec: "Bot",
        //             ea: "Intent",
        //             el: options.intentName,
        //             dl: session.conversationData.websiteurl
        //         };
        //         var cid =session.conversationData.cid;
        //         this.SendEvent(params,session.conversationData.uuid,cid);
        //     }
        // }
        // catch(err){
        //     console.log("error to send event ",err);
        // }
        try{
            if (options.isReprompt == true) {
                var params = {
                    ec: "Bot",
                    ea: "Error",
                    el: options.intentName,
                    dl: session.conversationData.websiteurl
                };
                var cid =session.conversationData.cid;
                this.SendEvent(params,session.conversationData.uuid,cid);
            }
            else{
                if(options.intentName && options.intentName != ""){
                    var params = {
                        ec: "Bot",
                        ea: "Intent",
                        el: options.intentName,
                        dl: session.conversationData.websiteurl
                    };
                    var cid =session.conversationData.cid;
                    this.SendEvent(params,session.conversationData.uuid,cid);
                }
            }
        }
        catch(e){
            console.log("error to send event ",err);
        }
        var prmptChoice = new builder.PromptChoice({ recognizeNumbers: true, recognizeOrdinals: false, recognizeChoices: false, defaultListStyle: builder.ListStyle.button });
        builder.Prompts.customize(3, prmptChoice);
        builder.Prompts.choice(session, prompt[i], choice, options);
    },
    createConversationDatas: function(session) {
        if(session.message.address.channelId !== "directline"){
            console.log("create conversation ",session.message.address.conversation.id);
            restapicall.createConversation(session.message.address.conversation.id
            ).then(function (data) {
                // console.log(data);
                console.log("Response of create conversation " + data);
            },function (err) {
                    console.log(err);
                });

            restapicall.createReporting(session.message.address.conversation.id,
                session.message.address.channelId,undefined
            ).then(function (data) {
                // console.log(data);
                console.log("Response of reporting create " + data);
            },function (err) {
                    console.log(err);
                });
        }
    },
    calculateTotalMarriedIncome: function(session){
        console.log("conversation data in calculateTotalMarriedIncome",session.conversationData);
        var userannulaIncome = session.conversationData.annualGrossIncome;
        var spousetaxableIncome = session.conversationData.spousetaxableincome;
        var totalmarriedincome = userannulaIncome;
        console.log("user annual income ",userannulaIncome);
        console.log("user spouse taxable income ",spousetaxableIncome);
        if(spousetaxableIncome && Number(spousetaxableIncome) > 0){
            totalmarriedincome = Number(totalmarriedincome) + Number(spousetaxableIncome);
        }
        console.log("total married income ",totalmarriedincome);
        var keys = [];
        var values = [];
        keys.push("totalmarriedincome");
        values.push(totalmarriedincome);
        this.setConversationDatas(session, keys, values,true);
    },
    ExtractDigitFromString: function (message) {
        console.log("Extract digit is calling ",message);

        var match = Number(message.match(/(\d+(?:[.]\d+)*)|(\d+(?:[.]\d+)*)\s*/gi).join(''))

        console.log("Matches amount is ",match);
        if (match) {
            return match;
        }
        else{
            return 0;
        }
    },
    CalculateIDRRepay: function (session) {
        var keys =[];
        var values = [];
        return new Promise(function (resolve, reject) {
            console.log("inside calculaterepay");
            restapicall.getcurrentYearRepayData(session).then(function (data) {
                console.log("Response of get poverty repay data " + data);
                try {
                    console.log("Total married income is ",session.conversationData.totalmarriedincome);
                    var calculatedremainingamount = session.conversationData.totalmarriedincome - session.conversationData.povertyamount;
                    var percentofremainingamountcal = 0;
                    var lowerpercentofremainingamountcal = 0;
                    console.log("calculatedremainingamount ",calculatedremainingamount);
                    // if (calculatedremainingamount > 0) {
                    percentofremainingamountcal = ((calculatedremainingamount * 0.15) / 12);
                    lowerpercentofremainingamountcal = ((calculatedremainingamount * 0.1) / 12);
                    // }
                    var IBRtotalloanamount = session.conversationData.IBRtotalloanamount;
                    var nonIBRborrowerservicebalance = session.conversationData.nonIBRborrowerservicebalance;
                    var spousetotalloanamount = session.conversationData.spousetotalloanamount;
                    var higherrangecalculation = percentofremainingamountcal * ((IBRtotalloanamount + nonIBRborrowerservicebalance) / (IBRtotalloanamount + nonIBRborrowerservicebalance + spousetotalloanamount)) * (IBRtotalloanamount / (IBRtotalloanamount + nonIBRborrowerservicebalance))
                    var lowerrangecalculation = lowerpercentofremainingamountcal * ((IBRtotalloanamount + nonIBRborrowerservicebalance) / (IBRtotalloanamount + nonIBRborrowerservicebalance + spousetotalloanamount)) * (IBRtotalloanamount / (IBRtotalloanamount + nonIBRborrowerservicebalance))
                    var totalifresult = 0;
                    var lowertotalifresult = 0;
                    if (higherrangecalculation < 0) {
                        totalifresult = 0;
                    }
                    else {
                        totalifresult = percentofremainingamountcal;
                    }
                    if (lowerrangecalculation < 0) {
                        lowertotalifresult = 0;
                    }
                    else {
                        lowertotalifresult = lowerpercentofremainingamountcal;
                    }
                    var seccalculatedamount = ((IBRtotalloanamount + nonIBRborrowerservicebalance) / (IBRtotalloanamount + nonIBRborrowerservicebalance + spousetotalloanamount));

                    var thirdcalculatedamount = (IBRtotalloanamount / (IBRtotalloanamount + nonIBRborrowerservicebalance));
                    var higherrangeamount = totalifresult * seccalculatedamount * thirdcalculatedamount;
                    var lowerrangeamount = lowertotalifresult * seccalculatedamount * thirdcalculatedamount;
                    console.log("goingt o convert");
                    console.log(new Intl.NumberFormat('en-IN').format(Math.round(higherrangeamount)));
                    console.log("Done");
                    higherrangeamount = Math.round(higherrangeamount);
                    
                    keys.push('higherrangeamount');
                    values.push(higherrangeamount);
                    // session.conversationData["higherrangeamount"] = Math.round(higherrangeamount);
                    lowerrangeamount = Math.round(lowerrangeamount);
                    keys.push('lowerrangeamount');
                    values.push(lowerrangeamount);
                    // session.conversationData["lowerrangeamount"] = Math.round(lowerrangeamount);
                    
                    var higherreducedmonthlypayment = session.conversationData.usermonthlytotalloanamount - higherrangeamount;
                    var lowerreducedmonthlypayment = session.conversationData.usermonthlytotalloanamount - lowerrangeamount;
                    
                    keys.push('higherreducedmonthlypayment');
                    values.push(higherreducedmonthlypayment);
                    // session.conversationData["higherreducedmonthlypayment"] = higherreducedmonthlypayment;

                    keys.push('lowerreducedmonthlypayment');
                    values.push(lowerreducedmonthlypayment);
                    // session.conversationData["lowerreducedmonthlypayment"] = lowerreducedmonthlypayment;
                    var keystr = "";
                    var variables = [];
                    for (var i = 0; i < keys.length; i++) {
                        var objectkey = {
                            key: keys[i],
                            value: values[i]
                        }
                        variables.push(objectkey);
                        if (keys[i].split(".").length > 0) {
                            var temp = keys[i];
                            var temparray = temp.split('.');
                            var tempdata = session.conversationData;
                            for (var j = 0; j < temparray.length - 1; j++) {
                                tempdata = tempdata[temparray[j]];
                            }
                            tempdata[temparray[temparray.length - 1]] = values[i];
                        } else {
                            session.conversationData[keys[i]] = values[i];
                        }
                        keystr = keystr + keys[i];
                        if (i != keys.length - 1) {
                            keystr = keystr + ",";
                        }
                    }

                    if (session.conversationData["keystacks"] == undefined) {
                        session.conversationData["keystacks"] = [];
                    }
                    var index = session.conversationData["keystacks"].indexOf(keystr);
                    if (index != -1) {
                        session.conversationData["keystacks"].splice(index, 1)
                    }
                    session.conversationData["keystacks"].push(keystr);

                    console.log("addtoreportingh ", session.message.address.conversation.id);
                    if (variables.length > 0) {
                        console.log("variables array ", variables);
                        restapicall.PushReportingVariable(session.message.address.conversation.id,
                            variables
                        ).then(function (data) {
                            // console.log(data);
                            console.log("Response of reporting update " + data);
                        },
                        function (err) {
                            console.log(err);
                        });
                    }
                    
                    resolve(session);
                }
                catch (err) {
                    console.log("error in calculation logic ", err);
                    reject(err);
                }
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    },
    Initializevisitor: function (session,visitor) {
        try{
            var conversationId = session.message.address.conversation.id;
            var channelId = session.message.address.channelId;
            console.log("Conversation ID ",conversationId);
            var conversationuuid = uuid.fromString(conversationId);
            console.log("Conversation UUID ",conversationuuid);
            session.conversationData.uuid = conversationuuid;
            visitor.set('cid', conversationuuid);
            visitor.set("cd1", conversationuuid);
            if(channelId == "SMS"){
                visitor.set("cd2", "SMS");
            }
            else{
                visitor.set("cd2", "Web");
            }
            visitor.set("cd3", config.ChatBotName);
            var params = {
                ec: "Chat",
                ea: "Start"
                };
            visitor.event(params).send();
            console.log("event start registered successfully");
        }
        catch(err){
            console.log("Error in Initializevisitor ",err);
        }
    },
    SendEvent: function (params,conversationuuid,cid) {
        try{
            // var conversationuuid = uuid.fromString(conversationId);
            // console.log("New Generated uuid ",conversationuuid);
            if(cid){
                var visitor = ua(config.GoogleAnalyticsId, {
                    cid: cid,
                    uid: conversationuuid
                });
                if(visitor){
                    visitor.event(params).send();
                    console.log("send successfully ", params);    
                }
                else{
                    console.log("Visitor not defined");
                }
            }
        }
        catch(err){
            console.log("Error in send Event ",err);
        }
        
    },
    EndChatEvent: function (session,isWholeFlowEnd) {
        try{
            var params = {};
            if(isWholeFlowEnd){
                params = {
                    ec: "Chat",
                    ea: "End"
                };
            }
            else{
                params = {
                    ec: "Chat",
                    ea: "End"
                };
            }
            var conversationuuid = session.conversationData.uuid;
            console.log("New Generated uuid ",conversationuuid);
            var visitor = ua(config.GoogleAnalyticsId, {
                cid: session.conversationData.cid,
                uid: conversationuuid
            });
            visitor.event(params).send();
            console.log("end chat successfully");
        }
        catch(err){
            console.log("error in end chat event ",err);
        }
    },
    GetConversation: function(session){
        restapicall.getConversation(session.message.address.conversation.id
        ).then(function (data) {
            console.log("Response of get conv " + data);
            session.conversationData.websiteurl = data.websiteURL;
            session.conversationData.userIP = data.userIP;
        }, function (err) {
            console.log(err);
        });
    },
    StoreErrorLogs: function(message,intent,conversationId){
        restapicall.ErrorLogs(intent,message,conversationId).then(function (data) {
            console.log("Response of store error logs " + data);
        }, function (err) {
            console.log(err);
        });
    },
    SendBotEventToGA: function(intentName,session){
        try{
            if(intentName && intentName != ""){
                var params = {
                    ec: "Bot",
                    ea: "Intent",
                    el: intentName,
                    dl: session.conversationData.websiteurl
                };
                var cid =session.conversationData.cid;
                var visitor = ua(config.GoogleAnalyticsId, {
                    cid: cid,
                    uid: session.conversationData.uuid
                });
                if(visitor){
                    visitor.event(params).send();
                    console.log("send successfully ",params);    
                }
                else{
                    console.log("Visitor not defined");
                }
            }
        }
        catch(err){
            console.log("error to send event ",err);
        }
    }
}