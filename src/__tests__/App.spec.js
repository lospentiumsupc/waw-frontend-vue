import { config } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Vue3Mq } from "vue3-mq";

config.global = {
  plugins: [[Vue3Mq, { preset: "tailwind", defaultBreakpoint: "xl" }]],
};

describe("HelloWorld", () => {
  it("true is true", () => {
    expect(true).toBe(true);
  });
});
