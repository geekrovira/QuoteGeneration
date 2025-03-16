
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const  authorText = document.getElementById('author');
const xBtn = document.getElementById('twitter');
const  neQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Show loading
function loading(){
loader.hidden = false;
quoteContainer.hidden= true;
}
// Hide loading
function complete(){
quoteContainer.hidden= false;
loader.hidden = true;
}


// SHow New QUote

function newQUote(){

    loading();
    // Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
  
  if (!quote.author){
    authorText.textContent = "Unknow";
  }else{
    authorText.textContent = quote.author;
  }
  
  if(quote.text.length > 50){
    quoteText.classList.add('long-quote')
  }else{
    quoteText.classList.remove('long-quote')
  }
   
  complete();
   quoteText.textContent = quote.text;
}


//Get Quotes From API

async function getQuotes(){
    loading();
    const apiURL='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQUote();
    }catch(error){
        //catch error
        console.log(error)
    }
 complete();
}

function tweetQuote(){
    const xUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl,'_blank');

}

neQuoteBtn.addEventListener('click',newQUote);
xBtn.addEventListener('click',tweetQuote);


getQuotes();

