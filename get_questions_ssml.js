let date = require('date-and-time');
module.exports = function(session, array) {
    var newquestion = [];
    var regex = /{{([^}}]+)}}/g

    String.prototype.replaceArray = function(find, replace) {
        var replaceString = this;
        for (var i = 0; i < find.length; i++) {
            replaceString = replaceString.replace(find[i], replace[i]);
        }
        return replaceString;
    };

    for (let index = 0; index < array.length; index++) {
        var str = array[index]
        var curMatch;
        try {
            if (regex.test(str)) {
                var parameter = str.match(regex);
                var parameter_data = [];
                for (let x = 0; x < parameter.length; x++) {
                    curMatch = parameter[x].substring(2, (parameter[x].length) - 2)
                    if (session.conversationData[curMatch] != undefined) {
                        if (curMatch == "lowerrangeamount" || curMatch == "higherrangeamount" || curMatch == "lowerreducedmonthlypayment" || curMatch == "higherreducedmonthlypayment" || curMatch == "annualGrossIncome" || curMatch == "spousetaxableincome" || curMatch == "totalmarriedincome" || curMatch == "nonIBRborrowerservicebalance" || curMatch == "nonIBRprivateloantotalamount" || curMatch == "IBRtotalloanamount" || curMatch == "usermonthlytotalloanamount" || curMatch == "spousetotalloanamount" || curMatch == "totalloanamount" || curMatch == "totalstudentloanamount") {
                            var curMatchVal = session.conversationData[curMatch];
                            var formatedVal = new Intl.NumberFormat('en-IN').format(Math.round(curMatchVal));
                            parameter_data.push(parameter[x].replace(parameter[x], "$"+formatedVal));
                        }
                        else {
                            parameter_data.push(parameter[x].replace(parameter[x], session.conversationData[curMatch]));
                        }
                        // parameter_data.push(parameter[x].replace(parameter[x], session.conversationData[curMatch]));
                    } else if (session.conversationData.filedata.userloan.personalinfo[curMatch] != undefined) {
                        if (curMatch == "phone") {
                            var phone = session.conversationData.filedata.userloan.personalinfo[curMatch];
                            formatted = phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
                            parameter_data.push(parameter[x].replace(parameter[x], formatted));
                        } else {
                            parameter_data.push(parameter[x].replace(parameter[x], session.conversationData.filedata.userloan.personalinfo[curMatch]));
                        }
                    } else if (session.conversationData.filedata.userloan.loans[0][curMatch] != undefined) {
                        if (curMatch == "firstduedate" || curMatch == "nextPaymentDueDate") {
                            var d = new Date(session.conversationData.filedata.userloan.loans[0][curMatch]);
                            parameter_data.push(parameter[x].replace(parameter[x], date.format(d, 'MM/DD/YYYY')));
                        } else {
                            parameter_data.push(parameter[x].replace(parameter[x], session.conversationData.filedata.userloan.loans[0][curMatch]));
                        }
                    } else if (session.conversationData.filedata.userloan.loanfile[curMatch] != undefined) {
                        if (curMatch == "firstduedate" || curMatch == "nextPaymentDueDate" || curMatch == "lastPlanEnddate") {
                            var d = new Date(session.conversationData.filedata.userloan.loanfile[curMatch]);
                            parameter_data.push(parameter[x].replace(parameter[x], date.format(d, 'MM/DD/YYYY')));
                        } else {
                            parameter_data.push(parameter[x].replace(parameter[x], session.conversationData.filedata.userloan.loanfile[curMatch]));
                        }
                    } else if (session.conversationData.filedata[curMatch] != undefined) {
                        parameter_data.push(parameter[x].replace(parameter[x], session.conversationData.filedata[curMatch]));
                    } else if (session.conversationData.filedata.userloan.loanstatus[curMatch] != undefined) {
                        parameter_data.push(parameter[x].replace(parameter[x], session.conversationData.filedata.userloan.loanstatus[curMatch]));
                    } else {
                        parameter_data.push(parameter[x])
                    }
                }
                newquestion.push(array[index].replaceArray(parameter, parameter_data));
            } else {
                newquestion.push(array[index])
            }
        } catch (err) {
            newquestion.push(array[index])
        }
    }
    return newquestion;
}