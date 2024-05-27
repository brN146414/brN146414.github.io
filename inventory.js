document.addEventListener('DOMContentLoaded', () => {
  const inventoryList = document.getElementById('inventory-list');
  const pokemonDetails = document.getElementById('pokemon-details');
  let inventory = JSON.parse(localStorage.getItem('pokemonInventory')) || [];

  function renderInventory() {
    inventoryList.innerHTML = '';
    if (inventory.length === 0) {
      inventoryList.innerHTML = '<p>Você ainda não tem nenhum Pokémon na sua mochila.</p>';
    } else {
      inventory.forEach((pokemon, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${pokemon.number} - ${pokemon.name}
          <div class="button-container">
            <button class="button btn-show" data-index="${index}">Mostrar</button>
            <button class="button btn-remove" data-index="${index}">-</button>
          </div>
        `;
        inventoryList.appendChild(listItem);
      });
    }
  }

  function showPokemon(index) {
    const pokemon = inventory[index];
    pokemonDetails.innerHTML = ''; // Limpa o conteúdo anterior

    const pokemonName = pokemon.name.toUpperCase(); // Converte o nome para maiúsculas

    // Verifica se já existe um detalhe de Pokémon mostrado
    const existingDetails = document.querySelector('.pokemon-details .pokemon-info');
    if (existingDetails) {
      pokemonDetails.removeChild(existingDetails); // Remove o detalhe anterior se existir
    }

    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');
    pokemonInfo.innerHTML = `
      <h2>${pokemon.number} - ${pokemonName}</h2>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png" alt="${pokemonName}" />
    `;
    pokemonDetails.appendChild(pokemonInfo);
  }

  function removePokemon(index) {
    inventory.splice(index, 1);
    localStorage.setItem('pokemonInventory', JSON.stringify(inventory));
    renderInventory();
    pokemonDetails.innerHTML = '';
  }

  inventoryList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-show')) {
      const index = event.target.getAttribute('data-index');
      showPokemon(index);
    }

    if (event.target.classList.contains('btn-remove')) {
      const index = event.target.getAttribute('data-index');
      removePokemon(index);
    }
  });

  renderInventory();
});