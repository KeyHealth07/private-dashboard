"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [mode, setMode] = useState<"browser" | "standalone">("browser");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [installing, setInstalling] = useState(false);

  const browserKey = "PD-ELITE-2026";

  /* ===========================
     VALIDATION
  ============================ */

  const validateAccess = () => {
    setError("");

    if (!code.trim()) {
      setError("Authorization key required.");
      return;
    }

    if (mode === "browser") {
      if (code === browserKey) {
        startInstall("standalone"); // move to standalone
      } else {
        setError("ACCESS DENIED — Attempt Logged");
      }
    } else {
      // Standalone mode → ANY key works
      startInstall("dashboard");
    }
  };

  /* ===========================
     INSTALL ANIMATION
  ============================ */

  const startInstall = (nextStep: "standalone" | "dashboard") => {
    setInstalling(true);
    setProgress(0);

    const steps = [
      "Verifying client credentials...",
      "Establishing Swiss secure node...",
      "Securing asset modules...",
      "Preparing wealth infrastructure...",
      "Installation complete...",
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
          setInstalling(false);
          setCode("");
          setProgress(0);

          if (nextStep === "standalone") {
            setMode("standalone"); // move to 2nd screen
          } else {
            router.push("/dashboard"); // final destination
          }
        }, 1200);
      }
    }, 1000);
  };

  /* ===========================
     UI
  ============================ */

  return (
    <main className="main">
      <div className="card">
        <h1>
          {mode === "browser"
            ? "Private Dashboard"
            : "Omega Authorization Required"}
        </h1>

        <p className="subtitle">
          {mode === "browser"
            ? "Swiss wealth infrastructure access portal."
            : "Standalone Secure Environment Activated."}
        </p>

        <div className="security">
          {mode === "browser"
            ? "SWISS PRIVATE STANDARD • 256-BIT ENCRYPTION"
            : "OMEGA NODE • RESTRICTED • CONFIDENTIAL"}
        </div>

        <input
          type="password"
          placeholder={
            mode === "browser"
              ? "ENTER PRIVATE ACCESS CODE"
              : "ENTER AUTHORIZATION KEY"
          }
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={validateAccess}>
          {mode === "browser"
            ? "Proceed to Secure Installer"
            : "Authorize Omega Access"}
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

      <footer className="footer">
        CONFIDENTIAL — Accredited Clients Only © 2026 Private Dashboard
      </footer>
    </main>
  );
}