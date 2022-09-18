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

  const getQuote = async () => {
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
    generateColor();
  };

  const tweetUrl = (quoteInfo) => {
    let currentQuote = quoteInfo.text;
    let currentAuthor = quoteInfo.author;
    let url =
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent('"' + currentQuote + '"' + currentAuthor);
    return url;
  };

  return (
    <div className="app-component" style={styles.back}>
      <div className="app-container">
        <div id="quote-box" className="quote-box">
          <p id="text" style={styles.textCol}>
            <i className="quote-left">
              <FaQuoteLeft />
            </i>
            {quoteInfo.text}
            <i className="quote-right">
              <FaQuoteRight />
            </i>
          </p>
          <p id="author">- {quoteInfo.author}</p>
          <div className="buttons">
            <a
              id="tweet-quote"
              className="twitter-share-button"
              href={tweetUrl(quoteInfo)}
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

/* */
