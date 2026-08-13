import React from "react";

export default function Benefits({ progress = 0 }) {
	return (
		<section className="panel benefits">
			<h2>Benefits</h2>
			<ul>
				<li>Faster guest arrivals — less waiting</li>
				<li>Contactless, secure identity verification</li>
				<li>Streamlined payments and key issuance</li>
				<li>Fits existing front‑of‑house workflows</li>
			</ul>
		</section>
	);
}
