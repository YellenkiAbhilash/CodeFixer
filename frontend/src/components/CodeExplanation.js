import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CodeExplanation.module.css";

const CodeExplanation = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState("");

  const handleExplain = async () => {
    if (!code.trim()) {
      setExplanation("Error: Please enter some code.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/explain", {
        code
      });

      if (response.data.explanation) {
        setExplanation(response.data.explanation);
      } else {
        setExplanation("Error: Explanation not found.");
      }
    } catch (error) {
      setExplanation("Error: Unable to fetch explanation.");
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Code Explanation</h1>
      <p>Enter your code and select a language to get an explanation.</p>

      {/* Code Input Box */}
      <textarea
        className={styles.codeInput}
        rows="6"
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      {/* Explain Button */}
      <button className={styles.explainButton} onClick={handleExplain}>
        Explain
      </button>

      {/* Explanation Output */}
      <div className={styles.outputBox}>
        <h3>Explanation:</h3>
        <pre>{explanation || "No explanation yet."}</pre>
      </div>
    </div>
  );
};

export default CodeExplanation;
