"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images: string[] = [
  "/images/i1.jpg",
  "/images/i2.jpg",
  "/images/i3.jpg",
  "/images/i4.jpg",
];

const noTexts: string[] = [
  "Are you sure? 🥺",
  "Think again 💭",
  "I’ll make it special, promise ✨",
  "I’ll bring chocolate 🍫",
  "What if I say please? 😌",
  "This hurts a little 💔",
  "Okay… last chance 🥹",
  "I’m not giving up 😤❤️",
  "Ok, What if I bring flowers? 🌹",
  "Please say yes? 🥺",
  "Pleaseee? 🙏",
  "Oh come on! 😢",
  "I’ll plan something fun! 🎉",
  "You won’t regret it! 😉",
  "Pretty please with a cherry on top? 🍒",
];

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [noText, setNoText] = useState<string>(noTexts[0]);
  const [yesClicked, setYesClicked] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [noCount, setNoCount] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [yesScale, setYesScale] = useState<number>(1);

  useEffect(() => {
    if (!started || yesClicked) return;

    const moveInterval = setInterval(() => {
      const maxX = 120;
      const maxY = 80;

      setNoPosition({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      });
    }, 2000); // moves every 2 seconds (slow + cute)

    return () => clearInterval(moveInterval);
  }, [started, yesClicked]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const launchFireworks = (): void => {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-firework";

    const colors = ["#ff4d88", "#ff6fa5", "#ffd1dc", "#ff2f92"];
    heart.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // random screen position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // explosion direction
    heart.style.setProperty("--x", `${Math.random() * 200 - 100}px`);
    heart.style.setProperty("--y", `${Math.random() * 200 - 100}px`);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
  }
};


  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = crystalStyles;
    document.head.appendChild(styleTag);

    const interval = setInterval(() => {
      const crystal = document.createElement("div");
      crystal.className = "crystal";

      const size = Math.random() * 10 + 8;
      crystal.style.width = `${size}px`;
      crystal.style.height = `${size}px`;
      crystal.style.left = `${Math.random() * 100}vw`;
      crystal.style.animationDuration = `${Math.random() * 3 + 4}s`;
      crystal.style.opacity = `${Math.random() * 0.6 + 0.3}`;

      document.body.appendChild(crystal);

      setTimeout(() => {
        crystal.remove();
      }, 8000);
    }, 300);

    return () => {
      clearInterval(interval);
      styleTag.remove();
    };
  }, []);

  useEffect(() => {
  const style = document.createElement("style");
  style.innerHTML = fireworkCSS;
  document.head.appendChild(style);

  return () => {
    style.remove();
  };
}, []);

  const handleNo = (): void => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
    setNoCount((prev) => {
      const nextCount = prev + 1;
      setNoText(noTexts[nextCount % noTexts.length]);
      return nextCount;
    });
    setYesScale((prev) => Math.min(prev + 0.1, 1.6));
  };

  const handleStart = (): void => {
    audioRef.current?.play();
    setStarted(true);
  };

  return (
    <main style={styles.container}>
      <audio ref={audioRef} loop>
        <source src="/music/s1.mp3" type="audio/mpeg" />
      </audio>
      {!started && (
        <>
          <h1>Hey 💖</h1>
          <p>I have something special for you</p>

          <button style={styles.startBtn} onClick={handleStart}>
            Let’s start ✨
          </button>
        </>
      )}
      {started && !yesClicked && (
        <>
          <h3>Can we go out on a date on Feb 14?? 🥹❤️</h3>

          <Image
            src={currentImage}
            alt="Please say yes"
            width={300}
            height={300}
          />

          {noCount > 0 && (
            <p style={{ fontSize: "18px", fontWeight: 500 }}>{noText}</p>
          )}

          <div style={styles.buttons}>
            <button
              style={{
                ...styles.yes,
                transform: `scale(${yesScale})`,
                transition: "transform 0.4s ease",
              }}
              onClick={() => {
                setYesClicked(true);
                launchFireworks();
              }}
            >
              Yes ❤️
            </button>

            <button
              style={{
                ...styles.no,
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: "transform 1.5s ease-in-out",
              }}
              onClick={handleNo}
            >
              No 💔
            </button>
          </div>
        </>
      )}
      {started && yesClicked && (
        <>
          <h1>YAYYY 🥹❤️</h1>
          <h2>It’s a date! 💘</h2>
          <Image
            src="/images/Final.gif"
            alt="Happy Valentine"
            width={300}
            height={300}
          />
        </>
      )}
    </main>
  );
}

const styles: {
  container: React.CSSProperties;
  buttons: React.CSSProperties;
  yes: React.CSSProperties;
  no: React.CSSProperties;
  startContainer: React.CSSProperties;
  startBtn: React.CSSProperties;
} = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    textAlign: "center",
    backgroundColor: "#ffe6f0",
  },
  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "16px",
  },
  yes: {
    padding: "12px 28px",
    fontSize: "18px",
    backgroundColor: "#ff4d88",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  startContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffdee9, #b5fffc)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    textAlign: "center",
  },
  no: {
    padding: "12px 28px",
    fontSize: "18px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  startBtn: {
    padding: "14px 32px",
    fontSize: "20px",
    backgroundColor: "#ff4d88",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(255, 77, 136, 0.4)",
  },
};

const crystalStyles = `
@keyframes fall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

.crystal {
  position: fixed;
  top: 0;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #ffffff, #ffd6e7);
  clip-path: polygon(
    50% 0%,
    100% 50%,
    50% 100%,
    0% 50%
  );
  opacity: 0.8;
  animation-name: fall;
  animation-timing-function: linear;
  pointer-events: none;
  z-index: 0;
}
`;

const fireworkCSS = `
@keyframes heart-float {
  0% {
    transform: scale(0) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.2) translate(var(--x), var(--y));
    opacity: 0;
  }
}

.heart-firework {
  position: fixed;
  width: 12px;
  height: 12px;
  background: #ff4d88;
  transform: rotate(45deg);
  animation: heart-float 1.4s ease-out forwards;
  pointer-events: none;
}

.heart-firework::before,
.heart-firework::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4d88;
  border-radius: 50%;
}

.heart-firework::before {
  top: -6px;
  left: 0;
}

.heart-firework::after {
  left: -6px;
  top: 0;
}
`;

