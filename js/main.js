fetch('data/games.json')
  .then(response => response.json())
  .then(games => {
    const grid = document.getElementById('gameGrid');

    games.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');
      card.innerHTML = `
        <img src="${game.image}" alt="${game.title} cover">
        <h2>${game.title}</h2>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p>${game.insight}</p>
      `;
      grid.appendChild(card);
    });
  });