"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const generative_ai_1 = require("@google/generative-ai");
const generative_ai_2 = require("@google/generative-ai");
require('dotenv').config();
const safetySetting = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
];
const systemPrompt = `You will generate a schedule for a person based on the information they provide. The schedule you create should be provided in the specific format: "Date, Starting Time, 
Ending Time, Name of Event". Each event should be on its own line. If the task was not requested by the user, do not create any additional event for it. We do not need events for waking up, sleeping, or free time.
Additionally, ask the user questions about important ambiguous matters before creating 
the final schedule. The date used should be based off the current date. 
Make sure to include time between every event so that the average person would be able to complete the tasks realistically. 
Ending times are necessary, even if the user does not specify one. 
All day events can end at 11:59 PM the same day. 
If the schedule may not be realistically possible, you can talk to the user about any compromises they may need to make and let them choose how to go forward with it. 
Lastly, once you have enough information needed to make a schedule, ONLY provide the schedule in the format shown above. 
Ensure that the first line says schedule and every other line is describing an event in the schedule. 
No additional comments should be included in the final schedule. Make sure to keep your responses short and sweet.
If you are given information unrelated to scheduling, kindly tell the user that you are only a scheduling and planning chatbot.
You can only schedule a maximum of 5 events for the user at once. If the events list exceeds 5, tell the user they must replace or remove one.
Below are two examples of what the user should see based on their request.


Here is example 1: 
Example Input: "I want to do three dog walks tomorrow"
Your Reply: "Sure! Can I have the name of each dog to differentiate them."
Example Input: "Tricia, Alicia, Max"
Your Reply: "What time are you free to walk your dogs? How long is each walk?"
Example Input: "I have to walk Tricia at 2pm, Alicia at 3pm, and Max at 5pm. Each walk is 30 minutes"
Your Reply: "Schedule:
7/12/2024, 2:00 PM, 2:30 AM, Tricia Dog Walk 
7/12/2024, 3:00 PM, 3:30 PM, Alicia Dog Walk
7/12/2024, 5:00 PM, 5:30 PM, Max Dog Walk"

Here is example 2:
Example Input: "Hi"
Your Reply: "Hey! What can I schedule for you?"
Example Input: "I don't know"
Your Reply: "Well, let me know when you have something in mind!"
`;
const genAI = new generative_ai_2.GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
    generationConfig: {
        temperature: 0.7
    },
    safetySettings: safetySetting,
});
const chat = model.startChat({ history: [] });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    let currentDate = new Date().toDateString();
    try {
        const result = await chat.sendMessage(message + "\nThe current date is " + currentDate);
        const response = result.response;
        res.json({ reply: response.text() });
    }
    catch (error) {
        if (error instanceof generative_ai_2.GoogleGenerativeAIResponseError) {
            console.error(error);
            res.json({ reply: "Your request has brought up an error. Please restart the app." });
        }
        else {
            console.error(error);
        }
    }
});
app.listen(3000, () => {
    console.log('Server has started successfully on port 3000');
});
// Google Calendar API
const CLIENT_ID = process.env.WEB_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://selfmaxx.firebaseapp.com/__/auth/handler');
function saveTokensToDatabase(tokens) {
    fs.writeFile('tokens.json', JSON.stringify(tokens));
}
async function retrieveExistingTokens() {
    try {
        const tokens = JSON.parse(await fs.readFile('tokens.json', 'utf8'));
        return tokens;
    }
    catch (err) {
        console.error("Error in retrieving existing tokens" + err);
        return null;
    }
}
app.post('/authCode', async (req, res) => {
    let { authCode } = req.body;
    const { tokens } = await oauth2Client.getToken(authCode);
    saveTokensToDatabase(tokens);
    res.end("Access token recieved");
});
async function getTokenFromDatabase() {
    try {
        const tokens = await retrieveExistingTokens();
        if (tokens) {
            oauth2Client.setCredentials(tokens);
        }
        else {
            console.log("No tokens available");
            return;
        }
        const isTokenExpired = !tokens.expiry_date || tokens.expiry_date < Date.now();
        if (isTokenExpired) {
            const { credentials } = await oauth2Client.refreshAccessToken();
            oauth2Client.setCredentials(credentials);
        }
    }
    catch (err) {
        console.error("Error in getting new token: " + err);
    }
}
;
function insertEvents(event) {
    const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
    try {
        calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });
    }
    catch (err) {
        console.error("Error in inserting event:" + err);
    }
}
const dateISOPrompt = `You will be provided a date, starting time, and 
ending time in this format: Month/Day/Year Hour:MinutePM Hour:MinutePM. 
The first time is the starting time and the second time is the ending time. Create two separate ISO string versions of these times along with the date. The different ISO time formats must be on different lines. Do not say anything except for the final ISO format times. Make sure that it is accurate.
You must not say anything besides the correct ISO time formats of the times 
you are provided. Do not include the timezone in the ISO format. If the input is not in the format shown above, you must ignore it.
Example:
User: "7/12/2024 2:00PM 2:30AM"
You: "2024-07-12T14:00:00
2024-07-13T02:30:00"

Example:
 User: "7/12/2024"
 You: ""
`;
const model2 = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: dateISOPrompt,
    generationConfig: {
        temperature: 0
    },
    safetySettings: safetySetting,
});
const chat2 = model2.startChat();
app.post('/googlecalendar', async (req, res) => {
    await getTokenFromDatabase();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let { message } = req.body;
    try {
        const lines = message.trim().split('\n');
        for (const line of lines) {
            if (line.toLowerCase().trim() == "schedule:") {
                continue;
            }
            const [date, startTime, endTime, name] = line.split(',').map((part) => part.trim());
            const result = await chat2.sendMessage(date + " " + startTime + " " + endTime);
            const response = result.response.text();
            const isoLines = response.trim().split('\n');
            const event = {
                'summary': name,
                'start': {
                    'dateTime': isoLines[0],
                    'timeZone': timeZone,
                },
                'end': {
                    'dateTime': isoLines[1],
                    'timeZone': timeZone,
                }
            };
            insertEvents(event);
        }
    }
    catch (err) {
        console.error(err);
    }
    res.end("Calendar action has been completed");
});
//# sourceMappingURL=index.js.map