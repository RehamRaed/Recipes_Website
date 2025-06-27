import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "chefs"));
        const allChefs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChefs(allChefs);
      } catch (error) {
        console.error("فشل في تحميل الطهاة", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "rtl",
          fontSize: "1.3rem",
          fontFamily: "var(--secondary-font)",
        }}
      >
        ... جارٍ تحميل الطهاة
      </div>
    );
  }

  return (
    <Container
      className="py-5"
      style={{
        fontFamily: "var(--secondary-font)",
        minHeight: "80vh",
      }}
    >
      <h2
        className="text-center mb-5"
        style={{ color: "rgb(156, 66, 29)", fontWeight: "700" }}
      >
        جميع الطهاة
      </h2>

      <Row className="justify-content-center">
        {chefs.map((chef) => (
          <Col key={chef.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div
              onClick={() => navigate(`/chef/${chef.id}`)}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.26)",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              className="h-100"
            >
              <img
                src={chef.imageUrl}
                alt={chef.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                  border: "3px solid rgb(156, 66, 29)",
                }}
              />
              <h5
                style={{
                  color: "rgb(156, 66, 29)",
                  fontWeight: "600",
                }}
              >
                {chef.name}
              </h5>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginTop: "10px",
                  minHeight: "48px",
                  maxHeight: "48px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {chef.bio}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ChefsPage;
