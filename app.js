const STORAGE_KEY = "ffArenaTournaments";

const defaultTournaments = [
  {
    id: 1,
    title: "کاستوم رایگان",
    mode: "Squad",
    entry: 0,
    prize: "جایزه ویژه",
    date: "امروز",
    time: "21:00",
    capacity: 4,
    rules: "رعایت قوانین بازی و حضور به‌موقع الزامی است.",
    image: ""
  }
];

function getTournaments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultTournaments)
      );
      return defaultTournaments;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("خطا در دریافت مسابقات:", error);
    return defaultTournaments;
  }
}

function saveTournaments(tournaments) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tournaments)
  );
}

function renderTournaments() {
  const container = document.getElementById("tournaments");

  if (!container) return;

  const tournaments = getTournaments();

  if (tournaments.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        هنوز مسابقه‌ای برای نمایش وجود ندارد.
      </div>
    `;
    return;
  }

  container.innerHTML = tournaments.map(tournament => `
    <article class="tournament-card">

      <div class="tournament-image">
        ${
          tournament.image
            ? `<img src="${tournament.image}" alt="${tournament.title}">`
            : `<div class="ff-logo">FF<br><span>ARENA</span></div>`
        }
      </div>

      <div class="tournament-content">

        <h3>${escapeHTML(tournament.title)}</h3>

        <div class="tournament-info">
          <span>🎮 ${escapeHTML(tournament.mode)}</span>
          <span>👥 ${tournament.capacity} نفر</span>
        </div>

        <div class="tournament-prize">
          🏆 ${escapeHTML(tournament.prize)}
        </div>

        <div class="tournament-info">
          <span>💰 ورودی: ${tournament.entry.toLocaleString()} تومان</span>
          <span>🕐 ${escapeHTML(tournament.time)}</span>
        </div>

        <button
          class="join-btn"
          onclick="joinTournament(${tournament.id})">
          ثبت‌نام
        </button>

      </div>

    </article>
  `).join("");
}

function joinTournament(id) {
  const tournaments = getTournaments();
  const tournament = tournaments.find(item => item.id === id);

  if (!tournament) return;

  const playerName = prompt("نام بازیکن را وارد کنید:");

  if (!playerName || !playerName.trim()) {
    alert("لطفاً نام بازیکن را وارد کنید.");
    return;
  }

  const phone = prompt("شماره موبایل را وارد کنید:");

  if (!phone || !/^09\d{9}$/.test(phone.trim())) {
    alert("شماره موبایل صحیح نیست.");
    return;
  }

  const accepted = confirm(
    `ثبت‌نام برای «${tournament.title}» انجام شود؟`
  );

  if (!accepted) return;

  const registrations =
    JSON.parse(
      localStorage.getItem("ffArenaRegistrations") || "[]"
    );

  registrations.push({
    id: Date.now(),
    tournamentId: tournament.id,
    tournamentTitle: tournament.title,
    playerName: playerName.trim(),
    phone: phone.trim(),
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(
    "ffArenaRegistrations",
    JSON.stringify(registrations)
  );

  alert("ثبت‌نام شما با موفقیت ثبت شد ✅");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTournaments();
});
