import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAiCache } from "../utils/aiCache";
import {
  getHistory,
  deleteHistory,
  clearHistory,
} from "../utils/oneStepHistory";

export default function FruitBasketPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "이 한 걸음 기록을 삭제할까요?"
    );

    if (!shouldDelete) {
      return;
    }

    const updatedHistory = deleteHistory(id);

    setHistory(updatedHistory);
  };

  const handleClearAll = () => {
    if (history.length === 0) {
      return;
    }

    const shouldDelete = window.confirm(
      "완료한 한 걸음 기록을 모두 삭제할까요?"
    );

    if (!shouldDelete) {
      return;
    }

    clearHistory();

    setHistory([]);
  };

  const handleGoHome = () => {
    // 한 사이클 완료 후 AI 캐시 초기화
    // 완료 기록은 그대로 유지
    clearAiCache();

    navigate("/");
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="page-container">
      <section className="form-panel">

        <div className="section-heading">
          <span className="section-index">10</span>

          <h2>
            나의 한 걸음이
            <br />
            과일 바구니에 쌓였어요.
          </h2>
        </div>

        <p className="section-description">
          완료한 작은 행동들이 기록되어 있어요.
          <br />
          내가 해낸 한 걸음을 다시 확인해보세요.
        </p>

        {/* 과일 개수 */}
        <div
          style={{
            textAlign: "center",
            margin: "25px 0 30px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              lineHeight: 1,
            }}
          >
            {history.length > 0
              ? "🍎".repeat(Math.min(history.length, 10))
              : "🍃"}
          </div>

          <div
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "#777",
            }}
          >
            지금까지 {history.length}개의 한 걸음
          </div>
        </div>

        {/* 기록 목록 */}
        {history.length === 0 ? (
          <div
            style={{
              padding: "30px 20px",
              textAlign: "center",
              borderRadius: "14px",
              background: "#f7f7f7",
              color: "#777",
              lineHeight: 1.7,
            }}
          >
            아직 완료한 한 걸음이 없어요.
            <br />
            첫 번째 한 걸음을 시작해보세요.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "18px 18px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#999",
                    }}
                  >
                    {formatDate(item.completedAt)}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#999",
                      cursor: "pointer",
                      padding: "2px 4px",
                      fontSize: "12px",
                    }}
                  >
                    기록 삭제
                  </button>
                </div>

                {item.project && (
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "13px",
                      color: "#777",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.project}
                  </div>
                )}

                {item.goal && (
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className="preview-label"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      목표
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.goal}
                    </div>
                  </div>
                )}

                {item.task && (
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className="preview-label"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      작은 과제
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.task}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #eee",
                  }}
                >
                  <div
                    className="preview-label"
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    오늘의 한 걸음
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 전체 삭제 */}
        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
              color: "#999",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            전체 기록 삭제
          </button>
        )}

        {/* 홈 이동 */}
        <button
          type="button"
          className="priority-button"
          onClick={handleGoHome}
          style={{ marginTop: "12px" }}
        >
          새로운 한 걸음 시작하기
        </button>

      </section>
    </main>
  );
}