let temaSelecionado = localStorage.getItem("tema");
let indice = 0;
let acertos = Number(localStorage.getItem("acertos")) || 0;
let erros = Number(localStorage.getItem("erros")) || 0;

const questoes = [
  {
    tema: "Estatística",
    pergunta: "(ENEM 2025) Três dados cúbicos, com faces numeradas de 1 a 6, foram utilizados em um jogo. Artur escolheu dois dados, e João ficou com o terceiro. O jogo consiste em ambos lançarem seus dados, observarem os números nas faces voltadas para cima e compararem o maior número obtido por Artur com o número obtido por João. Vence o jogador que obtiver o maior número. Em caso de empate, a vitória é de João. \n O jogador que tem a maior probabilidade de vitória é",
    alternativas: [
      "(A) Artur, com probabilidade de 2/3;", 
      "(B) João, com probabilidade de 4/9;", 
      "(C) Artur, com probabilidade de 91/216;", 
      "(D) João, com probabilidade de 91/216;", 
      "(E) Artur, com probabilidade de 125/216;"
    ],
    correta: 4
  },
  {
    tema: "Geometria",
    pergunta: "(Enem 2022) Uma cozinheira produz docinhos especiais por encomenda. Usando uma receita-base de massa, ela prepara uma porção, com a qual produz 50 docinhos maciços de formato esférico, com 2 cm de diâmetro. Um cliente encomenda 150 desses docinhos, mas pede que cada um tenha formato esférico com 4 cm de diâmetro. A cozinheira pretende preparar o número exato de porções da receita-base de massa necessário para produzir os docinhos dessa encomenda. \n Quantas porções da receita-base de massa ela deve preparar para atender esse cliente?",
    alternativas: [
      "(A) 2",
      "(B) 3",
      "(C) 6",
      "(D) 12",
      "(E) 24"
    ],
    correta: 4
  },
  {
    tema: "Matemática Básica",
    pergunta: "Enem (2022) Ao escutar à notícia de que um filme recém-lançado arrecadou, no primeiro mês de lançamento, R$ 1,35 bilhão em bilheteria, um estudante escreveu corretamente o número que representa essa quantia, com todos os seus algarismos. \n O número escrito pelo estudante foi",
    alternativas: [
      "(A) 135 000,00",
      "(B) 1 350 000,00",
      "(C) 13 500 000,00",
      "(D) 135 000 000,00",
      "(E) 1 350 000 000,00"
    ],
    correta: 4
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
