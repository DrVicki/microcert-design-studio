export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type Lesson = {
  id: string;
  studioId: string;
  number: number;
  module: number;
  title: string;
  principle: string;
  duration: string;
  summary: string;
  objective: string;
  readingTitle: string;
  reading: string[];
  moves: string[];
  activityTitle: string;
  activity: string;
  artifactPrompt: string;
  evidencePrompt: string;
  reflection: string;
  appliedCheck: string[];
  deliverable: string;
  sourceIds: string[];
};

export type Studio = {
  id: string;
  module: number;
  phase: string;
  title: string;
  question: string;
  outcome: string;
  project: string;
  image: string;
};

export const sources: Source[] = [
  {
    id: "S1",
    title: "About DeVry University",
    publisher: "DeVry University",
    url: "https://www.devry.edu/about.html",
    note: "Public institutional context. This course does not represent an internal approval policy or official DeVry endorsement.",
  },
  {
    id: "S2",
    title: "Higher Education Course Design Rubric, Seventh Edition",
    publisher: "Quality Matters",
    url: "https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric",
    note: "Course-design reference for alignment among objectives, assessment, materials, activities, technology, support, and accessibility. Use does not imply QM certification.",
  },
  {
    id: "S3",
    title: "Web Content Accessibility Guidelines (WCAG) 2.2",
    publisher: "World Wide Web Consortium",
    url: "https://www.w3.org/TR/WCAG22/",
    note: "Accessibility standard used here as a design and evaluation baseline for digital learning experiences.",
  },
  {
    id: "S4",
    title: "Open Badges",
    publisher: "1EdTech Consortium",
    url: "https://www.1edtech.org/standards/open-badges",
    note: "Credential interoperability reference for describing the achievement, criteria, issuer, recipient, and supporting evidence.",
  },
  {
    id: "S5",
    title: "Academic Quality and Learning Outcomes",
    publisher: "DeVry University",
    url: "https://www.devry.edu/online-programs/academics.html",
    note: "Public context for measurable outcomes, applied learning, assessment, and continuous improvement—not an internal micro-certification approval standard.",
  },
  {
    id: "S6",
    title: "Accreditation and Recognition",
    publisher: "DeVry University",
    url: "https://www.devry.edu/about/accreditation.html",
    note: "Institutional and named-program accreditation information. It must not be represented as accreditation or endorsement of a proposed micro-certification.",
  },
];

export const studios: Studio[] = [
  {
    id: "discover",
    module: 1,
    phase: "Research",
    title: "Discover the right promise",
    question: "What problem is worth credentialing?",
    outcome: "A bounded opportunity brief grounded in learner and institutional evidence.",
    project: "Project 1 · Opportunity Brief",
    image: "/manus-storage/module-research_bc88d7be.png",
  },
  {
    id: "architect",
    module: 2,
    phase: "Organize",
    title: "Architect the evidence path",
    question: "What must a learner do to prove the skill?",
    outcome: "An aligned competency, learning map, assessment blueprint, and credential record.",
    project: "Project 2 · Learning & Evidence Map",
    image: "/manus-storage/module-architecture_8739bf5c.png",
  },
  {
    id: "prototype",
    module: 3,
    phase: "Prototype",
    title: "Prototype the experience",
    question: "Which interaction pattern removes the most friction?",
    outcome: "A mobile-aware module prototype and a practical pilot test plan.",
    project: "Project 3 · Tested Experience Prototype",
    image: "/manus-storage/module-prototype_a890726b.png",
  },
  {
    id: "refine",
    module: 4,
    phase: "Refine + Evaluate",
    title: "Prove readiness",
    question: "Is the proposal teachable, usable, and reviewable?",
    outcome: "A review-ready dossier, evidence plan, and measured pilot recommendation.",
    project: "Capstone · Submission-Ready Dossier",
    image: "/manus-storage/module-evaluate_fed3c8d4.png",
  },
];

export const lessons: Lesson[] = [
  {
    id: "01-opportunity",
    studioId: "discover",
    number: 1,
    module: 1,
    title: "Frame the credential opportunity",
    principle: "Begin with a consequential learner need—not a topic.",
    duration: "25 min",
    summary: "Turn an interesting subject into a decision-ready problem statement with a specific audience, performance gap, and institutional value.",
    objective: "Draft a one-sentence opportunity statement that names the learner, the observable performance gap, the setting, and the value of closing it.",
    readingTitle: "A short credential needs a narrow promise",
    reading: [
      "Micro-certifications fail early when they begin as compressed courses: a broad topic, a pile of readings, and a badge added at the end. A credible proposal begins with a performance that matters. The designer should be able to say who is struggling, what they need to do differently, where that performance occurs, and why a short experience is the right response.",
      "The opportunity statement is a design constraint. It prevents the experience from drifting into awareness-only content and gives reviewers a clear reason to consider the proposal. Public DeVry information can provide institutional context, but only internal stakeholders can confirm current priorities, ownership, and approval routes [S1]. Treat assumptions as questions to verify rather than as institutional facts.",
      "Aim for one primary audience and one high-value capability. If the proposed credential requires several unrelated skills, multiple courses, or extensive supervised practice, it may not be micro-sized. Your first artifact is deliberately brief because every later decision should trace back to it.",
    ],
    moves: [
      "Name one learner population, not “all students.”",
      "Describe an observable performance, not awareness or exposure.",
      "Separate verified need evidence from stakeholder assumptions.",
    ],
    activityTitle: "Write the opportunity brief",
    activity: "Interview or consult one plausible stakeholder, review one nonconfidential signal of need, and draft a 60–90 word opportunity statement. Label each claim as verified, inferred, or still unknown.",
    artifactPrompt: "Paste your 60–90 word opportunity statement. Use this frame: For [specific learner], the proposed micro-certification will address [observable performance gap] in [context] so that [learner/institutional value].",
    evidencePrompt: "List the nonconfidential need signal and stakeholder perspective you used. Identify which claims still require verification.",
    reflection: "What would make a reviewer decide that this need belongs in a course, a co-curricular experience, a support resource, or no new credential at all?",
    appliedCheck: [
      "The audience is specific enough to recruit for a pilot.",
      "The need is expressed as an observable performance gap.",
      "Institutional assumptions are labeled for verification.",
    ],
    deliverable: "Opportunity statement, source-of-need note, open questions, and placement hypothesis.",
    sourceIds: ["S1"],
  },
  {
    id: "02-learner-journey",
    studioId: "discover",
    number: 2,
    module: 1,
    title: "Map the learner journey and friction",
    principle: "Design the whole path, not only the lesson screen.",
    duration: "30 min",
    summary: "Map entry, learning, practice, assessment, and credential issuance to find where a short experience could still become hard to finish.",
    objective: "Create an end-to-end learner journey with at least five stages, one accessibility consideration per stage, and the three most consequential friction points.",
    readingTitle: "Completion is a systems problem",
    reading: [
      "A micro-certification can be short in seat time and still feel long. Learners may struggle before the first lesson because eligibility, enrollment, device requirements, or time expectations are unclear. They may complete the content but fail to submit evidence, understand a retry policy, or locate the credential. The design object is the complete journey from invitation through proof and recognition.",
      "Map the visible learner steps and the backstage dependencies that support them. For each stage, ask what the learner knows, does, sees, and needs. Include mobile access, assistive technology, captions or transcripts, keyboard operation, cognitive load, and the ability to pause and resume. WCAG 2.2 provides testable digital accessibility criteria; it is more useful as an early design constraint than as a final compliance sweep [S3].",
      "Prioritize friction rather than documenting everything equally. A critical friction point blocks progress or undermines trust. A moderate one increases effort. A minor one is noticeable but recoverable. Your proposal should name the design responses for the highest-risk moments.",
    ],
    moves: [
      "Start before lesson one and end after credential receipt.",
      "Pair every learner action with a support or feedback need.",
      "Rank friction by consequence, not by how easy it is to fix.",
    ],
    activityTitle: "Build a seven-stage journey strip",
    activity: "Map discover → decide → enroll → learn → practice → demonstrate → receive/share. For each stage, record one learner question, one possible friction point, and one inclusive design response.",
    artifactPrompt: "Summarize your journey map. Name each stage and the three friction points that your design must resolve before pilot launch.",
    evidencePrompt: "Describe how you learned about these friction points—for example, prior course data, learner feedback, support tickets, observation, or stakeholder input. Do not include identifiable student information.",
    reflection: "Which friction point is most likely to cause a capable learner to stop, and what is the smallest design change that could prevent it?",
    appliedCheck: [
      "The map begins before instruction and ends after credential receipt.",
      "Accessibility and mobile use are considered throughout the journey.",
      "The top three friction points have named design responses.",
    ],
    deliverable: "Learner journey summary, prioritized friction register, and inclusive design responses.",
    sourceIds: ["S3"],
  },
  {
    id: "03-scope",
    studioId: "discover",
    number: 3,
    module: 1,
    title: "Set the competency boundary",
    principle: "Credential one coherent capability at a defensible level.",
    duration: "30 min",
    summary: "Define what the micro-certification proves, what it does not prove, and the prerequisites that keep the promise honest.",
    objective: "Write a competency statement with conditions, observable performance, quality criteria, boundaries, and entry assumptions.",
    readingTitle: "A badge is a claim",
    reading: [
      "Every credential makes a claim to learners, reviewers, and external audiences. A title such as “AI Fundamentals” or “Career Ready” is too broad to reveal what the holder can actually do. The competency statement must narrow the claim to a demonstrable performance and a level of independence that the assessment can support.",
      "Write the competency as performance under conditions. Then define quality criteria and exclusions. For example, a learner may be able to configure a small workflow with provided data and explain its limitations, but not deploy a production system. Boundaries protect the learner from overclaiming and help reviewers judge whether the duration is plausible.",
      "Open Badges guidance treats the achievement, criteria, issuer, recipient, and evidence as meaningful parts of a portable credential record [S4]. Even if a specific badge platform has not been selected, drafting these elements now exposes vague promises before they become marketing copy.",
    ],
    moves: [
      "Use a verb that can be seen in evidence.",
      "State conditions, quality, independence, and exclusions.",
      "Make the title no broader than the demonstrated capability.",
    ],
    activityTitle: "Draft the claim and its guardrails",
    activity: "Write one competency statement, three success criteria, two explicit non-claims, and the minimum prerequisite knowledge or experience. Run a “title honesty” check: could the title reasonably be interpreted as more than the evidence proves?",
    artifactPrompt: "Paste the competency statement, success criteria, prerequisites, non-claims, and a working credential title.",
    evidencePrompt: "Name the stakeholder or disciplinary source that should validate the competency level and boundaries before launch.",
    reflection: "What is the most tempting overclaim in this credential, and how will the assessment or title prevent it?",
    appliedCheck: [
      "The competency uses an observable performance verb.",
      "Success criteria define acceptable quality.",
      "Prerequisites and non-claims keep the scope honest.",
    ],
    deliverable: "Credential claim card: title, competency, criteria, prerequisites, boundaries, and validation owner.",
    sourceIds: ["S4"],
  },
  {
    id: "04-alignment",
    studioId: "architect",
    number: 4,
    module: 2,
    title: "Align outcome, practice, and evidence",
    principle: "If learners practice one thing and submit another, the credential is misaligned.",
    duration: "30 min",
    summary: "Create a backward-designed alignment chain from the credential claim to assessment evidence, practice, instruction, and feedback.",
    objective: "Build an alignment table that connects each success criterion to evidence, practice, feedback, and essential content.",
    readingTitle: "Traceability makes a short design credible",
    reading: [
      "Short experiences have little room for decorative content. Every reading, demonstration, discussion, and practice task should prepare learners to produce the evidence named by the competency. Begin with the final performance and success criteria, then work backward to the practice and instruction that make success possible.",
      "Quality Matters emphasizes alignment among measurable objectives, assessments, instructional materials, learning activities, and course technologies [S2]. You do not need to claim a formal Quality Matters review to use alignment as a design discipline. In a proposal, a compact traceability table lets reviewers see the logic without reading every lesson page.",
      "A strong table also reveals missing feedback. If the first time a learner sees the rubric is during the final assessment, the design is testing surprise rather than competence. Include at least one low-stakes rehearsal for each major criterion and name who or what provides useful feedback.",
    ],
    moves: [
      "Begin with evidence, then select instruction.",
      "Give every criterion a rehearsal before assessment.",
      "Remove content that cannot justify its place in the chain.",
    ],
    activityTitle: "Construct the alignment chain",
    activity: "For each competency criterion, identify: final evidence, one practice task, the feedback source, and only the essential content or example needed. Flag anything in the proposed experience that has no direct alignment.",
    artifactPrompt: "Summarize the rows of your alignment table: criterion → evidence → practice → feedback → essential content.",
    evidencePrompt: "Describe the disciplinary or stakeholder review needed to confirm that the evidence is authentic and the quality threshold is appropriate.",
    reflection: "Which proposed content item would be hardest to remove even though it does not support the credential claim? Why?",
    appliedCheck: [
      "Every criterion has corresponding final evidence.",
      "Every major criterion is rehearsed with feedback.",
      "Unaligned content has been removed or justified.",
    ],
    deliverable: "Backward-design alignment table and a list of content intentionally excluded from scope.",
    sourceIds: ["S2", "S5"],
  },
  {
    id: "05-sequence",
    studioId: "architect",
    number: 5,
    module: 2,
    title: "Shape the 3–5 module path",
    principle: "Progressive disclosure turns complexity into momentum.",
    duration: "35 min",
    summary: "Organize the experience into a small number of modules with predictable lesson anatomy, meaningful gates, and realistic pacing.",
    objective: "Produce a 3–5 module map with prerequisites, duration estimates, a consistent lesson pattern, and one artifact-producing activity per module.",
    readingTitle: "Chunk by decisions, not by chapter headings",
    reading: [
      "Module boundaries should correspond to meaningful changes in what the learner can do. A weak sequence mirrors a textbook table of contents. A stronger sequence moves from a simple performance to a more independent or integrated one, with each module producing evidence that supports the capstone.",
      "Use a predictable internal pattern: orient, model, practice, check, reflect, and contribute to the final artifact. Predictability reduces navigation effort, while progressive disclosure keeps future work visible without overwhelming the learner. Gates should protect learning dependencies—not merely enforce clicks.",
      "Estimate active time rather than video length alone. Include reading, practice, revision, and submission. For a micro-certification, the workload and claim must remain proportionate. If the essential sequence will not fit into three to five modules, narrow the competency or reconsider the format.",
    ],
    moves: [
      "Let each module produce a visible capability increment.",
      "Repeat a simple lesson rhythm so attention stays on learning.",
      "Use gates only where later performance depends on earlier work.",
    ],
    activityTitle: "Storyboard the learning path",
    activity: "Create a 3–5 module map. For each module, name the performance increment, estimated active time, model or example, practice, applied check, and contribution to the final evidence.",
    artifactPrompt: "Paste the module map with titles, time estimates, prerequisites, and the artifact contribution from each module.",
    evidencePrompt: "Explain how the total workload estimate was created and which assumptions need a pilot to verify.",
    reflection: "Where could a learner safely choose a different path, and where is sequence essential to the integrity of the credential?",
    appliedCheck: [
      "The design contains three to five coherent modules.",
      "Every module contributes to the final evidence.",
      "Time estimates include practice and revision, not only content viewing.",
    ],
    deliverable: "Module sequence map with timing, gates, repeated lesson anatomy, and capstone contributions.",
    sourceIds: ["S2"],
  },
  {
    id: "06-assessment-badge",
    studioId: "architect",
    number: 6,
    module: 2,
    title: "Design assessment and credential evidence",
    principle: "Issue the claim only when the evidence can carry it.",
    duration: "40 min",
    summary: "Specify authentic assessment, scoring, retries, human judgment, and the evidence fields that should accompany a portable credential.",
    objective: "Draft an assessment blueprint and credential metadata record that connect the achievement claim to criteria and verifiable evidence.",
    readingTitle: "Assessment is the credential’s trust layer",
    reading: [
      "A completion badge says the learner finished. A competency credential says the learner demonstrated. Decide which claim you intend to make, then select evidence that is authentic, observable, and reviewable. A polished artifact may still require an explanation of process or a short performance check to reveal independent judgment.",
      "Define the assessment conditions, criteria, scoring approach, feedback, retry path, and reviewer role. If automation contributes to scoring, specify the human review boundary and an escalation path. Accessibility accommodations should preserve the construct being assessed rather than introducing irrelevant barriers.",
      "For a portable badge record, draft a plain-language achievement description, criteria, issuer or owner, recipient identity approach, evidence pointer, issue date, and—where appropriate—expiration or renewal expectations [S4]. Platform selection can come later; evidence integrity cannot.",
    ],
    moves: [
      "Distinguish attendance, completion, and demonstrated competency.",
      "Publish criteria before the final attempt and include a retry path.",
      "Treat badge metadata as part of the academic claim.",
    ],
    activityTitle: "Build the assessment blueprint",
    activity: "Draft the assessment task, conditions, criteria, scoring rule, feedback source, retry policy, accommodations approach, and review owner. Then complete a provisional credential record with achievement, criteria, evidence, issuer/owner, and lifecycle notes.",
    artifactPrompt: "Paste the assessment blueprint and provisional credential metadata. State clearly whether the proposed award represents participation, completion, or competency.",
    evidencePrompt: "Describe what a reviewer would inspect to verify the learner’s achievement without exposing private or proprietary information.",
    reflection: "Which part of your assessment depends on expert judgment, and how will you make that judgment consistent enough to defend?",
    appliedCheck: [
      "The award type matches the evidence collected.",
      "Criteria, feedback, and retry expectations are explicit.",
      "Credential metadata connects the claim to verifiable evidence.",
    ],
    deliverable: "Assessment blueprint, scoring and retry plan, and provisional credential metadata record.",
    sourceIds: ["S2", "S4"],
  },
  {
    id: "07-pattern",
    studioId: "prototype",
    number: 7,
    module: 3,
    title: "Choose an interaction pattern",
    principle: "Prototype the shell before polishing the content.",
    duration: "30 min",
    summary: "Compare accordion, guided wizard, and mobile-first guided patterns against the learner journey and credential risk.",
    objective: "Select or combine interaction patterns using explicit criteria for control, sequence, accessibility, mobile use, and reviewability.",
    readingTitle: "The interface teaches learners how to proceed",
    reading: [
      "An accordion supports scanning and revisiting. A guided wizard protects sequence and makes progress visible. A mobile-first guided flow reduces interaction cost on small screens and supports short sessions. None is universally best; the pattern should answer the risks documented in the learner journey.",
      "Prototype at least two patterns at low fidelity. Use the same representative module and test the same tasks so the comparison is fair. Ask learners to find where to begin, resume after interruption, locate requirements, submit or revise evidence, and understand what remains.",
      "A hybrid often works: required core modules follow a guided path while optional resources remain open and browsable. Make the rule visible. A locked item should always explain the prerequisite and the next available action rather than behaving like a broken link.",
    ],
    moves: [
      "Compare patterns with the same task and content.",
      "Explain every gate and preserve a clear escape or return path.",
      "Choose the lightest structure that protects the credential.",
    ],
    activityTitle: "Run the pattern decision matrix",
    activity: "Score accordion, guided wizard, mobile-first guide, and one hybrid on clarity, sequence protection, accessibility, mobile usability, learner control, and implementation effort. Select one and state the tradeoff you accept.",
    artifactPrompt: "Paste the pattern scores, selected pattern or hybrid, and a short rationale tied to the journey’s highest-risk friction points.",
    evidencePrompt: "Name the representative learner tasks you will use to test the pattern and the devices or assistive technologies that matter most.",
    reflection: "What learner behavior would prove that your chosen navigation is too restrictive—or not restrictive enough?",
    appliedCheck: [
      "At least two patterns were compared using the same criteria.",
      "The selection directly addresses documented friction.",
      "Locked, optional, and completed states are defined.",
    ],
    deliverable: "Interaction-pattern decision matrix, rationale, and state definitions.",
    sourceIds: ["S3"],
  },
  {
    id: "08-module-prototype",
    studioId: "prototype",
    number: 8,
    module: 3,
    title: "Build one representative module",
    principle: "Prototype the hardest learning moment, not the welcome page.",
    duration: "45 min",
    summary: "Create a functional or clickable slice that includes orientation, content, practice, feedback, evidence capture, and a realistic mobile state.",
    objective: "Produce a representative module prototype that allows a learner to complete one meaningful task and receive actionable feedback.",
    readingTitle: "A useful prototype contains a complete learning loop",
    reading: [
      "A landing page can make a concept look finished while hiding the most important risks. Prototype a module that contains the hardest decision, interaction, or evidence requirement. The learner should encounter a goal, a model, an opportunity to practice, feedback, and a visible next step.",
      "Use realistic content density and realistic errors. Include a learner who needs to resume, a learner who does not pass the first check, and a learner using a small screen or keyboard. Do not postpone captions, focus order, labels, error identification, or target size until visual polish; these choices shape the component architecture [S3].",
      "The prototype can be a Canvas sandbox, clickable frame, simple webpage, or paper test if it supports the target tasks. Record design decisions and unresolved questions. The purpose is learning, not proving that the first idea was correct.",
    ],
    moves: [
      "Prototype one complete learning loop.",
      "Use realistic density, errors, and resume behavior.",
      "Treat accessibility as architecture, not decoration.",
    ],
    activityTitle: "Build the thin vertical slice",
    activity: "Create one representative module with overview, model or reading, practice, applied check, feedback, notebook or evidence capture, and next-step guidance. Include desktop and mobile states and a keyboard path.",
    artifactPrompt: "Provide a nonconfidential prototype link or description and summarize the complete learning loop it demonstrates. List the unresolved decisions separately.",
    evidencePrompt: "Describe the accessibility and mobile behaviors you implemented or simulated, including focus order, labels, captions/transcripts, errors, and resume state.",
    reflection: "Which design assumption became less certain after building the prototype, and what evidence would resolve it?",
    appliedCheck: [
      "The prototype includes goal, practice, feedback, evidence, and next step.",
      "A realistic error or retry state is represented.",
      "Mobile and keyboard paths are inspectable.",
    ],
    deliverable: "Representative module prototype description or link, accessibility notes, and unresolved design decisions.",
    sourceIds: ["S2", "S3"],
  },
  {
    id: "09-pilot",
    studioId: "prototype",
    number: 9,
    module: 3,
    title: "Plan a small, ethical pilot",
    principle: "A pilot answers decisions; it does not merely collect reactions.",
    duration: "35 min",
    summary: "Design a small pilot that compares intended outcomes with observed behavior while protecting learner privacy and time.",
    objective: "Write a pilot protocol with participants, tasks, measures, success thresholds, privacy safeguards, and decision rules.",
    readingTitle: "Measure behavior and meaning",
    reading: [
      "A pilot is useful when it changes a decision. Define the questions before inviting participants: Can learners find the next action? Can they complete the performance in the expected time? Does the evidence support consistent scoring? Where do they abandon, seek help, or misunderstand the claim?",
      "Use a small, relevant sample and collect the minimum information needed. Separate usability observations from learning evidence and satisfaction. A participant may enjoy a prototype without learning, or learn despite avoidable friction. Avoid collecting identifiable student information in ad hoc tools or including confidential artifacts in a design dossier.",
      "Set thresholds and responses in advance. For example: if fewer than four of five participants can resume without help, revise navigation; if scoring disagreement exceeds the acceptable range, revise criteria and calibration. Decision rules make evaluation actionable and reduce the temptation to explain away weak results.",
    ],
    moves: [
      "Begin with decisions the pilot must inform.",
      "Combine task evidence, learning evidence, and concise feedback.",
      "Set thresholds and revision actions before seeing results.",
    ],
    activityTitle: "Write the pilot protocol",
    activity: "Specify 3–8 representative participants, 4–6 tasks, measures for clarity, completion, time, accessibility, mobile use, and evidence quality, plus privacy language and decision thresholds. Include a short facilitator script.",
    artifactPrompt: "Paste the pilot question, participant profile, tasks, measures, thresholds, and the revision decision attached to each threshold.",
    evidencePrompt: "Explain what data you will not collect, how participant work will be de-identified, and who should review the pilot plan before recruitment.",
    reflection: "Which result would be most uncomfortable for the design team to receive, and how will the protocol keep that result visible?",
    appliedCheck: [
      "Every measure informs a named design decision.",
      "Success thresholds are set before data collection.",
      "Privacy, consent, and de-identification are addressed.",
    ],
    deliverable: "Pilot protocol, facilitator script outline, measures, thresholds, and privacy safeguards.",
    sourceIds: ["S2", "S3"],
  },
  {
    id: "10-accessibility",
    studioId: "refine",
    number: 10,
    module: 4,
    title: "Run the inclusive design pass",
    principle: "Test the experience where variation becomes friction.",
    duration: "40 min",
    summary: "Evaluate content, interaction, media, assessment, and support across keyboard, screen-size, sensory, and cognitive variations.",
    objective: "Complete an accessibility and mobile quality review with documented findings, owners, severity, and retest criteria.",
    readingTitle: "Conformance claims require evidence",
    reading: [
      "Accessibility is not a statement in the proposal; it is a set of test results and remediation responsibilities. Review structure, headings, link purpose, labels, focus visibility, keyboard operation, error messages, target sizes, color contrast, captions, transcripts, alternatives, timing, motion, and zoom or reflow behavior against applicable WCAG 2.2 criteria [S3].",
      "Automated tools can find some issues but cannot judge whether alt text teaches, whether instructions are understandable, whether focus order matches meaning, or whether an accommodation preserves the assessment construct. Pair automated checks with keyboard review, screen-reader sampling when possible, responsive testing, and human inspection.",
      "Record each finding with severity, affected learners, location, owner, fix, and retest status. High-impact barriers should block pilot launch. Lower-severity improvements may enter a tracked backlog, but they should not disappear into general notes.",
    ],
    moves: [
      "Test real tasks, not only isolated pages.",
      "Combine automated findings with human judgment.",
      "Give every barrier an owner and retest condition.",
    ],
    activityTitle: "Complete the readiness audit",
    activity: "Review the representative module on desktop and mobile at 200% zoom and by keyboard. Check media alternatives, labels, focus, errors, contrast, target size, timing, and motion. Record barriers and retest criteria.",
    artifactPrompt: "Summarize the audit: methods used, highest-severity findings, remediation owners, launch blockers, and retest status.",
    evidencePrompt: "List the pages, components, devices, browsers, and assistive-technology paths covered. Be explicit about what was not tested.",
    reflection: "Which barrier was easy to miss from the designer’s primary device or interaction style, and what process change will catch it earlier next time?",
    appliedCheck: [
      "The audit covers content, interaction, media, assessment, and support.",
      "Keyboard and responsive behavior were tested on complete tasks.",
      "Each finding has severity, owner, fix, and retest criteria.",
    ],
    deliverable: "Accessibility and mobile audit with coverage, findings, remediation ownership, and retest plan.",
    sourceIds: ["S3"],
  },
  {
    id: "11-lifecycle",
    studioId: "refine",
    number: 11,
    module: 4,
    title: "Define credential governance",
    principle: "A credential needs an owner after launch.",
    duration: "30 min",
    summary: "Specify academic ownership, issuance controls, evidence retention, review cadence, versioning, and retirement conditions.",
    objective: "Create a one-page governance plan that identifies accountable roles and lifecycle triggers for the learning experience and credential claim.",
    readingTitle: "Trust depends on operations",
    reading: [
      "A proposal can describe an excellent first offering and still be incomplete. Content changes, tools evolve, reviewers rotate, evidence links expire, and a once-useful competency may stop matching practice. Name an owner who can monitor the claim, assessment, learner support, and credential record after launch.",
      "Separate design authorship, academic or subject approval, delivery support, assessment review, technical administration, and credential issuance. One person may hold several roles, but the responsibilities should be visible. Draft a version identifier and review cadence, and define what changes require revalidation rather than silent editing.",
      "Credential records should remain meaningful to recipients and reviewers. Plan how evidence is referenced, protected, and retained; how errors are corrected; and when a credential might expire, be renewed, or be retired [S4]. Treat all choices as proposal items for institutional confirmation rather than assuming a DeVry process.",
    ],
    moves: [
      "Name the owner of the claim, not only the course shell.",
      "Version the experience, criteria, and credential metadata together.",
      "Define review, correction, renewal, and retirement triggers.",
    ],
    activityTitle: "Write the lifecycle card",
    activity: "Assign proposed roles for academic ownership, content maintenance, learner support, scoring/calibration, platform administration, and issuance. Add review cadence, versioning, evidence retention, correction, renewal, and retirement triggers.",
    artifactPrompt: "Paste the governance and lifecycle plan. Mark all role assignments or policies that require confirmation by authorized DeVry stakeholders.",
    evidencePrompt: "Name the operational conversations needed before launch and the records that would demonstrate ongoing quality after launch.",
    reflection: "If this credential were challenged one year after issuance, what documentation would you want to have preserved?",
    appliedCheck: [
      "Academic, operational, and issuance responsibilities are visible.",
      "Versioning and review triggers are defined.",
      "Unconfirmed institutional policies are labeled as decisions, not facts.",
    ],
    deliverable: "Governance card with roles, lifecycle triggers, evidence stewardship, and institutional decisions to confirm.",
    sourceIds: ["S1", "S4"],
  },
  {
    id: "12-dossier",
    studioId: "refine",
    number: 12,
    module: 4,
    title: "Assemble the review dossier",
    principle: "Make the decision easy to inspect—even when the answer is not yet yes.",
    duration: "50 min",
    summary: "Synthesize the opportunity, learning design, prototype evidence, accessibility findings, governance, and pilot recommendation into a concise proposal.",
    objective: "Produce a submission-ready dossier with explicit evidence, assumptions, risks, decision requests, and a practical pilot plan.",
    readingTitle: "A strong proposal exposes its reasoning",
    reading: [
      "Reviewers need more than enthusiasm and more than a finished-looking shell. They need a coherent chain: verified need → bounded competency → aligned evidence → usable experience → credible assessment → responsible operations. Keep the main narrative concise and move detailed maps, rubrics, and test notes into appendices or linked artifacts.",
      "Distinguish three states throughout the dossier: evidence already verified, a reasoned design decision, and an institutional question still requiring authority. This discipline prevents a prototype from being mistaken for an approved offering. It also allows reviewers to focus discussion on the true decisions rather than correcting implied policy.",
      "End with a bounded recommendation: decline, revise, prototype further, or run a limited pilot. Specify pilot audience, duration, support, measures, stop conditions, owners, and the evidence required for a scale decision. The dossier is a decision instrument—not a promise of approval.",
    ],
    moves: [
      "Lead with the decision and the evidence chain.",
      "Label verified facts, design judgments, and open authority questions.",
      "Ask for a bounded next step with owners and measures.",
    ],
    activityTitle: "Complete the capstone dossier",
    activity: "Review all prior notebook entries, remove duplication, resolve contradictions, and write a 150-word executive recommendation. Confirm that each claim points to evidence and each open policy question points to an authorized decision owner.",
    artifactPrompt: "Paste the executive recommendation: proposed credential, target learner, demonstrated capability, evidence approach, delivery pattern, pilot scope, main risks, and the exact decision requested.",
    evidencePrompt: "List the dossier attachments or links a reviewer should inspect and the nonconfidential evidence supporting pilot readiness.",
    reflection: "What is the strongest reason not to proceed yet, and what specific evidence or change would address it?",
    appliedCheck: [
      "The dossier traces need to competency, evidence, experience, and operations.",
      "Verified facts, design decisions, and open questions are visibly distinct.",
      "The recommendation requests a bounded next decision, not automatic approval.",
    ],
    deliverable: "Executive recommendation and complete proposal dossier with appendices, risks, decision requests, and pilot conditions.",
    sourceIds: ["S1", "S2", "S3", "S4", "S5", "S6"],
  },
];

export const capstoneSections = [
  "Executive recommendation and requested decision",
  "Opportunity brief and learner evidence",
  "Competency claim, boundaries, and prerequisites",
  "Alignment and module sequence",
  "Assessment blueprint and credential metadata",
  "Interaction-pattern rationale and prototype evidence",
  "Pilot protocol, measures, and decision thresholds",
  "Accessibility and mobile readiness audit",
  "Governance, lifecycle, risks, and open authority questions",
];

export const privacyReminder =
  "Do not enter or submit identifiable student information, protected education records, proprietary employer or client materials, credentials, financial information, or other sensitive data. Use de-identified summaries and links governed by approved institutional systems.";
