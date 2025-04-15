let currentFloor = 0;
const elevator = document.getElementById('elevator');
const doorLeft = document.querySelector('.door.left');
const doorRight = document.querySelector('.door.right');
const label = document.getElementById('andar-label');
const painel = document.getElementById('painel-display');
const nomeAndar = ['Térreo', '1º Andar', '2º Andar', '3º Andar'];

const spotifyContainer = document.getElementById('spotify-container');
const spotifyPlayer = document.getElementById('spotify-player');
let spotifyIniciado = false;

function abrirPortas() {
  doorLeft.classList.add('open');
  doorRight.classList.add('open');
}

function fecharPortas() {
  doorLeft.classList.remove('open');
  doorRight.classList.remove('open');
}

function chamarElevador(destino) {
  if (destino === currentFloor) return;

  fecharPortas();

  if (!spotifyIniciado) {
    spotifyPlayer.src = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";
    spotifyContainer.classList.remove('hidden');
    spotifyIniciado = true;
  }

  setTimeout(() => {
    elevator.classList.remove(`floor-${currentFloor}`);
    elevator.classList.add(`floor-${destino}`);
    currentFloor = destino;

    painel.textContent = currentFloor === 0 ? 'T' : currentFloor;
    label.textContent = nomeAndar[currentFloor];

    setTimeout(() => {
      abrirPortas();
    }, 1000);
  }, 1000);
}
