// lifetag/src/pages/patientsummary.js
import React, { useState } from "react";
import "./patientsummary.css";

const PatientSummary = () => {
    const [language, setLanguage] = useState("English");

    const handleTranslate = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="patient-summary-container">
            <h1>Patient Health Summary</h1>

            <div className="patient-info">
                <h2>Basic Information</h2>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Age:</strong> 29</p>
                <p><strong>Blood Type:</strong> O+</p>
                <p><strong>Allergies:</strong> Penicillin, Nuts</p>
                <p><strong>Current Medications:</strong> Metformin, Albuterol</p>
            </div>

            <div className="health-summary">
                <h2>AI-Generated Health Summary ({language})</h2>
                <p>
                    Patient has a history of mild asthma and Type 2 diabetes. 
                    No recent hospitalizations. Allergic to penicillin and nuts. 
                    Carries an inhaler for emergencies.
                </p>
            </div>

            <div className="vitals-section">
                <h2>Latest Vitals</h2>
                <div className="vitals-grid">
                    <div className="vital-card">
                        <h3>Heart Rate</h3>
                        <p>72 BPM</p>
                    </div>
                    <div className="vital-card">
                        <h3>Blood Pressure</h3>
                        <p>120/80 mmHg</p>
                    </div>
                    <div className="vital-card">
                        <h3>Oxygen Level</h3>
                        <p>98%</p>
                    </div>
                    <div className="vital-card">
                        <h3>Temperature</h3>
                        <p>98.6°F</p>
                    </div>
                </div>
            </div>

            <div className="medical-history">
                <h2>Medical History</h2>
                <ul>
                    <li>Type 2 Diabetes (Diagnosed 2020)</li>
                    <li>Asthma (Diagnosed 2018)</li>
                    <li>Seasonal Allergies</li>
                </ul>
            </div>

            <div className="buttons">
                <button className="emergency-call">📞 Call Emergency Contact</button>

                <div className="translate-section">
                    <button onClick={() => handleTranslate("Spanish")}>🌐 Translate to Spanish</button>
                    <button onClick={() => handleTranslate("French")}>🌐 Translate to French</button>
                    <button onClick={() => handleTranslate("English")}>🌐 Back to English</button>
                </div>
            </div>

            <div className="last-updated">
                Last Updated: {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default PatientSummary;