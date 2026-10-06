const HISTORY_KEY = "one-step:history";

/**
 * 완료한 한 걸음 기록 전체 가져오기
 */
export function getHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);

    if (!saved) {
      return [];
    }

    const history = JSON.parse(saved);

    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("한 걸음 기록을 불러오지 못했어요.", error);
    return [];
  }
}

/**
 * 완료한 한 걸음 기록 추가
 */
export function saveHistory(record) {
  try {
    const history = getHistory();

    const newRecord = {
      ...record,
      id: Date.now(),
      completedAt:
        record.completedAt || new Date().toISOString(),
    };

    const updatedHistory = [
      newRecord,
      ...history,
    ];

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    return newRecord;
  } catch (error) {
    console.error("한 걸음 기록을 저장하지 못했어요.", error);
    return null;
  }
}

/**
 * 특정 기록 삭제
 */
export function deleteHistory(id) {
  try {
    const history = getHistory();

    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    return updatedHistory;
  } catch (error) {
    console.error("한 걸음 기록을 삭제하지 못했어요.", error);
    return getHistory();
  }
}

/**
 * 모든 한 걸음 기록 삭제
 */
export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("한 걸음 기록 전체 삭제 실패:", error);
  }
}