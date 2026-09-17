import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  GraduationCap,
  LockKeyhole,
  Menu,
  Moon,
  NotebookPen,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Timer,
  UserPlus,
  UserRoundCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ProcessVisuals } from "@/components/ProcessVisuals";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { capstoneSections, lessons, privacyReminder, sources, studios, type Lesson } from "@/data/course";
import { signatureDataUrl } from "@/data/signature";

type WorkEntry = {
  artifact: string;
  evidence: string;
  reflection: string;
  notes: string;
  checks: boolean[];
  completed: boolean;
  completedAt?: string;
};

type CourseState = {
  version: 1;
  learnerName: string;
  roleUnit: string;
  proposalTitle: string;
  pathway: "Curriculum" | "Co-curricular" | "Undecided";
  activeLessonId: string;
  work: Record<string, WorkEntry>;
};

type Section = "overview" | "course" | "notebook" | "visuals" | "dossier";

type Registration = {
  name: string;
  email: string;
  roleUnit: string;
  registeredAt: string;
};

const STORAGE_KEY = "microcert-design-studio-v1";
const REGISTRATION_KEY = "microcert-fieldbook-registration-v1";
const sectionValues: Section[] = ["overview", "course", "notebook", "visuals", "dossier"];

function sectionFromUrl(): Section {
  if (typeof window === "undefined") return "overview";
  const candidate = new URLSearchParams(window.location.search).get("view") as Section | null;
  return candidate && sectionValues.includes(candidate) ? candidate : "overview";
}

function loadRegistration(): Registration | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || "null") as Registration | null;
    return parsed?.name && parsed?.email && parsed?.roleUnit ? parsed : null;
  } catch {
    return null;
  }
}

const emptyEntry = (lesson: Lesson): WorkEntry => ({
  artifact: "",
  evidence: "",
  reflection: "",
  notes: "",
  checks: lesson.appliedCheck.map(() => false),
  completed: false,
});

const defaultState = (): CourseState => ({
  version: 1,
  learnerName: "",
  roleUnit: "",
  proposalTitle: "",
  pathway: "Undecided",
  activeLessonId: lessons[0].id,
  work: Object.fromEntries(lessons.map(lesson => [lesson.id, emptyEntry(lesson)])),
});

function loadState(): CourseState {
  if (typeof window === "undefined") return defaultState();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<CourseState> | null;
    if (!parsed || parsed.version !== 1) return defaultState();
    const fresh = defaultState();
    return {
      ...fresh,
      ...parsed,
      work: Object.fromEntries(
        lessons.map(lesson => [
          lesson.id,
          { ...emptyEntry(lesson), ...(parsed.work?.[lesson.id] || {}) },
        ]),
      ),
    };
  } catch {
    return defaultState();
  }
}

function safeName(value: string) {
  return (value || "learner")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "learner";
}

function downloadFile(filename: string, content: string, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function lessonFile(lesson: Lesson, entry: WorkEntry, state: CourseState) {
  return `DR. VICKI BEALMAN'S MICRO-CERTIFICATION FIELDBOOK\nMicro-Certification Design Studio\nCourse author and instructor: Dr. Vicki Bealman\nModule Studio ${lesson.module} · Lesson ${String(lesson.number).padStart(2, "0")}\n\nLEARNER\nName: ${state.learnerName || "Not entered"}\nRole / unit: ${state.roleUnit || "Not entered"}\nProposal title: ${state.proposalTitle || "Not entered"}\nPathway: ${state.pathway}\n\nLESSON\n${lesson.title}\nObjective: ${lesson.objective}\nStatus: ${entry.completed ? "Complete" : "In progress"}\nCompleted: ${entry.completedAt ? new Date(entry.completedAt).toLocaleString() : "—"}\n\nFIELD NOTES\n${entry.notes || "No notes entered."}\n\nDESIGN ARTIFACT\n${entry.artifact || "No artifact summary entered."}\n\nCOMPLETION EVIDENCE\n${entry.evidence || "No evidence entered."}\n\nREFLECTION\nQuestion: ${lesson.reflection}\nResponse: ${entry.reflection || "No reflection entered."}\n\nAPPLIED CHECK\n${lesson.appliedCheck.map((item, index) => `${entry.checks[index] ? "[x]" : "[ ]"} ${item}`).join("\n")}\n\nDELIVERABLE\n${lesson.deliverable}\n\nSOURCE NOTES\n${lesson.sourceIds.map(id => { const source = sources.find(item => item.id === id); return source ? `[${id}] ${source.title} — ${source.url}` : id; }).join("\n")}\n\nPRIVACY REMINDER\n${privacyReminder}\n\nThis file is upload-ready for a manually configured LMS assignment. It does not create a direct LMS integration or constitute institutional approval.\n`;
}

function dossierFile(state: CourseState) {
  const header = `# Micro-Certification Proposal Dossier\n\n**Fieldbook:** Dr. Vicki Bealman's Micro-Certification Fieldbook  \n**Course author and instructor:** Dr. Vicki Bealman  \n**Prepared by:** ${state.learnerName || "Not entered"}  \n**Role / unit:** ${state.roleUnit || "Not entered"}  \n**Working proposal title:** ${state.proposalTitle || "Not entered"}  \n**Proposed pathway:** ${state.pathway}  \n**Generated:** ${new Date().toLocaleString()}\n\n> This proposal dossier is prepared for consideration. It does not represent DeVry University approval, a formal institutional workflow, academic credit, accreditation, or a credential issuance decision.\n\n## Executive proposal dossier map\n\n${capstoneSections.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n`;
  const body = lessons.map(lesson => {
    const entry = state.work[lesson.id];
    return `\n---\n\n## ${String(lesson.number).padStart(2, "0")} · ${lesson.title}\n\n**Module Studio ${lesson.module}:** ${studios.find(studio => studio.id === lesson.studioId)?.title}  \n**Objective:** ${lesson.objective}  \n**Status:** ${entry.completed ? `Complete${entry.completedAt ? ` · ${new Date(entry.completedAt).toLocaleDateString()}` : ""}` : "In progress"}\n\n### Design artifact\n\n${entry.artifact || "_Not entered._"}\n\n### Evidence and open questions\n\n${entry.evidence || "_Not entered._"}\n\n### Reflection and design judgment\n\n**${lesson.reflection}**\n\n${entry.reflection || "_Not entered._"}\n\n### Working notes\n\n${entry.notes || "_No additional notes._"}\n\n### Applied check\n\n${lesson.appliedCheck.map((item, index) => `- ${entry.checks[index] ? "[x]" : "[ ]"} ${item}`).join("\n")}\n`;
  }).join("");
  const referenceBlock = `\n---\n\n## External design references\n\n${sources.map(source => `- [${source.id}] [${source.title}](${source.url}), ${source.publisher}. ${source.note}`).join("\n")}\n\n## Privacy and authority note\n\n${privacyReminder}\n\nInstitutional policies, owners, credit status, badge platform, review bodies, timelines, and implementation resources must be confirmed with authorized DeVry stakeholders.\n`;
  return `${header}${body}${referenceBlock}`;
}

function certificateFile(state: CourseState) {
  const issued = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Course Completion — ${state.learnerName || "Learner"}</title><style>@page{size:landscape;margin:0}*{box-sizing:border-box}body{margin:0;background:#0b1b31;color:#0b1b31;font-family:Arial,sans-serif}.page{width:11in;height:8.5in;margin:auto;padding:.45in;background:#efe6d3}.frame{height:100%;border:4px solid #0b1b31;outline:1px solid #b88a2e;outline-offset:-16px;padding:.55in;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}.eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#80601e}.mark{width:62px;height:62px;border-radius:50%;display:grid;place-items:center;background:#b88a2e;color:white;font-size:28px;margin:12px}.fieldbook{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#80601e;margin-bottom:6px}h1{font-family:Georgia,serif;font-size:41px;margin:0 0 10px}.name{font-family:Georgia,serif;font-size:32px;border-bottom:1px solid #b88a2e;padding:0 30px 6px;margin:6px}.copy{max-width:720px;font-size:15px;line-height:1.45;margin:7px}.signature{display:block;width:165px;height:auto;margin:4px auto -2px}.instructor{font-family:Georgia,serif;font-size:15px;color:#80601e}.details{display:flex;gap:48px;margin-top:14px;font-size:12px}.note{position:absolute;bottom:20px;left:56px;right:56px;font-size:9px;color:#59616d}@media print{body{background:white}.page{margin:0}}</style></head><body><main class="page"><section class="frame"><div class="eyebrow">Certificate of course completion</div><div class="mark">✓</div><div class="fieldbook">Dr. Vicki Bealman's Micro-Certification Fieldbook</div><h1>Micro-Certification Design Studio</h1><p class="copy">This acknowledges that</p><div class="name">${state.learnerName || "Learner name"}</div><p class="copy">completed all twelve applied lessons and assembled a proposal dossier for <strong>${state.proposalTitle || "a proposed micro-certification"}</strong>.</p><img class="signature" src="${signatureDataUrl}" alt="Scanned signature of Dr. Vicki Bealman"><div class="instructor">Course author and instructor · Dr. Vicki Bealman</div><div class="details"><span>${issued}</span><span>${state.pathway} pathway</span><span>12 / 12 lessons</span></div><p class="note">This is a local certificate of completion for this professional-learning design studio. It is not a DeVry University credential, approval, academic credit, accreditation, or authorization to issue a micro-certification.</p></section></main></body></html>`;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const requestedSection = sectionFromUrl();
  const initialRegistration = loadRegistration();
  const [state, setState] = useState<CourseState>(loadState);
  const [registration, setRegistration] = useState<Registration | null>(initialRegistration);
  const [registrationDraft, setRegistrationDraft] = useState<Registration>(initialRegistration || { name: "", email: "", roleUnit: "", registeredAt: "" });
  const [registrationOpen, setRegistrationOpen] = useState(requestedSection !== "overview" && !initialRegistration);
  const [pendingSection, setPendingSection] = useState<Section | null>(requestedSection !== "overview" && !initialRegistration ? requestedSection : null);
  const [section, setSection] = useState<Section>(requestedSection !== "overview" && !initialRegistration ? "overview" : requestedSection);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [notebookSearch, setNotebookSearch] = useState("");
  const [notebookStudio, setNotebookStudio] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completedCount = lessons.filter(lesson => state.work[lesson.id]?.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);
  const firstIncompleteIndex = lessons.findIndex(lesson => !state.work[lesson.id]?.completed);
  const maxOpenIndex = firstIncompleteIndex === -1 ? lessons.length - 1 : firstIncompleteIndex;
  const activeIndex = Math.max(0, lessons.findIndex(lesson => lesson.id === state.activeLessonId));
  const activeLesson = lessons[activeIndex] || lessons[0];
  const activeEntry = state.work[activeLesson.id];
  const activeStudio = studios.find(studio => studio.id === activeLesson.studioId)!;
  const allComplete = completedCount === lessons.length;
  const profileComplete = Boolean(state.learnerName.trim() && state.roleUnit.trim() && state.proposalTitle.trim() && state.pathway !== "Undecided");

  useEffect(() => {
    if (activeIndex > maxOpenIndex) {
      setState(current => ({ ...current, activeLessonId: lessons[maxOpenIndex].id }));
    }
  }, [activeIndex, maxOpenIndex]);

  const visibleNotebookLessons = useMemo(() => {
    const query = notebookSearch.trim().toLowerCase();
    return lessons.filter(lesson => {
      const entry = state.work[lesson.id];
      const matchesStudio = notebookStudio === "all" || lesson.studioId === notebookStudio;
      const haystack = `${lesson.title} ${entry.artifact} ${entry.evidence} ${entry.reflection} ${entry.notes}`.toLowerCase();
      return matchesStudio && (!query || haystack.includes(query));
    });
  }, [notebookSearch, notebookStudio, state.work]);

  const updateEntry = (lessonId: string, patch: Partial<WorkEntry>) => {
    setState(current => ({
      ...current,
      work: { ...current.work, [lessonId]: { ...current.work[lessonId], ...patch } },
    }));
  };

  const requestRegistration = (target: Section = "course") => {
    setPendingSection(target);
    setRegistrationDraft(registration || { name: "", email: "", roleUnit: "", registeredAt: "" });
    setRegistrationOpen(true);
    setMobileMenu(false);
  };

  const submitRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = registrationDraft.name.trim();
    const email = registrationDraft.email.trim();
    const roleUnit = registrationDraft.roleUnit.trim();
    if (!name || !roleUnit || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter your name, a valid email address, and your role, unit, or affiliation.");
      return;
    }
    const saved = { name, email, roleUnit, registeredAt: registration?.registeredAt || new Date().toISOString() };
    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(saved));
    setRegistration(saved);
    setState(current => ({ ...current, learnerName: current.learnerName || name, roleUnit: current.roleUnit || roleUnit }));
    setRegistrationOpen(false);
    const target = pendingSection || "course";
    setPendingSection(null);
    setSection(target);
    window.history.replaceState({}, "", `?view=${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Registration saved. The Fieldbook is unlocked in this browser.");
  };

  const setActiveLesson = (lessonId: string, index: number) => {
    if (!registration) {
      requestRegistration("course");
      return;
    }
    if (index > maxOpenIndex) {
      toast.info(`Complete Lesson ${String(maxOpenIndex + 1).padStart(2, "0")} to unlock this lesson.`);
      return;
    }
    setState(current => ({ ...current, activeLessonId: lessonId }));
    setSection("course");
    window.history.replaceState({}, "", "?view=course");
    setRailOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markComplete = () => {
    const filled = activeEntry.artifact.trim() && activeEntry.evidence.trim() && activeEntry.reflection.trim();
    const checked = activeEntry.checks.every(Boolean);
    if (!filled || !checked) {
      toast.error("Complete the artifact, evidence, reflection, and every applied check first.");
      return;
    }
    updateEntry(activeLesson.id, { completed: true, completedAt: new Date().toISOString() });
    toast.success(`Lesson ${String(activeLesson.number).padStart(2, "0")} complete. The next lesson is unlocked.`);
  };

  const reopenLesson = () => {
    const laterComplete = lessons.slice(activeIndex + 1).some(lesson => state.work[lesson.id].completed);
    if (laterComplete) {
      toast.info("This completion is preserved because later lessons already depend on it. You can still edit the notebook.");
      return;
    }
    updateEntry(activeLesson.id, { completed: false, completedAt: undefined });
  };

  const copyActivity = async () => {
    const copy = `${activeLesson.activityTitle}\n\n${activeLesson.activity}\n\nArtifact prompt: ${activeLesson.artifactPrompt}\n\nEvidence prompt: ${activeLesson.evidencePrompt}`;
    try {
      await navigator.clipboard.writeText(copy);
      toast.success("Activity copied to the clipboard.");
    } catch {
      toast.error("Clipboard access was unavailable. Select and copy the activity manually.");
    }
  };

  const navigateTo = (next: Section) => {
    if (next !== "overview" && !registration) {
      requestRegistration(next);
      return;
    }
    setSection(next);
    window.history.replaceState({}, "", next === "overview" ? window.location.pathname : `?view=${next}`);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCourse = () => {
    if (!registration) {
      requestRegistration("course");
      return;
    }
    const nextIndex = firstIncompleteIndex === -1 ? 0 : firstIncompleteIndex;
    setActiveLesson(lessons[nextIndex].id, nextIndex);
  };

  return (
    <div className="course-shell">
      <a className="skip-link" href="#main-content">Skip to course content</a>
      <header className="site-header">
        <button className="brand-lockup" onClick={() => navigateTo("overview")} aria-label="Go to course overview">
          <span className="brand-mark" aria-hidden="true"><span>MC</span></span>
          <span><strong>Design Studio</strong><small>Dr. Vicki Bealman&apos;s Micro-Certification Fieldbook</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {(["overview", "course", "notebook", "visuals", "dossier"] as Section[]).map(item => (
            <button key={item} className={section === item ? "active" : ""} onClick={() => navigateTo(item)}>
              {item === "course" ? "Module studios" : item === "dossier" ? "Proposal dossier" : item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-progress" aria-label={`${progress}% course complete`}>
            <span>{completedCount}/12</span><div><i style={{ width: `${progress}%` }} /></div>
          </div>
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <button className={`registration-button ${registration ? "registered" : ""}`} onClick={() => requestRegistration(section === "overview" ? "course" : section)} aria-label={registration ? `Update registration for ${registration.name}` : "Register to use the Fieldbook"}>
            {registration ? <UserRoundCheck /> : <UserPlus />}
            <span>{registration ? `Registered · ${registration.name.split(" ")[0]}` : "Register"}</span>
          </button>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(value => !value)} aria-label="Toggle navigation">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
        {mobileMenu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {(["overview", "course", "notebook", "visuals", "dossier"] as Section[]).map(item => (
              <button key={item} onClick={() => navigateTo(item)}>{item === "course" ? "Module studios" : item === "dossier" ? "Proposal dossier" : item}</button>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content">
        {section === "overview" && (
          <>
            <section className="hero-section">
              <img src="/manus-storage/hero-fieldbook_17c51be2.png" alt="Curriculum fieldbook with competency cards, assessment grids, compass, and credential seal" />
              <div className="hero-scrim" />
              <div className="hero-copy">
                <span className="hero-kicker"><Sparkles /> Build a Co-Curricular Experience Proposal for Review &amp; Implementation.</span>
                <h1>Design a micro-certification that earns the next conversation.</h1>
                <p>Research the need. Architect the evidence. Prototype the experience. Package a decision-ready dossier for DeVry University curriculum or co-curricular consideration.</p>
                <div className="hero-actions">
                  <Button size="lg" onClick={startCourse}>{!registration ? "Register to begin" : completedCount ? "Resume the studio" : "Begin module studio 1"}<ArrowRight /></Button>
                  <button className="text-action" onClick={() => navigateTo("dossier")}>Preview the proposal dossier <ChevronRight /></button>
                </div>
                <p className="hero-disclaimer">Independent professional-learning resource. Not an official DeVry course, policy, approval workflow, or credential.</p>
              </div>
              <div className="hero-ledger" aria-label="Course details">
                <div><span>04</span><small>module studios</small></div>
                <div><span>12</span><small>applied lessons</small></div>
                <div><span>6–8h</span><small>self-paced work</small></div>
                <div><span>01</span><small>proposal dossier</small></div>
              </div>
            </section>

            <section className="intro-section content-frame">
              <div className="section-index">01 / Course promise</div>
              <div className="intro-copy">
                <span className="mono-label">For instructional designers, faculty partners, and co-curricular leads</span>
                <h2>Leave with a bounded claim, a tested learning path, and evidence for a responsible pilot.</h2>
              </div>
              <div className="intro-aside">
                <p>The supplied five-phase process becomes four self-paced module studios. Each lesson creates a reusable piece of the capstone, so completion means more than reading.</p>
                <ul className="compact-list">
                  <li><Check /> Guided, sequential path with clear prerequisites</li>
                  <li><Check /> Browser-saved field notebook and lesson exports</li>
                  <li><Check /> Curriculum and co-curricular decision framing</li>
                  <li><Check /> Accessibility, badge evidence, and governance built in</li>
                </ul>
              </div>
            </section>

            <section className="instructor-section content-frame" aria-labelledby="instructor-title">
              <div className="instructor-portrait">
                <img src="/manus-storage/imageedit_7_3029739368_d76d8b4a.png" alt="Portrait of Dr. Vicki Bealman" />
                <span aria-hidden="true">VB</span>
              </div>
              <div className="instructor-copy">
                <span className="section-index">02 / Your instructor</span>
                <span className="mono-label">Course author · fieldbook guide</span>
                <h2 id="instructor-title">Dr. Vicki Bealman</h2>
                <p>Dr. Bealman guides this design studio as an evidence-led working session. Her fieldbook structure helps instructional designers turn an initial co-curricular concept into a bounded learner promise, a testable experience, and a proposal dossier prepared for responsible review and implementation planning.</p>
                <blockquote>“Make the decision easy to inspect—even when the answer is not yet yes.”</blockquote>
                <div className="instructor-signature" aria-label="Dr. Vicki Bealman, course author and instructor">
                  <img src="/manus-storage/VickiEditedSignature_a495cde7.png" alt="Scanned signature of Dr. Vicki Bealman" />
                  <small>Dr. Vicki Bealman · Micro-Certification Fieldbook</small>
                </div>
              </div>
            </section>

            <section className="method-band">
              <div className="content-frame method-grid">
                <div>
                  <span className="section-index light">03 / Working method</span>
                  <h2>Learn → build → test → decide</h2>
                </div>
                <p>Every module studio combines a concise reading, three design moves, one authentic activity, an applied readiness check, a notebook artifact, and a project milestone.</p>
                <div className="method-steps">
                  {["Learn the decision", "Build the artifact", "Test the assumption", "Record the evidence", "Request the next decision"].map((item, index) => (
                    <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
                  ))}
                </div>
              </div>
            </section>

            <section className="studio-section content-frame">
              <div className="section-heading-row">
                <div><span className="section-index">04 / Module studios</span><h2>Four studios. One continuous proposal dossier.</h2></div>
                <p>Later lessons stay visibly locked until the current applied work is complete. Finished lessons remain editable without losing their completion record.</p>
              </div>
              <div className="studio-grid">
                {studios.map((studio, index) => {
                  const studioLessons = lessons.filter(lesson => lesson.studioId === studio.id);
                  const studioComplete = studioLessons.filter(lesson => state.work[lesson.id].completed).length;
                  const firstLessonIndex = lessons.findIndex(lesson => lesson.studioId === studio.id);
                  const locked = firstLessonIndex > maxOpenIndex;
                  return (
                    <article className="studio-card" key={studio.id}>
                      <div className="studio-image"><img src={studio.image} alt="" /><span>Module Studio {studio.module}</span></div>
                      <div className="studio-card-body">
                        <div className="studio-meta"><span>{studio.phase}</span><span>{studioComplete}/3 complete</span></div>
                        <h3>{studio.title}</h3>
                        <p className="studio-question">{studio.question}</p>
                        <p>{studio.outcome}</p>
                        <div className="studio-project"><FileArchive />{studio.project}</div>
                        <button className="card-action" onClick={() => setActiveLesson(studioLessons[0].id, firstLessonIndex)}>
                          {locked ? <><LockKeyhole /> Complete earlier lessons</> : <><span>{studioComplete ? "Open studio" : "Start studio"}</span><ArrowRight /></>}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="capstone-callout content-frame">
              <div className="capstone-number">CAP<br />STONE</div>
              <div>
                <span className="mono-label">The finished work</span>
                <h2>A concise proposal dossier—not a decorative course mockup.</h2>
                <p>Your export organizes the institutional fit, learner need, credential claim, alignment, assessment, prototype evidence, pilot measures, accessibility audit, governance, risks, and exact decision requested.</p>
              </div>
              <button onClick={() => navigateTo("dossier")}><ClipboardCheck /> View readiness gates</button>
            </section>

            <section className="source-section content-frame">
              <div className="section-heading-row">
                <div><span className="section-index">05 / Evidence base</span><h2>Built on external standards, not invented policy.</h2></div>
                <p>Institutional decisions still require authorized DeVry review. These public sources provide context and design references—not approval.</p>
              </div>
              <div className="source-grid">
                {sources.map(source => (
                  <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="source-card">
                    <span>{source.id}</span><div><strong>{source.publisher}</strong><h3>{source.title}</h3><p>{source.note}</p></div><ExternalLink />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {section === "course" && (
          <section className="workspace-layout">
            <button className="rail-toggle" onClick={() => setRailOpen(value => !value)}><PanelLeftClose /> Course map</button>
            <aside className={`course-rail ${railOpen ? "open" : ""}`} aria-label="Lesson sequence">
              <div className="rail-header">
                <div><span className="mono-label">Your fieldbook</span><strong>{progress}% complete</strong></div>
                <div className="rail-progress"><i style={{ width: `${progress}%` }} /></div>
              </div>
              {studios.map(studio => (
                <div className="rail-studio" key={studio.id}>
                  <div className="rail-studio-title"><span>M{studio.module}</span><div><small>{studio.phase}</small><strong>{studio.title}</strong></div></div>
                  {lessons.filter(lesson => lesson.studioId === studio.id).map(lesson => {
                    const index = lessons.findIndex(item => item.id === lesson.id);
                    const locked = index > maxOpenIndex;
                    const complete = state.work[lesson.id].completed;
                    const active = lesson.id === activeLesson.id;
                    return (
                      <button className={`rail-lesson ${active ? "active" : ""} ${complete ? "complete" : ""}`} key={lesson.id} onClick={() => setActiveLesson(lesson.id, index)} aria-current={active ? "step" : undefined}>
                        <span>{complete ? <Check /> : locked ? <LockKeyhole /> : String(lesson.number).padStart(2, "0")}</span>
                        <div><strong>{lesson.title}</strong><small>{lesson.duration}{locked ? " · prerequisite required" : ""}</small></div>
                      </button>
                    );
                  })}
                </div>
              ))}
              <button className="rail-notebook" onClick={() => navigateTo("notebook")}><NotebookPen /> Open full field notebook</button>
            </aside>

            <article className="lesson-workspace">
              <div className="lesson-masthead">
                <div>
                  <span className="mono-label">Module Studio {activeLesson.module} · {activeStudio.phase}</span>
                  <p className="principle">{activeLesson.principle}</p>
                  <h1>{activeLesson.title}</h1>
                  <p>{activeLesson.summary}</p>
                  <div className="lesson-tags"><span><Timer /> {activeLesson.duration}</span><span><Target /> Applied artifact</span><span><BookOpen /> Lesson {String(activeLesson.number).padStart(2, "0")} of 12</span></div>
                </div>
                <img src={activeStudio.image} alt="" />
              </div>

              <section className="lesson-section objective-panel">
                <span className="section-index">Objective</span>
                <h2>{activeLesson.objective}</h2>
              </section>

              <section className="lesson-section reading-panel">
                <span className="section-index">Reading / {activeLesson.readingTitle}</span>
                <div className="reading-columns">
                  {activeLesson.reading.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </section>

              <section className="lesson-section moves-panel">
                <span className="section-index">Three moves to keep</span>
                <div className="moves-grid">
                  {activeLesson.moves.map((move, index) => <div key={move}><span>0{index + 1}</span><p>{move}</p></div>)}
                </div>
              </section>

              <section className="lesson-section activity-panel">
                <div className="activity-header">
                  <div><span className="section-index">Design activity</span><h2>{activeLesson.activityTitle}</h2></div>
                  <button onClick={copyActivity}><Copy /> Copy activity</button>
                </div>
                <p>{activeLesson.activity}</p>
              </section>

              <section className="lesson-section notebook-panel">
                <div className="notebook-heading">
                  <div><span className="section-index">Field notebook</span><h2>Build the dossier while you learn.</h2></div>
                  <span className="autosave"><CheckCircle2 /> Saved in this browser</span>
                </div>
                <div className="privacy-note"><ShieldCheck /> <p><strong>Use de-identified evidence.</strong> {privacyReminder}</p></div>
                <label>
                  <span>Working notes <small>optional observations, questions, and links</small></span>
                  <textarea value={activeEntry.notes} onChange={event => updateEntry(activeLesson.id, { notes: event.target.value })} placeholder="Capture context you may need when assembling the dossier…" />
                </label>
                <label>
                  <span>Design artifact <small>required</small></span>
                  <em>{activeLesson.artifactPrompt}</em>
                  <textarea value={activeEntry.artifact} onChange={event => updateEntry(activeLesson.id, { artifact: event.target.value })} placeholder="Draft the lesson artifact here…" />
                </label>
                <label>
                  <span>Completion evidence <small>required · nonconfidential summary</small></span>
                  <em>{activeLesson.evidencePrompt}</em>
                  <textarea value={activeEntry.evidence} onChange={event => updateEntry(activeLesson.id, { evidence: event.target.value })} placeholder="Describe the evidence and unresolved questions…" />
                </label>
                <label>
                  <span>Reflection <small>required</small></span>
                  <em>{activeLesson.reflection}</em>
                  <textarea value={activeEntry.reflection} onChange={event => updateEntry(activeLesson.id, { reflection: event.target.value })} placeholder="Record the judgment you want reviewers to understand…" />
                </label>
              </section>

              <section className="lesson-section check-panel">
                <span className="section-index">Applied check</span>
                <h2>Confirm readiness before advancing.</h2>
                <div className="check-list">
                  {activeLesson.appliedCheck.map((item, index) => (
                    <label key={item} className={activeEntry.checks[index] ? "checked" : ""}>
                      <input type="checkbox" checked={activeEntry.checks[index]} onChange={event => {
                        const checks = [...activeEntry.checks];
                        checks[index] = event.target.checked;
                        updateEntry(activeLesson.id, { checks });
                      }} />
                      <span><Check /></span><p>{item}</p>
                    </label>
                  ))}
                </div>
                <div className="deliverable-note"><FileText /><div><strong>Lesson deliverable</strong><p>{activeLesson.deliverable}</p></div></div>
                <div className="lesson-actions">
                  <button className="secondary-action" onClick={() => downloadFile(`${safeName(state.learnerName)}-lesson-${String(activeLesson.number).padStart(2, "0")}.txt`, lessonFile(activeLesson, activeEntry, state))}><Download /> Download lesson file</button>
                  {activeEntry.completed ? (
                    <button className="complete-action completed" onClick={reopenLesson}><CheckCircle2 /> Completed {activeEntry.completedAt ? new Date(activeEntry.completedAt).toLocaleDateString() : ""}</button>
                  ) : (
                    <button className="complete-action" onClick={markComplete}>Complete lesson <ArrowRight /></button>
                  )}
                </div>
              </section>

              <div className="lesson-pagination">
                <button disabled={activeIndex === 0} onClick={() => setActiveLesson(lessons[activeIndex - 1].id, activeIndex - 1)}><ArrowLeft /> Previous</button>
                <span>{String(activeLesson.number).padStart(2, "0")} / 12</span>
                <button disabled={activeIndex >= maxOpenIndex || activeIndex === lessons.length - 1} onClick={() => setActiveLesson(lessons[activeIndex + 1].id, activeIndex + 1)}>Next <ArrowRight /></button>
              </div>
            </article>
          </section>
        )}

        {section === "notebook" && (
          <section className="utility-page content-frame">
            <div className="utility-hero">
              <div><span className="section-index">Field notebook</span><h1>Your design reasoning, organized by lesson.</h1><p>Search, review, revise, and export the evidence behind your proposal. Entries remain in this browser until you clear its storage.</p></div>
              <div className="notebook-stat"><span>{completedCount}</span><small>artifacts marked complete</small></div>
            </div>
            <div className="identity-card">
              <div className="identity-heading"><span className="mono-label">Proposal dossier identity</span><p>These fields appear in lesson downloads, the combined proposal dossier, and the local completion certificate.</p></div>
              <div className="identity-grid">
                <label><span>Your name</span><input value={state.learnerName} onChange={event => setState(current => ({ ...current, learnerName: event.target.value }))} placeholder="Full name" /></label>
                <label><span>Role / unit</span><input value={state.roleUnit} onChange={event => setState(current => ({ ...current, roleUnit: event.target.value }))} placeholder="Instructional designer, college, team…" /></label>
                <label><span>Working proposal title</span><input value={state.proposalTitle} onChange={event => setState(current => ({ ...current, proposalTitle: event.target.value }))} placeholder="Specific capability + audience" /></label>
                <label><span>Proposed pathway</span><select value={state.pathway} onChange={event => setState(current => ({ ...current, pathway: event.target.value as CourseState["pathway"] }))}><option value="Undecided">Undecided</option><option value="Curriculum">Curriculum</option><option value="Co-curricular">Co-curricular</option></select></label>
              </div>
            </div>
            <div className="notebook-tools">
              <label className="search-control"><Search /><span className="sr-only">Search notebook</span><input value={notebookSearch} onChange={event => setNotebookSearch(event.target.value)} placeholder="Search notes and artifacts" /></label>
              <label><span className="sr-only">Filter by module studio</span><select value={notebookStudio} onChange={event => setNotebookStudio(event.target.value)}><option value="all">All module studios</option>{studios.map(studio => <option value={studio.id} key={studio.id}>Module Studio {studio.module} · {studio.phase}</option>)}</select></label>
              <button onClick={() => downloadFile(`${safeName(state.learnerName)}-course-backup.json`, JSON.stringify(state, null, 2), "application/json")}><Download /> Export backup</button>
            </div>
            <div className="notebook-list">
              {visibleNotebookLessons.map(lesson => {
                const entry = state.work[lesson.id];
                return (
                  <article className="notebook-entry" key={lesson.id}>
                    <div className="entry-index"><span>{String(lesson.number).padStart(2, "0")}</span><small>M{lesson.module}</small></div>
                    <div className="entry-body">
                      <div className="entry-heading"><div><span className="mono-label">{entry.completed ? "Complete" : "In progress"}</span><h2>{lesson.title}</h2></div><button onClick={() => setActiveLesson(lesson.id, lessons.findIndex(item => item.id === lesson.id))}>Open lesson <ArrowRight /></button></div>
                      <div className="entry-columns"><div><strong>Artifact</strong><p>{entry.artifact || "No artifact drafted yet."}</p></div><div><strong>Evidence</strong><p>{entry.evidence || "No evidence recorded yet."}</p></div><div><strong>Reflection</strong><p>{entry.reflection || "No reflection recorded yet."}</p></div></div>
                    </div>
                  </article>
                );
              })}
              {!visibleNotebookLessons.length && <div className="empty-state">No notebook entries match this search.</div>}
            </div>
          </section>
        )}

        {section === "visuals" && (
          <section className="utility-page content-frame">
            <div className="utility-hero">
              <div><span className="section-index">Reusable visual library</span><h1>Four standalone explainers for your LMS build.</h1><p>These diagrams are intentionally separate from lesson copy so designers can adapt them as overview, orientation, review, or faculty-development components.</p></div>
              <div className="notebook-stat"><span>04</span><small>responsive components</small></div>
            </div>
            <ProcessVisuals />
          </section>
        )}

        {section === "dossier" && (
          <section className="utility-page dossier-page content-frame">
            <div className="utility-hero">
              <div><span className="section-index">Proposal dossier + completion</span><h1>Assemble the decision-ready proposal dossier.</h1><p>The combined Markdown export is structured for review and manual transfer into a document, project space, or LMS assignment.</p></div>
              <div className={`dossier-seal ${allComplete ? "ready" : ""}`}><BadgeCheck /><span>{allComplete ? "Ready" : `${progress}%`}</span><small>{allComplete ? "for export" : "course progress"}</small></div>
            </div>
            <div className="dossier-grid">
              <div className="dossier-main">
                <section className="dossier-card">
                  <span className="mono-label">Proposal dossier architecture</span>
                  <h2>Nine sections, traced to twelve artifacts.</h2>
                  <ol className="capstone-list">{capstoneSections.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
                </section>
                <section className="dossier-card readiness-card">
                  <span className="mono-label">Readiness gates</span>
                  <h2>Complete the work before presenting the claim.</h2>
                  <div className="gate-list">
                    <div className={profileComplete ? "done" : ""}>{profileComplete ? <Check /> : <span>1</span>}<p><strong>Identify the proposal</strong> Add your name, role/unit, working title, and intended pathway in the notebook.</p></div>
                    <div className={completedCount >= 3 ? "done" : ""}>{completedCount >= 3 ? <Check /> : <span>2</span>}<p><strong>Bound the opportunity</strong> Complete Module Studio 1 and verify the need, journey, and credential claim.</p></div>
                    <div className={completedCount >= 6 ? "done" : ""}>{completedCount >= 6 ? <Check /> : <span>3</span>}<p><strong>Align the evidence</strong> Complete Module Studio 2 and connect outcomes, practice, assessment, and badge metadata.</p></div>
                    <div className={completedCount >= 9 ? "done" : ""}>{completedCount >= 9 ? <Check /> : <span>4</span>}<p><strong>Test the experience</strong> Complete Module Studio 3 and document the pattern, prototype, and pilot protocol.</p></div>
                    <div className={allComplete ? "done" : ""}>{allComplete ? <Check /> : <span>5</span>}<p><strong>Prove readiness</strong> Complete Module Studio 4 and name barriers, governance, risks, and the exact decision requested.</p></div>
                  </div>
                </section>
              </div>
              <aside className="export-panel">
                <span className="mono-label">Export desk</span>
                <h2>{allComplete ? "Your proposal dossier is ready." : `${lessons.length - completedCount} lessons remain.`}</h2>
                <p>Exports contain your own entries plus the relevant prompts, checks, source notes, privacy warning, and status.</p>
                <div className="export-progress"><div><i style={{ width: `${progress}%` }} /></div><span>{progress}%</span></div>
                <button disabled={!allComplete || !profileComplete} onClick={() => downloadFile(`${safeName(state.learnerName)}-microcert-proposal-dossier.md`, dossierFile(state), "text/markdown;charset=utf-8")}><FileArchive /> Download proposal dossier</button>
                <button disabled={!allComplete || !profileComplete} onClick={() => downloadFile(`${safeName(state.learnerName)}-course-completion.html`, certificateFile(state), "text/html;charset=utf-8")}><GraduationCap /> Download completion certificate</button>
                {!profileComplete && <p className="export-hint">Add dossier identity fields in the notebook to personalize exports.</p>}
                {!allComplete && <p className="export-hint">All twelve lessons must be complete before capstone and certificate actions unlock.</p>}
                <div className="credential-boundary"><ShieldCheck /><p><strong>Credential boundary</strong> The completion certificate recognizes work in this design studio only. It is not a DeVry credential, academic credit, proposal approval, or authorization to issue a badge.</p></div>
              </aside>
            </div>
          </section>
        )}
      </main>

      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="registration-dialog overflow-hidden rounded-none border-0 p-0 sm:max-w-xl">
          <DialogHeader>
            <span className="registration-eyebrow"><UserPlus /> Required before entry</span>
            <DialogTitle>Register to use the Fieldbook</DialogTitle>
            <DialogDescription>Complete this one-time registration to unlock the Module Studios, Notebook, Visuals, and Proposal Dossier in this browser.</DialogDescription>
          </DialogHeader>
          <form className="registration-form" onSubmit={submitRegistration}>
            <label>
              <span>Full name</span>
              <input required autoComplete="name" value={registrationDraft.name} onChange={event => setRegistrationDraft(current => ({ ...current, name: event.target.value }))} placeholder="Your full name" />
            </label>
            <label>
              <span>Email address</span>
              <input required type="email" autoComplete="email" value={registrationDraft.email} onChange={event => setRegistrationDraft(current => ({ ...current, email: event.target.value }))} placeholder="name@example.edu" />
            </label>
            <label>
              <span>Role, unit, or affiliation</span>
              <input required autoComplete="organization-title" value={registrationDraft.roleUnit} onChange={event => setRegistrationDraft(current => ({ ...current, roleUnit: event.target.value }))} placeholder="Instructional Design, Student Affairs, Faculty…" />
            </label>
            <div className="registration-privacy"><ShieldCheck /><p><strong>Local registration.</strong> These details are saved only in this browser and are not transmitted by this static Fieldbook. Use an approved institutional registration system if centralized records are required.</p></div>
            <Button type="submit">{registration ? "Update registration" : "Register and enter the Fieldbook"}<ArrowRight /></Button>
          </form>
        </DialogContent>
      </Dialog>

      <footer>
        <div><strong>Dr. Vicki Bealman&apos;s Micro-Certification Fieldbook</strong><p>Independent instructional-design resource prepared for DeVry University curriculum and co-curricular consideration.</p></div>
        <div><span>Research → Organize → Prototype → Refine → Evaluate</span><p>Work is saved locally in the current browser. Keep confidential source files in approved institutional systems.</p></div>
      </footer>
    </div>
  );
}
