import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function Favorites() {
  const { user } = useContext(UserContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favCollectionRef = collection(db, "users", user.uid, "favorites");
        const favSnapshot = await getDocs(favCollectionRef);

        const recipes = [];

        for (const favDoc of favSnapshot.docs) {
          const recipeId = favDoc.id;
          const recipeDocRef = doc(db, "recipes", recipeId);
          const recipeDocSnap = await getDoc(recipeDocRef);

          if (recipeDocSnap.exists()) {
            recipes.push({ id: recipeDocSnap.id, ...recipeDocSnap.data() });
          }
        }

        setFavoriteRecipes(recipes);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  return (
    <Container
      className="my-5"
      style={{ fontFamily: "var(--secondary-font)", color: "#4b3b2b" }}
    >
      <h2
        className="text-center mb-4"
        style={{ fontSize: "2rem", color: "black" }}
      >
        مفضلاتي
      </h2>

      {loading ? (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.4rem",
            color: "#555",
            fontFamily: "var(--secondary-font)",
            direction: "rtl",
          }}
        >
          ...جارٍ تحميل المفضلات
        </div>
      ) : favoriteRecipes.length === 0 ? (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.3rem",
            fontFamily: "var(--secondary-font)",
            color: "#666",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          لا توجد وصفات مفضلة حتى الآن. <br />
          يمكنك إضافة وصفات إلى المفضلة من صفحة الوصفات.
        </div>
      ) : (
        <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          className="g-4"
          style={{ direction: "rtl" }}
        >
          {favoriteRecipes.map((recipe) => (
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
                      style={{ minHeight: "3rem" }}
                    >
                      {recipe.title}
                    </Card.Title>
                    <Card.Text
                      dir="rtl"
                      className="text-muted text-end"
                      style={{
                        minHeight: "60px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {recipe.description}
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
      )}
    </Container>
  );
}

export default Favorites;
