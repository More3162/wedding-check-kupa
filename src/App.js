import React, { useState, useEffect } from "react";
import "./App.css";
<img src="/images/cart.png" alt="Cart" className="cart" />;

const App = () => {
  const [relationship, setRelationship] = useState("");
  const [weddingType, setWeddingType] = useState("");
  const [season, setSeason] = useState("");
  const [giftAmount, setGiftAmount] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    process.env.PUBLIC_URL + "/images/kupa1.jpg",
    process.env.PUBLIC_URL + "/images/kupa2.jpg",
    process.env.PUBLIC_URL + "/images/kupa3.jpg",
    process.env.PUBLIC_URL + "/images/kupa4.jpg",
  ];

  useEffect(() => {
    const updateBackground = () => {
      document.body.style.backgroundImage = `url(${backgrounds[backgroundIndex]})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.transition = "background-image 1.5s ease-in-out";
    };

    updateBackground();

    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundIndex, backgrounds]);

  const calculateGift = () => {
    let baseAmount = 0;

    switch (relationship) {
      case "family-close":
        baseAmount = 500;
        break;
      case "family-distant":
        baseAmount = 300;
        break;
      case "close-friend":
        baseAmount = 400;
        break;
      case "friend-like-sibling":
        baseAmount = 450;
        break;
      case "coworker":
        baseAmount = 300;
        break;
      case "chosen-family":
        baseAmount = 250;
        break;
      default:
        baseAmount = 0;
    }

    switch (weddingType) {
      case "friday-noon":
        baseAmount *= 1;
        break;
      case "midweek":
        baseAmount *= 0.8;
        break;
      case "thursday-evening":
        baseAmount *= 1.2;
        break;
      default:
        baseAmount *= 1;
    }

    switch (season) {
      case "summer":
        baseAmount *= 1.1;
        break;
      case "winter":
        baseAmount *= 0.9;
        break;
      case "fall":
        baseAmount *= 1;
        break;
      case "spring":
        baseAmount *= 1.05;
        break;
      default:
        baseAmount *= 1;
    }

    setGiftAmount(Math.round(baseAmount));
  };

  return (
    <div className="App">
      <h1>🎁 מחשבון המתנות של קופה ראשית 🎉</h1>
      <div className="form-group">
        <label>👫 סוג קשר:</label>
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="">בחר</option>
          <option value="family-close">משפחה קרובה 👨‍👩‍👧‍👦</option>
          <option value="family-distant">משפחה רחוקה 🧑‍🤝‍🧑</option>
          <option value="close-friend">חבר קרוב 🤝</option>
          <option value="friend-like-sibling">חבר כמו אח 👫</option>
          <option value="coworker">חבר מהעבודה 💼</option>
          <option value="chosen-family">מתחנף לקופאית 🌟</option>
        </select>
      </div>

      <div className="form-group">
        <label>💍 סוג חתונה:</label>
        <select
          value={weddingType}
          onChange={(e) => setWeddingType(e.target.value)}
        >
          <option value="">בחר</option>
          <option value="friday-noon">חתונת שישי צהריים 🌞</option>
          <option value="midweek">חתונת אמצע שבוע 📅</option>
          <option value="thursday-evening">חתונת חמישי בערב 🌜</option>
        </select>
      </div>

      <div className="form-group">
        <label>🌸 עונה:</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="">בחר</option>
          <option value="summer">קיץ 🌞</option>
          <option value="winter">חורף ❄️</option>
          <option value="fall">סתיו 🍂</option>
          <option value="spring">אביב 🌸</option>
        </select>
      </div>

      <button onClick={calculateGift} className="calculate-btn">
        💡 לחשב עכשיו!
      </button>

      {giftAmount !== null && (
        <div className="result">
          <h2>🎉 סכום מומלץ למתנה:</h2>
          <p>{giftAmount} ₪</p>
          <p>כוכבה אומרת: "לא נעים לתת פחות!"</p>
        </div>
      )}
    </div>
  );
};

export default App;
