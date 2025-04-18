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

const dingSound = document.getElementById('ding-sound'); 

doorLeft.classList.add('open');
doorRight.classList.add('open');

function abrirPortas() {
  doorLeft.classList.add('open');
  doorRight.classList.add('open');
  mostrarConteudoDoAndar(currentFloor);
}

function fecharPortas() {
  doorLeft.classList.remove('open');
  doorRight.classList.remove('open');
}

function chamarElevador(destino) {
  if (destino === currentFloor) return;

  const currentButton = buttons[currentFloor];
  const destinationButton = buttons[destino];

  currentButton.classList.add('transitioning');
  destinationButton.classList.add('transitioning');

  fecharPortas();

  if (!spotifyIniciado) {
    spotifyPlayer.src = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";
    spotifyContainer.classList.remove('hidden');
    spotifyIniciado = true;
  }

  let floorDifference = Math.abs(destino - currentFloor);
  let step = 0;

  const transitionInterval = setInterval(() => {
    const newFloor = currentFloor + (destino > currentFloor ? 1 : -1);
    elevator.classList.remove(`floor-${currentFloor}`);
    elevator.classList.add(`floor-${newFloor}`);
    currentFloor = newFloor;

    painel.textContent = currentFloor === 0 ? 'T' : currentFloor;
    updateButtonColors();

    step++;
    if (step >= floorDifference) {
      clearInterval(transitionInterval);
      currentButton.classList.remove('transitioning');
      destinationButton.classList.remove('transitioning');
      destinationButton.classList.add('active');
      abrirPortas();
      dingSound.play(); 
    }
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

function mostrarConteudoDoAndar(floor) {
  const conteudo = document.getElementById('andar-label');
  conteudo.classList.remove('fade');

  switch (floor) {
    case 0:
      conteudo.textContent = 'Térreo - Bem-vindo!';
      conteudo.style.backgroundImage = "url('imagens/hall.jpg')";
      break;
    case 1:
      conteudo.textContent = '1º Andar - Escritório Administrativo';
      conteudo.style.backgroundImage = "url('imagens/escritorio.jpg')";
      break;
    case 2:
      conteudo.textContent = '2º Andar - Laboratório de Pesquisa';
      conteudo.style.backgroundImage = "url('imagens/laboratorio.jpg')";
      break;
    case 3:
      conteudo.textContent = '3º Andar - Café Lounge ☕';
      conteudo.style.backgroundImage = "url('imagens/cafe.jpg')";
      break;
  }
}
