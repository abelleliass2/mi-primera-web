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

document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quiz-form');

  if (quizForm) {
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(quizForm);
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

      const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      window.location.href = `result.html?resultado=${winner}`;
    });
  }

  const resultBox = document.getElementById('resultado');
  const description = document.getElementById('descripcion');
  const params = new URLSearchParams(window.location.search);
  const resultKey = params.get('resultado');

  if (resultBox && resultKey && playerData[resultKey]) {
    const player = playerData[resultKey];
    resultBox.textContent = `Tu ídolo es ${player.name}.`;

    if (description) {
      description.textContent = player.description;
    }
  } else if (resultBox) {
    resultBox.textContent = 'No se pudo determinar tu resultado.';
  }
});
