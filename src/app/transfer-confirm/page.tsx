"use client";

import { Suspense } from "react";
import TransferConfirmClient from "./TransferConfirmClient";

export default function Page() {
return (
<Suspense
fallback={
<div
style={{
background: "#000",
color: "#d4af37",
height: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "18px"
}}
>
Initializing Secure Banking Channel... </div>
}
> <TransferConfirmClient /> </Suspense>
);
}
