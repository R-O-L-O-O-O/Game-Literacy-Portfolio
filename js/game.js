const params = new URLSearchParams(window.location.search);
const gameTitle = params.get("title");

fetch("data/games.json")
  .then(response => response.json())
  .then(games => {

    const game = games.find(g => g.title === gameTitle);

    if (!game) return;

    document.getElementById("gameHero").style.backgroundImage = `url(${game.banner})`;
    document.getElementById("gameTitle").textContent = game.title;
    document.getElementById("gamePlatform").textContent = game.platform;
    document.getElementById("gameInsight").textContent = game.insight;
    document.getElementById("coverImage").src = game.image;
    document.getElementById("gameTrailer").src = game.trailer;
    document.getElementById("gameReview").textContent = game.review;

    const tagsContainer = document.getElementById("gameTags");
 
    game.tags.forEach(tag => {
      const tagEl = document.createElement("span");
      tagEl.classList.add("tag");
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

    const screenshotContainer = document.getElementById("gameScreenshots");

    game.screenshots.forEach(src => {

      const img = document.createElement("img");
      img.src = src;

      img.addEventListener("click", () => {
        document.getElementById("lightboxImage").src = src;
        document.getElementById("lightbox").classList.remove("hidden");
      });

      screenshotContainer.appendChild(img);

    });

    document.getElementById("lightbox").addEventListener("click", () => {
      document.getElementById("lightbox").classList.add("hidden");
    });

  });