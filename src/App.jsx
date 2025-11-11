import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [yesClicked, setYesClicked] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [clickHearts, setClickHearts] = useState([])

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
    if (noClickCount === 0) return "Нет"
    if (noClickCount === 1) return "Точно нет?"
    if (noClickCount === 2) return "Подумай ещё"
    if (noClickCount >= 3) return "Попробуй еще раз"
    return "Нет"
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
                Знаю, что расстроил тебя, и мне правда неприятно 
              </p>
              <p className="message delay-1">
                Мне очень важно наше общение
              </p>
              <p className="message delay-2">
                Ценю каждое наше общение и каждую улыбку 
              </p>
              <p className="message delay-3">
                Прости за недопонимание
              </p>
              <p className="message delay-4">
                Давай попробуем еще раз?
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
              <div className="compliment">✨ Ты особенная</div>
              <div className="compliment">🌟 Ты яркая</div>
              <div className="compliment">🌸 Ты классная</div>
              <div className="compliment">💫 Ты уникальная</div>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="success-emoji">🎉</div>
            <h2 className="success-title">Здорово!</h2>
            <p className="success-text">
              Спасибо, что даешь мне еще один шанс 😊
            </p>
            <p className="success-text">
              Ты действительно классная, Аида! ✨
            </p>
            <p className="success-text">
              Надеюсь, смог поднять тебе настроение 🌟
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
          <p>С теплом и надеждой на понимание 🌟</p>
        </div>
      </div>
    </div>
  )
}

export default App
