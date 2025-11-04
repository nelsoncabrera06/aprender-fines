// Selecciona todos los botones con la clase 'item'
let buttonsLeft = document.querySelectorAll('#column-left .item');
let buttonsRight = document.querySelectorAll('#column-right .item');
const statusDiv = document.getElementById('status');

// Selecciona todos los botones con la clase 'item'
const buttons = document.querySelectorAll('.item');
let par = true; // true es cuando no hay ningun boton clickeado o un par de botones fue clickeado
let pairLeft, pairRight, buttonLeft, buttonRight, button0, button1;
let matched = false;
const esperar = 1000;


// Crear las columnas y botones desde un archivo
document.addEventListener('DOMContentLoaded', function() {
    fetch('Palabras.txt')
        .then(response => response.text())
        .then(text => createColumns(text))
        .catch(error => console.error('Error al cargar el archivo:', error));
});

function createColumns(text) {
    const lines = text.split('\n');
    const leftColumn = document.getElementById('column-left');
    const rightColumn = document.getElementById('column-right');

    lines.forEach((line, index) => {
        const [english, spanish] = line.trim().split(' ');
        if (english && spanish) {
            const leftButton = document.createElement('button');
            leftButton.classList.add('item');
            leftButton.dataset.pair = index + 1;
            leftButton.textContent = english;

            const rightButton = document.createElement('button');
            rightButton.classList.add('item');
            rightButton.dataset.pair = index + 1;
            rightButton.textContent = spanish;

            leftColumn.appendChild(leftButton);
            rightColumn.appendChild(rightButton);
        }
    });
}
// FIN - Crear las columnas y botones desde un archivo



// Agrega un event listener a cada botón para cambiar el color cuando se hace clic
/*
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const parentColumn = button.closest('.column');

        //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna izquierda");
        console.log("Boton clickeado: " + button.textContent );

        if (!button.classList.contains('clicked')) {       
            button.classList.add('clicked');
            
            par = !par;
            
            
            if (par == true){ // el primero o se encontro un par
                button1 = {
                    textContent: button.textContent,
                    data_pair: button.getAttribute('data-pair'),
                    column: parentColumn.id
                }
            }else{
                button0 = {
                    textContent: button.textContent,
                    data_pair: button.getAttribute('data-pair'),
                    column: parentColumn.id
                }
            }
            
            if (parentColumn.id === 'column-left') {
                //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna izquierda");
                pairLeft = button.getAttribute('data-pair');
                buttonLeft = button;
            } else if (parentColumn.id === 'column-right') {
                //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna derecha");
                pairRight = button.getAttribute('data-pair');
                buttonRight = button; 
            }
            

        } else {
            button.classList.remove('clicked');
            //console.log("Boton desclickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - " + parentColumn.id);
            par = !par;

            // falta reiniciar todas las variables aca sino queda guardado lo anterior
            //console.log("Reiniciar variables");
            reiniciarVariables();
        }
        
        

        if (par == true &&  buttonLeft && buttonRight ) { // se clickeo un par y buttonLeft y Right existen (se clickearon en diferentes columnas)
            //console.log("Un par fue clickeado");
            buttonLeft.classList.remove('clicked');
            buttonRight.classList.remove('clicked');
            //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna derecha");
            console.log("button0: " + button0.textContent + " - data-pair: " + button0.data_pair + " - " + button0.column); 
            console.log("button1: " + button1.textContent + " - data-pair: " + button1.data_pair + " - " + button1.column); 


            if (pairLeft === pairRight) { // Par correcto
                console.log("Los pares SI coinciden");

                buttonLeft.classList.add('correct');
                buttonRight.classList.add('correct');
                matched = true;
                statusDiv.textContent = 'Correcto'; // Cambiar el texto a "Correcto"
                statusDiv.style.display = 'block'; // Mostrar mensaje "Correcto"

            } else { // Par incorrecto
                console.log("Los pares NO coinciden");

                buttonLeft.classList.add('incorrect');
                buttonRight.classList.add('incorrect');

                matched = false;
                statusDiv.textContent = 'Incorrecto'; // Cambiar el texto a "Incorrecto"
                statusDiv.style.display = 'block'; // Mostrar mensaje "Correcto"

            }

            if (matched) {
                // Eliminar la clase 'correct' después de un tiempo
                setTimeout(() => {
                    buttonsLeft.forEach(button => button.classList.remove('correct'));
                    buttonsRight.forEach(button => button.classList.remove('correct'));
                    
                    statusDiv.style.display = 'none'; // Ocultar mensaje "Correcto"
                }, esperar);
    
            } else {
                setTimeout(() => {
                    buttonsLeft.forEach(button => button.classList.remove('incorrect'));
                    buttonsRight.forEach(button => button.classList.remove('incorrect'));
    
                    
                    statusDiv.style.display = 'none'; // Ocultar mensaje "Incorrecto"
                }, esperar);
            }
            
            reiniciarVariables();

        }else if (par == true){
            reiniciarVariables();
        }


        
    });

});
*/

function reiniciarVariables() {
    //console.log("Reiniciar variables - funcion");
    
    buttons.forEach(button => button.classList.remove('clicked'));
    //buttonLeft = undefined;
    //buttonRight = undefined;
    
    button0.button.classList.remove('clicked');
    button1.button.classList.remove('clicked');


    //button0 = undefined;
    //button1 = undefined;
    
    return;
}

// NUEVO NUEVO

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.getElementById('tabla');

    // Utilizar event delegation para la columna izquierda
    botones.addEventListener('click', (event) => {
        if (event.target && event.target.matches('button.item')) {
            //console.log("Boton clickeado: " + event.target.textContent);

            let button = event.target;
            const parentColumn = button.closest('.column');
    
            //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna izquierda");
            //console.log("Boton clickeado: " + button.textContent );
    
            if (!button.classList.contains('clicked')) {       
                button.classList.add('clicked');
                
                par = !par;
                
                
                if (par == true){ // el primero o se encontro un par
                    button1 = {
                        textContent: button.textContent,
                        data_pair: button.getAttribute('data-pair'),
                        column: parentColumn.id,
                        button: button
                    }
                }else{
                    button0 = {
                        textContent: button.textContent,
                        data_pair: button.getAttribute('data-pair'),
                        column: parentColumn.id,
                        button: button
                    }
                }
                
                
                if (parentColumn.id === 'column-left') {
                    //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna izquierda");
                    pairLeft = button.getAttribute('data-pair');
                    buttonLeft = button;
                } else if (parentColumn.id === 'column-right') {
                    //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna derecha");
                    pairRight = button.getAttribute('data-pair');
                    buttonRight = button; 
                }
                
                
    
            } else {
                button.classList.remove('clicked');
                console.log("Boton desclickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - " + parentColumn.id);
                par = !par;

                //reiniciarVariables();

                // este no anda super perfecto!
            }
            
            
    
            if (par == true && (button0.column != button1.column)) { // se clickeo un par y se clickearon en diferentes columnas
                //console.log("Un par fue clickeado de diferentes columnas");
                buttonLeft.classList.remove('clicked');
                buttonRight.classList.remove('clicked');
                //console.log("Boton clickeado: " + button.textContent + " - data-pair: " + button.getAttribute('data-pair') + " - Columna derecha");
                console.log("button0: " + button0.textContent + " - data-pair: " + button0.data_pair + " - " + button0.column); 
                console.log("button1: " + button1.textContent + " - data-pair: " + button1.data_pair + " - " + button1.column); 
    
    
                if (pairLeft === pairRight) { // Par correcto
                    console.log("Los pares SI coinciden");
    
                    buttonLeft.classList.add('correct');
                    buttonRight.classList.add('correct');
                    matched = true;
                    statusDiv.textContent = 'Correcto'; // Cambiar el texto a "Correcto"
                    statusDiv.style.display = 'block'; // Mostrar mensaje "Correcto"
    
                } else { // Par incorrecto
                    console.log("Los pares NO coinciden");
    
                    buttonLeft.classList.add('incorrect');
                    buttonRight.classList.add('incorrect');
    
                    matched = false;
                    statusDiv.textContent = 'Incorrecto'; // Cambiar el texto a "Incorrecto"
                    statusDiv.style.display = 'block'; // Mostrar mensaje "Correcto"
    
                }
    
                if (matched) {
                    // Eliminar la clase 'correct' después de un tiempo
                    setTimeout(() => {
                        button0.button.classList.remove('correct');
                        button1.button.classList.remove('correct');
                        
                        statusDiv.style.display = 'none'; // Ocultar mensaje "Correcto"
                    }, esperar);
        
                } else {
                    setTimeout(() => {
                        button0.button.classList.remove('incorrect');
                        button1.button.classList.remove('incorrect');
                        
                        statusDiv.style.display = 'none'; // Ocultar mensaje "Incorrecto"
                    }, esperar);
                }
                
                reiniciarVariables();
    
            }else if (par == true && (button0.column == button1.column)){
                console.log("Un par fue clickeado en la misma columna");
                console.log("button0: " + button0.textContent + " - data-pair: " + button0.data_pair + " - " + button0.column); 
                console.log("button1: " + button1.textContent + " - data-pair: " + button1.data_pair + " - " + button1.column); 
                reiniciarVariables();
            }
    
        }
    });
    
});

