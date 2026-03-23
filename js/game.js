const params = new URLSearchParams(window.location.search);
const gameTitle = params.get("title");

let currentIndex = 0;
let screenshots = [];

fetch("data/games.json")
  .then(response => response.json())
  .then(games => {

    const game = games.find(g => g.title === gameTitle);

    if (!game) return;

    document.getElementById("gameHero").style.backgroundImage = `url(${game.banner})`;
    document.getElementById("gameTitle").textContent = game.title;
    document.getElementById("gamePlatformMeta").textContent = game.platform;
    document.getElementById("gameDescription").textContent = game.insight;
    document.getElementById("coverImage").src = game.image;
    document.getElementById("gameTrailer").src = game.trailer;
    document.getElementById("gameReview").textContent = game.review;

    const genresContainer = document.getElementById("gameGenres");

    game.tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      span.classList.add("genre-tag");
      genresContainer.appendChild(span);
    });

    const screenshotContainer = document.getElementById("gameScreenshots");

    screenshots = game.screenshots;

    screenshots.forEach((src, index) => {

      const img = document.createElement("img");
      img.src = src;

      img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
      });

      screenshotContainer.appendChild(img);

    });

    function openLightbox() {
      document.getElementById("lightboxImage").src = screenshots[currentIndex];
      document.getElementById("lightbox").classList.remove("hidden");
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % screenshots.length;
      updateImage();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
      updateImage();
    }

    function updateImage() {
      document.getElementById("lightboxImage").src = screenshots[currentIndex];
    }

    document.getElementById("nextBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      showNext();
    });

    document.getElementById("prevBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      showPrev();
    });

    document.getElementById("lightbox").addEventListener("click", () => {
      document.getElementById("lightbox").classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
      const lightbox = document.getElementById("lightbox");

      if (lightbox.classList.contains("hidden")) return;

      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") lightbox.classList.add("hidden");
    });

  });