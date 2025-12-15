// =========================
// CONFIGURAÇÃO GLOBAL
// =========================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// =========================
// FUNÇÕES DE LOADING
// =========================

/**
 * Mostra loading no botão
 */
function showButtonLoading(button, text = '') {
  const btnText = button.querySelector('.btn-text');
  const btnLoading = button.querySelector('.btn-loading');
  
  if (btnText && btnLoading) {
    button.dataset.originalText = btnText.textContent;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    if (text) {
      btnLoading.querySelector('span:not(.btn-spinner)').textContent = text;
    }
  } else {
    // Fallback para botões sem estrutura de loading
    button.dataset.originalHTML = button.innerHTML;
    button.innerHTML = `
      <div class="loading-spinner btn-spinner"></div>
      ${text || 'Processando...'}
    `;
  }
  
  button.disabled = true;
}

/**
 * Remove loading do botão
 */
function hideButtonLoading(button) {
  const btnText = button.querySelector('.btn-text');
  const btnLoading = button.querySelector('.btn-loading');
  
  if (btnText && btnLoading) {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  } else if (button.dataset.originalHTML) {
    button.innerHTML = button.dataset.originalHTML;
  } else if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
  }
  
  button.disabled = false;
}

/**
 * Mostra loading no assistente IA
 */
function showAssistantLoading() {
  const assistantBtn = $('#assistantBtn');
  if (assistantBtn) {
    assistantBtn.classList.add('loading');
  }
}

/**
 * Remove loading do assistente IA
 */
function hideAssistantLoading() {
  const assistantBtn = $('#assistantBtn');
  if (assistantBtn) {
    assistantBtn.classList.remove('loading');
  }
}

/**
 * Remove loading inicial da página
 */
function hidePageLoading() {
  const pageLoading = $('#pageLoading');
  if (pageLoading) {
    pageLoading.classList.add('hidden');
    setTimeout(() => {
      if (pageLoading.parentNode) {
        pageLoading.remove();
      }
    }, 500);
  }
}

// =========================
// DADOS DO SITE
// =========================
const siteData = {
  servicos: [
    {
      id: "s1",
      title: "Web Apps e PWAs",
      desc: "Sistemas web progressivos (PWAs) de alta performance e usabilidade.",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: {
        title: "PWAs & Web Apps",
        desc: "Desenvolvemos aplicações web com performance nativa, prontas para funcionar offline e com excelentes métricas de Core Web Vitals.",
        demoLink: "projetos-principais/projeto-pwa-educacao.html"
      }
    },
    {
      id: "s2",
      title: "Avatares & Consultores IA",
      desc: "Assistentes conversacionais e personagens digitais para vendas e suporte 24/7.",
      img: "https://plus.unsplash.com/premium_photo-1733266868412-cfc2ac17b497?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: {
        title: "Consultoria de IA",
        desc: "Desenvolvemos e integramos modelos de linguagem (LLMs) em assistentes virtuais 3D ou textuais, focando em tarefas de alta complexidade como análise jurídica ou suporte técnico especializado."
      }
    },
    {
      id: "s3",
      title: "Automações RPA e Scripts",
      desc: "Otimização de rotinas de negócio (e-mail, planilhas, dados) com *bots* inteligentes.",
      img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: {
        title: "Robotic Process Automation (RPA)",
        desc: "Implementamos *bots* para tarefas repetitivas. Integração com APIs externas (ex: CRM, ERP) para fluidez operacional e redução de erros humanos."
      }
    },
    {
      id: "s4",
      title: "Modelagem 3D e Experiências",
      desc: "Visualizações interativas, realidade aumentada (AR) e modelos de produto 3D para e-commerce e arquitetura.",
      img: "https://plus.unsplash.com/premium_photo-1718198501772-53cc7b846403?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: {
        title: "3D para Web e AR",
        desc: "Criação e otimização de modelos 3D (GLTF/GLB) para exibição em tempo real na web, utilizando Three.js e WebGL. Ideal para configuradores de produto e tour virtual."
      }
    },
    {
      id: "s5",
      title: "Sistemas e Dashboards",
      desc: "Backends escaláveis, APIs robustas e painéis de análise de dados em tempo real.",
      img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: {
        title: "Sistemas & Dashboards",
        desc: "Construímos backends escaláveis, painéis analíticos e integrações em tempo real para tomada de decisão. Boa prática de observability e deploy automatizado."
      }
    },
    {
      id: "s6",
      title: "Conteúdo & SEO Técnico",
      desc: "Estratégias de conteúdo para IA, SEO de alta performance e copywriting.",
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "Estratégia de Conteúdo",
        desc: "Conteúdo otimizado para motores de busca e para modelos de linguagem. Estrutura técnica (schema markup, performance) para máxima visibilidade."
      }
    }
  ],

  portfolioSlides: [
    {
      title: "PWA Educacional com Gamificação",
      desc: "Plataforma de EAD de alta performance. Implementação de sistema de recompensas, trilhas personalizadas e IA para resumo de conteúdo.",
      img: "https://images.unsplash.com/photo-1763107228544-2ad5d71c21f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHRlY2hub2xvZ3klMjBhcHB8ZW58MHx8MHx8fDA%3D",
      projectId: "ead-pwa"
    },
    {
      title: "Consultor 3D de Vendas",
      desc: "Avatar interativo com IA generativa para suporte ao cliente e vendas complexas, integrado ao CRM. Redução de 40% no tempo de atendimento.",
      img: "https://www.operacionesbinarias.org/wp-content/uploads/2023/10/Soluciones-avanzadas-de-soporte-tecnico-con-Inteligencia-Artificial.jpg",
      projectId: "3d-avatar"
    },
    {
      title: "Dashboard de Observabilidade em Tempo Real",
      desc: "Painel analítico customizado com alertas e visualizações 3D para monitoramento de servidores e processos de logística.",
      img: "https://plus.unsplash.com/premium_photo-1682147575923-d35d333704b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGFzaGJvYXJkJTIwZGUlMjBPYnNlcnZhYmlsaWRhZGUlMjBlbSUyMFRlbXBvJTIwUmVhbCUyMFBhaW5lbCUyMGFuYWwlQzMlQUR0aWNvJTIwY3VzdG9taXphZG8lMjBjb20lMjBhbGVydGFzJTIwZSUyMHZpc3VhbGl6YSVDMyVBNyVDMyVCNWVzJTIwM0QlMjBwYXJhJTIwbW9uaXRvcmFtZW50byUyMGQlMjBzZXJ2aWRvcmVzJTIwZSUyMHByb2Nlc3NvcyUyMGQlMjBsb2clQzMlQURzdGljYS58ZW58MHx8MHx8fDA%3D",
      projectId: "obs-dashboard"
    }
  ],

  cases: [
    {
      id: "case-academy",
      title: "AHA Academy",
      desc: "Redesenho da plataforma educacional com gamificação, PWA e testes A/B. +300% de engajamento em 3 meses.",
      img: "https://tse1.mm.bing.net/th/id/OIP.q2slyWqO82eveiHG8EmsMQHaEk?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      info: "Implementação de design system, arquitetura de PWA e trilhas de gamificação. Foco em retenção e performance."
    },
    {
      id: "case-santuario",
      title: "Santuário Emocional",
      desc: "Aplicativo de bem-estar com diários e rituais. Uso de animações imersivas para retenção.",
      img: "https://play-lh.googleusercontent.com/5M8qQxm-whmrGgcx4-vJ_iO4OyKaU-8u2n3ntEyRJo1QGnzdcmfRJQXn-clj9Noljg",
      info: "Desenvolvimento focado em UX, com métricas de engajamento. Plataforma pronta para escalabilidade global."
    },
    {
      id: "case-fashion",
      title: "E-commerce Fashion",
      desc: "Plataforma de moda com visualizador 3D de produtos. +40% em conversões em 2 meses.",
      img: "https://static.wixstatic.com/media/53407e_e3d11174eec344a996b1d5b65f15ca30~mv2.jpg/v1/fill/w_980,h_465,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/COMO%20FUNCIONA%20FASHION%203D%20STUDIO%203.jpg",
      info: "Implementação de visualizador 3D e realidade aumentada para produtos de moda. Integração com CRM e analytics."
    }
  ],

  faq: [
    {
      q: "faq_q_1",
      a: "faq_a_1"
    },
    {
      q: "faq_q_2",
      a: "faq_a_2"
    },
    {
      q: "faq_q_3",
      a: "faq_a_3"
    },
    {
      q: "faq_q_4",
      a: "faq_a_4"
    },
    {
      q: "faq_q_5",
      a: "faq_a_5"
    },
    {
      q: "faq_q_6",
      a: "faq_a_6"
    }
  ],

  tecnologias: [
    {
      id: "tech-react",
      title: "React / Next.js / PWAs",
      desc: "Frontend modular e performático.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "React & Next.js",
        desc: "Bibliotecas modernas para interfaces dinâmicas e Single Page Applications (SPAs). Focamos em Server-Side Rendering (SSR) e Static Site Generation (SSG) para performance máxima."
      }
    },
    {
      id: "tech-fastapi",
      title: "Python / FastAPI",
      desc: "APIs rápidas e eficientes para serviços de IA.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "FastAPI",
        desc: "APIs rápidas com validação automática e documentação integrada. Excelente para serviços de ML e integrações em tempo real."
      }
    },
    {
      id: "tech-supabase",
      title: "Supabase / PostgreSQL",
      desc: "Auth, realtime e banco relacional.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "Supabase & Postgres",
        desc: "Auth, realtime e storage prontos para uso. Usamos como backend leve para MVPs e serviços com baixa latência."
      }
    },
    {
      id: "tech-design",
      title: "Tailwind / Design System",
      desc: "Componentes reutilizáveis e temas.",
      img: "https://images.unsplash.com/photo-1581093588401-2f5b12666f8f?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "Design Systems",
        desc: "Usamos uma arquitetura de design token para garantir consistência visual e fácil customização, acelerando o desenvolvimento e a manutenção."
      }
    }
  ],

  assistentes: [
    {
      id: "ai-marketing",
      title: "AI Marketing & Conteúdo",
      desc: "Criação de copies e fluxos de email marketing.",
      img: "https://tse1.mm.bing.net/th/id/OIP.R9WMePBScBC_hE4NO1mPQQHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      info: {
        title: "Assistente de Marketing",
        desc: "Criação de fluxos de e-mail marketing personalizados para nutrição e conversão com métricas integradas."
      }
    },
    {
      id: "ai-nutricao",
      title: "AI Nutrição & Saúde",
      desc: "Plano de refeições otimizado baseado em dados do cliente e recomendações.",
      img: "https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2017/03/formacao_a-nutricao-considera-o-alimento-um-remedio-para-a-saude.jpg",
      info: {
        title: "Assistente de Nutrição",
        desc: "Criação de fluxos de e-mail marketing personalizados para nutrição e conversão com métricas integradas."
      }
    }
  ],

  produtos: [
    {
      id: "prod-pwa",
      title: "Template PWA de Vendas",
      desc: "PWA pronto para e-commerce ou catálogos digitais.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=60&auto=format&fit=crop",
      info: {
        title: "Template PWA",
        desc: "Um esqueleto de PWA otimizado, com rotas, cache e manifest configurados. Reduza o tempo de desenvolvimento em 30%."
      }
    },
    {
      id: "prod-dashboard",
      title: "Dashboard 3D",
      desc: "Visualizações interativas para decisões rápidas.",
      img: "https://img.freepik.com/premium-photo/web-dashboard-portfolio-analysis-dashboard-with-portfolio-analysis-tools-concept-idea-design-art_655090-978645.jpg",
      info: {
        title: "Dashboard 3D",
        desc: "Visualizações 3D integradas a dados em tempo real, ideais para operações que precisam identificar padrões rapidamente."
      }
    }
  ],

  blog: [
    {
      title: "Como migrar para FastAPI em 2025",
      desc: "Guia prático — performance e async.",
      link: "#artigo1"
    },
    {
      title: "Design Systems: O que são e por que usar",
      desc: "Consistência e escalabilidade visual.",
      link: "#artigo2"
    },
    {
      title: "WCAG e Acessibilidade: Checklist para Devs",
      desc: "Otimizando a experiência para todos.",
      link: "#artigo3"
    }
  ]
};

// =========================
// FUNÇÕES UTILITÁRIAS
// =========================

/**
 * Mostra notificação toast
 */
function showToast(message, type = 'success') {
  const existingToast = $('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 120px;
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 9999;
    font-weight: 600;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: toastIn 0.3s ease;
    max-width: 90vw;
    text-align: center;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Gerenciamento de foco para acessibilidade
 */
let _trapHandler = null;
let _lastFocusedElement = null;

function trapFocus(container) {
  const focusable = container.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;

  const first = focusable[0], last = focusable[focusable.length - 1];
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
  if (_lastFocusedElement) {
    _lastFocusedElement.focus();
    _lastFocusedElement = null;
  }
}

// =========================
// MANIPULAÇÃO DO DOM
// =========================

/**
 * Cria um card de serviço
 */
function createServiceCard(service, isMobile = false) {
  return `
    <article class="card" role="listitem" aria-labelledby="${service.id}">
      <div class="image-loading" style="height:200px; margin-bottom:20px; border-radius:12px">
        <div class="loading-spinner medium"></div>
      </div>
      <img class="card-thumb" src="${service.img}" alt="${service.title}" loading="lazy"
           onload="this.previousElementSibling.style.display='none'; this.style.display='block'"
           style="display:none">
      <h4 id="${service.id}">${service.title}</h4>
      <p class="muted">${service.desc}</p>
      <div class="card-actions">
        <a href="#" class="saiba-mais" data-topic="${service.id}" aria-expanded="false" 
           aria-controls="info-${service.id}">Saiba mais →</a>
      </div>
      <div class="info-card" id="info-${service.id}" data-topic="${service.id}" aria-hidden="true" 
           role="region" aria-labelledby="info-heading-${service.id}">
        <div class="info-row">
          <img src="${service.img}" alt="${service.info.title}">
          <div>
            <h5 id="info-heading-${service.id}">${service.info.title}</h5>
            <p>${service.info.desc}</p>
            <div class="info-actions">
              ${service.info.demoLink ? 
                `<a href="${service.info.demoLink}" class="btn primary" target="_blank" rel="noopener">Ver demo ao vivo</a>` : 
                `<button class="btn primary" onclick="openProject('${service.id}')">Ver demo</button>`
              }
              <a href="#portfolio" class="btn ghost">Ir ao portfólio</a>
              <button class="close-info" type="button" aria-label="Fechar detalhes">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Cria um slide do carrossel principal
 */
function createPortfolioSlide(slide, index) {
  return `
    <div class="carousel-item" role="group" aria-label="Slide ${index + 1} de ${siteData.portfolioSlides.length}">
      <div class="image-loading" style="height:100%; position:absolute; width:100%; border-radius:20px">
        <div class="loading-spinner large"></div>
      </div>
      <img src="${slide.img}" alt="${slide.title}" 
           onload="this.previousElementSibling.style.display='none'"
           style="display:none">
      <div class="carousel-content">
        <h4>${slide.title}</h4>
        <p>${slide.desc}</p>
        <div class="carousel-actions">
          <button class="btn primary" onclick="openProject('${slide.projectId}')">Ver projeto</button>
          <button class="btn secondary" onclick="openCase('${slide.projectId}')">Ver Case</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Cria um card de caso
 */
function createCaseCard(caseItem, isMobile = false) {
  return `
    <div class="card" role="listitem" aria-labelledby="${caseItem.id}">
      <h4 id="${caseItem.id}">${caseItem.title}</h4>
      <p class="muted">${caseItem.desc}</p>
      <div style="margin-top:16px; display:flex; gap:12px">
        <a href="#portfolio" class="saiba-mais" data-topic="${caseItem.id}" aria-expanded="false">
          Ver case completo →
        </a>
      </div>
      <div class="info-card" data-topic="${caseItem.id}" aria-hidden="true">
        <div class="info-row">
          <img src="${caseItem.img}" alt="${caseItem.title} Case">
          <div>
            <h5>Case: ${caseItem.title}</h5>
            <p>${caseItem.info}</p>
            <div class="info-actions">
              <a href="#portfolio" class="btn ghost">Ver case</a>
              <button class="close-info" type="button" aria-label="Fechar detalhes">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Cria um item FAQ
 */
function createFaqItem(item, index) {
  return `
    <details class="fade-up">
      <summary data-i18n="${item.q}">${translations[currentLang][item.q] || item.q}</summary>
      <p class="muted" data-i18n="${item.a}">${translations[currentLang][item.a] || item.a}</p>
    </details>
  `;
}

// =========================
// INICIALIZAÇÃO DO CONTEÚDO
// =========================

/**
 * Carrega todo o conteúdo dinâmico
 */
function loadDynamicContent() {
  // Carrega serviços
  const servicosGrid = $('#servicosGrid');
  const servicosCarousel = $('#servicosCarousel');
  
  if (servicosGrid) {
    servicosGrid.innerHTML = siteData.servicos.map(service => createServiceCard(service)).join('');
  }
  
  if (servicosCarousel) {
    servicosCarousel.innerHTML = siteData.servicos.map(service => createServiceCard(service, true)).join('');
  }

  // Carrega portfolio
  const carouselInner = $('#carouselInner');
  const dotsContainer = $('#dots');
  
  if (carouselInner) {
    carouselInner.innerHTML = siteData.portfolioSlides.map((slide, i) => createPortfolioSlide(slide, i)).join('');
  }
  
  if (dotsContainer) {
    dotsContainer.innerHTML = siteData.portfolioSlides.map((_, i) => `
      <button class="dot ${i === 0 ? 'active' : ''}" role="tab" aria-controls="carouselInner" 
              aria-label="Ir para o slide ${i + 1}"></button>
    `).join('');
  }

  // Carrega cases
  const casesGrid = $('#casesGrid');
  const casesCarousel = $('#casesCarousel');
  
  if (casesGrid) {
    casesGrid.innerHTML = siteData.cases.map(caseItem => createCaseCard(caseItem)).join('');
  }
  
  if (casesCarousel) {
    casesCarousel.innerHTML = siteData.cases.map(caseItem => createCaseCard(caseItem, true)).join('');
  }

  // Carrega FAQ
  const faqList = $('#faqList');
  if (faqList) {
    faqList.innerHTML = siteData.faq.map((item, i) => createFaqItem(item, i)).join('');
  }

  // Carrega outras seções
  loadSection('tecnologias', siteData.tecnologias, createServiceCard);
  loadSection('assistentes', siteData.assistentes, createServiceCard);
  loadSection('produtos', siteData.produtos, createServiceCard);
  loadSection('blog', siteData.blog, (item) => `
    <article class="card">
      <h4><a href="${item.link}" style="text-decoration:none;color:var(--text)">${item.title}</a></h4>
      <p class="muted">${item.desc}</p>
      <div class="card-actions">
        <a href="${item.link}" class="saiba-mais" aria-expanded="false">Ler artigo →</a>
      </div>
    </article>
  `);
}

/**
 * Carrega uma seção específica
 */
function loadSection(sectionId, items, createItemFn) {
  const grid = $(`#${sectionId}Grid`);
  const carousel = $(`#${sectionId}Carousel`);
  
  if (grid) {
    grid.innerHTML = items.map(item => createItemFn(item)).join('');
  }
  
  if (carousel) {
    carousel.innerHTML = items.map(item => createItemFn(item, true)).join('');
  }
}

// =========================
// TRADUÇÕES (I18N)
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
    msg_sent: "Mensagem enviada",
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
    msg_sent: "Message sent",
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
    msg_sent: "Mensaje enviado",
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

  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let translation = dict[key] || translations['pt'][key] || el.textContent;
    if (key === 'hero_title') {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Atualiza botões ativos
  $$('.lang-btn, .mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });

  document.documentElement.lang = lang;
  showToast(`Idioma alterado para ${lang.toUpperCase()}`);
}

function initLang() {
  const langBtns = $$('.lang-btn, .mobile-lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.dataset.lang;
      applyLang(lang);
    });
  });
  applyLang(currentLang);
}

// =========================
// TEMA (DARK/LIGHT)
// =========================
function initTheme() {
  const desktopToggle = $('#themeToggle');
  const mobileToggle = $('#mobileThemeToggle');
  const initialTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (desktopToggle) {
      desktopToggle.textContent = isLight ? '☀️' : '🌙';
      desktopToggle.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
      desktopToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    }

    if (mobileToggle) {
      mobileToggle.textContent = isLight ? '☀️' : '🌙';
      mobileToggle.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
      mobileToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Tema ${next === 'light' ? 'claro' : 'escuro'} ativado`);
  }

  if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
  applyTheme(initialTheme);
}

// =========================
// MENU MOBILE
// =========================
function initMobileMenu() {
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
    trapFocus(mobileNav);
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openNav);
  if (closeMobileNav) closeMobileNav.addEventListener('click', closeNav);

  $$('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  if (mobileNav) mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });
}

// =========================
// INFO CARDS (Saiba Mais)
// =========================
function initInfoCards() {
  function openInfoCard(infoEl, triggerBtn) {
    infoEl.classList.add('open');
    infoEl.setAttribute('aria-hidden', 'false');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
    const closeBtn = infoEl.querySelector('.close-info');
    if (closeBtn) closeBtn.focus();
    trapFocus(infoEl);
  }

  function closeInfoCard(infoEl) {
    infoEl.classList.remove('open');
    infoEl.setAttribute('aria-hidden', 'true');
    const topic = infoEl.dataset.topic;
    const trigger = $(`.saiba-mais[data-topic="${topic}"]`);
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    releaseFocusTrap();
    if (trigger) trigger.focus();
  }

  // Delegação de eventos para lidar com conteúdo dinâmico
  document.addEventListener('click', function(e) {
    const saibaMaisBtn = e.target.closest('.saiba-mais');
    if (saibaMaisBtn) {
      e.preventDefault();
      const topic = saibaMaisBtn.dataset.topic;
      
      let info;
      if (window.innerWidth < 768) {
        info = $(`.cards-carousel-container .info-card[data-topic="${topic}"]`);
      } else {
        info = $(`.grid.mobile-carousel .info-card[data-topic="${topic}"]`);
      }
      
      if (!info) {
        info = $(`.info-card[data-topic="${topic}"]`);
      }

      $$('.info-card.open').forEach(card => {
        if (card !== info) closeInfoCard(card);
      });

      if (info && !info.classList.contains('open')) {
        openInfoCard(info, saibaMaisBtn);
      } else {
        closeInfoCard(info);
      }
    }

    const closeBtn = e.target.closest('.close-info');
    if (closeBtn) {
      const info = closeBtn.closest('.info-card');
      if (info) closeInfoCard(info);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openCard = $('.info-card.open');
      if (openCard) closeInfoCard(openCard);
    }
  });
}

// =========================
// CARROSSEL PRINCIPAL
// =========================
function initCarousel() {
  const inner = $('#carouselInner');
  const dots = $('#dots');
  if (!inner || !dots) return;

  const slides = inner.children.length;
  let currentIndex = 0;
  let intervalId;
  let isMobile = window.innerWidth < 768;

  function updateCarousel() {
    if (!isMobile) {
      const offset = -currentIndex * 100;
      inner.style.transform = `translateX(${offset}%)`;
    }

    $$('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
      dot.setAttribute('aria-selected', index === currentIndex);
    });

    $$('.carousel-item').forEach((item, index) => {
      item.setAttribute('aria-hidden', index !== currentIndex);
    });
  }

  function goToSlide(index) {
    // Adiciona classe de loading
    const carousel = $('.carousel');
    carousel.classList.add('loading');
    
    currentIndex = (index + slides) % slides;
    updateCarousel();

    if (!isMobile) {
      resetAutoPlay();
    } else {
      const slideWidth = inner.children[0].offsetWidth + 16;
      inner.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
    
    // Remove loading após animação
    setTimeout(() => {
      carousel.classList.remove('loading');
    }, 600);
  }

  $$('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  function startAutoPlay() {
    if (!isMobile) {
      intervalId = setInterval(() => goToSlide(currentIndex + 1), 8000);
    }
  }

  function resetAutoPlay() {
    clearInterval(intervalId);
    startAutoPlay();
  }

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

  updateCarousel();
  startAutoPlay();

  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      if (isMobile) {
        clearInterval(intervalId);
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
  const carousels = [
    'servicos', 'tech', 'assistentes', 'produtos', 'blog', 'cases'
  ];

  carousels.forEach(key => {
    const carousel = $(`#${key}Carousel`);
    const indicators = $(`#${key}Indicators`);

    if (!carousel || !indicators) return;

    const cards = carousel.children;
    const cardCount = cards.length;

    indicators.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `Ir para o card ${i + 1}`);
      indicator.setAttribute('type', 'button');
      indicator.addEventListener('click', () => {
        scrollToCard(carousel, i);
        updateIndicators(indicators, i);
      });
      indicators.appendChild(indicator);
    }

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
    const open = !assistantPanel.classList.contains('open');
    
    if (open) {
      // Mostra loading no botão
      showAssistantLoading();
      
      // Abre o painel
      assistantPanel.classList.add('open');
      assistantBtn.setAttribute('aria-expanded', 'true');
      assistantPanel.setAttribute('aria-hidden', 'false');

      // Foca no iframe quando carregar
      if (assistantIframe) {
        assistantIframe.onload = () => {
          // Remove loading
          hideAssistantLoading();
          
          setTimeout(() => {
            assistantIframe.focus();
            if (assistantIframe.contentWindow) {
              assistantIframe.contentWindow.postMessage({ type: 'PING' }, '*');
            }
          }, 300);
        };
        
        // Recarrega o iframe se já estiver carregado
        if (assistantIframe.contentDocument) {
          assistantIframe.contentWindow.location.reload();
        }
      }
    } else {
      // Fecha o painel
      assistantPanel.classList.remove('open');
      assistantBtn.setAttribute('aria-expanded', 'false');
      assistantPanel.setAttribute('aria-hidden', 'true');
      releaseFocusTrap();
      hideAssistantLoading();
    }
  }

  assistantBtn.addEventListener('click', toggleAssistant);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assistantPanel.classList.contains('open')) {
      toggleAssistant();
      assistantBtn.focus();
    }
  });

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'ASSISTANT_READY') {
      console.log('🤖 Assistente IA carregado com sucesso');
      hideAssistantLoading();
    }

    if (event.data?.type === 'CLOSE_ASSISTANT') {
      toggleAssistant();
    }
  });
}

// =========================
// FORMULÁRIO DE CONTATO
// =========================
function initFormValidation() {
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const nome = $('#nome')?.value.trim();
    const email = $('#email')?.value.trim();
    const mensagem = $('#mensagem')?.value.trim();
    const lang = currentLang;

    // Validação
    if (!nome || !email || !mensagem) {
      showToast(
        lang === 'en' ? 'Please fill in all required fields.' : 
        lang === 'es' ? 'Por favor, rellene todos los campos obligatorios.' : 
        'Por favor, preencha todos os campos obrigatórios.',
        'error'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast(
        lang === 'en' ? 'Please enter a valid email address.' : 
        lang === 'es' ? 'Por favor, introduzca una dirección de correo electrónico válida.' : 
        'Por favor, insira um endereço de e-mail válido.',
        'error'
      );
      return;
    }

    // Mostra loading no botão
    showButtonLoading(submitBtn, translations[lang].btn_enviar);

    // Simula envio (substitua por fetch real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log dos dados (substitua por envio real)
    console.log({ 
      nome, 
      email, 
      mensagem, 
      servico: $('#servico')?.value 
    });
    
    // Remove loading e mostra sucesso
    hideButtonLoading(submitBtn);
    showToast(translations[lang].msg_sent, 'success');
    
    // Reseta o formulário
    form.reset();
  });
}

// =========================
// ANIMAÇÃO DE NÚMEROS (KPI)
// =========================
function initAnimatedCounters() {
  const counterElements = $$('.kpi strong');
  const duration = 2000;
  const totalFrames = duration / (1000 / 60);

  counterElements.forEach(element => {
    const fullText = element.textContent.trim();
    const targetValue = parseInt(fullText.match(/[\d.]+/));
    const prefix = fullText.match(/^[^0-9.]*/) ? fullText.match(/^[^0-9.]*/)[0] : '';
    const suffix = fullText.match(/[^0-9.]*$/) ? fullText.match(/[^0-9.]*$/)[0] : '';

    let frame = 0;

    const updateCounter = () => {
      frame++;
      let progress = frame / totalFrames;
      progress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.min(targetValue, Math.floor(targetValue * progress));
      element.textContent = `${prefix}${currentValue}${suffix}`;

      if (frame < totalFrames) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = fullText;
      }
    };
    requestAnimationFrame(updateCounter);
  });
}

// =========================
// GERENCIAMENTO DE IMAGENS
// =========================
function initImageLoading() {
  // Configura carregamento de imagens
  const heroImg = $('.hero-img');
  const aboutImg = $('.about-img');
  
  if (heroImg) {
    heroImg.onload = function() {
      this.classList.add('loaded');
      const loading = this.previousElementSibling;
      if (loading && loading.classList.contains('image-loading')) {
        loading.style.display = 'none';
      }
    };
    
    // Fallback: se a imagem já estiver carregada
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
      const loading = heroImg.previousElementSibling;
      if (loading && loading.classList.contains('image-loading')) {
        loading.style.display = 'none';
      }
    }
  }
  
  if (aboutImg) {
    aboutImg.onload = function() {
      this.classList.add('loaded');
      const loading = this.previousElementSibling;
      if (loading && loading.classList.contains('image-loading')) {
        loading.style.display = 'none';
      }
    };
    
    if (aboutImg.complete) {
      aboutImg.classList.add('loaded');
      const loading = aboutImg.previousElementSibling;
      if (loading && loading.classList.contains('image-loading')) {
        loading.style.display = 'none';
      }
    }
  }
}

// =========================
// ADSENSE
// =========================
function initAdSense() {
  setTimeout(function () {
    const ads = $$('.adsbygoogle');
    if (ads.length > 0) {
      (adsbygoogle = window.adsbygoogle || []).push({});
      console.log('AdSense carregado para ' + ads.length + ' anúncios');
    }
  }, 1000);
}

// =========================
// FUNÇÕES GLOBAIS
// =========================
window.openProject = (project) => {
  showToast(`Abrindo projeto: ${project}`);
  // Aqui você pode adicionar a lógica real para abrir projetos
};

window.openCode = (project) => {
  showToast(`Abrindo código: ${project}`);
  // Aqui você pode adicionar a lógica real para abrir código
};

window.openCase = (caseName) => {
  showToast(`Abrindo case: ${caseName}`);
  // Aqui você pode adicionar a lógica real para abrir cases
};

// =========================
// INICIALIZAÇÃO COMPLETA
// =========================
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 MakerAI Studio - Inicializando...');
  
  // 1. Carrega conteúdo dinâmico
  loadDynamicContent();
  
  // 2. Inicializa todos os módulos
  initTheme();
  initLang();
  initMobileMenu();
  initImageLoading();
  initInfoCards();
  initCarousel();
  initCardCarousels();
  initAssistant();
  initFormValidation();
  initAdSense();

  // 3. Inicia animação dos números quando visíveis
  const kpisSection = $('.hero .kpis');
  if (kpisSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initAnimatedCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(kpisSection);
  }

  // 4. Aplica animações fade-up
  setTimeout(() => {
    $$('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      el.classList.add('show');
    });
  }, 100);

  // 5. Remove loading da página
  window.addEventListener('load', () => {
    setTimeout(() => {
      hidePageLoading();
    }, 500);
  });

  // Fallback: remove loading após 3 segundos
  setTimeout(() => {
    hidePageLoading();
  }, 3000);

  console.log('✅ MakerAI Studio - Inicialização completa!');
});

// Fallback global para loading
if (document.readyState === 'complete') {
  setTimeout(() => {
    hidePageLoading();
  }, 1000);
}
