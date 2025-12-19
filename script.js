// script.js COMPLETO - VERSÃO REFATORADA
document.addEventListener('DOMContentLoaded', function () {
  // ============ MOBILE MENU ============
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded',
      mobileMenu.classList.contains('active')
    );

    // Impedir scroll quando menu aberto
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  hamburgerBtn.addEventListener('click', toggleMobileMenu);
  closeMenuBtn.addEventListener('click', toggleMobileMenu);

  // Fechar menu ao clicar em links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  // ============ SCROLL HORIZONTAL PARA TODAS AS SEÇÕES DE CARDS ============
  function initHorizontalScroll() {
    const cardsContainers = document.querySelectorAll('.cards-container');

    cardsContainers.forEach(container => {
      const scrollWrapper = container.querySelector('.cards-scroll-wrapper');
      if (!scrollWrapper) return;

      // Remover controles e indicadores anteriores
      const existingIndicator = container.querySelector('.scroll-indicator');
      const existingControls = container.querySelector('.scroll-controls');
      if (existingIndicator) existingIndicator.remove();
      if (existingControls) existingControls.remove();

      // Configurar scroll horizontal para touch e mouse
      setupHorizontalScroll(scrollWrapper);

      // Aplicar estilo para scroll horizontal
      scrollWrapper.style.cssText += `
        cursor: grab;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        scrollbar-width: thin;
        scrollbar-color: var(--primary) transparent;
      `;

      // Adicionar indicador de scroll para mobile
      if (window.innerWidth <= 768) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = 'Arraste para ver mais →';
        container.appendChild(scrollIndicator);
      }

      // Adicionar botões de controle para desktop
      if (window.innerWidth > 768) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'scroll-btn';
        prevBtn.innerHTML = '←';
        prevBtn.setAttribute('aria-label', 'Rolar para esquerda');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'scroll-btn';
        nextBtn.innerHTML = '→';
        nextBtn.setAttribute('aria-label', 'Rolar para direita');

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'scroll-controls';
        controlsDiv.appendChild(prevBtn);
        controlsDiv.appendChild(nextBtn);

        container.appendChild(controlsDiv);

        // Lógica dos botões
        updateScrollButtons(scrollWrapper, prevBtn, nextBtn);

        prevBtn.addEventListener('click', () => {
          scrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
          setTimeout(() => updateScrollButtons(scrollWrapper, prevBtn, nextBtn), 300);
        });

        nextBtn.addEventListener('click', () => {
          scrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
          setTimeout(() => updateScrollButtons(scrollWrapper, prevBtn, nextBtn), 300);
        });

        scrollWrapper.addEventListener('scroll', () => {
          updateScrollButtons(scrollWrapper, prevBtn, nextBtn);
        });
      }
    });
  }

  function setupHorizontalScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener('mousedown', (e) => {
      isDown = true;
      element.style.cursor = 'grabbing';
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
      isDown = false;
      element.style.cursor = 'grab';
    });

    element.addEventListener('mouseup', () => {
      isDown = false;
      element.style.cursor = 'grab';
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });

    // Touch devices
    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('touchmove', (e) => {
      if (!e.touches.length) return;
      e.preventDefault();
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });
  }

  function updateScrollButtons(scrollWrapper, prevBtn, nextBtn) {
    const scrollLeft = scrollWrapper.scrollLeft;
    const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;

    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= maxScroll - 1;
  }

  // Inicializar scroll horizontal
  initHorizontalScroll();
  window.addEventListener('resize', initHorizontalScroll);

  // ============ THEME TOGGLE ============
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const html = document.documentElement;

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    mobileThemeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';

    localStorage.setItem('theme', newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);

  // Verificar tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    mobileThemeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }

  // ============ LANGUAGE SWITCH ============
  const langButtons = document.querySelectorAll('.lang-btn, .mobile-lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.dataset.lang;

      langButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      console.log('Idioma selecionado:', lang);

      const translations = {
        pt: {
          heroTitle: 'Soluções Inteligentes para Negócios Modernos — IA, Web e Experiências',
          heroSubtitle: 'Design, desenvolvimento e automações que transformam serviços em experiências rentáveis.',
          cta1: 'Quero minha solução',
          cta2: 'Ver portfólio →'
        },
        en: {
          heroTitle: 'Smart Solutions for Modern Businesses — AI, Web & Experiences',
          heroSubtitle: 'Design, development and automations that transform services into profitable experiences.',
          cta1: 'I want my solution',
          cta2: 'View portfolio →'
        },
        es: {
          heroTitle: 'Soluciones Inteligentes para Negocios Modernos — IA, Web y Experiencias',
          heroSubtitle: 'Diseño, desarrollo y automatizaciones que transforman servicios en experiencias rentables.',
          cta1: 'Quiero mi solución',
          cta2: 'Ver portafolio →'
        }
      };

      const heroSection = document.querySelector('.hero-content');
      if (heroSection) {
        const title = heroSection.querySelector('h2');
        const subtitle = heroSection.querySelector('.subtitle');
        const buttons = heroSection.querySelectorAll('.btn');

        if (title) title.textContent = translations[lang].heroTitle;
        if (subtitle) subtitle.textContent = translations[lang].heroSubtitle;
        if (buttons[0]) buttons[0].textContent = translations[lang].cta1;
        if (buttons[1]) buttons[1].textContent = translations[lang].cta2;
      }
    });
  });

  // ============ CAROUSEL ============
  const carouselTrack = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.carousel-slide').length;

  function goToSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    currentSlide = index;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  let carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  carouselTrack.parentElement.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });

  carouselTrack.parentElement.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  });

  // ============ FAQ ACCORDION ============
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answer = this.nextElementSibling;

      faqQuestions.forEach(q => {
        if (q !== this) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.style.maxHeight = null;
          q.nextElementSibling.style.paddingTop = null;
        }
      });

      this.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        answer.style.maxHeight = null;
        answer.style.paddingTop = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.paddingTop = '1rem';
      }
    });
  });

  // ============ SERVICE CARDS DETAILS ============
  const serviceCards = document.querySelectorAll('.card-toggle');
  const detailsOverlay = document.getElementById('detailsOverlay');
  const closeOverlay = document.querySelector('.close-overlay');
  const detailsContent = document.getElementById('detailsContent');

  const serviceDetails = {
    'web-apps': {
      title: 'Web Apps e PWAs',
      description: 'Desenvolvemos Progressive Web Apps (PWAs) de alta performance que funcionam offline, têm push notifications e podem ser instalados como aplicativos nativos.',
      features: [
        'Responsividade total para todos os dispositivos',
        'Funcionamento offline com cache inteligente',
        'Integração com câmera, GPS e outros sensores',
        'Push notifications para engajamento',
        'Performance otimizada (Lighthouse score 90+)'
      ],
      technologies: ['React', 'Next.js', 'Service Workers', 'Webpack']
    },
    'ia': {
      title: 'Avatares & Consultores IA',
      description: 'Assistentes conversacionais personalizados que atendem clientes 24/7, realizam vendas, dão suporte e coletam dados valiosos para seu negócio.',
      features: [
        'Integração com LLMs (GPT-4, Claude, etc.)',
        'Treinamento com sua base de conhecimento',
        'Multilíngue e com personalidade definida',
        'Análise de sentimentos e intenções',
        'Relatórios de performance detalhados'
      ],
      technologies: ['OpenAI API', 'FastAPI', 'WebSocket', 'LangChain']
    },
    'rpa': {
      title: 'Automações RPA',
      description: 'Robotic Process Automation para automatizar tarefas repetitivas, aumentar produtividade e reduzir erros humanos.',
      features: [
        'Automação de processos em qualquer software',
        'Integração com APIs e sistemas legados',
        'Agendamento e execução automática',
        'Monitoramento em tempo real',
        'Relatórios de execução e erros'
      ],
      technologies: ['Python', 'Selenium', 'UiPath', 'APIs REST']
    },
    '3d': {
      title: 'Modelagem 3D',
      description: 'Criamos experiências imersivas com gráficos 3D, realidade aumentada e visualizações interativas para produtos, arquitetura e educação.',
      features: [
        'Modelos 3D otimizados para web',
        'Integração com AR (realidade aumentada)',
        'Interatividade com mouse/toque',
        'Animações suaves e realistas',
        'Compatibilidade com todos os navegadores'
      ],
      technologies: ['Three.js', 'Blender', 'WebGL', 'AR.js']
    },
    'dashboards': {
      title: 'Sistemas e Dashboards',
      description: 'Desenvolvemos backends escaláveis, APIs robustas e painéis de análise com visualizações de dados em tempo real.',
      features: [
        'APIs REST/GraphQL documentadas',
        'Autenticação e autorização avançadas',
        'Dashboards com gráficos interativos',
        'Exportação de dados (PDF, Excel, CSV)',
        'Monitoramento e alertas'
      ],
      technologies: ['Node.js', 'FastAPI', 'PostgreSQL', 'Chart.js']
    },
    'seo': {
      title: 'Conteúdo & SEO Técnico',
      description: 'Otimização completa para mecanismos de busca, incluindo SEO técnico, conteúdo otimizado para IA e estratégias de marketing digital.',
      features: [
        'Auditoria técnica completa',
        'Otimização para buscas por voz',
        'Conteúdo gerado por IA otimizado',
        'Schema markup estruturado',
        'Monitoramento de rankings'
      ],
      technologies: ['Next.js SEO', 'Schema.org', 'AI Content Tools', 'Analytics']
    }
  };

  serviceCards.forEach(card => {
    card.addEventListener('click', function () {
      const target = this.dataset.target;
      const details = serviceDetails[target];

      if (details) {
        detailsContent.innerHTML = `
          <h3>${details.title}</h3>
          <p class="subtitle">${details.description}</p>
          
          <h4>Principais Recursos:</h4>
          <ul style="margin: 1rem 0 2rem 0; padding-left: 1.5rem;">
            ${details.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
          </ul>
          
          <h4>Tecnologias Utilizadas:</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0 2rem 0;">
            ${details.technologies.map(tech =>
          `<span style="background: var(--gradient-primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem;">${tech}</span>`
        ).join('')}
          </div>
          
          <div style="text-align: center;">
            <a href="#contato" class="btn primary">Solicitar Orçamento</a>
          </div>
        `;

        detailsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeOverlay.addEventListener('click', () => {
    detailsOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  detailsOverlay.addEventListener('click', (e) => {
    if (e.target === detailsOverlay) {
      detailsOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ============ ASSISTENTE IA AVANÇADO (IFRAME) ============
  const assistantBtn = document.getElementById('assistantBtn');
  const assistantIframe = document.getElementById('assistantIframe');
  const assistantCloseBtn = document.getElementById('assistantCloseBtn');

  function openAssistant() {
    assistantIframe.classList.add('open');
    assistantBtn.style.opacity = '0';
    assistantBtn.style.pointerEvents = 'none';
    assistantCloseBtn.classList.add('visible'); // Mostra o X

    setTimeout(() => {
      assistantIframe.contentWindow.postMessage({ type: 'OPEN_ASSISTANT' }, '*');
    }, 300);
  }

  function closeAssistant() {
    assistantIframe.classList.remove('open');
    assistantBtn.style.opacity = '1';
    assistantBtn.style.pointerEvents = 'auto';
    assistantCloseBtn.classList.remove('visible'); // Esconde o X

    assistantIframe.contentWindow.postMessage({ type: 'CLOSE_ASSISTANT' }, '*');
  }

  // Abrir
  assistantBtn.addEventListener('click', openAssistant);

  // Fechar com o novo botão X
  assistantCloseBtn.addEventListener('click', closeAssistant);

  // Fechar com mensagem do iframe
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'CLOSE_ASSISTANT') {
      closeAssistant();
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assistantIframe.classList.contains('open')) {
      closeAssistant();
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assistantIframe.classList.contains('open')) {
      closeAssistant();
      assistantIframe.contentWindow.postMessage({ type: 'CLOSE_ASSISTANT' }, '*');
    }
  });

  // ============ FORM SUBMISSION ============
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius);
        box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
      `;
      successMsg.textContent = '✓ Mensagem enviada com sucesso!';
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successMsg.remove(), 300);
      }, 3000);

      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

  // ============ ANIMAÇÕES AO SCROLL ============
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.filter = 'blur(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .card, .hero-content, .case-item, .process-step, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.filter = 'blur(5px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';
    observer.observe(element);
  });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        target.style.boxShadow = '0 0 0 2px rgba(124, 58, 237, 0.5)';
        setTimeout(() => {
          target.style.boxShadow = 'none';
        }, 1500);
      }
    });
  });

  // ============ PARTÍCULAS ============
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
        border-radius: 50%;
        animation: float ${15 + Math.random() * 20}s infinite ease-in-out;
      `;

      const size = Math.random() * 80 + 20;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.opacity = `${0.05 + Math.random() * 0.1}`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, -20px) rotate(90deg); }
        50% { transform: translate(0, -40px) rotate(180deg); }
        75% { transform: translate(-20px, -20px) rotate(270deg); }
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  createParticles();

  // ============ BOTÕES DEMO ============
  document.querySelectorAll('[data-assistant], [data-product]').forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.dataset.assistant || this.dataset.product;
      alert(`Demonstração do ${type} será iniciada em breve!`);
    });
  });

  // ============ LOADING SCREEN SIMPLES ============
  const loadingScreen = document.getElementById('loadingScreen');

  // Esconde o loading quando a página terminar de carregar
  window.addEventListener('load', function () {
    setTimeout(function () {
      loadingScreen.classList.add('hidden');

      // Remove completamente do DOM após a transição
      setTimeout(function () {
        loadingScreen.remove();
      }, 600);
    }, 800); // Tempo extra para dar um efeito bonito
  });

  // Fallback: remove após 4 segundos caso algo falhe
  setTimeout(function () {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 600);
    }
  }, 4000);

});