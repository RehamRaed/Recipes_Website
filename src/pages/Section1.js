import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";
import { db } from "../../src/firebase";
import listImg from "../assets/5a584012ee4f28ee565e4c81f9e45214-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";

function Section1() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [newRecipes, setNewRecipes] = useState([]);
  const [ourPicks, setOurPicks] = useState([]);
  const [todayRecipe, setTodayRecipe] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingToday, setLoadingToday] = useState(true);
  const [loadingSelected, setLoadingSelected] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (menuItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % menuItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [menuItems]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoadingMenu(true);
      const dishTypes = ["أكلات رئيسية", "مقبلات", "مشروبات"];
      const promises = dishTypes.map(async (type) => {
        const q = query(
          collection(db, "recipes"),
          where("dishType", "==", type)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return docs.length > 0
          ? docs[Math.floor(Math.random() * docs.length)]
          : null;
      });

      const results = await Promise.all(promises);
      setMenuItems(results.filter((item) => item !== null));
      setLoadingMenu(false);
    };

    const fetchTodayRecipe = async () => {
      setLoadingToday(true);
      const q = query(
        collection(db, "recipes"),
        where("category", "==", "today")
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (docs.length > 0) setTodayRecipe(docs[0]);
      setLoadingToday(false);
    };

    const fetchSelectedRecipes = async () => {
      setLoadingSelected(true);
      const latestQuery = query(
        collection(db, "recipes"),
        where("category", "==", "new")
      );
      const ourPickQuery = query(
        collection(db, "recipes"),
        where("category", "==", "ourChoices")
      );

      const [latestSnap, ourPickSnap] = await Promise.all([
        getDocs(latestQuery),
        getDocs(ourPickQuery),
      ]);

      setNewRecipes(
        latestSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .slice(0, 4)
      );
      setOurPicks(
        ourPickSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .slice(0, 4)
      );
      setLoadingSelected(false);
    };

    fetchMenuItems();
    fetchTodayRecipe();
    fetchSelectedRecipes();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const q = query(
        collection(db, "recipes"),
        where("title", ">=", value),
        where("title", "<=", value + "\uf8ff")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <div style={{ position: "relative", marginBottom: "5rem" }}>
        <input
          type="text"
          placeholder="ابحث عن وصفة"
          value={search}
          onChange={handleSearch}
          className="search"
        />
        <div
          className={`search-results ${
            search && results.length > 0 ? "show" : ""
          }`}
          style={{
            position: "absolute",
            background: "#fff",
            zIndex: 1000,
            width: "100%",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {results.slice(0, 5).map((recipe) => (
            <div key={recipe.id} className="text-center p-2 border-bottom">
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: "none", color: "darkblue" }}
              >
                {recipe.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Container className="container">
        <Row>
          <Col md={9} className="d-flex flex-column">
            <Row>
              <Col md={7}>
                {loadingMenu ? (
                  <div
                    style={{
                      height: "348px",
                      borderRadius: "10px",
                      backgroundColor: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                      fontSize: "1.2rem",
                    }}
                  >
                    جارٍ تحميل المنيو...
                  </div>
                ) : (
                  menuItems.length > 0 &&
                  menuItems[current] && (
                    <div className="carousel-container">
                      <div
                        className="carousel-image-wrapper"
                        style={{ position: "relative" }}
                      >
                        <img
                          src={menuItems[current].imageUrl}
                          alt={menuItems[current].title}
                          className="carousel-image"
                          onClick={() =>
                            navigate(`/recipe/${menuItems[current].id}`)
                          }
                          style={{ cursor: "pointer", borderRadius: "10px" }}
                        />
                        <div className="image-overlay-text">
                          <div className="overlay-title">منيو اليوم</div>
                          <div className="overlay-subtitle">
                            يتضمن بعض المقبلات ، طبق <br /> رئيسي ، ومشروب
                          </div>
                        </div>
                        <div className="carousel-overlay">
                          <div className="carousel-title">
                            {menuItems[current].dishType}:{" "}
                            {menuItems[current].title}
                          </div>
                          <div className="carousel-arrows">
                            <button
                              onClick={() =>
                                setCurrent(
                                  (prev) =>
                                    (prev - 1 + menuItems.length) %
                                    menuItems.length
                                )
                              }
                              className="arrow-btn"
                            >
                              ❮
                            </button>
                            <button
                              onClick={() =>
                                setCurrent(
                                  (prev) => (prev + 1) % menuItems.length
                                )
                              }
                              className="arrow-btn"
                            >
                              ❯
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </Col>

              <Col md={5}>
                {loadingToday ? (
                  <div
                    style={{
                      height: "348px",
                      borderRadius: "15px",
                      backgroundColor: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                    }}
                  >
                    جارٍ تحميل وصفة اليوم...
                  </div>
                ) : todayRecipe ? (
                  <div
                    onClick={() => navigate(`/recipe/${todayRecipe.id}`)}
                    style={{
                      background: "#fff",
                      borderRadius: "15px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      padding: "10px",
                      cursor: "pointer",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={todayRecipe.imageUrl}
                      alt={todayRecipe.title}
                      style={{
                        width: "100%",
                        height: "287px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                    />
                    <div className="image-overlay-text2">وصفة اليوم</div>
                    <h5 style={{ textAlign: "center", fontWeight: "600" }}>
                      {todayRecipe.title}
                    </h5>
                  </div>
                ) : (
                  <p>لا توجد وصفة اليوم</p>
                )}
              </Col>
            </Row>

            <Row className="mt-5">
              <Col md={6}>
                <h2 className="title">أجدد الوصفات والطبخات</h2>
                {loadingSelected ? (
                  <div
                    style={{
                      height: "230px",
                      backgroundColor: "#eee",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >
                    جارٍ تحميل أجدد الوصفات...
                  </div>
                ) : newRecipes.length > 0 ? (
                  <div>
                    <div
                      onClick={() => navigate(`/recipe/${newRecipes[0].id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={newRecipes[0].imageUrl}
                        alt={newRecipes[0].title}
                        className="img-fluid rounded"
                        style={{
                          height: "230px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <h5 className="text-center mt-2 fw-bold ">
                        {newRecipes[0].title}
                      </h5>
                    </div>
                    <hr className="mt-4" />
                    <ul className="list-unstyled pt-2">
                      {newRecipes.slice(1, 4).map((recipe) => (
                        <li
                          key={recipe.id}
                          onClick={() => navigate(`/recipe/${recipe.id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          • {recipe.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>لا توجد وصفات جديدة</p>
                )}
              </Col>

              <Col md={6}>
                <h2 className="title">وصفات وطبخات من اختيارنا</h2>
                {loadingSelected ? (
                  <div
                    style={{
                      height: "230px",
                      backgroundColor: "#eee",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >
                    جارٍ تحميل وصفاتنا المختارة...
                  </div>
                ) : ourPicks.length > 0 ? (
                  <div>
                    <div
                      onClick={() => navigate(`/recipe/${ourPicks[0].id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={ourPicks[0].imageUrl}
                        alt={ourPicks[0].title}
                        className="img-fluid rounded"
                        style={{
                          height: "230px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <h5 className="text-center mt-2 fw-bold ">
                        {ourPicks[0].title}
                      </h5>
                    </div>
                    <hr className="mt-4" />
                    <ul className="list-unstyled ">
                      {ourPicks.slice(1, 4).map((recipe) => (
                        <li
                          key={recipe.id}
                          onClick={() => navigate(`/recipe/${recipe.id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          • {recipe.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>لا توجد وصفات مختارة</p>
                )}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <div className="side-list">
              <h4>الوصفات</h4>
              <h2>الأكثر تداولاً</h2>
              <ul>
                {[
                  "كبسة دجاج",
                  "حلى سهل وسريع",
                  "بيتزا خضار",
                  "شاورما على الأصول الشامية",
                  "حلى القهوة",
                  "بان كيك صحي",
                  "كوكيز بالنوتيلا",
                  "مشروب الصيف المنعش",
                  "ريزوتو بالفطر",
                  "شوربة عدس بالقرع",
                  "ميلك شيك فراولة",
                  "دولمة عراقية",
                  "معمول العيد بالحلقوم",
                  "شوربة الفطر بالكريمة",
                ].map((title, index) => (
                  <li
                    key={index}
                    onClick={async () => {
                      const q = query(
                        collection(db, "recipes"),
                        where("title", "==", title)
                      );
                      const snapshot = await getDocs(q);
                      if (!snapshot.empty) {
                        const doc = snapshot.docs[0];
                        navigate(`/recipe/${doc.id}`);
                      } else {
                        alert("الوصفة غير موجودة");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {title}
                  </li>
                ))}
              </ul>
              <div
                className="text-center"
                style={{ height: "100px", overflow: "hidden" }}
              >
                <img src={listImg} style={{ height: "200px" }} alt="وصفات" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Section1;
