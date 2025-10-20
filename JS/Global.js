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

// Mapeamento de velocidade (Corrigido para usar lang codes corretos)
const speedMaps = {
    'pt': { 
        '0.5': 0.65,
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
// DADOS
// =================================================================

// --- Mapeamento de Rotas para Busca ---
const routes = {
    'pt': [
        { key: 'home', title: 'Home', url: '../Páginas/Home.html', keywords: ['página inicial', 'início', 'site'] },
        { key: 'valvulas-transistor', title: 'Da Válvula ao Transistor', url: "../Páginas/(Tema 1) Home.html", keywords: ['válvula', 'transistor', 'eletrônica', 'tema 1'] },
        { key: 'revolucao-transistor', title: 'IBM-360', url: '../Páginas/(Tema 2) IBM-360.html', keywords: ['revolução', 'transistor', 'semicondutor', 'pequeno'] },
        { key: 'primeira-geracao', title: 'Basic', url: '../Páginas/(Tema 2) Basic.html', keywords: ['computador', 'eniac', 'univac', 'primeira geração'] },
        { key: 'apollo-menu-item', title: 'Apollo', url: '../Páginas/(Tema 2) Apollo.html', keywords: ['apollo', 'lua', 'programa espacial', 'foguete'] },
        { key: 'ci-ate-lua', title: 'Circuito Integrado até a Lua (Principal)', url: '#', keywords: ['circuito integrado', 'ci', 'lua', 'apollo', 'tema 2'] },
        { key: 'nascimento-ci', title: 'Nascimento do CI', url: '../Páginas/circuito.html', keywords: ['nascimento', 'ci', 'chip', 'jack kilby'] },
        { key: 'apollo', title: 'Miniaturização e o Programa Apollo', url: '../Páginas/circuito.html#apollo', keywords: ['miniatura', 'apollo', 'espaço', 'lua', 'foguete'] },
        { key: 'futuro-eletronica', title: 'O Futuro da Eletrônica', url: '../Páginas/circuito.html#futuro', keywords: ['futuro', 'eletrônica', 'quântico', 'avanço'] },
        { key: 'sobre-nos', title: 'Sobre nós', url: '../Páginas/Sobre.html', keywords: ['equipe', 'desenvolvedores', 'projeto'] },
        { key: 'card4-titulo', title: 'Quiz', url: '../Páginas/Quiz.html', keywords: ['teste', 'perguntas', 'conhecimento'] },
    ],
    'en': [
        { key: 'home', title: 'Home', url: '../Páginas/Home.html', keywords: ['home page', 'start', 'site'] },
        { key: 'valvulas-transistor', title: 'From Tubes to Transistors (Main)', url: '#', keywords: ['tube', 'transistor', 'electronics', 'topic 1'] },
        { key: 'inicio-valvulas', title: 'Circuit Home', url: '../Páginas/Home Circuito.html', keywords: ['beginning', 'vacuum tubes', 'old electronics'] }, 
        { key: 'revolucao-transistor', title: 'IBM-360', url: '../Páginas/IBM-360.html', keywords: ['revolution', 'transistor', 'semiconductor', 'small'] }, 
        { key: 'primeira-geracao', title: 'Basic', url: '../Páginas/Basic(1964).html', keywords: ['computer', 'eniac', 'univac', 'first generation'] }, 
        { key: 'apollo-menu-item', title: 'Apollo', url: '../Páginas/Apollo.html', keywords: ['apollo', 'moon', 'space program', 'rocket'] },
        { key: 'ci-ate-lua', title: 'Integrated Circuit to the Moon (Main)', url: '#', keywords: ['integrated circuit', 'ic', 'moon', 'apollo', 'topic 2'] },
        { key: 'nascimento-ci', title: 'Birth of the IC', url: '../Páginas/circuito.html', keywords: ['birth', 'ic', 'chip', 'jack kilby'] },
        { key: 'apollo', title: 'Miniaturization and the Apollo Program', url: '../Páginas/circuito.html#apollo', keywords: ['miniaturization', 'apollo', 'space', 'moon', 'rocket'] },
        { key: 'futuro-eletronica', title: 'The Future of Electronics', url: '../Páginas/circuito.html#futuro', keywords: ['future', 'electronics', 'quantum', 'advancement'] },
        { key: 'sobre-nos', title: 'About Us', url: '../Páginas/Sobre.html', keywords: ['team', 'developers', 'project'] },
        { key: 'card4-titulo', title: 'Quiz', url: '../Páginas/Quiz.html', keywords: ['test', 'questions', 'knowledge',] },
    ]
}

// --- OBJETO DE TRADUÇÃO ---
const translations = {
    'pt': {
        'home': 'Home', 
        'valvulas-transistor': 'Da Válvula ao Transistor', 
        'revolucao-transistor': 'IBM-360',
        'primeira-geracao': 'Basic', 
        'apollo-menu-item': 'Apollo', 
        'touch': 'Touch',
        'ci-ate-lua': 'Do Circuito Integrado à Lua',
        'nascimento-ci': 'Nascimento do CI', 
        'futuro-eletronica': 'O Futuro da Eletrônica', 
        'sobre-nos': 'Sobre nós', 
        'capa-do-livro': 'Releitura da Capa',
        'quiz': 'Teste Seus Conhecimentos', 
        'carrossel-titulo': 
        'Da Válvula ao Transistor: Circuitos Integrados Conquistam a Lua',
        'prev': 'Anterior', 
        'next': 'Próximo', 
        'titulo-valvulas': 'Da Válvula ao Transistor',
        'texto-valvulas': 'Nesta seção, apresentamos uma pesquisa desenvolvida sobre a evolução da eletrônica, abordando o tema “Da válvula ao transistor”. O trabalho explora como os avanços tecnológicos tornaram possível a miniaturização de componentes, contribuíram para o desenvolvimento dos computadores e foram fundamentais para marcos históricos.',
        "read-more-link": "Leia mais...", 
        'info-titulo-conteudo': 'Conteúdo do Site',
        'info-texto-conteudo': 'Nesse site, buscamos apresentar uma visão abrangente dos principais temas desenvolvidos no Projeto Integrado, intitulado Da válvula ao transistor e Do circuito integrado até a Lua. Nosso objetivo é apresentar, de forma organizada e acessível, a evolução das tecnologias eletrônicas que revolucionaram o mundo no século XX.',
        'info-titulo-sobre': 'Sobre o site',
        'info-texto-sobre': 'A ideia central foi criar uma plataforma simples, funcional e visualmente agradável, que servisse como uma vitrine do nosso projeto. Todo o site foi construído com base em decisões tomadas em equipe: desde a escolha das cores e estrutura das páginas até a forma como os conteúdos seriam apresentados.',
        'titulo-lua': 'Do Circuito integrado à Lua',
        'texto-lua': 'Nesta seção, apresentamos uma pesquisa sobre a evolução da eletrônica a partir do desenvolvimento dos circuitos integrados e sua importância histórica, especialmente na conquista espacial. O trabalho destaca como a miniaturização dos componentes eletrônicos permitiu a criação de dispositivos mais complexos e eficientes, culminando com o uso desses avanços no programa Apollo, que levou o homem à Lua.',
        "read-more-link-ci": "Leia mais...", 
        'card1-titulo': 'Da Válvula ao Transistor', 
        'card1-texto': 'Explore a evolução que transformou a eletrônica, da era das válvulas aos componentes modernos.',
        'card2-titulo': 'Do Circuito Integrado à Lua', 
        'card2-texto': 'Conheça a história do CI e seu papel fundamental na miniaturização e nas missões Apollo.', 
        'card3-titulo': 'Sobre nós',
        'card3-texto': 'Saiba mais sobre a equipe por trás deste projeto e nossa paixão por tecnologia e história.', 
        'card4-titulo': 'Teste Seus Conhecimentos', 
        'card4-texto': 'Clique para iniciar o Quiz e desafie-se sobre os temas de eletrônica e história dos Circuitos Integrados.',
        'card5-titulo': 'Releitura da Capa', 
        'card5-texto': 'Veja a arte de capa e a inspiração por trás do design visual do nosso projeto.', 
        'card-btn': 'Vá para a página',
        'contato': 'Contato', 
        'quick-links': 'LINKS RÁPIDOS', 
        'search-placeholder': 'Pesquisar...', 
        'search-button': 'Buscar', 
        'footer-copy': '© 2025 - Da Válvula ao Transistor: Circuitos Integrados Conquistam a Lua | Todos os direitos reservados.',
        'lamp-alt-on': 'Clique para Modo Escuro',
        'lamp-alt-off': 'Clique para Modo Claro',
        'translation-title': 'Tradução (Clique para Inglês)', 
        'audio-stop-lang': 'Leitura de áudio interrompida devido à troca de idioma.',
        'search-title': 'Resultados da Busca', 
        'no-results': 'Nenhum resultado encontrado para', 
        'close-button': 'Fechar',
    }
    ,
    'en': {
    'home': 'Home',
    'valvulas-transistor': 'From Tube to Transistor',
    'revolucao-transistor': 'IBM-360',
    'primeira-geracao': 'Basic',
    'apollo-menu-item': 'Apollo',
    'touch': 'Touch',
    'ci-ate-lua': 'From Integrated Circuit to the Moon',
    'nascimento-ci': 'Birth of the IC',
    'apollo': 'Miniaturization and the Apollo Program',
    'futuro-eletronica': 'The Future of Electronics',
    'sobre-nos': 'About Us',
    'capa-do-livro': 'Cover Reinterpretation',
    'quiz': 'Test Your Knowledge',
    'carrossel-titulo': 'From Tube to Transistor: Integrated Circuits Conquer the Moon',
    'prev': 'Previous',
    'next': 'Next',
    'titulo-valvulas': 'From Tube to Transistor',
    'texto-valvulas': 'In this section, we present research on the evolution of electronics, covering the theme "From Tube to Transistor." The work explores how technological advancements enabled component miniaturization, contributed to computer development, and were fundamental to historic milestones.',
    "read-more-link": "Read more...",
    'info-titulo-conteudo': 'Site Content',
    'info-texto-conteudo': 'In this site, we aim to present a comprehensive overview of the main themes developed in the Integrated Project, titled From Tube to Transistor and From Integrated Circuit to the Moon. Our goal is to present the evolution of electronic technologies that revolutionized the world in the 20th century in an organized and accessible manner.',
    'info-titulo-sobre': 'About the Site',
    'info-texto-sobre': 'The central idea was to create a simple, functional, and visually appealing platform that serves as a showcase for our project. The entire site was built based on team decisions: from the choice of colors and page structure to the way content would be presented.',
    'titulo-lua': 'From Integrated Circuit to the Moon',
    'texto-lua': 'In this section, we present research on the evolution of electronics starting from the development of integrated circuits and their historical importance, especially in space exploration. The work highlights how the miniaturization of electronic components allowed for the creation of more complex and efficient devices, culminating with their use in the Apollo program, which took man to the Moon.',
    "read-more-link-ci": "Read more...",
    
    // Cards com as descrições melhoradas:
    'card1-titulo': 'From Tube to Transistor',
    'card1-texto': 'Explore the evolution that transformed electronics, from the vacuum tube era to modern components.',
    'card2-titulo': 'From Integrated Circuit to the Moon',
    'card2-texto': 'Learn the history of the IC and its fundamental role in miniaturization and the Apollo missions.',
    'card3-titulo': 'About Us',
    'card3-texto': 'Find out more about the team behind this project and our passion for technology and history.',
    'card4-titulo': 'Test Your Knowledge',
    'card4-texto': 'Click to start the Quiz and challenge yourself on the topics of electronics and the history of Integrated Circuits.',
    'card5-titulo': 'Cover Reinterpretation',
    'card5-texto': 'See the cover art and the inspiration behind the visual design of our project.',
    'card-btn': 'Go to page',
    
    'contato': 'Contact',
    'quick-links': 'QUICK LINKS',
    'search-placeholder': 'Search...', 
    'search-button': 'Search',
    'footer-copy': '© 2025 - From Tube to Transistor: Integrated Circuits Conquer The Moon | All rights reserved.',
    'lamp-alt-on': 'Click for Dark Mode',
    'lamp-alt-off': 'Click for Light Mode',
    'translation-title': 'Translation (Click for Portuguese)',
    'audio-stop-lang': 'Audio reading stopped due to language change.',
    'search-title': 'Search Results',
    'no-results': 'No results found for',
    'close-button': 'Close',
}
}

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

// -------------------------------------------------------------
// DARK MODE 
// -------------------------------------------------------------
function setDarkModeState(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    const newAltKey = isDark ? 'lamp-alt-off' : 'lamp-alt-on';
    const newAltText = translations[currentLanguage][newAltKey];
    
    const newTitle = isDark 
        ? translations[currentLanguage]['lamp-alt-off'].replace('Modo Escuro Ativado', 'Clique para Modo Claro') 
        : translations[currentLanguage]['lamp-alt-on'].replace('Clique para Modo Escuro', 'Clique para Modo Escuro');

    // Lâmpada do Header
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
        }
    }

    // Lâmpada do Footer
    if (lampImageFooter) {
        if (isDark) {
            lampImageFooter.classList.add('fade-out');
        } else {
            lampImageFooter.classList.remove('fade-out');
        }
        lampImageFooter.alt = newAltText;
        if(lampLogoFooterLink) {
            lampLogoFooterLink.title = newTitle;
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
// FUNCIONALIDADE DE BUSCA
// -------------------------------------------------------------

function createSearchResultsOverlay() {
    let overlay = document.getElementById('search-results-overlay');
    if (overlay) {
        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', translations[currentLanguage]['close-button']);
        }
        return; 
    }

    overlay = document.createElement('div');
    overlay.id = 'search-results-overlay';
    overlay.innerHTML = `
        <div id="search-results-box">
            <div class="header-overlay-box">
                <h2 data-key="search-title">${translations[currentLanguage]['search-title']}</h2>
                <button class="close-btn" aria-label="${translations[currentLanguage]['close-button']}">&times;</button>
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
    const searchTitle = overlay.querySelector('[data-key="search-title"]');

    if (searchTitle) searchTitle.textContent = translations[currentLanguage]['search-title'];
    
    resultsList.innerHTML = ''; 

    if (results.length > 0) {
        results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${item.url}">${item.title}</a>`;
            resultsList.appendChild(listItem);
        });
    } else {
        const noResultsMessage = translations[currentLanguage]['no-results'];
        resultsList.innerHTML = `<li><p>${noResultsMessage} <strong>"${searchTerm}"</strong>.</p></li>`;
    }

    overlay.style.display = 'flex';
}

function closeSearchResults() {
    const overlay = document.getElementById('search-results-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function handleSearch(event, inputId) {
    event.preventDefault(); 
    
    const searchInput = document.getElementById(inputId);
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
        showToast(translations[currentLanguage]['search-placeholder']);
        return;
    }

    const normalizedSearchTerm = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const currentRoutes = routes[currentLanguage];

    const results = currentRoutes.filter(route => {
        const normalizedTitle = route.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedTitle.includes(normalizedSearchTerm)) {
            return true;
        }

        if (route.keywords.some(keyword => {
            const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalizedKeyword.includes(normalizedSearchTerm);
        })) {
            return true;
        }

        return false;
    });

    showSearchResults(results, searchTerm);
    
    searchInput.value = '';
    
    if (inputId === 'header-search-input' && headerSearchContainer) {
        headerSearchContainer.classList.add('hidden');
    }
}

function updateSuggestions(term) {
    if (!suggestionsBox) return;

    if (term.length < 2) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('active');
        suggestionsBox.classList.add('hidden');
        return;
    }

    const normalized = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const currentRoutes = routes[currentLanguage];

    const matches = currentRoutes.filter(route => {
        const normTitle = route.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normTitle.includes(normalized)) return true;
        return route.keywords.some(k => 
             k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized)
        );
    }).slice(0, 5); 

    if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(route => 
            `<li><a href="${route.url}" onclick="document.getElementById('header-search-container').classList.add('hidden');">${route.title}</a></li>`
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
// TRADUÇÃO
// -------------------------------------------------------------
function updateContent(lang) {
    const translationSet = translations[lang];

    translatableElements.forEach(element => {
        const key = element.getAttribute('data-key');
        
        if (translationSet[key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translationSet[key]);
            } else if (element.tagName === 'BUTTON' && element.querySelector('i')) {
                element.setAttribute('aria-label', translationSet[key]);
            } else {
                element.textContent = translationSet[key];
            }
        }
    });

    document.documentElement.lang = lang;
    
    const prevControl = document.querySelector('.carousel-control-prev .visually-hidden');
    const nextControl = document.querySelector('.carousel-control-next .visually-hidden');
    if (prevControl) prevControl.textContent = translationSet['prev'];
    if (nextControl) nextControl.textContent = translationSet['next'];
    
    const newTranslationTitle = translationSet['translation-title'];
    if (translationIcon) {
        translationIcon.title = newTranslationTitle;
        translationIcon.setAttribute('aria-label', newTranslationTitle);
    }

    if(translationIconFloating){ 
        translationIconFloating.title = newTranslationTitle;
        translationIconFloating.setAttribute('aria-label', newTranslationTitle);
    }
    
    // Reajusta o ALT da lâmpada
    const isDark = document.body.classList.contains('dark-mode');
    setDarkModeState(isDark); 
    
    // Atualiza o aria-label do botão de fechar no overlay de busca
    createSearchResultsOverlay(); 
    
    localStorage.setItem('language', lang);
    currentLanguage = lang;
}

function toggleLanguage() {
    if (isSpeaking) {
        stopSpeaking();
        showToast(translations[currentLanguage]['audio-stop-lang']); 
    }
    
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
    updateContent(newLang);
}

// -------------------------------------------------------------
// LEITOR DE ÁUDIO (TEXT-TO-SPEECH)
// -------------------------------------------------------------
function getPageText() {
    const carouselTitleElement = document.querySelector('.static-carousel-title span'); 
    const titleText = carouselTitleElement ? carouselTitleElement.textContent : '';
    
    const mainTextElements = contentWrapper.querySelectorAll('h1, h2, p, .card-title, .card-text'); 
    
    const mainText = Array.from(mainTextElements)
        .map(el => el.textContent)
        .join('. '); 

    return [titleText, mainText].filter(text => text.trim() !== '').join('. '); 
}

let availableVoices = [];

function populateVoiceList() {
    availableVoices = synth.getVoices();
}

if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
} else if (window.speechSynthesis) {
    setTimeout(populateVoiceList, 1000); 
}

function getPreferredVoice(lang) {
    if (!window.speechSynthesis) return null;

    if (availableVoices.length === 0) {
        populateVoiceList();
    }
    
    const lowerCaseLang = lang.toLowerCase();
    const langCode = lang === 'pt' ? 'pt-br' : 'en-us'; 
    const qualityTerms = ['google', 'microsoft', 'enhanced', 'premium', 'high'];
    
    let preferredVoice = availableVoices.find(voice => 
        (voice.lang.toLowerCase().startsWith(lowerCaseLang) || voice.lang.toLowerCase() === langCode) &&
        qualityTerms.some(term => voice.name.toLowerCase().includes(term))
    );

    if (!preferredVoice) {
        preferredVoice = availableVoices.find(voice => 
            voice.lang.toLowerCase().startsWith(lowerCaseLang) || voice.lang.toLowerCase() === langCode
        );
    }
    
    return preferredVoice;
}

function startSpeaking() {
    if (!synth || !synth.speaking) {
        const textToSpeak = getPageText();
        
        if (!textToSpeak) return;

        synth.cancel();
        
        utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = document.documentElement.lang; 
        
        const preferredVoice = getPreferredVoice(utterance.lang);
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        const selectedRateKey = speedRate.value;
        const langKey = currentLanguage === 'en' ? 'en' : 'pt';
        utterance.rate = speedMaps[langKey][selectedRateKey] || 1.0;

        utterance.onend = () => {
            speechToggle.querySelector('i').className = iconPlay;
            speechToggle.setAttribute('title', 'Ouvir Conteúdo (Leitor de Áudio)');
            speechToggle.setAttribute('aria-label', 'Ativar Leitor de Áudio');
            speechToggle.setAttribute('data-action', 'play');
            isSpeaking = false;
        };

        synth.speak(utterance);
        isSpeaking = true;

        // Atualiza o ícone
        speechToggle.querySelector('i').className = iconStop;
        speechToggle.setAttribute('title', 'Parar Leitura de Áudio');
        speechToggle.setAttribute('aria-label', 'Parar Leitura de Áudio');
        speechToggle.setAttribute('data-action', 'stop');
    }
}

function stopSpeaking() {
    if (synth.speaking || isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        if (speechToggle) {
            speechToggle.querySelector('i').className = iconPlay; 
            speechToggle.setAttribute('data-action', 'play');
            speechToggle.setAttribute('title', 'Ouvir Conteúdo (Leitor de Áudio)');
            speechToggle.setAttribute('aria-label', 'Ativar Leitor de Áudio');
        }
    }
}   

function stopNarrationOnLoad() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}

stopNarrationOnLoad();

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
// EVENT LISTENERS E INICIALIZAÇÃO
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialização
    loadInitialDarkMode();
    updateContent(currentLanguage);

    // 2. Menu lateral (Botão Hambúrguer)
    if (menuButton && menu) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            menu.classList.toggle("active");
            
            // NOVO: Fecha as sugestões de busca ao abrir o menu
            if (suggestionsBox) {
                suggestionsBox.classList.remove('active');
                suggestionsBox.classList.add('hidden');
            }

            // A Lógica de reset (fechar submenus) foi REMOVIDA daqui.
            // O submenu agora só fecha de forma suave quando o menu principal fecha.
        });
    }

    

    document.addEventListener("click", (e) => {
        // Fechar menu lateral ao clicar fora
        if (menu && menu.classList.contains("active") && !menu.contains(e.target) && e.target !== menuButton) {
            menu.classList.remove("active");
            
            // A lógica de "Fechamento forçado de submenus" foi REMOVIDA daqui.
            // Isso garante que o submenu feche junto com o menu principal (sidebar),
            // sem anular a transição CSS de 0.4s.
        }
        
        // Lógica para fechar todos os submenus ao clicar fora
        // Nota: MANTIVEMOS ESTE BLOCO! Ele fecha os submenus APENAS quando o clique
        // não está no menu lateral e não está no submenu, permitindo a transição CSS.
        let isClickInsideDropdown = false;
        document.querySelectorAll('.dropdown-menu-item').forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (item.contains(e.target) || (submenu && submenu.contains(e.target))) {
                isClickInsideDropdown = true;
            }
        });

        if (!isClickInsideDropdown) {
            document.querySelectorAll('.submenu.open').forEach(sub => {
                sub.classList.remove('open'); 
            });
            document.querySelectorAll('.dropdown-toggle-menu.rotated').forEach(toggle => {
                toggle.classList.remove('rotated');
            });
        }
    });

    // 3. Dropdowns (Submenus) - CORREÇÃO FINAL USANDO SCROLLHEIGHT
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            
            const submenu = this.nextElementSibling;
            const wrapper = this.closest('.menu-item-wrapper');
            const targetSubmenu = wrapper ? wrapper.nextElementSibling : submenu;

            if (!targetSubmenu || !targetSubmenu.classList.contains('submenu')) return;

            const isCurrentlyOpen = targetSubmenu.classList.contains('open');

            if (!isCurrentlyOpen) {
                // ✅ ABRINDO: Calcula a altura real (scrollHeight) para transição precisa
                
                // 1. Remove qualquer max-height fixo (se houver) e adiciona a classe 'open' temporariamente.
                targetSubmenu.style.maxHeight = '';
                targetSubmenu.classList.add('open');
                
                // 2. Lê a altura real do conteúdo para a transição
                const scrollHeight = targetSubmenu.scrollHeight; 
                
                // 3. Aplica a altura real como maxHeight para a transição (e remove a classe 'open')
                targetSubmenu.style.maxHeight = `${scrollHeight}px`;
                this.classList.add('rotated');
                
            } else {
                // 🛑 FECHANDO: LÓGICA ANTI-DELAY E RETORNO PRECISO 🛑
                
                // 1. Define a altura atual como inline (ex: 100px)
                targetSubmenu.style.maxHeight = targetSubmenu.scrollHeight + 'px';
                
                // 2. Força o navegador a recalcular a altura (necessário para transições de fechamento)
                window.getComputedStyle(targetSubmenu).maxHeight; 
                
                // 3. Remove a classe 'rotated' e define max-height para 0 APÓS micro-delay
                this.classList.remove('rotated'); 
                
                setTimeout(() => {
                    targetSubmenu.style.maxHeight = '0';
                    targetSubmenu.classList.remove('open'); // Opcional, mas limpa o estado
                }, 10); 
            }
        });
    });
    
    // NOTA IMPORTANTE: Certifique-se de que a próxima linha de código no seu home.js
    // seja a continuação correta, como a Seção 4 (Dark Mode/Lâmpadas),
    // sem nenhum código solto ou duplicado logo abaixo deste bloco.
    

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
                showToast("Seu navegador não suporta leitura de áudio."); 
                return;
            }

            if (isSpeaking) { // Usa a variável de controle global
                stopSpeaking();
            } else {
                startSpeaking();
            }
        });
    }

    // 7. Flutuante: Alterar Velocidade
    if (speedRate) {
        speedRate.addEventListener('change', () => {
            if (synth.speaking && isSpeaking) {
                // Para e reinicia a leitura com a nova velocidade
                synth.cancel(); 
                startSpeaking();
                showToast(`Velocidade alterada para ${speedRate.value}x. A leitura foi reiniciada.`);
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
    
    // 9. Footer: Busca
    const footerSearchForm = document.getElementById('footer-search-form');
    if (footerSearchForm) {
        footerSearchForm.addEventListener('submit', (e) => handleSearch(e, 'footer-search-input'));
    }

    // 10. Header: Busca
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
    
    // 11. Header: Busca em Tempo Real
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
    
    // 12. Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }



// 13. Event listeners para Animação e Scroll (fora do DOMContentLoaded)
window.addEventListener('load', () => {
    checkVisibility(); 
});
window.addEventListener('scroll', checkVisibility);

constbackToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});
})  


    document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (!header || !footer) {
            console.error("Header ou Footer não encontrados. Verifique seus seletores.");
            return;
        }

        // Defina o limite de visibilidade (Threshold)
        // 0.2 (ou 20%) significa que o header só some quando 20% do footer
        // já estiver visível na tela. Mude este valor (0.0 a 1.0) conforme necessário.
        const VISIBILITY_THRESHOLD = 0; 

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Footer está visível no limite definido: Esconde o header
                    header.style.display = 'none';
                } else {
                    // Footer não está visível: Mostra o header fixo
                    header.style.display = 'flex'; 
                }
            });
        }, { 
            // Usa o limite de visibilidade definido
            threshold: VISIBILITY_THRESHOLD 
        });

        observer.observe(footer);
    });

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-toggle-btn');
    const searchDropdown = document.getElementById('search-dropdown');

    if (searchBtn && searchDropdown) {
        searchBtn.addEventListener('click', function() {
            // Alterna a classe de visibilidade
            searchDropdown.classList.toggle('search-dropdown-visible');
            
            // Alterna o estado de acessibilidade
            const isVisible = searchDropdown.classList.contains('search-dropdown-visible');
            searchBtn.setAttribute('aria-expanded', isVisible);

            // Se estiver visível, foca no campo de busca para o usuário começar a digitar
            if (isVisible) {
                searchDropdown.querySelector('input').focus();
            }
        });

        // Opcional: Fechar o dropdown ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInside = searchBtn.contains(event.target) || searchDropdown.contains(event.target);
            
            if (!isClickInside && searchDropdown.classList.contains('search-dropdown-visible')) {
                searchDropdown.classList.remove('search-dropdown-visible');
                searchBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

