import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DietRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  useEffect(() => {
    const fetchDietRecipes = async () => {
      setLoading(true);
      const q = query(
        collection(db, "recipes"),
        where("category", "==", "diteRecipes")
      );
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(results);
      setCurrentPage(1);
      setLoading(false);
    };

    fetchDietRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdfaf6",
          fontFamily: "var(--secondary-font)",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            color: "#444",
            fontFamily: "var(--secondary-font)",
          }}
        >
          ... جار تحميل وصفات الدايت
        </p>
      </div>
    );
  }

  return (
    <Container className="my-5" style={{ fontFamily: "var(--secondary-font)" }}>
      <h2 className="text-center mb-4">وصفات الرجيم والدايت</h2>

      {recipes.length === 0 ? (
        <div
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fdfaf6",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#444" }}>
            لا توجد وصفات متاحة لوصفات الرجيم
          </p>
        </div>
      ) : (
        <>
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            className="g-4"
            style={{ direction: "rtl" }}
          >
            {currentRecipes.map((recipe) => (
              <Col key={recipe.id}>
                <Card className="h-100 shadow-sm d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title
                        dir="rtl"
                        className="fs-6 fw-bold text-end"
                        style={{ minHeight: "2.5rem" }}
                      >
                        {recipe.title}
                      </Card.Title>
                      <Card.Text
                        dir="rtl"
                        className="text-muted text-end"
                        style={{ minHeight: "60px" }}
                      >
                        {recipe.description?.substring(0, 60)}...
                      </Card.Text>
                    </div>
                    <div className="mt-3 text-end">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="btn btn-sm w-100"
                        style={{
                          color: "rgb(2, 142, 189)",
                          border: "1px solid rgb(2, 142, 189)",
                          backgroundColor: "white",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "rgb(2, 142, 189)";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "rgb(2, 142, 189)";
                        }}
                      >
                        عرض الوصفة
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-5 gap-2 flex-wrap">
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "rgb(156, 66, 29)",
                  borderColor: "rgb(156, 66, 29)",
                }}
                onClick={handlePrev}
                disabled={currentPage === 1}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgb(156, 66, 29)";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "rgb(156, 66, 29)";
                }}
              >
                ← السابق
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  style={{
                    backgroundColor:
                      currentPage === index + 1
                        ? "rgba(172, 71, 31, 0.67)"
                        : "transparent",
                    color:
                      currentPage === index + 1 ? "#fff" : "rgb(156, 66, 29)",
                    borderColor: "rgba(156, 65, 29, 0.58)",
                  }}
                  onClick={() => handlePageClick(index + 1)}
                  onMouseEnter={(e) => {
                    if (currentPage !== index + 1) {
                      e.target.style.backgroundColor =
                        "rgba(156, 65, 29, 0.58)";
                      e.target.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== index + 1) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "rgba(156, 65, 29, 0.58)";
                    }
                  }}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "rgb(156, 66, 29)",
                  borderColor: "rgb(156, 66, 29)",
                }}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgb(156, 66, 29)";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "rgb(156, 66, 29)";
                }}
              >
                التالي →
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default DietRecipes;
