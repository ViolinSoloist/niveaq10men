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

    // Pqp oq eu to fazendo da minha vida gastando tempo com algo que ninguém vai saber
    const inputCep = document.getElementById('input-cep');
    const btnBuscarCep = document.getElementById('btn-buscar-cep');
    const listaLojas = document.getElementById('lista-lojas');

    if (btnBuscarCep && inputCep && listaLojas) {
        btnBuscarCep.addEventListener('click', async () => {
            // Limpa o input, mantendo apenas números
            const cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {alert('Digite um CEP real de 8 dígitos (sem traço).'); return;}

            // Animação de "loading" no botão (é quase instantâneo, talvez não seja necessário, mas é sempre uma boa prática)
            const textoOriginal = btnBuscarCep.innerText;
            btnBuscarCep.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
            btnBuscarCep.disabled = true;

            try {
                // Faz a requisição GET para a API pública
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert('CEP não encontrado na base dos Correios.');
                } else {
                    // Monta URL do Google Maps com o bairro e a rua reais retornados pela API
                    const queryMapa = encodeURIComponent(`farmácia perto de ${data.logradouro}, ${data.bairro}, ${data.localidade}`);

                    // Sobrescreve o HTML antigo com os dados reais injetados
                    listaLojas.innerHTML = `
                        <!-- Injeção dynamic de cardos -->
                        <div class="bg-white border-2 border-green-500 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg transition card-produto relative overflow-hidden">
                            <div class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Integração API ViaCEP</div>
                            <div>
                                <h4 class="font-bold text-xl text-niveaBlue title-color">Drogaria São Paulo — ${data.bairro}</h4>
                                <p class="text-gray-600 font-medium mt-1">Endereço identificado:</p>
                                <p class="text-gray-500 desc-color">${data.logradouro}, ${data.localidade} - ${data.uf}</p>
                            </div>
                            <div class="text-left md:text-right mt-4 md:mt-0 w-full md:w-auto">
                                <p class="font-bold text-green-600 text-lg mb-1"><i class="fas fa-check-circle"></i> Região Encontrada</p>
                                <a href="https://www.google.com/maps/search/${queryMapa}" target="_blank" class="inline-block bg-niveaLight text-white px-4 py-2 rounded font-bold text-sm hover:bg-niveaBlue transition shadow-sm">
                                    Ver farmácias no Maps
                                </a>
                            </div>
                        </div>

                        <!-- Card Genérico pra ocupar espaço (manter a mesma vibe de antes, de ter alguns resultados) -->
                        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition card-produto opacity-80">
                            <div>
                                <h4 class="font-bold text-xl text-niveaBlue title-color">Droga Raia — Região de ${data.localidade}</h4>
                                <p class="text-gray-500 desc-color mt-1">Busque filiais próximas ao CEP ${data.cep}</p>
                            </div>
                        </div>
                    `;
                }
            }
            catch (error) {alert('Erro ao integrar a API pública do ViaCEP.');}
            finally {btnBuscarCep.innerText = textoOriginal;  btnBuscarCep.disabled = false;}
            // Devolve o botão ao estado normal
        });
    }
});