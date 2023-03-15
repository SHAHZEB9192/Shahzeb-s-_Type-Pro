// script.js
const quoteApiUrl = "https://api.quotable.io/random?minLength=100&maxLength=140";
// the URL of Quote Api is stored in the variable quoteApiUrl
const quoteSection = document.getElementById("quote");
// the content from ID named "quote" will be accessed and stored in the variable quoteSection
const userInput = document.getElementById("quote-input");
// the content from ID named "quote-input" will be accessed and stored in the variable userInput
let quote = "";
let mistakes = 0;
let time= 60;

const renderNewQuote = async() => {
    //Fetch from URL
    const response = await fetch(quoteApiUrl);
    //Store JSON file in variable named data
    const data = await response.json();
    //Accessing Content from JSON file stored in variable data
    quote = data.content;
    console.log(quote);
    //Splitting each and every character in the quote using split function
    let arr = quote.split("").map((value)=>{
        return "<span class= 'quote-chars'>" + value + "</span>" //Wrapping the spliited characters of quote in span tag using map function
    });
    console.log(arr);
    quoteSection.innerHTML = arr.join(""); // Showing the quote in the inner HTML within div tag
}

// Logic for comparing input words with quote
userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll(".quote-chars") //
    // Creating an Array named quoteChars from received span tags object
    quoteChars = Array.from(quoteChars)
    // User inputs of each character in Textbox
    let userInputChars = userInput.value.split("")

    quoteChars.forEach((char,index)=>{
        if(char.innerHTML == userInputChars[index]){
            char.classList.add("success")
        }
        else if(userInputChars[index] == null){
            if(char.classList.contains("fail")){
                char.classList.remove("fail")
            }
            else{
                char.classList.remove("success")
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes = mistakes + 1;
                char.classList.add("fail")
        }
        document.getElementById("mistakesID").innerHTML = mistakes;
    }})
})

function updateTimer(){
    if(time == 0){
        displayResult()
    }
    else{
        document.getElementById("timerID").innerHTML = --time+"s";
    }
}

const timeReduce = ()=>{
    time = 60;
    timer = setInterval(updateTimer,1000)
}

const displayResult = ()=>{
    document.getElementById("stop").style.display = "none"
    userInput.disabled = true;
    document.querySelector(".result").style.display = "block"
    clearInterval(timer)
    document.getElementById("container").style.height = "65vh"
    let timeTaken = 1;
    let totalType = userInput.value.length;
    let correctType = userInput.value.length - mistakes
    if(time != 0){
        timeTaken = (60-time)/100;
    }
    document.getElementById('speedID').innerText = (totalType/5/timeTaken).toFixed(2) + "wpm";
    document.getElementById('accuracyID').innerText = Math.round((correctType/totalType)*100) + "%";
    document.getElementById('reset').style.display = "block"
}

const startTest = () => { //On clicking Start Button:
    timer = "";
    mistakes = 0;
    userInput.disabled = false; //The text area should be enabled
    document.getElementById("start").style.display= "none"; //The start button should be hidden
    document.getElementById("stop").style.display= "block"; //The stop button should be visible
    timeReduce()
}

window.onload = () => {
    userInput.value = ""; //On Loading the input text area should be empty
    document.getElementById("start").style.display= "block"; //On loading the start button should be visible
    document.getElementById("stop").style.display= "none"; //O loading the stop button should be hidden
    userInput.disabled = true; //On loading the text area should be disabled
    document.getElementById("reset").style.display= "none"; //On loading the reset button should be hidden
    renderNewQuote();
}

// startTest()