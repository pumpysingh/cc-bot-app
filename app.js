var builder = require("botbuilder");
var restify = require("restify");
var server = restify.createServer();
var config = require("./config");
//var azure = require('botbuilder-azure');
var utility = require("./utility");
var ua = require("universal-analytics");
const uuid = require("uuidv4");

//Server start
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log("%s listening to %s", server.name, server.url);
  require("events").EventEmitter.defaultMaxListeners = 0;
});
server.post("/api/messages", config.connector.listen());
//const inMemoryStorage = new builder.MemoryBotStorage();

// var azureTableClient = new azure.AzureTableClient(config.tableName, config.storageName, config.storageKey);
// var tableStorage = new azure.AzureBotStorage({ gzipData: false }, azureTableClient);

const redis = require("redis");
const { RedisBotStorage } = require("botbuilder-storage");

//Create a Redis client
const client = redis.createClient({
  host: config.RedisHost,
  prefix: "bot:state:",
  auth_pass: config.RedisPassword,
});

// Define the adapter settings
const settings = {
  ttl: {
    userData: 3600 * 24,
    conversationData: 3600 * 24,
    privateConversationData: 3600 * 24,
  },
};

const Redixadapter = new RedisBotStorage(client, settings);

// if service url is https
const HttpsAgent = require("agentkeepalive").HttpsAgent;

// for local
// const HttpsAgent = require('agentkeepalive');
const keepaliveAgent = new HttpsAgent({
  maxSockets: 160,
  maxFreeSockets: 10,
  timeout: 60000,
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const Agent = require("agentkeepalive");

const keepalivehttpAgent = new Agent({
  maxSockets: 260,
  maxFreeSockets: 10,
  timeout: 60000,
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

let wasAddUserAgent = builder.ChatConnector.prototype.addUserAgent;
builder.ChatConnector.prototype.addUserAgent = function (options) {
  const ishttps = options.url && options.url.indexOf("https");
  // console.log("Ishttps ",ishttps);
  wasAddUserAgent(options);
  if (ishttps > -1) {
    options.agent = keepaliveAgent;
  } else {
    options.agent = keepalivehttpAgent;
  }
};

var bot = new builder.UniversalBot(config.connector, [
  function (session) {
    var useripaddress = "";
    var websiteurl = "";
    var clientId = uuid.uuid();
    var usermsg = session.message.text.split("_//_");
    console.log("user msg ", usermsg);
    if (usermsg && usermsg.length > 1) {
      useripaddress = usermsg[1];
      // clientId = uuid.fromString(useripaddress);
      if (usermsg.length > 2) {
        websiteurl = usermsg[2];
      }
    }
    console.log("useripaddress ", useripaddress);
    console.log("websiteurl ", websiteurl);
    console.log("session begin ", session.message.address.conversation.id);
    utility.createConversationDatas(session);
    var conversationuuid = uuid.fromString(
      session.message.address.conversation.id
    );
    var visitor = ua(config.GoogleAnalyticsId, clientId, {
      uid: conversationuuid,
      uip: useripaddress,
      dl: websiteurl,
    });
    // var visitor = ua(config.GoogleAnalyticsId, conversationuuid);
    session.conversationData.cid = clientId;
    console.log("conversation uuid ", clientId);
    console.log("Visitor.cid ", visitor.cid);
    console.log("Conv Id ", session.conversationData.cid);
    utility.Initializevisitor(session, visitor);
    if (session.conversationData["keystacks"] == undefined) {
      session.conversationData["keystacks"] = [];
    }
    session.conversationData.conversationId =
      session.message.address.conversation.id;
    session.conversationData.servicer = config.serviceProvider;
    session.conversationData.botname = config.ChatBotName;
    session.conversationData.userip = useripaddress;
    session.conversationData.websiteurl = websiteurl;
    session.conversationData.currentYear = new Date().getFullYear();
    session.beginDialog("ChatStartTopic");
  },
  function (session) {
    // session.beginDialog("ClosingOptions");
    session.endDialog();
  },
]).set("storage", Redixadapter);

// log any bot errors into the console
bot.on("error", function (e) {
  console.log("And error ocurred in dialog ", e);
});

bot
  .dialog("optional-choice-dispatcher", function (session, args, next) {
    //Send a help message
    console.log("End Dialog without onselect acrion ", args);
    session.endDialog("Global optional-choice-dispatcher menu.");
  })
  .triggerAction({
    matches: "optional-choice-dispatcher",
    onSelectAction: (session, args, next) => {
      console.log("On select Action");
      if (
        args &&
        args.intent &&
        args.intent.entities &&
        args.intent.entities.length > 0 &&
        args.intent.entities[0] &&
        args.intent.entities[0].entity
      ) {
        console.log("args Value in optional-choice-dispatcher ", args);
        console.log(
          "args Value in optional-choice-dispatcher intent ",
          args.intent
        );
        const choiceResult = {
          response: {
            entity: args.intent.entities[0].entity,
            index: -1,
            score: 1,
          },
        };
        console.log("end Dialog with result ", choiceResult);
        session.endDialogWithResult(choiceResult);
      } else {
        console.log("else args Value in optional-choice-dispatcher ", args);
        session.endDialog();
      }
    },
  });

var myMiddleware = require("./middle_ware");
bot.use({
  botbuilder: function (session, next) {
    myMiddleware.logIncomingMessage(session, next);
  },
  send: function (event, next) {
    myMiddleware.logOutgoingMessage(event, next);
  },
});

bot.recognizer({
  recognize: function (context, done) {
    console.log("Dialogdata ", context.dialogData);
    if (
      context.dialogData &&
      context.dialogData.options &&
      context.dialogData.options.optional
    ) {
      console.log("Dialog data inside choice options ", context.message.text);
      const dialogStack = context.dialogStack();
      // be sure to only intervene when a Choice Prompt is at the top of the stack
      if (
        dialogStack &&
        dialogStack.length > 0 &&
        dialogStack[dialogStack.length - 1].id === "BotBuilder:prompt-choice"
      ) {
        console.log("Inside Dialog Stack ");
        done(null, {
          intent: "optional-choice-dispatcher", // the intent that will proceed waterfall
          score: 0.1337, // a low score, so that other recognizers may overried. E.g. LUISRecognizer. But larger than 0.1 is important
          entities: [{ type: "string", entity: context.message.text }],
        });
        return;
      }
      console.log("outside Dialog Stack ");
    }
    console.log("super outside Dialog Stack ");
    done(null, { intent: "", score: 0 }); // no intent identified
  },
});

//Imported dialog Here
require("./Bot_Dialogue/Dialogue_ChatStartTopic")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow3_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow3_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow3_3")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow4")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow5")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_ForgotUP")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_UP_Code")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_UP_Code_Yes")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_UP_End")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow5_Locked")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_Locked_Code")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_Locked_Code_Yes")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_Locked_End")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow5_Other")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow5_CPlan")(bot, builder);



require("./Bot_Dialogue/Dialogue_Flow6")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow6_Yes")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow7")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow7_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow7_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow7_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow7_4_RecoverAccount")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow8")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow8_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow8_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow9")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow9_1")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow10")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_NextPay")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_NextPay_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_NextPay_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_NextPay_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_NextPay_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_1_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_1_1_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_1_1_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_1_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_CP")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_CP_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow10_CP_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow11_Auto")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_2_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_2_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_Auto_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow11_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow13")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_3_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_3_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_3_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_5")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_5_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_5_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_5_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_5_5")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_6")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_6_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow13_6_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow14")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_2_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_2_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_2_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow14_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow15")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_1_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_1_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_1_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_2_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_2_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow15_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow16")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow16_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow16_1_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow16_1_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow16_1_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow16_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow17")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_1_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_1_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_1_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_3_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_3_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_3_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow17_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow18")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow18_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow18_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow18_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow18_2_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow18_ExitBlock")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow23_PaymentPlan")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_PaymentPlan_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_PaymentPlan_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_PaymentPlan_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_PaymentPlan_2_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow23")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_2_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow23_2_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow30")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatEndReview")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatEndReview_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatEndReview_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatEndReview_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatComment")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatComment_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_ChatComment_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow24_PaymentPlan")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_PaymentPlan_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_PaymentPlan_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_PaymentPlan_3")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow24")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow24_3")(bot, builder);


require("./Bot_Dialogue/Dialogue_Flow25_PaymentPlan")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow25_PaymentPlan_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow25_PaymentPlan_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow25")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow25_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow25_2")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow31")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_3")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow31_Login")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_Login_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_Login_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow31_Login_3")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow26")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_5")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_6")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_7")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow26_8")(bot, builder);
require("./Bot_Dialogue/Dialogue_CommanOptOut")(bot, builder);
require("./Bot_Dialogue/Dialogue_ShowContinueButton")(bot, builder);

require("./Bot_Dialogue/Dialogue_Flow32")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_1")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_2")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_3")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_4")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_5")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_6")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_7")(bot, builder);
require("./Bot_Dialogue/Dialogue_Flow32_ExitBlock")(bot, builder);