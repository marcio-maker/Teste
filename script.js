// script.js - VERSÃO COMPLETA E ROBUSTA PARA MAKERAI STUDIO
document.addEventListener('DOMContentLoaded', function () {
  console.log('MakerAI Studio v3.0 - Inicializando...');

  // ============ CONFIGURAÇÕES GLOBAIS ============
  const config = {
    debug: false,
    carouselInterval: 5000,
    assistantEnabled: true,
    formEndpoint: 'https://formspree.io/f/mzzbpyvz',
    loadingTimeout: 4000
  };

  // ============ UTILITÁRIOS ============
  function log(message, data = null) {
    if (config.debug) {
      console.log(`[MakerAI] ${message}`, data || '');
    }
  }

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

  function showNotification(message, type = 'success', duration = 5000) {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    document.body.appendChild(notification);

    // Remove após duração
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, duration);

    return notification;
  }

  // ============ INICIALIZAÇÃO SEGURA ============
  function initComponent(initFunction, componentName) {
    try {
      initFunction();
      log(`${componentName} inicializado`);
      return true;
    } catch (error) {
      console.warn(`Erro ao inicializar ${componentName}:`, error);
      return false;
    }
  }

  // ============ LOADING SCREEN ============
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    // Esconde o loading quando a página carrega
    const hideLoading = () => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.style.display = 'none';
        }
      }, 1000);
    };

    window.addEventListener('load', function () {
      setTimeout(hideLoading, 800);
    });

    // Fallback após timeout
    setTimeout(() => {
      if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        hideLoading();
      }
    }, config.loadingTimeout);
  }

  // ============ MOBILE MENU ============
  function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburgerBtn || !closeMenuBtn || !mobileMenu) {
      log('Elementos do menu mobile não encontrados');
      return;
    }

    function toggleMobileMenu() {
      const isOpening = !mobileMenu.classList.contains('active');
      
      mobileMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpening);

      if (isOpening) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKey);
        hamburgerBtn.focus();
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }

    function handleEscapeKey(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    hamburgerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
      }
    });

    closeMenuBtn.addEventListener('click', toggleMobileMenu);

    // Fechar menu ao clicar em links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', toggleMobileMenu);
    });

    // Fechar menu ao clicar fora
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        toggleMobileMenu();
      }
    });
  }

  // ============ THEME TOGGLE ============
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;

    if (!themeToggle || !mobileThemeToggle) {
      log('Botões de tema não encontrados');
      return;
    }

    function toggleTheme() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      const icon = newTheme === 'dark' ? '🌙' : '☀️';
      
      themeToggle.textContent = icon;
      mobileThemeToggle.textContent = icon;
      themeToggle.setAttribute('aria-label', `Alternar para tema ${newTheme === 'dark' ? 'escuro' : 'claro'}`);
      
      localStorage.setItem('theme', newTheme);
      log('Tema alterado para:', newTheme);
    }

    function setSavedTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        const icon = savedTheme === 'dark' ? '🌙' : '☀️';
        themeToggle.textContent = icon;
        mobileThemeToggle.textContent = icon;
      }
    }

    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    setSavedTheme();
  }

  // ============ SCROLL HORIZONTAL ============
  function initHorizontalScroll() {
    const cardsContainers = document.querySelectorAll('.cards-container');
    
    cardsContainers.forEach(container => {
      const scrollWrapper = container.querySelector('.cards-scroll-wrapper');
      if (!scrollWrapper) return;

      // Configurar scroll horizontal
      setupHorizontalScroll(scrollWrapper);

      // Adicionar controles de scroll se necessário
      if (window.innerWidth > 768 && !container.querySelector('.scroll-controls')) {
        addScrollControls(container, scrollWrapper);
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

    ['mouseleave', 'mouseup'].forEach(evt => {
      element.addEventListener(evt, () => {
        isDown = false;
        element.style.cursor = 'grab';
      });
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });

    // Suporte para touch
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

  function addScrollControls(container, scrollWrapper) {
    const existingControls = container.querySelector('.scroll-controls');
    if (existingControls) existingControls.remove();

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

    updateScrollButtons(scrollWrapper, prevBtn, nextBtn);

    prevBtn.addEventListener('click', () => {
      scrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(() => updateScrollButtons(scrollWrapper, prevBtn, nextBtn), 300);
    });

    nextBtn.addEventListener('click', () => {
      scrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(() => updateScrollButtons(scrollWrapper, prevBtn, nextBtn), 300);
    });

    scrollWrapper.addEventListener('scroll', debounce(() => {
      updateScrollButtons(scrollWrapper, prevBtn, nextBtn);
    }, 100));
  }

  function updateScrollButtons(scrollWrapper, prevBtn, nextBtn) {
    const scrollLeft = scrollWrapper.scrollLeft;
    const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;

    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= maxScroll - 1;

    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  }

  // ============ CAROUSEL ============
  function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    
    if (!carouselTrack || dots.length === 0) {
      log('Elementos do carousel não encontrados');
      return;
    }

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    let carouselInterval;

    function goToSlide(index) {
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;

      currentSlide = index;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      });

      log('Carousel mudou para slide:', currentSlide + 1);
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
      if (totalSlides > 1) {
        carouselInterval = setInterval(nextSlide, config.carouselInterval);
      }
    }

    function stopAutoSlide() {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide();
      });
      
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          stopAutoSlide();
          goToSlide(index);
          startAutoSlide();
        }
      });
    });

    // Pause no hover
    const carousel = carouselTrack.parentElement;
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Inicializar
    startAutoSlide();
  }

  // ============ FAQ ACCORDION ============
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
      log('FAQ não encontrado');
      return;
    }

    faqQuestions.forEach(question => {
      question.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const answer = this.nextElementSibling;

        // Fecha todas as outras respostas
        faqQuestions.forEach(q => {
          if (q !== this) {
            q.setAttribute('aria-expanded', 'false');
            q.nextElementSibling.style.maxHeight = null;
            q.nextElementSibling.style.paddingTop = null;
          }
        });

        // Alterna a atual
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
          answer.style.maxHeight = null;
          answer.style.paddingTop = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.paddingTop = '1rem';
        }
      });

      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ============ SERVICE CARDS DETAILS ============
  function initServiceCards() {
    const serviceCards = document.querySelectorAll('.card-toggle');
    const detailsOverlay = document.getElementById('detailsOverlay');
    const closeOverlay = document.querySelector('.close-overlay');
    const detailsContent = document.getElementById('detailsContent');

    if (!detailsOverlay || !closeOverlay || !detailsContent) {
      log('Elementos de detalhes de serviço não encontrados');
      return;
    }

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
          document.addEventListener('keydown', handleOverlayEscape);
          closeOverlay.focus();

          log('Detalhes do serviço abertos:', details.title);
        }
      });
    });

    function handleOverlayEscape(e) {
      if (e.key === 'Escape') {
        closeDetailsOverlay();
      }
    }

    function closeDetailsOverlay() {
      detailsOverlay.classList.remove('active');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleOverlayEscape);
    }

    closeOverlay.addEventListener('click', closeDetailsOverlay);
    closeOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closeDetailsOverlay();
      }
    });

    detailsOverlay.addEventListener('click', (e) => {
      if (e.target === detailsOverlay) {
        closeDetailsOverlay();
      }
    });
  }

  // ============ ASSISTENTE IA (IFRAME RESPONSIVO) ============
  function initAssistant() {
    if (!config.assistantEnabled) return;

    const assistantBtn = document.getElementById('assistantBtn');
    const assistantOverlay = document.getElementById('assistantOverlay');
    const assistantIframe = document.getElementById('assistantIframe');

    if (!assistantBtn || !assistantOverlay || !assistantIframe) {
      log('Elementos do assistente não encontrados');
      return;
    }

    let isOpen = false;

    function openAssistant() {
      if (isOpen) return;
      assistantOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      isOpen = true;

      // Notificar iframe que foi aberto
      setTimeout(() => {
        if (assistantIframe.contentWindow) {
          assistantIframe.contentWindow.postMessage({ type: 'OPEN_ASSISTANT' }, '*');
        }
      }, 300);

      log('Assistente aberto');
    }

    function closeAssistant() {
      if (!isOpen) return;
      assistantOverlay.classList.remove('active');
      document.body.style.overflow = '';
      isOpen = false;

      // Notificar iframe que foi fechado
      if (assistantIframe.contentWindow) {
        assistantIframe.contentWindow.postMessage({ type: 'CLOSE_ASSISTANT' }, '*');
      }

      log('Assistente fechado');
    }

    // Abrir com botão flutuante
    assistantBtn.addEventListener('click', openAssistant);
    assistantBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAssistant();
      }
    });

    // Fechar ao clicar fora
    assistantOverlay.addEventListener('click', (e) => {
      if (e.target === assistantOverlay) {
        closeAssistant();
      }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeAssistant();
      }
    });

    // Receber mensagens do iframe
    window.addEventListener('message', (event) => {
      if (!event.data || event.source !== assistantIframe.contentWindow) return;

      switch (event.data.type) {
        case 'CLOSE_ASSISTANT':
          closeAssistant();
          break;
        case 'ASSISTANT_READY':
          log('Assistente IA carregado e pronto');
          break;
        case 'ASSISTANT_ERROR':
          console.error('Erro no assistente:', event.data.message);
          showNotification('Erro ao carregar assistente', 'error');
          break;
      }
    });

    // Quick actions nos cards
    document.querySelectorAll('[data-assistant], [data-product]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const actionType = btn.dataset.assistant || btn.dataset.product;
        openAssistant();

        setTimeout(() => {
          if (assistantIframe.contentWindow) {
            assistantIframe.contentWindow.postMessage({
              type: 'QUICK_ACTION',
              action: actionType
            }, '*');
          }
        }, 600);
      });
    });
  }

  // ============ FORMULÁRIO DE CONTATO ============
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
      log('Formulário de contato não encontrado');
      return;
    }

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Validação básica
      const inputs = this.querySelectorAll('input, textarea, select');
      let isValid = true;

      inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
          input.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
      }

      // Desabilita o botão
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      try {
        // Coleta os dados do formulário
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        log('Dados do formulário:', data);

        // Envio real via Formspree
        const response = await fetch(config.formEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showNotification('✓ Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
          contactForm.reset();
          log('Formulário enviado com sucesso');
        } else {
          throw new Error('Erro na resposta do servidor');
        }

      } catch (error) {
        console.error('Erro no envio:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });

    // Reset do formulário
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
          input.style.borderColor = '';
        });
        showNotification('Formulário limpo', 'info', 2000);
      });
    }
  }

  // ============ CASES MODAL ============
  function initCasesModal() {
    const caseButtons = document.querySelectorAll('[data-case]');
    const caseModal = document.getElementById('caseModal');
    const caseContent = document.getElementById('caseContent');

    if (!caseModal || !caseContent) return;

    const caseDetails = {
      'saude': {
        title: 'Clínica Médica +300%',
        challenge: 'A clínica enfrentava altas taxas de faltas em consultas e baixa eficiência no agendamento.',
        solution: 'Desenvolvemos um sistema de agendamento inteligente com IA que prevê possíveis faltas e otimiza a agenda.',
        results: [
          'Redução de 85% nas faltas',
          'Aumento de 300% na eficiência do agendamento',
          'Satisfação do paciente aumentou em 95%',
          'ROI de 12x em 6 meses'
        ],
        technologies: ['React', 'Node.js', 'Machine Learning', 'Twilio API']
      },
      'ecommerce': {
        title: 'E-commerce 5x ROI',
        challenge: 'Baixa taxa de conversão e alto abandono de carrinho.',
        solution: 'PWA com chatbot de vendas integrado e sistema de recomendação personalizado.',
        results: [
          'Aumento de 240% na conversão',
          'Redução de 60% no abandono de carrinho',
          'ROI de 5x em 4 meses',
          'Aumento de 180% no ticket médio'
        ],
        technologies: ['Next.js', 'OpenAI API', 'Stripe', 'Redis']
      },
      'educacao': {
        title: 'Plataforma EAD +400%',
        challenge: 'Baixa retenção de alunos e engajamento nas aulas online.',
        solution: 'Sistema gamificado com recompensas, avatares IA e aprendizado adaptativo.',
        results: [
          'Aumento de 400% na retenção',
          'Engajamento cresceu 320%',
          'Satisfação dos alunos: 98%',
          'Expansão para 3 novos países'
        ],
        technologies: ['React Native', 'WebGL', 'MongoDB', 'Socket.io']
      }
    };

    caseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const caseId = this.dataset.case;
        const details = caseDetails[caseId];

        if (details) {
          caseContent.innerHTML = `
            <h3>${details.title}</h3>
            
            <h4>Desafio</h4>
            <p>${details.challenge}</p>
            
            <h4>Solução</h4>
            <p>${details.solution}</p>
            
            <h4>Resultados</h4>
            <ul style="margin: 1rem 0 2rem 0; padding-left: 1.5rem;">
              ${details.results.map(result => `<li style="margin-bottom: 0.5rem;">${result}</li>`).join('')}
            </ul>
            
            <h4>Tecnologias Utilizadas</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0 2rem 0;">
              ${details.technologies.map(tech =>
                `<span style="background: var(--gradient-primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem;">${tech}</span>`
              ).join('')}
            </div>
            
            <div style="text-align: center;">
              <a href="#contato" class="btn primary">Quero resultados similares</a>
            </div>
          `;

          caseModal.classList.add('active');
          document.body.style.overflow = 'hidden';

          log('Case aberto:', details.title);
        }
      });
    });

    // Fechar modal
    const modalClose = caseModal.querySelector('.modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        caseModal.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      modalClose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          caseModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) {
        caseModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && caseModal.classList.contains('active')) {
        caseModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============ BOTÕES DEMO ============
  function initDemoButtons() {
    const demoButtons = document.querySelectorAll('[data-assistant], [data-product]');
    
    demoButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
        }
        
        const type = this.dataset.assistant || this.dataset.product;
        
        const demos = {
          'marketing': 'Assistente de Marketing IA',
          'nutricao': 'Assistente de Nutrição IA',
          'financas': 'Assistente Financeiro IA',
          'pwa-template': 'Template PWA de Vendas',
          'dashboard-3d': 'Dashboard 3D Analytics',
          'chatbot': 'Chatbot Empresarial IA'
        };

        const demoName = demos[type] || type;
        showNotification(`🚀 Demo "${demoName}" será exibida em breve!`, 'info');
        
        log('Demo solicitada:', demoName);
      });
    });
  }

  // ============ ANIMAÇÕES AO SCROLL ============
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      log('Animações reduzidas por preferência do usuário');
      return;
    }

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
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(
      '.section, .card, .hero-content, .about-content, .tech-card'
    );

    elementsToAnimate.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.filter = 'blur(5px)';
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';
      observer.observe(element);
    });
  }

  // ============ SMOOTH SCROLL ============
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Destaque visual
          target.style.boxShadow = '0 0 0 2px rgba(124, 58, 237, 0.5)';
          setTimeout(() => {
            target.style.boxShadow = 'none';
          }, 1500);
          
          // Atualizar URL sem recarregar
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ============ FOOTER SOCIAL TOGGLE ============
  function initFooterSocial() {
    const footerSocialMobile = document.querySelector('.footer-social-mobile');
    const footerSocialDesktop = document.querySelector('.footer-social-desktop');
    
    function updateFooterSocial() {
      if (window.innerWidth <= 1024) {
        if (footerSocialMobile) footerSocialMobile.style.display = 'block';
        if (footerSocialDesktop) footerSocialDesktop.style.display = 'none';
      } else {
        if (footerSocialMobile) footerSocialMobile.style.display = 'none';
        if (footerSocialDesktop) footerSocialDesktop.style.display = 'block';
      }
    }
    
    updateFooterSocial();
    window.addEventListener('resize', debounce(updateFooterSocial, 250));
  }

  // ============ INICIALIZAÇÃO COMPLETA ============
  function initAll() {
    // Ordem de inicialização otimizada
    const components = [
      { fn: initLoadingScreen, name: 'Loading Screen' },
      { fn: initMobileMenu, name: 'Menu Mobile' },
      { fn: initThemeToggle, name: 'Tema' },
      { fn: initHorizontalScroll, name: 'Scroll Horizontal' },
      { fn: initCarousel, name: 'Carousel' },
      { fn: initFAQ, name: 'FAQ' },
      { fn: initServiceCards, name: 'Cartões de Serviço' },
      { fn: initAssistant, name: 'Assistente IA' },
      { fn: initContactForm, name: 'Formulário de Contato' },
      { fn: initCasesModal, name: 'Modal de Cases' },
      { fn: initDemoButtons, name: 'Botões Demo' },
      { fn: initScrollAnimations, name: 'Animações Scroll' },
      { fn: initSmoothScroll, name: 'Scroll Suave' },
      { fn: initFooterSocial, name: 'Social Footer' }
    ];

    components.forEach(component => {
      initComponent(component.fn, component.name);
    });

    // Re-inicializar scroll horizontal no resize
    window.addEventListener('resize', debounce(() => {
      initHorizontalScroll();
      initFooterSocial();
    }, 250));

    // Otimização para performance
    window.addEventListener('load', () => {
      log('Página completamente carregada');
    });

    log('Todas as funcionalidades inicializadas com sucesso!');
  }

  // ============ EXECUÇÃO ============
  // Aguarda um pouco para garantir que o DOM está pronto
  setTimeout(initAll, 50);
});