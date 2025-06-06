import React, { useState } from "react";
import styles from "../styles/ErrorFinder.module.css";

const ErrorFixer = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindErrors = async () => {
    if (!code.trim()) {
      setErrors("Error: No code provided.");
      return;
    }

    setLoading(true);
    setErrors(""); // Reset errors box
    try {
      const response = await fetch("http://localhost:5000/errorfinder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      if (response.ok) {
        // Only set corrected code here
        setErrors(data.correctedCode || "No updates available.");
      } else {
        setErrors(data.error || "Failed to analyze code.");
      }
    } catch (error) {
      setErrors("Server error: Unable to connect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Error Fixer</h1>
      <p>Enter your code, select a language to fix errors.</p>

      {/* Code Input Box */}
      <textarea
        className={styles.codeInput}
        rows="6"
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
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

      {/* Find fixing Button */}
      <button className={styles.findErrorsButton} onClick={handleFindErrors} disabled={loading}>
        {loading ? "Fixing Errors..." : "Fix Errors"}
      </button>

      {/* Error Output Box */}
      <div className={styles.outputBox}>
        <h3>Fixed code:</h3>
        <pre>{errors || "No errors detected yet."}</pre>
      </div>
    </div>
  );
};

export default ErrorFixer;
