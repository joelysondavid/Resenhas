function novoElemento(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

function Barreira(reversa = false) {
  this.elemento = novoElemento('div', 'barreira');

  const borda = novoElemento('div', 'borda');
  const corpo = novoElemento('div', 'corpo');

  this.elemento.appendChild(reversa ? corpo : borda);
  this.elemento.appendChild(reversa ? borda : corpo);

  this.setAltura = altura => corpo.style.height = `${altura}px`;
}

// const b = new Barreira(true);
// b.setAltura(200);
// document.querySelector('[wm-flappy]').appendChild(b.elemento);

function ParDeBarreiras(altura, abertura, x) {
  this.elemento = novoElemento('div', 'par-de-barreiras');

  this.barSup = new Barreira(true); // barreira superior
  this.barInf = new Barreira(false); // barreira inferior

  this.elemento.appendChild(this.barSup.elemento);
  this.elemento.appendChild(this.barInf.elemento);

  this.sortearAbertura = () => {
    const alturaSup = Math.random() * (altura - abertura);
    const alturaInf = altura - abertura - alturaSup;

    this.barSup.setAltura(alturaSup);
    this.barInf.setAltura(alturaInf);
  }

  this.getX = () => parseInt(this.elemento.style.left.split('px' [0]));
  this.setX = x => this.elemento.style.left = `${x}px`;
  this.getLargura = () => this.elemento.clientWidth;

  this.sortearAbertura();
  this.setX(x);
}

// const b = new ParDeBarreiras(700, 200, 400);
// document.querySelector('[wm-flappy]').appendChild(b.elemento);

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
  this.pares = [
    new ParDeBarreiras(altura, abertura, largura),
    new ParDeBarreiras(altura, abertura, largura + espaco),
    new ParDeBarreiras(altura, abertura, largura + espaco * 2),
    new ParDeBarreiras(altura, abertura, largura + espaco * 3)
  ];

  const deslocamento = 2;
  this.animar = () => {
    this.pares.forEach(par => {
      par.setX(par.getX() - deslocamento);

      // quando o elemento sair da tela
      if (par.getX() < -par.getLargura()) {
        par.setX(par.getX() + espaco * this.pares.length);
        par.sortearAbertura();
      }

      const meio = largura / 2;
      const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio;

      if (cruzouOMeio) notificarPonto();
    });
  }
}

function Passaro(alturaGame) {
  let voando = false;

  this.elemento = novoElemento('img', 'noel');
  // this.elemento.src = 'https://lh6.googleusercontent.com/-ASMBpwTDCPI/UMO9AP3i6UI/AAAAAAAAWws/4uXsqmqCV5c/s650/oie_glitters%2520%25286%2529.gif';
  this.elemento.src = 'imgs/trenó.png';

  this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
  this.setY = y => this.elemento.style.bottom = `${y}px`;

  window.onkeydown = e => voando = true;
  window.onkeyup = e => voando = false;

  this.animar = () => {
    const novoY = this.getY() + (voando ? 8 : -5);
    const alturaMaxima = alturaGame - this.elemento.clientHeight;

    if (novoY <= 0) {
      this.setY(0);
    } else if (novoY >= alturaMaxima) {
      this.setY(alturaMaxima);
    } else {
      this.setY(novoY);
    }
  }

  this.setY(alturaGame / 2);
}




function Progresso() {
  this.elemento = novoElemento('span', 'progresso');

  this.atualizarPontos = pontos => this.elemento.innerHTML = pontos;

  this.atualizarPontos(0);
}

// const barreiras = new Barreiras(700, 1200, 200, 400);
// const passaro = new Passaro(700);
// const areaDoGame = document.querySelector('[wm-flappy]');
// areaDoGame.appendChild(passaro.elemento);
// areaDoGame.appendChild(new Progresso().elemento);
// barreiras.pares.forEach(par => areaDoGame.appendChild(par.elemento));
// setInterval(() => {
//   barreiras.animar();
//   passaro.animar()
// }, 20);

function estaoSobrepostos(elementoA, elementoB) {
  const a = elementoA.getBoundingClientRect();
  const b = elementoB.getBoundingClientRect();

  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

  return horizontal && vertical;
}

function colidiu(passaro, barreiras) {
  let colidiu = false;
  barreiras.pares.forEach(parDeBarreiras => {
    if (!colidiu) {
      const superior = parDeBarreiras.barSup.elemento;
      const inferior = parDeBarreiras.barInf.elemento;
      colidiu = estaoSobrepostos(passaro.elemento, superior) || estaoSobrepostos(passaro.elemento, inferior);
    }
  });
  return colidiu;
}

function FlappyBird() {
  let pontos = 0;

  const areaDoGame = document.querySelector('[quadro]');
  const altura = areaDoGame.clientHeight;
  const largura = areaDoGame.clientWidth;

  const progresso = new Progresso();
  const barreiras = new Barreiras(altura, largura, 300, 480,
    () => progresso.atualizarPontos(++pontos));
  const passaro = new Passaro(altura);

  areaDoGame.appendChild(progresso.elemento);
  areaDoGame.appendChild(passaro.elemento);
  barreiras.pares.forEach(par => areaDoGame.appendChild(par.elemento));

  this.start = () => {
    // loop do game
    const temporizador = setInterval(() => {
      barreiras.animar();
      passaro.animar();
      if (colidiu(passaro, barreiras)) {
        clearInterval(temporizador);
      }
    }, 20);
  }
}


function setaCores() {
  let divs = document.querySelectorAll('div .par-de-barreiras');
  let quadroDiv = document.querySelector('[quadro]');
  // let cores = ['blue', 'red', 'green', 'yellow'];
  let cores = ['#BFD9DC', '#F8D5E0', '#BCE7D6', '#F3E6AD'];
  let coresBorda = [ '#A0B5B8', '#f2a7bf', '#95B8AA', '#D4C896' ];
  
  divs.forEach(
    (div, index) => {
      let corpos = div.querySelectorAll('.barreira .corpo');
      let bordas = div.querySelectorAll('.barreira .borda');
      corpos.forEach(corpo => {
        corpo.style.backgroundColor = cores[index]
        corpo.style.border = '4px solid ' + coresBorda[index]
      });
      // corpos.forEach(corpo => 
      bordas.forEach(borda => borda.style.backgroundColor = cores[index]);
    }
  );

  setInterval(() => {
    let ultimaCor = divs[0].querySelector('.barreira .corpo').style.backgroundColor;
    let ultimaCorBorder = divs[0].querySelector('.barreira .corpo').style.border;
    // let quadroColor = quadroDiv.style.border;

    for (let i = 0; i < divs.length; i++) {
      let corpos = divs[i].querySelectorAll('.barreira .corpo');
      let bordas = divs[i].querySelectorAll('.barreira .borda');
      
      if (i < divs.length - 1) {
        corpos.forEach(elemento => elemento.style.backgroundColor = divs[i + 1].querySelector('.barreira .corpo').style.backgroundColor);
        bordas.forEach(elemento => elemento.style.backgroundColor = divs[i + 1].querySelector('.barreira .corpo').style.backgroundColor);
        corpos.forEach(elemento => elemento.style.border = divs[i + 1].querySelector('.barreira .corpo').style.border);
        bordas.forEach(elemento => elemento.style.border = divs[i + 1].querySelector('.barreira .corpo').style.border);
      } else {
        corpos.forEach(elemento => elemento.style.backgroundColor = ultimaCor);
        bordas.forEach(elemento => elemento.style.backgroundColor = ultimaCor);
        //change color for border
        corpos.forEach(elemento => elemento.style.border = ultimaCorBorder);
        bordas.forEach(elemento => elemento.style.border = ultimaCorBorder);
      }
    }

    //i don't know what i'm doing    
    for (let i = 0; i < coresBorda.length; i++) {
      let ultimaCorQuadro = document.querySelector('[quadro]').style.border;
      
      if (i < coresBorda.length - 1 ){
        quadroDiv.style.border = `5px dashed ${coresBorda[i + 1]}`
      } else {
        quadroDiv.style.border = ultimaCorQuadro
      }
    }
    


  }, 1000);

}

new FlappyBird().start();

setaCores();