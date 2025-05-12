import React, { useState } from "react";
import "./patient.css";

const PatientDashboard = () => {
    const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
    const [questionnaireData, setQuestionnaireData] = useState({
        pastSurgeries: 'None',
        allergies: 'Penicillin',
        chronicConditions: 'Asthma',
        medications: 'Inhaler',
        familyHistory: 'None',
        lifestyle: 'Non-smoker, Occasional exercise'
    });

    const handleQuestionnaireChange = (e) => {
        setQuestionnaireData({
            ...questionnaireData,
            [e.target.name]: e.target.value
        });
    };

    const handleQuestionnaireSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the data to the backend
        setShowQuestionnaireModal(false);
    };

    return (
        <div className="patient-dashboard">
            {/* Profile Overview */}
            <section className="profile-overview">
                <h2>Profile Overview</h2>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Age:</strong> 35</p>
                <p><strong>Blood Type:</strong> O+</p>
            </section>

            {/* Medical History Questionnaire */}
            <section className="medical-history">
                <h2>Medical History Questionnaire</h2>
                <p>Past Surgeries: {questionnaireData.pastSurgeries}</p>
                <p>Allergies: {questionnaireData.allergies}</p>
                <p>Chronic Conditions: {questionnaireData.chronicConditions}</p>
                <button onClick={() => setShowQuestionnaireModal(true)}>Edit Questionnaire</button>
            </section>

            {/* Doctor Notes and Prescriptions */}
            <section className="doctor-notes">
                <h2>Doctor Notes & Prescriptions</h2>
                <ul>
                    <li>📝 "Prescribed inhaler - 2 puffs daily."</li>
                    <li>📝 "Recommended annual asthma check-up."</li>
                </ul>
            </section>

            {/* Vitals History Chart */}
            <section className="vitals-history">
                <h2>Vitals History (Sample Data)</h2>
                <div className="chart-placeholder">
                    📈 Heart Rate: Normal  
                    <br />
                    📈 Oxygen Level: 98%
                </div>
            </section>

            {/* Questionnaire Modal */}
            {showQuestionnaireModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Medical History Questionnaire</h2>
                        <form onSubmit={handleQuestionnaireSubmit}>
                            <div className="form-group">
                                <label htmlFor="pastSurgeries">Past Surgeries:</label>
                                <textarea
                                    id="pastSurgeries"
                                    name="pastSurgeries"
                                    value={questionnaireData.pastSurgeries}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="allergies">Allergies:</label>
                                <textarea
                                    id="allergies"
                                    name="allergies"
                                    value={questionnaireData.allergies}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="chronicConditions">Chronic Conditions:</label>
                                <textarea
                                    id="chronicConditions"
                                    name="chronicConditions"
                                    value={questionnaireData.chronicConditions}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="medications">Current Medications:</label>
                                <textarea
                                    id="medications"
                                    name="medications"
                                    value={questionnaireData.medications}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="familyHistory">Family History:</label>
                                <textarea
                                    id="familyHistory"
                                    name="familyHistory"
                                    value={questionnaireData.familyHistory}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lifestyle">Lifestyle:</label>
                                <textarea
                                    id="lifestyle"
                                    name="lifestyle"
                                    value={questionnaireData.lifestyle}
                                    onChange={handleQuestionnaireChange}
                                    rows="2"
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setShowQuestionnaireModal(false)}>
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

export default PatientDashboard;
