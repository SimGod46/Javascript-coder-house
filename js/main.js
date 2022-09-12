// @ts-check
//Simulador de becas universitarias
function ponderacion(resultado,puntajes){
    let total = 0
    for(let i = 0; i < resultado.ponderacion.length ;i++){
        total += resultado.ponderacion[i] * puntajes[i]
    }
    return total
};

function beca(resultado,puntaje){
    for(let i = 0; i<resultado.beca_puntaje.length; i++){
        if(puntaje>=resultado.beca_puntaje[i]){
            return resultado.beca_porcentaje[i];
        }
    }
    return 0;
};

function mostrarResultado(carrera,lengua,mates,ciencia,nem,ranking){
    let resultado = datos_carreras.find((el)=> el.carrera_id === carrera);
    let ponderado = ponderacion(resultado,[nem,ranking,mates,lengua,ciencia]);
    let beca_simulada = beca(resultado,ponderado);
    resultadoDOM.innerHTML = `<p>Su puntaje ponderado es de: ${ponderado}</p><p>Su beca simulada cubre el ${beca_simulada}% de su carrera de <strong>${resultado.carrera}</strong></p>` ;
    if(beca_simulada> 0){
        felicitacionDOM.innerHTML = "<h2>FELICITACIONES</h2><p>Tu puntaje simulado te hace elegible  para una beca, para más información visita la secciones de \"Financiamiento\"</p>";
    } else {
        felicitacionDOM.innerHTML = "";
    };
};

let datos_carreras =[
    {carrera_id:1, carrera: "Medicina"  , ponderacion: [.2, .15, .35, .2,  .1 ], beca_puntaje:[900, 800, 650], beca_porcentaje:[100, 95, 80]},
    {carrera_id:2, carrera: "Derecho"   , ponderacion: [.2, .2,  .1,  .25, .25], beca_puntaje:[800, 750, 650], beca_porcentaje:[90,  80, 70]},
    {carrera_id:3, carrera: "Ingeniería", ponderacion: [.1, .25, .2,  .1,  .2 ], beca_puntaje:[750, 700, 650], beca_porcentaje:[90,  85, 75]}
];
let resultadoDOM = document.getElementById("resultadoSimulacion");
let felicitacionDOM = document.querySelector("main section div #felicitacion");
let formularioPonderacion = document.getElementById("formSimulation");
formularioPonderacion.addEventListener("submit",(e)=>{e.preventDefault();
                                                      let formulario = e.target;
                                                      mostrarResultado(
                                                        parseInt(formulario.children[0].value),
                                                        parseInt(formulario.children[1].value),
                                                        parseInt(formulario.children[2].value),
                                                        parseInt(formulario.children[3].value),
                                                        parseInt(formulario.children[4].value),
                                                        parseInt(formulario.children[5].value));
                                                    });