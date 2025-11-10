// Mapa de navegación del libro
const bookPages = {
    3: { prev: null, next: 4, title: "Índice - Parte 1" },
    4: { prev: 3, next: 5, title: "Índice - Parte 2" },
    5: { prev: 4, next: 6, title: "Índice - Parte 3" },
    6: { prev: 5, next: 7, title: "Prefacio" },
    7: { prev: 6, next: 8, title: "Explicación de símbolos" },
    8: { prev: 7, next: 9, title: "Mapa de Finlandia" },
    9: { prev: 8, next: 10, title: "Personajes del libro" },
    10: { prev: 9, next: 11, title: "Capítulo 1 - Inicio" },
    11: { prev: 10, next: 12, title: "Capítulo 1 - Diálogos" },
    12: { prev: 11, next: 13, title: "Capítulo 1 - Vocabulario" },
    13: { prev: 12, next: 14, title: "Capítulo 1 - Saludos" },
    14: { prev: 13, next: 15, title: "Capítulo 1 - Días y Alfabeto" },
    15: { prev: 14, next: 16, title: "Capítulo 1 - Números" },
    16: { prev: 15, next: 17, title: "Capítulo 1 - Gramática" },
    17: { prev: 16, next: 18, title: "Capítulo 1 - Armonía Vocálica" },
    18: { prev: 17, next: 19, title: "Capítulo 1 - Ejercicios 1-2" },
    19: { prev: 18, next: 20, title: "Capítulo 1 - Ejercicios 3-4" },
    20: { prev: 19, next: 21, title: "Capítulo 1 - Ejercicios 5-6" },
    21: { prev: 20, next: 28, title: "Capítulo 1 - Ejercicios 7" },
    28: { prev: 20, next: 56, title: "Capítulo 2" },
    56: { prev: 28, next: 86, title: "Capítulo 3" },
    86: { prev: 56, next: 114, title: "Capítulo 4" },
    114: { prev: 86, next: 146, title: "Capítulo 5" },
    146: { prev: 114, next: 184, title: "Capítulo 6" },
    184: { prev: 146, next: 220, title: "Capítulo 7" },
    220: { prev: 184, next: 254, title: "Capítulo 8" },
    254: { prev: 220, next: 290, title: "Capítulo 9" },
    290: { prev: 254, next: 310, title: "Apéndices" },
    310: { prev: 290, next: 326, title: "Mini gramática" },
    326: { prev: 310, next: 329, title: "Vocabulario" },
    329: { prev: 326, next: null, title: "Soluciones de ejercicios" }
};

// Obtener el número de página actual desde el nombre del archivo
function getCurrentPage() {
    const path = window.location.pathname;
    const match = path.match(/page-(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

// Crear campo de entrada para ir a página
function createPageInput() {
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'page-selector-container';

    const label = document.createElement('span');
    label.className = 'page-selector-label';
    label.textContent = 'Ir a pág:';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'page-input';
    input.min = '1';

    // Evento para navegar al presionar Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const pageNum = parseInt(this.value);
            if (pageNum && bookPages[pageNum]) {
                window.location.href = `page-${pageNum}.html`;
            } else {
                alert('Página no encontrada. Por favor ingresa un número de página válido.');
            }
        }
    });

    selectorContainer.appendChild(label);
    selectorContainer.appendChild(input);

    return selectorContainer;
}

// Crear botón de inicio (casita)
function createHomeButton() {
    const homeButton = document.createElement('a');
    homeButton.href = 'page-3.html';
    homeButton.className = 'home-button';
    homeButton.innerHTML = '🏠';
    homeButton.title = 'Ir al índice';
    return homeButton;
}

// Crear botones de navegación
function createNavigationButtons() {
    const currentPage = getCurrentPage();
    if (!currentPage || !bookPages[currentPage]) return;

    const pageInfo = bookPages[currentPage];
    const bookPage = document.querySelector('.book-page');

    if (!bookPage) return;

    // Agregar botón de inicio (casita) arriba a la izquierda
    const homeButton = createHomeButton();
    bookPage.insertBefore(homeButton, bookPage.firstChild);

    // Crear contenedor de botones
    const navContainer = document.createElement('div');
    navContainer.className = 'navigation-buttons';

    // Botón anterior
    if (pageInfo.prev) {
        const prevButton = document.createElement('a');
        prevButton.href = `page-${pageInfo.prev}.html`;
        prevButton.className = 'nav-button prev';
        prevButton.textContent = 'Anterior';
        navContainer.appendChild(prevButton);
    } else {
        const prevButton = document.createElement('button');
        prevButton.className = 'nav-button prev';
        prevButton.textContent = 'Anterior';
        prevButton.disabled = true;
        navContainer.appendChild(prevButton);
    }

    // Campo de entrada para ir a página (en el centro)
    const pageInput = createPageInput();
    navContainer.appendChild(pageInput);

    // Botón siguiente
    if (pageInfo.next) {
        const nextButton = document.createElement('a');
        nextButton.href = `page-${pageInfo.next}.html`;
        nextButton.className = 'nav-button next';
        nextButton.textContent = 'Siguiente';
        navContainer.appendChild(nextButton);
    } else {
        const nextButton = document.createElement('button');
        nextButton.className = 'nav-button next';
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = true;
        navContainer.appendChild(nextButton);
    }

    // Agregar los botones antes del final de book-page
    bookPage.appendChild(navContainer);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavigationButtons);
} else {
    createNavigationButtons();
}
