require('../../../../common/runtime.js');require('../../../../common/vendor.js');require('../../../../common/main.js');import { useChildren } from '../common/relation';
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: useChildren('checkbox', function (target) {
    this.updateChild(target);
  }),
  props: {
    max: Number,
    value: {
      type: Array,
      observer: 'updateChildren',
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },
  methods: {
    updateChildren() {
      this.children.forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled } = this.data;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled,
      });
    },
  },
});