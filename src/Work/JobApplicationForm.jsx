import React, { useState } from "react";
import "./form1.css";

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        position: "",
        additionalInfo: "",
        cv: null,
    });

    const [errors, setErrors] = useState({});
    const [successPopup, setSuccessPopup] = useState(false);

    // handle change
    const handleChange = (e) => {
        if (e.target.name === "cv") {
            setFormData({ ...formData, cv: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // validate inputs
    const validate = () => {
        let temp = {};

        if (!formData.firstName.trim()) temp.firstName = "First name required";
        if (!formData.lastName.trim()) temp.lastName = "Last name required";

        if (!formData.email.trim()) temp.email = "Email required";
        else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email))
            temp.email = "Invalid email";

        if (!formData.phone.trim()) temp.phone = "Phone required";
        else if (!/^[0-9]{10}$/.test(formData.phone))
            temp.phone = "Phone must be 10 digits";

        if (!formData.country) temp.country = "Select a country";
        if (!formData.city.trim()) temp.city = "City required";
        if (!formData.address.trim()) temp.address = "Address required";
        if (!formData.position) temp.position = "Choose a position";

        if (!formData.cv) temp.cv = "Upload CV";
        else if (formData.cv.size > 1024 * 1024)
            temp.cv = "File too large (Max 1MB)";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    // reset fields
    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            city: "",
            address: "",
            position: "",
            additionalInfo: "",
            cv: null,
        });

        setErrors({});
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setSuccessPopup(true);

        setTimeout(() => {
            setSuccessPopup(false);
        }, 1800);

        handleReset();
    };

    return (
        <>
            {/* Success Popup */}
            {successPopup && (
                <div className="success-popup">
                    <div className="success-box">
                        <h3>🎉 Form Submitted Successfully!</h3>
                    </div>
                </div>
            )}

            <div className="form-wrapper">
                <h2>Job Application Form Widget</h2>

                <form className="job-form" onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <div className="row">
                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <small>{errors.firstName}</small>}
                        </div>

                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <small>{errors.lastName}</small>}
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="row">
                        <div style={{ width: "100%" }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <small>{errors.email}</small>}
                        </div>

                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <small>{errors.phone}</small>}
                        </div>
                    </div>

                    {/* Country */}
                    <select name="country" value={formData.country} onChange={handleChange}>
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                    {errors.country && <small>{errors.country}</small>}

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {errors.city && <small>{errors.city}</small>}

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <small>{errors.address}</small>}

                    {/* Position */}
                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                    >
                        <option value="">Choose desired position</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                    </select>
                    {errors.position && <small>{errors.position}</small>}

                    {/* Additional info */}
                    <textarea
                        name="additionalInfo"
                        placeholder="Additional info"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                    ></textarea>

                    {/* File upload */}
                    <div className="file-box">
                        <label>Add your CV</label>
                        <input type="file" name="cv" onChange={handleChange} />
                        <p>Only: pdf / doc | Size: less than 1 Mb</p>
                        {errors.cv && <small>{errors.cv}</small>}
                    </div>

                    {/* Buttons */}
                    <div className="btn-group">
                        <button type="button" className="reset-btn" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <p className="form-footer">© 2025 Job Form Widget — All Rights Reserved</p>
        </>
    );
};

export default JobApplicationForm;