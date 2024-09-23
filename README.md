# SelfMaxx - Scheduling Automation App

## What Does It Do?
SelfMaxx contains a chatbot that will create entire schedules for the user based on their natural language input, and these schedules integrate with Google Calendar in a single click. 

For example, the user tells the chatbot they must walk their dog for 30 minutes in the evening and they have a birthday dinner at 9 PM. The chatbot will create a schedule based off the user's criteria and times, and the user will be able to add every event to their Google Calendar in one click.

**Achieves up to 50% faster time completion for scheduling daily tasks compared to manual scheduling methods.**

## Key Features
- Full-Stack Development: The frontend is built using React Native and Typescript while the backend is built using Node.js and Express.js.
- Secure Authentication: Firebase Google Sign-In and the OAuth2.0 authorization framework is used to allow the user to sign in the app with their Google account and access Google Calendar. This returns an authorization token which is used to directly integrate with Google Calendar.
- AI Chatbot: The chatbot is built using Google Gemini API. The chatbot is trained and personalized using prompting and system instructions. The chatbot stores conversation history, allowing for the conversation to feel more authentic and human-like.
- Google Calendar Integration: SelfMaxx offers the user the ability to easily add their schedules to their calendar. Since it is a REST API, HTTP requests are made to facilitate the requests.
- Backend Server: The backend runs on an Express server and constantly sends HTTP requests back and forth to the frontend. The 2 REST APIs, Google Gemini and Calendar, are implemented on the server.

## Installation
To download and use SelfMaxx, do the following:
1. ```git clone https://github.com/chadha19/selfmaxx.git
  cd selfmaxx```
3. 


