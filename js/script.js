// FUNCTIONS
function getRandomNumber(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1) + min)
    return random
}

function validNumber(num) {
    const number = parseInt(num, 10)
    return !isNaN(number) && number > 0 && number <= 90
}



// DOM ELEMENTS
const countdownDom = document.getElementById("countdown")
const num1Dom = document.getElementById("num1")
const num2Dom = document.getElementById("num2")
const num3Dom = document.getElementById("num3")
const num4Dom = document.getElementById("num4")
const num5Dom = document.getElementById("num5")
const textDom = document.getElementById("text")
const confirmDom = document.getElementById("btn-confirm")
const stopDom = document.getElementById("btn-stop")
let resultDom = document.getElementById("result")
const matchedNums = document.getElementById("matched-nums")
const warningDom = document.getElementById("warning")


// VARIABLES
let timer = 30
let userNumsDom = []
let count = ""

// LOGIC
num1Dom.value = getRandomNumber(1,90)
num2Dom.value = getRandomNumber(1,90)
num3Dom.value = getRandomNumber(1,90)
num4Dom.value = getRandomNumber(1,90)
num5Dom.value = getRandomNumber(1,90)
const randomNumsDom = [num1Dom.value, num2Dom.value, num3Dom.value, num4Dom.value, num5Dom.value]
console.log(randomNumsDom)
alert("Pronto a giocare? Hai 30 secondi per memorizzare i numeri che appariranno nelle caselle.")

// DOM EVENTS
const getCountdown = setInterval(function () {
    countdownDom.innerHTML = timer
    stopDom.classList.remove("hidden")
    if (timer !== 0) {
        timer--
    } else {
        clearInterval(getCountdown)
        stopDom.classList.add("hidden")
        countdownDom.innerHTML = "Buona fortuna!"
        num1Dom.value = ""
        num2Dom.value = ""
        num3Dom.value = ""
        num4Dom.value = ""
        num5Dom.value = ""
        textDom.innerHTML = "Ora riscrivili se ci riesci (l'ordine non è importante)"
        confirmDom.classList.remove("hidden")
        console.log(randomNumsDom)
    }
}, 1000)

// confirm
confirmDom.addEventListener ("click", function () {
    userNumsDom = [num1Dom.value, num2Dom.value, num3Dom.value, num4Dom.value, num5Dom.value]
    console.log(userNumsDom)
    let goodMem = []
    let count = 0
    for (let i = 0; i < userNumsDom.length; i++) {
        if (validNumber(userNumsDom[i])) {
            if (randomNumsDom.includes(userNumsDom[i])) {
                goodMem.push(userNumsDom[i])
                count++
            }
        } else {
            warningDom.classList.remove("hidden")
        }
        console.log(count)
        console.log(typeof userNumsDom)
    }
    console.log(count)
    resultDom.innerHTML = `Ne hai indovinati ${count}/5`
    matchedNums.innerHTML = goodMem.join(" - ")


    // only for vittory 5/5
    if (count === 5) {
        var colors = ['#bb0000', '#ffffff'];
        var end = Date.now() + (15 * 1000);
        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
            });
    
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
    return count
})

// stop countdown
stopDom.addEventListener ("click", function () {
    timer = 0
})

