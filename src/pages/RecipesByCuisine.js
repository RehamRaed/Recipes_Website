import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RecipesByCuisine() {
  const { cuisineType } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    if (!cuisineType) return;
    const fetchCuisineRecipes = async () => {
      setLoading(true);
      const q = query(
        collection(db, "recipes"),
        where("cuisine", "==", cuisineType)
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

    fetchCuisineRecipes();
  }, [cuisineType]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdfaf6",
        }}
      >
        <p style={{ fontSize: "1.2rem", color: "#444" }}>
          ... جار تحميل وصفات المطبخ
        </p>
      </div>
    );

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

  return (
    <Container className="my-5" style={{ fontFamily: "var(--secondary-font)" }}>
      <h2 className="text-center mb-4">{cuisineType}</h2>

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
            لا توجد وصفات متاحة لهذا النوع
          </p>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
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
                      <Card.Title dir="rtl" className="fs-6 fw-bold text-end">
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
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                        className="w-100"
                      >
                        عرض الوصفة
                      </Button>
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
}

export default RecipesByCuisine;
