// /pages/LanguageContext/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Translation data for each language
const translations = {
  en: {
    // Navigation
    home: "Home",
    qrCode: "QR Code",
    patientDashboard: "Patient Dashboard",
    doctorDashboard: "Doctor Dashboard",
    settings: "Settings",
    
    // Welcome Section
    welcomeBack: "Welcome back",
    welcomeMessage: "We're here to help you manage your healthcare interactions smoothly and effectively.",
    
    // Emergency Section
    emergencyAlert: "Emergency Alert",
    emergencyDescription: "Contact emergency services instantly in case of urgent health issues.",
    notifyHospital: "Notify Local Hospital",
    hospitalNotified: "Local hospital notified!",
    
    // Health Section
    healthRecommendations: "Health Recommendations",
    patientFeedback: "Patient Feedback",
    vitalsOverview: "Vitals Overview",
    heartRate: "Heart Rate",
    oxygenLevel: "Oxygen Level",
    
    // Settings
    manageCredentials: "Manage Login Credentials",
    changePassword: "Change Password",
    setupOtp: "Setup Phone OTP",
    connectWearable: "Connect Wearable Device",
    connectApple: "Connect Apple Watch",
    connectFitbit: "Connect Fitbit",
    languagePreferences: "Language Preferences",
    exportHealthProfile: "Export Health Profile",
    downloadPdf: "Download PDF",
    logout: "Logout",
    
    // Common
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    
    // Password Change
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordUpdated: "Password updated successfully",
    errorUpdatingPassword: "Error updating password",
    passwordsDoNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 8 characters long",
    
    // OTP Setup
    phoneNumber: "Phone Number",
    otpCode: "OTP Code",
    otpSetupSuccess: "OTP setup successful",
    errorSettingUpOtp: "Error setting up OTP",
    
    // Wearable Connection
    connectingTo: "Connecting to",
    wearableConnected: "Wearable device connected successfully",
    errorConnectingWearable: "Error connecting wearable device",
    
    // PDF Export
    errorExportingPDF: "Error exporting PDF",
    
    // Login
    loginRequired: "Login Required",
    pleaseLoginToAccessSettings: "Please log in to access settings",
    goToLogin: "Go to Login"
  },
  es: {
    // Navigation
    home: "Inicio",
    qrCode: "Código QR",
    patientDashboard: "Panel del Paciente",
    doctorDashboard: "Panel del Doctor",
    settings: "Configuraciones",
    
    // Welcome Section
    welcomeBack: "Bienvenido de nuevo",
    welcomeMessage: "Estamos aquí para ayudarte a gestionar tus interacciones de salud de manera fluida y efectiva.",
    
    // Emergency Section
    emergencyAlert: "Alerta de Emergencia",
    emergencyDescription: "Contacta con servicios de emergencia al instante en caso de problemas de salud urgentes.",
    notifyHospital: "Notificar al Hospital Local",
    hospitalNotified: "¡Hospital local notificado!",
    
    // Health Section
    healthRecommendations: "Recomendaciones de Salud",
    patientFeedback: "Comentarios del Paciente",
    vitalsOverview: "Resumen de Signos Vitales",
    heartRate: "Frecuencia Cardíaca",
    oxygenLevel: "Nivel de Oxígeno",
    
    // Settings
    manageCredentials: "Administrar credenciales de inicio de sesión",
    changePassword: "Cambiar la contraseña",
    setupOtp: "Configurar OTP de teléfono",
    connectWearable: "Conectar dispositivo portátil",
    connectApple: "Conectar Apple Watch",
    connectFitbit: "Conectar Fitbit",
    languagePreferences: "Preferencias de idioma",
    exportHealthProfile: "Exportar perfil de salud",
    downloadPdf: "Descargar PDF",
    logout: "Cerrar sesión",
    
    // Common
    loading: "Cargando...",
    error: "Ocurrió un error",
    success: "Éxito",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
  },
  fr: {
    // Navigation
    home: "Accueil",
    qrCode: "Code QR",
    patientDashboard: "Tableau de Bord Patient",
    doctorDashboard: "Tableau de Bord Médecin",
    settings: "Paramètres",
    
    // Welcome Section
    welcomeBack: "Bon retour",
    welcomeMessage: "Nous sommes là pour vous aider à gérer vos interactions de santé de manière fluide et efficace.",
    
    // Emergency Section
    emergencyAlert: "Alerte d'Urgence",
    emergencyDescription: "Contactez les services d'urgence instantanément en cas de problèmes de santé urgents.",
    notifyHospital: "Notifier l'Hôpital Local",
    hospitalNotified: "Hôpital local notifié !",
    
    // Health Section
    healthRecommendations: "Recommandations de Santé",
    patientFeedback: "Retour du Patient",
    vitalsOverview: "Aperçu des Signes Vitaux",
    heartRate: "Fréquence Cardiaque",
    oxygenLevel: "Niveau d'Oxygène",
    
    // Settings
    manageCredentials: "Gérer les informations de connexion",
    changePassword: "Changer le mot de passe",
    setupOtp: "Configurer OTP par téléphone",
    connectWearable: "Connecter un appareil portable",
    connectApple: "Connecter Apple Watch",
    connectFitbit: "Connecter Fitbit",
    languagePreferences: "Préférences linguistiques",
    exportHealthProfile: "Exporter le profil de santé",
    downloadPdf: "Télécharger PDF",
    logout: "Se déconnecter",
    
    // Common
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Succès",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
  },
};

// Create context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, default to browser language or 'en'
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    const browserLanguage = navigator.language.split('-')[0];
    return translations[browserLanguage] ? browserLanguage : 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    // Update document language attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
