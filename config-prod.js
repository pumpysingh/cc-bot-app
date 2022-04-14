var builder = require('botbuilder');

var Deployment_Environment = process.env.Deployment_Environment ? process.env.Deployment_Environment : "stag"
var config = {};
if (Deployment_Environment === "stage") {
    console.log("Inside Stage")
    config = {

        // apiaitoken:'ffc062b4559d4d8885a01b7fa5961a2f',
        // clienturl:'https://prestosolvo.sculptsoftdemo.in/',
        dbapi: 'https://cche-api.azurewebsites.net/api',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Sloan',
        tableName: "ManageSession",
        storageName: "nelnetbotstorage",
        storageKey: "idE0BdnN4CKjGpgLnybXDN9RVbVQn+wFZOrPqKM/K6+8vvacLHE0hq8YfdR0OgTYd5uWEGr2kfg23z+hwldrTA==",
        projectId: 'nelnet-sgkc',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLzwSqwSw5qV1p\ngN2Hzw98x4Fa84bYEFL1AOn9nR5GSsWb4BrUZArwGWC+wu8no6J5yiufzTXg8IBo\n8KjacDiYGbuBcG11J1OPDRRVMhKerRveyISv+VRYW+v+26jvo46VEVWfB4ejrDJ8\nxxCIZ/lPwo3jQ4juNIVxff7OixiostPwDhXJz8GcJ5RJFP7koQk32xKXOsxw9gMG\nuxXLc1+PfSfqzNRHO8Yb5qLlQsDH8LmGqxqgp7ZusZs4KP7YAv+L8QBsAJpFIM5N\nB+j/RuPvb2OkHiYZ1G86pcVgJsFXdtKAVas+m2lMaE7d6sdsv+2LTO7fao4ociU0\nJrEogRdxAgMBAAECggEADPRq/cabHsws756dFjubZqlQx9z4aoX5G/Ezrmb9DGdG\n0c5oLi1ww4u9akq+RGUCmB65cKYs4VAwPVtkxEPDWSmzkTn5/yshhNOGQhcVd2gW\nAC57PqtIyPgI03GXdqoND10jdeEW5li0+dj2bFE9l+wMNFCv5MJKZCkn1+2gAuME\nCb34a+bs4Pu6d8PZn3/a32GWKb4rLRdBYLCAYu7S8MDD3EKnE2G+0nPZ4Ir471TU\nSkcn3W0d7p5KW/Tbx8aJqKykXSKZQcxE8e/4NtS+9Q7Tw6siU3eO+MQDbVNoW9sQ\nLwP+stSxiUJpsVwMwSlXjiBb+oLiuo3jUH5P+p+n8QKBgQDpP6WuyDfNYtnkphn3\nBmLsaAaGG0ae7an+gvJIsFSsdOyS8H2Xw/39h5Q519SEQSfiZ+FWZsYh4yqP3MRL\nWoh/jlrigq9hP3cIX79kDgyobXuh0lCxfJat0N1wbw2yCngJo5YVNEGSFnjVnMoc\n0mLvxhVdNMRMXgOKKn3PLyraOQKBgQDfsD0BkdWa990+l+JRZCLGClI370QuDM2r\nz11AvBmPiGZ6tG+h6Kp/ZDViUIBCULBvkILe/9rUPhUYdk/eg8X4CteEMvi8fi/x\nJZCIlI7aAiBx2nlHp55dPUqGTIE6PZcv2oJ89nZFZlVOGOgfRl2fjHhRt4Bm+Uxu\nH1xAemGG+QKBgQCxAjszLAClHjpred5EiBU0gTFKPpLWc1hJrIg/v4lSox0R2e4F\n6Zfr+iLzzqYZg/THrbvlPPNpriKTsJ9K7DagTqEMOs7rhyVHNpphTQQwIX3sbVYN\ni5Yx7ErQU4baMXWtIvb3uoN0YRdsTKNZQhQREIsQA8Zgigw3o018mLf1iQKBgQCQ\nnn3ivOmQRn4pEMOGgaolxdiAR1YaO7bhRLDywGn6LWKsJGokEKviruQAyzERLt/T\nUWf7SwmsvPKgnSVoJGPiyQerddTw8NiIHRRD6WAuPL/DPE+67vjpKU48Y8wM3nMX\nwjspFaNDnTS7yEiSp8ix9Xx4wJ3odXdfnzDikvzo6QKBgQDVbuVsMeKPDqN3bPqn\nJfXbkQOeghkfPVy3appX8t0v4lNklOZtH4cbP2ZyfzOEtcqHPP+svbE5qpd1uC9i\nug4xO+DtRKz9A0TyJ8oRvvubaIbfW4kusgLAmzd51xI8RcSJfzn1pfSrosnOFE5u\nqxgKGmtzVt6RhzLmGM15yMf0Ng==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'dialogflow-dxmxnw@nelnet-sgkc.iam.gserviceaccount.com',
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-179614966-3",
        RedisHost: "factsccbotredis.redis.cache.windows.net",
        RedisPassword: "jcYOvIXVvmfQPg6KYUy+7jv1cf66BSaAarbN83DEc54="
    }
}
else if (Deployment_Environment === "prod") {
    config = {

        // apiaitoken:'d5ab481575d24064b0c5ddd08f953fbc',
        // clienturl:'https://prestosolvo-bot.herokuapp.com/',
        dbapi: 'https://cche-api.azurewebsites.net/api/',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Sloan',
        tableName: "ManageSession",
        storageName: "prestosolvobotb391",
        storageKey: "7cfgJxh4q45xon5EW9p2IQ21z1Uhr8zrcZO8lYE2/cFmpq4Yc3AZzF8oFHw7WT3xMIHBA5HhFaKVUxdbERrMrQ==",
        projectId: 'nelnet-sgkc',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLzwSqwSw5qV1p\ngN2Hzw98x4Fa84bYEFL1AOn9nR5GSsWb4BrUZArwGWC+wu8no6J5yiufzTXg8IBo\n8KjacDiYGbuBcG11J1OPDRRVMhKerRveyISv+VRYW+v+26jvo46VEVWfB4ejrDJ8\nxxCIZ/lPwo3jQ4juNIVxff7OixiostPwDhXJz8GcJ5RJFP7koQk32xKXOsxw9gMG\nuxXLc1+PfSfqzNRHO8Yb5qLlQsDH8LmGqxqgp7ZusZs4KP7YAv+L8QBsAJpFIM5N\nB+j/RuPvb2OkHiYZ1G86pcVgJsFXdtKAVas+m2lMaE7d6sdsv+2LTO7fao4ociU0\nJrEogRdxAgMBAAECggEADPRq/cabHsws756dFjubZqlQx9z4aoX5G/Ezrmb9DGdG\n0c5oLi1ww4u9akq+RGUCmB65cKYs4VAwPVtkxEPDWSmzkTn5/yshhNOGQhcVd2gW\nAC57PqtIyPgI03GXdqoND10jdeEW5li0+dj2bFE9l+wMNFCv5MJKZCkn1+2gAuME\nCb34a+bs4Pu6d8PZn3/a32GWKb4rLRdBYLCAYu7S8MDD3EKnE2G+0nPZ4Ir471TU\nSkcn3W0d7p5KW/Tbx8aJqKykXSKZQcxE8e/4NtS+9Q7Tw6siU3eO+MQDbVNoW9sQ\nLwP+stSxiUJpsVwMwSlXjiBb+oLiuo3jUH5P+p+n8QKBgQDpP6WuyDfNYtnkphn3\nBmLsaAaGG0ae7an+gvJIsFSsdOyS8H2Xw/39h5Q519SEQSfiZ+FWZsYh4yqP3MRL\nWoh/jlrigq9hP3cIX79kDgyobXuh0lCxfJat0N1wbw2yCngJo5YVNEGSFnjVnMoc\n0mLvxhVdNMRMXgOKKn3PLyraOQKBgQDfsD0BkdWa990+l+JRZCLGClI370QuDM2r\nz11AvBmPiGZ6tG+h6Kp/ZDViUIBCULBvkILe/9rUPhUYdk/eg8X4CteEMvi8fi/x\nJZCIlI7aAiBx2nlHp55dPUqGTIE6PZcv2oJ89nZFZlVOGOgfRl2fjHhRt4Bm+Uxu\nH1xAemGG+QKBgQCxAjszLAClHjpred5EiBU0gTFKPpLWc1hJrIg/v4lSox0R2e4F\n6Zfr+iLzzqYZg/THrbvlPPNpriKTsJ9K7DagTqEMOs7rhyVHNpphTQQwIX3sbVYN\ni5Yx7ErQU4baMXWtIvb3uoN0YRdsTKNZQhQREIsQA8Zgigw3o018mLf1iQKBgQCQ\nnn3ivOmQRn4pEMOGgaolxdiAR1YaO7bhRLDywGn6LWKsJGokEKviruQAyzERLt/T\nUWf7SwmsvPKgnSVoJGPiyQerddTw8NiIHRRD6WAuPL/DPE+67vjpKU48Y8wM3nMX\nwjspFaNDnTS7yEiSp8ix9Xx4wJ3odXdfnzDikvzo6QKBgQDVbuVsMeKPDqN3bPqn\nJfXbkQOeghkfPVy3appX8t0v4lNklOZtH4cbP2ZyfzOEtcqHPP+svbE5qpd1uC9i\nug4xO+DtRKz9A0TyJ8oRvvubaIbfW4kusgLAmzd51xI8RcSJfzn1pfSrosnOFE5u\nqxgKGmtzVt6RhzLmGM15yMf0Ng==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'dialogflow-dxmxnw@nelnet-sgkc.iam.gserviceaccount.com',
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-179614966-3",
        RedisHost: "factsccbotredis.redis.cache.windows.net",
        RedisPassword: "jcYOvIXVvmfQPg6KYUy+7jv1cf66BSaAarbN83DEc54="
    }
}
else {
    console.log("Inside Else")
    config = {

        // apiaitoken:'ffc062b4559d4d8885a01b7fa5961a2f',
        // clienturl:'https://prestosolvo.sculptsoftdemo.in/',
        dbapi: 'https://cche-api.azurewebsites.net/api/',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Sloan',
        tableName: "ManageSession",
        storageName: "nelnetbotstorage",
        storageKey: "idE0BdnN4CKjGpgLnybXDN9RVbVQn+wFZOrPqKM/K6+8vvacLHE0hq8YfdR0OgTYd5uWEGr2kfg23z+hwldrTA==",
        projectId: 'nelnet-sgkc',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLzwSqwSw5qV1p\ngN2Hzw98x4Fa84bYEFL1AOn9nR5GSsWb4BrUZArwGWC+wu8no6J5yiufzTXg8IBo\n8KjacDiYGbuBcG11J1OPDRRVMhKerRveyISv+VRYW+v+26jvo46VEVWfB4ejrDJ8\nxxCIZ/lPwo3jQ4juNIVxff7OixiostPwDhXJz8GcJ5RJFP7koQk32xKXOsxw9gMG\nuxXLc1+PfSfqzNRHO8Yb5qLlQsDH8LmGqxqgp7ZusZs4KP7YAv+L8QBsAJpFIM5N\nB+j/RuPvb2OkHiYZ1G86pcVgJsFXdtKAVas+m2lMaE7d6sdsv+2LTO7fao4ociU0\nJrEogRdxAgMBAAECggEADPRq/cabHsws756dFjubZqlQx9z4aoX5G/Ezrmb9DGdG\n0c5oLi1ww4u9akq+RGUCmB65cKYs4VAwPVtkxEPDWSmzkTn5/yshhNOGQhcVd2gW\nAC57PqtIyPgI03GXdqoND10jdeEW5li0+dj2bFE9l+wMNFCv5MJKZCkn1+2gAuME\nCb34a+bs4Pu6d8PZn3/a32GWKb4rLRdBYLCAYu7S8MDD3EKnE2G+0nPZ4Ir471TU\nSkcn3W0d7p5KW/Tbx8aJqKykXSKZQcxE8e/4NtS+9Q7Tw6siU3eO+MQDbVNoW9sQ\nLwP+stSxiUJpsVwMwSlXjiBb+oLiuo3jUH5P+p+n8QKBgQDpP6WuyDfNYtnkphn3\nBmLsaAaGG0ae7an+gvJIsFSsdOyS8H2Xw/39h5Q519SEQSfiZ+FWZsYh4yqP3MRL\nWoh/jlrigq9hP3cIX79kDgyobXuh0lCxfJat0N1wbw2yCngJo5YVNEGSFnjVnMoc\n0mLvxhVdNMRMXgOKKn3PLyraOQKBgQDfsD0BkdWa990+l+JRZCLGClI370QuDM2r\nz11AvBmPiGZ6tG+h6Kp/ZDViUIBCULBvkILe/9rUPhUYdk/eg8X4CteEMvi8fi/x\nJZCIlI7aAiBx2nlHp55dPUqGTIE6PZcv2oJ89nZFZlVOGOgfRl2fjHhRt4Bm+Uxu\nH1xAemGG+QKBgQCxAjszLAClHjpred5EiBU0gTFKPpLWc1hJrIg/v4lSox0R2e4F\n6Zfr+iLzzqYZg/THrbvlPPNpriKTsJ9K7DagTqEMOs7rhyVHNpphTQQwIX3sbVYN\ni5Yx7ErQU4baMXWtIvb3uoN0YRdsTKNZQhQREIsQA8Zgigw3o018mLf1iQKBgQCQ\nnn3ivOmQRn4pEMOGgaolxdiAR1YaO7bhRLDywGn6LWKsJGokEKviruQAyzERLt/T\nUWf7SwmsvPKgnSVoJGPiyQerddTw8NiIHRRD6WAuPL/DPE+67vjpKU48Y8wM3nMX\nwjspFaNDnTS7yEiSp8ix9Xx4wJ3odXdfnzDikvzo6QKBgQDVbuVsMeKPDqN3bPqn\nJfXbkQOeghkfPVy3appX8t0v4lNklOZtH4cbP2ZyfzOEtcqHPP+svbE5qpd1uC9i\nug4xO+DtRKz9A0TyJ8oRvvubaIbfW4kusgLAmzd51xI8RcSJfzn1pfSrosnOFE5u\nqxgKGmtzVt6RhzLmGM15yMf0Ng==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'dialogflow-dxmxnw@nelnet-sgkc.iam.gserviceaccount.com',
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-179614966-3",
        RedisHost: "factsccbotredis.redis.cache.windows.net",
        RedisPassword: "jcYOvIXVvmfQPg6KYUy+7jv1cf66BSaAarbN83DEc54="
    }
}

const exportconfig = config;
module.exports = exportconfig;