import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ActionStartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const action = location.state?.action || "이력서 확인하기";

  return (
    <main className="page-container">
      <section className="form-panel">
        <div className="section-heading">
          <span className="section-index">05</span>
          <h2>오늘 이것부터 시작할 수 있나요?</h2>
        </div>

        <p className="section-description">{action}</p>

        <div className="priority-buttons">
          <button
            className="priority-button"
            onClick={() =>
              navigate("/today-action", { state: { action } })
            }
          >
            네, 시작할 수 있어요
          </button>

          <button
            className="priority-button"
            onClick={() =>
              navigate("/action-shrink", { state: { action } })
            }
          >
            조금 부담스러워요
          </button>
        </div>
      </section>
    </main>
  );
}