# Built a prototype of a hands-free conversational AI chat bot to create an accessible application that can be operated with speech.
**Technologies used**: Google Cloud Text-to-Speech API, React js, Python, RAG LLM

## Product Features
```
* Conversational chatbot that lets users input and receive responses in speech format.
* The responses are trained using a custom knowledge base which helps users with easy access to frequently requested information.
* The bot also helps with personalization as it provides information related to the user's account and assists the user in completing tasks that would otherwise require the user to navigate to the website or app. 
```


## Backend (Python):
```
* Set up Flask: Created a Flask application to serve as the backend.
* Integrated Google Cloud APIs: Used the google-cloud-texttospeech library to interact with the Text-to-Speech API.
* Created API endpoints: Defined API endpoints for handling text input from the frontend, converting it to speech and processing a text input’s response with custom knowledge base.
* Handled requests: Implemented the logic to handle requests received from the frontend, including converting text to speech using the Google Cloud API and processing response for user’s input from custom knowdegebase using RAG LLM (Retrieval-Augmented Generation Large Language Model).
```

## Frontend (React):
```
* Set up React app: Created a React application to serve as the frontend.
* Designed chat interface: Developed a chat interface where users can provide input through speech and hear responses.
* Sending requests to backend: Implemented functionality to send user input to the backend and receive responses.
* Handled audio playback: Implemented audio playback for responses received in audio format.
* Integrated speech recognition: Included functionality for users to speak to the chatbot using react-speech-recognition package which converts their speech to text.
```
