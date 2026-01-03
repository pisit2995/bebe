import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Heart } from 'lucide-react'

const Login = ({ onLogin }) => {
    const [passcode, setPasscode] = useState('')
    const [error, setError] = useState(false)

    const correctCode = '181262'

    const handleChange = (e) => {
        const value = e.target.value
        if (value.length <= 6) {
            setPasscode(value)
            setError(false)

            if (value === correctCode) {
                onLogin()
            } else if (value.length === 6) {
                setError(true)
                setTimeout(() => setPasscode(''), 500)
            }
        }
    }

    return (
        <div className="login-container">
            <div className="decoration">
                <Heart className="heart-icon floating" fill="#FFB6C1" stroke="none" size={48} />
            </div>

            <motion.div
                className="login-card"
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            >
                <div className="icon-wrapper">
                    <Lock size={32} color="#FF69B4" />
                </div>
                <h2>Our 6th Anniversary</h2>
                <p>Enter the magic number</p>

                <input
                    type="tel"
                    value={passcode}
                    onChange={handleChange}
                    placeholder="******"
                    className={`passcode-input ${error ? 'error' : ''}`}
                    maxLength={6}
                    autoFocus
                />

                {error && <p className="error-msg">Hmm, try our date? (DDMMYY)</p>}
            </motion.div>

            <style>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          background: linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%);
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .login-card {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(255, 105, 180, 0.15);
          width: 80%;
          max-width: 300px;
          backdrop-filter: blur(10px);
        }
        .icon-wrapper {
          background: #FFF0F5;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        h2 {
          color: #FF69B4;
          margin: 0;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
        }
        p {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .passcode-input {
          width: 100%;
          padding: 12px;
          font-size: 24px;
          text-align: center;
          letter-spacing: 8px;
          border: 2px solid #EEE;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s;
          color: #555;
          margin-bottom: 1rem;
        }
        .passcode-input:focus {
          border-color: #FF69B4;
        }
        .passcode-input.error {
          border-color: #FF4444;
          color: #FF4444;
        }
        .error-msg {
          color: #FF4444;
          font-size: 0.8rem;
          margin: 0;
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .decoration {
          position: absolute;
          top: 15%;
        }
      `}</style>
        </div>
    )
}

export default Login
