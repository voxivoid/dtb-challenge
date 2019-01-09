import { $breakpoint } from "@/assets/breakpoints";

export default {
  data() {
    return {
      size: {
        xs_only: true,
        sm_only: false,
        sm_and_down: false,
        sm_and_up: false,
        md_only: false,
        md_and_down: false,
        md_and_up: false,
        lg_only: false,
        lg_and_down: false,
        lg_and_up: false,
        xl_only: false,
      },
      $resizeListener: null,
    };
  },

  created() {
    this.resize();
    this.$resizeListener = window.addEventListener("resize", this.resize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.$resizeListener);
  },

  methods: {
    resize() {
      this.size = {
        xs_only: window.innerWidth < $breakpoint.sm,

        sm_only: window.innerWidth >= $breakpoint.sm && window.innerWidth < $breakpoint.md,
        sm_and_down: window.innerWidth < $breakpoint.md,
        sm_and_up: window.innerWidth >= $breakpoint.sm,

        md_only: window.innerWidth >= $breakpoint.md && window.innerWidth < $breakpoint.lg,
        md_and_down: window.innerWidth < $breakpoint.lg,
        md_and_up: window.innerWidth >= $breakpoint.md,

        lg_only: window.innerWidth >= $breakpoint.lg && window.innerWidth < $breakpoint.xl,
        lg_and_down: window.innerWidth < $breakpoint.xl,
        lg_and_up: window.innerWidth >= $breakpoint.lg,

        xl_only: window.innerWidth >= $breakpoint.xl,
      };
    },
  },
};
