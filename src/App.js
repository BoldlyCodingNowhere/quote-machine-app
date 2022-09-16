import { useEffect, useState } from "react";
import "./App.css";
import { FaTwitterSquare, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

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
    <div className="app-container">
      <div id="quote-box">
        <p id="text">
          <i className="quote-left">
            <FaQuoteLeft />
          </i>
          {quoteInfo.text}
          <i className="quote-right">
            <FaQuoteRight />
          </i>
        </p>
        <p id="author">{quoteInfo.author}</p>
        <div className="buttons">
          <button id="new-quote" onClick={getQuote}>
            New Quote
          </button>
          <a
            id="tweet-quote"
            className="twitter-share-button"
            href="https://twitter.com/intent/tweet"
            target="_blank"
          >
            <FaTwitterSquare />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
