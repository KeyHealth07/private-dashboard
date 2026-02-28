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
  const [aum] = useState(18_750_000_000);

  const [assets, setAssets] = useState<Asset[]>([
    { name: "Bitcoin", symbol: "BTC", allocation: 30, price: 64500 },
    { name: "Ethereum", symbol: "ETH", allocation: 24, price: 3500 },
    { name: "Tokenized Treasuries", symbol: "USTB", allocation: 18, price: 100 },
    { name: "Private Equity Basket", symbol: "PE-X", allocation: 16, price: 1000 },
    { name: "Offshore Structured Fund", symbol: "OSF", allocation: 12, price: 500 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartPoints, setChartPoints] = useState([480, 482, 478, 485, 490, 487, 492]);

  useEffect(() => {
    const interval = setInterval(() => {
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
        asset: ["BTC", "ETH", "USTB", "PE-X"][Math.floor(Math.random() * 4)],
        amount: `$${(Math.random() * 20000000).toLocaleString()}`,
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

  return (
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
          ${aum.toLocaleString()}
        </div>

        <div className="syncText">Syncing balance… 56.98%</div>

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
              right={<><div>${a.price.toFixed(2)}</div><div className="sub">{a.allocation}%</div></>}
            />
          ))}
        </Card>

        <Card title="Offshore Vault Holdings" glow>
          <div>Swiss Private Bank — $6.2B</div>
          <div>Singapore Custody Vault — $4.8B</div>
          <div>Cayman Structured Trust — $3.7B</div>
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
          width: 40%;
          height: 100%;
          background: #b81313;
          position: relative;
          animation: loading 1.5s linear infinite;
        }

        .grid { display: grid; gap: 20px; }

        .sub { font-size: 12px; opacity: 0.5; }


        @keyframes ticker { 0% { transform: translateX(0);} 100% { transform: translateX(-100%);} }
        @keyframes shimmer { 0% {background-position:200% center;} 100% {background-position:-200% center;} }
        @keyframes pulse { 0%,100% {opacity:.4;} 50% {opacity:1;} }
        @keyframes loading { 0% {left:-40%;} 100% {left:100%;} }
        @keyframes bgShift { 0% {background-position:0% 50%;} 50% {background-position:100% 50%;} 100% {background-position:0% 50%;} }
      `}</style>
    </main>
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