const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
document.addEventListener('DOMContentLoaded', () => {
  const btnAddToBag = document.querySelector('.btn-add-to-bag');
  const pokemonNumberElement = document.querySelector('.pokemon__number');
  const pokemonNameElement = document.querySelector('.pokemon__name');

  btnAddToBag.addEventListener('click', () => {
    const pokemonNumber = pokemonNumberElement.textContent.trim();
    const pokemonName = pokemonNameElement.textContent.trim();

    if (pokemonNumber && pokemonName) {
      const pokemon = {
        number: pokemonNumber,
        name: pokemonName
      };

      let inventory = JSON.parse(localStorage.getItem('pokemonInventory')) || [];
      inventory.push(pokemon);
      localStorage.setItem('pokemonInventory', JSON.stringify(inventory));

      alert(`${pokemonName} foi adicionado à sua mochila!`);
    } else {
      alert('Nenhum Pokémon selecionado.');
    }
  });
});