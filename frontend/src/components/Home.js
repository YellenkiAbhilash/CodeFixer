import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setResponse("Error: Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await axios.post("http://localhost:5000/ask", {
        question, 
        language
      });

      setResponse(res.data.answer || "No response received.");
    } catch (error) {
      setResponse("Error: Unable to fetch response.");
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ask a Question</h1>
      <p>Type your question and select a language to get an answer.</p>

      {/* Question Input Box */}
      <textarea
        className={styles.questionInput}
        rows="4"
        placeholder="Enter your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>

      {/* Language Selector */}
      <select
        className={styles.languageSelect}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
      </select>

      {/* Ask Button */}
      <button className={styles.askButton} onClick={handleAskQuestion} disabled={loading}>
        {loading ? "Fetching..." : "Ask"}
      </button>

      {/* Response Output Box */}
      <div className={styles.outputBox}>
        <h3>Response:</h3>
        <pre>{response || "No response yet."}</pre>
      </div>
    </div>
  );
};

export default Home;
