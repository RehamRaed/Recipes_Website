import React, { useState } from "react";
import { Alert, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "../styles/SignupForm.css";

function SignupForm() {
  const auth = getAuth();
  const firestore = getFirestore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    birthdate: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setSuccessMessage("");
    setShowSuccess(false);

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      country,
      birthdate,
      gender,
    } = formData;

    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!email.trim() || !validateEmail(email)) newErrors.email = true;
    if (!password) newErrors.password = true;
    if (!confirmPassword || password !== confirmPassword)
      newErrors.confirmPassword = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!country.trim()) newErrors.country = true;
    if (!birthdate.trim()) newErrors.birthdate = true;
    if (!gender.trim()) newErrors.gender = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phone,
        country,
        birthdate,
        gender,
      });

      setSuccessMessage("تم إنشاء الحساب بنجاح ");
      setShowSuccess(true);
      setLoading(false);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <>
      <div className="alert-container">
        <Fade in={showSuccess} unmountOnExit>
          <Alert variant="success" className="signup-alert">
            {successMessage}
          </Alert>
        </Fade>
      </div>
      <div className="signup-container">
        <h2 className="signup-title">إنشاء حساب</h2>

        <form onSubmit={handleSubmit} noValidate className="signup-form">
          <div className="signup-row">
            <div className="signup-half">
              <label>الاسم الأول</label>
              <input
                name="firstName"
                onChange={handleChange}
                className={`signup-input ${errors.firstName ? "error" : ""}`}
                value={formData.firstName}
                autoComplete="given-name"
              />
            </div>
            <div className="signup-half">
              <label>اسم العائلة</label>
              <input
                name="lastName"
                onChange={handleChange}
                className={`signup-input ${errors.lastName ? "error" : ""}`}
                value={formData.lastName}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="signup-full">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={`signup-input ${errors.email ? "error" : ""}`}
              value={formData.email}
              autoComplete="email"
            />
          </div>

          <div className="signup-row">
            <div className="signup-half">
              <label>كلمة المرور</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className={`signup-input ${errors.password ? "error" : ""}`}
                value={formData.password}
                autoComplete="new-password"
              />
            </div>
            <div className="signup-half">
              <label>تأكيد كلمة المرور</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                className={`signup-input ${
                  errors.confirmPassword ? "error" : ""
                }`}
                value={formData.confirmPassword}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="signup-row">
            <div className="signup-half">
              <label>رقم الهاتف</label>
              <input
                name="phone"
                onChange={handleChange}
                className={`signup-input ${errors.phone ? "error" : ""}`}
                value={formData.phone}
                autoComplete="tel"
              />
            </div>
            <div className="signup-half">
              <label>الدولة</label>
              <input
                name="country"
                onChange={handleChange}
                className={`signup-input ${errors.country ? "error" : ""}`}
                value={formData.country}
                autoComplete="country-name"
              />
            </div>
          </div>

          <div className="signup-full">
            <label>تاريخ الميلاد</label>
            <input
              type="date"
              name="birthdate"
              onChange={handleChange}
              className={`signup-input ${errors.birthdate ? "error" : ""}`}
              value={formData.birthdate}
            />
          </div>

          <div className="signup-full">
            <label>الجنس</label>
            <select
              name="gender"
              onChange={handleChange}
              className={`signup-select ${errors.gender ? "error" : ""}`}
              value={formData.gender}
            >
              <option disabled hidden value="">
                اختر
              </option>
              <option value="أنثى">أنثى</option>
              <option value="ذكر">ذكر</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="signup-button">
            {loading ? "جاري التسجيل" : "إنشاء حساب"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
