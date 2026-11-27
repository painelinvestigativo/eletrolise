const perguntas = [
    {
        pergunta: "O que é eletrólise?",
        alternativas: [
            "Um processo que utiliza energia elétrica para provocar uma reação química.",
            "Um processo de congelamento dos metais.",
            "Uma reação que acontece somente com a luz solar.",
            "Um processo de mistura de diferentes metais."
        ],
        correta: 0,
        explicacao: "A eletrólise utiliza energia elétrica para provocar uma reação química não espontânea."
    },
    {
        pergunta: "O que acontece no cátodo durante a eletrólise?",
        alternativas: [
            "Ocorre a oxidação.",
            "Ocorre a redução, com ganho de elétrons.",
            "O metal desaparece sem reação.",
            "Ocorre apenas o aquecimento."
        ],
        correta: 1,
        explicacao: "No cátodo acontece a redução, processo em que os íons ganham elétrons."
    },
    {
        pergunta: "Qual é a principal função da galvanoplastia?",
        alternativas: [
            "Derreter completamente os metais.",
            "Transformar metais em gases.",
            "Depositar uma camada de metal sobre outro material.",
            "Eliminar toda a eletricidade de um objeto."
        ],
        correta: 2,
        explicacao: "A galvanoplastia utiliza processos eletrolíticos para revestir materiais com uma camada metálica."
    },
    {
        pergunta: "Qual processo pode utilizar eletrólise para obter cobre de alta pureza?",
        alternativas: [
            "Purificação eletrolítica.",
            "Evaporação da água.",
            "Combustão metálica.",
            "Filtração comum."
        ],
        correta: 0,
        explicacao: "A eletrorrefinação utiliza eletrólise para purificar o cobre."
    },
    {
        pergunta: "Qual é uma vantagem do uso da eletrólise na reciclagem de metais?",
        alternativas: [
            "Aumentar o desperdício de materiais.",
            "Impedir qualquer reutilização.",
            "Eliminar a necessidade de energia.",
            "Permitir a recuperação e purificação de metais."
        ],
        correta: 3,
        explicacao: "Processos eletroquímicos podem recuperar e purificar metais, favorecendo seu reaproveitamento."
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const feedbackElemento = document.getElementById("feedback");
const progressoElemento = document.getElementById("progresso");
const pontosElemento = document.getElementById("pontos");
const barraElemento = document.getElementById("barra-progresso");
const proximoBotao = document.getElementById("proximo");

function carregarPergunta() {
    respondeu = false;

    const atual = perguntas[indiceAtual];

    perguntaElemento.textContent = atual.pergunta;

    progressoElemento.textContent =
        `PERGUNTA ${indiceAtual + 1} DE ${perguntas.length}`;

    pontosElemento.textContent = `PONTOS: ${pontuacao}`;

    barraElemento.style.width =
        `${(indiceAtual / perguntas.length) * 100}%`;

    feedbackElemento.textContent = "";
    proximoBotao.disabled = true;

    alternativasElemento.innerHTML = "";

    atual.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        alternativasElemento.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indiceAtual];

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((botao, indice) => {

        botao.disabled = true;

        if (indice === atual.correta) {
            botao.classList.add("correta");
        }

        if (indice === escolha && escolha !== atual.correta) {
            botao.classList.add("errada");
        }
    });

    if (escolha === atual.correta) {
        pontuacao++;

        feedbackElemento.textContent =
            "✓ Resposta correta! " + atual.explicacao;

        feedbackElemento.style.color = "#39d98a";

    } else {

        feedbackElemento.textContent =
            "✕ Resposta incorreta. " + atual.explicacao;

        feedbackElemento.style.color = "#ff7777";
    }

    pontosElemento.textContent = `PONTOS: ${pontuacao}`;

    proximoBotao.disabled = false;

    if (indiceAtual === perguntas.length - 1) {
        proximoBotao.textContent = "VER RESULTADO";
    }
}

function finalizarQuiz() {
    barraElemento.style.width = "100%";

    perguntaElemento.textContent = "INVESTIGAÇÃO CONCLUÍDA!";

    alternativasElemento.innerHTML = "";

    progressoElemento.textContent = "RESULTADO FINAL";

    let mensagem = "";

    if (pontuacao === 5) {
        mensagem = "Excelente! Você dominou o assunto!";
    } else if (pontuacao >= 3) {
        mensagem = "Bom trabalho! Você compreendeu boa parte do conteúdo.";
    } else {
        mensagem = "Continue estudando! Toda investigação exige dedicação.";
    }

    feedbackElemento.style.color = "#50d9e8";

    feedbackElemento.textContent =
        `${mensagem} Você acertou ${pontuacao} de ${perguntas.length} questões.`;

    pontosElemento.textContent = `NOTA: ${pontuacao}/${perguntas.length}`;

    proximoBotao.textContent = "REFAZER INVESTIGAÇÃO";

    proximoBotao.disabled = false;

    proximoBotao.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;

    proximoBotao.textContent = "PRÓXIMA PERGUNTA →";
    proximoBotao.onclick = avancarPergunta;

    carregarPergunta();
}

function avancarPergunta() {
    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
}

proximoBotao.addEventListener("click", avancarPergunta);

carregarPergunta();