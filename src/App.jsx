import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [yesClicked, setYesClicked] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [clickHearts, setClickHearts] = useState([])
  const [activeCompliment, setActiveCompliment] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (e) => {
    const heart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    }
    setClickHearts(prev => [...prev, heart])
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== heart.id))
    }, 2000)
  }

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1)
    const newX = Math.random() * (window.innerWidth - 200)
    const newY = Math.random() * (window.innerHeight - 100)
    setNoButtonPosition({ x: newX, y: newY })
  }

  const handleYesClick = () => {
    setYesClicked(true)
  }

  const getNoButtonText = () => {
    const texts = ["Нет", "Точно нет?", "Подумай ещё", "Попробуй еще раз"]
    return texts[noClickCount % texts.length]
  }

  const complimentsData = [
    { 
      emoji: "✨", 
      text: "Ты особенная",
      detail: "В твоей улыбке, взгляде и даже смехе есть что-то притягательно необычайное. Просто хочется видеть, как ты улыбаешься."
    },
    { 
      emoji: "🌟", 
      text: "Ты яркая",
      detail: "Твоя энергия и голос создают уют и интерес, хочется слушать тебя и находиться рядом."
    },
    { 
      emoji: "🌸", 
      text: "Ты классная",
      detail: "Твоя лёгкость, уверенность и женственность делают тебя по-настоящему привлекательной и особенной для меня."
    },
    { 
      emoji: "💫", 
      text: "Ты уникальная",
      detail: "Когда ты сказала, что у тебя всё будет хорошо, я поверил тебе сразу. В тебе есть это внутреннее сияние - спокойная уверенность, что всё получится. Мне бы хотелось быть частью этого света."
    }
  ]

  const handleComplimentClick = (index) => {
    setActiveCompliment(index)
  }

  const closeCompliment = () => {
    setActiveCompliment(null)
  }

  return (
    <div className="app" onClick={handleClick}>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {clickHearts.map(heart => (
        <div
          key={heart.id}
          className="click-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          ✨
        </div>
      ))}

      <div className={`container ${showMessage ? 'show' : ''}`}>
        {!yesClicked ? (
          <>
            <div className="header-emoji">✨</div>
            
            <h1 className="title">Привет, Аида!</h1>
            
            <div className="message-box">
              <p className="message">
                Может, тебе всё ещё немного неприятно… Надеюсь, этот небольшой жест
  сможет хоть чуть-чуть поднять настроение
              </p>
              <p className="message delay-1">
                Мне правда дорого наше общение — ты это уже часто слышишь 😅
              </p>
              <p className="message delay-2">
                Ценю каждую нашу беседу и каждый момент, когда ты улыбаешься 🙂
              </p>
              <p className="message delay-3">
                Хочу оставить эту ситуацию позади и просто двигаться дальше
              </p>
              <p className="message delay-4">
                Дашь мне шанс?
              </p>
            </div>

            <div className="question-box">
              <p className="question">Помиримся? 🤝</p>
              <div className="buttons-container">
                <button className="yes-button" onClick={handleYesClick}>
                  Конечно! ✨
                </button>
                <button 
                  className="no-button" 
                  onClick={handleNoClick}
                  style={{
                    position: noButtonPosition.x || noButtonPosition.y ? 'fixed' : 'relative',
                    left: noButtonPosition.x || 'auto',
                    top: noButtonPosition.y || 'auto',
                  }}
                >
                  {getNoButtonText()}
                </button>
              </div>
            </div>

            <div className="compliments">
              {complimentsData.map((comp, index) => (
                <div 
                  key={index}
                  className="compliment" 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleComplimentClick(index)
                  }}
                >
                  {comp.emoji} {comp.text}
                </div>
              ))}
            </div>

            {activeCompliment !== null && (
              <div className="compliment-modal" onClick={closeCompliment}>
                <div className="compliment-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-button" onClick={closeCompliment}>×</button>
                  <div className="modal-emoji">{complimentsData[activeCompliment].emoji}</div>
                  <h3>{complimentsData[activeCompliment].text}</h3>
                  <p>{complimentsData[activeCompliment].detail}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="success-message">
            <div className="success-emoji">🎉</div>
            <h2 className="success-title">Здорово!</h2>
            {/* <p className="success-text">
              Спасибо, что даешь мне еще один шанс 😊
            </p> */}
            <p className="success-text">
              Ты действительно классная, Аида! ✨
            </p>
            <p className="success-text">
              Надеюсь, смог поднять тебе настроение 💖
            </p>
            <p className="success-text">
              Хочу и дальше делить с тобой приятные дни/вечера и радовать тебя! 
            </p>
            <div className="emoji-line">
              <span>😊</span>
              <span>✨</span>
              <span>🌟</span>
              <span>💫</span>
              <span>🌸</span>
            </div>
          </div>
        )}

        <div className="footer-text">
          <p>С заботой от Даурена! 💟</p>
        </div>
      </div>
    </div>
  )
}

export default App
