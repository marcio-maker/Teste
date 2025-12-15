// =========================
// CONFIGURAÇÕES GLOBAIS
// =========================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// =========================
// NOTIFICAÇÕES (TOAST)
// =========================
function showToast(message, type = 'success') {
  const existingToast = $('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');
  
  // Estilos inline para performance
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 120px;
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    z-index: 9999;
    font-weight: 600;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    animation: toastIn 0.3s ease;
    max-width: 90vw;
    text-align: center;
    font-size: 14px;
  `;
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Remove após 3 segundos
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Animação CSS para toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(toastStyle);

// =========================
// GERENCIAMENTO DE FOCO (ACESSIBILIDADE)
// =========================
let _trapHandler = null;
let _lastFocusedElement = null;

function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  
  // Salva o elemento com foco antes de abrir
  _lastFocusedElement = document.activeElement;

  _trapHandler = function (e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  
  document.addEventListener('keydown', _trapHandler);
}

function releaseFocusTrap() {
  if (_trapHandler) {
    document.removeEventListener('keydown', _trapHandler);
    _trapHandler = null;
  }
  
  // Restaura foco ao elemento anterior
  if (_lastFocusedElement) {
    _lastFocusedElement.focus();
    _lastFocusedElement = null;
  }
}

// =========================
// NAVEGAÇÃO MOBILE
// =========================
const hamburgerBtn = $('#hamburgerBtn');
const closeMobileNav = $('#closeMobileNav');
const mobileNav = $('#mobileNav');

function closeNav() {
  mobileNav.classList.remove('active');
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  releaseFocusTrap();
}

function openNav() {
  mobileNav.classList.add('active');
  mobileNav.setAttribute('aria-hidden', 'false');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  
  // Foca no botão de fechar
  if (closeMobileNav) closeMobileNav.focus();
  trapFocus(mobileNav);
}

// Event Listeners para navegação mobile
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', openNav);
}

if (closeMobileNav) {
  closeMobileNav.addEventListener('click', closeNav);
}

// Fecha menu ao clicar em links
$$('.mobile-nav-list a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Fecha menu ao clicar fora
if (mobileNav) {
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });
}

// Fecha menu com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
    closeNav();
  }
});

// =========================
// TEMA (DARK/LIGHT MODE)
// =========================
const desktopToggle = $('#themeToggle');
const mobileToggle = $('#mobileThemeToggle');
const initialTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

function applyTheme(theme) {
  const isLight = theme === 'light';
  
  // Aplica tema ao HTML
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Atualiza ícones e labels
  const icon = isLight ? '☀️' : '🌙';
  const label = isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro';
  
  if (desktopToggle) {
    desktopToggle.textContent = icon;
    desktopToggle.setAttribute('aria-label', label);
    desktopToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }
  
  if (mobileToggle) {
    mobileToggle.textContent = icon;
    mobileToggle.setAttribute('aria-label', label);
    mobileToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  
  // Feedback para usuário
  const message = currentLang === 'en' ? 
    `${next === 'light' ? 'Light' : 'Dark'} theme activated` :
    currentLang === 'es' ? 
      `Tema ${next === 'light' ? 'claro' : 'oscuro'} activado` :
      `Tema ${next === 'light' ? 'claro' : 'escuro'} ativado`;
  
  showToast(message);
}

function initTheme() {
  if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
  applyTheme(initialTheme);
}

// =========================
// IDIOMAS (I18N)
// =========================
const translations = {
  pt: {
    nav_servicos: "Serviços",
    nav_portfolio: "Portfólio",
    nav_cases: "Cases",
    nav_faq: "FAQ",
    nav_sobre: "Sobre",
    nav_contato: "Contato",
    hero_title: "Soluções Inteligentes para Negócios Modernos — <span>IA, Web e Experiências</span>",
    hero_sub: "Design, desenvolvimento e automações que transformam serviços em experiências rentáveis. Protótipos rápidos, produtos prontos e integração com IA para vendas, atendimento e retenção.",
    cta_primary: "Quero minha solução",
    ver_portfolio: "Ver portfólio →",
    btn_enviar: "Enviar mensagem",
    msg_sent: "Mensagem enviada! Responderemos em até 24h.",
    faq_q_1: "Quanto tempo leva para desenvolver um site?",
    faq_a_1: "Depende do escopo. Protótipos: 1–2 semanas. Projeto completo: 4–8 semanas. Implementamos milestones e entregas parciais.",
    faq_q_2: "Vocês oferecem suporte multilíngue?",
    faq_a_2: "Sim — PT, EN, ES com traduções integradas e content fallback.",
    faq_q_3: "Qual é o custo médio de um projeto?",
    faq_a_3: "Variável. Sites básicos a partir de R$5.000; sistemas com IA e integrações complexas R$50.000+ (estimativa).",
    faq_q_4: "Como integramos IA nos projetos?",
    faq_a_4: "Integramos APIs de ML para chat, recomendações e automação. Podemos usar endpoints próprios (FastAPI) ou serviços externos.",
    faq_q_5: "Vocês garantem acessibilidade?",
    faq_a_5: "Sim — seguimento das recomendações WCAG, contraste, navegação por teclado e aria-attributes.",
    faq_q_6: "Oferecem manutenção e suporte?",
    faq_a_6: "Sim — planos mensais: correções, atualizações de segurança e monitoramento de performance.",
    footer_privacy: "Política de Privacidade",
    footer_terms: "Termos de Uso",
    footer_contact: "Contato"
  },
  en: {
    nav_servicos: "Services",
    nav_portfolio: "Portfolio",
    nav_cases: "Cases",
    nav_faq: "FAQ",
    nav_sobre: "About",
    nav_contato: "Contact",
    hero_title: "Smart Solutions for Modern Business — <span>AI, Web, & Experiences</span>",
    hero_sub: "Design, development, and automation that turn services into profitable experiences. Rapid prototypes, finished products, and AI integration for sales, support, and retention.",
    cta_primary: "I want my solution",
    ver_portfolio: "View portfolio →",
    btn_enviar: "Send message",
    msg_sent: "Message sent! We'll respond within 24 hours.",
    faq_q_1: "How long does it take to develop a website?",
    faq_a_1: "It depends on the scope. Prototypes: 1–2 weeks. Full project: 4–8 weeks. We implement milestones and partial deliveries.",
    faq_q_2: "Do you offer multilingual support?",
    faq_a_2: "Yes — PT, EN, ES with integrated translations and content fallback.",
    faq_q_3: "What is the average cost of a project?",
    faq_a_3: "Variable. Basic websites starting from $1,000; systems with AI and complex integrations $10,000+ (estimate).",
    faq_q_4: "How do you integrate AI into projects?",
    faq_a_4: "We integrate ML APIs for chat, recommendations, and automation. We can use our own endpoints (FastAPI) or external services.",
    faq_q_5: "Do you guarantee accessibility?",
    faq_a_5: "Yes — following WCAG recommendations, contrast, keyboard navigation, and aria-attributes.",
    faq_q_6: "Do you offer maintenance and support?",
    faq_a_6: "Yes — monthly plans: bug fixes, security updates, and performance monitoring.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_contact: "Contact"
  },
  es: {
    nav_servicos: "Servicios",
    nav_portfolio: "Portafolio",
    nav_cases: "Casos",
    nav_faq: "FAQ",
    nav_sobre: "Sobre",
    nav_contato: "Contacto",
    hero_title: "Soluciones Inteligentes para Negocios Modernos — <span>IA, Web y Experiencias</span>",
    hero_sub: "Diseño, desarrollo y automatizaciones que convierten servicios en experiencias rentables. Prototipos rápidos, productos listos e integraciones de IA para ventas, soporte y retención.",
    cta_primary: "Quiero mi solución",
    ver_portfolio: "Ver portafolio →",
    btn_enviar: "Enviar mensaje",
    msg_sent: "¡Mensaje enviado! Responderemos en 24 horas.",
    faq_q_1: "¿Cuánto tiempo lleva desarrollar un sitio web?",
    faq_a_1: "Depende del alcance. Prototipos: 1–2 semanas. Proyecto completo: 4–8 semanas. Implementamos hitos y entregas parciales.",
    faq_q_2: "¿Ofrecen soporte multilingüe?",
    faq_a_2: "Sí — PT, EN, ES con traducciones integradas y content fallback.",
    faq_q_3: "¿Cuál es el costo promedio de un proyecto?",
    faq_a_3: "Variable. Sitios web básicos a partir de $1,000; sistemas con IA e integraciones complejas $10,000+ (estimación).",
    faq_q_4: "¿Cómo integran la IA en los proyectos?",
    faq_a_4: "Integramos APIs de ML para chat, recomendaciones y automatización. Podemos usar endpoints propios (FastAPI) o servicios externos.",
    faq_q_5: "¿Garantizan la accesibilidad?",
    faq_a_5: "Sí — siguiendo las recomendaciones WCAG, contraste, navegación por teclado y aria-attributes.",
    faq_q_6: "¿Ofrecen mantenimiento y soporte?",
    faq_a_6: "Sí — planes mensuales: correcciones, actualizaciones de seguridad y monitoreo de rendimiento.",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Uso",
    footer_contact: "Contacto"
  }
};

let currentLang = localStorage.getItem('lang') || 'pt';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const dict = translations[lang] || translations['pt'];
  
  // Atualiza todos os elementos com data-i18n
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let translation = dict[key] || el.textContent;
    
    // Permite HTML no hero_title
    if (key === 'hero_title') {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
  
  // Atualiza botões ativos (desktop)
  $$('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });
  
  // Atualiza botões ativos (mobile)
  $$('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Atualiza atributo lang no HTML
  document.documentElement.lang = lang;
  
  // Feedback para usuário
  const langNames = { pt: 'Português', en: 'English', es: 'Español' };
  showToast(`${langNames[lang]} selected`);
}

function initLang() {
  // Desktop language buttons
  $$('.lang-btn, .mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.dataset.lang;
      applyLang(lang);
    });
  });
  
  applyLang(currentLang);
}

// =========================
// INFO CARDS (SAIBA MAIS)
// =========================
function openInfoCard(infoEl, triggerBtn) {
  infoEl.classList.add('open');
  infoEl.setAttribute('aria-hidden', 'false');
  
  if (triggerBtn) {
    triggerBtn.setAttribute('aria-expanded', 'true');
  }
  
  // Foca no botão de fechar
  const closeBtn = infoEl.querySelector('.close-info');
  if (closeBtn) closeBtn.focus();
  
  trapFocus(infoEl);
}

function closeInfoCard(infoEl) {
  infoEl.classList.remove('open');
  infoEl.setAttribute('aria-hidden', 'true');
  
  // Restaura aria-expanded no trigger
  const topic = infoEl.dataset.topic;
  const trigger = $(`.saiba-mais[data-topic="${topic}"]`);
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  
  releaseFocusTrap();
  if (trigger) trigger.focus(); // Retorna foco ao botão "Saiba Mais"
}

// Inicializa info cards
function initInfoCards() {
  // Event listeners para botões "Saiba Mais"
  $$('.saiba-mais').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const topic = this.dataset.topic;
      
      // Encontra o info-card correto baseado no tamanho da tela
      let info;
      if (window.innerWidth < 768) {
        // Mobile: usa card do carrossel
        info = $(`.cards-carousel-container .info-card[data-topic="${topic}"]`);
      } else {
        // Desktop: usa card do grid
        info = $(`.grid.mobile-carousel .info-card[data-topic="${topic}"]`);
      }
      
      // Fallback se não encontrar
      if (!info) info = $(`.info-card[data-topic="${topic}"]`);
      
      if (!info) return;
      
      // Fecha outros cards abertos
      $$('.info-card.open').forEach(card => {
        if (card !== info) closeInfoCard(card);
      });
      
      // Alterna estado
      if (info.classList.contains('open')) {
        closeInfoCard(info);
      } else {
        openInfoCard(info, this);
      }
    });
  });
  
  // Event listeners para botões "Fechar"
  $$('.close-info').forEach(btn => {
    btn.addEventListener('click', function () {
      const info = this.closest('.info-card');
      if (info) closeInfoCard(info);
    });
  });
  
  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openCard = $('.info-card.open');
      if (openCard) closeInfoCard(openCard);
    }
  });
}

// =========================
// CARROSSEL PRINCIPAL (PORTFOLIO)
// =========================
function initMainCarousel() {
  const inner = $('#carouselInner');
  const dots = $('#dots');
  
  if (!inner || !dots) return;
  
  const slides = inner.children.length;
  let currentIndex = 0;
  let intervalId;
  let isMobile = window.innerWidth < 768;
  let isAutoPlaying = false;
  
  function updateCarousel() {
    // Aplica transform apenas em desktop
    if (!isMobile) {
      const offset = -currentIndex * 100;
      inner.style.transform = `translateX(${offset}%)`;
    }
    
    // Atualiza dots
    $$('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.setAttribute('aria-selected', index === currentIndex);
    });
    
    // Atualiza aria-hidden dos slides
    $$('.carousel-item').forEach((item, index) => {
      item.setAttribute('aria-hidden', index !== currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = (index + slides) % slides;
    updateCarousel();
    
    if (!isMobile) {
      resetAutoPlay();
    } else {
      // Em mobile, scroll suave
      const slideWidth = inner.children[0].offsetWidth + 16;
      inner.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  }
  
  // Event listeners para dots
  $$('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto-play apenas em desktop
  function startAutoPlay() {
    if (!isMobile && !isAutoPlaying) {
      isAutoPlaying = true;
      intervalId = setInterval(() => goToSlide(currentIndex + 1), 8000);
    }
  }
  
  function resetAutoPlay() {
    clearInterval(intervalId);
    isAutoPlaying = false;
    startAutoPlay();
  }
  
  // Mobile: detecta scroll para atualizar dots
  if (isMobile) {
    let scrollTimeout;
    inner.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPos = inner.scrollLeft;
        const slideWidth = inner.children[0].offsetWidth + 16;
        const newIndex = Math.round(scrollPos / slideWidth);
        
        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          updateCarousel();
        }
      }, 100);
    });
  }
  
  // Pausa auto-play ao interagir
  inner.addEventListener('mouseenter', () => {
    if (!isMobile && isAutoPlaying) {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  });
  
  inner.addEventListener('mouseleave', () => {
    if (!isMobile) startAutoPlay();
  });
  
  // Teclado: setas esquerda/direita
  inner.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });
  
  updateCarousel();
  startAutoPlay();
  
  // Recalcula ao redimensionar
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      
      if (isMobile) {
        clearInterval(intervalId);
        isAutoPlaying = false;
        inner.style.transform = 'none';
      } else {
        startAutoPlay();
        updateCarousel();
      }
    }
  });
}

// =========================
// CARROSSEIS DE CARDS (MOBILE)
// =========================
function initCardCarousels() {
  const carousels = {
    'servicos': '#servicosCarousel',
    'tech': '#techCarousel',
    'assistentes': '#assistentesCarousel',
    'produtos': '#produtosCarousel',
    'blog': '#blogCarousel',
    'cases': '#casesCarousel'
  };
  
  Object.keys(carousels).forEach(key => {
    const carousel = $(carousels[key]);
    const indicators = $(`#${key}Indicators`);
    
    if (!carousel || !indicators) return;
    
    const cards = carousel.children;
    const cardCount = cards.length;
    
    // Cria indicadores
    indicators.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `Go to card ${i + 1}`);
      indicator.setAttribute('type', 'button');
      
      indicator.addEventListener('click', () => {
        scrollToCard(carousel, i);
        updateIndicators(indicators, i);
      });
      
      indicators.appendChild(indicator);
    }
    
    // Atualiza indicadores durante scroll
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPos = carousel.scrollLeft;
        const cardWidth = carousel.children[0].offsetWidth + 16;
        const currentIndex = Math.round(scrollPos / cardWidth);
        updateIndicators(indicators, currentIndex);
      }, 100);
    });
    
    // Navegação por teclado
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const scrollPos = carousel.scrollLeft;
        const cardWidth = carousel.children[0].offsetWidth + 16;
        const currentIndex = Math.round(scrollPos / cardWidth);
        const newIndex = e.key === 'ArrowLeft'
          ? Math.max(0, currentIndex - 1)
          : Math.min(cardCount - 1, currentIndex + 1);
        
        scrollToCard(carousel, newIndex);
        updateIndicators(indicators, newIndex);
      }
    });
  });
  
  function scrollToCard(carousel, index) {
    const cardWidth = carousel.children[0].offsetWidth + 16;
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  }
  
  function updateIndicators(indicators, activeIndex) {
    const indicatorButtons = indicators.querySelectorAll('.carousel-indicator');
    indicatorButtons.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndex);
    });
  }
}

// =========================
// ASSISTENTE DE IA
// =========================
function initAssistant() {
  const assistantBtn = $('#assistantBtn');
  const assistantPanel = $('#assistantPanel');
  const assistantIframe = $('#assistantIframe');
  
  if (!assistantBtn || !assistantPanel) return;
  
  function toggleAssistant() {
    const open = assistantPanel.classList.toggle('open');
    assistantBtn.setAttribute('aria-expanded', open);
    assistantPanel.setAttribute('aria-hidden', !open);
    
    // Adiciona/remove classe de pulso no botão
    assistantBtn.classList.toggle('pulse', !open);
    
    if (open) {
      // Foca no iframe quando abre
      setTimeout(() => {
        if (assistantIframe) {
          assistantIframe.focus();
          // Comunicação com iframe se necessário
          if (assistantIframe.contentWindow) {
            assistantIframe.contentWindow.postMessage({ type: 'ASSISTANT_OPEN' }, '*');
          }
        }
      }, 300);
      trapFocus(assistantPanel);
    } else {
      releaseFocusTrap();
      assistantBtn.focus();
    }
  }
  
  assistantBtn.addEventListener('click', toggleAssistant);
  
  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assistantPanel.classList.contains('open')) {
      toggleAssistant();
    }
  });
  
  // Escuta mensagens do iframe
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'ASSISTANT_READY') {
      console.log('🤖 Assistente IA carregado');
    }
    
    if (event.data?.type === 'CLOSE_ASSISTANT') {
      toggleAssistant();
    }
  });
  
  // Inicia com pulso
  setTimeout(() => {
    assistantBtn.classList.add('pulse');
  }, 2000);
}

// =========================
// FORMULÁRIO DE CONTATO
// =========================
function initFormValidation() {
  const form = $('#contactForm');
  if (!form) return;
  
  form.onsubmit = function (e) {
    e.preventDefault();
    
    const nome = $('#nome')?.value.trim();
    const email = $('#email')?.value.trim();
    const mensagem = $('#mensagem')?.value.trim();
    
    // Validação
    if (!nome || !email || !mensagem) {
      const msg = currentLang === 'en' 
        ? 'Please fill in all required fields.' 
        : currentLang === 'es' 
          ? 'Por favor, rellene todos los campos obligatorios.' 
          : 'Por favor, preencha todos os campos obrigatórios.';
      showToast(msg, 'error');
      return;
    }
    
    // Valida email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const msg = currentLang === 'en'
        ? 'Please enter a valid email address.'
        : currentLang === 'es'
          ? 'Por favor, introduzca una dirección de correo electrónico válida.'
          : 'Por favor, insira um endereço de e-mail válido.';
      showToast(msg, 'error');
      return;
    }
    
    // Simulação de envio (substituir por API real)
    const formData = {
      nome,
      email,
      mensagem,
      servico: $('#servico')?.value,
      lang: currentLang,
      timestamp: new Date().toISOString()
    };
    
    console.log('📨 Form submitted:', formData);
    
    // Feedback ao usuário
    showToast(translations[currentLang].msg_sent, 'success');
    
    // Reset form
    form.reset();
    
    // Foco no primeiro campo
    $('#nome')?.focus();
  };
}

// =========================
// ANIMAÇÃO DE NÚMEROS (KPI)
// =========================
function initAnimatedCounters() {
  const counterElements = $$('.kpi strong');
  if (!counterElements.length) return;
  
  const duration = 2000; // 2 segundos
  const totalFrames = Math.floor(duration / (1000 / 60)); // 60 FPS
  
  counterElements.forEach(element => {
    const fullText = element.textContent.trim();
    const targetValue = parseFloat(fullText.match(/[\d.]+/)?.[0]) || 0;
    const prefix = fullText.match(/^[^0-9.]*/)?.[0] || '';
    const suffix = fullText.match(/[^0-9.]*$/)?.[0] || '';
    
    let frame = 0;
    
    const animate = () => {
      frame++;
      let progress = frame / totalFrames;
      
      // Ease out effect
      progress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.min(targetValue, Math.floor(targetValue * progress));
      element.textContent = `${prefix}${currentValue}${suffix}`;
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = fullText; // Valor final exato
      }
    };
    
    requestAnimationFrame(animate);
  });
}

// =========================
// ANIMAÇÕES DE ENTRADA
// =========================
function initAnimations() {
  // Observer para animações ao scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Inicia contadores quando KPIs ficarem visíveis
        if (entry.target.classList.contains('kpis')) {
          initAnimatedCounters();
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Observa todos os elementos com classe fade-up
  $$('.fade-up').forEach(el => {
    observer.observe(el);
  });
  
  // Observa especificamente os KPIs
  const kpisSection = $('.kpis');
  if (kpisSection) observer.observe(kpisSection);
}

// =========================
// GOOGLE ADSENSE
// =========================
function initAdSense() {
  // Carrega AdSense após um pequeno delay para performance
  setTimeout(() => {
    const ads = $$('.adsbygoogle');
    if (ads.length > 0 && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`📢 AdSense carregado para ${ads.length} anúncios`);
      } catch (error) {
        console.warn('⚠️ Erro ao carregar AdSense:', error);
      }
    }
  }, 1500);
}

// =========================
// FUNÇÕES GLOBAIS (para botões de demo)
// =========================
window.openProject = (project) => {
  const message = currentLang === 'en'
    ? `Opening project: ${project}`
    : currentLang === 'es'
      ? `Abriendo proyecto: ${project}`
      : `Abrindo projeto: ${project}`;
  showToast(message);
  
  // Aqui você pode adicionar lógica para abrir projetos específicos
  if (project === 'ead-pwa') {
    window.open('projetos-principais/projeto-pwa-educacao.html', '_blank');
  }
};

window.openCase = (caseName) => {
  const message = currentLang === 'en'
    ? `Opening case study: ${caseName}`
    : currentLang === 'es'
      ? `Abriendo caso de estudio: ${caseName}`
      : `Abrindo case: ${caseName}`;
  showToast(message);
};

window.openCode = (project) => {
  showToast(`Código do projeto ${project}`, 'success');
};

// =========================
// INICIALIZAÇÃO GERAL
// =========================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 MakerAI Studio inicializando...');
  
  // Inicializa módulos
  initTheme();
  initLang();
  initInfoCards();
  initMainCarousel();
  initCardCarousels();
  initAssistant();
  initFormValidation();
  initAnimations();
  initAdSense();
  
  // Smooth scroll para links âncora
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#0') return;
      
      const target = $(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Atualiza URL sem recarregar a página
        history.pushState(null, null, href);
      }
    });
  });
  
  // Adiciona classe para dispositivos touch
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');
  }
  
  console.log('✅ MakerAI Studio inicializado com sucesso!');
});

// =========================
// UTILITÁRIOS DE DEBUG
// =========================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🔧 Modo desenvolvimento ativo');
  
  // Log de eventos úteis
  window.addEventListener('error', (e) => {
    console.error('❌ Erro capturado:', e.error);
  });
}
