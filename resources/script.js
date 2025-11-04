// Agregar interactividad a los capítulos
document.querySelectorAll('.chapter-title').forEach(chapter => {
    chapter.addEventListener('click', function() {
        const subsection = this.nextElementSibling;
        if (subsection && subsection.classList.contains('subsection')) {
            subsection.style.display = subsection.style.display === 'none' ? 'grid' : 'none';
        }
    });
});

// Agregar interactividad a los tópicos (aquí puedes agregar enlaces a las páginas)
document.querySelectorAll('.topic-list li, .initial-words li').forEach(topic => {
    topic.addEventListener('click', function() {
        alert('Próximamente: ' + this.textContent);
    });
});
