## Building a Youtube summarizer using Gemini
Developed a summarizer using Gemini which accepts a youtube video and summarizes the content in 250 words
**Technologies used:** Gemini GPT model, React js, Python Flask
 

## Demo
Here is a demo of how the summarizer works


https://github.com/user-attachments/assets/dae05af3-96e6-4820-8a1b-65f16eccf62b



## Product Features
<pre>
* <b>Youtube Video URL input:</b> The input is a youtube video URL.
* <b>Quick consumable summary:</b> The generated summary is within 250 words.
* <b>Formatted summary:</b> The response is displayed with text formatting and bullet points.
</pre>


## Backend (Python):
```
* Set up Flask: Created a Flask application to serve as the backend.
* Integrated gemini-pro LLM: Used the gemini-pro LLM(Large Language Model) to train the model to generate summarized response
* Created API endpoints and handled requests: Defined API endpoints for handling text input from the frontend, processing the response and implemented logic to handle the requests received from the frontend.
```

## Frontend (React):
```
* Set up React app: Created a React application to serve as the frontend.
* Designed a simple interface: Developed a simple UI interface where users can provide youtube URL input and view responses.
* Sending requests to backend: Implemented functionality to send user input to the backend and receive responses.
```
