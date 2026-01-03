import React, { useState, useRef, useEffect } from 'react'
import { Music, VolumeX, Volume2 } from 'lucide-react'

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        // Attempt auto-play on mount (may be blocked)
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true)
            }).catch(e => {
                console.log("Autoplay blocked, waiting for interaction")
            })
        }
    }, [])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className="music-player">
            <audio ref={audioRef} loop>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            <button onClick={togglePlay} className="music-btn">
                {isPlaying ? <Volume2 size={24} color="#FF69B4" /> : <VolumeX size={24} color="#888" />}
            </button>

            <style>{`
        .music-player {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        .music-btn {
          background: rgba(255, 255, 255, 0.8);
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .music-btn:active {
          transform: scale(0.9);
        }
      `}</style>
        </div>
    )
}

export default MusicPlayer
