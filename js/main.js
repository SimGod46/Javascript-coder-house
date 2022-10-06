// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

// @ts-check
//Simulador de becas universitarias
function ponderacion(resultado,puntajes){
    let total = 0;
    let datos_ponderacion = [resultado.NEM,resultado.Ranking,resultado.Matematica,resultado.Lenguaje,resultado.Ciencias]; // [nem,ranking,mates,lengua,ciencia] * Deben estar en el mismo orden.
    for(let i = 0; i < datos_ponderacion.length ;i++){
        total += datos_ponderacion[i] * puntajes[i] / 100;
    }
    return total;
}

function beca(resultado,puntaje){
    let indice_beca = 0
    let niveles_beca = [100,90,80]
    for(let i = 1; i<6; i=i+2){
        console.log(puntaje,1000 * (1- (resultado.Matematica*i/1000)));
        if(puntaje>= 1000 * (1- (resultado.Matematica*i/1000))){ // 1000 puntaje maximo * 1-(pond.mat*nivel_beca)
            return niveles_beca[indice_beca];
        } else {
            indice_beca++
        }
    }
    return 0;
}

/*Output condicional en base a los puntajes ingresados */
function mostrarResultado(carrera,lengua,mates,ciencia,nem,ranking){
    let resultado = datos_carreras.find((el)=> el.Codigo === carrera.toString());
    let ponderado = ponderacion(resultado,[nem,ranking,mates,lengua,ciencia]);
    let becaSimulada = beca(resultado,ponderado);
    resultadoDOM.innerHTML = `<p>Su puntaje ponderado es de: ${ponderado}</p><p>Su beca simulada cubre el ${becaSimulada}% de su carrera de <strong>${resultado.Carrera}</strong></p>` ;
    
    /*Operador optimizado*/
    becaSimulada> 0 ? felicitacionDOM.innerHTML = "<h2>FELICITACIONES</h2><p>Tu puntaje simulado te hace elegible  para una beca, para más información visita la secciones de \"Financiamiento\"</p>" : felicitacionDOM.innerHTML = "";
}

/* Cuadro que verifica la identidad del usuario, solo existe el usuario admin con contraseña 12345 */
function cuadroLogin(){
    Swal.fire({
        title: 'Inicio de sesión',
        html:
        '<input id="usuario"    class="swal2-input" type="text" placeholder="Usuario">' +
        '<input id="contrasena" class="swal2-input" type="password" placeholder="Contraseña">',
        focusConfirm: false,
        preConfirm: () => {
            const formValues =  [document.getElementById('usuario').value, document.getElementById('contrasena').value];
              
            if(formValues[0] == "admin" && formValues[1] == "12345"){
                Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                });
                sessionStorage.setItem("usuario",formValues[0]);
                inicioSesion.innerHTML = `<a href="#">${sessionStorage.getItem("usuario")}</a>`;
            } else{
                Swal.fire({
                title: 'Error',
                text: 'credenciales no validas',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                });
            }
        }
    });
}

/*Datos estandar para el calculo del puntaje, son constantes */
let seleccionCarrera = document.getElementById("OpcionesCarreras");

let datos_carreras;
fetch("./datos_carreras.json").then((response)=>response.json()).then((data)=>
{datos_carreras=data;
for(let i = 0; i < datos_carreras.length; i++) {
    let obj = datos_carreras[i];
    let elementoCarrera = document.createElement("option");
    elementoCarrera.value = obj.Codigo;
    elementoCarrera.innerHTML = obj.Carrera;
    seleccionCarrera.appendChild(elementoCarrera); //Creación de la carrera para ser seleccionada en el simulador
    }});

/* Utilización del session storage para almacenar examnes y/o ensayos anteriores realizados por la persona*/
let inicioSesion = document.getElementById("loginBtn");
inicioSesion.onclick = cuadroLogin;


/* Simulación del puntaje ponderado en base al formulario */
let resultadoDOM = document.getElementById("resultadoSimulacion");
let felicitacionDOM = document.querySelector("main section div #felicitacion");
let formularioPonderacion = document.getElementById("formSimulation");
formularioPonderacion.addEventListener("submit",(e)=>{e.preventDefault();
                                                      let formulario = e.target;
                                                      mostrarResultado(
                                                        /* Agregar una desestructurción o un spread (primer intento no funcionó ya que no se recupero el .value)*/
                                                        parseInt(formulario.children[0].value),
                                                        parseInt(formulario.children[1].value),
                                                        parseInt(formulario.children[2].value),
                                                        parseInt(formulario.children[3].value),
                                                        parseInt(formulario.children[4].value),
                                                        parseInt(formulario.children[5].value)); 
                                                    });