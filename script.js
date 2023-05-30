const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio(`notas/a.wav`); // por defecto, audio src es "a" tune

const playTune = (key) => {
    audio.src = `notas/${key}.wav`; // paso de audio src en función de la tecla pulsada
    audio.play(); // reproducción de audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // hacer clic elemento clave
    clickedKey.classList.add("active"); // añadir clase activa al elemento clave pulsado
    setTimeout(() => { // eliminar la clase activa después de 150 ms del elemento clave pulsado
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // añadir el valor de la clave de datos a la matriz allKeys
    // llamar a la función playTune pasando el valor de la clave de datos como argumento
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // pasar el valor del deslizador de rango como volumen de audio
}

const showHideKeys = () => {
    // ocultar la clase de cada tecla al hacer clic en la casilla de verificación
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}
    
const pressedKey = (e) => {
    // si la tecla pulsada está en la matriz allKeys, sólo se llama a la función playTune
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);