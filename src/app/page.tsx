"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [installing, setInstalling] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const correctCode = "PD-ELITE-2026";

  const isIOS = () => {
    return (
      (navigator as any).userAgentData?.platform === "iOS" ||
      /iPad|iPhone|iPod/.test(navigator.userAgent)
    );
  };

  const validateAccess = () => {
    if (code === correctCode) {
      startInstall();
    } else {
      alert("ACCESS DENIED — Attempt Logged");
    }
  };

  const startInstall = () => {
  setInstalling(true);

  const steps = [
    "Verifying client credentials...",
    "Establishing Swiss secure node...",
    "Securing asset modules...",
    "Preparing wealth infrastructure...",
    "Installation complete — Launching Private Dashboard...",
  ];

  let width = 0;
  let stepIndex = 0;

  const interval = setInterval(() => {
      width += 20;
      setProgress(width);

      if (stepIndex < steps.length) {
        setStatus(steps[stepIndex]);
        stepIndex++;
      }

    if (width >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          if (isIOS()) {
            setRedirecting(true);

            setTimeout(() => {
              window.location.href =
                "https://apps.apple.com/app/";
            }, 2000);
          } else {
            setShowFallback(true);
          }
        }, 1200);
      }
    }, 1200);
  };



  return (
    <main className="main">
      <div className="skyline" />

      <div className="card">
        <h1>Private Dashboard</h1>

        <p className="subtitle">
          A discreet Swiss wealth office infrastructure consolidating private
          banking, strategic holdings and global asset management within a
          secured and confidential environment.
        </p>

        <div className="security">
          SWISS PRIVATE STANDARD • CONFIDENTIAL ACCESS • 256-BIT ENCRYPTION
        </div>

        <input
          type="password"
          placeholder="ENTER PRIVATE ACCESS CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={validateAccess}>
          Proceed to Secure Installer
        </button>

        {installing && (
          <div className="install">
            <div className="progress-container">
              <div
                className="progress"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="status">{status}</div>
          </div>
        )}
      </div>

       {redirecting && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="spinner" />
            <h2>Opening App Store…</h2>
            <p>Please wait.</p>
          </div>
        </div>
      )}

       {showFallback && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>iOS Device Required</h2>
            <p>
              This application is currently available through the Apple App Store.
            </p>
            <button onClick={() => setShowFallback(false)}>
              Return
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>CONFIDENTIAL</span> — This platform is restricted to accredited
        clients. Unauthorized access, duplication or distribution is strictly
        prohibited. © 2026 Private Dashboard.
      </footer>
    </main>
  );
}
