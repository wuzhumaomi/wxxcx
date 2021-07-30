require('../../../../common/runtime.js');require('../../../../common/vendor.js');require('../../../../common/main.js');import { VantComponent } from '../common/component';
VantComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      value: 300,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    // for prevent touchmove
    noop() {},
  },
});
