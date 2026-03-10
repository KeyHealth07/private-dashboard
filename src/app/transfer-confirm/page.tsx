"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TransferConfirm() {

const params = useSearchParams();

const name = params.get("name");
const bank = params.get("bank");
const account = params.get("account");
const remarks = params.get("remarks");

const [processing, setProcessing] = useState(false);

const reference = Math.floor(Math.random()*9000000000)+1000000000;

return (

<div className="page">

{!processing && (

<>

<h1 className="title">Transfer Confirmation</h1>

<div className="card">

<div className="row">
<label>Reference Number</label>
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

<button
className="confirmBtn"
onClick={()=>setProcessing(true)}

>

Confirm Transaction </button>

</div>

</>

)}

{processing && (

<div className="processingScreen">

<div className="bankLoader"></div>

<h2>Transaction Processing</h2>

<p>
Routing secure banking ledger and institutional clearing nodes...
</p>

</div>

)}

<style jsx>{`

.page{
min-height:100vh;
background:#000;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:40px 20px;
overflow-y:auto;
color:white;
}

.title{
color:#d4af37;
margin-bottom:20px;
text-align:center;
}

.card{
width:100%;
max-width:420px;
background:#0a0a0a;
border:1px solid rgba(212,175,55,0.3);
border-radius:12px;
padding:24px;
}

.row{
margin-bottom:16px;
}

.row label{
display:block;
font-size:12px;
opacity:.7;
margin-bottom:4px;
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
font-weight:600;
cursor:pointer;
}

/* PROCESSING SCREEN */

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
text-align:center;
}

.processingScreen h2{
color:#d4af37;
margin-top:30px;
}

.processingScreen p{
opacity:.7;
font-size:13px;
margin-top:10px;
max-width:320px;
}

/* Elite banking animation */

.bankLoader{
width:80px;
height:80px;
border-radius:50%;
border:4px solid rgba(212,175,55,0.2);
border-top:4px solid #d4af37;
animation:spin 1.2s linear infinite;
}

@keyframes spin{
0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}
}

@media(max-width:600px){

.card{
padding:18px;
}

.title{
font-size:20px;
}

}

`}</style>

</div>

);

}
