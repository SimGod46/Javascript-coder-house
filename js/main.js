//Simulador de becas universitarias
function ponderacion(NEM, Ranking, matematicas, lenguaje, ciencias){
    let pond_nem = resultado.ponderacion[0];
    let pond_ran = resultado.ponderacion[1];
    let pond_mat = resultado.ponderacion[2];
    let pond_len = resultado.ponderacion[3];
    let pond_ccs = resultado.ponderacion[4];
    return NEM*pond_nem+ Ranking*pond_ran+ matematicas*pond_mat+ lenguaje*pond_len+ ciencias*pond_ccs;
};

function beca(puntaje){
    for(let i = 0; i<resultado.beca_puntaje.length; i++){
        if(puntaje>=resultado.beca_puntaje[i]){
            return resultado.beca_porcentaje[i];
        }
    }
    return 0;
};

let datos_carreras =[
    {carrera_id:1, carrera: "Medicina"  , ponderacion: [.2, .15, .35, .2,  .1 ], beca_puntaje:[900, 800, 650], beca_porcentaje:[100, 95, 80]},
    {carrera_id:2, carrera: "Derecho"   , ponderacion: [.2, .2,  .1,  .25, .25], beca_puntaje:[800, 750, 650], beca_porcentaje:[90,  80, 70]},
    {carrera_id:3, carrera: "Ingeniería", ponderacion: [.1, .25, .2,  .1,  .2 ], beca_puntaje:[750, 700, 650], beca_porcentaje:[90,  85, 75]}
];

let carrera = parseInt(prompt("Indique la carrera que desea postular:\n1.-Medicina\n2.-Derecho\n3.-Ingeniería"));

let nem     = parseInt(prompt("Indique su puntaje por notas de enseña media:"));
let ranking = parseInt(prompt("Indique su puntaje por ranking de enseña media:"));
let mates   = parseInt(prompt("Indique su puntaje por prueba de matematicas:"));
let lengua  = parseInt(prompt("Indique su puntaje por prueba de lenguaje:"));
let ciencia = parseInt(prompt("Indique su puntaje por prueba de ciencias (naturales o sociales):"));

const resultado = datos_carreras.find((el)=> el.carrera_id === carrera);

let ponderado = ponderacion(nem,ranking,mates,lengua,ciencia);
let beca_simulada = beca(ponderado);
console.log("Su puntaje ponderado es de: "+ponderado);
console.log("Su beca simulada cubre el "+beca_simulada+"% de su carrera de "+resultado.carrera);