(() => {
  const sky = document.querySelector(".post-sky");

  function updateSky() {
    const hour = new Date().getHours();
    sky.dataset.period = hour >= 6 && hour < 12 ? "morning"
      : hour >= 12 && hour < 17 ? "afternoon"
      : hour >= 17 && hour < 21 ? "evening"
      : "night";
  }

  updateSky();
  window.setInterval(updateSky, 60_000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateSky();
  });
})();
