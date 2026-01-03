import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MusicPlayer from './MusicPlayer'

import badSound from '../../resource/sound/bad.mp3'

const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
        const audio = new Audio(badSound)
        audio.play()
    }

    return (
        <div className="envelope-wrapper">
            <MusicPlayer />

            {!isOpen ? (
                <div className="envelope-container" onClick={handleOpen}>
                    <motion.div className="envelope">
                        <div className="back"></div>
                        <div className="card-preview">
                            <div className="preview-text">Focus Here</div>
                        </div>
                        <div className="front"></div>
                        <motion.div
                            className="flap"
                            initial={{ rotateX: 0 }}
                            whileHover={{ rotateX: 15 }} // Sligth peek
                        ></motion.div>
                    </motion.div>
                    <p className="hint">Tap to Open</p>
                </div>
            ) : (
                <motion.div
                    className="full-card"
                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <div className="card-content">
                        <h1 className="title">Happy 6th Anniversary!</h1>

                        <div className="photo-frame">
                            {/* User should replace this src with their own image */}
                            <img src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=600&auto=format&fit=crop" alt="Us" />
                        </div>

                        <div className="message">
                            <p>To my love,</p>
                            <br />
                            <p>
                                Six years have passed, but every day feels like the first day I met you.
                                Thank you for being my partner, my best friend, and my everything.
                            </p>
                            <br />
                            <p>Forever yours,</p>
                            <p>Bebe</p>
                        </div>
                    </div>
                </motion.div>
            )}

            <style>{`
        .envelope-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background: #ffe6ea;
          perspective: 1000px;
          overflow: auto; /* Allow scroll for long message */
        }
        
        /* Envelope Styles */
        .envelope-container {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .envelope {
          width: 300px;
          height: 200px;
          position: relative;
          background: #faaca8;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .back {
          position: absolute;
          width: 0; 
          height: 0; 
          border-left: 150px solid transparent;
          border-right: 150px solid transparent;
          border-top: 100px solid #ff9a9e;
          top: 0;
        }
        .front {
          position: absolute;
          bottom: 0;
          width: 0;
          height: 0;
          border-left: 150px solid #ff758c;
          border-right: 150px solid #ff758c;
          border-top: 100px solid transparent; /* Corrected to cut out the V */
          border-bottom: 100px solid #ff758c; /* Actually simpler to just use borders for triangles */
          /* Re-doing front using border trick properly */
          border: none;
        }
        /* Let's use a simpler CSS Envelope approach */
        .envelope {
            background-color: #ff9a9e; /* Inside color */
        }
        .envelope::before { /* Bottom flap (Front) */
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0;
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-bottom: 110px solid #ff758c;
            border-radius: 0 0 10px 10px;
            z-index: 3;
        }
        .envelope::after { /* Side flaps */
             content: '';
             position: absolute;
             bottom: 0;
             left: 0;
             width: 0;
             height: 0;
             border-left: 150px solid #ff8fa3;
             border-right: 150px solid transparent;
             border-top: 100px solid transparent;
             border-bottom: 100px solid #ff8fa3;
             border-radius: 0 0 0 10px;
             z-index: 2;
        }
        /* Right side */
        .front-right {
           /* It's easier to just use the ::before logic above but we need 2 sides. */
        }

        .card-preview {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 100px;
          background: white;
          z-index: 1;
          border-radius: 5px 5px 0 0;
          display: flex;
          justify-content: center;
          padding-top: 20px;
        }
        .preview-text {
          font-family: 'Great Vibes', cursive;
          color: #d63384;
          font-size: 1.2rem;
        }
        
        .flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0; 
          height: 0; 
          border-left: 150px solid transparent;
          border-right: 150px solid transparent;
          border-top: 110px solid #ffccd5; /* Lighter color */
          transform-origin: top;
          z-index: 4;
          transition: transform 0.4s;
        }
        
        .hint {
          margin-top: 60px; /* Push down below envelope */
          color: #ff758c;
          animation: pulse 2s infinite;
        }
        
        /* Opened Card */
        .full-card {
          width: 100%;
          max-width: 400px;
          min-height: 80vh;
          background: white;
          padding: 2rem;
          margin: 1rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          text-align: center;
          position: relative;
        }
        .title {
            font-family: 'Great Vibes', cursive; /* Ideal for romance, falling back */
            color: #d63384;
            margin-bottom: 1.5rem;
            font-size: 2rem;
        }
        .photo-frame {
            padding: 10px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transform: rotate(-3deg);
            margin-bottom: 2rem;
            border: 1px solid #eee;
        }
        .photo-frame img {
            width: 100%;
            height: auto;
            display: block;
        }
        .message {
            text-align: left;
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
            font-family: 'Outfit', sans-serif;
        }
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
      `}</style>

            {/* Import decorative font */}
            <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        </div>
    )
}

export default Envelope
