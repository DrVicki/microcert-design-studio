import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "../_core/context";

const mocks = vi.hoisted(() => ({
  saveRegistration: vi.fn(),
  listRegistrations: vi.fn(),
  getRegistrationStats: vi.fn(),
}));

vi.mock("../db", () => ({
  saveRegistration: mocks.saveRegistration,
  listRegistrations: mocks.listRegistrations,
  getRegistrationStats: mocks.getRegistrationStats,
}));

import { appRouter } from "../routers";

function context(role?: "user" | "admin"): TrpcContext {
  return {
    user: role ? {
      id: 1,
      openId: `${role}-open-id`,
      name: role === "admin" ? "Owner" : "Participant",
      email: `${role}@example.edu`,
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("registrations router", () => {
  it("saves a normalized public registration with consent", async () => {
    const record = {
      id: 7,
      name: "Jordan Lee",
      email: "jordan.lee@example.edu",
      roleUnit: "Instructional Design",
      consentAcceptedAt: new Date("2026-09-17T15:00:00.000Z"),
      registeredAt: new Date("2026-09-17T15:00:00.000Z"),
      updatedAt: new Date("2026-09-17T15:00:00.000Z"),
    };
    mocks.saveRegistration.mockResolvedValue(record);

    const caller = appRouter.createCaller(context());
    const result = await caller.registrations.save({
      name: " Jordan Lee ",
      email: "JORDAN.LEE@EXAMPLE.EDU",
      roleUnit: " Instructional Design ",
      consent: true,
    });

    expect(mocks.saveRegistration).toHaveBeenCalledWith(expect.objectContaining({
      name: "Jordan Lee",
      email: "jordan.lee@example.edu",
      roleUnit: "Instructional Design",
      consentAcceptedAt: expect.any(Date),
    }));
    expect(result).toMatchObject({ id: 7, email: "jordan.lee@example.edu" });
  });

  it("rejects registration without consent", async () => {
    const caller = appRouter.createCaller(context());
    await expect(caller.registrations.save({
      name: "Jordan Lee",
      email: "jordan.lee@example.edu",
      roleUnit: "Instructional Design",
      consent: false,
    } as never)).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.saveRegistration).not.toHaveBeenCalled();
  });

  it("allows an administrator to list registrations", async () => {
    mocks.listRegistrations.mockResolvedValue([{ id: 1, name: "Jordan Lee" }]);
    const caller = appRouter.createCaller(context("admin"));
    await expect(caller.registrations.list()).resolves.toEqual([{ id: 1, name: "Jordan Lee" }]);
  });

  it("denies a non-administrator access to the roster", async () => {
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.registrations.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(mocks.listRegistrations).not.toHaveBeenCalled();
  });
});
