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

  let floorDifference = Math.abs(destino - currentFloor);
  let step = 0;

  // Transição gradual
  const transitionInterval = setInterval(() => {
    // Atualiza a posição do elevador
    const newFloor = currentFloor + (destino > currentFloor ? 1 : -1);
    elevator.classList.remove(`floor-${currentFloor}`);
    elevator.classList.add(`floor-${newFloor}`);
    currentFloor = newFloor;

    // Atualiza painel
    painel.textContent = currentFloor === 0 ? 'T' : currentFloor;
    label.textContent = nomeAndar[currentFloor];

    // Atualiza a cor do botão enquanto a transição ocorre
    updateButtonColors();

    // Verifica se a transição foi concluída
    step++;
    if (step >= floorDifference) {
      clearInterval(transitionInterval);
      currentButton.classList.remove('transitioning');
      destinationButton.classList.remove('transitioning');
      destinationButton.classList.add('active');
      abrirPortas();
    }
  }, 1000); // A cada 1 segundo faz um passo na transição
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
