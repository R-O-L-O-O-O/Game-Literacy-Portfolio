let allGames = [];

const grid = document.getElementById("gameGrid");
const filterButtons = document.querySelectorAll(".filters button");

fetch("data/games.json")
  .then(response => response.json())
  .then(games => {
    allGames = games;
    renderGames(allGames);
  });

function renderGames(games) {
  grid.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="game-image">
      <h2>${game.title}</h2>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p>${game.insight}</p>
    `;

    grid.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    if (filterValue === "all") {
      renderGames(allGames);
    } else {
      const filteredGames = allGames.filter(game =>
        game.tags.includes(filterValue)
      );
      renderGames(filteredGames);
    }
  });
});