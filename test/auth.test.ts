import { describe, it, expect } from "vitest";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
});

describe("registerSchema", () => {
  it("accepts valid input", () => {
    const parsed = registerSchema.safeParse({
      email: "a@b.com",
      password: "password1",
      username: "alpha_123",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects bad username", () => {
    const parsed = registerSchema.safeParse({
      email: "a@b.com",
      password: "password1",
      username: "bad name",
    });
    expect(parsed.success).toBe(false);
  });
});
