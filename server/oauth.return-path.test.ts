import { describe, expect, it } from "vitest";
import { normalizeOAuthReturnPath } from "@shared/const";

describe("OAuth return paths", () => {
  it("preserves a same-site application path", () => {
    expect(normalizeOAuthReturnPath("/?view=notebook")).toBe("/?view=notebook");
  });

  it("rejects protocol-relative and external paths", () => {
    expect(normalizeOAuthReturnPath("//malicious.example/path")).toBe("/");
    expect(normalizeOAuthReturnPath("https://malicious.example/path")).toBe("/");
    expect(normalizeOAuthReturnPath(undefined)).toBe("/");
  });
});
