import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setGifUrl(null);
    try {
      const response = await axios.post("http://localhost:8000/generate", {
        prompt: prompt,
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setGifUrl(url);
    } catch (error) {
      console.error("Error generating GIF", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>AI GIF Generator Project By Sam</h1>
        <div className="Input">
        <input
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate GIF</button>
        </div>
        {loading && <div className="loader"></div>}
        {gifUrl && (
          <div>
            <h2>Generated GIF</h2>
            <img src={gifUrl} alt="Generated GIF" />
            <a href={gifUrl} download="AI_GIF.gif">Download</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
