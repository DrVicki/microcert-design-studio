import { describe, expect, it } from "vitest";
import { normalizeOAuthReturnPath } from "@shared/const";

describe("OAuth return paths", () => {
  it("preserves a same-site administrator dashboard path", () => {
    expect(normalizeOAuthReturnPath("/admin/registrations?view=all")).toBe("/admin/registrations?view=all");
  });

  it("rejects protocol-relative and external paths", () => {
    expect(normalizeOAuthReturnPath("//malicious.example/path")).toBe("/");
    expect(normalizeOAuthReturnPath("https://malicious.example/path")).toBe("/");
    expect(normalizeOAuthReturnPath(undefined)).toBe("/");
  });
});
