import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const tipsData = [
  "احرصي على تسخين المقلاة جيدًا قبل إضافة أي مكون، فهذا يساعد على طهي الطعام بشكل أفضل ويمنع الالتصاق.",
  "عند فرم الثوم، أضيفي رشة من الملح لتسهيل الفرم والحصول على نكهة أقوى.",
  "لمنع رائحة السمك من الالتصاق بيديك، افركيها بعصير الليمون بعد الغسل.",
  "احفظي الخضروات الورقية مغلفة في منشفة ورقية داخل علبة محكمة للحفاظ على نضارتها أطول فترة.",
  "لتقشير البيض بسهولة، أضيفي ملعقة من الخل الأبيض إلى ماء السلق.",
  "عند طهي الأرز، أضيفي قطرات من عصير الليمون ليبقى ناصع البياض ولامعًا.",
  "للتخلص من رائحة اليد بعد تقطيع البصل، افركيها بملعقة ستانلس تحت الماء.",
  "لا تضعي الثوم في الزيت قبل أن يسخن جيدًا، حتى لا يتحول طعمه إلى مر.",
  "للحفاظ على لون الخضار عند السلق، أضيفي القليل من الملح إلى ماء السلق.",
  "لتخزين الأعشاب الطازجة، قطعيها وجمّديها في مكعبات ثلج مع زيت الزيتون.",
  "لمنع فوران الحليب عند الغلي، ضعي ملعقة خشبية على حافة الوعاء.",
  "استخدمي بقايا الخبز لتحضير بقسماط منزلي بدلًا من رميه.",
  "لتحمير البصل بسرعة، أضيفي قليلًا من السكر أثناء القلي.",
  "احتفظي بالتوابل في مكان مظلم وجاف للحفاظ على نكهتها أطول فترة.",
  "قطعي اللحوم عكس اتجاه الألياف لتحصلي على قوام طري وسهل المضغ.",
  "لتحصلي على قشرة ذهبية مثالية، جففي اللحوم جيدًا قبل طهيها.",
  "لتحصلي على كيكة هشة، اخرجي الزبدة والبيض من الثلاجة قبل الاستخدام بساعة.",
  "لا تملئي المقلاة كثيرًا أثناء القلي حتى لا تنخفض حرارة الزيت.",
  "للحفاظ على لون الموز المقطع، رشي عليه قطرات من عصير الليمون.",
  "لتحسين طعم الطماطم المعلبة، أضيفي لها قليلًا من السكر أثناء الطبخ.",
  "جمدي بقايا الشوربة أو المرق في قوالب مكعبات الثلج لاستخدامها لاحقًا.",
  "عند فرم الأعشاب الطازجة، رشي القليل من الملح لمنع تطايرها.",
  "استخدمي عود خشبي لاختبار نضج الكيك، إذا خرج نظيفًا فالكيك جاهز.",
  "لتحصلي على بطاطس مقلية مقرمشة، انقعيها في ماء بارد قبل القلي.",
  "لتنظيف أواني الستانلس، افركيها بقليل من الخل والملح.",
  "استخدمي ميزان حرارة عند شواء اللحم لضمان النضج المثالي.",
  "اغسلي الفطر بمنديل مبلل بدل الماء ليحتفظ بنكهته وقوامه.",
  "لمنع التصاق العجين، رشي القليل من الزيت على سطح العمل.",
  "لتعزيز نكهة الحساء، أضيفي الأعشاب في آخر 10 دقائق من الطهي.",
  "ضعي ملعقة خشب على القدر المغلي لتمنعي الفوران المفاجئ.",
];

function TipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 5;

  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = tipsData.slice(indexOfFirstTip, indexOfLastTip);
  const totalPages = Math.ceil(tipsData.length / tipsPerPage);

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
    <Container style={{ fontFamily: "Cairo, sans-serif", marginTop: "4.3rem" }}>
      <h2
        className="text-center mb-4 fw-bold"
        style={{ color: "rgb(156, 66, 29)" }}
      >
        نصائح المطبخ
      </h2>

      <Row className="g-4 mb-4">
        {currentTips.map((tip, index) => (
          <Col md={12} key={index}>
            <Card
              style={{
                backgroundColor: "#fffaf1",
                borderRadius: "16px",
                padding: "1.5rem",
                border: "1px solid #eee",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
                direction: "rtl",
                color: "#4b3b2b",
              }}
            >
              {tip}
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="d-flex justify-content-center align-items-center gap-2 flex-wrap"
        style={{ direction: "rtl" }}
      >
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
          → السابق
        </Button>

        <div className="d-flex gap-2 flex-row-reverse">
          {[...Array(totalPages).keys()].reverse().map((index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={index}
                style={{
                  backgroundColor:
                    currentPage === pageNumber
                      ? "rgba(172, 71, 31, 0.67)"
                      : "transparent",
                  color:
                    currentPage === pageNumber ? "#fff" : "rgb(156, 66, 29)",
                  borderColor: "rgba(156, 65, 29, 0.58)",
                }}
                onClick={() => handlePageClick(pageNumber)}
                onMouseEnter={(e) => {
                  if (currentPage !== pageNumber) {
                    e.target.style.backgroundColor = "rgba(156, 65, 29, 0.58)";
                    e.target.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== pageNumber) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "rgb(156, 66, 29)";
                  }
                }}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

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
          التالي ←
        </Button>
      </div>
    </Container>
  );
}

export default TipsPage;
