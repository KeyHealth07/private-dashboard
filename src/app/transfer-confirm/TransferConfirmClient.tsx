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

const formatted = Number(numbers).toLocaleString("en-US");

setAmount(formatted);

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

setProgress(prev => {

const next = prev + Math.random()*4 + 1;

if(next >= 92){
clearInterval(progressInterval);
return 92;
}

return next;

});

},1000);

return ()=>{
clearInterval(logInterval);
clearInterval(progressInterval);
};

},[finalProcessing]);

return (

<div className="page">

{!processing && !showAmount && !finalProcessing && (

<div className="card">

<h1 className="title">Transfer Confirmation</h1>

<div className="row">
<label>Reference</label>
<div className="value">{reference}</div>
</div>

<div className="row">
<label>From</label>
<div className="value">Private Secure</div>
</div>

<div className="row">
<label>Name</label>
<div className="value">{name}</div>
</div>

<div className="row">
<label>Bank</label>
<div className="value">{bank}</div>
</div>

<div className="row">
<label>Account</label>
<div className="value">{account}</div>
</div>

<div className="row">
<label>Remarks</label>
<div className="value">{remarks}</div>
</div>

<button className="confirmBtn" onClick={startProcessing}>
Confirm Transaction
</button>

</div>

)}

{processing && (

<div className="processingScreen">

<div className="eliteLoader">

<div className="ring"></div>
<div className="ring ring2"></div>
<div className="ring ring3"></div>
<div className="node"></div>

</div>

<h2>Transaction Processing</h2>
<p>Routing secure institutional banking ledger...</p>

</div>

)}

{showAmount && (

<div className="card">

<h2 className="title">Enter Amount</h2>

<div className="amountWrapper">

<span className="dollar">$</span>

<input
type="text"
value={amount}
onChange={(e)=>handleAmountChange(e.target.value)}
placeholder="0"
className="amountInput"
/>

</div>

<button className="confirmBtn" onClick={submitAmount}>
Submit Amount
</button>

</div>

)}

{finalProcessing && (

<div className="processingScreen">

<h2>Transaction Processing</h2>

<div className="nodeMap">

<div className="node ny">NY</div>
<div className="node london">LDN</div>
<div className="node zurich">ZRH</div>
<div className="node singapore">SGP</div>

</div>

<div className="progressContainer">

<div className="progressBar">

<div
className="progressFill"
style={{width:`${progress}%`}}
></div>

</div>

<div className="progressText">
{Math.floor(progress)}% verified
</div>

</div>

<div className="ledgerConsole">

{logs.map((log,index)=>(

<div key={index} className="logLine">
{log}
</div>
))}

</div>

</div>

)}

<style jsx>{`

.page{
min-height:100vh;
background:#000;
display:flex;
align-items:center;
justify-content:center;
padding:40px 20px;
flex-direction:column;
color:white;
}

.card{
width:100%;
max-width:420px;
background:#0a0a0a;
border:1px solid rgba(212,175,55,0.3);
border-radius:12px;
padding:24px;
}

.title{
text-align:center;
color:#d4af37;
margin-bottom:20px;
}

.row{
margin-bottom:16px;
}

.row label{
font-size:12px;
opacity:.7;
}

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
cursor:pointer;
}

.amountWrapper{
display:flex;
align-items:center;
border:1px solid rgba(212,175,55,0.3);
border-radius:6px;
padding:10px;
background:#000;
}

.dollar{
color:#d4af37;
margin-right:6px;
}

.amountInput{
background:transparent;
border:none;
outline:none;
color:white;
flex:1;
}

.processingScreen{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:#000;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding: 20px;
}



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

.ring2{
width:90px;
height:90px;
top:15px;
left:15px;
animation-duration:3s;
}

.ring3{
width:60px;
height:60px;
top:30px;
left:30px;
animation-duration:2s;
}

.processingScreen h2{
color:#d4af37;
margin-top:10px;
}

.processingScreen p{
opacity:.7;
font-size:13px;
margin-bottom:20px;
}

.progressContainer{
width:300px;
margin-top:20px;
}

.progressBar{
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
font-size:12px;
color:#d4af37;
margin-top:6px;
}

.nodeMap{
width:300px;
height:120px;
position:relative;
margin-bottom:20px;
}

.node{
position:absolute;
width:10px;
height:10px;
background:#d4af37;
border-radius:50%;
top:55px;
left:55px;
animation:pulse 1.5s infinite;
}


.ny{top:40px;left:20px;}
.london{top:10px;left:120px;}
.zurich{top:60px;left:170px;}
.singapore{top:80px;left:250px;}

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.3)}
100%{transform:scale(1)}
}

.ledgerConsole{
width:320px;
height:160px;
overflow-y:auto;
background:#050505;
border:1px solid rgba(212,175,55,0.2);
padding:12px;
font-family:monospace;
font-size:12px;
}

.logLine{
color:#d4af37;
}

`}</style>

</div>

);

}
