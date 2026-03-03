let allGames = [];
let activeFilters = [];

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

    if (filterValue === "all") {
      activeFilters = [];

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active"); // Make "All" active again
      renderGames(allGames);
      return;
    }

    if (activeFilters.includes(filterValue)) {
      activeFilters = activeFilters.filter(f => f !== filterValue);
      button.classList.remove("active");
    } else {
      activeFilters.push(filterValue);
      button.classList.add("active");
    }

    // Deactivate "All" when other filters are used
    document.querySelector('[data-filter="all"]').classList.remove("active");
    
    applyFilters();
  });
});

function applyFilters() {
  if (activeFilters.length === 0) {
    renderGames(allGames);
    return;
  }

  const filteredGames = allGames.filter(game =>
    activeFilters.every(filter =>
      game.tags.includes(filter)
    )
  );

  renderGames(filteredGames);
}