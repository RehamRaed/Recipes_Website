import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Row, Col } from "react-bootstrap";

function Chef() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchChefData = async () => {
      const docRef = doc(db, "chefs", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const chefData = { id: snapshot.id, ...snapshot.data() };
        setChef(chefData);

        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("for", "==", chefData.id));
        const recipesSnapshot = await getDocs(q);
        const recipesList = recipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipesList);
      }
    };

    fetchChefData();
  }, [id]);

  if (!chef) {
    return (
      <div style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.3rem",
        color: "rgb(156, 66, 29)",
        direction: "rtl"
      }}>
       ... جارٍ تحميل بيانات الشيف
      </div>
    );
  }

  return (
    <Container className="py-5" style={{ direction: "rtl", fontFamily: "var(--secondary-font)" }}>
      <Row className="justify-content-center text-center mb-5">
        <Col xs={12}>
          <img
            src={chef.imageUrl}
            alt={chef.name}
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "4px solid rgb(156, 66, 29)",
              boxShadow: "0 4px 12px rgba(156,66,29,0.2)",
            }}
          />
          <h2 className="mt-3" style={{ color: "rgb(156, 66, 29)", fontWeight: "700" }}>{chef.name}</h2>
          <p className="mt-2 mx-auto" style={{
            maxWidth: "700px",
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.8"
          }}>
            {chef.bio}
          </p>
        </Col>
      </Row>

      <h4 className="text-center mb-4" style={{ color: "rgb(156, 66, 29)", fontWeight: "600" }}>وصفاتي</h4>

      {recipes.length === 0 ? (
        <p className="text-center text-muted">لا توجد وصفات مضافة بعد.</p>
      ) : (
        <Row className="justify-content-center">
          {recipes.map((recipe) => (
            <Col key={recipe.id} xs={6} md={4} lg={3} className="mb-4">
              <div
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  transition: "transform 0.3s ease",
                }}
                className="h-100 recipe-card"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <div className="text-center py-2" style={{
                  backgroundColor: "#fffaf7",
                  color: "#000",
                  fontWeight: "500",
                  fontSize: "15px"
                }}>
                  {recipe.title}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Chef;
