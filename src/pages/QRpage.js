import React from "react";
import { useLanguage } from "./LanguageContext";
import "./QRpage.css";

const QRpage = () => {
    const { t, language, changeLanguage } = useLanguage();

    return (
        <div className="qr-page-container">
            <h1>{t('emergencyHealthInfo')}</h1>

            <div className="qr-section">
                {/* Placeholder QR Code */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.google.com" alt="QR Code" />
            </div>

            <div className="profile-info">
                <h2>{t('basicProfile')}</h2>
                <p><strong>{t('name')}:</strong> John Doe</p>
                <p><strong>{t('age')}:</strong> 29</p>
                <p><strong>{t('bloodType')}:</strong> O+</p>
                <p><strong>{t('allergies')}:</strong> Penicillin, Nuts</p>
                <p><strong>{t('currentMedications')}:</strong> Metformin, Albuterol</p>
            </div>

            <div className="health-summary">
                <h2>{t('aiHealthSummary')} ({t(language)})</h2>
                <p>
                    {t('healthSummaryText')}
                </p>
            </div>

            <div className="buttons">
                <button className="emergency-call">📞 {t('callEmergency')}</button>

                <div className="translate-section">
                    <button onClick={() => changeLanguage('es')}>🌐 {t('translateToSpanish')}</button>
                    <button onClick={() => changeLanguage('fr')}>🌐 {t('translateToFrench')}</button>
                    <button onClick={() => changeLanguage('en')}>🌐 {t('backToEnglish')}</button>
                </div>
            </div>

            <div className="last-updated">
                {t('lastUpdated')}: April 26, 2025
            </div>
        </div>
    );
};

export default QRpage;
