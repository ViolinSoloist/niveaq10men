document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Acessibilidade: Tamanho da Fonte ---
    const htmlElement = document.documentElement;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    
    // Tamanho base padrão da fonte em pixels
    let fontSize = 16; 
    
    btnAumentar.addEventListener('click', () => {
        if (fontSize < 24) { // Limite máximo
            fontSize += 2;
            htmlElement.style.fontSize = fontSize + 'px';
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (fontSize > 12) { // Limite mínimo
            fontSize -= 2;
            htmlElement.style.fontSize = fontSize + 'px';
        }
    });

    // --- Lógica de Acessibilidade: Alto Contraste ---
    const btnContraste = document.getElementById('btn-contraste');
    const body = document.body;

    btnContraste.addEventListener('click', () => {
        // Alterna a classe 'alto-contraste' no body
        body.classList.toggle('alto-contraste');
        
        // Altera o estilo do botão para mostrar que está ativo
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
    btnOuvir.addEventListener('click', () => {
        alert('Simulação: A leitura em voz alta da seção seria iniciada aqui.');
    });

});