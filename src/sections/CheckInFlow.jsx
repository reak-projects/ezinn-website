import React from "react";

const STEPS = [
	{ id: 1, title: "Find Booking", range: [0.75, 0.80] },
	{ id: 2, title: "Verify ID", range: [0.80, 0.85] },
	{ id: 3, title: "Payment", range: [0.85, 0.9] },
	{ id: 4, title: "Get Room Key", range: [0.9, 1.0] },
];

function currentStep(progress) {
	const p = progress;
	const s = STEPS.findIndex((st) => p >= st.range[0] && p < st.range[1]);
	return s === -1 ? 0 : s + 1;
}

export default function CheckInFlow({ id, progress = 0 }) {
	const step = currentStep(progress);

	return (
		<section id={id} className="panel flow">
			<h2>Watch the check‑in process</h2>
			<p className="sub">The kiosk guides the guest through booking lookup, ID verification, payment, and key issuance.</p>

			<ol className="steps">
				{STEPS.map((s, i) => (
					<li key={s.id} className={i + 1 === step ? "active" : ""}>
						<strong>{s.title}</strong>
						<span className="hint">{i + 1 === step ? "Now" : ""}</span>
					</li>
				))}
			</ol>
		</section>
	);
}
