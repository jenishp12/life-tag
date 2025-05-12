import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./HomePage.css";
import { useLanguage } from "./pages/LanguageContext";

import Home from "./pages/Home";
import QRpage from "./pages/QRpage";
import Doctor from "./pages/doctor";
import Patient from "./pages/patient";
import Settings from "./pages/settings";

// Separate components for better organization
const NotificationPopup = ({ message }) => (
    <div className="notification-popup" role="alert" aria-live="polite">
        <span className="notification-icon" aria-hidden="true">🚨</span>
        <span className="notification-message">{message}</span>
    </div>
);

const TopBar = () => {
    const { t } = useLanguage();
    return (
        <nav className="top-bar" role="navigation" aria-label="Main navigation">
            <Link to="/" className="tab">{t('home')}</Link>
            <Link to="/qr" className="tab">{t('qrCode')}</Link>
            <Link to="/patient" className="tab">{t('patientDashboard')}</Link>
            <Link to="/doctor" className="tab">{t('doctorDashboard')}</Link>
            <Link to="/settings" className="tab">{t('settings')}</Link>
        </nav>
    );
};

const EmergencyCard = ({ onEmergencyClick }) => {
    const { t } = useLanguage();
    return (
        <div className="quick-link-card emergency-card">
            <h3>🔴 {t('emergencyAlert')}</h3>
            <p>{t('emergencyDescription')}</p>
            <button
                className="emergency-button"
                onClick={onEmergencyClick}
                aria-label={t('notifyHospital')}
            >
                <span className="emergency-icon" aria-hidden="true">🚑</span>
                {t('notifyHospital')}
            </button>
        </div>
    );
};

const HealthNotifications = ({ notifications }) => {
    const { t } = useLanguage();
    return (
        <div className="quick-link-card notification-card">
            <h3>📢 {t('healthRecommendations')}</h3>
            {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                    <p>{notification}</p>
                </div>
            ))}
        </div>
    );
};

const PatientFeedback = ({ feedback }) => {
    const { t } = useLanguage();
    return (
        <div className="quick-link-card feedback-card">
            <h3>💬 {t('patientFeedback')}</h3>
            {feedback.map((item, index) => (
                <div key={index} className="feedback-item">
                    <p>{item}</p>
                </div>
            ))}
        </div>
    );
};

const VitalsOverview = ({ vitals }) => {
    const { t } = useLanguage();
    return (
        <div className="quick-link-card vitals-card">
            <h3>⏳ {t('vitalsOverview')}</h3>
            <div className="vitals-grid">
                <div className="vital-item">
                    <span className="vital-label">{t('heartRate')}</span>
                    <span className="vital-value">{vitals.heartRate} bpm</span>
                </div>
                <div className="vital-item">
                    <span className="vital-label">{t('oxygenLevel')}</span>
                    <span className="vital-value">{vitals.oxygenLevel}%</span>
                </div>
            </div>
        </div>
    );
};

const OpenAICard = () => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to OpenAI
        setAiResponse("Based on your health data, I recommend increasing your daily water intake and taking short walks every hour to improve circulation.");
        setIsExpanded(true);
    };

    return (
        <div className="quick-link-card ai-card">
            <h3>🤖 {t('aiHealthAssistant')}</h3>
            <p>{t('aiHealthDescription')}</p>
            
            <form onSubmit={handleSubmit} className="ai-form">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={t('askAI')}
                    rows="3"
                />
                <button type="submit" className="ai-submit">
                    {t('getAIResponse')}
                </button>
            </form>

            {isExpanded && aiResponse && (
                <div className="ai-response">
                    <h4>{t('aiResponse')}</h4>
                    <p>{aiResponse}</p>
                </div>
            )}
        </div>
    );
};

const HomePage = () => {
    const { t } = useLanguage();
    const [userName, setUserName] = useState("Dr. John Doe");
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([
        "Increase your fruit intake for better digestion and energy.",
        "Consider taking melatonin 30 minutes before bed to improve sleep quality.",
        "Stay hydrated by drinking at least 8 glasses of water a day.",
        "Take a 10-minute walk after lunch to aid digestion and boost mood.",
    ]);
    const [patientFeedback, setPatientFeedback] = useState([
        "Melatonin helps me with sleep.",
        "I can breathe better while sitting than lying down in bed.",
        "My energy levels are higher after increasing my fruit intake.",
        "The 10-minute walk after lunch really helps with my digestion.",
    ]);
    const [vitalsHistory, setVitalsHistory] = useState([
        { heartRate: 72, oxygenLevel: 98 },
        { heartRate: 70, oxygenLevel: 99 },
        { heartRate: 75, oxygenLevel: 97 },
    ]);

    const location = useLocation();
    const latestVitals = vitalsHistory[vitalsHistory.length - 1];

    useEffect(() => {
        // Placeholder for future API calls
    }, []);

    const handleEmergencyClick = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className="container">
            {showNotification && (
                <NotificationPopup message={t('hospitalNotified')} />
            )}

            <TopBar />

            {location.pathname === "/" && (
                <div className="welcome-section">
                    <h1>{t('welcomeBack')}, {userName}!</h1>
                    <p className="welcome-message">
                        {t('welcomeMessage')}
                    </p>

                    <div className="quick-links">
                        <EmergencyCard onEmergencyClick={handleEmergencyClick} />
                        <HealthNotifications notifications={notifications} />
                        <PatientFeedback feedback={patientFeedback} />
                        <VitalsOverview vitals={latestVitals} />
                        <OpenAICard />
                    </div>
                </div>
            )}

            <div className="bottom-bar">
                <p className="copyright">© 2024 LifeTag. {t('allRightsReserved')}</p>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/qr" element={<QRpage />} />
                <Route path="/patient" element={<Patient />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
};

export default HomePage;
