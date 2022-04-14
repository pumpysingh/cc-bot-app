module.exports = {
    eligibilityofDelay_Deferance : function(convData){
        var result = {"notpayinterest" : false , "unemployment_def_request" : false , "economichardship_def_request" : false , "military_def_request" : false,"inschool_def_request" : false, "parentPLUSborrower_def_request" : false, "graduatefellowship_def_request" : false ,"rehabilitation_def_request" : false} 
        //Eligible for not paying interest during deferment period
        var loantype = [
            "Direct Loan Subsidized",
            "Federal Direct Subsidized Stafford", 
            "Federal Perkins Loans",
            "Federal Direct Consolidations Loans" //Subsidized Portion
        ]

        var Eligible_User_loan = []
        convData.filedata.userloan.loans.forEach(element => {
            if (loantype.indexOf(element.loantype) != -1){
                Eligible_User_loan.push(element.loantype);               
            }
        });

        //Eligible for unemployment deferment request
        var currentemployment = ["Unemployed",
            "Unable to find full-time employment"
        ]
        
        if (currentemployment.indexOf(convData.useroutreach.designation) != -1) {
            result.unemployment_def_request = true;
            return result.unemployment_def_request;
        }

        //Eligible for economic hardship deferment request
        var hardship = ["Economic hardship"]
        var currentemployment_1 = ["In Peace Corps"]
        if(currentemployment_1.indexOf(convData.useroutreach.designation) != -1 && hardship.indexOf(convData.useroutreach.hardshipcondition) != -1){
            result.economichardship_def_request = true;
            console.log("Return Economic hardship");
            return result.economichardship_def_request;
        }

        //Eligible for Military Service and Post-active Duty student deferment request
        var currentemployment_2 = ["In Military"]
        if(currentemployment_2.indexOf(convData.useroutreach.designation) != -1){
            if(convData.useroutreach.designation_military == "yes"){
                result.military_def_request = true;
                return result.military_def_request;
            }else{
                result.military_def_request = false;
            }
        }
        return result;
        //Eligible for In-School deferment request

        //Eligible for parentPLUS borrower deferment request

        //Graduate fellowship deferment request
    },
    eligibilityofIncome_repaymentplans : function(convData){

    },
    eligibilityofIncomerepayment_PAYE: function(convData){
        var result = {
            "type":"repayment",
            "subtype" : "pay as you earn repayment plan",
            "loanidentity":[]
        };

        var loantype = ["Direct Loan Subsidized",
        "Direct Loan Unsubdized",
        "Direct Consolidation Loan", // consolidation loans do not include Direct or FFEL Loans made before October 1, 2007
        "Direct Grad PLUS"];

        convData.filedata.userloan.loans.forEach(element =>{
            ////IF loan is eligible for PAYE repayment plan
            if (loantype.indexOf(element.loantype) != -1){
                var loandate = new Date(element.loandate)
                var date = new Date('1998-10-07')
                var disbursment_date = new Date('2011-10-01')
                //If user is new borrower
                if(date <= loandate){      
                    //If user has received first disbursment of loan after 2011-10-01
                    if(date <= disbursment_date){
                        result.loanidentity.push(element.loanidentity)
                    }
                }
            }

            
        })

        return result;

    },
    eligibilityofextended_repayment : function(convData){
        result = {
            "type":"repayment",
            "subtype" : "extended repayment plan",
            "loanidentity":[]
        } 
        var loantype = ["Direct Loan Subsidized",
                        "Direct Loan Unsubsidized",
                        "FFEL Consolidation Loan",
                        "FFEL PLUS Loans",
                        "Unsubsidized Federal Stafford Loan",
                        "Subsidized Federal Stafford Loan",
                        "Direct Consolidation Loan",
                        "Direct Grad PLUS"];

        var total_outstanding_of_directloans = 0;
        var total_outstanding_of_ffelloans = 0;

        convData.filedata.userloan.loans.forEach(element =>{
            //IF loan is eligible for extended repayment plan
            if (loantype.indexOf(element.loantype) != -1){
                var loandate = new Date(element.loandate)
                var date = new Date('1998-10-07')
                if(date <= loandate){      
                    if(element.loantype.indexOf("Direct") != -1){      
                        total_outstanding_of_directloans += element.balance
                    }else if(element.loantype.indexOf("FFEL") != -1 || element.loantype.indexOf("Federal") != -1){ 
                        total_outstanding_of_ffelloans += element.balance
                    }
                }
            }
        })
        //IF Total Outstanding Balance of Direct Loans >= 30000 
        //then 
        //User is eligible for "extended repayment plan" for all Direct loans
        if(total_outstanding_of_directloans >= 30000){
            convData.filedata.userloan.loans.forEach(element =>{
                //IF loan is eligible for extended repayment plan
                if (loantype.indexOf(element.loantype) != -1){
                    if(element.loantype.indexOf("Direct") != -1){
                        result.loanidentity.push(element.loanidentity)
                    }
                }
            })
        }
        //IF Total Outstanding Balance of FFEL Loans >= 30000 
        //then 
        //User is eligible for "extended repayment plan" for all FFEL loans
        if(total_outstanding_of_ffelloans >= 30000){
            convData.filedata.userloan.loans.forEach(element =>{
                //IF loan is eligible for extended repayment plan
                if (loantype.indexOf(element.loantype) != -1){
                    if(element.indexOf("FFEL") != -1 || element.indexOf("Federal") != -1){
                        result.loanidentity.push(element.loanidentity)
                    }
                }
            })
        }

        return result;
    },
    eligibilityofstandard_repayment : function(convData){
        var loantype = ["Federal Direct Subsidized Stafford",
            "Direct Loan Subsidized",
            "Direct Loan Unsubdized",
            "Direct Grad PLUS",
            "Direct Consolidations Loans",
            "Federal Direct Unsubsidized Stafford",
            "Federal Direct PLUS Loans",
            "Federal Direct Consolidations Loans"
        ],
        result = {
            "type":"repayment",
            "subtype" : "standard repayment plan",
            "loanidentity":[]
            
        };
        
        convData.filedata.userloan.loans.forEach(element => {
            if (loantype.indexOf(element.loantype) != -1){
                result.loanidentity.push(element.loanidentity);               
            }
        });
        
        return result;
    },

    // PSLF LOGIC COMPLETED
    eligibilityofPSLF: function(convData) {
        var loantype = ["Federal Direct Subsidized Stafford",
            "Direct Loan Subsidized",
            "Direct Loan Unsubdized",
            "Direct PLUS Loans",
            "Direct Consolidations Loans",
            "Federal Direct Unsubsidized Stafford",
            "Federal Direct PLUS Loans",
            "Federal Direct Consolidations Loans"
        ];

        var currentemployment = [
            "In non-profit organization",
            "In federal and state government",
            "In AmeriCorps",
            "In Peace Corps",
            "In Military"
        ]

        var employmenttype = ["Full time",
            "Part time greater than 30 hours per week"
        ]

        convData.filedata.userloan.loans.forEach(element => {
            if (loantype.indexOf(element.loantype) == -1){
                return false;
            }
        });

        if (currentemployment.indexOf(convData.useroutreach.designation) == -1) {
            return false;
        }

        if (employmenttype.indexOf(convData.useroutreach.employmenttype) == -1) {
            return false;
        }

        return true;
    }
}