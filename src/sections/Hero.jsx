import React from "react";

export default function Hero({ progress = 0 }) {
	return (
		<section className="panel hero">
			<h1>EZinn — Self‑Service Hotel Check‑In Kiosk</h1>
			<p className="lede">Skip the front desk. Check in quickly with a secure kiosk in under a minute.</p>
			<p className="mini">Scroll to step through a guest's arrival and the complete self check‑in flow.</p>
		</section>
	);
}
