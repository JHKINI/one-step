import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TodayActionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const action = location.state?.action || "이력서 확인하기";

  return (
    <main className="page-container">
      <section className="form-panel">
        <div className="section-heading">
          <span className="section-index">07</span>
          <h2>오늘의 한 걸음</h2>
        </div>

        <p className="section-description">
          오늘은 이것 하나만 해보세요.
        </p>

        <h3>{action}</h3>

        <button
          className="button-primary"
          onClick={() =>
            navigate("/execute", { state: { action } })
          }
        >
          시작하기 →
        </button>
      </section>
    </main>
  );
}