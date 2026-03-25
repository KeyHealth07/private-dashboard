"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function TransferConfirmClient() {

const params = useSearchParams();

const name = params.get("name");
const bank = params.get("bank");
const account = params.get("account");
const remarks = params.get("remarks");

const reference = Math.floor(Math.random()*9000000000)+1000000000;

const [processing,setProcessing] = useState(false);
const [showAmount,setShowAmount] = useState(false);
const [finalProcessing,setFinalProcessing] = useState(false);
const [completed,setCompleted] = useState(false);
const [showReceipt,setShowReceipt] = useState(false);

const [amount,setAmount] = useState("");
const [logs,setLogs] = useState<string[]>([]);
const [progress,setProgress] = useState(0);

const ledgerMessages = [
"Initializing secure transaction channel...",
"Verifying blockchain routing nodes...",
"Ledger signature validated...",
"Institutional banking node connected...",
"Clearing network authentication approved...",
"Private settlement gateway opened...",
"Routing transfer through encrypted banking layer...",
"Multi-node verification in progress...",
"Financial clearing authority acknowledged...",
"Awaiting institutional settlement confirmation..."
];

const startProcessing = () => {
setProcessing(true);
setTimeout(()=>{
setProcessing(false);
setShowAmount(true);
},4000);
};

const handleAmountChange = (value:string) => {
const numbers = value.replace(/[^0-9]/g,"");
if(numbers === ""){
setAmount("");
return;
}
setAmount(Number(numbers).toLocaleString("en-US"));
};

const submitAmount = () => {
setShowAmount(false);
setFinalProcessing(true);
};

useEffect(()=>{
if(!finalProcessing) return;

let i = 0;

const logInterval = setInterval(()=>{
setLogs(prev => [...prev, ledgerMessages[i]]);
i++;
if(i >= ledgerMessages.length){
clearInterval(logInterval);
}
},1200);

const progressInterval = setInterval(()=>{
setProgress(prev=>{
const next = prev + Math.random()*5 + 2;
if(next >= 100){
clearInterval(progressInterval);
setTimeout(()=>setCompleted(true),1500);
return 100;
}
return next;
});
},900);

return ()=>{
clearInterval(logInterval);
clearInterval(progressInterval);
};

},[finalProcessing]);

useEffect(()=>{
if(completed){
setTimeout(()=>{
setShowReceipt(true);
},3000);
}
},[completed]);

return (

<div className="page">

{/* RECEIPT */}

{showReceipt && (

<div className="receiptPage">

<div className="receiptContainer">

<div className="receiptHeader">
<div className="logo">Private Secure</div>
<div className="date">
{new Date().toLocaleDateString("en-US")}
</div>
</div>

<h2 className="receiptTitle">
Transfer Confirmation and Receipt
</h2>

<div className="statusLine">
Transaction Status:
<span className="status">
{ " Pending..."}
</span>
</div>

<div className="successBox">
You have successfully submitted your transaction on{" "}
{new Date().toLocaleString("en-US",{timeZone: "America/Los_Angeles"})} USA Time
</div>


<h3 className="sectionTitle">Transfer details</h3>

<div className="detailsGrid">

<div>Account Name</div>
<div>{name?.toUpperCase()}</div>

<div>Account Number</div>
<div>****{account?.slice(-4)}</div>

<div>Confirmation Number</div>
<div>SWIFT-{reference}</div>

<div>Send to</div>
<div>{bank}</div>

<div>From account</div>
<div>CHECKING ****0985</div>

<div>Available Balance</div>
<div>$74,061,640,371.09</div>

<div>Amount</div>
<div>${amount} USD</div>

<div>Frequency</div>
<div>One-time — send now</div>

<div>Transfer Currency</div>
<div>
US Dollar (USD)<br/>
<span className="note">
NOTE: International transfer processing fee may apply. in order for this transaction to be completed, Ensure to clear out your path.
</span>
</div>

<div>Send on</div>
<div>
{new Date().toLocaleString("en-US",{timeZone: "America/Los_Angeles"})}
</div>

<div>Deliver by</div>
<div>
{new Date(Date.now()+86400000).toLocaleString("en-US",{timeZone: "America/Los_Angeles"})}
</div>

<div>Description</div>
<div>
 {name}<br/>
 {account}
</div>

</div>

</div>

</div>

)}


{/* SUCCESS */}

{completed && !showReceipt && (

<div className="processingScreen">

<div className="successIcon">✓</div>

<h2>Transaction Completed</h2>
<p>Funds processed successfully</p>

</div>

)}

{/* FINAL PROCESS */}

{finalProcessing && !completed && (

<div className="processingScreen">

{/* LOGO */}

<div className="bankLogo">
<svg viewBox="0 0 200 40" className="logoSvg">
<text x="0" y="28" className="logoText">
PRIVATE SECURE
</text>
</svg>
</div>

{/* LOADER */}

<div className="eliteLoader">
<div className="ring"></div>
<div className="ring ring2"></div>
<div className="ring ring3"></div>
<div className="node center"></div>
</div>

<h2>Transaction Processing</h2>

{/* NODE MAP */}

<div className="nodeMap">
<div className="node ny" data-label="NY"></div>
<div className="node london" data-label="LDN"></div>
<div className="node zurich" data-label="ZRH"></div>
<div className="node singapore" data-label="SGP"></div>
</div>

{/* PROGRESS */}

<div className="progressBar">
<div className="progressFill" style={{width:`${progress}%`}}></div>
</div>

<div className="progressText">
{Math.floor(progress)}% verified
</div>

{/* LOGS */}

<div className="ledgerConsole">
{logs.map((log,index)=>(
<div key={index} className="logLine">{log}</div>
))}
</div>

</div>

)}

{/* AMOUNT */}

{showAmount && (

<div className="card">

<h2 className="title">Enter Amount</h2>

<div className="amountWrapper">
<span className="dollar">$</span>

<input
type="text"
value={amount}
onChange={(e)=>handleAmountChange(e.target.value)}
className="amountInput"
/>

</div>

<button className="confirmBtn" onClick={submitAmount}>
Submit Amount
</button>

</div>

)}

{/* FIRST PROCESS */}

{processing && (

<div className="processingScreen">

<div className="eliteLoader">
<div className="ring"></div>
<div className="ring ring2"></div>
<div className="ring ring3"></div>
<div className="node center"></div>
</div>

<h2>Transaction Processing</h2>

</div>

)}

{/* CONFIRM */}

{!processing && !showAmount && !finalProcessing && !completed && !showReceipt && (

<div className="card">

<h1 className="title">Transfer Confirmation</h1>

<div className="row"><label>Reference</label><div className="value">{reference}</div></div>
<div className="row"><label>From</label><div className="value">Private Secure</div></div>
<div className="row"><label>Name</label><div className="value">{name}</div></div>
<div className="row"><label>Bank</label><div className="value">{bank}</div></div>
<div className="row"><label>Account</label><div className="value">{account}</div></div>
<div className="row"><label>Remarks</label><div className="value">{remarks}</div></div>

<button className="confirmBtn" onClick={startProcessing}>
Confirm Transaction
</button>

</div>

)}

<style jsx>{`

.page{
min-height:100vh;
background:#000;
display:flex;
justify-content:center;
align-items:center;
padding:20px;
color:white;
}

/* CARD */

.card{
width:100%;
max-width:420px;
background:#0a0a0a;
border:1px solid rgba(212,175,55,0.3);
padding:24px;
border-radius:12px;
}

.title{color:#d4af37;text-align:center;margin-bottom:20px;}

.value{
background:#000;
border:1px solid rgba(212,175,55,0.3);
padding:10px;
border-radius:6px;
}

.confirmBtn{
margin-top:20px;
width:100%;
padding:14px;
background:linear-gradient(90deg,#d4af37,#f5e6a5);
border:none;
border-radius:6px;
}

/* PROCESS */

.processingScreen{
position:fixed;
width:100%;
height:100%;
background:#000;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:20px;
}

/* LOGO */

.bankLogo{margin-bottom:20px;}

.logoSvg{width:220px;}

.logoText{
fill:none;
stroke:#d4af37;
stroke-width:1;
stroke-dasharray:300;
stroke-dashoffset:300;
animation:drawLogo 3s ease forwards, glow 2s infinite alternate;
font-size:24px;
font-weight:bold;
}

@keyframes drawLogo{
to{stroke-dashoffset:0;}
}

@keyframes glow{
from{stroke:#d4af37;}
to{stroke:#f5e6a5;}
}

/* LOADER */

.eliteLoader{
position:relative;
width:120px;
height:120px;
margin-bottom:20px;
}

.ring{
position:absolute;
width:120px;
height:120px;
border-radius:50%;
border:2px solid rgba(212,175,55,0.4);
animation:rotate 4s linear infinite;
}

.ring2{width:90px;height:90px;top:15px;left:15px;}
.ring3{width:60px;height:60px;top:30px;left:30px;}

.node.center{
position:absolute;
width:10px;
height:10px;
background:#d4af37;
border-radius:50%;
top:55px;
left:55px;
animation:pulse 1.5s infinite;
}

/* NODE MAP */

.nodeMap{
width:320px;
height:140px;
position:relative;
margin:20px 0;
border:1px solid rgba(212,175,55,0.2);
border-radius:8px;
background:linear-gradient(180deg,#050505,#000);
}

.nodeMap::before{
content:"";
position:absolute;
width:100%;
height:100%;
background:
linear-gradient(to right, transparent 49%, rgba(212,175,55,0.15) 50%, transparent 51%),
linear-gradient(to bottom, transparent 49%, rgba(212,175,55,0.15) 50%, transparent 51%);
background-size:60px 60px;
opacity:.3;
}

.node{
position:absolute;
width:12px;
height:12px;
background:#d4af37;
border-radius:50%;
box-shadow:0 0 10px #d4af37;
animation:pulse 1.5s infinite;
}

.node::after{
content:attr(data-label);
position:absolute;
top:14px;
left:-10px;
font-size:10px;
color:#d4af37;
}

.ny{top:40px;left:20px;}
.london{top:10px;left:120px;}
.zurich{top:70px;left:180px;}
.singapore{top:90px;left:260px;}

/* ANIMATIONS */

@keyframes rotate{100%{transform:rotate(360deg);}}

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.3)}
100%{transform:scale(1)}
}

/* PROGRESS */

.progressBar{
width:300px;
height:8px;
background:#111;
border-radius:20px;
overflow:hidden;
}

.progressFill{
height:100%;
background:linear-gradient(90deg,#d4af37,#f5e6a5);
}

.progressText{
color:#d4af37;
margin-top:5px;
}

/* LOGS */

.ledgerConsole{
width:300px;
height:140px;
overflow-y:auto;
background:#050505;
border:1px solid rgba(212,175,55,0.2);
padding:10px;
margin-top:10px;
font-family:monospace;
font-size:12px;
}

.logLine{color:#d4af37;}

/* SUCCESS */

.successIcon{
font-size:60px;
border:2px solid #d4af37;
border-radius:50%;
width:100px;
height:100px;
display:flex;
align-items:center;
justify-content:center;
margin-bottom:20px;
color:#d4af37;
}

/* RECEIPT */

.receiptPage{
background:#000;
min-height:100vh;
display:flex;
justify-content:center;
padding:20px;
}

.receiptContainer{
max-width:750px;
width:100%;
background:#0a0a0a;
border:1px solid #d4af37;
padding:25px;
}

.successBox{
border:2px solid #3cff00;
padding:10px;
margin:10px 0;
}

.detailsGrid{
display:grid;
grid-template-columns:1fr 1fr;
gap:10px;
}

.note{color:red;font-size:12px;}


`}</style>

</div>

);

}
