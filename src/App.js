import { useEffect, useState } from "react";
import "./App.css";
import useGenerateRandomColor from "./useGenerateRandomColor";
import { FaTwitterSquare, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function App() {
  const [quoteInfo, setQuoteInfo] = useState({});
  const { color, generateColor } = useGenerateRandomColor();

  const styles = {
    back: {
      backgroundColor: `#${color}`,
    },
    textCol: {
      color: `#${color}`,
    },
  };

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    generateColor();
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
    <div className="app-component" style={styles.back}>
      <div className="app-container">
        <div id="quote-box">
          <p id="text" style={styles.textCol}>
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
            <a
              id="tweet-quote"
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet"
              target="_blank"
            >
              <FaTwitterSquare
                style={styles.textCol}
                className="twitter-button"
              />
            </a>
            <button
              type="button"
              className="button"
              id="new-quote"
              style={styles.back}
              onClick={getQuote}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
