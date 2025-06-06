import React, { useState } from "react";
import { translateCode } from "../utils/api"; // Assuming translateCode handles the translation logic
import styles from "../styles/LanguageTranslator.module.css";  // Import the CSS file

const LanguageTranslator = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [translatedCode, setTranslatedCode] = useState("");

  const handleTranslate = async () => {
    if (!code.trim()) {
      alert("Please enter some code.");
      return;
    }

    try {
      const result = await translateCode(code, language);
      setTranslatedCode(result);
    } catch (error) {
      setTranslatedCode("Error: Translation failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Language Translator</h2>
      </div>

      {/* Code Input Box */}
      <div className={styles.inputContainer}>
        <textarea
          className={styles.codeInput}
          placeholder="Enter code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Language Selector */}
      <div className={styles.languageSelectContainer}>
        <select
          className={styles.languageSelect}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C++">C++</option>
          <option value="JavaScript">JavaScript</option>
          <option value="C">C</option>
        </select>
      </div>

      {/* Translate Button */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.askButton}
          onClick={handleTranslate}
        >
          Translate
        </button>
      </div>

      {/* Translated Code Output */}
      <div className={styles.outputBox}>
        <h3>Translated Code:</h3>
        <pre>{translatedCode || "No translated code yet."}</pre>
      </div>
    </div>
  );
};

export default LanguageTranslator;
