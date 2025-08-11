// Animação do título da seção de Benefícios
const beneficiosSection = document.querySelector('.beneficios');
const sectionTitleAnimation = document.querySelector('.section-title-animation');

if (beneficiosSection && sectionTitleAnimation) {
    beneficiosSection.addEventListener('mouseenter', () => {
        sectionTitleAnimation.classList.add('pop-in');
    });

    beneficiosSection.addEventListener('mouseleave', () => {
        sectionTitleAnimation.classList.remove('pop-in');
    });
}

// Carrossel de Imagens Dinâmico
const carouselContainer = document.getElementById('carousel-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const carouselDotsContainer = document.getElementById('carousel-dots');

// Array de imagens para o carrossel (assumindo que as imagens estão em images_carousel/)
const carouselImages = [
    'images_carousel/avatares crianca.jpg',
    'images_carousel/cookes.jpg',
    'images_carousel/hero-carousel-2.jpg',
    'images_carousel/hero-carousel-3.jpg',
    'images_carousel/pote cookes.jpg',
    'images_carousel/avatar1.jpg',
    'images/sabor nutella.jpg',
    'images/sabor doce de leitejpg.jpg'
];

let currentSlideIndex = 0;
let slideInterval;

function createCarousel() {
    carouselContainer.innerHTML = ''; // Limpa o container
    carouselDotsContainer.innerHTML = ''; // Limpa os dots

    carouselImages.forEach((imageSrc, index) => {
        // Cria o slide da imagem
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.style.backgroundImage = `url('${imageSrc}')`;
        if (index === 0) {
            slide.classList.add('active');
        }
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Cookitos Carousel Slide ${index + 1}`;
        slide.appendChild(img);
        carouselContainer.appendChild(slide);

        // Cria o dot de navegação
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        carouselDotsContainer.appendChild(dot);
    });

    // Atualiza as referências dos slides e dots após a criação
    let slides = document.querySelectorAll('.carousel-slide');
    let dots = document.querySelectorAll('.dot');

    startAutoSlide();
}

function goToSlide(index) {
    let slides = document.querySelectorAll('.carousel-slide');
    let dots = document.querySelectorAll('.dot');

    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    currentSlideIndex = index;

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    let newIndex = currentSlideIndex + direction;

    if (newIndex >= carouselImages.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = carouselImages.length - 1;
    }
    goToSlide(newIndex);
}

function startAutoSlide() {
    clearInterval(slideInterval); // Limpa qualquer intervalo existente
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 2000); // Muda a cada 2 segundos
}

// Event Listeners para os botões de navegação
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        changeSlide(-1);
        startAutoSlide(); // Reinicia o auto-slide após clique manual
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        changeSlide(1);
        startAutoSlide(); // Reinicia o auto-slide após clique manual
    });
}

// Pausar auto-play quando hover
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', createCarousel);


// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu mobile ao clicar em link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion com Hover
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
    });
});

// Formulário de contato com redirecionamento para WhatsApp
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('contato-nome').value.trim();
        const telefone = document.getElementById('contato-telefone').value.trim();
        const mensagem = document.getElementById('contato-mensagem').value.trim();

        if (!nome || !mensagem) {
            alert('Por favor, preencha seu nome e a mensagem.');
            return;
        }

        const numeroWhatsApp = '5517991519103';
        let textoWhatsApp = `Olá, meu nome é ${nome}.`;
        if (telefone) {
            textoWhatsApp += `\nTelefone: ${telefone}`;
        }
        textoWhatsApp += `\n\nMensagem: ${mensagem}`;

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

        window.open(urlWhatsApp, '_blank');
        
        contactForm.reset();
    });
}

// Chat ao vivo (simulado)
const chatBtn = document.querySelector('.btn-chat');
if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        alert('Chat ao vivo será aberto em breve! Por enquanto, entre em contato pelo WhatsApp: (17) 99151-9103');
    });
}

// Adicionar ao carrinho (simulado)
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const originalText = btn.textContent;
        btn.textContent = 'Adicionado!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
    });
});

// Ver detalhes do produto (simulado)
document.querySelectorAll('.btn-produto').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Detalhes do produto serão exibidos em breve!');
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Função para redimensionar imagens automaticamente
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            // Adicionar classe para indicar que a imagem foi carregada
            img.classList.add('loaded');
        });
        
        // Lazy loading para imagens
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
}

// Executar otimização de imagens quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', optimizeImages);

// Função para analytics (placeholder)
function trackEvent(eventName, eventData) {
    // Aqui seria integrado o Google Analytics ou Facebook Pixel
    console.log('Event tracked:', eventName, eventData);
}

// Rastrear cliques em botões importantes
document.querySelectorAll('.btn-primary, .btn-add-cart, .btn-promocao').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            button_class: btn.className
        });
    });
});

// Função para WhatsApp
function openWhatsApp() {
    const phoneNumber = '5517991519103'; // Número do WhatsApp
    const message = 'Olá! Gostaria de saber mais sobre os Cookitos!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Adicionar botão flutuante do WhatsApp
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    whatsappBtn.addEventListener('click', openWhatsApp);
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
    });
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(whatsappBtn);
}

// Criar botão do WhatsApp quando a página carregar
document.addEventListener('DOMContentLoaded', createWhatsAppButton);

// Lógica do Formulário de Avaliação
(function() {
    const avaliacaoForm = document.getElementById('avaliacao-form');
    if (!avaliacaoForm) {
        return; // Se o formulário não existe, não faz nada.
    }

    const starsContainer = document.querySelector('.rating-stars');
    const ratingInput = document.getElementById('autor-rating');
    const allStars = Array.from(starsContainer.children);
    const testemunhosGrid = document.getElementById('testemunhos-grid');

    // --- Lógica para Interação das Estrelas ---
    const updateStarsVisual = (ratingValue) => {
        allStars.forEach((star, index) => {
            if (index < ratingValue) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    };

    allStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const newRating = index + 1;
            ratingInput.value = newRating;
            updateStarsVisual(newRating);
        });

        star.addEventListener('mouseover', () => {
            updateStarsVisual(index + 1);
        });
    });

    starsContainer.addEventListener('mouseleave', () => {
        const currentRating = parseInt(ratingInput.value) || 0;
        updateStarsVisual(currentRating);
    });

    // --- Lógica para Submissão do Formulário ---
    avaliacaoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('autor-nome').value.trim();
        const opiniao = document.getElementById('autor-opiniao').value.trim();
        const rating = parseInt(ratingInput.value, 10);

        if (!nome || !opiniao || rating === 0) {
            alert('Por favor, preencha todos os campos e selecione uma nota.');
            return;
        }

        const newTestemunho = document.createElement('div');
        newTestemunho.classList.add('testemunho-card');

        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            starsHTML += `<i class="${i < rating ? 'fas' : 'far'} fa-star"></i>`;
        }

        newTestemunho.innerHTML = `
            <div class="testemunho-stars">${starsHTML}</div>
            <p>"${opiniao}"</p>
            <div class="testemunho-author">
                <strong>${nome}</strong>
                <span>Novo Cliente</span>
            </div>
        `;

        testemunhosGrid.appendChild(newTestemunho);

        avaliacaoForm.reset();
        ratingInput.value = '0';
        updateStarsVisual(0);
    });
})();

