/*
  - 2C = Dos de Treboles
  - 2D = Dos de Diamantes
  - 2H = Dos de Corazones
  - 2S = Dos de Espadas
*/
let deck = [];
const tipos = ["C", "D", "H", "S"];
const cartasEspeciales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosComputadora = 0;

// Referencias del HRML
const btnPedirCarta = document.querySelector("#btnPedirCarta");
const btnDetener = document.querySelector("#btnDetener");
const puntosHtml = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");

/* Creación de la función para crear deck */

const crearDeck = () => {
  /* 
       Creando los elementos del arreglo 
       Las cartas van del número 2 al 10, más  las cartas especiales   
    */
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    for (const especial of cartasEspeciales) {
      deck.push(especial + tipo);
    }
  }
  /* Desordenando las cartas con la libreria Underscore, con la función _.shuffle*/
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

/* Función que me permite tomar  una carta */

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el Deck";
  }
  const carta = deck.pop();
  return carta;
};

/* Función que determina el valor de la Carta */

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;
    const imgCarta = document.createElement("img");
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie Gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora Gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador Gana");
    } else {
        alert('Computadora Gana--');
    }
  }, 500);
};

// const valor = valorCarta(pedirCarta());
// console.log(valor);

// Eventos

btnPedirCarta.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;
  const imgCarta = document.createElement("img");
  imgCarta.src = `Assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Perdiste");
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, Genial");
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedirCarta.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener("click", ()=>{
    console.clear();
    puntosJugador =0;
    puntosComputadora =0;
    deck= [];
    deck =crearDeck();
    btnDetener.disabled = false;
    btnPedirCarta.disabled = false;
    puntosHtml[0].innerText =0;
    puntosHtml[1].innerText=0;
    divCartasJugador.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;
    divCartasComputadora.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;    
})