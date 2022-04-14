var https = require('https');
var Client = require('node-rest-client').Client;
var config=require('./config')
var client = new Client();
 
const HttpsAgent = require('agentkeepalive').HttpsAgent;
 
const keepaliveAgent = new HttpsAgent({
  maxSockets: 260,
  maxFreeSockets: 10,
  timeout: 60000,
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

module.exports = {

    getfiledata: function(session,response) {

        return new Promise(function(resolve, reject) {
            
            client.get(config.dbapi+"User/"+session.conversationData.phone+"/Loan", function(data, response) {
                // parsed response body as js object
                // Storing data in conversation data
                if (data && data.userloan && data.userloan.loans && data.userloan.loans.length > 0) {
                    data.userloan.personalinfo.noofloans = data.userloan.loans.length;
                    session.conversationData.filedata = data;
                    var principanamount=0;
                    var totalofloans = 0;
                    data.userloan.loans.forEach(element => {
                        principanamount=principanamount+parseInt(element.principal);
                        totalofloans = totalofloans + (parseInt(element.balance));
                    });
                    session.conversationData.filedata.totalpricipal=principanamount;
                    session.conversationData.filedata.totalofloans=totalofloans;
                    // console.log(data);
                    resolve(data);
                } else {
                    reject(data);
                }
            });

            client.on('error', function(err) {
                console.log('[GetFileData] request error : ', err);
                reject(err)
            });
        })

    },
    getfiledata_repayamount: function(session) {

        return new Promise(function(resolve, reject) {

            client.get(config.dbapi+"Loanquickpay", function(data, response) {
                // Storing data in conversation data
                if (data && data.quickpay) {
                    session.conversationData.filedata.userloan.loanfile.payin10day = data.quickpay.payin10day;
                    session.conversationData.filedata.userloan.loanfile.paynormal = data.quickpay.paynormal;
                    resolve(data);
                } else {
                    reject(data);
                }
            });

            client.on('error', function(err) {
                console.log('[GetFileDataRepayment] request error', err);
                reject(err)
            });
        })

    },
    updateconversation: function(Conversationid, ssn, conv_data) {
        return new Promise(function(resolve, reject) {

            // var args = {
            //     data: {
            //         "conversationid":Conversationid,
            //         "ssn": ssn,
            //         "conversationobject":conv_data
            //     },
            //     headers: { "Content-Type": "application/json" }
            // };

            var postData = JSON.stringify({
                "conversationid":Conversationid,
                "ssn": ssn,
                "conversationobject":conv_data
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/conversation/update',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            
            var req = https.request(options, (res) => {
                // console.log('statusCode:', res.statusCode);
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    var fbResponse = JSON.parse(body);
                    resolve(fbResponse)
                });
            });
            
            req.on('error', (e) => {
                console.log('[UpdateConversation] request error', e);
                reject(e);
            });
            
            req.write(postData);
            req.end();
            
            // client.post(config.dbapi+"conversation/update", args, function(data, response) {
            //     resolve(data)
            // });
            // client.on('error', function(err) {
            //     console.log('[UpdateConversation] request error', err);
            //     reject(err)
            // });
        })
    },
    getrepaymentplaninfo: function(repaymentplan, ssn) {
        return new Promise(function(resolve, reject) {

            var args = {
                data: {
                    "repaymentplan":repaymentplan,
                    "ssn": ssn
                },
                headers: { "Content-Type": "application/json" }
            };

            client.post(config.dbapi+"RepaymentPlan", args, function(data, response) {    
                resolve(data)
            });
            client.on('error', function(err) {
                console.log('[GetRepaymentPlanInfo] request error', err);
                reject(err)
            });
        })
    },
    storemessages: function(conversationid, text, speechtext, sender, datetime, messagecounter, channeldata, msgtype, attachments) {
        return new Promise(function(resolve, reject) {
            
            var postData = JSON.stringify({
                "conversationid": conversationid,
                "text": text,
                "speechtext": speechtext,
                "sender": sender,
                "datetime": datetime,
                "messagecounter": messagecounter,
                "channeldata": JSON.stringify(channeldata),
                "msgtype": msgtype,
                "attachments": JSON.stringify(attachments)
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/MessageData/storemessages',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            

            var req = https.request(options, (res) => {
                // console.log('statusCode:', res.statusCode);
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if(res.statusCode == 200 || res.statusCode == 201){
                        var fbResponse = JSON.parse(body);
                        resolve(fbResponse)
                    }
                    else{
                        console.log("Failed ",res.statusCode);
                        console.log("Failed ",postData);
                        reject(body);
                    }
                });

            });
            
            req.on('error', (e) => {
                console.log('[storemessages] request error', e);
                reject(e);
            });
            
            // console.log("Req data ",postData);

            req.write(postData);
            req.end();


            // var args = {
            //     data: {
            //         "conversationid":conversationid,
            //         "text": text,
            //         "speechtext":speechtext,
            //         "sender":sender,
            //         "datetime":datetime,
            //         "messagecounter":messagecounter,
            //         "channeldata":JSON.stringify(channeldata),
            //         "msgtype":msgtype,
            //         "attachments":JSON.stringify(attachments)
            //     },
            //     headers: { "Content-Type": "application/json" }
            // };
            // // console.log("DB API ",config.dbapi);
            // client.post(config.dbapi+"MessageData/storemessages", args, function(data, response) {
            //     // console.log("resolved");
            //     resolve(data)
            // });
            // client.on('error', function(err) {
            //     console.log('[MessageInsert] request error', err);
            //     reject(err)
            // });
        })
    },
    createConversation: function(conversationid) {
        return new Promise(function(resolve, reject) {
            var postData = JSON.stringify({
                "conversationId":conversationid
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/Conversation/CreateConversation',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            
            var req = https.request(options, (res) => {
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if(res.statusCode == 200 || res.statusCode == 201){
                        var fbResponse = JSON.parse(body);
                        resolve(fbResponse)
                    }
                    else{
                        console.log("Failed ",res.statusCode);
                        reject(body);
                    }
                });
            });
            
            req.on('error', (e) => {
                console.log('[MessageInsert] request error', e);
                reject(e);
            });
            
            req.write(postData);
            req.end();
        })
    },
    createReporting: function(conversationid,channelId,channeldata) {
        return new Promise(function(resolve, reject) {
            var postData = JSON.stringify({
                "conversationid":conversationid,
                "channelId":channelId,
                "channeldata":channeldata
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/Reporting/create',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            
            var req = https.request(options, (res) => {
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if(res.statusCode == 200 || res.statusCode == 201){
                        var fbResponse = JSON.parse(body);
                        resolve(fbResponse)
                    }
                    else{
                        console.log("Failed ",res.statusCode);
                        reject(body);
                    }
                });
            });
            
            req.on('error', (e) => {
                console.log('[MessageInsert] request error', e);
                reject(e);
            });
            
            req.write(postData);
            req.end();

        })
    },
    PushReportingVariable: function(conversationid,variables) {
        return new Promise(function(resolve, reject) {
            var postData = JSON.stringify({
                "conversationid":conversationid,
                "variables":variables
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/Reporting/update',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            
            var req = https.request(options, (res) => {
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if(res.statusCode == 200 || res.statusCode == 201){
                        var fbResponse = JSON.parse(body);
                        resolve(fbResponse)
                    }
                    else{
                        reject(body);
                    }
                });
            });
            
            req.on('error', (e) => {
                console.log('[MessageInsert] request error', e);
                reject(e);
            });
            
            req.write(postData);
            req.end();

        })
    },
    getcurrentYearRepayData: function(session,response) {

        return new Promise(function(resolve, reject) {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear();

            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/IBRRepay/get/'+currentYear,
                method: 'GET',
                agent: keepaliveAgent,
              };
              
              var req = https.request(options, (res) => {
                  var body = '';
                  res.on('data', (data) => {
                      body += data;
                  });
  
                  res.on('end', function () {
                      if(res.statusCode == 200 || res.statusCode == 201){
                          var data = JSON.parse(body);
                          if (data && data.IBRRepayMasterData && data.IBRRepayMasterData.length > 0) {
                            var ibrRepaydata = data.IBRRepayMasterData[0];
                            console.log("ibrRepaydata ",ibrRepaydata);
                            if (ibrRepaydata.povertystructure && ibrRepaydata.povertystructure.length > 0){
                                var keys=[];
                                var values = [];
                                var variables =[];
                                var familysizebaseddata = ibrRepaydata.povertystructure.filter(x=>x.familysize == session.conversationData.familysize);
                                console.log("after filter familysizebaseddata ",familysizebaseddata);
                                if(familysizebaseddata.length > 0){
                                    var statename = (session.conversationData.userstateresidence).toLowerCase();
                                    if(statename === "alaska"){
                                        console.log("Consider Alaska ",statename);
                                        keys.push('povertyamount');
                                        values.push(familysizebaseddata[0].alaska);
                                        var objectkey ={
                                            key:keys[0],
                                            value:values[0]
                                        }
                                        variables.push(objectkey);
                                        session.conversationData["povertyamount"] = familysizebaseddata[0].alaska;
                                    }
                                    else if(statename === "hawaii"){
                                        console.log("Consider hawaii ",statename);
                                        keys.push('povertyamount');
                                        values.push(familysizebaseddata[0].hawaii);
                                        var objectkey ={
                                            key:keys[0],
                                            value:values[0]
                                        }
                                        variables.push(objectkey);
                                        session.conversationData["povertyamount"] = familysizebaseddata[0].hawaii;
                                    }
                                    else{
                                        console.log("Consider standard ",statename);
                                        keys.push('povertyamount');
                                        values.push(familysizebaseddata[0].standard);
                                        var objectkey ={
                                            key:keys[0],
                                            value:values[0]
                                        }
                                        variables.push(objectkey);
                                        session.conversationData["povertyamount"] = familysizebaseddata[0].standard;
                                    }
    
    
                                    var postData = JSON.stringify({
                                        "conversationid":session.message.address.conversation.id,
                                        "variables":variables
                                    });
                                    
                                    var secondoptions = {
                                        hostname: config.apidomain,
                                        port: 443,
                                        path: '/api/Reporting/update',
                                        method: 'POST',
                                        headers: {
                                            "Content-Type": "application/json",
                                            'Content-Length': postData.length
                                        },
                                        agent: keepaliveAgent,
                                    };
                                    
                                    var req = https.request(secondoptions, (res) => {
                                        // console.log('statusCode:', res.statusCode);
                                        var body = '';
                                        res.on('data', (data) => {
                                            body += data;
                                        });
                        
                                        res.on('end', function () {
                                            if(res.statusCode == 200 || res.statusCode == 201){
                                                var fbResponse = JSON.parse(body);
                                                resolve(fbResponse)
                                            }
                                            else{
                                                console.log("Failed ",res.statusCode);
                                                reject(body);
                                            }
                                        });
                                    });
                                    
                                    req.on('error', (e) => {
                                        console.log('[MessageInsert] request error');
                                        reject(e);
                                    });
                                    
                                    req.write(postData);
                                    req.end();
    
                                    console.log(familysizebaseddata);
                                    resolve(familysizebaseddata);
                                }
                                else{
                                    reject(data);
                                }
                            }
                            else{
                                reject(data);
                            }
                           
                        } else {
                            reject(data);
                        }
                      }
                      else{
                          console.log("Failed ",res.statusCode);
                          reject(body);
                      }
                  });
              });
              
              req.on('error', (e) => {
                  console.log('[MessageInsert] request error', e);
                  reject(e);
              });
              
              req.end();

        })

    },
    getConversation: function(convid, response){
        return new Promise(function (resolve, reject) {
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/Conversation/'+convid,
                method: 'GET',
                agent: keepaliveAgent,
              };
            var req = https.request(options, (res) => {
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if (res.statusCode == 200 || res.statusCode == 201) {
                        var data = JSON.parse(body);
                        if (data) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                    else {
                        console.log("Failed ", res.statusCode);
                        reject(body);
                    }
                });
            });

            req.on('error', (e) => {
                console.log('[Get Conversation] request error', e);
                reject(e);
            });

            req.end();
        });
    },
    ErrorLogs: function(intentName,message,conversationId) {
        return new Promise(function(resolve, reject) {
            
            var postData = JSON.stringify({
                "intent_name": intentName,
                "error_message": message,
                "conversationid":conversationId
            });
            
            var options = {
                hostname: config.apidomain,
                port: 443,
                path: '/api/ErrorLogs/create',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Content-Length': postData.length
                },
                agent: keepaliveAgent,
            };
            

            var req = https.request(options, (res) => {
                // console.log('statusCode:', res.statusCode);
                var body = '';
                res.on('data', (data) => {
                    body += data;
                });

                res.on('end', function () {
                    if(res.statusCode == 200 || res.statusCode == 201){
                        var fbResponse = JSON.parse(body);
                        resolve(fbResponse)
                    }
                    else{
                        console.log("Failed ",res.statusCode);
                        console.log("Failed ",req.data);
                        reject(body);
                    }
                });

            });
            
            req.on('error', (e) => {
                console.log('[storeerrorlogs] request error', e);
                reject(e);
            });
            
            req.write(postData);
            req.end();
        })
    }
}