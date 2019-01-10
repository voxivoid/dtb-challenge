import { mount } from "@vue/test-utils";

import Star from "@/components/Star.vue";

describe("Star", () => {
  const wrapper = mount(Star);

  it("shows the correct icon when not starred", () => {
    wrapper.setProps({ starred: false });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("shows the correct icon when starred", () => {
    wrapper.setProps({ starred: true });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
