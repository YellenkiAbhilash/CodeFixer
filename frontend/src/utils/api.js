import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const translateCode = async (code, language) => {
    try {
        const response = await axios.post(`${API_URL}/translate`, { code, language });
        return response.data.translatedCode;
    } catch (error) {
        console.error("Translation error:", error);
        return "Error translating code.";
    }
};
