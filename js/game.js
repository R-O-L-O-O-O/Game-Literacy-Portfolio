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
    document.getElementById("gameImage").src = game.image;
    document.getElementById("gameInsight").textContent = game.insight;

    const tagsContainer = document.getElementById("gameTags");

    game.tags.forEach(tag => {
      const tagEl = document.createElement("span");
      tagEl.classList.add("tag");
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

  });