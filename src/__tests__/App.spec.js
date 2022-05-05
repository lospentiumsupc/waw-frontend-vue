import { config, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Vue3Mq } from "vue3-mq";
import App from "../App.vue";

config.global = {
  plugins: [[Vue3Mq, { preset: "tailwind", defaultBreakpoint: "xl" }]],
};

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain("Hello, world!");
  });
});
