async function loadFx() {
  const el = document.getElementById("fx");
  if (!el) return;
  el.textContent = "환율을 불러오는 중...";
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const krw = data && data.rates && data.rates.KRW;
    if (!krw) throw new Error("no rate");
    el.textContent = "1 USD ≈ " + Math.round(krw).toLocaleString("ko-KR") + " KRW";
  } catch (e) {
    el.textContent = "환율을 가져오지 못했습니다. 다시 시도해 주세요.";
  }
}

const fxBtn = document.getElementById("fx-refresh");
if (fxBtn) fxBtn.addEventListener("click", loadFx);
loadFx();

const dateInput = document.getElementById("dday-date");
const ddayOut = document.getElementById("dday-out");
if (dateInput && ddayOut) {
  dateInput.addEventListener("change", function () {
    if (!dateInput.value) return;
    const target = new Date(dateInput.value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((target - today) / 86400000);
    if (diff === 0) ddayOut.textContent = "오늘입니다.";
    else if (diff > 0) ddayOut.textContent = "D-" + diff;
    else ddayOut.textContent = "D+" + Math.abs(diff);
  });
}

const area = document.getElementById("count-text");
const countOut = document.getElementById("count-out");
if (area && countOut) {
  area.addEventListener("input", function () {
    const n = area.value.replace(/\s/g, "").length;
    countOut.textContent = n.toLocaleString("ko-KR") + "자 (공백 제외)";
  });
}
