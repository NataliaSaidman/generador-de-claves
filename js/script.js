// Funciones de selectores
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

//Variables globales

const $form = $("form")
const $password = $("#password")
const $btnCopy = $("#btn-copy")
const $btnRefresh = $("#btn-refresh")

const $lettersRules = $("#lettersRules")
const $numbersRules = $("#numbersRules")
const $allRules = $("#allRules")

const $capitalLetters = $("#capitalLetters")
const $lowerCaseLetters = $("#lowerCaseLetters")
const $numbers = $("#numbers")
const $symbols = $("#symbols")

const $radiusLength = $$(".radiusLength")
const $radiusRules = $$(".radiusRules")
const $characters = $$(".characters")

//Arrays

const arrayCapitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrayLowerLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arraySymbol = ["!", "#", "$", "%", "&", "/", "-", "%", "@", "_"]

//Funciones

const saveInfo = (array) => {
    for (const respuesta of array) {
        if (respuesta.checked) {
            return Number(respuesta.value)
        }
    }
}

const generateLongPassword = () => {
    const array = []
    for (let i = 0; i < 20; i++) {
        const lettersCapital = Math.floor(Math.random() * arrayCapitalLetters.length)
        const lettersLower = Math.floor(Math.random() * arrayLowerLetters.length)
        const numbers = Math.floor(Math.random() * arrayNumbers.length)
        const symbols = Math.floor(Math.random() * arraySymbol.length)
        array.push(arrayCapitalLetters[lettersCapital]) + array.push(arrayLowerLetters[lettersLower]) + array.push(arrayNumbers[numbers]) + array.push(arraySymbol[symbols])
    } return array;
}

const validatePassword = () => {
    let filterPassword = generateLongPassword()
    if (!$symbols.checked) {
        filterPassword = filterPassword.filter((item) => {
            return !arraySymbol.includes(item)
        })
    } if (!$capitalLetters.checked) {
        filterPassword = filterPassword.filter((item) => {
            return !arrayCapitalLetters.includes(item)
        })
    } if (!$lowerCaseLetters.checked) {
        filterPassword = filterPassword.filter((item) => {
            return !arrayLowerLetters.includes(item)
        })
    }
    if (!$numbers.checked) {
        filterPassword = filterPassword.filter((item) => {
            return !arrayNumbers.includes(item)
        })
    }
    return filterPassword
}

const cutPassword = () => {
    let password = validatePassword()
    password.length = saveInfo($radiusLength)
    return password
}

const randomPassword = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const finalPassword = () => {
    let finalPass = randomPassword(cutPassword()) 
    return $password.value = finalPass.join("")
}

finalPassword()

//Eventos



$lettersRules.addEventListener("click", () => {
    if (saveInfo($radiusRules) === 1) {
        $capitalLetters.disabled = false
        $lowerCaseLetters.disabled = false
        $numbers.disabled = true
        $symbols.disabled = true
        $capitalLetters.checked = true
        $lowerCaseLetters.checked = true
        $numbers.checked = false
        $symbols.checked = false
        finalPassword()
        $password.style.color = "#d13b7c"
    }
})

$numbersRules.addEventListener("click", () => {
    if (saveInfo($radiusRules) === 2) {
        $numbers.disabled = false
        $symbols.disabled = true
        $capitalLetters.disabled = true
        $lowerCaseLetters.disabled = true
        $capitalLetters.checked = false
        $lowerCaseLetters.checked = false
        $numbers.checked = true
        $symbols.checked = false
        finalPassword()
    }
})

$allRules.addEventListener("change", () => {
    if (saveInfo($radiusRules) === 3) {
        $capitalLetters.disabled = false
        $lowerCaseLetters.disabled = false
        $numbers.disabled = false
        $symbols.disabled = false
        $capitalLetters.checked = true
        $lowerCaseLetters.checked = true
        $numbers.checked = true
        $symbols.checked = true
        finalPassword()

    }
})


for (const character of $characters) {
    character.addEventListener("click", () => {
        finalPassword()
    })
}

for (const radiusLength of $radiusLength) {
    radiusLength.addEventListener("click", () => {
        finalPassword()
    })
}

$btnRefresh.addEventListener("click", (e) => {
    e.preventDefault()
    finalPassword()
})

$btnCopy.addEventListener("click", (e) => {
    e.preventDefault()
    navigator.clipboard.writeText($password.value)
})
