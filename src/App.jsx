import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  {
    title: "BASIC INFO",
    subtitle: "Start here.",
    fields: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "age", label: "Age", type: "number", required: true },
      { id: "location", label: "Location (City, State/Country)", type: "text", required: true },
      { id: "occupation", label: "Occupation", type: "text", required: true },
      {
        id: "relationship",
        label: "Relationship Status",
        type: "select",
        options: ["Single", "In a relationship", "Married", "Divorced", "It's complicated"],
        required: true,
      },
    ],
  },
  {
    title: "DEEPER SCREENING",
    subtitle: "We filter hard. The wrong man will ruin the container. Be ruthlessly honest.",
    fields: [
      {
        id: "q1",
        label: "1. Why are you interested in The Threshold right now?",
        type: "textarea",
        required: true,
      },
      {
        id: "q2",
        label: "2. Are you familiar with the primary facilitator's work (Luna Ora)? Have you read any of her books or watched YouTube videos?",
        type: "textarea",
        required: true,
      },
      {
        id: "q3",
        label: "3. What is currently not working in your life as a man?",
        type: "textarea",
        required: true,
      },
      {
        id: "q4",
        label: "4. Where do you feel you are out of integrity?",
        type: "textarea",
        required: true,
      },
      {
        id: "q5",
        label: "5. What are you avoiding or not facing right now?",
        type: "textarea",
        required: true,
      },
      {
        id: "q6",
        label: "6. How do you typically handle conflict—with yourself or others?",
        type: "textarea",
        required: true,
      },
      {
        id: "q7",
        label: "7. What is your relationship to anger?",
        type: "textarea",
        required: true,
      },
      {
        id: "q8",
        label: "8. What is your relationship to sexuality? (Be honest.)",
        type: "textarea",
        required: true,
      },
      {
        id: "q9",
        label: "9. Have you done any personal development or men's work before? If yes, what kind?",
        type: "textarea",
        required: true,
      },
      {
        id: "q10",
        label: "10. What do you think you need—but are afraid to admit?",
        type: "textarea",
        required: true,
      },
      {
        id: "q11",
        label: "11. Are you willing to be challenged, called out, and seen by other men?",
        type: "select",
        options: ["Yes", "No", "I'm not sure yet"],
        required: true,
      },
      {
        id: "q12",
        label: "12. Are you open to receiving direct feedback from a female facilitator?",
        type: "select",
        options: ["Yes", "No", "I need to think about it"],
        required: true,
      },
      {
        id: "q13",
        label: "13. Do you have any mental health conditions or history we should be aware of? (Important for safety.)",
        type: "textarea",
        required: true,
      },
      {
        id: "q14",
        label: "14. What would make this experience a failure for you?",
        type: "textarea",
        required: true,
      },
      {
        id: "q15",
        label: "15. What would make it a success?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "COMMITMENT FILTER",
    subtitle: "Last gate. No passengers.",
    fields: [
      {
        id: "commitment_scale",
        label: "On a scale of 1–10, how committed are you to change right now?",
        type: "range",
        required: true,
      },
      {
        id: "commitment_why",
        label: "Why did you choose that number?",
        type: "textarea",
        required: true,
      },
      {
        id: "agreements",
        label: "Are you willing to follow group agreements even if uncomfortable?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },
];

function NoiseOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        opacity: 0.03,
        pointerEvents: "none",
        zIndex: 9999,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function ThresholdApplication() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [rangeValue, setRangeValue] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [fadeIn, setFadeIn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [currentSection]);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const validateSection = () => {
    const section = SECTIONS[currentSection];
    const newErrors = {};
    let valid = true;
    section.fields.forEach((f) => {
      if (f.required && !formData[f.id] && f.type !== "range") {
        newErrors[f.id] = true;
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const next = () => {
    if (!validateSection()) return;
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection((s) => s + 1);
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateSection()) return;
    const payload = { ...formData, commitment_scale: rangeValue };
    setSubmitting(true);
    setSubmitError(null);

    try {
      // Replace this URL with your actual Google Apps Script Web App URL after deployment
      const GAS_URL = "https://script.google.com/macros/s/AKfycbyErr9KClHTRw7o0vuNLvQEtjY2J1DFd6Ojjscs6tZyAUaARN2PvlP-vnDD3OyLha0I/exec";
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.result === "success") {
        setSubmitted(true);
      } else {
        throw new Error(json.message || "Submission failed");
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please try again or contact support.");
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const section = SECTIONS[currentSection];

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e2d8",
      fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
      position: "relative",
      overflow: "auto",
    },
    header: {
      textAlign: "center",
      padding: "48px 20px 0",
      position: "relative",
    },
    logoMark: {
      width: 48,
      height: 2,
      background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
      margin: "0 auto 24px",
    },
    title: {
      fontSize: "clamp(28px, 5vw, 42px)",
      fontWeight: 400,
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "#c9a96e",
      margin: 0,
      lineHeight: 1.2,
    },
    tagline: {
      fontSize: 13,
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      color: "#6b6459",
      marginTop: 12,
      fontFamily: "'Courier New', monospace",
    },
    divider: {
      width: 120,
      height: 1,
      background: "linear-gradient(90deg, transparent, #2a2520, transparent)",
      margin: "32px auto",
    },
    progressBar: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      padding: "0 20px 32px",
    },
    progressDot: (active, completed) => ({
      width: active ? 32 : 10,
      height: 10,
      borderRadius: active ? 5 : "50%",
      background: completed ? "#c9a96e" : active ? "#c9a96e" : "#1e1c18",
      border: `1px solid ${completed || active ? "#c9a96e" : "#3a352e"}`,
      transition: "all 0.4s ease",
    }),
    formContainer: {
      maxWidth: 640,
      margin: "0 auto",
      padding: "0 24px 80px",
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.5s ease",
    },
    sectionTitle: {
      fontSize: 11,
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "#c9a96e",
      fontFamily: "'Courier New', monospace",
      marginBottom: 8,
    },
    sectionSubtitle: {
      fontSize: 15,
      color: "#7a7368",
      lineHeight: 1.7,
      marginBottom: 40,
      fontStyle: "italic",
    },
    fieldGroup: {
      marginBottom: 32,
    },
    label: {
      display: "block",
      fontSize: 15,
      color: "#c4bdb0",
      marginBottom: 10,
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    input: (hasError) => ({
      width: "100%",
      padding: "14px 16px",
      background: "#12110f",
      border: `1px solid ${hasError ? "#8b3a3a" : "#2a2520"}`,
      borderRadius: 2,
      color: "#e8e2d8",
      fontSize: 15,
      fontFamily: "'EB Garamond', Georgia, serif",
      outline: "none",
      transition: "border-color 0.3s",
      boxSizing: "border-box",
      letterSpacing: "0.02em",
    }),
    textarea: (hasError) => ({
      width: "100%",
      padding: "14px 16px",
      background: "#12110f",
      border: `1px solid ${hasError ? "#8b3a3a" : "#2a2520"}`,
      borderRadius: 2,
      color: "#e8e2d8",
      fontSize: 15,
      fontFamily: "'EB Garamond', Georgia, serif",
      outline: "none",
      resize: "vertical",
      minHeight: 100,
      lineHeight: 1.7,
      transition: "border-color 0.3s",
      boxSizing: "border-box",
    }),
    select: (hasError) => ({
      width: "100%",
      padding: "14px 16px",
      background: "#12110f",
      border: `1px solid ${hasError ? "#8b3a3a" : "#2a2520"}`,
      borderRadius: 2,
      color: "#e8e2d8",
      fontSize: 15,
      fontFamily: "'EB Garamond', Georgia, serif",
      outline: "none",
      cursor: "pointer",
      appearance: "none",
      boxSizing: "border-box",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%236b6459'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 16px center",
    }),
    errorText: {
      fontSize: 12,
      color: "#8b3a3a",
      marginTop: 6,
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.05em",
    },
    rangeContainer: {
      padding: "8px 0",
    },
    rangeLabel: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12,
      fontSize: 13,
      color: "#6b6459",
      fontFamily: "'Courier New', monospace",
    },
    rangeValue: {
      fontSize: 48,
      fontWeight: 300,
      color: "#c9a96e",
      textAlign: "center",
      marginBottom: 8,
      lineHeight: 1,
    },
    rangeInput: {
      width: "100%",
      appearance: "none",
      height: 2,
      background: `linear-gradient(90deg, #c9a96e 0%, #c9a96e ${(rangeValue - 1) * 11.1}%, #2a2520 ${(rangeValue - 1) * 11.1}%, #2a2520 100%)`,
      outline: "none",
      cursor: "pointer",
      borderRadius: 1,
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      marginTop: 48,
      paddingTop: 32,
      borderTop: "1px solid #1e1c18",
    },
    btnPrimary: {
      padding: "16px 40px",
      background: "transparent",
      border: "1px solid #c9a96e",
      color: "#c9a96e",
      fontSize: 11,
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace",
      cursor: "pointer",
      transition: "all 0.3s",
      flex: 1,
      maxWidth: 220,
    },
    btnSecondary: {
      padding: "16px 40px",
      background: "transparent",
      border: "1px solid #2a2520",
      color: "#6b6459",
      fontSize: 11,
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    successScreen: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      textAlign: "center",
    },
    successTitle: {
      fontSize: "clamp(24px, 4vw, 36px)",
      fontWeight: 400,
      letterSpacing: "0.2em",
      color: "#c9a96e",
      marginBottom: 24,
    },
    successText: {
      fontSize: 16,
      color: "#7a7368",
      lineHeight: 1.8,
      maxWidth: 440,
    },
  };

  if (submitted) {
    return (
      <div style={styles.wrapper}>
        <NoiseOverlay />
        <div style={styles.successScreen}>
          <div style={{ ...styles.logoMark, marginBottom: 40, width: 64 }} />
          <h2 style={styles.successTitle}>APPLICATION RECEIVED</h2>
          <p style={styles.successText}>
            Your answers have been recorded. We take this process seriously—expect
            a response within 72 hours. If you're selected, you'll receive next
            steps via email.
          </p>
          <div style={{ ...styles.divider, marginTop: 40 }} />
          <p
            style={{
              ...styles.tagline,
              marginTop: 24,
              fontSize: 11,
              color: "#3a352e",
            }}
          >
            The Threshold × Luna Ora
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper} ref={containerRef}>
      <NoiseOverlay />
      <style>{`
        input::placeholder, textarea::placeholder {
          color: #3a352e;
          font-style: italic;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #c9a96e !important;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #c9a96e;
          cursor: pointer;
          border: 2px solid #0a0a0a;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #c9a96e;
          cursor: pointer;
          border: 2px solid #0a0a0a;
        }
        button:hover {
          opacity: 0.85;
        }
        ::selection {
          background: #c9a96e33;
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.logoMark} />
        <h1 style={styles.title}>The Threshold</h1>
        <p style={styles.tagline}>Application — Pre-Screen</p>
      </header>

      <div style={styles.divider} />

      <div style={styles.progressBar}>
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            style={styles.progressDot(i === currentSection, i < currentSection)}
          />
        ))}
      </div>

      <div style={styles.formContainer}>
        <p style={styles.sectionTitle}>{section.title}</p>
        <p style={styles.sectionSubtitle}>{section.subtitle}</p>

        {section.fields.map((field) => (
          <div key={field.id} style={styles.fieldGroup}>
            <label style={styles.label}>{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                style={styles.input(errors[field.id])}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder="Your answer"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                style={{ ...styles.input(errors[field.id]), maxWidth: 120 }}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                min={18}
                max={99}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                style={styles.textarea(errors[field.id])}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder="Be honest. That's the point."
              />
            )}

            {field.type === "select" && (
              <select
                style={styles.select(errors[field.id])}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                <option value="" disabled>
                  Select one
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "range" && (
              <div style={styles.rangeContainer}>
                <div style={styles.rangeValue}>{rangeValue}</div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={rangeValue}
                  onChange={(e) => setRangeValue(Number(e.target.value))}
                  style={styles.rangeInput}
                />
                <div style={styles.rangeLabel}>
                  <span>1 — Not ready</span>
                  <span>10 — Burn the ships</span>
                </div>
              </div>
            )}

            {errors[field.id] && (
              <p style={styles.errorText}>↑ This field is required</p>
            )}
          </div>
        ))}

        {submitError && (
          <p style={{ ...styles.errorText, textAlign: "center", marginTop: 24 }}>
            {submitError}
          </p>
        )}

        <div style={styles.buttonRow}>
          {currentSection > 0 && (
            <button style={styles.btnSecondary} onClick={prev}>
              ← Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {currentSection < SECTIONS.length - 1 ? (
            <button style={styles.btnPrimary} onClick={next}>
              Continue →
            </button>
          ) : (
            <button
              style={{
                ...styles.btnPrimary,
                background: submitting ? "#3a352e" : "#c9a96e",
                color: submitting ? "#6b6459" : "#0a0a0a",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
