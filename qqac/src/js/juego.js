var Excel = require('exceljs');
const Swal = require('sweetalert2');

var preguntas, numpreg = [];
var pSegundos, segundos, cincuentaCincuenta, pista, masSegundos, opca, opcb, opcc, opcd, pregunta, 
respuesta, pistaPregunta, iterador, btnOk, btnError, btnSalir, alertaOk, alertaError, intervalo,
usa50, usapista, usatiempo, correctas;

function comenzar(){
    /* -------------------------------- opciones -------------------------------- */
    opca = document.getElementById("a");
    opcb = document.getElementById("b");
    opcc = document.getElementById("c");
    opcd = document.getElementById("d");
    pregunta = document.getElementById("pregunta");
    correctas=0;

    habilitarOpciones();

    opca.addEventListener("click",verificarRespuesta,false);        
    opcb.addEventListener("click",verificarRespuesta,false);        
    opcc.addEventListener("click",verificarRespuesta,false);        
    opcd.addEventListener("click",verificarRespuesta,false);    

    /* --------------------------------- ayudas --------------------------------- */
    cincuentaCincuenta = document.getElementById("cincuentaCincuenta");
    pista = document.getElementById("pista");
    masSegundos = document.getElementById("masSegundos");

    usa50=0;
    usapista=0;
    usatiempo=0;

    habilitarAyudas();

    cincuentaCincuenta.addEventListener("click",cincuenta,false);
    pista.addEventListener("click",obtenerPista,false);
    masSegundos.addEventListener("click",segundosMas,false);

    /* --------------------------------- botones -------------------------------- */
    btnOk = document.getElementById("btnOk");
    btnError = document.getElementById("btnError");
    btnSalir = document.getElementById("btnSalir");

    esconderBotones();

    btnOk.addEventListener("click",siguiente,false);
    btnError.addEventListener("click",reiniciar,false);
    btnSalir.addEventListener("click",salir,false);

    /* --------------------------------- alertas -------------------------------- */
    alertaOk = document.getElementById("alertaOk");
    alertaError = document.getElementById("alertaError");
    
    esconderAlertas();

    /* ---------------------------------- carga --------------------------------- */
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';

    /* --------------------------- llamada a funciones -------------------------- */
    datosExcel();  

    /* ------------------------------- cronometro ------------------------------- */
    pSegundos = document.getElementById("segundos");
    iniciarCronometro();
}

/* -------------------------------------------------------------------------- */
/*                                 cronometro                                 */
/* -------------------------------------------------------------------------- */

function cuentaRegresiva(){
    //console.log(segundos);
    if(alertaOk.style.visibility == "hidden" && alertaError.style.visibility == "hidden"){
        if (segundos > 0) {
            segundos=segundos-1;        
        }
        else if (segundos==0) {
             Swal.fire(
                 '!El juego ha terminado!',
                 'Se le ha terminado el tiempo ha contestado correctamente: ' + correctas + ' preguntas',
                 'error'
            ).then((result) => {
                if (result.value) {
                    location.reload();
                }
            }) 
            clearInterval(intervalo);     
        }
    }
    pSegundos.textContent = segundos;
}

function iniciarCronometro(){
    pSegundos.textContent = 59;
    segundos = 59;
    intervalo = setInterval(function(){
        cuentaRegresiva();
    },1000); 
}

/* -------------------------------------------------------------------------- */
/*                               funciones excel                              */
/* -------------------------------------------------------------------------- */
function datosExcel(){  
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('src/files/preguntas.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
        preguntas = [];
        for (let i = 2; i <=27; i++) {
            preguntas[i-2] = worksheet.getRow(i); 
        }

        var x = Math.floor(Math.random() * preguntas.length)-1;
        numpreg.push(x);
        cargarPreguntas(x); // carga la primer pregunta
        //return console.log("carga de preguntas exitosa");
    }).catch(error => {
        console.error('Algo salio mal al leer excel', error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             funciones preguntas                            */
/* -------------------------------------------------------------------------- */

function cargarPreguntas(i){    
    iterador = i; //iterador
    //console.log(preguntas[i].getCell(1).value);         
    opca.innerHTML = preguntas[iterador].getCell(1).value;
    opcb.innerHTML = preguntas[iterador].getCell(2).value;
    opcc.innerHTML = preguntas[iterador].getCell(3).value;
    opcd.innerHTML = preguntas[iterador].getCell(4).value;
    pregunta.innerHTML = preguntas[iterador].getCell(5).value;
    respuesta = preguntas[iterador].getCell(6).value; 
    pistaPregunta = preguntas[iterador].getCell(7).value; 
    
}

function verificarRespuesta(respuestaSeleccionada){
    //console.log(r.target.id);
    Swal.fire({
        title: 'Ultima palabra?',
        text: "No puede revetir si te equivocas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Ultima palabra!',
        cancelButtonText: 'Escoger otra opcion'
    }).then((result) => {
        if (result.value) {
             if(respuestaSeleccionada.target.id == respuesta){
                // console.log("respuesta correcta");
                alertaOk.style.visibility = 'visible';
                alertaOk.style.opacity = '1';
                btnOk.style.visibility = 'visible';
                btnOk.style.opacity = '1';
                //iterador++;
                inhabilitarOpciones();
            }else{
                // console.log("respuesta incorrecta");
                alertaError.style.visibility = 'visible';
                alertaError.style.opacity = '1';
                btnError.style.visibility = 'visible';
                btnError.style.opacity = '1';
                inhabilitarOpciones();
            }
        }
    })   
}

function habilitarOpciones(){
    opca.style.pointerEvents = "auto";
    opcb.style.pointerEvents = "auto";
    opcc.style.pointerEvents = "auto";
    opcd.style.pointerEvents = "auto";
}

function inhabilitarOpciones(){
    opca.style.pointerEvents = "none";
    opcb.style.pointerEvents = "none";
    opcc.style.pointerEvents = "none";
    opcd.style.pointerEvents = "none";
}    

/* -------------------------------------------------------------------------- */
/*                                   ayudas                                   */
/* -------------------------------------------------------------------------- */
function cincuenta(){
    Swal.fire({
        title: 'Desea usar la ayuda 50/50?',
        text: "Estas segur@, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            quitarPreguntas();
            cincuentaCincuenta.style.pointerEvents = "none";
            cincuentaCincuenta.style.backgroundColor = "red";
            usa50 = 1;
        }
    }) 
}

function obtenerPista(){
    Swal.fire({
        title: 'Desea usar la ayuda y obtener una pista?',
        text: "Estas segur@, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'La pista es la siguiente:',
                pistaPregunta,
                'info'
            )
            pista.style.pointerEvents = "none";
            pista.style.backgroundColor = "red";
            usapista=1;
        }
    }) 
}

function segundosMas(){
    Swal.fire({
        title: 'Desea usar la ayuda y obtener 30 segundos mas?',
        text: "Estas segur@, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            masSegundos.style.pointerEvents = "none";
            masSegundos.style.backgroundColor = "red";
            segundos+=30;
            usatiempo=1;
        }
    }) 
}

function habilitarAyudas(){
    if(usa50==0){
        cincuentaCincuenta.style.pointerEvents = "auto";
        cincuentaCincuenta.style.backgroundColor = "blue";
    }
    if(usapista==0){
        pista.style.pointerEvents = "auto";
        pista.style.backgroundColor = "blue";
    }
    if(usatiempo==0){
        masSegundos.style.pointerEvents = "auto";
        masSegundos.style.backgroundColor = "blue";
    }
}

function quitarPreguntas() {
    // console.log(respuesta);
    var res;
    switch (respuesta) {
        case 'a':
            res = 1;
            break;
        case 'b':
            res = 2;
            break;
        case 'c':
            res = 3;
            break;
        case 'd':
            res = 4;
            break;
        default:
            console.log("error al agregar numero a la opcion");
            break;
    }

    var aleatorio;
    var aleatorio2;
    do{
        aleatorio = Math.floor(Math.random() * (5 - 1)) + 1;
        aleatorio2 = Math.floor(Math.random() * (5 - 1)) + 1;
    }while(aleatorio == res || aleatorio2 == res || aleatorio == aleatorio2);

    //console.log(res,aleatorio,aleatorio2);
    switch (aleatorio) {
        case 1:
            opca.innerHTML = "";
            opca.style.pointerEvents = "none";
            break;
        case 2:
            opcb.innerHTML = "";
            opcb.style.pointerEvents = "none";
            break;
        case 3:
            opcc.innerHTML = "";
            opcc.style.pointerEvents = "none";
            break;
        case 4:
            opcd.innerHTML = "";
            opcd.style.pointerEvents = "none";  
            break;
        default:
            console.log("error al devolver de numero a letra");
            break;
    }
    switch (aleatorio2) {
        case 1:
            opca.innerHTML = "";
            opca.style.pointerEvents = "none";
            break;
        case 2:
            opcb.innerHTML = "";
            opcb.style.pointerEvents = "none";
            break;
        case 3:
            opcc.innerHTML = "";
            opcc.style.pointerEvents = "none";
            break;
        case 4:
            opcd.innerHTML = "";
            opcd.style.pointerEvents = "none";  
            break;
        default:
            console.log("error al devolver de numero a letra");
            break;
    }   
}

/* -------------------------------------------------------------------------- */
/*                                   botones                                  */
/* -------------------------------------------------------------------------- */
function esconderBotones(){
    btnOk.style.visibility = 'hidden';
    btnError.style.visibility = 'hidden';

    btnOk.style.opacity = '0';
    btnError.style.opacity = '0';
}

function siguiente(){
    var existe=false;
    var conteo=0;

    while (!existe){
        var x = Math.floor(Math.random() * preguntas.length)-1;   
        console.log('x:' + x);     
        for (let i = 0; i < numpreg.length; i++) {
            console.log('numpreg'+i+':' +numpreg[i]);     
            if(x!=numpreg[i]){    
                conteo++;
                console.log('conteo:' + conteo); 
            }        
        }        
        console.log('numpreg.length:' + numpreg.length); 
        if(conteo==numpreg.length){
            numpreg.push(x);
            existe=true;
        }
        else{
            existe=false;
        }
    }    
    cargarPreguntas(x);
    
    alertaOk = document.getElementById("alertaOk");
    alertaOk.style.visibility = 'hidden';
    alertaOk.style.opacity = '0';    
    if(correctas == 10){
        Swal.fire(
            '!FELICIDADES HA GANADO !',
            'A logrado contestar todas las preguntas satisfactoriamente',
            'sucess'
        )
    }else{
        habilitarAyudas();
        habilitarOpciones();
        esconderAlertas();
        esconderBotones();
        clearInterval(intervalo);     
        iniciarCronometro();
        correctas+=1;
    }
}

function reiniciar(){
    Swal.fire({
        title: 'Desea Reinciar del juego?',
        text: "Estas seguro perderas todo el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            location.reload();
        }
    }) 
}

function salir(){
    Swal.fire({
        title: 'Desea salir del juego?',
        text: "Estas seguro perderas todo el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.close();
        }
    })     
}

/* -------------------------------------------------------------------------- */
/*                                   alertas                                  */
/* -------------------------------------------------------------------------- */
function esconderAlertas(){
    alertaOk.style.visibility = 'hidden';
    alertaError.style.visibility = 'hidden';

    alertaOk.style.opacity = '0';
    alertaError.style.opacity = '0';
}

window.addEventListener("load", comenzar, false);