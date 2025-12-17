/* ============================================
   JAVASCRIPT COMPLETO - MAKERAI STUDIO
   ============================================ */

// =========================
// ELEMENTOS PRINCIPAIS
// =========================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const langButtons = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
const cardToggles = document.querySelectorAll('.card-toggle');
const detailsOverlay = document.getElementById('detailsOverlay');
const closeOverlay = document.querySelector('.close-overlay');
const detailsContent = document.getElementById('detailsContent');
const contactForm = document.getElementById('contactForm');
const carouselTrack = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const assistantBtn = document.getElementById('assistantBtn');
const faqQuestions = document.querySelectorAll('.faq-question');

// =========================
// CONTROLE DO MENU MOBILE
// =========================
function initMobileMenu() {
  if (!hamburgerBtn || !closeMenuBtn || !mobileMenu) return;
  
  const openMenu = () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };
  
  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };
  
  hamburgerBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  
  // Fechar menu ao clicar em links
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Fechar menu ao clicar fora
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
  
  // Fechar menu com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// =========================
// CONTROLE DO TEMA
// =========================
function initThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualiza ícones
    const themeIcon = isDark ? '☀️' : '🌙';
    const themeLabel = isDark ? 'Alternar para tema escuro' : 'Alternar para tema claro';
    
    if (themeToggle) {
      themeToggle.textContent = themeIcon;
      themeToggle.setAttribute('aria-label', themeLabel);
    }
    if (mobileThemeToggle) {
      mobileThemeToggle.textContent = themeIcon;
    }
    
    showToast(`Tema ${newTheme === 'light' ? 'claro' : 'escuro'} ativado`);
  }
  
  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isDark = savedTheme === 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = isDark ? '🌙' : '☀️';
    if (themeToggle) themeToggle.textContent = themeIcon;
    if (mobileThemeToggle) mobileThemeToggle.textContent = themeIcon;
  }
  
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
  
  applySavedTheme();
}

// =========================
// CONTROLE DE IDIOMA
// =========================
function initLanguageSwitcher() {
  const translations = {
    pt: {
      // Menu
      'nav_services': 'Serviços',
      'nav_portfolio': 'Portfólio',
      'nav_cases': 'Cases',
      'nav_faq': 'FAQ',
      'nav_about': 'Sobre',
      'nav_contact': 'Contato',
      'nav_assistants': 'Assistentes IA',
      'nav_tech': 'Tecnologias',
      'nav_products': 'Produtos',
      'nav_blog': 'Blog',
      'nav_login': 'Login',
      
      // Hero
      'hero_title': 'Soluções Inteligentes para Negócios Modernos — <span class="gradient-text">IA, Web e Experiências</span>',
      'hero_subtitle': 'Design, desenvolvimento e automações que transformam serviços em experiências rentáveis.',
      'cta_primary': 'Quero minha solução',
      'cta_secondary': 'Ver portfólio →',
      
      // Seções
      'services_title': 'Serviços e Foco',
      'services_subtitle': 'Ajudamos sua empresa a crescer com tecnologia inteligente.',
      'portfolio_title': 'Portfólio em Destaque',
      'portfolio_subtitle': 'Uma amostra dos projetos que criamos.',
      'cases_title': 'Cases de Sucesso',
      'cases_subtitle': 'Como transformamos negócios com foco em resultados.',
      'faq_title': 'Perguntas Frequentes (FAQ)',
      'faq_subtitle': 'Tiramos as dúvidas mais comuns.',
      'about_title': 'Sobre a MakerAI Studio',
      'about_subtitle': 'Nosso foco é na união entre criatividade e inteligência artificial.',
      'assistants_title': 'Assistentes IA de Negócio',
      'assistants_subtitle': 'Automação de tarefas de alto valor.',
      'tech_title': 'Tecnologias Core',
      'tech_subtitle': 'O que usamos para construir o futuro do seu negócio.',
      'products_title': 'Produtos Prontos',
      'products_subtitle': 'Soluções white-label para kickstart rápido.',
      'blog_title': 'Últimos Artigos',
      'blog_subtitle': 'Conteúdo sobre IA, desenvolvimento e tendências.',
      'contact_title': 'Fale com a MakerAI Studio',
      'contact_subtitle': 'Quer transformar seu negócio com IA e criatividade?',
      
      // Formulário
      'form_name': 'Nome completo',
      'form_email': 'E-mail profissional',
      'form_service': 'Serviço de interesse...',
      'form_message': 'Sua mensagem e escopo do projeto',
      'form_submit': 'Enviar mensagem',
      'form_reset': 'Limpar',
      'form_note': 'Garantimos a privacidade dos seus dados e sigilo total sobre seu projeto.',
      
      // FAQ
      'faq_q1': 'Quanto tempo leva para desenvolver um site?',
      'faq_a1': 'Depende do escopo. Protótipos: 1–2 semanas. Projeto completo: 4–8 semanas. Implementamos milestones e entregas parciais.',
      'faq_q2': 'Vocês oferecem suporte multilíngue?',
      'faq_a2': 'Sim — PT, EN, ES com traduções integradas e content fallback.',
      'faq_q3': 'Qual é o custo médio de um projeto?',
      'faq_a3': 'Variável. Sites básicos a partir de R$5.000; sistemas com IA e integrações complexas R$50.000+ (estimativa).',
      'faq_q4': 'Como integramos IA nos projetos?',
      'faq_a4': 'Integramos APIs de ML para chat, recomendações e automação. Podemos usar endpoints próprios (FastAPI) ou serviços externos.',
      'faq_q5': 'Vocês garantem acessibilidade?',
      'faq_a5': 'Sim — seguimento das recomendações WCAG, contraste, navegação por teclado e aria-attributes.',
      'faq_q6': 'Oferecem manutenção e suporte?',
      'faq_a6': 'Sim — planos mensais: correções, atualizações de segurança e monitoramento de performance.',
      
      // Footer
      'footer_copyright': '© 2026 MakerAI Studio — Desenvolvido com foco em performance e acessibilidade',
      'footer_privacy': 'Política de Privacidade',
      'footer_terms': 'Termos de Uso',
      'footer_contact': 'Contato'
    },
    en: {
      // Menu
      'nav_services': 'Services',
      'nav_portfolio': 'Portfolio',
      'nav_cases': 'Cases',
      'nav_faq': 'FAQ',
      'nav_about': 'About',
      'nav_contact': 'Contact',
      'nav_assistants': 'AI Assistants',
      'nav_tech': 'Technologies',
      'nav_products': 'Products',
      'nav_blog': 'Blog',
      'nav_login': 'Login',
      
      // Hero
      'hero_title': 'Smart Solutions for Modern Business — <span class="gradient-text">AI, Web & Experiences</span>',
      'hero_subtitle': 'Design, development, and automation that transform services into profitable experiences.',
      'cta_primary': 'I want my solution',
      'cta_secondary': 'View portfolio →',
      
      // Seções
      'services_title': 'Services and Focus',
      'services_subtitle': 'We help your company grow with smart technology.',
      'portfolio_title': 'Featured Portfolio',
      'portfolio_subtitle': 'A sample of the projects we create.',
      'cases_title': 'Success Cases',
      'cases_subtitle': 'How we transform businesses with a focus on results.',
      'faq_title': 'Frequently Asked Questions',
      'faq_subtitle': 'We answer the most common questions.',
      'about_title': 'About MakerAI Studio',
      'about_subtitle': 'Our focus is on the union between creativity and artificial intelligence.',
      'assistants_title': 'Business AI Assistants',
      'assistants_subtitle': 'Automation of high-value tasks.',
      'tech_title': 'Core Technologies',
      'tech_subtitle': 'What we use to build the future of your business.',
      'products_title': 'Ready Products',
      'products_subtitle': 'White-label solutions for quick kickstart.',
      'blog_title': 'Latest Articles',
      'blog_subtitle': 'Content about AI, development and trends.',
      'contact_title': 'Contact MakerAI Studio',
      'contact_subtitle': 'Want to transform your business with AI and creativity?',
      
      // Formulário
      'form_name': 'Full name',
      'form_email': 'Professional email',
      'form_service': 'Service of interest...',
      'form_message': 'Your message and project scope',
      'form_submit': 'Send message',
      'form_reset': 'Clear',
      'form_note': 'We guarantee the privacy of your data and total confidentiality about your project.',
      
      // FAQ
      'faq_q1': 'How long does it take to develop a website?',
      'faq_a1': 'It depends on the scope. Prototypes: 1-2 weeks. Complete project: 4-8 weeks. We implement milestones and partial deliveries.',
      'faq_q2': 'Do you offer multilingual support?',
      'faq_a2': 'Yes — PT, EN, ES with integrated translations and content fallback.',
      'faq_q3': 'What is the average cost of a project?',
      'faq_a3': 'Variable. Basic websites starting from $1,000; systems with AI and complex integrations $10,000+ (estimate).',
      'faq_q4': 'How do you integrate AI into projects?',
      'faq_a4': 'We integrate ML APIs for chat, recommendations and automation. We can use our own endpoints (FastAPI) or external services.',
      'faq_q5': 'Do you guarantee accessibility?',
      'faq_a5': 'Yes — following WCAG recommendations, contrast, keyboard navigation and aria-attributes.',
      'faq_q6': 'Do you offer maintenance and support?',
      'faq_a6': 'Yes — monthly plans: bug fixes, security updates and performance monitoring.',
      
      // Footer
      'footer_copyright': '© 2026 MakerAI Studio — Developed with focus on performance and accessibility',
      'footer_privacy': 'Privacy Policy',
      'footer_terms': 'Terms of Use',
      'footer_contact': 'Contact'
    },
    es: {
      // Menu
      'nav_services': 'Servicios',
      'nav_portfolio': 'Portafolio',
      'nav_cases': 'Casos',
      'nav_faq': 'FAQ',
      'nav_about': 'Sobre',
      'nav_contact': 'Contacto',
      'nav_assistants': 'Asistentes IA',
      'nav_tech': 'Tecnologías',
      'nav_products': 'Productos',
      'nav_blog': 'Blog',
      'nav_login': 'Login',
      
      // Hero
      'hero_title': 'Soluciones Inteligentes para Negocios Modernos — <span class="gradient-text">IA, Web y Experiencias</span>',
      'hero_subtitle': 'Diseño, desarrollo y automatizaciones que transforman servicios en experiencias rentables.',
      'cta_primary': 'Quiero mi solución',
      'cta_secondary': 'Ver portafolio →',
      
      // Seções
      'services_title': 'Servicios y Enfoque',
      'services_subtitle': 'Ayudamos a tu empresa a crecer con tecnología inteligente.',
      'portfolio_title': 'Portafolio Destacado',
      'portfolio_subtitle': 'Una muestra de los proyectos que creamos.',
      'cases_title': 'Casos de Éxito',
      'cases_subtitle': 'Cómo transformamos negocios con enfoque en resultados.',
      'faq_title': 'Preguntas Frecuentes',
      'faq_subtitle': 'Respondemos las dudas más comunes.',
      'about_title': 'Sobre MakerAI Studio',
      'about_subtitle': 'Nuestro enfoque está en la unión entre creatividad e inteligencia artificial.',
      'assistants_title': 'Asistentes IA de Negocio',
      'assistants_subtitle': 'Automatización de tareas de alto valor.',
      'tech_title': 'Tecnologías Principales',
      'tech_subtitle': 'Lo que usamos para construir el futuro de tu negocio.',
      'products_title': 'Productos Listos',
      'products_subtitle': 'Soluciones white-label para inicio rápido.',
      'blog_title': 'Últimos Artículos',
      'blog_subtitle': 'Contenido sobre IA, desarrollo y tendencias.',
      'contact_title': 'Contacta con MakerAI Studio',
      'contact_subtitle': '¿Quieres transformar tu negocio con IA y creatividad?',
      
      // Formulário
      'form_name': 'Nombre completo',
      'form_email': 'Correo profesional',
      'form_service': 'Servicio de interés...',
      'form_message': 'Tu mensaje y alcance del proyecto',
      'form_submit': 'Enviar mensaje',
      'form_reset': 'Limpiar',
      'form_note': 'Garantizamos la privacidad de tus datos y confidencialidad total sobre tu proyecto.',
      
      // FAQ
      'faq_q1': '¿Cuánto tiempo lleva desarrollar un sitio web?',
      'faq_a1': 'Depende del alcance. Prototipos: 1-2 semanas. Proyecto completo: 4-8 semanas. Implementamos hitos y entregas parciales.',
      'faq_q2': '¿Ofrecen soporte multilingüe?',
      'faq_a2': 'Sí — PT, EN, ES con traducciones integradas y content fallback.',
      'faq_q3': '¿Cuál es el costo promedio de un proyecto?',
      'faq_a3': 'Variable. Sitios web básicos a partir de $1,000; sistemas con IA e integraciones complejas $10,000+ (estimación).',
      'faq_q4': '¿Cómo integran la IA en los proyectos?',
      'faq_a4': 'Integramos APIs de ML para chat, recomendaciones y automatización. Podemos usar endpoints propios (FastAPI) o servicios externos.',
      'faq_q5': '¿Garantizan la accesibilidad?',
      'faq_a5': 'Sí — siguiendo las recomendaciones WCAG, contraste, navegación por teclado y aria-attributes.',
      'faq_q6': '¿Ofrecen mantenimiento y soporte?',
      'faq_a6': 'Sí — planes mensuales: correcciones, actualizaciones de seguridad y monitoreo de rendimiento.',
      
      // Footer
      'footer_copyright': '© 2026 MakerAI Studio — Desarrollado con enfoque en rendimiento y accesibilidad',
      'footer_privacy': 'Política de Privacidad',
      'footer_terms': 'Términos de Uso',
      'footer_contact': 'Contacto'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'pt';
  
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    const dict = translations[lang] || translations.pt;
    
    // Atualiza todos os elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else if (el.tagName === 'OPTION') {
          el.textContent = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });
    
    // Atualiza botões ativos
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
    
    showToast(`Idioma alterado para ${lang.toUpperCase()}`, 'success');
  }
  
  // Inicializa botões de idioma
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
  
  // Aplica idioma salvo
  setLanguage(currentLang);
}

// =========================
// DETALHES DOS CARDS (SERVIÇOS)
// =========================
function initCardDetails() {
  const cardDetails = {
    'web-apps': {
      title: 'Web Apps e PWAs',
      content: `
        <h3>Desenvolvimento de Aplicações Web Progressivas</h3>
        <p>Sistemas web de alta performance com funcionalidades nativas:</p>
        <ul>
          <li><strong>Performance otimizada:</strong> Core Web Vitals 90+</li>
          <li><strong>Funcionamento offline:</strong> Cache inteligente</li>
          <li><strong>Instalação como app nativo:</strong> PWA installable</li>
          <li><strong>Notificações push:</strong> Engajamento aumentado</li>
          <li><strong>Sincronização em background:</strong> Dados sempre atualizados</li>
        </ul>
        <div class="card-details-actions">
          <button class="btn primary" onclick="showToast('Orçamento solicitado para Web Apps')">Solicitar Orçamento</button>
          <button class="btn secondary close-details">Fechar</button>
        </div>
      `
    },
    'ia': {
      title: 'Avatares & Consultores IA',
      content: `
        <h3>Soluções de Inteligência Artificial</h3>
        <p>Assistentes conversacionais avançados para diversos setores:</p>
        <ul>
          <li><strong>Atendimento ao cliente 24/7:</strong> Redução de custos</li>
          <li><strong>Vendas automatizadas:</strong> Conversão aumentada</li>
          <li><strong>Análise de dados em tempo real:</strong> Insights valiosos</li>
          <li><strong>Integração com sistemas:</strong> CRM, ERP, etc.</li>
          <li><strong>Personalização total:</strong> Da voz à personalidade</li>
        </ul>
        <div class="card-details-actions">
          <button class="btn primary" onclick="showToast('Orçamento solicitado para IA')">Solicitar Orçamento</button>
          <button class="btn secondary close-details">Fechar</button>
        </div>
      `
    },
    'rpa': {
      title: 'Automações RPA',
      content: `
        <h3>Automação de Processos Robóticos</h3>
        <p>Otimize processos repetitivos com bots inteligentes:</p>
        <ul>
          <li><strong>Processamento de documentos:</strong> PDF, Excel, Word</li>
          <li><strong>Integração entre sistemas:</strong> APIs personalizadas</li>
          <li><strong>Coleta e análise de dados:</strong> Web scraping inteligente</li>
          <li><strong>Relatórios automáticos:</strong> Dashboards em tempo real</li>
          <li><strong>Redução de erros humanos:</strong> Precisão de 99.9%</li>
        </ul>
        <div class="card-details-actions">
          <button class="btn primary" onclick="showToast('Orçamento solicitado para RPA')">Solicitar Orçamento</button>
          <button class="btn secondary close-details">Fechar</button>
        </div>
      `
    },
    '3d': {
      title: 'Modelagem 3D',
      content: `
        <h3>Experiências 3D e Realidade Aumentada</h3>
        <p>Criação de ambientes imersivos para diversos fins:</p>
        <ul>
          <li><strong>Visualização de produtos:</strong> E-commerce imersivo</li>
          <li><strong>Tour virtual:</strong> Imóveis, museus, eventos</li>
          <li><strong>Simulações interativas:</strong> Treinamentos e demonstrações</li>
          <li><strong>Realidade aumentada:</strong> Try-before-you-buy</li>
          <li><strong>Configuradores online:</strong> Personalização em tempo real</li>
        </ul>
        <div class="card-details-actions">
          <button class="btn primary" onclick="showToast('Orçamento solicitado para 3D')">Solicitar Orçamento</button>
          <button class="btn secondary close-details">Fechar</button>
        </div>
      `
    }
  };

  cardToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const detail = cardDetails[target];
      
      if (detail) {
        detailsContent.innerHTML = `
          <h2>${detail.title}</h2>
          ${detail.content}
        `;
        detailsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Fechar overlay
  if (closeOverlay) {
    closeOverlay.addEventListener('click', closeDetailsOverlay);
  }

  if (detailsOverlay) {
    detailsOverlay.addEventListener('click', (e) => {
      if (e.target === detailsOverlay) closeDetailsOverlay();
    });
  }

  // Fechar com botões dentro do overlay
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-details')) {
      closeDetailsOverlay();
    }
  });
}

function closeDetailsOverlay() {
  detailsOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// =========================
// CARROSSEL DO PORTFÓLIO
// =========================
function initCarousel() {
  if (!carouselTrack || dots.length === 0) return;
  
  let currentSlide = 0;
  let autoPlayInterval;
  const totalSlides = dots.length;
  
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
      dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
      dot.setAttribute('aria-selected', index === currentSlide);
    });
    
    // Atualiza aria-hidden nos slides
    document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoPlay();
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Configura dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto-play
  function startAutoPlay() {
    if (totalSlides > 1) {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
  }
  
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  
  // Controles por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Pausa auto-play no hover
  carouselTrack.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });
  
  carouselTrack.addEventListener('mouseleave', startAutoPlay);
  
  // Inicialização
  updateCarousel();
  startAutoPlay();
}

// =========================
// FAQ ACCORDION
// =========================
function initFAQ() {
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Fecha todos os outros
      faqQuestions.forEach(q => {
        const otherItem = q.parentElement;
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          q.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Alterna o atual
      item.classList.toggle('active', !isActive);
      question.setAttribute('aria-expanded', !isActive);
    });
  });
}

// =========================
// FORMULÁRIO DE CONTATO
// =========================
function initContactForm() {
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--error-color)';
        isValid = false;
        
        // Remove erro ao digitar
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        });
      }
    });
    
    if (!isValid) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    // Simulação de envio
    const formData = {
      nome: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      servico: contactForm.querySelector('select').value,
      mensagem: contactForm.querySelector('textarea').value
    };
    
    console.log('Formulário enviado:', formData);
    
    // Feedback visual
    showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    
    // Reset do formulário
    contactForm.reset();
    
    // Scroll suave para o topo
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 1000);
  });
}

// =========================
// BOTÃO ASSISTENTE IA
// =========================
function initAssistant() {
  if (!assistantBtn) return;
  
  assistantBtn.addEventListener('click', () => {
    showToast('Assistente IA em desenvolvimento. Em breve!', 'info');
    
    // Animação de pulse
    assistantBtn.classList.add('pulse');
    setTimeout(() => {
      assistantBtn.classList.remove('pulse');
    }, 2000);
  });
}

// =========================
// TOAST NOTIFICATIONS
// =========================
function showToast(message, type = 'info') {
  // Remove toast existente
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  // Cria novo toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Remove após 3 segundos
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =========================
// ANIMAÇÃO DE NÚMEROS (HERO STATS)
// =========================
function initNumberAnimation() {
  const stats = document.querySelectorAll('.stat strong');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const originalText = stat.textContent;
        const value = parseInt(originalText.replace(/[^\d]/g, ''));
        const suffix = originalText.replace(/[\d]/g, '');
        
        if (!isNaN(value)) {
          animateNumber(stat, 0, value, 2000, suffix);
        }
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, suffix) {
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  };
  
  window.requestAnimationFrame(step);
}

// =========================
// HANDLERS PARA BOTÕES DINÂMICOS
// =========================
function initDynamicButtons() {
  document.addEventListener('click', (e) => {
    // Projetos
    if (e.target.matches('[data-project]')) {
      const project = e.target.dataset.project;
      showToast(`Abrindo projeto: ${project}`, 'info');
    }
    
    // Cases
    if (e.target.matches('[data-case]')) {
      const caseName = e.target.dataset.case;
      showToast(`Abrindo case: ${caseName}`, 'info');
    }
    
    // Assistentes
    if (e.target.matches('[data-assistant]')) {
      const assistant = e.target.dataset.assistant;
      showToast(`Demonstração do assistente: ${assistant}`, 'info');
    }
    
    // Produtos
    if (e.target.matches('[data-product]')) {
      const product = e.target.dataset.product;
      showToast(`Demonstração do produto: ${product}`, 'info');
    }
  });
}

// =========================
// LAZY LOADING DE IMAGENS
// =========================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antigos
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// =========================
// SMOOTH SCROLL
// =========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// =========================
// DEBOUNCE PARA PERFORMANCE
// =========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// =========================
// INICIALIZAÇÃO COMPLETA
// =========================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 MakerAI Studio inicializando...');
  
  // Inicializa todos os módulos
  initMobileMenu();
  initThemeToggle();
  initLanguageSwitcher();
  initCardDetails();
  initCarousel();
  initFAQ();
  initContactForm();
  initAssistant();
  initNumberAnimation();
  initDynamicButtons();
  initLazyLoading();
  initSmoothScroll();
  
  // Performance: debounce no resize
  window.addEventListener('resize', debounce(() => {
    // Atualizações responsivas podem ir aqui
  }, 250));
  
  console.log('✅ MakerAI Studio carregado com sucesso!');
});

// =========================
// FUNÇÕES GLOBAIS
// =========================
window.showToast = showToast;

// Função para demonstrar interações
window.demoInteraction = (type, name) => {
  showToast(`${type}: ${name}`, 'info');
};