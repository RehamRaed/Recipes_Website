import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../src/firebase";
import dish from "../assets/dish-svgrepo-com.svg";
import kitchen from "../assets/dish-svgrepo-com(2).svg";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Section1() {
  const [dite, setDite] = useState([]);
  const [byDish, setByDish] = useState([]);
  const [byCuisine, setByCuisine] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const dishTypes = [
    "أكلات رئيسية",
    "مقبلات",
    "شوربات",
    "سندويشات",
    "سلطات",
    "حلويات",
    "خبز و معجنات",
  ];

  const cuisineTypes = [
    "أكلات شامية",
    "أكلات خليجية",
    "أكلات مصرية",
    "أكلات مغربية",
    "أكلات عراقية",
    "أكلات إيطالية",
    "أكلات آسيوية",
  ];

  useEffect(() => {
    const fetchBottomRecipes = async () => {
      const diteQuery = query(
        collection(db, "recipes"),
        where("category", "==", "diteRecipes")
      );

      const allRecipesQuery = query(collection(db, "recipes"));

      const [diteSnap, allSnap] = await Promise.all([
        getDocs(diteQuery),
        getDocs(allRecipesQuery),
      ]);

      const diteDocs = diteSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const allDocs = allSnap.docs.map((doc) => doc.data());

      const dishTypesSet = Array.from(
        new Set(
          allDocs
            .map((doc) => doc.dishType)
            .filter((type) => type && type.trim() !== "")
        )
      );

      const cuisineTypesSet = Array.from(
        new Set(
          allDocs
            .map((doc) => doc.cuisineType)
            .filter((type) => type && type.trim() !== "")
        )
      );

      if (diteDocs.length > 0) setDite(diteDocs.slice(0, 4));
      if (dishTypesSet.length > 0) setByDish(dishTypesSet.slice(0, 7));
      if (cuisineTypesSet.length > 0) setByCuisine(cuisineTypesSet.slice(0, 7));
    };

    fetchBottomRecipes();
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("يرجى إدخال بريد إلكتروني صالح.");
      setIsError(true);
      return;
    }

    try {
      await addDoc(collection(db, "newsletter"), { email });
      setMessage("تم الاشتراك بنجاح في النشرة البريدية!");
      setIsError(false);
      setEmail("");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("خطأ أثناء الاشتراك", error);
      setMessage("حدث خطأ أثناء الاشتراك. حاول مرة أخرى");
      setIsError(true);
    }
  };

  return (
    <Container className="container">
      <Row className="row2">
        <Col md={9} className="my-custom-col">
          <Row>
            <Col md={4} className="col4">
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                  padding: "7px 0",
                }}
              >
                وصفات رجيم ودايت
              </h3>

              {dite.length === 0 ? (
                <>
                  <div
                    style={{
                      backgroundColor: "#eee",
                      height: "180px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#999",
                      fontWeight: "500",
                      cursor: "default",
                    }}
                  >
                    جارٍ تحميل الصورة...
                  </div>

                  <h5
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      color: "#999",
                      fontWeight: "500",
                    }}
                  >
                    جارٍ تحميل العنوان...
                  </h5>

                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          textAlign: "right",
                          paddingBottom: "5px",
                          marginBottom: "5px",
                          marginTop: "15px",
                          borderBottom: "2px dotted rgba(152, 152, 152, 0.57)",
                          color: "#999",
                          cursor: "default",
                        }}
                      >
                        جارٍ تحميل الوصفة...
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      overflow: "hidden",
                      height: "180px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/recipe/${dite[0].id}`)}
                  >
                    <img
                      src={dite[0].imageUrl}
                      alt={dite[0].title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <h5
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/recipe/${dite[0].id}`)}
                  >
                    {dite[0].title}
                  </h5>

                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {dite.slice(1, 4).map((diteItem) => (
                      <div
                        key={diteItem.id}
                        onClick={() => navigate(`/recipe/${diteItem.id}`)}
                        style={{
                          cursor: "pointer",
                          textAlign: "right",
                          paddingBottom: "5px",
                          marginBottom: "5px",
                          marginTop: "15px",
                          borderBottom: "2px dotted rgba(152, 152, 152, 0.57)",
                        }}
                      >
                        {diteItem.title}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Link
                to="/diet-recipes"
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  color: "rgb(2, 142, 189)",
                  width: "100%",
                  textDecoration: "none",
                  marginTop: "15px",
                }}
              >
                جميع الوصفات
              </Link>
            </Col>

            <Col md={4} className="col4">
              <div className="d-flex justify-content-center gap-2 bg-secondary text-white p-2">
                <h3 className="text">وصفات حسب الطبق</h3>
                <img src={kitchen} className="icons" alt="طبق" />
              </div>

              {dishTypes.slice(0, 7).map((type, index) => (
                <div
                  key={index}
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    paddingBottom: "5px",
                    marginBottom: "5px",
                    marginTop: "15px",
                    borderBottom: "2px dotted rgba(152, 152, 152, 0.57)",
                  }}
                  onClick={() => navigate(`/recipes-by-dish/${type}`)}
                >
                  <h5 className="text-center mt-2" style={{ fontSize: "16px" }}>
                    {type}
                  </h5>
                </div>
              ))}
              <Link
                to="/all-recipes"
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  color: "rgb(2, 142, 189)",
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                جميع الوصفات
              </Link>
            </Col>

            <Col md={4} className="col4">
              <div className="d-flex justify-content-center gap-2 bg-secondary text-white p-2">
                <h3 className="text">وصفات حسب المطبخ</h3>
                <img src={dish} className="icons" alt="مطبخ" />
              </div>
              {cuisineTypes.slice(0, 7).map((type, index) => (
                <div
                  key={index}
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    paddingBottom: "5px",
                    marginBottom: "5px",
                    marginTop: "15px",
                    borderBottom: "2px dotted rgba(152, 152, 152, 0.57)",
                  }}
                  onClick={() => navigate(`/recipes-by-cuisine/${type}`)}
                >
                  <h5 className="text-center mt-2" style={{ fontSize: "16px" }}>
                    {type}
                  </h5>
                </div>
              ))}
              <Link
                to="/all-recipes"
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  color: "rgb(2, 142, 189)",
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                جميع الوصفات
              </Link>
            </Col>
          </Row>
        </Col>

        <Col md={3}>
          <div className="Email-side">
            <h4>سـجّلوا الآن في</h4>
            <h2>نشـرة البـريد الإلكـترونية</h2>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="newsletter-button" onClick={handleSubscribe}>
                اشتراك
              </button>
            </div>
            <div
              style={{
                height: "24px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {message && (
                <p
                  style={{
                    color: isError ? "red" : "green",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
            <p>
              لمائدة غنيّة، سوف نرسل لك أشهى الوصفات اليوميّة المنوّعة، بعض
              النصائح والأفكار المفيدة، وأفكار خاصة بالمناسبات...
            </p>
            <div
              style={{
                width: "150px",
                height: "1px",
                backgroundColor: "gray",
                margin: "0 auto",
                marginBottom: "30px",
                marginTop: "40px",
              }}
            ></div>
            <div className="d-flex gap-2 justify-content-center">
              <a href="#" className="social-circle">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-circle">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-circle">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-circle">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" className="social-circle">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Section1;
