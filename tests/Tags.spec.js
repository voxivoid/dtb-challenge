import { createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";

import Tags from "@/components/Tags.vue";

import starshipsServer from "@/tests/__mocks__/starshipsServer";
import starshipsDB from "@/tests/__mocks__/starshipsDB";

describe("Star", () => {
  const starshipDB = starshipsDB[0];
  const starshipServer = starshipsServer.find(s => s.url === starshipDB._id);

  const localVue = createLocalVue();
  localVue.use(ElementUI);

  const wrapper = mount(Tags, {
    propsData: {
      starships: starshipsDB,
      starship: starshipServer,
    },
    localVue,
  });

  it("does not show input", () => {
    wrapper.setData({ inputVisible: false });

    expect(wrapper.find("input").exists()).toBe(false);
  });

  it("shows input", () => {
    wrapper.setData({ inputVisible: true });

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("shows all the tags from the starship", () => {
    wrapper.setData({ inputVisible: true });

    expect(wrapper.findAll(".el-tag").length).toBe(starshipDB.tags.length);
  });

  it("calls addTag when pressing enter", () => {
    const addTag = jest.fn();

    wrapper.setData({ inputVisible: true });
    wrapper.setMethods({ addTag });

    const inputWrapper = wrapper.find("input");
    inputWrapper.trigger("keyup.enter");

    expect(addTag).toBeCalled();
  });

  it("calls addTag when pressing enter", () => {
    const addTag = jest.fn();

    wrapper.setData({ inputVisible: true });
    wrapper.setMethods({ addTag });

    const inputWrapper = wrapper.find("input");
    inputWrapper.trigger("keyup.enter");

    expect(addTag).toBeCalled();
  });
});
