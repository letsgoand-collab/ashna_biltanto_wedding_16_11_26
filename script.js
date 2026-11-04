// Wedding date/time: 16 November 2026 at 10:00 AM India Standard Time.
// Change the time below once the church ceremony time is confirmed.
const weddingDate = new Date("2026-11-16T10:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;
  const ids = ["days", "hours", "minutes", "seconds"];

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p class='body-copy'>Today is the day! We look forward to celebrating with you.</p>";
    return;
  }

  const values = [
    Math.floor(distance / (1000 * 60 * 60 * 24)),
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    Math.floor((distance % (1000 * 60)) / 1000)
  ];

  ids.forEach((id, index) => {
    document.getElementById(id).textContent =
      String(values[index]).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal sections gently as visitors scroll.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Music starts only after a visitor presses the button.
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicIcon.textContent = "Ⅱ";
      musicLabel.textContent = "PAUSE MUSIC";
    } catch (error) {
      musicLabel.textContent = "ADD MUSIC FILE";
      alert("Add your romantic-piano.mp3 file to the assets folder, then try again.");
    }
  } else {
    music.pause();
    musicIcon.textContent = "♫";
    musicLabel.textContent = "PLAY MUSIC";
  }
});