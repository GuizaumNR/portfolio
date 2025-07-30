// ====================
// INICIALIZAÇÃO
// ====================
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initScrollspy();
  initMobileMenu();
  initBackToTop();
  initProjectFilter();
  initContactForm();
  initAnimations();
  initImageHover();
});

document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed(".typing", {
    strings: [
      "Engenheiro de Software",
      "Desenvolvedor Full Stack",
      "Técnico em Informática",
      "Desenvolvedor Web",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
});

// ====================
// CURSOR PERSONALIZADO
// ====================
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  const links = document.querySelectorAll(
    "a, button, .btn, .project-card, .skill, .social-link"
  );

  // Posição inicial
  cursor.style.opacity = 0;
  cursorFollower.style.opacity = 0;

  // Mostrar cursor ao mover o mouse
  document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = 1;
    cursorFollower.style.opacity = 1;

    // Definir posição do cursor
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // O seguidor tem um pequeno atraso para criar efeito suave
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 50);
  });

  // Efeito de hover em elementos clicáveis
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursorFollower.style.width = "50px";
      cursorFollower.style.height = "50px";
      cursorFollower.style.borderColor = "var(--secondary-color)";
    });

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      cursorFollower.style.width = "40px";
      cursorFollower.style.height = "40px";
      cursorFollower.style.borderColor = "var(--primary-color)";
    });
  });

  // Esconder cursor quando sair da janela
  document.addEventListener("mouseout", () => {
    cursor.style.opacity = 0;
    cursorFollower.style.opacity = 0;
  });
}

// ====================
// SCROLLSPY
// ====================
function initScrollspy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");

  // Adicionar classe ao header quando a página é rolada
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Identificar seção atual para o scrollspy
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Atualizar links de navegação ativos
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Rolagem suave para âncoras
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 79,
        behavior: "smooth",
      });

      // Fechar menu mobile quando um link é clicado
      if (mobileMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });

  // Rolagem para baixo na seção hero
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("#sobre");
      window.scrollTo({
        top: nextSection.offsetTop - 79,
        behavior: "smooth",
      });
    });
  }
}

// ====================
// MENU MOBILE
// ====================
function initMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  window.toggleMobileMenu = function () {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  };

  mobileMenu.addEventListener("click", toggleMobileMenu);
}

// ====================
// BOTÃO VOLTAR AO TOPO
// ====================
function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ====================
// FILTRO DE PROJETOS
// ====================
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Atualizar botão ativo
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Filtrar projetos
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ====================
// FORMULÁRIO DE CONTATO
// ====================
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obter valores do formulário
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validação simples
      if (!name || !email || !subject || !message) {
        showFormMessage("Por favor, preencha todos os campos.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage("Por favor, insira um email válido.", "error");
        return;
      }

      // Simulação de envio (aqui você conectaria a um backend real)
      const submitBtn = contactForm.querySelector(".submit-btn");
      const btnText = submitBtn.querySelector(".btn-text");
      const originalText = btnText.textContent;

      // Alterando o botão para mostrar carregamento
      btnText.textContent = "Enviando...";
      submitBtn.disabled = true;

      // Simulando um atraso de rede
      setTimeout(() => {
        // Aqui você faria a requisição real para um backend
        showFormMessage(
          "Mensagem enviada com sucesso! Entrarei em contato em breve.",
          "success"
        );
        contactForm.reset();

        // Restaurar o botão
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    // Verificar se já existe uma mensagem e remover
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Criar novo elemento de mensagem
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Inserir após o formulário
    contactForm.parentNode.insertBefore(
      messageElement,
      contactForm.nextSibling
    );

    // Remover após alguns segundos
    setTimeout(() => {
      messageElement.classList.add("hiding");
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 5000);
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

// ====================
// ANIMAÇÕES
// ====================
function initAnimations() {
  // Animação de entrada para elementos quando entram na viewport
  const animatedElements = document.querySelectorAll(
    ".section-header, .hero-content, .about-content, .project-card, .timeline-item, .contact-content"
  );

  // Observer para detectar elementos entrando na viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target); // Parar de observar após animar
        }
      });
    },
    {
      threshold: 0.1, // Animar quando pelo menos 10% do elemento está visível
      rootMargin: "0px 0px -50px 0px", // Pequeno offset para animar antes de estar completamente visível
    }
  );

  // Adicionar classe inicial e observar elementos
  animatedElements.forEach((element) => {
    element.classList.add("pre-animation");
    observer.observe(element);
  });

  // Adicionar CSS inline para as animações
  const style = document.createElement("style");
  style.textContent = `
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-message {
            padding: 1rem;
            margin-top: 1rem;
            border-radius: var(--border-radius-md);
            transition: opacity 0.3s ease;
        }
        
        .form-message.success {
            background-color: rgba(76, 175, 80, 0.1);
            color: var(--success-color);
            border: 1px solid var(--success-color);
        }
        
        .form-message.error {
            background-color: rgba(244, 67, 54, 0.1);
            color: var(--error-color);
            border: 1px solid var(--error-color);
        }
        
        .form-message.hiding {
            opacity: 0;
        }
    `;
  document.head.appendChild(style);
}

// ====================
// EFEITOS DE HOVER
// ====================
function initImageHover() {
  // Efeito de paralaxe nas imagens hero e sobre
  const heroImage = document.querySelector(".hero-image img");
  const aboutImage = document.querySelector(".about-image img");

  if (heroImage && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

      heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
  }

  if (aboutImage && window.innerWidth > 768) {
    const aboutSection = document.querySelector(".about");

    aboutSection.addEventListener("mousemove", (e) => {
      const rect = aboutSection.getBoundingClientRect();
      const xPos = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 15;

      aboutImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });

    aboutSection.addEventListener("mouseleave", () => {
      aboutImage.style.transform = "translate(0, 0)";
    });
  }

  // Efeito hover em cards de projeto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const projectImage = this.querySelector(".project-image img");
      projectImage.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", function () {
      const projectImage = this.querySelector(".project-image img");
      projectImage.style.transform = "scale(1)";
    });
  });
}

// ====================
// VERIFICAR SUPORTE A RECURSOS
// ====================
// Verificar se o navegador suporta backdrop-filter
document.addEventListener("DOMContentLoaded", () => {
  const isBackdropFilterSupported = CSS.supports(
    "backdrop-filter",
    "blur(10px)"
  );

  if (!isBackdropFilterSupported) {
    const header = document.querySelector(".header");
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
  }

  // Verificar se é dispositivo touch
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add("touch-device");

    // Desativar cursor personalizado em dispositivos touch
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    if (cursor && cursorFollower) {
      cursor.style.display = "none";
      cursorFollower.style.display = "none";
    }
  }
});

// Elementos do modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalFeatures = document.getElementById("modalFeatures");
const featuresList = document.getElementById("featuresList");
const visitSiteBtn = document.getElementById("visitSiteBtn");
const closeModal = document.getElementById("closeModal");

// Elementos do carrossel
const carouselTrack = document.getElementById("carouselTrack");
const carouselIndicators = document.getElementById("carouselIndicators");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let totalSlides = 0;

// Abrir modal
document.querySelectorAll(".open-modal-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const title = button.dataset.title;
    const description = button.dataset.description;
    const images = JSON.parse(button.dataset.images);
    const features = JSON.parse(button.dataset.features);
    const url = button.dataset.url;

    // Preencher informações do modal
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    visitSiteBtn.href = url;

    // Preencher tags (pegar do card)
    const cardTags = button.closest(".project-card").querySelectorAll(".tag");
    modalTags.innerHTML = "";
    cardTags.forEach((tag) => {
      modalTags.innerHTML += `<span class="tag">${tag.textContent}</span>`;
    });

    // Preencher funcionalidades
    featuresList.innerHTML = "";
    features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // Configurar carrossel
    setupCarousel(images);

    // Mostrar modal
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);

    // Prevenir scroll do body
    document.body.style.overflow = "hidden";
  });
});

// Fechar modal
function closeModalFunction() {
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

closeModal.addEventListener("click", closeModalFunction);

// Fechar modal clicando fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunction();
  }
});

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModalFunction();
  }
});

// Configurar carrossel
function setupCarousel(images) {
  currentSlide = 0;
  totalSlides = images.length;

  // Limpar carrossel
  carouselTrack.innerHTML = "";
  carouselIndicators.innerHTML = "";

  // Adicionar slides
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `<img src="${image}" alt="Imagem ${index + 1}" />`;
    carouselTrack.appendChild(slide);

    // Adicionar indicador
    const indicator = document.createElement("div");
    indicator.className = `indicator ${index === 0 ? "active" : ""}`;
    indicator.addEventListener("click", () => goToSlide(index));
    carouselIndicators.appendChild(indicator);
  });

  // Mostrar/ocultar navegação se necessário
  if (totalSlides <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    carouselIndicators.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    carouselIndicators.style.display = "flex";
  }

  updateCarousel();
}

// Navegar para slide específico
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Próximo slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

// Slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Atualizar carrossel
function updateCarousel() {
  const translateX = -currentSlide * 100;
  carouselTrack.style.transform = `translateX(${translateX}%)`;

  // Atualizar indicadores
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

// Event listeners da navegação
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("active")) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  }
});

// Auto-slide (opcional - descomente se desejar)
/*
        let autoSlideInterval;
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Iniciar auto-slide quando modal abrir
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-modal-btn')) {
                setTimeout(startAutoSlide, 1000);
            }
        });
        
        // Parar auto-slide quando modal fechar
        closeModal.addEventListener('click', stopAutoSlide);
        */
