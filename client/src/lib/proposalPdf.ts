import { jsPDF } from "jspdf";
import { capstoneSections, lessons, privacyReminder, sources, studios } from "@/data/course";
import { signatureDataUrl } from "@/data/signature";

type PdfWorkEntry = {
  artifact: string;
  evidence: string;
  reflection: string;
  notes: string;
  checks: boolean[];
  completed: boolean;
  completedAt?: string;
};

export type ProposalPdfState = {
  learnerName: string;
  roleUnit: string;
  proposalTitle: string;
  pathway: "Curriculum" | "Co-curricular" | "Undecided";
  work: Record<string, PdfWorkEntry>;
};

const COLORS = {
  navy: [11, 27, 49] as const,
  gold: [184, 138, 46] as const,
  ink: [16, 35, 61] as const,
  muted: [83, 97, 115] as const,
  paper: [243, 237, 223] as const,
  white: [255, 255, 255] as const,
  line: [202, 188, 155] as const,
  green: [37, 124, 91] as const,
};

function safeName(value: string) {
  return (value || "learner")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "learner";
}

export function proposalPdfFilename(state: ProposalPdfState) {
  return `${safeName(state.learnerName)}-microcert-proposal-dossier.pdf`;
}

export function proposalCompletionDate(state: ProposalPdfState) {
  const timestamps = Object.values(state.work)
    .filter(entry => entry.completed && entry.completedAt)
    .map(entry => new Date(entry.completedAt as string).getTime())
    .filter(timestamp => Number.isFinite(timestamp));
  return timestamps.length ? new Date(Math.max(...timestamps)) : new Date();
}

export function formatProposalCompletionDate(state: ProposalPdfState, locale?: string) {
  return proposalCompletionDate(state).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function createProposalDossierPdf(state: ProposalPdfState) {
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 54;
  const contentWidth = pageWidth - margin * 2;
  const completionDate = formatProposalCompletionDate(state);
  let y = margin;

  const setText = (color: readonly [number, number, number]) => doc.setTextColor(color[0], color[1], color[2]);
  const setFill = (color: readonly [number, number, number]) => doc.setFillColor(color[0], color[1], color[2]);
  const setDraw = (color: readonly [number, number, number]) => doc.setDrawColor(color[0], color[1], color[2]);

  const addPage = () => {
    doc.addPage();
    setFill(COLORS.paper);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = margin;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 62) addPage();
  };

  const addLabel = (text: string) => {
    ensureSpace(20);
    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    setText(COLORS.gold);
    doc.text(text.toUpperCase(), margin, y);
    y += 30;
  };

  const addHeading = (text: string, size = 22) => {
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    setText(COLORS.ink);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    ensureSpace(lines.length * size * 1.15 + 10);
    doc.text(lines, margin, y);
    y += lines.length * size * 1.15 + 10;
  };

  const addBody = (text: string, options?: { bold?: boolean; color?: readonly [number, number, number]; indent?: number; gap?: number }) => {
    const indent = options?.indent ?? 0;
    doc.setFont("helvetica", options?.bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    setText(options?.color ?? COLORS.ink);
    const lines = doc.splitTextToSize(text || "Not entered.", contentWidth - indent) as string[];
    for (const line of lines) {
      ensureSpace(15);
      doc.text(line, margin + indent, y);
      y += 14.5;
    }
    y += options?.gap ?? 8;
  };

  const addRule = () => {
    ensureSpace(16);
    setDraw(COLORS.line);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
  };

  doc.setProperties({
    title: `${state.proposalTitle || "Micro-Certification"} — Proposal Dossier`,
    subject: "Completed Micro-Certification Proposal Dossier",
    author: state.learnerName || "Fieldbook participant",
    creator: "Dr. Vicki Bealman's Micro-Certification Fieldbook",
    keywords: "micro-certification, co-curricular, curriculum, proposal dossier",
  });

  setFill(COLORS.navy);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  setFill(COLORS.gold);
  doc.rect(margin, 54, 48, 5, "F");
  doc.setFont("courier", "bold");
  doc.setFontSize(9);
  setText(COLORS.gold);
  doc.text("DR. VICKI BEALMAN'S MICRO-CERTIFICATION FIELDBOOK", margin, 85);
  doc.setFont("times", "bold");
  doc.setFontSize(39);
  setText(COLORS.white);
  const coverTitle = doc.splitTextToSize("Micro-Certification Proposal Dossier", contentWidth) as string[];
  doc.text(coverTitle, margin, 150);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(15);
  setText([205, 216, 227]);
  const proposalTitle = doc.splitTextToSize(state.proposalTitle || "Untitled proposal", contentWidth) as string[];
  doc.text(proposalTitle, margin, 270);
  setDraw(COLORS.gold);
  doc.setLineWidth(1);
  doc.line(margin, 326, pageWidth - margin, 326);
  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  setText(COLORS.gold);
  doc.text("COMPLETED BY", margin, 357);
  const participantName = state.learnerName || "Participant name not entered";
  const participantNameSize = participantName.length > 60 ? 20 : participantName.length > 36 ? 24 : 29;
  doc.setFont("times", "bold");
  doc.setFontSize(participantNameSize);
  setText(COLORS.white);
  const participantNameLines = doc.splitTextToSize(participantName, contentWidth) as string[];
  doc.text(participantNameLines, margin, 391);
  const nameBottom = 391 + participantNameLines.length * participantNameSize * 1.05;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText([205, 216, 227]);
  doc.text(state.roleUnit || "Role / unit not entered", margin, nameBottom + 10);
  const detailY = Math.min(510, Math.max(458, nameBottom + 38));
  setFill([20, 43, 70]);
  doc.rect(margin, detailY, 242, 72, "F");
  doc.rect(margin + 254, detailY, 250, 72, "F");
  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  setText(COLORS.gold);
  doc.text("COMPLETION DATE", margin + 15, detailY + 22);
  doc.text("PROPOSED PATHWAY", margin + 269, detailY + 22);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setText(COLORS.white);
  doc.text(completionDate, margin + 15, detailY + 47);
  doc.text(state.pathway, margin + 269, detailY + 47);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText([181, 197, 213]);
  doc.text(`PDF generated ${new Date().toLocaleString()}`, margin, detailY + 94);
  setFill(COLORS.paper);
  doc.rect(margin, 625, 180, 70, "F");
  doc.addImage(signatureDataUrl, "PNG", margin + 10, 635, 150, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setText(COLORS.gold);
  doc.text("COURSE AUTHOR AND INSTRUCTOR · DR. VICKI BEALMAN", margin, 714);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText([181, 197, 213]);
  doc.text("Prepared for consideration—not institutional approval, academic credit, accreditation, or credential authorization.", margin, 744);

  addPage();
  addLabel("Executive proposal dossier map");
  addHeading("A decision-ready record of the proposed experience", 27);
  addBody("This formatted dossier assembles the participant's twelve completed Fieldbook artifacts into a reviewable record. Reviewers should verify institutional priorities, owners, approval routes, implementation resources, and credential authority before action.");
  addRule();
  capstoneSections.forEach((section, index) => {
    ensureSpace(34);
    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    setText(COLORS.gold);
    doc.text(String(index + 1).padStart(2, "0"), margin, y);
    addBody(section, { bold: true, indent: 34, gap: 5 });
  });

  lessons.forEach(lesson => {
    const entry = state.work[lesson.id];
    const studio = studios.find(item => item.id === lesson.studioId);
    addPage();
    addLabel(`Module Studio ${lesson.module} · Lesson ${String(lesson.number).padStart(2, "0")} · ${studio?.phase || ""}`);
    addHeading(lesson.title, 26);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setText(entry?.completed ? COLORS.green : COLORS.muted);
    doc.text(entry?.completed ? `COMPLETE${entry.completedAt ? ` · ${new Date(entry.completedAt).toLocaleDateString()}` : ""}` : "IN PROGRESS", margin, y);
    y += 22;
    addLabel("Objective");
    addBody(lesson.objective, { bold: true });
    addRule();
    addLabel("Design artifact");
    addBody(entry?.artifact || "Not entered.");
    addLabel("Evidence and open questions");
    addBody(entry?.evidence || "Not entered.");
    addLabel("Reflection and design judgment");
    addBody(lesson.reflection, { bold: true, color: COLORS.muted, gap: 4 });
    addBody(entry?.reflection || "Not entered.");
    addLabel("Working notes");
    addBody(entry?.notes || "No additional notes.");
    addLabel("Applied check");
    lesson.appliedCheck.forEach((item, index) => {
      addBody(`${entry?.checks[index] ? "[x]" : "[ ]"} ${item}`, { indent: 8, gap: 1 });
    });
  });

  addPage();
  addLabel("External design references");
  addHeading("Standards and institutional context", 27);
  sources.forEach(source => {
    ensureSpace(66);
    addBody(`[${source.id}] ${source.title}`, { bold: true, gap: 2 });
    addBody(`${source.publisher} · ${source.url}`, { color: COLORS.muted, gap: 2 });
    addBody(source.note, { gap: 10 });
  });
  addRule();
  addLabel("Privacy and authority note");
  addBody(privacyReminder);
  addBody("Institutional policies, owners, credit status, badge platform, review bodies, timelines, and implementation resources must be confirmed with authorized DeVry stakeholders.", { bold: true });

  const pageCount = doc.getNumberOfPages();
  for (let page = 2; page <= pageCount; page += 1) {
    doc.setPage(page);
    setDraw(COLORS.line);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 42, pageWidth - margin, pageHeight - 42);
    doc.setFont("courier", "normal");
    doc.setFontSize(7.5);
    setText(COLORS.muted);
    doc.text("DR. VICKI BEALMAN'S MICRO-CERTIFICATION FIELDBOOK", margin, pageHeight - 26);
    doc.text(`${page} / ${pageCount}`, pageWidth - margin, pageHeight - 26, { align: "right" });
  }

  return doc;
}

export function downloadProposalDossierPdf(state: ProposalPdfState) {
  const doc = createProposalDossierPdf(state);
  const url = URL.createObjectURL(doc.output("blob"));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = proposalPdfFilename(state);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
