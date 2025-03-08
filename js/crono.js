window.addEventListener("load", function () {
    var b = document.getElementById('texto');
    setInterval(function () {
        b.style.display = (b.style.display == 'none' ? '' : 'none');
    }, 200);
}, false);


seg = 0;
min = 0;

contadorSegundos = 1;
contador_segEJ = 0;
contador_rondas = 0;
estado = 'serie';




//tiempo = 3;
//descanso = 5;

//ejercicios = 1;

//rondas = 1;


let serieAudio = new Audio('audio/serie.ogg');
let descansoAudio = new Audio('audio/descanso.mp3');
let finAudio = new Audio('audio/fin.mp3');
let comenzamosAudio = new Audio('audio/comenzamos.mp3');



function startPause() {



    if (btnStart.value == "PLAY") {

        tiempo = document.getElementById("varTiempo").value;
        descanso = document.getElementById("varDescanso").value;
        ejercicios = document.getElementById("varEjercicios").value;
        rondas = document.getElementById("varRondas").value;
        minutos.innerHTML = '00';
        segundos.innerHTML = '00';
        document.getElementById("btnStart").value = "PAUSE";

        start();

    } else {

        document.getElementById("btnStart").value = "PLAY";
        clearInterval(intervaloID01);

    }

}



function reset() {

    document.getElementById("btnStart").value = "PLAY";
    clearInterval(intervaloID01);
    seg = 0;
    min = 0;
    contadorSegundos = 1;
    contador_segEJ = 0;
    contador_rondas = 0;
    estado = 'serie';

    segundos.innerHTML = '--';
    minutos.innerHTML = '--';
    texto.innerHTML = '' //texto serie
}






function start() {



    intervaloID01 = setInterval(function () {

        if (contador_rondas < rondas) {

            if ((contador_segEJ) < ejercicios) {


                if (estado == 'serie') {
                    document.getElementById("texto").classList.add('text-secondary');

                    serieAudio.play(); // Audio comienza la serie

                    texto.innerHTML = '¡Serie' + ' ' + (contador_rondas + 1) + '!' //texto serie



                    if (contadorSegundos <= tiempo) {

                        contadorSegundos++;

                        if (seg < 60) {
                            if (seg < 10) { segundos.innerHTML = '0' + seg++; } else { segundos.innerHTML = seg++; }

                        } else {
                            seg = 0;
                            segundos.innerHTML = '0' + seg++;
                            min++;
                            if (min < 10) { minutos.innerHTML = '0' + min; } else { minutos.innerHTML = min; }

                        }


                    } else {
                        estado = 'descanso';
                        descansoAudio.play(); // Audio comienza el descanso
                        texto.innerHTML = '' //texto serie
                        contadorSegundos = 1;
                        min = 0;
                        seg = 0;
                        minutos.innerHTML = '0' + min;;
                        segundos.innerHTML = '0' + seg++;;
                        tiempoSerie = tiempo;
                        tiempo = descanso;

                    }



                } else if (estado == 'descanso') {



                    if (contadorSegundos <= tiempo) {

                        contadorSegundos++;

                        if (seg < 60) {
                            if (seg < 10) { segundos.innerHTML = '0' + seg++; } else { segundos.innerHTML = seg++; }

                        } else {

                            seg = 0;
                            segundos.innerHTML = '0' + seg++;
                            min++;
                            console.log(min);
                            if (min < 10) { minutos.innerHTML = '0' + min; } else { minutos.innerHTML = min; }
                        }


                    } else {
                        estado = 'serie';
                        contadorSegundos = 1;
                        seg = 0;
                        min = 0;
                        segundos.innerHTML = '0' + seg++;
                        minutos.innerHTML = '0' + min;
                        tiempo = tiempoSerie;
                        contador_segEJ++; //cuenta 1 ejercicio cada vez que pasa el ciclo por aquí



                    }


                }


            } else {

                contador_rondas++;
                contador_segEJ = 0;
                console.log(contador_rondas);


            }


        } else {
            finAudio.play(); // Audio comienza la serie
            document.querySelector(".modal").style.display = "block"; //ventana modal en js
            document.querySelector(".modal").classList.add("show"); //ventana modal en js

            reset();

        }


    }, 1000);
}

