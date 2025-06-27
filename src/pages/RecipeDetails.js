import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserContext";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() });

          if (user) {
            const favRef = doc(db, "users", user.uid, "favorites", id);
            const favSnap = await getDoc(favRef);
            setIsFavorite(favSnap.exists());
          }
        } else {
          console.log("No such recipe!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const favRef = doc(db, "users", user.uid, "favorites", id);

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        setIsFavorite(false);
      } else {
        await setDoc(favRef, {
          recipeId: id,
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          createdAt: new Date(),
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  if (!recipe)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fffaf4",
          fontFamily: "var(--secondary-font)",
          color: "#555",
        }}
      >
        <p style={{ fontSize: "1.3rem" }}>...جارٍ تحميل الوصفة</p>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "2.5rem",
        background: "linear-gradient(to top left, #fff7f0, #fffbf8)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        fontFamily: "Cairo, sans-serif",
        direction: "rtl",
        color: "#4b3b2b",
        lineHeight: "1.8",
        position: "relative",
      }}
    >
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgb(255, 219, 193)",
            color: "rgb(123, 38, 0)",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontWeight: "bold",
            zIndex: 9999,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: showAlert ? 1 : 0,
            whiteSpace: "nowrap",
          }}
        >
          يجب تسجيل الدخول لإضافة الوصفة إلى المفضلة
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="main-title">{recipe.title}</h1>
        <i
          className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
          onClick={toggleFavorite}
          style={{
            fontSize: "2rem",
            color: isFavorite ? "#ffd700" : "#bbb",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        ></i>
      </div>

      <div
        style={{
          overflow: "hidden",
          width: "100%",
          maxHeight: "400px",
          borderRadius: "14px",
          marginBottom: "2rem",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "400px",
            display: "block",
          }}
        />
      </div>

      <p
        style={{
          marginBottom: "2rem",
          fontSize: "1.2rem",
          color: "#5a4d3d",
          backgroundColor: "#fef3e6",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {recipe.description}
      </p>

      <h3
        style={{
          color: "#7b2600",
          borderBottom: "2px solid #d2691e",
          paddingBottom: "6px",
          marginBottom: "1rem",
          fontWeight: "700",
          fontSize: "1.4rem",
        }}
      >
        المكونات:
      </h3>

      <div
        style={{
          fontSize: "1.1rem",
          color: "#3e3e3e",
          marginBottom: "2.5rem",
          lineHeight: "1.8",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {recipe.ingredients.split("\n").map((ing, idx) => (
          <p key={idx} style={{ margin: "0 0 0.5rem 0" }}>
            {ing}
          </p>
        ))}
      </div>

      <h3
        style={{
          color: "#7b2600",
          borderBottom: "2px solid #d2691e",
          paddingBottom: "6px",
          marginBottom: "1rem",
          fontWeight: "700",
          fontSize: "1.4rem",
        }}
      >
        طريقة التحضير:
      </h3>

      <p
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "1.1rem",
          color: "#3e3e3e",
          backgroundColor: "#fdf0e4",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {recipe.steps}
      </p>
    </div>
  );
}

export default RecipeDetails;
