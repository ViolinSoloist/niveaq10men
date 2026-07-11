document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO CARROSSEL ---
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
    let slideInterval;

    function updateCarousel(index) {
        // desliza a trilha multiplicando o índice por 100% (largura da imagem)
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // eemove a classe 'active' de todas as bolinhas e põe na atual
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % totalSlides;
        updateCarousel(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(prevIndex);
    }

    // Roda a cada 3.5s
    function startAutoPlay() {slideInterval = setInterval(nextSlide, 3500);}

    function resetAutoPlay() {clearInterval(slideInterval); startAutoPlay();}

    // clicar nas bolinhas para escolher a foto
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCarousel(index);
            resetAutoPlay(); // zera o contador se a pessoa mexer
        });
    });

    // Eventos de Arrastar (Swipe) para celulares
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval); // pausa o carrossel enquanto arrasta
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay(); // retoma quando solta
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // mínimo de pixels para considerar como arrasto
        if (touchEndX < touchStartX - threshold) {
            nextSlide(); // esquerda <-- direita
        }
        if (touchEndX > touchStartX + threshold) {
            prevSlide(); // esquerda --> direita
        }
    }

    startAutoPlay(); // pontapé inicial da troca de imagens

    // --- LÓGICA DE ACESSIBILIDADE: Tamanho da Fonte ---
    const htmlElement = document.documentElement;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    
    let fontSize = 14; htmlElement.style.fontSize = fontSize + 'px';
    
    btnAumentar.addEventListener('click', () => {
        if (fontSize < 22) {
            fontSize += 2;
            htmlElement.style.fontSize = fontSize + 'px';
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (fontSize > 10) {
            fontSize -= 2;
            htmlElement.style.fontSize = fontSize + 'px';
        }
    });

    // --- LÓGICA DE ACESSIBILIDADE: Alto Contraste ---
    const btnContraste = document.getElementById('btn-contraste');
    const body = document.body;

    btnContraste.addEventListener('click', () => {
        body.classList.toggle('alto-contraste');
        
        if (body.classList.contains('alto-contraste')) {
            btnContraste.classList.replace('bg-gray-800', 'bg-yellow-400');
            btnContraste.classList.replace('text-white', 'text-black');
        } else {
            btnContraste.classList.replace('bg-yellow-400', 'bg-gray-800');
            btnContraste.classList.replace('text-black', 'text-white');
        }
    });


    // --- Simulação do botão de Ouvir Seção ---
    const btnOuvir = document.getElementById('btn-ouvir');
    if(btnOuvir) {
        btnOuvir.addEventListener('click', () => {
            alert('Simulação: A leitura em voz alta da seção seria iniciada aqui.');
        });
    }

});