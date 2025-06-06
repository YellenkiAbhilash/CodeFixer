import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CodeOptimizer.module.css";

const CodeOptimizer = () => {
  const [code, setCode] = useState("");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOptimize = async () => {
    if (!code.trim()) {
      setOptimizedCode("Error: No code provided.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/optimizer", {
        code, // Ensure this matches the backend
      });

      setOptimizedCode(response.data.optimizedCode);
    } catch (err) {
      setError("Failed to optimize code. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Code Optimizer</h1>
      <p>Enter your code, and we’ll optimize it for better performance.</p>

      {/* Code Input Box */}
      <textarea
        className={styles.codeInput}
        rows="6"
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      {/* Optimize Button */}
      <button className={styles.optimizeButton} onClick={handleOptimize} disabled={loading}>
        {loading ? "Optimizing..." : "Optimize Code"}
      </button>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Optimized Code Output Box */}
      <div className={styles.outputBox}>
    <h3>Optimized Code:</h3>
    <pre>{optimizedCode || "No optimized code yet."}</pre>
</div>
    </div>
  );
};

export default CodeOptimizer;
