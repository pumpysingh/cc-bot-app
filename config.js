var builder = require('botbuilder');

var Deployment_Environment = process.env.Deployment_Environment ? process.env.Deployment_Environment : "stag"
var config = {};

if (Deployment_Environment === "stage") {
    console.log("Inside Stage")
    config = {

      //  apiaitoken: 'ffc062b4559d4d8885a01b7fa5961a2f',
        //clienturl: 'https://testbotnelnetfe.azurewebsites.net',
        dbapi: 'https://cche-api.azurewebsites.net/api',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Bailey',
        tableName: "ManageSession",
        projectId: "prod-facts-dhj9",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD0b/OMjAgzgXOS\nEiKKcybgJqsViGJD59iUdUs97WfL8AZpj6tdiRwDYmBK5hXSRgxi4fO0eOMyr6Hl\ndubFxXNIR4SD10V7SsGBn5oJm27F2IeCqsQJvpWCea7U7EoWeA+LLRUCQP0/Jrpz\nkgt7opO4eruAlNARTNQ3bUAEWiaBOWWglQzWyytfCKWjuw2p8k6fLfIJGSj30mVS\nCMAzMVt/uItwlp1b3RlsxRsYRQEmyDCkM9P3TXiRd1jWlfm3vzFRlKM+hjqL2KL8\nfKus6W5dARreeuHZhQaaeAwdUFRWVlJ9paF5MrHZsSQNH8aFc5AU7UitZgriYHlY\nW/kaRZbNAgMBAAECggEAGP4Urq38rVjS5RWx7r+tCGXRFVUKCGZoCG82amu1Mq66\ngR2S8xqF649UnXk0CaQRjSS22HY0c2YYzWT1szVSlF/Xm+wCqy4EELRYZBtpMpUb\n7zogQYd5MvYtGuaEAWh03RFBdicInbs10i5AZVDvU1adMvLu6UNBPt+OmENSxOB9\n14FT2GQt0XhL0xsJW0Q723/b7GDv0pWj3nvm7twIVXJFF6s6SjkVgm+Jtb6wUlYV\nJRpbpy7dj4f1KuX5hYSP0a+A0JzMP+aiIzb10G+CldRoSGvexlHtD+c5P/YJeCD4\nMlox/oCnhpIdYsZxWlNnoo/Us0vFQ4qOzpe74syTcwKBgQD7G/guPTLfLRicnVAD\nwlWryvw3NcpUTnSFZRhLf63q//SnViGO01U+SRoQ2guWdYHjY1lHFwSOHi6lkSTs\nb4I+hKjtfI213gf4gbOzGQ6PULmHFSoOc+gEoNnshsTBnYm1REK+TrH3/t5fD2Ep\no7nljDXE3Wm8aBP8kCSpy+l0owKBgQD5MrcxCuuejsG6FHAgrpUPfeh9KT9MpB1z\nktzNj4HdnhHlatiEQU3Dle9hu4z5IsoRnAcmeXukRe2z+IZVre86bITr66QRGOfs\nqVbpR9+e27jrIlUAa3AqtrEs0Zq0ZH3GEj5rw5M1mjIPDeLTVOHJ1llepcvn6bpo\nHt/V8VwNzwKBgCbdElEduaTe1uNOWZbrWdUHyndFBPZ9Wf1XQyZUMXege532b6Uq\nQhQsvjMDfC2iLCMkOioNfu/77d5EE4HgVDkW0QpIb6pJHdSxRj2e0CkQJlaoyOSJ\nvcwRlQjNZuBMYIbEdMv9Y//s2z+9Ip2OMHQ9egjo97doKEe7i2EYJR6fAoGBALwy\nNvNMwgDu4xN61+t2rZATkH7lpa5lyvA7m5GKrZMHC5DtDjNjdi0dkLmIgMCuK1j9\nMtE1sdCwFwJx0FHol+DRj9j0DuXyn0S15rMq2pEIczDwrq0wdndrnYaxjVprAimS\nIZ4VB5nVp7SC0iiz1AkwXjICmGm+tE5p8rWKH/E1AoGANsOagwIEYUb5r+90VzLw\nHmnRtRldswgqKM4NO0Jt2ZBN4lfLsr7c8Y1+41+gBkGUWlAnSAzYOT7HuqOGh7Po\n9jwhc1pisSxmEzgxHzPYpgYwlT4XqNJ5GXA1GGea0Qwkxv+A5BLPzUEO1WUKLc+n\ncPDlmXHtUV0T/7ZkIuQ6PMk=\n-----END PRIVATE KEY-----\n",
        clientEmail: "prod-facts-dialogflow@prod-facts-dhj9.iam.gserviceaccount.com",
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-197024723-4",
        RedisHost: "prod-cchebotredis.redis.cache.windows.net",
        RedisPassword: "Gv7UYUBrkoUSktcsyAea9qxHjEhEO+cTZ8rMq1ShT68="
    }
}
else if (Deployment_Environment === "prod") {
    config = {

      //  apiaitoken: 'd5ab481575d24064b0c5ddd08f953fbc',
      //  clienturl: 'https://testbotnelnetfe.azurewebsites.net',
        dbapi: 'https://cche-api.azurewebsites.net/api/',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Bailey',
        tableName: "ManageSession",
        projectId: "prod-facts-dhj9",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD0b/OMjAgzgXOS\nEiKKcybgJqsViGJD59iUdUs97WfL8AZpj6tdiRwDYmBK5hXSRgxi4fO0eOMyr6Hl\ndubFxXNIR4SD10V7SsGBn5oJm27F2IeCqsQJvpWCea7U7EoWeA+LLRUCQP0/Jrpz\nkgt7opO4eruAlNARTNQ3bUAEWiaBOWWglQzWyytfCKWjuw2p8k6fLfIJGSj30mVS\nCMAzMVt/uItwlp1b3RlsxRsYRQEmyDCkM9P3TXiRd1jWlfm3vzFRlKM+hjqL2KL8\nfKus6W5dARreeuHZhQaaeAwdUFRWVlJ9paF5MrHZsSQNH8aFc5AU7UitZgriYHlY\nW/kaRZbNAgMBAAECggEAGP4Urq38rVjS5RWx7r+tCGXRFVUKCGZoCG82amu1Mq66\ngR2S8xqF649UnXk0CaQRjSS22HY0c2YYzWT1szVSlF/Xm+wCqy4EELRYZBtpMpUb\n7zogQYd5MvYtGuaEAWh03RFBdicInbs10i5AZVDvU1adMvLu6UNBPt+OmENSxOB9\n14FT2GQt0XhL0xsJW0Q723/b7GDv0pWj3nvm7twIVXJFF6s6SjkVgm+Jtb6wUlYV\nJRpbpy7dj4f1KuX5hYSP0a+A0JzMP+aiIzb10G+CldRoSGvexlHtD+c5P/YJeCD4\nMlox/oCnhpIdYsZxWlNnoo/Us0vFQ4qOzpe74syTcwKBgQD7G/guPTLfLRicnVAD\nwlWryvw3NcpUTnSFZRhLf63q//SnViGO01U+SRoQ2guWdYHjY1lHFwSOHi6lkSTs\nb4I+hKjtfI213gf4gbOzGQ6PULmHFSoOc+gEoNnshsTBnYm1REK+TrH3/t5fD2Ep\no7nljDXE3Wm8aBP8kCSpy+l0owKBgQD5MrcxCuuejsG6FHAgrpUPfeh9KT9MpB1z\nktzNj4HdnhHlatiEQU3Dle9hu4z5IsoRnAcmeXukRe2z+IZVre86bITr66QRGOfs\nqVbpR9+e27jrIlUAa3AqtrEs0Zq0ZH3GEj5rw5M1mjIPDeLTVOHJ1llepcvn6bpo\nHt/V8VwNzwKBgCbdElEduaTe1uNOWZbrWdUHyndFBPZ9Wf1XQyZUMXege532b6Uq\nQhQsvjMDfC2iLCMkOioNfu/77d5EE4HgVDkW0QpIb6pJHdSxRj2e0CkQJlaoyOSJ\nvcwRlQjNZuBMYIbEdMv9Y//s2z+9Ip2OMHQ9egjo97doKEe7i2EYJR6fAoGBALwy\nNvNMwgDu4xN61+t2rZATkH7lpa5lyvA7m5GKrZMHC5DtDjNjdi0dkLmIgMCuK1j9\nMtE1sdCwFwJx0FHol+DRj9j0DuXyn0S15rMq2pEIczDwrq0wdndrnYaxjVprAimS\nIZ4VB5nVp7SC0iiz1AkwXjICmGm+tE5p8rWKH/E1AoGANsOagwIEYUb5r+90VzLw\nHmnRtRldswgqKM4NO0Jt2ZBN4lfLsr7c8Y1+41+gBkGUWlAnSAzYOT7HuqOGh7Po\n9jwhc1pisSxmEzgxHzPYpgYwlT4XqNJ5GXA1GGea0Qwkxv+A5BLPzUEO1WUKLc+n\ncPDlmXHtUV0T/7ZkIuQ6PMk=\n-----END PRIVATE KEY-----\n",
        clientEmail: "prod-facts-dialogflow@prod-facts-dhj9.iam.gserviceaccount.com",
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-197024723-4",
        RedisHost: "prod-cchebotredis.redis.cache.windows.net",
        RedisPassword: "Gv7UYUBrkoUSktcsyAea9qxHjEhEO+cTZ8rMq1ShT68="
    }
}
else {
    console.log("Inside Else")
    config = {

     //   apiaitoken: 'ffc062b4559d4d8885a01b7fa5961a2f',
      //  clienturl: 'https://testbotnelnetfe.azurewebsites.net/',
        dbapi: 'https://cche-api.azurewebsites.net/api/',
        apidomain: 'cche-api.azurewebsites.net',
        connector: new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            openIdMetadata: process.env.BotOpenIdMetadata
        }),
        serviceProvider: 'Nelnet',
        ChatBotName: 'Bailey',
        tableName: "ManageSession",
        projectId: "prod-facts-dhj9",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD0b/OMjAgzgXOS\nEiKKcybgJqsViGJD59iUdUs97WfL8AZpj6tdiRwDYmBK5hXSRgxi4fO0eOMyr6Hl\ndubFxXNIR4SD10V7SsGBn5oJm27F2IeCqsQJvpWCea7U7EoWeA+LLRUCQP0/Jrpz\nkgt7opO4eruAlNARTNQ3bUAEWiaBOWWglQzWyytfCKWjuw2p8k6fLfIJGSj30mVS\nCMAzMVt/uItwlp1b3RlsxRsYRQEmyDCkM9P3TXiRd1jWlfm3vzFRlKM+hjqL2KL8\nfKus6W5dARreeuHZhQaaeAwdUFRWVlJ9paF5MrHZsSQNH8aFc5AU7UitZgriYHlY\nW/kaRZbNAgMBAAECggEAGP4Urq38rVjS5RWx7r+tCGXRFVUKCGZoCG82amu1Mq66\ngR2S8xqF649UnXk0CaQRjSS22HY0c2YYzWT1szVSlF/Xm+wCqy4EELRYZBtpMpUb\n7zogQYd5MvYtGuaEAWh03RFBdicInbs10i5AZVDvU1adMvLu6UNBPt+OmENSxOB9\n14FT2GQt0XhL0xsJW0Q723/b7GDv0pWj3nvm7twIVXJFF6s6SjkVgm+Jtb6wUlYV\nJRpbpy7dj4f1KuX5hYSP0a+A0JzMP+aiIzb10G+CldRoSGvexlHtD+c5P/YJeCD4\nMlox/oCnhpIdYsZxWlNnoo/Us0vFQ4qOzpe74syTcwKBgQD7G/guPTLfLRicnVAD\nwlWryvw3NcpUTnSFZRhLf63q//SnViGO01U+SRoQ2guWdYHjY1lHFwSOHi6lkSTs\nb4I+hKjtfI213gf4gbOzGQ6PULmHFSoOc+gEoNnshsTBnYm1REK+TrH3/t5fD2Ep\no7nljDXE3Wm8aBP8kCSpy+l0owKBgQD5MrcxCuuejsG6FHAgrpUPfeh9KT9MpB1z\nktzNj4HdnhHlatiEQU3Dle9hu4z5IsoRnAcmeXukRe2z+IZVre86bITr66QRGOfs\nqVbpR9+e27jrIlUAa3AqtrEs0Zq0ZH3GEj5rw5M1mjIPDeLTVOHJ1llepcvn6bpo\nHt/V8VwNzwKBgCbdElEduaTe1uNOWZbrWdUHyndFBPZ9Wf1XQyZUMXege532b6Uq\nQhQsvjMDfC2iLCMkOioNfu/77d5EE4HgVDkW0QpIb6pJHdSxRj2e0CkQJlaoyOSJ\nvcwRlQjNZuBMYIbEdMv9Y//s2z+9Ip2OMHQ9egjo97doKEe7i2EYJR6fAoGBALwy\nNvNMwgDu4xN61+t2rZATkH7lpa5lyvA7m5GKrZMHC5DtDjNjdi0dkLmIgMCuK1j9\nMtE1sdCwFwJx0FHol+DRj9j0DuXyn0S15rMq2pEIczDwrq0wdndrnYaxjVprAimS\nIZ4VB5nVp7SC0iiz1AkwXjICmGm+tE5p8rWKH/E1AoGANsOagwIEYUb5r+90VzLw\nHmnRtRldswgqKM4NO0Jt2ZBN4lfLsr7c8Y1+41+gBkGUWlAnSAzYOT7HuqOGh7Po\n9jwhc1pisSxmEzgxHzPYpgYwlT4XqNJ5GXA1GGea0Qwkxv+A5BLPzUEO1WUKLc+n\ncPDlmXHtUV0T/7ZkIuQ6PMk=\n-----END PRIVATE KEY-----\n",
        clientEmail: "prod-facts-dialogflow@prod-facts-dhj9.iam.gserviceaccount.com",
        longMultipleMessageTimeout: 3000,
        MultipleMessageTimeout: 10000,
        GoogleAnalyticsId: "UA-197024723-4",
        RedisHost: "prod-cchebotredis.redis.cache.windows.net",
        RedisPassword: "Gv7UYUBrkoUSktcsyAea9qxHjEhEO+cTZ8rMq1ShT68="
    }
}

const exportconfig = config;

module.exports = exportconfig;