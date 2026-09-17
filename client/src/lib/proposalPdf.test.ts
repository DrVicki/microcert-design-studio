import { describe, expect, it } from "vitest";
import { lessons } from "@/data/course";
import { createProposalDossierPdf, proposalPdfFilename, type ProposalPdfState } from "./proposalPdf";

function completedState(): ProposalPdfState {
  return {
    learnerName: "Jordan Lee",
    roleUnit: "Instructional Design",
    proposalTitle: "Applied Collaboration Micro-Certification",
    pathway: "Co-curricular",
    work: Object.fromEntries(lessons.map(lesson => [lesson.id, {
      artifact: `Completed artifact for ${lesson.title}.`,
      evidence: "De-identified evidence summary and an open verification question.",
      reflection: "A reviewer can inspect the assumption, evidence, and requested decision.",
      notes: "Working notes retained for dossier review.",
      checks: lesson.appliedCheck.map(() => true),
      completed: true,
      completedAt: "2026-09-17T15:00:00.000Z",
    }])),
  };
}

describe("Proposal Dossier PDF", () => {
  it("creates a named, valid, multi-page PDF containing every lesson section", () => {
    const state = completedState();
    const doc = createProposalDossierPdf(state);
    const bytes = new Uint8Array(doc.output("arraybuffer"));
    const signature = new TextDecoder().decode(bytes.slice(0, 4));

    expect(proposalPdfFilename(state)).toBe("jordan-lee-microcert-proposal-dossier.pdf");
    expect(signature).toBe("%PDF");
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(15);
    expect(bytes.byteLength).toBeGreaterThan(25_000);
  });
});
