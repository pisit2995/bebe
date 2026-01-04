import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import MusicPlayer from './MusicPlayer'
import badSound from '../../resource/sound/bad.mp3'
import video2019 from '../../resource/video/2019_4.MOV'
import video2019_2 from '../../resource/video/2019_3.MP4'
import video2020_1 from '../../resource/video/2020_1_opt.mp4'
import video2021_2 from '../../resource/video/2021_2_opt.mp4'
import video2021_3 from '../../resource/video/2021_3_opt.mp4'
import imageSpecial from '../../resource/image/scence.jpg'
import image2021_3 from '../../resource/image/2021_3.jpg'
import nothingSound from '../../resource/sound/nothing.mp3'

const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [introStep, setIntroStep] = useState(0) // 0-2: Text, 3: Finale

    // Audio State
    const [currentSong, setCurrentSong] = useState(badSound)
    const [isLooping, setIsLooping] = useState(false)

    // Quiz State
    const [quizState, setQuizState] = useState({
        step: 0,
        score: 0,
        answers: [],
        isFinished: false
    })

    // Special Reveal State
    const [showSpecialReveal, setShowSpecialReveal] = useState(false)
    const [revealStep, setRevealStep] = useState(0) // 0: Text, 1: Video

    const [selectedChoice, setSelectedChoice] = useState(null)

    const questions = [
        {
            year: "2019",
            text: "Do you remember our first trip together 🛥️ \n Do you know which day it was?",
            media: video2019,
            type: 'video',
            choices: [
                { id: 1, text: "29 July 2019", isCorrect: true },
                { id: 2, text: "5 August 2019", isCorrect: false },
                { id: 3, text: "1 September 2029", isCorrect: false }
            ]
        },
        {
            year: "2019_2",
            text: "What was wrong with me that day that made you take me to the hospital?",
            media: video2019_2,
            type: 'video',
            choices: [
                { id: 1, text: "Stomach ache", isCorrect: false },
                { id: 2, text: "Migraine", isCorrect: false },
                { id: 3, text: "Pink eye", isCorrect: true }
            ]
        },
        {
            year: "2020_1",
            text: "What is this place?",
            media: video2020_1,
            type: 'video',
            choices: [
                { id: 1, text: "Khao Kho", isCorrect: true },
                { id: 2, text: "Suan Phueng", isCorrect: false },
                { id: 3, text: "Chiang Mai", isCorrect: false }
            ]
        },
        {
            year: "2020_2",
            text: "Guess what happens next..",
            media: imageSpecial,
            type: 'image',
            reveal: {
                text: "..take a look",
                media: video2021_2
            },
            choices: [
                { id: 1, text: "🐽", isCorrect: false },
                { id: 2, text: "👅", isCorrect: true },
                { id: 3, text: "🙉", isCorrect: false }
            ]
        },
        {
            year: "2021_3",
            text: "And what happens next..",
            media: image2021_3,
            type: 'image',
            reveal: {
                text: "..really",
                media: video2021_3
            },
            choices: [
                { id: 1, text: "😝", isCorrect: false },
                { id: 2, text: "🥹", isCorrect: false },
                { id: 3, text: "😪", isCorrect: true }
            ]
        }
    ]

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleSongEnd = () => {
        if (currentSong === badSound) {
            setCurrentSong(nothingSound)
            setIsLooping(true)
        }
    }

    // Intro Sequence Logic
    useEffect(() => {
        if (isOpen && introStep < 3) {
            const timer = setTimeout(() => {
                setIntroStep(prev => prev + 1)
            }, 3000) // 3 seconds per text
            return () => clearTimeout(timer)
        }
    }, [isOpen, introStep])

    const texts = [
        "Six years have passed...",
        "Thank you for staying \n by my side",
        "Are you ready"
    ]

    const onOptionClick = (choice) => {
        if (selectedChoice) return
        setSelectedChoice(choice)
    }

    const onNextQuestion = () => {
        const currentQ = questions[quizState.step]
        const isCorrect = selectedChoice.isCorrect

        const newAnswers = [...quizState.answers, {
            question: currentQ.text,
            userAns: selectedChoice.text,
            correct: isCorrect,
            year: currentQ.year
        }]

        const newScore = isCorrect ? quizState.score + 1 : quizState.score

        // Check for special reveal logic (Generic)
        if (currentQ.reveal) {
            setQuizState({
                ...quizState,
                score: newScore,
                answers: newAnswers
            })
            setShowSpecialReveal(true)

            // Start sequence
            setTimeout(() => {
                setRevealStep(1) // Show video after text fade
            }, 3000)
            return
        }

        if (quizState.step < questions.length - 1) {
            setQuizState({
                ...quizState,
                step: quizState.step + 1,
                score: newScore,
                answers: newAnswers
            })
            setSelectedChoice(null)
        } else {
            setQuizState({
                ...quizState,
                score: newScore,
                answers: newAnswers,
                isFinished: true
            })
        }
    }

    const handleFinishReveal = () => {
        setShowSpecialReveal(false)
        setRevealStep(0)
        // Advance to next question or finish
        if (quizState.step < questions.length - 1) {
            setQuizState(prev => ({
                ...prev,
                step: prev.step + 1
            }))
            setSelectedChoice(null)
        } else {
            setQuizState(prev => ({
                ...prev,
                isFinished: true
            }))
        }
    }

    const showQuiz = introStep >= 3 && !quizState.isFinished && !showSpecialReveal
    const showResult = introStep >= 3 && quizState.isFinished

    return (
        <div className="envelope-wrapper">
            <MusicPlayer
                src={currentSong}
                AutoPlay={isOpen}
                loop={isLooping}
                onEnded={handleSongEnd}
            />

            {!isOpen ? (
                <div className="envelope-container" onClick={handleOpen}>
                    <motion.div className="envelope">
                        <div className="side-flap-right"></div>
                        <div className="card-preview">
                            <div className="preview-text">Focus Here</div>
                        </div>
                        <motion.div
                            className="flap"
                            initial={{ rotateX: 0 }}
                            whileHover={{ rotateX: 15 }} // Sligth peek
                        ></motion.div>
                    </motion.div>
                    <p className="hint">Tap to Open</p>
                </div>
            ) : (
                <>
                    {/* Special Reveal Overlay */}
                    {showSpecialReveal && (
                        <div className="reveal-overlay">
                            {revealStep === 0 && (
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5 }}
                                    className="reveal-text"
                                >
                                    {questions[quizState.step].reveal?.text}
                                </motion.h1>
                            )}

                            {revealStep === 1 && (
                                <motion.div
                                    className="reveal-video-container"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <video
                                        src={questions[quizState.step].reveal?.media}
                                        autoPlay
                                        className="reveal-video"
                                        onClick={(e) => {
                                            e.target.paused ? e.target.play() : e.target.pause()
                                        }}
                                    />
                                    <button className="next-btn reveal-next" onClick={handleFinishReveal}>
                                        Next <span style={{ marginLeft: '5px' }}>→</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {introStep < 3 && (
                        <div className="intro-text-container">
                            <motion.h2
                                key={introStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 1 }}
                                className="intro-text"
                            >
                                {texts[introStep]}
                            </motion.h2>
                        </div>
                    )}

                    {showQuiz && (
                        <motion.div
                            className="quiz-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <h1 className="year-header">{questions[quizState.step].year.split('_')[0]}</h1>

                            <div className="quiz-image-placeholder">
                                {questions[quizState.step].type === 'video' ? (
                                    <video
                                        src={questions[quizState.step].media}
                                        autoPlay
                                        playsInline
                                        muted
                                        loop
                                        onClick={(e) => {
                                            e.target.paused ? e.target.play() : e.target.pause()
                                        }}
                                        style={{
                                            width: '100%',
                                            maxHeight: '40vh', // Limit height for iPhone screens
                                            borderRadius: '10px',
                                            objectFit: 'contain', // Ensure full video is visible
                                            display: 'block',
                                            margin: '0 auto'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={questions[quizState.step].media}
                                        alt="Quiz Media"
                                        style={{
                                            width: '100%',
                                            maxHeight: '40vh',
                                            borderRadius: '10px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                            </div>

                            <p className="quiz-question">{questions[quizState.step].text}</p>

                            <div className="quiz-options">
                                {questions[quizState.step].choices.map(choice => {
                                    let btnClass = "quiz-btn"
                                    if (selectedChoice) {
                                        if (selectedChoice.id === choice.id) {
                                            btnClass += choice.isCorrect ? " correct" : " wrong"
                                        } else if (choice.isCorrect && selectedChoice.id !== choice.id && !selectedChoice.isCorrect) {
                                            // choice.isCorrect check here is just logic, not UI
                                        }
                                    }

                                    return (
                                        <button
                                            key={choice.id}
                                            className={btnClass}
                                            onClick={() => onOptionClick(choice)}
                                            disabled={!!selectedChoice}
                                        >
                                            {choice.text}
                                        </button>
                                    )
                                })}
                            </div>

                            {selectedChoice && (
                                <button className="next-btn" onClick={onNextQuestion}>
                                    Next <span style={{ marginLeft: '5px' }}>→</span>
                                </button>
                            )}
                        </motion.div>
                    )}

                    {showResult && (
                        <motion.div
                            className="full-card"
                            initial={{ opacity: 0, scale: 0.5, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                        >
                            <div className="card-content">
                                <h1 className="title">Happy 6th Anniversary!</h1>
                                <h2 className="score-summary">
                                    Score: {quizState.score} / {questions.length}
                                </h2>

                                <div className="photo-frame">
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
                </>
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
        overflow: auto;
    }
    
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
    .envelope::before {
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
    .envelope::after {
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
    .side-flap-right {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-right: 150px solid #ff8fa3;
        border-left: 150px solid transparent;
        border-top: 100px solid transparent;
        border-bottom: 100px solid #ff8fa3;
        border-radius: 0 0 10px 0;
        z-index: 2;
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
        border-top: 110px solid #ffccd5;
        transform-origin: top;
        z-index: 4;
        transition: transform 0.4s;
    }
    
    .hint {
        margin-top: 60px;
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
        font-family: 'Great Vibes', cursive;
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
    
    .intro-text-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100%;
    }
    .intro-text {
        font-family: 'Great Vibes', cursive;
        color: #d63384;
        font-size: 3rem;
        text-align: center;
        padding: 20px;
        white-space: pre-line;
    }

    /* Quiz Styles */
    .quiz-card {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        text-align: center;
        width: 90%;
        max-width: 400px;
    }
    .year-header {
        color: #FF69B4;
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        margin: 0 0 1rem 0;
    }
    .quiz-question {
        font-size: 1.2rem;
        color: #555;
        margin: 1.5rem 0;
        white-space: pre-line;
    }
    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 2rem;
    }
    .quiz-btn {
        padding: 15px;
        border: 2px solid #EEE;
        border-radius: 12px;
        background: white;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Outfit', sans-serif;
    }
    .quiz-btn:hover:not(:disabled) {
        border-color: #FFB6C1;
        background: #FFF0F5;
    }
    .quiz-btn.correct {
        border-color: #4CAF50;
        background: #E8F5E9;
        color: #2E7D32;
    }
    .quiz-btn.wrong {
        border-color: #F44336;
        background: #FFEBEE;
        color: #C62828;
        animation: shake 0.4s;
    }
    .next-btn {
        background: #FF69B4;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
        transition: transform 0.2s;
    }
    .next-btn:active {
        transform: scale(0.95);
    }
    .score-summary {
        color: #555;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    /* Special Reveal Overlay */
    .reveal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: black;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }
    
    .reveal-text {
        font-family: 'Great Vibes', cursive;
        font-size: 3rem;
        color: #FFB6C1;
        text-shadow: 0 0 10px rgba(255, 182, 193, 0.5);
    }
    
    .reveal-video-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: black;
    }
    
    .reveal-video {
        width: 100%;
        height: 80vh; /* Leave room for button */
        object-fit: contain;
    }
    
    .reveal-next {
        margin-top: 20px;
        z-index: 1001;
        background: #d63384;
        border: 2px solid white;
    }
`}</style>
            <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        </div >
    )
}

export default Envelope
