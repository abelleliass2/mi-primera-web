// Datos de jugadores
const playerData = {
  maradona: {
    name: 'Diego Maradona',
    description: 'Sos un líder nato, con personalidad, carácter y una enorme capacidad para decidir partidos.'
  },
  riquelme: {
    name: 'Juan Román Riquelme',
    description: 'Tenés visión de juego, elegancia y sabés conectar el juego como pocos.'
  },
  palermo: {
    name: 'Martín Palermo',
    description: 'Sos contundente, decisivo y siempre aparecés en los momentos importantes.'
  },
  tevez: {
    name: 'Carlos Tevez',
    description: 'Representás la intensidad, la entrega y el hambre de gloria por cada pelota.'
  }
};

// Función para calcular resultado
function calcularResultado(formData) {
  const score = {
    maradona: 0,
    riquelme: 0,
    palermo: 0,
    tevez: 0
  };

  for (const value of formData.values()) {
    if (score[value] !== undefined) {
      score[value] += 1;
    }
  }

  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0][1];
  const winners = sorted.filter(([_, val]) => val === maxScore).map(([key]) => key);

  return winners;
}

// Función para mostrar resultado
function mostrarResultado(resultKeys) {
  const resultBox = document.getElementById('resultado');
  const description = document.getElementById('descripcion');

  if (!resultBox) return;

  if (resultKeys.length === 1) {
    const player = playerData[resultKeys[0]];
    resultBox.textContent = `Tu ídolo es ${player.name}.`;
    if (description) description.textContent = player.description;
  } else if (resultKeys.length > 1) {
    const nombres = resultKeys.map(key => playerData[key].name).join(' y ');
    resultBox.textContent = `Empate: tus ídolos son ${nombres}.`;
    if (description) description.textContent = 'Compartís características con más de un jugador.';
  } else {
    resultBox.textContent = 'No se pudo determinar tu resultado.';
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quiz-form');

  if (quizForm) {
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(quizForm);
      const winners = calcularResultado(formData);
      window.location.href = `result.html?resultado=${winners.join(',')}`;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const resultParam = params.get('resultado');

  if (resultParam) {
    const resultKeys = resultParam.split(',').filter(key => playerData[key]);
    mostrarResultado(resultKeys);
  }
});

