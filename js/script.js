let temaSelecionado = localStorage.getItem("tema");
let indice = 0;
let acertos = Number(localStorage.getItem("acertos")) || 0;
let erros = Number(localStorage.getItem("erros")) || 0;

const questoes = [
  {
    tema: "Estatística",
    pergunta: "Em uma turma, as notas de Matemática de três alunos foram 6, 8 e 10. Para analisar o desempenho médio da turma, o professor calculou a média aritmética dessas notas. Qual foi o valor encontrado?",
    alternativas: ["7", "8", "9", "10"],
    correta: 1
  },
  {
    tema: "Geometria",
    pergunta: "Uma praça tem o formato de um triângulo. Para descrever essa forma geométrica, é correto afirmar que um triângulo possui:",
    alternativas: [
      "Dois lados e dois ângulos",
      "Três lados e três ângulos",
      "Quatro lados e quatro ângulos",
      "Apenas três ângulos"
    ],
    correta: 1
  },
  {
    tema: "Funções",
    pergunta: "Um estudante analisou o gráfico de uma função do 1º grau utilizada para representar o crescimento do número de inscritos em um curso ao longo do tempo. O formato do gráfico dessa função é uma:",
    alternativas: ["Curva", "Parábola", "Reta", "Circunferência"],
    correta: 2
  }
];

function selecionarTema(tema) {
  localStorage.setItem("tema", tema);
  localStorage.setItem("acertos", 0);
  localStorage.setItem("erros", 0);
  window.location.href = "questoes.html";
}

function carregarQuestao() {
  const filtradas = questoes.filter(q => q.tema === temaSelecionado);

  if (!filtradas[indice]) {
    window.location.href = "desempenho.html";
    return;
  }

  document.getElementById("tema").innerText = temaSelecionado;
  document.getElementById("pergunta").innerText = filtradas[indice].pergunta;

  const alternativasDiv = document.getElementById("alternativas");
  alternativasDiv.innerHTML = "";

  filtradas[indice].alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.innerText = alt;
    btn.onclick = () => responder(i, filtradas[indice].correta);
    alternativasDiv.appendChild(btn);
  });
}

function responder(resposta, correta) {
  const feedback = document.getElementById("feedback");

  if (resposta === correta) {
    feedback.innerText = "Resposta correta!";
    acertos++;
  } else {
    feedback.innerText = "Resposta incorreta.";
    erros++;
  }

  localStorage.setItem("acertos", acertos);
  localStorage.setItem("erros", erros);
}

function proximaQuestao() {
  indice++;
  carregarQuestao();
}

if (document.getElementById("pergunta")) {
  carregarQuestao();
}

if (document.getElementById("acertos")) {
  document.getElementById("acertos").innerText = localStorage.getItem("acertos");
  document.getElementById("erros").innerText = localStorage.getItem("erros");
}
