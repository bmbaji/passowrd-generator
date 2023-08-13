const characterAmountRange = document.getElementById("characterAmountRange")
const characterAmountNumber = document.getElementById("characterAmountNumber")

const includeUppercaseElement = document.getElementById("includeUppercase")
const includeSymbolsElement = document.getElementById("includeSymbols")
const includeNumbersElement = document.getElementById("includeNumbers")
const passwordDisplay = document.getElementById("passwordDisplay")
const resetButton = document.querySelector(".btn-reset")
const passwordGuide = document.querySelector(".passwordGuide")

const form = document.getElementById("passwordGeneratorForm")

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
)

resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    passwordDisplay.innerText = "Generate a password."
    characterAmountNumber.value = 10
    characterAmountRange.value = 10
    includeUppercaseElement.checked = false
    includeNumbersElement.checked = false
    includeSymbolsElement.checked = false
    passwordGuide.style.display = "none"
    passwordDisplay.style.border = "1px solid #333"


})


characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)



form.addEventListener("submit", e => {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols= includeSymbolsElement.checked
    
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.innerText = password
    if (password.length < 7){
        passwordGuide.style.display = "block"
        passwordGuide.style.color = "#ff5925"
        passwordDisplay.style.border = "3px solid #ff5925"
    }

    if (password.length > 6 && password.length < 12){
        passwordGuide.style.display = "block"
        passwordGuide.innerText = "Okay Password. Increase the number of characters for a stronger password!"
        passwordGuide.style.color = "yellow"
        passwordDisplay.style.border = "3px solid #yellow"
    }

    if (password.length > 12){
        passwordGuide.style.display = "block"
        passwordGuide.innerText = "Great Password."
        passwordGuide.style.color = "#26d730"
        passwordDisplay.style.border = "3px solid #26d730"
    }

    

    
})



function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols){
    let charCodes = LOWERCASE_CHAR_CODES
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
     
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
        
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
        

        
    
    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }

    return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
   const array = []
   for(let i = low; i <= high; i++) {
    array.push(i)
   }
   return array
}
function syncCharacterAmount(e) {
    const value = e.target.value

    characterAmountNumber.value = value
    characterAmountRange.value = value 
}