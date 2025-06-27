import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <Container style={{ marginTop: "4rem", fontFamily: "Cairo, sans-serif", direction: "rtl" }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(156, 66, 29)" }}>
            من نحن
          </h2>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            <strong>Food Zone</strong> ليس مجرد موقع لوصفات الطعام، بل هو مساحة رقمية نابضة بالحياة، وُلدت من شغف حقيقي بفن الطبخ، وسعي دائم نحو تقديم الأفضل لعشاق المذاق الرفيع.  
            نحن نؤمن أن كل وصفة تحمل قصة، وكل طبق يعبّر عن ثقافة، ولذلك أنشأنا هذا الموقع ليكون جسرًا يربطك بمطابخ العالم، ونقطة التقاء بين محبي الطبخ من كل مكان.
          </p>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            يقدم موقع <strong>Food Zone</strong> تشكيلة واسعة من الوصفات العربية الأصيلة التي تعبق برائحة البيوت، إلى جانب وصفات عالمية راقية مستوحاة من أشهر المطابخ الدولية.  
            سواء كنتِ تبحثين عن أكلة فلسطينية تراثية، أو طبق إيطالي أنيق، أو حلوى فرنسية فاخرة – ستجدين هنا وصفات دقيقة، مصممة بعناية لتنجح معك من أول تجربة.
          </p>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            لا نعتمد فقط على جمع الوصفات، بل نحرص على أن تكون المحتويات أصلية، مدروسة، ومجربة من قبل نخبة من أمهر الطهاة والخبراء في مجال الطبخ.  
            كل وصفة تخضع للتدقيق والتجربة، وتُقدَّم لك بخطوات واضحة وصور إرشادية تجعل من إعدادها متعة وسهولة في آنٍ واحد.
          </p>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            نؤمن بأن الشيف هو قلب المطبخ، وصانع الذوق الحقيقي. لذلك، اخترنا بعناية مجموعة من الطهاة المميزين الذين ينقلون خبراتهم، أسرارهم، ولمساتهم الخاصة بكل حب وشغف.  
            هؤلاء الشيفات لا يقدمون وصفات فقط، بل يمنحونك تجربة فريدة، وإلهامًا يوميًا داخل مطبخك.
          </p>

          <div className="text-center my-4">
            <Link to="/chefs">
              <Button
                style={{
                  backgroundColor: "rgb(156, 66, 29)",
                  borderColor: "rgb(156, 66, 29)",
                  fontSize: "1.1rem",
                  padding: "0.6rem 1.8rem",
                }}
              >
                مشاهدة الشيفات المميزين
              </Button>
            </Link>
          </div>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            في <strong>Food Zone</strong>، نضع بين يديك محتوىً أصيلًا، بأسلوب عصري وواجهة أنيقة وسهلة الاستخدام.  
            هدفنا أن نكون المرجع الأول لكل من يبحث عن الإلهام في الطبخ، وأن نرافقك في رحلتك اليومية لاكتشاف نكهات جديدة، وإعداد وجبات مليئة بالحب.
          </p>

          <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "#4b3b2b" }}>
            سواء كنتِ طاهية مبتدئة أو محترفة، ستجدين هنا ما يلهمك.  
            لأننا نعلم أن الطبخ لا يُقاس بالمكونات فقط، بل بالإحساس، وبكل لحظة تُقضى في المطبخ لصناعة ذكريات لا تُنسى.
          </p>

          <p className="mt-4 mb-5 text-center" style={{ fontSize: "1.3rem", color: "#a33d1e" }}>
            انضمي إلينا اليوم، ودعي Food Zone يكون رفيقك في كل وصفة، ونكهة، وقصة ❤
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
