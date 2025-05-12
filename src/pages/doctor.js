import React, { useState } from "react";
import "./doctor.css";

const DoctorDashboard = () => {
    // State for modals
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [showMedicalModal, setShowMedicalModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showThresholdModal, setShowThresholdModal] = useState(false);

    // State for form data
    const [patientData, setPatientData] = useState({
        name: 'John Doe',
        age: '35',
        bloodType: 'O+',
        allergies: 'Penicillin',
        conditions: 'Asthma',
        medications: 'Inhaler'
    });

    const [vitalsData, setVitalsData] = useState({
        heartRate: '72',
        oxygenLevel: '98',
        bloodPressure: '120/80',
        temperature: '98.6',
        respiratoryRate: '16'
    });

    const [medicalNotes, setMedicalNotes] = useState('');
    const [feedbackData, setFeedbackData] = useState({
        testType: '',
        testDate: '',
        medicationInstructions: '',
        appointmentDate: '',
        notes: ''
    });

    const [thresholdData, setThresholdData] = useState({
        bloodSugarMin: '70',
        bloodSugarMax: '110',
        bloodPressureSystolic: '120',
        bloodPressureDiastolic: '80',
        heartRateMin: '60',
        heartRateMax: '100',
        oxygenLevelMin: '95',
        temperatureMin: '97',
        temperatureMax: '99'
    });

    // Handlers for form changes
    const handlePatientChange = (e) => {
        setPatientData({
            ...patientData,
            [e.target.name]: e.target.value
        });
    };

    const handleVitalsChange = (e) => {
        setVitalsData({
            ...vitalsData,
            [e.target.name]: e.target.value
        });
    };

    const handleMedicalChange = (e) => {
        setMedicalNotes(e.target.value);
    };

    const handleFeedbackChange = (e) => {
        setFeedbackData({
            ...feedbackData,
            [e.target.name]: e.target.value
        });
    };

    const handleThresholdChange = (e) => {
        setThresholdData({
            ...thresholdData,
            [e.target.name]: e.target.value
        });
    };

    // Form submission handlers
    const handlePatientSubmit = (e) => {
        e.preventDefault();
        setShowPatientModal(false);
    };

    const handleVitalsSubmit = (e) => {
        e.preventDefault();
        setShowVitalsModal(false);
    };

    const handleMedicalSubmit = (e) => {
        e.preventDefault();
        setShowMedicalModal(false);
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setShowFeedbackModal(false);
    };

    const handleThresholdSubmit = (e) => {
        e.preventDefault();
        setShowThresholdModal(false);
    };

    return (
        <div className="doctor-dashboard">
            {/* View & Edit Patient Data */}
            <section className="patient-data">
                <h2>Patient Data</h2>
                <p><strong>Name:</strong> {patientData.name}</p>
                <p><strong>Age:</strong> {patientData.age}</p>
                <p><strong>Blood Type:</strong> {patientData.bloodType}</p>
                <p><strong>Allergies:</strong> {patientData.allergies}</p>
                <button onClick={() => setShowPatientModal(true)}>Edit Patient Info</button>
            </section>

            {/* Vitals Monitoring Panel */}
            <section className="vitals-monitoring">
                <h2>Vitals Monitoring</h2>
                <p>Heart Rate: {vitalsData.heartRate} bpm (Normal)</p>
                <p>Oxygen Level: {vitalsData.oxygenLevel}%</p>
                <p>Blood Pressure: {vitalsData.bloodPressure}</p>
                <button onClick={() => setShowVitalsModal(true)}>Adjust Vitals Monitoring</button>
            </section>

            {/* Update Medical History / Prescriptions */}
            <section className="medical-updates">
                <h2>Medical History & Prescriptions</h2>
                <p>{medicalNotes || 'No medical notes available'}</p>
                <button onClick={() => setShowMedicalModal(true)}>Update Medical Notes</button>
            </section>

            {/* Give Feedback to Patient */}
            <section className="patient-feedback">
                <h2>Feedback for Patient</h2>
                <button onClick={() => setShowFeedbackModal(true)}>Schedule a Test</button>
                <button onClick={() => setShowFeedbackModal(true)}>Continue Medication</button>
                <button onClick={() => setShowFeedbackModal(true)}>Request Appointment</button>
            </section>

            {/* Set Thresholds for Health Metrics */}
            <section className="thresholds">
                <h2>Set Health Metric Thresholds</h2>
                <div className="current-thresholds">
                    <p><strong>Blood Sugar:</strong> {thresholdData.bloodSugarMin}-{thresholdData.bloodSugarMax} mg/dL</p>
                    <p><strong>Blood Pressure:</strong> {thresholdData.bloodPressureSystolic}/{thresholdData.bloodPressureDiastolic} mm Hg</p>
                    <p><strong>Heart Rate:</strong> {thresholdData.heartRateMin}-{thresholdData.heartRateMax} bpm</p>
                    <p><strong>Oxygen Level:</strong> Min {thresholdData.oxygenLevelMin}%</p>
                    <p><strong>Temperature:</strong> {thresholdData.temperatureMin}-{thresholdData.temperatureMax}°F</p>
                </div>
                <button onClick={() => setShowThresholdModal(true)}>Adjust Thresholds</button>
            </section>

            {/* Patient Data Modal */}
            {showPatientModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Patient Information</h2>
                        <form onSubmit={handlePatientSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={patientData.name}
                                    onChange={handlePatientChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age:</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={patientData.age}
                                    onChange={handlePatientChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bloodType">Blood Type:</label>
                                <input
                                    type="text"
                                    id="bloodType"
                                    name="bloodType"
                                    value={patientData.bloodType}
                                    onChange={handlePatientChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="allergies">Allergies:</label>
                                <textarea
                                    id="allergies"
                                    name="allergies"
                                    value={patientData.allergies}
                                    onChange={handlePatientChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="conditions">Medical Conditions:</label>
                                <textarea
                                    id="conditions"
                                    name="conditions"
                                    value={patientData.conditions}
                                    onChange={handlePatientChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="medications">Current Medications:</label>
                                <textarea
                                    id="medications"
                                    name="medications"
                                    value={patientData.medications}
                                    onChange={handlePatientChange}
                                    rows="2"
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setShowPatientModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Vitals Monitoring Modal */}
            {showVitalsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adjust Vitals Monitoring</h2>
                        <form onSubmit={handleVitalsSubmit}>
                            <div className="form-group">
                                <label htmlFor="heartRate">Heart Rate (bpm):</label>
                                <input
                                    type="number"
                                    id="heartRate"
                                    name="heartRate"
                                    value={vitalsData.heartRate}
                                    onChange={handleVitalsChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="oxygenLevel">Oxygen Level (%):</label>
                                <input
                                    type="number"
                                    id="oxygenLevel"
                                    name="oxygenLevel"
                                    value={vitalsData.oxygenLevel}
                                    onChange={handleVitalsChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bloodPressure">Blood Pressure:</label>
                                <input
                                    type="text"
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    value={vitalsData.bloodPressure}
                                    onChange={handleVitalsChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="temperature">Temperature (°F):</label>
                                <input
                                    type="number"
                                    id="temperature"
                                    name="temperature"
                                    value={vitalsData.temperature}
                                    onChange={handleVitalsChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="respiratoryRate">Respiratory Rate:</label>
                                <input
                                    type="number"
                                    id="respiratoryRate"
                                    name="respiratoryRate"
                                    value={vitalsData.respiratoryRate}
                                    onChange={handleVitalsChange}
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setShowVitalsModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Medical Notes Modal */}
            {showMedicalModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Medical Notes</h2>
                        <form onSubmit={handleMedicalSubmit}>
                            <div className="form-group">
                                <label htmlFor="medicalNotes">Medical Notes:</label>
                                <textarea
                                    id="medicalNotes"
                                    value={medicalNotes}
                                    onChange={handleMedicalChange}
                                    rows="6"
                                    placeholder="Enter medical notes, prescriptions, or updates..."
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Notes</button>
                                <button type="button" onClick={() => setShowMedicalModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Patient Feedback Modal */}
            {showFeedbackModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Patient Feedback</h2>
                        <form onSubmit={handleFeedbackSubmit}>
                            <div className="form-group">
                                <label htmlFor="testType">Test Type:</label>
                                <input
                                    type="text"
                                    id="testType"
                                    name="testType"
                                    value={feedbackData.testType}
                                    onChange={handleFeedbackChange}
                                    placeholder="e.g., Blood Test, X-Ray"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="testDate">Test Date:</label>
                                <input
                                    type="date"
                                    id="testDate"
                                    name="testDate"
                                    value={feedbackData.testDate}
                                    onChange={handleFeedbackChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="medicationInstructions">Medication Instructions:</label>
                                <textarea
                                    id="medicationInstructions"
                                    name="medicationInstructions"
                                    value={feedbackData.medicationInstructions}
                                    onChange={handleFeedbackChange}
                                    rows="3"
                                    placeholder="Enter medication instructions..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="appointmentDate">Appointment Date:</label>
                                <input
                                    type="date"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={feedbackData.appointmentDate}
                                    onChange={handleFeedbackChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Additional Notes:</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={feedbackData.notes}
                                    onChange={handleFeedbackChange}
                                    rows="3"
                                    placeholder="Enter any additional notes..."
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Feedback</button>
                                <button type="button" onClick={() => setShowFeedbackModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Threshold Modal */}
            {showThresholdModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adjust Health Metric Thresholds</h2>
                        <form onSubmit={handleThresholdSubmit}>
                            <div className="form-group">
                                <label>Blood Sugar Range (mg/dL):</label>
                                <div className="range-inputs">
                                    <input
                                        type="number"
                                        name="bloodSugarMin"
                                        value={thresholdData.bloodSugarMin}
                                        onChange={handleThresholdChange}
                                        placeholder="Min"
                                    />
                                    <input
                                        type="number"
                                        name="bloodSugarMax"
                                        value={thresholdData.bloodSugarMax}
                                        onChange={handleThresholdChange}
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Blood Pressure (mm Hg):</label>
                                <div className="range-inputs">
                                    <input
                                        type="number"
                                        name="bloodPressureSystolic"
                                        value={thresholdData.bloodPressureSystolic}
                                        onChange={handleThresholdChange}
                                        placeholder="Systolic"
                                    />
                                    <input
                                        type="number"
                                        name="bloodPressureDiastolic"
                                        value={thresholdData.bloodPressureDiastolic}
                                        onChange={handleThresholdChange}
                                        placeholder="Diastolic"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Heart Rate Range (bpm):</label>
                                <div className="range-inputs">
                                    <input
                                        type="number"
                                        name="heartRateMin"
                                        value={thresholdData.heartRateMin}
                                        onChange={handleThresholdChange}
                                        placeholder="Min"
                                    />
                                    <input
                                        type="number"
                                        name="heartRateMax"
                                        value={thresholdData.heartRateMax}
                                        onChange={handleThresholdChange}
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Oxygen Level Minimum (%):</label>
                                <input
                                    type="number"
                                    name="oxygenLevelMin"
                                    value={thresholdData.oxygenLevelMin}
                                    onChange={handleThresholdChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Temperature Range (°F):</label>
                                <div className="range-inputs">
                                    <input
                                        type="number"
                                        name="temperatureMin"
                                        value={thresholdData.temperatureMin}
                                        onChange={handleThresholdChange}
                                        placeholder="Min"
                                    />
                                    <input
                                        type="number"
                                        name="temperatureMax"
                                        value={thresholdData.temperatureMax}
                                        onChange={handleThresholdChange}
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Thresholds</button>
                                <button type="button" onClick={() => setShowThresholdModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
