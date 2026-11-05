import { useEffect, useRef, useState } from "react";
import { mockReservations } from "../../data/mockReservations";
import "./Simulator.css";

const checkInSteps = [
  { id: "checkin-lookup", label: "Reservation" },
  { id: "checkin-details", label: "Your stay" },
  { id: "checkin-verify", label: "Verification" },
  { id: "checkin-room", label: "Your room" },
  { id: "checkin-success", label: "Complete" },
];

const checkOutSteps = [
  { id: "checkout-lookup", label: "Find your stay" },
  { id: "checkout-summary", label: "Stay summary" },
  { id: "checkout-payment", label: "Payment" },
  { id: "checkout-receipt", label: "Receipt" },
];

const paymentMethods = [
  { id: "card", label: "Card payment", detail: "Demonstration only · no charge" },
  { id: "wallet", label: "Digital wallet", detail: "Demonstration only · no charge" },
];

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function findByConfirmation(confirmationNumber) {
  const normalizedNumber = confirmationNumber.trim().toUpperCase();
  return mockReservations.find(
    (reservation) => reservation.confirmationNumber === normalizedNumber
  );
}

function SimulatorHeader({ journey, onRestart, isBusy }) {
  return (
    <header className="sim-header">
      <div className="sim-brand" aria-label="EZinn self-service kiosk">
        <img src="/logo.png" alt="EZinn" />
      </div>
      <div className="sim-header-context">
        <span className="sim-header-title">Self-service kiosk</span>
        <span className="sim-demo-badge">DEMO MODE</span>
      </div>
      {journey ? (
        <button
          className="sim-text-button sim-header-action"
          type="button"
          onClick={onRestart}
          disabled={isBusy}
        >
          Start over
        </button>
      ) : (
        <span className="sim-header-spacer" aria-hidden="true" />
      )}
    </header>
  );
}

function ProgressIndicator({ steps, currentStep }) {
  if (!steps) return null;

  const currentIndex = steps.findIndex((step) => step.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <nav className="sim-progress" aria-label="Journey progress">
      <div
        className="sim-progress-track"
        role="progressbar"
        aria-valuemin="1"
        aria-valuemax={steps.length}
        aria-valuenow={currentIndex + 1}
        aria-valuetext={`Step ${currentIndex + 1} of ${steps.length}: ${steps[currentIndex]?.label}`}
      >
        <span className="sim-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <ol className="sim-progress-labels">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={index === currentIndex ? "is-current" : index < currentIndex ? "is-complete" : ""}
            aria-current={index === currentIndex ? "step" : undefined}
          >
            <span className="sim-progress-number">{index < currentIndex ? "✓" : index + 1}</span>
            <span className="sim-progress-label">{step.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Screen({ title, description, children }) {
  return (
    <section className="sim-screen" aria-labelledby="sim-screen-title">
      <div className="sim-screen-heading">
        <h1 id="sim-screen-title" tabIndex="-1">{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}

function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className="sim-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && <span className="sim-field-error" id={`${id}-error`} role="alert">{error}</span>}
    </div>
  );
}

function GuestAndStayDetails({ reservation }) {
  return (
    <dl className="sim-detail-grid">
      <div><dt>Guest</dt><dd>{reservation.guestName}</dd></div>
      <div><dt>Booking reference</dt><dd>{reservation.confirmationNumber}</dd></div>
      <div><dt>Check-in</dt><dd>{formatDate(reservation.checkIn)}</dd></div>
      <div><dt>Check-out</dt><dd>{formatDate(reservation.checkOut)}</dd></div>
      <div><dt>Guests</dt><dd>{reservation.guestCount}</dd></div>
      <div><dt>Room type</dt><dd>{reservation.roomType}</dd></div>
    </dl>
  );
}

function ChargeList({ charges, total }) {
  return (
    <div className="sim-charge-list">
      {charges.map((charge) => (
        <div className="sim-charge-row" key={charge.description}>
          <span>{charge.description}</span>
          <span>{formatCurrency(charge.amount)}</span>
        </div>
      ))}
      <div className="sim-charge-row sim-charge-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

function JourneyActions({ onBack, backLabel = "Back", disabled = false, children }) {
  return (
    <div className="sim-actions">
      {onBack && (
        <button
          className="sim-button sim-button-secondary"
          type="button"
          onClick={onBack}
          disabled={disabled}
        >
          <span aria-hidden="true">←</span> {backLabel}
        </button>
      )}
      {children}
    </div>
  );
}

export default function Simulator({ onExit }) {
  const [step, setStep] = useState("welcome");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [checkoutReference, setCheckoutReference] = useState("");
  const [reservation, setReservation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [demoMessage, setDemoMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const mountedRef = useRef(true);
  const previousStepRef = useRef(step);
  const demoReservation = mockReservations[0];

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (previousStepRef.current !== step) {
      document.getElementById("sim-screen-title")?.focus();
      previousStepRef.current = step;
    }
  }, [step]);

  const journey = step.startsWith("checkin")
    ? "checkin"
    : step.startsWith("checkout")
      ? "checkout"
      : null;
  const progressSteps = journey === "checkin" ? checkInSteps : journey === "checkout" ? checkOutSteps : null;
  const total = reservation?.charges.reduce((sum, charge) => sum + charge.amount, 0) ?? 0;

  const resetJourney = () => {
    setIsBusy(false);
    setErrorMessage("");
    setConfirmationNumber("");
    setLastName("");
    setRoomNumber("");
    setCheckoutReference("");
    setReservation(null);
    setPaymentMethod("");
    setStep("welcome");
  };

  const goTo = (nextStep) => {
    setErrorMessage("");
    setDemoMessage("");
    setStep(nextStep);
  };

  const loadDemoCheckIn = () => {
    setConfirmationNumber(demoReservation.confirmationNumber);
    setLastName(demoReservation.lastName);
    setErrorMessage("");
    setDemoMessage("Sample booking details loaded. This is a demonstration.");
  };

  const loadDemoCheckOut = () => {
    setRoomNumber(demoReservation.roomNumber);
    setCheckoutReference(demoReservation.confirmationNumber);
    setErrorMessage("");
    setDemoMessage("Sample stay details loaded. This is a demonstration.");
  };

  const simulateProcessing = () => new Promise((resolve) => window.setTimeout(resolve, 450));

  const handleCheckInSearch = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const enteredConfirmation = confirmationNumber.trim();
    const enteredLastName = lastName.trim();
    if (!enteredConfirmation || !enteredLastName) {
      setErrorMessage("Enter both your confirmation number and the guest’s last name.");
      return;
    }

    setIsBusy(true);
    await simulateProcessing();
    if (!mountedRef.current) return;
    setIsBusy(false);

    const match = findByConfirmation(enteredConfirmation);
    if (!match) {
      setErrorMessage("We couldn’t find a reservation with that confirmation number. Check it and try again.");
      return;
    }
    if (match.lastName.toLowerCase() !== enteredLastName.toLowerCase()) {
      setErrorMessage("That last name doesn’t match this reservation. Check the spelling and try again.");
      return;
    }
    setReservation(match);
    goTo("checkin-details");
  };

  const handleCheckOutSearch = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const enteredRoom = roomNumber.trim();
    const enteredConfirmation = checkoutReference.trim();
    if (!enteredRoom && !enteredConfirmation) {
      setErrorMessage("Enter a room number or booking reference to find your stay.");
      return;
    }

    setIsBusy(true);
    await simulateProcessing();
    if (!mountedRef.current) return;
    setIsBusy(false);

    const match = enteredConfirmation ? findByConfirmation(enteredConfirmation) : null;
    if (enteredConfirmation && !match) {
      setErrorMessage("We couldn’t find a stay with that booking reference. Check it and try again.");
      return;
    }
    if (enteredRoom && match && match.roomNumber !== enteredRoom) {
      setErrorMessage("That room number doesn’t match this booking reference.");
      return;
    }
    if (enteredRoom && !match) {
      const roomMatch = mockReservations.find((stay) => stay.roomNumber === enteredRoom);
      if (!roomMatch) {
        setErrorMessage("We couldn’t find a stay for that room number. Check it and try again.");
        return;
      }
      setReservation(roomMatch);
      goTo("checkout-summary");
      return;
    }

    setReservation(match);
    goTo("checkout-summary");
  };

  const handleVerification = async () => {
    setIsBusy(true);
    await simulateProcessing();
    if (!mountedRef.current) return;
    setIsBusy(false);
    goTo("checkin-room");
  };

  const handlePayment = async () => {
    setErrorMessage("");
    if (!paymentMethod) {
      setErrorMessage("Choose a payment option to continue.");
      return;
    }
    setIsBusy(true);
    await simulateProcessing();
    if (!mountedRef.current) return;
    setIsBusy(false);
    goTo("checkout-receipt");
  };

  let screen;

  if (step === "welcome") {
    screen = (
      <Screen
        title="Welcome to EZinn"
        description="Experience seamless self-service hospitality"
      >
        <div className="sim-welcome-mark" aria-hidden="true">
          <span>e</span>
        </div>
        <p className="sim-welcome-note">Your stay, made effortless.</p>
        <div className="sim-journey-options">
          <button
            className="sim-journey-card"
            type="button"
            onClick={() => goTo("checkin-lookup")}
          >
            <span className="sim-journey-icon" aria-hidden="true">↗</span>
            <span className="sim-journey-title">CHECK IN</span>
            <span className="sim-journey-description">Welcome to your stay</span>
            <span className="sim-journey-arrow" aria-hidden="true">→</span>
          </button>
          <button
            className="sim-journey-card"
            type="button"
            onClick={() => goTo("checkout-lookup")}
          >
            <span className="sim-journey-icon sim-journey-icon-warm" aria-hidden="true">↙</span>
            <span className="sim-journey-title">CHECK OUT</span>
            <span className="sim-journey-description">Until next time</span>
            <span className="sim-journey-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <button className="sim-exit-link" type="button" onClick={onExit}>
          ← Return to website
        </button>
      </Screen>
    );
  } else if (step === "checkin-lookup") {
    screen = (
      <Screen
        title="Let’s find your reservation"
        description="Enter the confirmation number and last name on your booking."
      >
        <form className="sim-form" onSubmit={handleCheckInSearch} noValidate>
          <FormField
            id="checkin-confirmation"
            label="Confirmation number"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="e.g. EZ-482916"
            value={confirmationNumber}
            onChange={(event) => {
              setConfirmationNumber(event.target.value);
              setErrorMessage("");
              setDemoMessage("");
            }}
            error={errorMessage && !confirmationNumber.trim() ? errorMessage : ""}
          />
          <FormField
            id="checkin-last-name"
            label="Guest last name"
            autoComplete="family-name"
            placeholder="As shown on your booking"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              setErrorMessage("");
              setDemoMessage("");
            }}
            error={errorMessage && confirmationNumber.trim() && !lastName.trim() ? errorMessage : ""}
          />
          <button className="sim-demo-fill" type="button" onClick={loadDemoCheckIn}>
            <span className="sim-demo-fill-icon" aria-hidden="true">✦</span>
            <span>Don’t have a booking? <strong>Try a demo booking</strong></span>
            <span className="sim-demo-fill-arrow" aria-hidden="true">→</span>
          </button>
          {demoMessage && <p className="sim-demo-loaded" role="status">{demoMessage}</p>}
          {errorMessage && confirmationNumber.trim() && lastName.trim() && (
            <p className="sim-alert" role="alert">{errorMessage}</p>
          )}
          <JourneyActions onBack={() => goTo("welcome")} disabled={isBusy}>
            <button className="sim-button sim-button-primary" type="submit" disabled={isBusy}>
              {isBusy ? "Searching…" : "Find my reservation"} <span aria-hidden="true">→</span>
            </button>
          </JourneyActions>
        </form>
        <p className="sim-demo-hint">
          <span aria-hidden="true">ⓘ</span> Demonstration booking credentials are available below.
        </p>
      </Screen>
    );
  } else if (step === "checkin-details") {
    screen = (
      <Screen title="Your reservation" description="Please review the details before continuing.">
        <div className="sim-detail-card">
          <GuestAndStayDetails reservation={reservation} />
        </div>
        <p className="sim-privacy-note">Your details are shown only for this demonstration.</p>
        <JourneyActions onBack={() => goTo("checkin-lookup")}>
          <button className="sim-button sim-button-primary" type="button" onClick={() => goTo("checkin-verify")}>
            Confirm reservation <span aria-hidden="true">→</span>
          </button>
        </JourneyActions>
      </Screen>
    );
  } else if (step === "checkin-verify") {
    screen = (
      <Screen title="A quick guest check" description="Confirm the guest details before we prepare your room.">
        <div className="sim-verified-guest">
          <span className="sim-avatar" aria-hidden="true">{reservation.guestName.split(" ").map((part) => part[0]).join("")}</span>
          <div>
            <span className="sim-overline">PRIMARY GUEST</span>
            <strong>{reservation.guestName}</strong>
            <span>{reservation.guestCount} guests · {reservation.confirmationNumber}</span>
          </div>
        </div>
        <div className="sim-demo-notice" role="note">
          <span className="sim-notice-icon" aria-hidden="true">i</span>
          <p><strong>Demonstration only.</strong> This step simulates guest verification. No identity document is scanned or checked.</p>
        </div>
        <JourneyActions onBack={() => goTo("checkin-details")} disabled={isBusy}>
          <button className="sim-button sim-button-primary" type="button" onClick={handleVerification} disabled={isBusy}>
            {isBusy ? "Simulating verification…" : "Simulate guest verification"} <span aria-hidden="true">→</span>
          </button>
        </JourneyActions>
      </Screen>
    );
  } else if (step === "checkin-room") {
    screen = (
      <Screen title="Your room is ready" description="Here is the room prepared for your stay.">
        <div className="sim-room-card">
          <span className="sim-overline">YOUR ROOM</span>
          <strong className="sim-room-number">{reservation.roomNumber}</strong>
          <span className="sim-room-type">{reservation.roomType}</span>
          <span className="sim-room-caption">A comfortable stay awaits.</span>
        </div>
        <JourneyActions onBack={() => goTo("checkin-verify")}>
          <button className="sim-button sim-button-primary" type="button" onClick={() => goTo("checkin-success")}>
            Confirm room &amp; check in <span aria-hidden="true">→</span>
          </button>
        </JourneyActions>
      </Screen>
    );
  } else if (step === "checkin-success") {
    screen = (
      <Screen title="You’re checked in" description="Your room is ready. Enjoy your stay.">
        <div className="sim-success-mark" aria-hidden="true">✓</div>
        <div className="sim-room-card sim-room-card-success">
          <span className="sim-overline">ROOM NUMBER</span>
          <strong className="sim-room-number">{reservation.roomNumber}</strong>
          <span className="sim-room-type">{reservation.roomType}</span>
        </div>
        <div className="sim-access-card">
          <span className="sim-overline">ACCESS INSTRUCTIONS · DEMO</span>
          <p>Your digital room key is ready in this demonstration. In a live hotel, follow the property’s instructions to collect or activate your room key.</p>
        </div>
        <button className="sim-button sim-button-primary sim-button-full" type="button" onClick={resetJourney}>
          Start again <span aria-hidden="true">↻</span>
        </button>
      </Screen>
    );
  } else if (step === "checkout-lookup") {
    screen = (
      <Screen
        title="Let’s find your stay"
        description="Enter your room number, booking reference, or both."
      >
        <form className="sim-form" onSubmit={handleCheckOutSearch} noValidate>
          <FormField
            id="checkout-room-number"
            label="Room number"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 806"
            value={roomNumber}
            onChange={(event) => {
              setRoomNumber(event.target.value);
              setErrorMessage("");
              setDemoMessage("");
            }}
          />
          <div className="sim-field-divider"><span>OR</span></div>
          <FormField
            id="checkout-booking-reference"
            label="Booking reference"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="e.g. EZ-482916"
            value={checkoutReference}
            onChange={(event) => {
              setCheckoutReference(event.target.value);
              setErrorMessage("");
              setDemoMessage("");
            }}
          />
          <button className="sim-demo-fill" type="button" onClick={loadDemoCheckOut}>
            <span className="sim-demo-fill-icon" aria-hidden="true">✦</span>
            <span>Want to see how check-out works? <strong>Try a demo stay</strong></span>
            <span className="sim-demo-fill-arrow" aria-hidden="true">→</span>
          </button>
          {demoMessage && <p className="sim-demo-loaded" role="status">{demoMessage}</p>}
          {errorMessage && <p className="sim-alert" role="alert">{errorMessage}</p>}
          <JourneyActions onBack={() => goTo("welcome")} disabled={isBusy}>
            <button className="sim-button sim-button-primary" type="submit" disabled={isBusy}>
              {isBusy ? "Searching…" : "Find my stay"} <span aria-hidden="true">→</span>
            </button>
          </JourneyActions>
        </form>
        <p className="sim-demo-hint">
          <span aria-hidden="true">ⓘ</span> Demonstration stay credentials are available below.
        </p>
      </Screen>
    );
  } else if (step === "checkout-summary") {
    screen = (
      <Screen title="Your stay summary" description="Review your folio before checking out.">
        <div className="sim-detail-card">
          <dl className="sim-detail-grid">
            <div><dt>Guest</dt><dd>{reservation.guestName}</dd></div>
            <div><dt>Room</dt><dd>{reservation.roomNumber} · {reservation.roomType}</dd></div>
            <div><dt>Check-in</dt><dd>{formatDate(reservation.checkIn)}</dd></div>
            <div><dt>Check-out</dt><dd>{formatDate(reservation.checkOut)}</dd></div>
          </dl>
        </div>
        <ChargeList charges={reservation.charges} total={total} />
        <JourneyActions onBack={() => goTo("checkout-lookup")} disabled={isBusy}>
          <button className="sim-button sim-button-primary" type="button" onClick={() => goTo("checkout-payment")}>
            Continue to payment <span aria-hidden="true">→</span>
          </button>
        </JourneyActions>
      </Screen>
    );
  } else if (step === "checkout-payment") {
    screen = (
      <Screen title="Settle your folio" description="Choose a demonstration option to complete this checkout flow.">
        <fieldset className="sim-payment-options">
          <legend>Payment option</legend>
          {paymentMethods.map((method) => (
            <label
              className={`sim-payment-option${paymentMethod === method.id ? " is-selected" : ""}`}
              key={method.id}
            >
              <input
                type="radio"
                name="simulated-payment-method"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => {
                  setPaymentMethod(method.id);
                  setErrorMessage("");
                }}
              />
              <span className="sim-radio-indicator" aria-hidden="true" />
              <span className="sim-payment-copy">
                <strong>{method.label}</strong>
                <span>{method.detail}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <div className="sim-payment-total">
          <span>Total due</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <div className="sim-demo-notice" role="note">
          <span className="sim-notice-icon" aria-hidden="true">i</span>
          <p><strong>Payment simulation only.</strong> No card details are requested, no payment is processed, and no charge is made.</p>
        </div>
        {errorMessage && <p className="sim-alert" role="alert">{errorMessage}</p>}
        <JourneyActions onBack={() => goTo("checkout-summary")} disabled={isBusy}>
          <button className="sim-button sim-button-primary" type="button" onClick={handlePayment} disabled={isBusy}>
            {isBusy ? "Simulating checkout…" : "Confirm simulated checkout"} <span aria-hidden="true">→</span>
          </button>
        </JourneyActions>
      </Screen>
    );
  } else if (step === "checkout-receipt") {
    screen = (
      <Screen title="Checkout complete" description="Thank you for staying with us. We hope to welcome you back.">
        <div className="sim-success-mark" aria-hidden="true">✓</div>
        <div className="sim-receipt">
          <div className="sim-receipt-heading">
            <div>
              <span className="sim-overline">DEMONSTRATION RECEIPT</span>
              <strong>{reservation.guestName}</strong>
            </div>
            <span className="sim-receipt-status">SIMULATED</span>
          </div>
          <p className="sim-receipt-meta">Room {reservation.roomNumber} · {reservation.confirmationNumber}</p>
          <ChargeList charges={reservation.charges} total={total} />
          <p className="sim-receipt-note">No real payment was processed or charged.</p>
        </div>
        <button className="sim-button sim-button-primary sim-button-full" type="button" onClick={resetJourney}>
          Start again <span aria-hidden="true">↻</span>
        </button>
      </Screen>
    );
  }

  return (
    <div className="ez-simulator">
      <div className="simulator-shell">
        <SimulatorHeader journey={journey} onRestart={resetJourney} isBusy={isBusy} />
        <ProgressIndicator steps={progressSteps} currentStep={step} />
        <div className="simulator-content" key={step}>
          {screen}
        </div>
        <footer className="simulator-footer">
          <span>EZinn Hospitality</span>
          <span>Secure, seamless, and always welcoming.</span>
        </footer>
        <details className="sim-credentials">
          <summary>View sample booking credentials</summary>
          <div className="sim-credentials-content">
            <p>Use these sample reservations to explore both check-in and check-out. All details and charges are mock data.</p>
            <div className="sim-credential-list">
              {mockReservations.map((sample) => (
                <div className="sim-credential" key={sample.confirmationNumber}>
                  <strong>{sample.guestName}</strong>
                  <span>Confirmation: <code>{sample.confirmationNumber}</code></span>
                  <span>Last name: <code>{sample.lastName}</code></span>
                  <span>Room: <code>{sample.roomNumber}</code></span>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
