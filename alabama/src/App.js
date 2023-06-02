import logo from "./Logo.png";
import "./App.css";
import { useState } from "react";

const API_KEY = "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";

// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things as if you were speaking to an applicant for Alabama Course of Study English Language Arts.",
};

function App() {
  const [questionInput, setQuestionInput] = useState("");
  const [answer, setAnswer] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    let apiQuestion = [{ role: "assistant", content: questionInput }];
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiQuestion, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setAnswer(data.choices[0].message.content);
        setQuestionInput("");
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Alabama Course of Study English Language Arts</h1>
        <h1>Q&A</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-Input">
        <form onSubmit={onSubmit}>
          <input
            className="text-box"
            type="text"
            placeholder="What do you want to know?"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <button className="button-search" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="App-Response">
        <div className="response-box">{answer}</div>
      </div>
    </div>
  );
}

export default App;
