let currentFloor = 0;
const elevator = document.getElementById('elevator');
const doorLeft = document.querySelector('.door.left');
const doorRight = document.querySelector('.door.right');
const label = document.getElementById('andar-label');

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
 
    const painel = document.getElementById('painel-display');
painel.textContent = destino === 0 ? 'T' : destino;


  setTimeout(() => {
    elevator.classList.remove(`floor-${currentFloor}`);
    elevator.classList.add(`floor-${destino}`);
    currentFloor = destino;

    setTimeout(() => {
        abrirPortas();
        const nomes = ['Térreo', '1º Andar', '2º Andar', '3º Andar'];
        label.textContent = nomes[destino];
        painel.textContent = destino === 0 ? 'T' : destino;
      }, 2000);
  }, 1000);
}
