import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";
import { db } from "../../src/firebase";

import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Section3() {
  const [chefs, setChefs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      const q = query(collection(db, "chefs"));
      const snapshot = await getDocs(q);
      const chefDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChefs(chefDocs);
    };

    fetchChefs();
  }, []);

  return (
    <Container className="container">
      <Row className="row">
        <h3 style={{ marginTop: "70px", marginBottom: "30px" }} className="h3">
          تعرفوا على طهاتنا
        </h3>

        {chefs.slice(0, 8).map((chef) => (
          <Col
            md={2}
            key={chef.id}
            onClick={() => navigate(`/chef/${chef.id}`)}
            style={{
              textAlign: "center",
              marginBottom: "20px",
              cursor: "pointer",
              padding: "0 40px",
            }}
          >
            <img
              src={chef.imageUrl}
              alt={chef.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h5
              style={{
                borderBottom: "1px solid #dbdbdb",
                borderTop: "1px solid #dbdbdb",
                paddingBottom: "5px",
                fontSize: "18px",
              }}
            >
              {chef.name}
            </h5>
          </Col>
        ))}

        <Col
          md={2}
          className="d-flex align-items-center justify-content-center flex-column"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "0 40px",
          }}
        >
          <i
            className="bi bi-arrow-left-circle-fill"
            style={{ fontSize: "40px", color: "#555", cursor: "pointer" }}
            onClick={() => navigate("/chefs")}
          ></i>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>عرض جميع الطهاة</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Section3;
