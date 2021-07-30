require('../../../../common/runtime.js');require('../../../../common/vendor.js');require('../../../../common/main.js');export const button = Behavior({
  externalClasses: ['hover-class'],
  properties: {
    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
  },
});
