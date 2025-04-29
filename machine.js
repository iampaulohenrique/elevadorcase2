document.addEventListener("DOMContentLoaded", function () {

    const DOCE_PRECOS = {
      A: 6,
      B: 7,
      C: 8,
    };
  
    let saldo = 0;
    const saldoElement = document.getElementById('saldo-value');
    const mensagemElement = document.getElementById('mensagem');
    const itensCarrinhoElement = document.getElementById('itens-carrinho');
  
    // Função para inserir moedas
    function inserirMoeda(valor) {
      saldo += valor;
      saldoElement.textContent = saldo.toFixed(2); 
    }
  
    // Função para comprar doces
    function comprarDoce(tipo) {
      if (saldo >= DOCE_PRECOS[tipo]) {
        saldo -= DOCE_PRECOS[tipo];
        saldoElement.textContent = saldo.toFixed(2); 
        adicionarAoCarrinho(tipo); 
        mensagemElement.textContent = `Você comprou o Doce ${tipo}!`;
      } else {
        mensagemElement.textContent = 'Saldo insuficiente!'; 
      }
    }
  
    // Função para adicionar doce ao carrinho
    function adicionarAoCarrinho(tipo) {
      const item = document.createElement('li');
      item.textContent = `Doce ${tipo} - R$${DOCE_PRECOS[tipo]}`;
      itensCarrinhoElement.appendChild(item); 
    }
  
    // Função para finalizar a compra
    function finalizarCompra() {
      if (itensCarrinhoElement.children.length > 0) {
        // Iniciar a animação
        const itemCarrinho = itensCarrinhoElement.children[0]; // Seleciona o primeiro item
        itemCarrinho.classList.add('doce-retirado');  // Adiciona a classe de animação
  
        setTimeout(() => {
          alert("Compra finalizada com sucesso!");
          limparCarrinho();  // Limpa o carrinho após a animação
        }, 1000);  // Espera a duração da animação (1s)
      } else {
        alert("Adicione um doce ao carrinho antes de finalizar a compra.");
      }
    }
  
    // Função para limpar o carrinho
    function limparCarrinho() {
      itensCarrinhoElement.innerHTML = ''; 
      saldo = 0; 
      saldoElement.textContent = saldo.toFixed(2);
      mensagemElement.textContent = '';
    }
  
    // Listeners para moedas
    document.getElementById('moeda-1').addEventListener('click', () => inserirMoeda(1));
    document.getElementById('moeda-2').addEventListener('click', () => inserirMoeda(2));
    document.getElementById('moeda-5').addEventListener('click', () => inserirMoeda(5));
  
    // Listeners para doces
    document.getElementById('doce-A').addEventListener('click', () => comprarDoce('A'));
    document.getElementById('doce-B').addEventListener('click', () => comprarDoce('B'));
    document.getElementById('doce-C').addEventListener('click', () => comprarDoce('C'));
  
    // Listener para finalizar a compra
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
  
  });
  