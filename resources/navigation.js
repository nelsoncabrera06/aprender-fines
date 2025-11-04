// Mapa de navegación del libro
const bookPages = {
    3: { prev: null, next: 4, title: "Índice - Parte 1" },
    4: { prev: 3, next: 5, title: "Índice - Parte 2" },
    5: { prev: 4, next: 6, title: "Índice - Parte 3" },
    6: { prev: 5, next: 7, title: "Prefacio" },
    7: { prev: 6, next: 8, title: "Explicación de símbolos" },
    8: { prev: 7, next: 9, title: "Mapa de Finlandia" },
    9: { prev: 8, next: 10, title: "Personajes del libro" },
    10: { prev: 9, next: 28, title: "Capítulo 1" },
    28: { prev: 10, next: 56, title: "Capítulo 2" },
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

// Crear botones de navegación
function createNavigationButtons() {
    const currentPage = getCurrentPage();
    if (!currentPage || !bookPages[currentPage]) return;

    const pageInfo = bookPages[currentPage];
    const bookPage = document.querySelector('.book-page');

    if (!bookPage) return;

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
