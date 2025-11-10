    // =================================================================
    // VARIÁVEIS GLOBAIS
    // =================================================================
    var menuButton = document.getElementById("menu-button");
    var menu = document.getElementById("menu");
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle-menu');
    const translationIcon = document.getElementById('translation-icon');
    const translationIconFloating = document.getElementById('translation-icon-floating'); 
    const translatableElements = document.querySelectorAll('[data-key]'); 
    let currentLanguage = localStorage.getItem('language') || 'pt';

    // --- Acessibilidade ---
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    const accessibilityOptions = document.getElementById('accessibility-options');
    const contentWrapper = document.getElementById('main-content-wrapper'); 
    const speechToggle = document.getElementById('speech-toggle'); 
    const speedRate = document.getElementById('speed-rate'); 
    const synth = window.speechSynthesis;
    let utterance = null;
    let isSpeaking = false; 
    let availableVoices = [];
    const iconPlay = 'bi bi-volume-up-fill'; 
    const iconStop = 'bi bi-stop-circle'; 
    let toastTimeout = null; 

    // --- Busca ---
    const headerSearchContainer = document.getElementById('header-search-container');
    const headerInput = document.getElementById('header-search-input');
    const suggestionsBox = document.getElementById('search-suggestions'); 

    // --- Dark Mode / Lâmpada ---
    const lampImageHeader = document.getElementById('lamp-logo');
    const lampLogoFooterLink = document.getElementById('lamp-logo-footer-link');
    const lampImageFooter = document.getElementById('lamp-logo-footer');

    // Mapeamento de velocidade 
    const speedMaps = {
        'pt': { 
            '0.5': 0.65,
            '0.0': 1.0, 
            '0.75': 1.0,
            '1.0': 1.35,
            '1.25': 1.6,
            '1.5': 1.85, 
        },
        'en': {
            '0.5': 0.55,
            '0.75': 0.8,
            '1.0': 1.0,
            '1.25': 1.125,
            '1.5': 1.25, 
        }
    };

    // =================================================================
    // DADOS DE ROTAS
    // =================================================================
    const routes = {
        'pt': [
            // Rotas Principais
            { url: 'Home.html', title: 'Home', keywords: ['página inicial', 'início', 'principal', 'apresentação'] },
            { url: 'Sobre nós.html', title: 'Sobre nós', keywords: ['equipe', 'projeto', 'autores', 'quem somos'] },
            { url: 'Capa.html', title: 'Capa do livro', keywords: ['releitura', 'design', 'visual', 'arte'] },
            { url: 'Quiz.html', title: 'Quiz', keywords: ['teste', 'conhecimento', 'perguntas', 'jogar', 'quiz'] },

            // Da Válvula ao Transistor (6)
            { url: '(6) Da Válvula ao Transistor.html', title: 'Da Válvula ao Transistor', keywords: ['história', 'primeira geração', 'válvula', 'transistor', 'capítulo 6', 'introdução'] },
            { url: '(6.2) Simon.html', title: 'Simon, o primeiro kit pessoal', keywords: ['computador pessoal', 'berkeley', '1950', 'kit', 'relé', 'simon'] },
            { url: '(6.3) Ferranti Mark I.html', title: 'Ferranti Mark I', keywords: ['primeiro comercial', 'manchester', 'computador de negócios', 'mark 1'] },
            { url: '(6.4) UNIVAC.html', title: 'Primeiros computadores comerciais', keywords: ['UNIVAC', 'IBM 701', 'comercial', 'primeiros', 'negócios'] },
            { url: '(6.9) Compilador A-0.html', title: 'Compilador A-0', keywords: ['Grace Hopper', 'compilador', 'linguagem de programação', 'a-0'] },
            { url: '(6.15) Harwell Cadet.html', title: 'Harwell Cadet', keywords: ['computador pequeno', 'Harwell', 'relés', 'primeiro transistorizado', 'cadet'] },
            { url: '(6.16) Disco Magnético.html', title: 'Disco Magnético', keywords: ['armazenamento', 'memória', 'disco', 'IBM 350', 'ramac'] },

            // Do Circuito Integrado à Lua (7)
            { url: '(7) Do Circuito Integrado à Lua.html', title: 'Do Circuito Integrado à Lua', keywords: ['circuito integrado', 'ci', 'lua', 'capítulo 7', 'introdução'] },
            { url: '(7.5) Compartilhamento de Tempo.html', title: 'Compartilhamento de Tempo', keywords: ['timesharing', 'múltiplos usuários', 'mainframe'] },
            { url: '(7.13) BASIC.html', title: 'Basic', keywords: ['linguagem de programação', 'iniciantes', 'basic'] },
            { url: '(7.14) IBM 360.html', title: 'IBM-360', keywords: ['IBM', 'mainframe', 'série 360', 'arquitetura'] },
            { url: '(7.32) Microprocessador.html', title: 'Microprocessador', keywords: ['Intel', 'Intel 4004', 'CPU'] },
            { url: '(7.34) ARPANET.html', title: 'Arpanet', keywords: ['internet', 'rede', 'militar', 'protocolo', 'rede de computadores'] },
            { url: '(7.38) Apollo Guidance Computer.html', title: 'Apollo Guidance Computer', keywords: ['AGC', 'Apollo', 'NASA', 'circuito integrado', 'nave espacial'] }
        ],
        
        'en': [
            // Rotas Principais (Em Inglês)
            { url: 'Home.html', title: 'Home', keywords: ['initial page', 'start', 'main', 'presentation'] },
            { url: 'Sobre nós.html', title: 'About us', keywords: ['team', 'project', 'authors', 'who we are'] },
            { url: 'Capa.html', title: 'Book Cover', keywords: ['reinterpretation', 'design', 'visual', 'art'] },
            { url: 'Quiz.html', title: 'Quiz', keywords: ['test', 'knowledge', 'questions', 'play', 'quiz'] },

            // From Valve to Transistor (6)
            { url: '(6) Da Válvula ao Transistor.html', title: 'From Tube to Transistor', keywords: ['history', 'first generation', 'tube', 'transistor', 'chapter 6', 'introduction'] },
            { url: '(6.2) Simon.html', title: 'Simon, the first personal kit', keywords: ['personal computer', 'berkeley', '1950', 'kit', 'relay', 'simon'] },
            { url: '(6.3) Ferranti Mark I.html', title: 'Ferranti Mark I', keywords: ['first commercial', 'manchester', 'business computer', 'mark 1'] },
            { url: '(6.4) UNIVAC.html', title: 'First Commercial Computers', keywords: ['UNIVAC', 'IBM 701', 'commercial', 'first', 'business'] },
            { url: '(6.9) Compilador A-0.html', title: 'A-0 Compiler', keywords: ['Grace Hopper', 'compiler', 'programming language', 'a-0'] },
            { url: '(6.15) Harwell Cadet.html', title: 'Harwell Cadet', keywords: ['small computer', 'Harwell', 'relays', 'first transistorized', 'cadet'] },
            { url: '(6.16) Disco Magnético.html', title: 'Magnetic Disc', keywords: ['storage', 'memory', 'disk', 'IBM 350', 'ramac'] },

            // From Integrated Circuit to the Moon (7)
            { url: '(7) Do Circuito Integrado à Lua.html', title: 'From Integrated Circuit to the Moon', keywords: ['integrated circuit', 'ic', 'moon', 'chapter 7', 'introduction'] },
            { url: '(7.5) Compartilhamento de Tempo.html', title: 'Time-Sharing', keywords: ['timesharing', 'multiple users', 'mainframe'] },
            { url: '(7.13) BASIC.html', title: 'BASIC', keywords: ['programming language', 'beginners', 'basic'] },
            { url: '(7.14) IBM 360.html', title: 'IBM-360', keywords: ['IBM', 'mainframe', '360 series', 'architecture'] },
            { url: '(7.32) Microprocessador.html', title: 'Microprocessor', keywords: ['Intel', 'Intel 4004', 'CPU'] },
            { url: '(7.34) ARPANET.html', title: 'ARPANET', keywords: ['internet', 'network', 'military', 'protocol', 'computer network'] },
            { url: '(7.38) Apollo Guidance Computer.html', title: 'Apollo Guidance Computer', keywords: ['AGC', 'Apollo', 'NASA', 'integrated circuit', 'spacecraft'] }
        ]
    };


    // =================================================================
    // FUNÇÕES AUXILIARES E ESPECÍFICAS
    // =================================================================

    function showToast(message) {
        const toast = document.getElementById('notification-toast');
        const toastP = toast ? toast.querySelector('p') : null;
        
        if (!toast || !toastP) {
            console.error("Toast element (notification-toast) or paragraph not found.");
            return;
        }
        
        clearTimeout(toastTimeout);
        toastP.textContent = message;
        
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); 
    }

    function setDarkModeState(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Nota: 'translations' é global e pressupõe-se estar carregado em outro script
        const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
        const newTitleKey = isDark ? 'dark-mode-off-title' : 'dark-mode-on-title';
        const newAltKey = isDark ? 'dark-mode-alt' : 'light-mode-alt';
        
        const newAltText = translationSet[newAltKey] || (isDark ? 'Modo Escuro Ativado' : 'Modo Claro Ativado');
        const newTitle = translationSet[newTitleKey] || (isDark ? 'Clique para Modo Claro' : 'Clique para Modo Escuro');

        if (lampImageHeader) {
            if (isDark) {
                lampImageHeader.classList.add('fade-out');
            } else {
                lampImageHeader.classList.remove('fade-out');
            }
            lampImageHeader.alt = newAltText;
            const headerLink = lampImageHeader.closest('a');
            if (headerLink) {
                headerLink.title = newTitle;
                headerLink.setAttribute('aria-label', newTitle); 
            }
        }

        if (lampImageFooter) {
            if (isDark) {
                lampImageFooter.classList.add('fade-out');
            } else {
                lampImageFooter.classList.remove('fade-out');
            }
            lampImageFooter.alt = newAltText;
            if(lampLogoFooterLink) {
                lampLogoFooterLink.title = newTitle;
                lampLogoFooterLink.setAttribute('aria-label', newTitle);
            }
        }
    }

    function toggleDarkMode() {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        const newDarkState = !isCurrentlyDark;

        setDarkModeState(newDarkState);
        localStorage.setItem('darkMode', newDarkState);
    }

    function loadInitialDarkMode() {
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let initialIsDark;
        if (savedMode !== null) {
            initialIsDark = savedMode === 'true';
        } else {
            initialIsDark = prefersDark;
        }

        setDarkModeState(initialIsDark);
    }

    // -------------------------------------------------------------
    // FUNÇÕES DE BUSCA
    // -------------------------------------------------------------

    function createSearchResultsOverlay() {
        let overlay = document.getElementById('search-results-overlay');
        // Assumindo que 'translations' está definido globalmente 
        const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};

        if (overlay) {
            const closeBtn = overlay.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.setAttribute('aria-label', translationSet['close-button'] || 'Fechar');
            }
            return; 
        }

        overlay = document.createElement('div');
        overlay.id = 'search-results-overlay';
        overlay.innerHTML = `
            <div id="search-results-box">
                <div class="header-overlay-box">
                    <h2 data-key="search-title">${translationSet['search-title'] || 'Resultados da Busca'}</h2>
                    <button class="close-btn" aria-label="${translationSet['close-button'] || 'Fechar'}">&times;</button>
                </div>
                <ul id="search-results-list"></ul>
            </div>
        `;
        document.body.appendChild(overlay);

        document.querySelector('#search-results-overlay .close-btn').addEventListener('click', closeSearchResults);
        overlay.addEventListener('click', (e) => {
            if (e.target.id === 'search-results-overlay') {
                closeSearchResults();
            }
        });
    }

    function showSearchResults(results, searchTerm) {
        createSearchResultsOverlay();
        const overlay = document.getElementById('search-results-overlay');
        const resultsList = document.getElementById('search-results-list');
        const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
        
        const searchTitle = overlay.querySelector('[data-key="search-title"]');

        if (searchTitle) searchTitle.textContent = translationSet['search-title'] || 'Resultados da Busca';
        
        resultsList.innerHTML = ''; 

        if (results.length > 0) {
            results.forEach(item => {
                const listItem = document.createElement('li');
                
                listItem.classList.add('search-result-item'); 
                
                // Usamos a tag <a>, mas estilizamos para parecer um botão/bloco de menu
                listItem.innerHTML = `<a href="${item.url}" class="result-button">${item.title}</a>`;
                resultsList.appendChild(listItem);
            });
        } else {
            const noResultsMessage = translationSet['no-results'] || 'Nenhum resultado encontrado para';
            // Mantém a mensagem sem resultados em um formato de lista simples
            resultsList.innerHTML = `<li><p>${noResultsMessage} <strong>"${searchTerm}"</strong>.</p></li>`;
        }

        overlay.style.display = 'flex';
    }

    function closeSearchResults() {
        const overlay = document.getElementById('search-results-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            // Garante a remoção da classe de posicionamento ao fechar
            overlay.classList.remove('from-footer'); 
        }
    }

    /**
     * Lógica principal de busca. Corrigida para incluir o posicionamento do footer.
     * @param {Event} event 
     * @param {string} inputId - O ID do campo de input ('header-search-input' ou 'footer-search-input')
     */
    function handleSearch(event, inputId) {
        event.preventDefault(); 
        
        const searchInput = document.getElementById(inputId);
        const searchTerm = searchInput.value.trim().toLowerCase();
        const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
        
        if (searchTerm.length === 0) {
            showToast(translationSet['search-placeholder'] || 'Por favor, insira um termo de busca.');
            return;
        }

        const normalizedSearchTerm = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const currentRoutes = routes[currentLanguage];

        // Busca: utiliza includes() para ser mais ampla, buscando a palavra em qualquer lugar.
        const results = currentRoutes.filter(route => {
            const normalizedTitle = route.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            // Verifica no título
            if (normalizedTitle.includes(normalizedSearchTerm)) {
                return true;
            }

            // Verifica nas keywords
            if (route.keywords.some(keyword => {
                const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedKeyword.includes(normalizedSearchTerm);
            })) {
                return true;
            }

            return false;
        });

        // --- Lógica CRÍTICA de Posicionamento (Footer) ---
        const overlay = document.getElementById('search-results-overlay');
        createSearchResultsOverlay(); // Garante que o overlay exista

        if (inputId === 'footer-search-input') {
            if (overlay) overlay.classList.add('from-footer');
        } else {
            if (overlay) overlay.classList.remove('from-footer');
        }
        // ----------------------------------------------------

        showSearchResults(results, searchTerm);
        
        searchInput.value = '';
        
        if (inputId === 'header-search-input' && headerSearchContainer) {
            headerSearchContainer.classList.add('hidden');
        }
    }


    // =================================================================
    // FUNÇÃO CRÍTICA: updateSuggestions (Rigidez total com startsWith)
    // =================================================================
    function updateSuggestions(term) {
        if (!suggestionsBox) return;

        // Apenas mostramos sugestões se o termo tiver 2 ou mais caracteres
        if (term.length < 2) { 
            suggestionsBox.innerHTML = '';
            suggestionsBox.classList.remove('active');
            suggestionsBox.classList.add('hidden');
            return;
        }

        // Normaliza o termo de busca (sem acentos e minúsculo)
        const normalizedTerm = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const currentRoutes = routes[currentLanguage] || routes['pt']; 

        const matches = currentRoutes.filter(route => {
            // 1. TÍTULO: Deve COMEÇAR com o termo (startsWith)
            const normTitle = route.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (normTitle.startsWith(normalizedTerm)) { 
                return true;
            }

            // 2. KEYWORD: Alguma keyword deve COMEÇAR com o termo (startsWith)
            return route.keywords.some(keyword => {
                const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                // A keyword deve COMEÇAR com o termo digitado
                return normalizedKeyword.startsWith(normalizedTerm);
            });

        }).slice(0, 5); // Limita a 5 sugestões

        // Restante da lógica da função (criação do HTML e exibição)
        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(route => 
                `<li class="suggestion-item"><a href="${route.url}" onclick="document.getElementById('header-search-container').classList.add('hidden');">${route.title}</a></li>`
            ).join('');
            suggestionsBox.classList.add('active');
            suggestionsBox.classList.remove('hidden');
        } else {
            suggestionsBox.innerHTML = '';
            suggestionsBox.classList.remove('active');
            suggestionsBox.classList.add('hidden');
        }
    }


    // -------------------------------------------------------------
    // FUNÇÕES DE TRADUÇÃO E ACESSIBILIDADE
    // -------------------------------------------------------------

    function updateContent(lang) {
        // 'translations' é um objeto que deve ser carregado de um script separado (Translations.js)
        if (typeof translations === 'undefined') {
            console.error("Objeto 'translations' não definido. Certifique-se de que Translations.js está carregado.");
            return;
        }
        
        const translationSet = translations[lang];

        if (!translationSet) {
            console.error(`Conjunto de tradução não encontrado para o idioma: ${lang}`);
            return;
        }

        // 1. Tradução dos elementos translatableElements
        document.querySelectorAll('[data-key]').forEach(element => { 
            const key = element.getAttribute('data-key');
            
            if (translationSet[key]) {
                const translatedText = translationSet[key];

                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translatedText);
                } else if (element.tagName === 'BUTTON' && element.querySelector('i')) {
                    element.setAttribute('aria-label', translatedText);
                } else {
                    element.innerHTML = translatedText;
                }
            }
        });

        // 2. Atualizações de estado e elementos específicos
        document.documentElement.lang = lang;
        
        const prevControl = document.querySelector('.carousel-control-prev .visually-hidden');
        const nextControl = document.querySelector('.carousel-control-next .visually-hidden');
        
        if (prevControl) prevControl.textContent = translationSet['prev'] || 'Anterior';
        if (nextControl) nextControl.textContent = translationSet['next'] || 'Próximo';
        
        const newTranslationTitle = translationSet['translation-title'] || 'Tradução';
        if (translationIcon) {
            translationIcon.title = newTranslationTitle;
            translationIcon.setAttribute('aria-label', newTranslationTitle);
        }

        if(translationIconFloating){ 
            translationIconFloating.title = newTranslationTitle;
            translationIconFloating.setAttribute('aria-label', newTranslationTitle);
        }
        
        // Reajusta o ALT/Title da lâmpada
        const isDark = document.body.classList.contains('dark-mode');
        setDarkModeState(isDark); 
        
        createSearchResultsOverlay(); 
        
        // 3. Salva estado
        localStorage.setItem('language', lang);
        currentLanguage = lang;
    }


    function toggleLanguage() {
        if (isSpeaking) {
            stopSpeaking();
            const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
            showToast(translationSet['audio-stop-lang'] || 'Leitura de áudio interrompida para mudar o idioma.'); 
        }
        
        const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
        updateContent(newLang);
    }

    function getPageText() {
        // Tenta pegar o título do carrossel ou um título principal
        const carouselTitleElement = document.querySelector('.static-carousel-title span'); 
        const titleText = carouselTitleElement ? carouselTitleElement.textContent : '';
        
        // Pega todo o texto principal do wrapper de conteúdo (h1, h2, h3, p, .card-title, .card-text, .info-text)
        const mainTextElements = contentWrapper.querySelectorAll('h1, h2, h3, p, .card-title, .card-text, .info-text'); 
        
        const mainText = Array.from(mainTextElements)
            .map(el => el.textContent.trim())
            .filter(text => text.length > 0)
            .join('. '); // Usa um ponto final para separar os blocos de texto

        return [titleText, mainText].filter(text => text.trim() !== '').join('. '); 
    }

    function populateVoiceList() {
        if (synth) {
            availableVoices = synth.getVoices();
        }
    }

    if (synth) {
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoiceList;
        } else {
            // Fallback para navegadores que não disparam o evento imediatamente
            setTimeout(populateVoiceList, 1000); 
        }
    }


    function getPreferredVoice(lang) {
        if (!window.speechSynthesis) return null;

        if (availableVoices.length === 0) {
            populateVoiceList();
        }
        
        if (availableVoices.length === 0) {
            return null;
        }
        
        const lowerCaseLang = lang.toLowerCase(); 
        const targetLangCode = lang === 'pt' ? 'pt-BR' : 'en-US'; 
        const qualityTerms = ['google', 'microsoft', 'enhanced', 'premium', 'high'];
        
        // 1. Tenta encontrar voz de alta qualidade com código de idioma exato ou prefixo
        let preferredVoice = availableVoices.find(voice => 
            (voice.lang.toLowerCase() === targetLangCode.toLowerCase() || 
             voice.lang.toLowerCase().startsWith(lowerCaseLang + '-')) && 
            qualityTerms.some(term => voice.name.toLowerCase().includes(term))
        );

        // 2. Se não encontrar, tenta qualquer voz com o prefixo do idioma (ex: 'pt-BR', 'pt-PT')
        if (!preferredVoice) {
            preferredVoice = availableVoices.find(voice => 
                voice.lang.toLowerCase().startsWith(lowerCaseLang)
            );
        }
        
        // 3. Último recurso: tenta a voz com o código de idioma de 2 letras (ex: 'pt', 'en')
        if (!preferredVoice) {
            preferredVoice = availableVoices.find(voice => 
                voice.lang.toLowerCase() === lowerCaseLang
            );
        }
        
        return preferredVoice || null;
    }

    function startSpeaking() {
        if (!synth) return;

        synth.cancel(); // Cancela qualquer leitura em andamento
        
        const textToSpeak = getPageText();
        
        if (!textToSpeak) return;
        
        const speechLangCode = currentLanguage === 'pt' ? 'pt-BR' : 'en-US'; 
        const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};

        utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = speechLangCode;
        
        const preferredVoice = getPreferredVoice(currentLanguage);
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        // Aplica a taxa de velocidade mapeada
        const selectedRateKey = speedRate.value;
        const langKey = currentLanguage === 'en' ? 'en' : 'pt';
        utterance.rate = speedMaps[langKey][selectedRateKey] || 1.0;

        utterance.onend = () => {
            if (speechToggle) {
                // Reseta o botão para o ícone de 'play' e as labels
                speechToggle.querySelector('i').className = iconPlay;
                speechToggle.setAttribute('title', translationSet['audio-play-title'] || 'Ouvir Conteúdo (Leitor de Áudio)');
                speechToggle.setAttribute('aria-label', translationSet['audio-play-label'] || 'Ativar Leitor de Áudio');
                speechToggle.setAttribute('data-action', 'play');
            }
            isSpeaking = false;
        };

        synth.speak(utterance);
        isSpeaking = true;

        if (speechToggle) {
            // Atualiza o botão para o ícone de 'stop'
            speechToggle.querySelector('i').className = iconStop;
            speechToggle.setAttribute('title', translationSet['audio-stop-title'] || 'Parar Leitura de Áudio');
            speechToggle.setAttribute('aria-label', translationSet['audio-stop-label'] || 'Parar Leitura de Áudio');
            speechToggle.setAttribute('data-action', 'stop');
        }
    }

    function stopSpeaking() {
        if (synth && (synth.speaking || isSpeaking)) {
            synth.cancel();
            isSpeaking = false;
            if (speechToggle) {
                const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
                speechToggle.querySelector('i').className = iconPlay; 
                speechToggle.setAttribute('data-action', 'play');
                speechToggle.setAttribute('title', translationSet['audio-play-title'] || 'Ouvir Conteúdo (Leitor de Áudio)');
                speechToggle.setAttribute('aria-label', translationSet['audio-play-label'] || 'Ativar Leitor de Áudio');
            }
        }
    } 

    if (window.speechSynthesis) {
        // Garante que não haja leitura pendente ao carregar o script
        window.speechSynthesis.cancel();
    }


    // -------------------------------------------------------------
    // ANIMAÇÃO ON SCROLL
    // -------------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in-element, .card');

    function checkVisibility() {
        fadeElements.forEach((element) => { 
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8; 

            if (elementTop < triggerPoint && !element.classList.contains('visible')) {
                if (element.classList.contains('card')) {
                    const cardIndex = Array.from(document.querySelectorAll('.card')).indexOf(element);
                    const delay = cardIndex * 150; 
                    
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                    
                } else {
                    element.classList.add('visible');
                }
            } 
        });
    }

    // -------------------------------------------------------------
    // EVENT LISTENERS E INICIALIZAÇÃO (UNIFICADOS)
    // -------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', () => {
        // 1. Inicialização
        loadInitialDarkMode();
        
        if (synth && availableVoices.length === 0) {
            populateVoiceList();
        }
        
        updateContent(currentLanguage);
        checkVisibility();

        // 2. Menu lateral (Botão Hambúrguer)
        if (menuButton && menu) {
            menuButton.addEventListener("click", (e) => {
                e.stopPropagation(); 
                menu.classList.toggle("active");
                
                if (suggestionsBox) {
                    suggestionsBox.classList.remove('active');
                    suggestionsBox.classList.add('hidden');
                }
            });
        }

        document.addEventListener("click", (e) => {
            // Fechar menu lateral ao clicar fora
            if (menu && menu.classList.contains("active") && !menu.contains(e.target) && e.target !== menuButton) {
                menu.classList.remove("active");
            }
            
            // Lógica para fechar todos os submenus ao clicar fora
            let isClickInsideDropdown = false;
            document.querySelectorAll('.dropdown-menu-item').forEach(item => {
                const submenu = item.querySelector('.submenu');
                if (item.contains(e.target) || (submenu && submenu.contains(e.target))) {
                    isClickInsideDropdown = true;
                }
            });

            if (!isClickInsideDropdown) {
                document.querySelectorAll('.submenu.open').forEach(sub => {
                    sub.style.maxHeight = '0'; 
                    sub.classList.remove('open'); 
                });
                document.querySelectorAll('.dropdown-toggle-menu.rotated').forEach(toggle => {
                    toggle.classList.remove('rotated');
                });
            }
        });

        // 3. Dropdowns (Submenus)
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); 
                
                const submenu = this.nextElementSibling;
                const wrapper = this.closest('.menu-item-wrapper');
                const targetSubmenu = (wrapper && wrapper.nextElementSibling && wrapper.nextElementSibling.classList.contains('submenu')) 
                    ? wrapper.nextElementSibling 
                    : submenu;

                if (!targetSubmenu || !targetSubmenu.classList.contains('submenu')) return;

                const isCurrentlyOpen = targetSubmenu.classList.contains('open');

                // Fecha todos os outros submenus
                document.querySelectorAll('.submenu.open').forEach(sub => {
                    if (sub !== targetSubmenu) {
                        sub.style.maxHeight = '0';
                        sub.classList.remove('open');
                        const parentToggle = sub.previousElementSibling.querySelector('.dropdown-toggle-menu');
                        if (parentToggle) parentToggle.classList.remove('rotated');
                    }
                });

                if (!isCurrentlyOpen) {
                    // ABRINDO
                    targetSubmenu.style.maxHeight = '0'; 
                    targetSubmenu.classList.add('open');
                    const scrollHeight = targetSubmenu.scrollHeight; 
                    targetSubmenu.style.maxHeight = `${scrollHeight}px`;
                    this.classList.add('rotated');
                } else {
                    // FECHANDO
                    targetSubmenu.style.maxHeight = targetSubmenu.scrollHeight + 'px'; 
                    window.getComputedStyle(targetSubmenu).maxHeight; 
                    
                    targetSubmenu.style.maxHeight = '0'; 
                    this.classList.remove('rotated'); 

                    targetSubmenu.addEventListener('transitionend', function handler() {
                        if (targetSubmenu.style.maxHeight === '0px') {
                            targetSubmenu.classList.remove('open');
                        }
                        targetSubmenu.removeEventListener('transitionend', handler);
                    });
                }
            });
        });
        
        // 4. Header & Footer: Toggle Dark Mode (Lâmpadas)
        const headerLogoLink = lampImageHeader ? lampImageHeader.closest('a') : null;

        if (headerLogoLink) {
            headerLogoLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDarkMode();
            });
        }

        if (lampLogoFooterLink) {
            lampLogoFooterLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDarkMode();
            });
        }

        // 5. Header & Flutuante: Toggle Language (Tradução)
        if (translationIcon) {
            translationIcon.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLanguage();
            });
        }

        if(translationIconFloating) {
            translationIconFloating.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLanguage();
            });
        }

        // 6. Flutuante: Leitor de Áudio
        if (speechToggle) {
            speechToggle.addEventListener('click', () => {
                if (!synth) {
                    const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
                    showToast(translationSet['audio-unsupported'] || "Seu navegador não suporta leitura de áudio."); 
                    return;
                }

                if (isSpeaking) {
                    stopSpeaking();
                } else {
                    startSpeaking();
                }
            });
        }

        // 7. Flutuante: Alterar Velocidade
        if (speedRate) {
            speedRate.addEventListener('change', () => {
                if (synth && synth.speaking && isSpeaking) {
                    synth.cancel(); 
                    startSpeaking();
                    const translationSet = typeof translations !== 'undefined' ? (translations[currentLanguage] || translations['pt']) : {};
                    const toastMessage = translationSet['speed-changed'] ? translationSet['speed-changed'].replace('{speed}', speedRate.value) : `Velocidade alterada para ${speedRate.value}x. A leitura foi reiniciada.`;
                    showToast(toastMessage);
                }
            });
        }
        
        // 8. Flutuante: Menu de Acessibilidade
        if (accessibilityToggle && accessibilityOptions) {
            accessibilityToggle.addEventListener('click', () => {
                accessibilityOptions.classList.toggle('hidden-options');
                accessibilityToggle.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                const isMenuOpen = !accessibilityOptions.classList.contains('hidden-options');
                if (isMenuOpen && !accessibilityOptions.contains(e.target) && e.target !== accessibilityToggle && !accessibilityToggle.contains(e.target)) {
                    accessibilityOptions.classList.add('hidden-options');
                    accessibilityToggle.classList.remove('active');
                }
            });
        }
        
        // 9. Footer: Busca (Usando o input 'footer-search-input')
        const footerSearchForm = document.getElementById('footer-search-form');
        if (footerSearchForm) {
            footerSearchForm.addEventListener('submit', (e) => handleSearch(e, 'footer-search-input'));
        }

        // 10. Header: Busca (Formulário e Ícone de Toggle)
        const headerSearchForm = document.getElementById('header-search-form');
        const searchIconHeader = document.getElementById('search-icon-header');
        const closeSearchButton = document.getElementById('close-search-button');

        if (searchIconHeader && headerSearchContainer) {
            searchIconHeader.addEventListener('click', () => {
                headerSearchContainer.classList.toggle('hidden');
                if (!headerSearchContainer.classList.contains('hidden')) {
                    headerInput.focus();
                }
            });
        }

        if (closeSearchButton && headerSearchContainer) {
            closeSearchButton.addEventListener('click', () => {
                headerSearchContainer.classList.add('hidden');
                if (suggestionsBox) {
                    suggestionsBox.classList.remove('active');
                    suggestionsBox.classList.add('hidden');
                }
            });
        }

        if (headerSearchForm) {
            headerSearchForm.addEventListener('submit', (e) => handleSearch(e, 'header-search-input'));
        }
        
        // 11. Header: Busca em Tempo Real (Sugestões)
        if (headerInput && suggestionsBox) {
            headerInput.addEventListener('input', () => {
                updateSuggestions(headerInput.value);
            });
            
            document.addEventListener('click', (e) => {
                const isClickInsideSearch = headerInput.contains(e.target) || suggestionsBox.contains(e.target);
                if (!isClickInsideSearch) {
                    suggestionsBox.classList.remove('active');
                    suggestionsBox.classList.add('hidden');
                }
            });
        }
    });

    // 12. Interseção do Footer para esconder o Header
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (header && footer) {
            const VISIBILITY_THRESHOLD = 0; 
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        header.style.display = 'none';
                    } else {
                        header.style.display = 'flex'; 
                    }
                });
            }, { 
                threshold: VISIBILITY_THRESHOLD 
            });
            observer.observe(footer);
        }

        // 13. Dropdown de Busca do Header (Para telas menores, se aplicável)
        const searchBtn = document.getElementById('search-toggle-btn');
        const searchDropdown = document.getElementById('search-dropdown');
        if (searchBtn && searchDropdown) {
            searchBtn.addEventListener('click', function() {
                searchDropdown.classList.toggle('search-dropdown-visible');
                const isVisible = searchDropdown.classList.contains('search-dropdown-visible');
                searchBtn.setAttribute('aria-expanded', isVisible);
                if (isVisible) {
                    searchDropdown.querySelector('input').focus();
                }
            });
            document.addEventListener('click', function(event) {
                const isClickInside = searchBtn.contains(event.target) || searchDropdown.contains(event.target);
                if (!isClickInside && searchDropdown.classList.contains('search-dropdown-visible')) {
                    searchDropdown.classList.remove('search-dropdown-visible');
                    searchBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
     

    // -------------------------------------------------------------
    // EVENTOS FORA DO DOMContentLoaded (Animação e Scroll)
    // -------------------------------------------------------------
    const backToTopButton = document.getElementById('back-to-top'); 
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('scroll', () => {
        if (backToTopButton) {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    });

    window.addEventListener('load', () => {
        checkVisibility(); 
    });