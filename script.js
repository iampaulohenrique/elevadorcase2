let currentFloor = 0;
const elevator = document.getElementById('elevator');
const doorLeft = document.querySelector('.door.left');
const doorRight = document.querySelector('.door.right');
const label = document.getElementById('andar-label');
const painel = document.getElementById('painel-display');
const nomeAndar = ['Térreo', '1º Andar', '2º Andar', '3º Andar'];

const buttons = {
  0: document.getElementById('btn-0'),
  1: document.getElementById('btn-1'),
  2: document.getElementById('btn-2'),
  3: document.getElementById('btn-3'),
};

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

  // Inicia a transição de cor dos botões
  const currentButton = buttons[currentFloor];
  const destinationButton = buttons[destino];

  currentButton.classList.add('transitioning');
  destinationButton.classList.add('transitioning');

  // Fechar portas e iniciar transição do elevador
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

    // Atualiza os botões
    updateButtonColors();

    setTimeout(() => {
      abrirPortas();
      currentButton.classList.remove('transitioning');
      destinationButton.classList.remove('transitioning');
      destinationButton.classList.add('active');
    }, 1000);
  }, 1000);
}

function updateButtonColors() {
  for (let floor in buttons) {
    const button = buttons[floor];
    if (parseInt(floor) === currentFloor) {
      button.classList.add('active');
      button.classList.remove('transitioning');
    } else {
      button.classList.remove('active');
      button.classList.remove('transitioning');
    }
  }
}
