// Header.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import "../styles/Header.css";
import { UserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarDropdown, setShowSidebarDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const dishTypes = [
    "أكلات رئيسية",
    "مقبلات",
    "شوربات",
    "سندويشات",
    "سلطات",
    "حلويات",
    "خبز و معجنات",
    "مشروبات",
    "للأطفال",
    "وجبات سريعة",
  ];

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setShowLoginModal(false);
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
    } catch (err) {
      setError("البريد أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <>
      <header className="bg-light py-3 border-bottom">
        <Container>
          <Row
            className="align-items-center flex-wrap text-center text-md-start"
            style={{ justifyContent: "space-between" }}
          >
            <Col xs={3} md={4} className="text-end text-md-end mt-md-0">
              <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </Col>

            <Col
              xs={4}
              md={4}
              className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2"
            >
              <button
                className="hamburger-btn d-md-none"
                onClick={() => setShowSidebar(true)}
                aria-label="فتح القائمة"
              >
                <i className="bi bi-list fs-2"></i>
              </button>

              <nav className="d-none d-md-flex flex-column flex-md-row justify-content-center gap-2 gap-md-3">
                <Link to="/" className="header-link">
                  الرئيسية
                </Link>
                <Link to="/about" className="header-link">
                  من&nbsp;نحن
                </Link>
                <Link to="/tips" className="header-link">
                  نصائح
                </Link>
                <Link to="/contact" className="header-link">
                  اتصل&nbsp;بنا
                </Link>
              </nav>
              <div
                className="position-relative glow-container d-none d-md-block no-shadow"
                ref={dropdownRef}
              >
                <button
                  className="btn discover-btn d-flex align-items-center gap-2"
                  style={{ padding: "2px 12px" }}
                  onClick={toggleDropdown}
                  type="button"
                >
                  اكتشفي
                  <i
                    className={`bi bi-chevron-${showDropdown ? "up" : "down"}`}
                  ></i>
                </button>

                <ul className={`custom-dropdown ${showDropdown ? "show" : ""}`}>
                  <div className="dropdown-arrow" />
                  {dishTypes.map((type, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        to={`/recipes-by-dish/${encodeURIComponent(type)}`}
                        onClick={() => setShowDropdown(false)}
                      >
                        {type}
                      </Link>
                    </li>
                  ))}
                  <li style={{ gridColumn: "1 / -1", justifySelf: "center" }}>
                    <Link
                      className="dropdown-item d-flex align-items-center gap-1"
                      to="/all-recipes"
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="bi bi-arrow-left-circle"></i> جميع التصنيفات
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={3} md={4} className=" mb-md-0">
              {user ? (
                <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end">
                  <i
                    className="bi bi-star fs-5 tooltip-icon"
                    data-tooltip="المفضلة"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/favorites")}
                  ></i>
                  <i
                    className="bi bi-box-arrow-right fs-5 tooltip-icon"
                    data-tooltip="تسجيل الخروج"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  ></i>
                </div>
              ) : (
                <i
                  className="bi bi-person-circle fs-3 text-dark tooltip-icon"
                  style={{ cursor: "pointer", height: "40px" }}
                  onClick={() => setShowLoginModal(true)}
                ></i>
              )}
            </Col>
          </Row>
        </Container>
      </header>

      <div
        className={`sidebar ${showSidebar ? "sidebar-show" : ""}`}
        onClick={() => setShowSidebar(false)}
      >
        <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
          <i
            className="bi bi-x-lg sidebar-close-icon"
            onClick={() => setShowSidebar(false)}
            role="button"
            aria-label="إغلاق القائمة"
            style={{ textAlign: "right" }}
          ></i>

          <ul
            className="sidebar-links list-unstyled "
            style={{ textAlign: "center", padding: "20px 5px" }}
          >
            <li className="mb-3">
              <Link
                to="/"
                onClick={() => setShowSidebar(false)}
                className="sidebar-link"
              >
                الرئيسية
              </Link>
            </li>

            <li className="mb-3">
              <Link
                to="/about"
                onClick={() => setShowSidebar(false)}
                className="sidebar-link"
              >
                من نحن
              </Link>
            </li>

            <li className="mb-3">
              <Link
                to="/tips"
                onClick={() => setShowSidebar(false)}
                className="sidebar-link"
              >
                نصائح
              </Link>
            </li>

            <li className="mb-3">
              <Link
                to="/contact"
                onClick={() => setShowSidebar(false)}
                className="sidebar-link"
              >
                اتصل بنا
              </Link>
            </li>

            <li className="mt-3">
              <div className="text-center mt-2">
                <button
                  className="btn discover-btn d-inline-flex align-items-center gap-2"
                  style={{ padding: "2px 12px" }}
                  onClick={() => setShowSidebarDropdown((prev) => !prev)}
                >
                  <i
                    className={`bi bi-chevron-${
                      showSidebarDropdown ? "up" : "down"
                    }`}
                  ></i>
                  التصنيفات
                </button>
              </div>

              {showSidebarDropdown && (
                <ul className="list-unstyled ps-3 mt-2">
                  {dishTypes.map((type, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        to={`/recipes-by-dish/${encodeURIComponent(type)}`}
                        onClick={() => setShowSidebar(false)}
                        className="sidebar-link"
                      >
                        {type}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-2">
                    <Link
                      to="/all-recipes"
                      onClick={() => setShowSidebar(false)}
                      className="sidebar-link d-flex align-items-center gap-1"
                      style={{marginLeft:"5px"}}
                    >
                      <i className="bi bi-arrow-left-circle"></i>جميع التصنيفات
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      <Modal
        show={showLoginModal}
        onHide={handleClose}
        centered
        backdropClassName="blur-backdrop"
        className="slide-modal"
      >
        <Modal.Header
          className="justify-content-between align-items-center"
          style={{ padding: "20px 40px" }}
        >
          <Modal.Title style={{ fontWeight: "600" }}>تسجيل الدخول</Modal.Title>
          <button onClick={handleClose} className="btn-close ms-1"></button>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px 40px" }}>
          <Form onSubmit={handleLogin}>
            {error && <p className="text-danger">{error}</p>}

            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3 d-flex justify-content-between align-items-center">
              <Form.Check
                type="checkbox"
                label="تذكرني"
                className="custom-checkbox"
                reverse
              />
              <Link
                to="/forgot-password"
                style={{ textDecoration: "none", fontSize: "14px" }}
              >
                هل نسيت كلمة السر؟
              </Link>
            </Form.Group>

            <button type="submit" className="custom-login-btn mt-3">
              تسجيل الدخول
            </button>

            <div className="text-center mt-3">
              <span>مستخدم جديد؟ </span>
              <Link
                to="/signup"
                style={{ textDecoration: "none", fontSize: "14px" }}
                onClick={handleClose}
              >
                سجل الآن
              </Link>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
