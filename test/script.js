// GSAP Animation on Load
gsap.from(".project-card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
});

// Modal Logic
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".open-modal-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalImage.src = card.dataset.img;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
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
