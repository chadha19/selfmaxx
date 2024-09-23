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
1. Clone the repository and open it.
  ```bash
   git clone https://github.com/chadha19/selfmaxx.git
   cd selfmaxx
   ```
2. Navigate to backend directory.
  ```bash
  cd genkit
  ```
3. Set up environment variables for Google Gemini API, Web Client ID, and Client Secret. The Web Client ID and Client Secret must be found on Google Cloud Platform in the project directory. These allow application to access user's data from Google servers.
  ```bash
    export API_KEY='your_api_key'
    export WEB_CLIENT_ID='your-client-id'
    export CLIENT_SECRET='your-secret-key'
  ```
4. Run the backend Express server
```bash
node ./lib/index.js
```
At this point, it should state that the server has been successfully started on port 3000.
5. Navigate back to frontend
  ```bash
  cd ../
  ```
6. Set up the WEB_CLIENT_ID environment variable to the same value as backend.
  ```bash
    export WEB_CLIENT_ID='your-client-id'
  ```
7. Run on Android emulator using:
  ```bash
    npm run android
  ```
  The Android emulator runs on http://10.0.2.2:3000.

## Contributions
Contributions are always welcome! Feel free to submit an issue or open a pull request to help improve the project. Thanks!
