"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images: string[] = [
  "/images/i1.jpg",
  "/images/i2.jpg",
  "/images/i3.jpg",
  "/images/i4.jpg",
];

export default function Home() {
  const [yesClicked, setYesClicked] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [noCount, setNoCount] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicAllowed, setMusicAllowed] = useState<boolean>(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked
          setMusicAllowed(false);
        });
      }
    }
  }, []);

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


  const handleNo = (): void => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
    setNoCount((prev) => prev + 1);
  };

  if (yesClicked) {
    return (
      <main style={styles.container}>
        <h1>YAYYY 🥹❤️</h1>
        <h2>It’s a date! 💘</h2>
        <Image
          src="/images/Final.gif"
          alt="Happy Valentine"
          width={300}
          height={300}
        />
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <audio ref={audioRef} loop>
        <source src="/music/s1.mp3" type="audio/mpeg" />
      </audio>
      {!musicAllowed && (
        <button
          onClick={() => {
            audioRef.current?.play();
            setMusicAllowed(true);
          }}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "8px 12px",
            background: "#ff4d88",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Play music 🎵
        </button>
      )}
      <h3>Can we go out on a date on Feb 14?? 🥹❤️</h3>

      <Image src={currentImage} alt="Please say yes" width={300} height={300} />

      {noCount > 0 && <p>Pretty please? 🥺 ({noCount})</p>}

      <div style={styles.buttons}>
        <button style={styles.yes} onClick={() => setYesClicked(true)}>
          Yes ❤️
        </button>

        <button style={styles.no} onClick={handleNo}>
          No 💔
        </button>
      </div>
    </main>
  );
}

const styles: {
  container: React.CSSProperties;
  buttons: React.CSSProperties;
  yes: React.CSSProperties;
  no: React.CSSProperties;
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
  no: {
    padding: "12px 28px",
    fontSize: "18px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
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

