const questions = {
  facil: [
    {q: "Qual personagem é conhecido por dizer 'Eu sou seu pai'?", a: ["Darth Vader", "Luke Skywalker", "Yoda"], correct: 0},
    {q: "Qual super-herói usa um escudo com uma estrela?", a: ["Homem de Ferro", "Capitão América", "Thor"], correct: 1},
    {q: "Qual bruxo famoso estuda em Hogwarts?", a: ["Harry Potter", "Gandalf", "Merlin"], correct: 0},
    {q: "Qual jogo tem o personagem Mario?", a: ["Zelda", "Pokémon", "Super Mario Bros"], correct: 2}
  ],
  medio: [
    {q: "Qual banda britânica lançou o álbum 'Abbey Road'?", a: ["The Beatles", "Queen", "Rolling Stones"], correct: 0},
    {q: "Qual série tem os personagens Eleven e Demogorgon?", a: ["Stranger Things", "The Witcher", "Dark"], correct: 0},
    {q: "Qual herói da Marvel é conhecido como 'Deus do Trovão'?", a: ["Thor", "Loki", "Hulk"], correct: 0},
    {q: "Qual jogo popular tem a frase 'Victory Royale'?", a: ["Fortnite", "Minecraft", "Call of Duty"], correct: 0}
  ],
  dificil: [
    {q: "Quem dirigiu o filme 'Pulp Fiction'?", a: ["Steven Spielberg", "Quentin Tarantino", "Martin Scorsese"], correct: 1},
    {q: "Qual é o nome verdadeiro da cantora Lady Gaga?", a: ["Stefani Germanotta", "Adele Laurie", "Katy Hudson"], correct: 0},
    {q: "Qual série ganhou o Emmy de Melhor Drama em 2015?", a: ["Game of Thrones", "Breaking Bad", "Mad Men"], correct: 0},
    {q: "Qual jogo clássico tem a fase 'Green Hill Zone'?", a: ["Sonic the Hedgehog", "Pac-Man", "Donkey Kong"], correct: 0}
  ]
};

let score = 0;
let currentQuestion = 0;
let selectedLevel = "facil";
let timer;
let timeLeft = 120; 
let playerName = "";

function startGame() {
  playerName = document.getElementById("playerName").value || "Jogador";
  selectedLevel = document.getElementById("level").value;
  document.getElementById("question-area").style.display = "block";
  document.querySelector("button").style.display = "none";
  showQuestion();
  startTimer();
}

function showQuestion() {
  if (currentQuestion < questions[selectedLevel].length) {
    const q = questions[selectedLevel][currentQuestion];
    document.getElementById("question").innerText = q.q;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    document.getElementById("feedback").innerText = "";
    q.a.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.innerText = answer;
      btn.onclick = () => checkAnswer(index);
      answersDiv.appendChild(btn);
    });
  } else {
    endGame();
  }
}

function checkAnswer(index) {
  const q = questions[selectedLevel][currentQuestion];
  if (index === q.correct) {
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("correctSound").play();
    document.getElementById("feedback").innerText = "Resposta correta!";
    document.getElementById("feedback").className = "correct";
  } else {
    document.getElementById("wrongSound").play();
    document.getElementById("feedback").innerText = "Resposta errada!";
    document.getElementById("feedback").className = "wrong";
  }
  currentQuestion++;
  timeLeft = 120; // reset para próxima questão
  setTimeout(showQuestion, 1500);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Tempo restante: " + timeLeft + "s";
    if (timeLeft <= 0) {
      document.getElementById("wrongSound").play();
      document.getElementById("feedback").innerText = "Tempo esgotado! Resposta errada!";
      document.getElementById("feedback").className = "wrong";
      currentQuestion++;
      timeLeft = 120;
      setTimeout(showQuestion, 1500);
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  document.getElementById("question-area").style.display = "none";
  document.getElementById("end-game").style.display = "block";
  document.getElementById("final-score").innerText = 
    playerName + ", sua pontuação total foi: " + score;
}

function restartGame() {
  score = 0;
  currentQuestion = 0;
  timeLeft = 120;
  document.getElementById("score").innerText = score;
  document.getElementById("end-game").style.display = "none";
  document.querySelector("button").style.display = "block";
}
