document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DADOS DO QUIZ (Suas perguntas)
    const quizData = [
        {
            question: "Qual foi o primeiro computador comercial do mundo?",
            options: ["UNIVAC", "Ferranti Mark I", "IBM 701", "LEO I", "CSIRAC"],
            answer: "Ferranti Mark I",
            explanation: "O **Ferranti Mark I** (1951) foi o primeiro computador comercialmente disponível, desenvolvido no Reino Unido."
        },
        {
            question: "Em que ano foi criado o MIT Whirlwind, o primeiro computador de tempo real?",
            options: ["1949", "1950", "1951", "1952", "1953"],
            answer: "1951",
            explanation: "O **Whirlwind** (1951) foi o primeiro computador a processar dados em tempo real, essencial para aplicações militares."
        },
        {
            question: "Quem desenvolveu o primeiro compilador A-0?",
            options: ["John von Neumann", "Grace Hopper", "Alan Turing", "Howard Aiken", "Konrad Zuse"],
            answer: "Grace Hopper",
            explanation: "**Grace Hopper** criou o compilador **A-0** em 1952, tornando possível traduzir instruções escritas em linguagem humana para código de máquina."
        },
        {
            question: "Qual tecnologia de armazenamento foi introduzida em 1956?",
            options: ["Disco Magnético", "Memória RAM", "Cartão perfurado", "Fita magnética", "Chip de silício"],
            answer: "Disco Magnético",
            explanation: "O primeiro disco rígido foi o **IBM 305 RAMAC**, em 1956, marcando o início da era do armazenamento magnético."
        },
        {
            question: "Qual foi a primeira linguagem de programação de alto nível?",
            options: ["FORTRAN", "LISP", "ALGOL", "COBOL", "BASIC"],
            answer: "FORTRAN",
            explanation: "**FORTRAN** (1957) foi criada pela IBM para cálculos científicos e engenharia."
        },
        {
            question: "Qual sistema foi considerado o primeiro totalmente transistorado?",
            options: ["UNIVAC", "Harwell Cadet", "Ferranti Mark I", "IBM 650", "MIT Whirlwind"],
            answer: "Harwell Cadet",
            explanation: "O **Harwell Cadet** (1955) foi o primeiro computador a usar apenas transistores, sem válvulas."
        },
        {
            question: "Em que ano foi lançado o primeiro computador pessoal, o Simon?",
            options: ["1949", "1950", "1951", "1952", "1953"],
            answer: "1950",
            explanation: "**Simon** (1950) foi um kit educativo criado por Edmund Berkeley — considerado o primeiro computador pessoal, embora limitado."
        },
        {
            question: "Qual dos seguintes não é um supercomputador dos anos 60?",
            options: ["Atlas", "Titan", "SAGE", "PDP-1", "LEO II"],
            answer: "LEO II",
            explanation: "O **LEO II** foi um computador comercial, não um supercomputador (embora fosse um computador importante da época)."
        },
        {
            question: "Qual foi o primeiro compilador de linguagem de programação?",
            options: ["A-0", "FORTRAN", "ALGOL", "COBOL", "LISP"],
            answer: "A-0",
            explanation: "O compilador **A-0** (1952), criado por Grace Hopper, é considerado o primeiro da história."
        },
        {
            question: "Em que ano surgiu o circuito integrado?",
            options: ["1955", "1960", "1963", "1965", "1968"],
            answer: "1960",
            explanation: "O circuito integrado foi criado em 1958 e passou a ser produzido comercialmente em **1960**."
        },
        {
            question: "Qual dos seguintes jogos foi um dos primeiros videogames da história, lançado em 1961?",
            options: ["Pong", "Spacewar!", "Tetris", "Pac-Man", "Odyssey"],
            answer: "Spacewar!",
            explanation: "**Spacewar!** (1961) foi criado por estudantes do MIT, sendo um dos primeiros jogos digitais da história."
        },
        {
            question: "O que é o IFIP, criado em 1960?",
            options: ["Uma linguagem de programação", "Um computador", "Federação Internacional para Processamento de Informação", "Um sistema operacional", "Um videogame"],
            answer: "Federação Internacional para Processamento de Informação",
            explanation: "A **IFIP** (**International Federation for Information Processing**) (1960) coordena pesquisas globais em tecnologia da informação."
        },
        {
            question: "Qual projeto é considerado o primeiro kit de computador pessoal?",
            options: ["PDP-1", "Simon", "IBM 701", "LEO I", "UNIVAC"],
            answer: "Simon",
            explanation: "**Simon** (1950) foi o primeiro computador que podia ser montado por entusiastas em casa."
        },
        {
            question: "Qual desses sistemas foi criado para compartilhamento de tempo em computadores?",
            options: ["Trackball", "ReserVec", "FORTRAN", "COBOL", "Compartilhamento de Tempo (Time Sharing)"],
            answer: "Compartilhamento de Tempo (Time Sharing)",
            explanation: "O **time-sharing** (1961) permitiu que vários usuários usassem um mesmo computador simultaneamente."
        },
        {
            question: "Qual linguagem de programação surgiu em 1958 e é usada para inteligência artificial?",
            options: ["ALGOL", "FORTRAN", "LISP", "COBOL", "BASIC"],
            answer: "LISP",
            explanation: "**LISP** (1958), criada por John McCarthy, foi uma das primeiras linguagens voltadas à IA."
        },
        {
            question: "O que foi o Trackball, desenvolvido em 1952?",
            options: ["Um computador pessoal", "Um dispositivo de entrada", "Uma linguagem de programação", "Um sistema operacional", "Um videogame"],
            answer: "Um dispositivo de entrada",
            explanation: "O **trackball** (1952) foi um dos primeiros dispositivos apontadores, precursor do mouse."
        },
        {
            question: "Qual desses foi um sistema operacional inicial desenvolvido entre 1954 e 1955?",
            options: ["DOS", "Unix", "Primeiros Sistemas Operacionais", "Windows 1.0", "Multics"],
            answer: "Primeiros Sistemas Operacionais",
            explanation: "Os **Primeiros Sistemas Operacionais** surgiram para gerenciar tarefas básicas em grandes computadores (Ex: SO de lote)."
        },
        {
            question: "Qual dispositivo foi criado para simular movimento em jogos em 1952?",
            options: ["Scanner", "Trackball", "Mouse", "Joystick", "Paddle"],
            answer: "Trackball",
            explanation: "O **Trackball** (1952) foi usado em jogos como “Tennis for Two” para controlar o movimento da bola."
        },
        {
            question: "Em que ano foi lançado o primeiro minicomputador DEC PDP-1?",
            options: ["1955", "1957", "1960", "1962", "1963"],
            answer: "1960",
            explanation: "O **DEC PDP-1** (1960) marcou a transição dos computadores de grande porte para modelos menores e mais acessíveis."
        },
        {
            question: "Qual das seguintes linguagens foi criada para aplicações comerciais em 1960?",
            options: ["FORTRAN", "LISP", "COBOL", "ALGOL", "BASIC"],
            answer: "COBOL",
            explanation: "**COBOL** (Common Business-Oriented Language) (1960) foi criada para aplicações de negócios e bancos."
        }
    ];

    // 2. ELEMENTOS DO DOM
    const introSection = document.getElementById('quiz-intro-section');
    const startButton = document.getElementById('start-quiz-button');
    const quizMainContent = document.getElementById('fullscreen-quiz-modal'); 
    const quizSlidesContainer = document.getElementById('quiz-slides');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-quiz-button');
    const restartButton = document.getElementById('restart-quiz-button');
    const resultsSection = document.getElementById('results-section');
    const currentScoreDisplay = document.getElementById('current-score');
    const currentQuestionIndexDisplay = document.getElementById('current-question-index');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    
    // NOVO: Elemento Footer
    const mainFooter = document.getElementById('main-footer');

    // 3. VARIÁVEIS DE ESTADO
    let currentQuestionIndex = 0; 
    let score = 0; 
    let userAnswers = {}; 

    // 4. FUNÇÃO PARA EMBARALHAR ARRAYS
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    
    // 5. FUNÇÃO PARA RENDERIZAR O QUIZ (SETUP INICIAL)
    const renderQuiz = () => {
        // Zera o estado
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = {};
        quizSlidesContainer.innerHTML = '';
        
        totalQuestionsDisplay.textContent = quizData.length;
        currentScoreDisplay.textContent = score;
        
        quizData.forEach((q, index) => {
            // Embaralha as opções para cada pergunta
            const shuffledOptions = [...q.options];
            shuffleArray(shuffledOptions); 

            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';
            questionBlock.setAttribute('data-index', index);
            
            let optionsHtml = '';
            shuffledOptions.forEach(option => {
                const optionId = `q${index}-opt-${option.replace(/[^a-zA-Z0-9]/g, '')}`;
                
                optionsHtml += `
                    <div>
                        <input type="radio" 
                               id="${optionId}" 
                               name="question-${index}" 
                               value="${option}" 
                               class="option-input"
                               data-question-index="${index}">
                        <label for="${optionId}" class="option-label">
                            ${option}
                        </label>
                    </div>
                `;
            });
            
            questionBlock.innerHTML = `
                <h3>${index + 1}. ${q.question}</h3>
                ${optionsHtml}
                <p class="explanation" id="exp-${index}">${q.explanation}</p>
            `;
            
            quizSlidesContainer.appendChild(questionBlock);
        });

        // Adiciona listeners para as opções
        document.querySelectorAll('.option-input').forEach(input => {
            input.addEventListener('change', handleAnswerSelection);
        });
        
        // Exibe o primeiro slide e inicializa o estado do quiz
        showQuestion(currentQuestionIndex);
    };

    // 6. FUNÇÃO PARA MOSTRAR O SLIDE CORRETO
    const showQuestion = (index) => {
        const questions = document.querySelectorAll('.question-block');
        
        questions.forEach((q, i) => {
            // Garante que apenas a pergunta atual é visível
            if (i === index) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });

        // Atualiza o progresso e o botão de navegação
        currentQuestionIndexDisplay.textContent = index + 1;
        updateProgressBar(index);
        
        // O botão de navegação depende do estado da pergunta
        nextButton.classList.remove('hidden');
        submitButton.classList.add('hidden');
        nextButton.disabled = !userAnswers[index]; 

        if (index === quizData.length - 1) {
            // Última pergunta -> Altera texto para indicar o fim
            nextButton.textContent = "Ver Resultado";
        } else {
            nextButton.textContent = "Próxima Pergunta";
        }

        // Se a pergunta atual já foi respondida (reinício), habilita a navegação
        if (questions[index] && questions[index].classList.contains('question-answered')) {
             nextButton.disabled = false;
        }
    };
    
    // 7. FUNÇÃO PARA ATUALIZAR A BARRA DE PROGESSO
    const updateProgressBar = (index) => {
        const percentage = ((index) / quizData.length) * 100;
        progressBar.style.width = `${percentage}%`;
    };

    // 8. FUNÇÃO DE SELEÇÃO (Antes do feedback)
    const handleAnswerSelection = (event) => {
        const input = event.target;
        const index = parseInt(input.getAttribute('data-question-index'));
        const value = input.value;
        const questionBlock = input.closest('.question-block');

        // Se a pergunta já foi respondida, ignora
        if (questionBlock.classList.contains('question-answered')) return;

        userAnswers[index] = value;
        
        // Remove 'selected' de todas as opções e adiciona na selecionada
        questionBlock.querySelectorAll('.option-label').forEach(label => {
            label.classList.remove('selected');
        });
        input.nextElementSibling.classList.add('selected');

        // Dispara o feedback imediato
        checkAnswer(index, value, questionBlock);
    };

    // 9. FUNÇÃO PARA VERIFICAR A RESPOSTA (Feedback imediato)
    const checkAnswer = (index, userAnswer, questionBlock) => {
        const q = quizData[index];
        const isCorrect = userAnswer === q.answer;
        
        // Aplica o estado de "respondida"
        questionBlock.classList.add('question-answered');

        // Atualiza a pontuação APENAS se acertou
        if (isCorrect) {
            score++;
            currentScoreDisplay.textContent = score;
        }
        
        // Aplica o feedback visual
        questionBlock.querySelectorAll('input[name="question-' + index + '"]').forEach(input => {
            const label = input.nextElementSibling;
            if (input.value === q.answer) {
                label.classList.add('correct'); // Sempre marca a correta
            } else if (input.value === userAnswer && !isCorrect) {
                label.classList.add('incorrect'); // Marca a incorreta selecionada
            }
            // Garante que a opção selecionada tenha destaque visual
            label.classList.remove('selected'); 
        });

        // Mostra a explicação
        document.getElementById(`exp-${index}`).style.display = 'block';

        // Habilita o botão para ir à próxima/finalizar
        nextButton.disabled = false;
    };
    
    // 10. FUNÇÃO PARA AVANÇAR
    const nextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
            
            // Rola para o topo do quiz para que a nova pergunta seja visível
            const quizInternalHeader = document.getElementById('quiz-internal-header');
            if (quizInternalHeader) {
                quizInternalHeader.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Última pergunta -> Finalizar Quiz
            submitQuiz();
        }
    };

    // 11. FUNÇÃO PARA FINALIZAR O QUIZ E MOSTRAR RESULTADOS
    const submitQuiz = () => {
        // Esconde o contêiner de slides e botões
        quizSlidesContainer.classList.add('hidden');
        nextButton.classList.add('hidden');
        
        // Mostra a seção de resultados
        resultsSection.classList.remove('hidden');
        document.getElementById('final-score').innerHTML = `Você acertou <strong>${score}</strong> de ${quizData.length} perguntas.`;
        
        // Atualiza a barra de progresso para 100%
        updateProgressBar(quizData.length); 

        let feedbackMessage;
        const total = quizData.length;
        if (score / total >= 0.9) { 
            feedbackMessage = "Incrível! Você é um verdadeiro mestre na história da computação.";
        } else if (score / total >= 0.75) { 
            feedbackMessage = "Muito bom! Excelente conhecimento sobre a evolução da tecnologia.";
        } else if (score / total >= 0.5) { 
            feedbackMessage = "Você está no caminho certo! Continue aprendendo sobre esses marcos importantes.";
        } else {
            feedbackMessage = "Continue estudando! A história da computação é cheia de descobertas fascinantes.";
        }
        document.getElementById('feedback-message').textContent = feedbackMessage;
        
        // Rola para o topo do quiz para ver os resultados
        const quizInternalHeader = document.getElementById('quiz-internal-header');
        if (quizInternalHeader) {
            quizInternalHeader.scrollIntoView({ behavior: 'smooth' });
        }
        
        // NOVO: Esconde o footer (o quiz finalizado fica na mesma tela do quiz em andamento)
        if (mainFooter) {
             mainFooter.classList.remove('hidden-footer');
        }
    };

    // 12. FUNÇÃO PARA INICIAR O QUIZ 
    const startQuiz = () => {
        // Oculta a introdução
        introSection.classList.add('hidden');
        // Exibe o conteúdo principal do quiz
        quizMainContent.classList.remove('hidden');
        
        // NOVO: Mostra o footer quando o quiz começa
        if (mainFooter) {
            mainFooter.classList.remove('hidden-footer');
        }
        
        // Garante que o quiz está renderizado e na primeira pergunta
        renderQuiz(); 
    };
    
    // 13. FUNÇÃO PARA REINICIAR O QUIZ
    const restartQuiz = () => {
        // Oculta o modal de resultados e o conteúdo principal do quiz
        resultsSection.classList.add('hidden');
        quizMainContent.classList.add('hidden');
        
        // Exibe a introdução
        introSection.classList.remove('hidden');
        
        // NOVO: Esconde o footer novamente ao voltar para a introdução
        if (mainFooter) {
            mainFooter.classList.add('hidden-footer');
        }
        
        // Rola para o topo da página para ver a introdução
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // O renderQuiz não é chamado aqui, pois ele é chamado dentro de startQuiz.
        // Se a próxima ação for iniciar novamente, ele será chamado.
    };


    // 14. EVENT LISTENERS
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // 15. SETUP INICIAL: Oculta o conteúdo principal e esconde o footer na tela de introdução
    quizMainContent.classList.add('hidden');
    if (mainFooter) {
        mainFooter.classList.add('hidden-footer');
    }
});