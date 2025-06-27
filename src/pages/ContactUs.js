import React, { useState } from "react";
import { Alert, Fade } from "react-bootstrap";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") {
      setEmailError(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !validateEmail(formData.email)) {
      setEmailError(true);
      setSubmitted(false);
      return;
    }

    setEmailError(false);
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <div className="alert-container">
        <Fade in={submitted} unmountOnExit>
          <Alert variant="success" className="signup-alert">
            تم إرسال رسالتك بنجاح. شكرًا لتواصلك معنا
          </Alert>
        </Fade>
      </div>

      <div className="signup-container">
        <h2
          className="signup-title"
          style={{ textAlign: "center", color: "rgb(156, 66, 29)" }}
        >
          تواصل معنا
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="signup-form"
          style={{ direction: "rtl" }}
        >
          <div className="signup-full">
            <label>الاسم الكامل</label>
            <input
              name="name"
              onChange={handleChange}
              className="signup-input"
              value={formData.name}
              autoComplete="name"
            />
          </div>

          <div className="signup-full">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={`signup-input ${emailError ? "error" : ""}`}
              value={formData.email}
              autoComplete="email"
            />
            {emailError && (
              <div
                style={{
                  color: "red",
                  marginTop: "5px",
                  fontSize: "0.9rem",
                  textAlign: "right",
                }}
              >
                البريد الإلكتروني غير صالح.
              </div>
            )}
          </div>

          <div className="signup-full">
            <label>الموضوع</label>
            <input
              name="subject"
              onChange={handleChange}
              className="signup-input"
              value={formData.subject}
              autoComplete="off"
            />
          </div>

          <div className="signup-full">
            <label>الرسالة</label>
            <textarea
              rows={5}
              name="message"
              onChange={handleChange}
              className="signup-input"
              value={formData.message}
            />
          </div>

          <div className="d-grid gap-2" style={{ justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(156, 66, 29)",
                color: "#fff",
                fontSize: "1.1rem",
                padding: "0.6rem 6rem",
                borderColor: "rgb(156, 66, 29)",
                border: "none",
                borderRadius: "8px",
                width: "fit-content",
                alignSelf: "flex-end",
              }}
            >
              إرسال
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
