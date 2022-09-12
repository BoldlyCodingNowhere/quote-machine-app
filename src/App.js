import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quoteInfo, setQuoteInfo] = useState({});

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuoteInfo({
          text: data.content,
          author: data.author,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">{quoteInfo.text}</p>
        <p id="author">{quoteInfo.author}</p>
        <button id="new-quote" onClick={getQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet"
        >
          Tweet
        </a>
      </div>
    </div>
  );
}

export default App;
