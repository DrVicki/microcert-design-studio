import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  FileSearch,
  Layers3,
  MessageSquareText,
  MousePointerClick,
  Smartphone,
  TestTubeDiagonal,
} from "lucide-react";

const steps = [
  ["Discover", "Need + learner", FileSearch],
  ["Architect", "Claim + evidence", Boxes],
  ["Prototype", "Pattern + module", MousePointerClick],
  ["Validate", "Access + pilot", TestTubeDiagonal],
  ["Propose", "Dossier + decision", BadgeCheck],
] as const;

export function JourneyStrip() {
  return (
    <section className="viz-card" aria-labelledby="journey-viz-title">
      <div className="viz-heading">
        <span className="mono-label">Standalone visual 01</span>
        <h3 id="journey-viz-title">The decision path</h3>
        <p>A reusable overview for a course landing page, Canvas introduction, or reviewer briefing.</p>
      </div>
      <div className="journey-strip" role="list" aria-label="Five-stage micro-certification design path">
        {steps.map(([label, note, Icon], index) => (
          <div className="journey-unit" role="listitem" key={label}>
            <div className="journey-step">
              <span className="journey-number">0{index + 1}</span>
              <Icon aria-hidden="true" />
              <strong>{label}</strong>
              <small>{note}</small>
            </div>
            {index < steps.length - 1 && <ArrowRight className="journey-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export function AlignmentChain() {
  const chain = [
    ["Credential claim", "What the learner can do", BadgeCheck],
    ["Assessment evidence", "What proves the claim", BookOpenCheck],
    ["Practice + feedback", "What prepares success", MessageSquareText],
    ["Essential instruction", "What earns its place", Layers3],
  ] as const;

  return (
    <section className="viz-card" aria-labelledby="alignment-viz-title">
      <div className="viz-heading">
        <span className="mono-label">Standalone visual 02</span>
        <h3 id="alignment-viz-title">Backward-design alignment chain</h3>
        <p>Read left to right when reviewing; design right to left when building.</p>
      </div>
      <div className="alignment-chain" role="list" aria-label="Alignment chain">
        {chain.map(([title, note, Icon], index) => (
          <div className="alignment-unit" role="listitem" key={title}>
            <div className="alignment-node">
              <Icon aria-hidden="true" />
              <div><strong>{title}</strong><small>{note}</small></div>
            </div>
            {index < chain.length - 1 && <span className="alignment-link" aria-hidden="true">⇄</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function PatternComparison() {
  const patterns = [
    { name: "Accordion", signal: "Revisit + learner control", Icon: Layers3, best: "Open enrichment or low-stakes review" },
    { name: "Guided wizard", signal: "Sequence + validation", Icon: MousePointerClick, best: "Required evidence and high-dependency tasks" },
    { name: "Mobile guide", signal: "Resume + low interaction cost", Icon: Smartphone, best: "Short sessions and phone-first access" },
  ];

  return (
    <section className="viz-card" aria-labelledby="pattern-viz-title">
      <div className="viz-heading">
        <span className="mono-label">Standalone visual 03</span>
        <h3 id="pattern-viz-title">Interaction pattern triad</h3>
        <p>Use the learner journey and credential risk to select one pattern or a deliberate hybrid.</p>
      </div>
      <div className="pattern-grid">
        {patterns.map(({ name, signal, Icon, best }) => (
          <article className="pattern-card" key={name}>
            <Icon aria-hidden="true" />
            <span>{signal}</span>
            <h4>{name}</h4>
            <p>{best}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReadinessLoop() {
  const dimensions = ["Clarity", "Learning evidence", "Accessibility", "Mobile usability", "Operations"];
  return (
    <section className="viz-card" aria-labelledby="readiness-viz-title">
      <div className="viz-heading">
        <span className="mono-label">Standalone visual 04</span>
        <h3 id="readiness-viz-title">Pilot-to-decision loop</h3>
        <p>Measure, revise, and retest against explicit thresholds before requesting scale.</p>
      </div>
      <div className="readiness-layout">
        <div className="readiness-orbit" aria-hidden="true">
          <div className="orbit-core"><Accessibility /><span>Ready?</span></div>
          <div className="orbit-ring orbit-one" />
          <div className="orbit-ring orbit-two" />
        </div>
        <ol className="readiness-list">
          {dimensions.map((dimension, index) => (
            <li key={dimension}><span>0{index + 1}</span><strong>{dimension}</strong><small>threshold → finding → owner → retest</small></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProcessVisuals() {
  return (
    <div className="visuals-stack">
      <JourneyStrip />
      <AlignmentChain />
      <PatternComparison />
      <ReadinessLoop />
    </div>
  );
}
