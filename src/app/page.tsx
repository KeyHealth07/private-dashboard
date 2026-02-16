"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [installing, setInstalling] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [showInstallOverlay, setShowInstallOverlay] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const browserKey = "PD-ELITE-2026";
  const installedKey = "PD-OMEGA-VAULT-77";

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(standalone);
  }, []);

  const isIOS = () => {
    return (
      (navigator as any).userAgentData?.platform === "iOS" ||
      /iPad|iPhone|iPod/.test(navigator.userAgent)
    );
  };

  const validateAccess = () => {
    setError("");

    if (isStandalone) {
      if (code === installedKey) {
        setAuthorized(true);
      } else {
        setError("Invalid Omega Authorization Key.");
      }
    } else {
      if (code === browserKey) {
        startInstall();
      } else {
        setError("ACCESS DENIED — Attempt Logged");
      }
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
              setShowInstallOverlay(true);
            }, 2000);
          } else {
            setShowFallback(true);
          }
        }, 1200);
      }
    }, 1200);
  };

  /* ===========================
     INSTALLED APP AUTHORIZED VIEW
  ============================ */

  if (isStandalone && authorized) {
    return (
      <main className="omega-home">
        <h1>Welcome to the Dashboard Ms. KeyHealth</h1>
        <p>
          This device has been registered under Omega Security Clearance.
        </p>
        <p>
          All communications are encrypted and routed through secure Swiss
          private banking infrastructure.
        </p>
        <p>Omega Vault Access Confirmed.</p>
      </main>
    );
  }

  /* ===========================
     DEFAULT VIEW
  ============================ */

  return (
    <main className="main">
      <div className="skyline" />

      <div className="card">
        <h1>
          {isStandalone
            ? "Welcome,Ms. KeyHealth"
            : "Private Dashboard"}
        </h1>

        <p className="subtitle">
          {isStandalone
            ? "Your Swiss-standard private environment is now active."
            : "A discreet Swiss wealth office infrastructure consolidating private banking, strategic holdings and global asset management within a secured and confidential environment."}
        </p>

        <div className="security">
          {isStandalone
            ? "Restricted • Encrypted • Confidential"
            : "SWISS PRIVATE STANDARD • CONFIDENTIAL ACCESS • 256-BIT ENCRYPTION" }
        </div>

        <input
          type="password"
          placeholder={
            isStandalone
              ? "ENTER AUTHORIZATION KEY"
              : "ENTER PRIVATE ACCESS CODE"
          }
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={validateAccess}>
          {isStandalone
            ? "Authorize Omega Access"
            : "Proceed to Secure Installer"}
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
            <h2>Preparing Installation…</h2>
            <p>Please wait.</p>
          </div>
        </div>
      )}

      {showFallback && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>iOS Device Required</h2>
            <p>
              This application is currently available via Home Screen
              installation.
            </p>
            <button onClick={() => setShowFallback(false)}>
              Return
            </button>
          </div>
        </div>
      )}

      {showInstallOverlay && (
        <div className="install-overlay">
          <div className="install-card">
            <h2>Install Secure Node</h2>
            <p>
              Tap the Share button in Safari and select
              <strong> "Add to Home Screen"</strong>
            </p>
            <button onClick={() => setShowInstallOverlay(false)}>
              Continue
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
