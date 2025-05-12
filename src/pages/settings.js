// /pages/Settings.js
import axios from 'axios';
import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./settings.css";

const API_URL = 'http://localhost:5001/api';

const Settings = () => {
    const { t, language, changeLanguage } = useLanguage();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showWearableModal, setShowWearableModal] = useState(false);
    const [selectedWearable, setSelectedWearable] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState({
        username: 'Demo User',
        email: 'demo@example.com',
        otpEnabled: false,
        phoneNumber: '',
        wearableDevice: 'none'
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // OTP setup state
    const [otpData, setOtpData] = useState({
        phoneNumber: '',
        otpCode: ''
    });

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleOtpChange = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate passwords
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setError(t('passwordTooShort'));
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/users/change-password`,
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccess(t('passwordUpdated'));
            setShowPasswordModal(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setError(error.response?.data?.error || t('errorUpdatingPassword'));
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/users/setup-otp`,
                {
                    phoneNumber: otpData.phoneNumber,
                    otpCode: otpData.otpCode
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccess(t('otpSetupSuccess'));
            setShowOtpModal(false);
            setOtpData({
                phoneNumber: '',
                otpCode: ''
            });
            // Update user data
            const userResponse = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(userResponse.data);
        } catch (error) {
            setError(error.response?.data?.error || t('errorSettingUpOtp'));
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setSuccess(t('loginSuccess'));
            setShowLoginModal(false);
            setLoginData({
                email: '',
                password: ''
            });
        } catch (error) {
            setError(error.response?.data?.error || t('errorLoggingIn'));
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (signupData.password !== signupData.confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }
        if (signupData.password.length < 8) {
            setError(t('passwordTooShort'));
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/users/register`, {
                username: signupData.username,
                email: signupData.email,
                password: signupData.password
            });
            setSuccess(t('registrationSuccess'));
            setShowSignupModal(false);
            setSignupData({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            setError(error.response?.data?.error || t('errorRegistering'));
        }
    };

    const handleWearableConnect = (type) => {
        setSelectedWearable(type);
        setShowWearableModal(true);
    };

    const handleWearableSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/users/connect-wearable`,
                {
                    type: selectedWearable
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccess(t('wearableConnected'));
            setShowWearableModal(false);
            // Update user data
            const userResponse = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(userResponse.data);
        } catch (error) {
            setError(error.response?.data?.error || t('errorConnectingWearable'));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleExportPDF = async () => {
        try {
            setSuccess('Generating your health profile...');

            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            
            // Create a PDF-like document
            const content = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Health Profile</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 40px;
                            line-height: 1.6;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            border-bottom: 2px solid #333;
                            padding-bottom: 20px;
                        }
                        .section {
                            margin-bottom: 25px;
                        }
                        .section h2 {
                            color: #2c3e50;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 10px;
                        }
                        .info-item {
                            margin: 10px 0;
                        }
                        .footer {
                            margin-top: 40px;
                            text-align: center;
                            font-size: 0.9em;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Health Profile Report</h1>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                    </div>

                    <div class="section">
                        <h2>Personal Information</h2>
                        <div class="info-item"><strong>Name:</strong> ${userData.username || 'Not provided'}</div>
                        <div class="info-item"><strong>Email:</strong> ${userData.email || 'Not provided'}</div>
                    </div>

                    <div class="section">
                        <h2>Health Metrics</h2>
                        <div class="info-item"><strong>Heart Rate:</strong> 72 bpm (Normal)</div>
                        <div class="info-item"><strong>Oxygen Level:</strong> 98%</div>
                        <div class="info-item"><strong>Blood Pressure:</strong> 120/80</div>
                    </div>

                    <div class="section">
                        <h2>Medical History</h2>
                        <div class="info-item"><strong>Allergies:</strong> Penicillin</div>
                        <div class="info-item"><strong>Conditions:</strong> Asthma</div>
                        <div class="info-item"><strong>Medications:</strong> Inhaler</div>
                    </div>

                    <div class="section">
                        <h2>Recent Activity</h2>
                        <div class="info-item">• Last check-up: ${new Date().toLocaleDateString()}</div>
                        <div class="info-item">• Medication adherence: 95%</div>
                        <div class="info-item">• Exercise routine: Regular</div>
                    </div>

                    <div class="footer">
                        <p>This is a computer-generated report. Please consult your healthcare provider for medical advice.</p>
                        <p>© 2024 LifeTag Health System</p>
                    </div>
                </body>
                </html>
            `;

            // Create a blob from the HTML content
            const blob = new Blob([content], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            
            // Set the file name with current date
            const date = new Date().toISOString().split('T')[0];
            link.setAttribute('download', `health-profile-${date}.html`);
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
            setSuccess('Health profile downloaded successfully');
        } catch (error) {
            console.error('Error generating health profile:', error);
            setError('Error generating health profile. Please try again.');
        }
    };

    return (
        <div className="settings-page">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <h1>{t('settings')}</h1>

            <div className="settings-grid">
                {/* Manage Login Credentials */}
                <section className="settings-section credentials">
                    <h2>{t('manageCredentials')}</h2>
                    <button onClick={() => setShowSignupModal(true)}>
                        {t('signup')}
                    </button>
                    <button onClick={() => setShowLoginModal(true)}>
                        {t('login')}
                    </button>
                    <button onClick={() => setShowPasswordModal(true)}>
                        {t('changePassword')}
                    </button>
                    <button onClick={() => setShowOtpModal(true)}>
                        {t('setupOtp')}
                    </button>
                    {user?.otpEnabled && (
                        <p className="info-text">
                            {t('otpEnabled')}: {user.phoneNumber}
                        </p>
                    )}
                </section>

                {/* Connect Wearable Device */}
                <section className="settings-section wearable">
                    <h2>{t('connectWearable')}</h2>
                    <button onClick={() => handleWearableConnect('apple')}>
                        {t('connectApple')}
                    </button>
                    <button onClick={() => handleWearableConnect('fitbit')}>
                        {t('connectFitbit')}
                    </button>
                    {user?.wearableDevice && user.wearableDevice !== 'none' && (
                        <p className="info-text">
                            {t('connectedTo')}: {user.wearableDevice}
                        </p>
                    )}
                </section>

                {/* Language Preferences */}
                <section className="settings-section language">
                    <h2>{t('languagePreferences')}</h2>
                    <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                    </select>
                </section>

                {/* Export Health Profile */}
                <section className="settings-section export">
                    <h2>{t('exportHealthProfile')}</h2>
                    <button onClick={handleExportPDF}>{t('downloadPdf')}</button>
                </section>

                {/* Logout */}
                <section className="settings-section logout">
                    <h2>{t('logout')}</h2>
                    <button className="logout-btn" onClick={handleLogout}>
                        {t('logout')}
                    </button>
                </section>
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h2>{t('login')}</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder={t('email')}
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder={t('password')}
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">{t('login')}</button>
                                <button type="button" onClick={() => setShowLoginModal(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h2>{t('changePassword')}</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder={t('currentPassword')}
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                            <input
                                type="password"
                                name="newPassword"
                                placeholder={t('newPassword')}
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                                minLength="8"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder={t('confirmPassword')}
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">{t('save')}</button>
                                <button type="button" onClick={() => setShowPasswordModal(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* OTP Setup Modal */}
            {showOtpModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h2>{t('setupOtp')}</h2>
                        <form onSubmit={handleOtpSubmit}>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder={t('phoneNumber')}
                                value={otpData.phoneNumber}
                                onChange={handleOtpChange}
                                required
                            />
                            <input
                                type="text"
                                name="otpCode"
                                placeholder={t('otpCode')}
                                value={otpData.otpCode}
                                onChange={handleOtpChange}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">{t('save')}</button>
                                <button type="button" onClick={() => setShowOtpModal(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Wearable Connection Modal */}
            {showWearableModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h2>{t('connectWearable')}</h2>
                        <form onSubmit={handleWearableSubmit}>
                            <p>{t('connectingTo')} {selectedWearable === 'apple' ? 'Apple Watch' : 'Fitbit'}</p>
                            <div className="modal-buttons">
                                <button type="submit">{t('connect')}</button>
                                <button type="button" onClick={() => setShowWearableModal(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h2>{t('signup')}</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder={t('username')}
                                value={signupData.username}
                                onChange={handleSignupChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder={t('email')}
                                value={signupData.email}
                                onChange={handleSignupChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder={t('password')}
                                value={signupData.password}
                                onChange={handleSignupChange}
                                required
                                minLength="8"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder={t('confirmPassword')}
                                value={signupData.confirmPassword}
                                onChange={handleSignupChange}
                                required
                                minLength="8"
                            />
                            <div className="modal-buttons">
                                <button type="submit">{t('signup')}</button>
                                <button type="button" onClick={() => setShowSignupModal(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
