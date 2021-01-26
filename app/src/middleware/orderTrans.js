const OnceOrderModel = require("../model/application/OnceOrderModel");

/**
 * 進行指令的轉譯
 */
module.exports = (context, { next }) => {
  if (isUUID(context.event.message.text)) {
    OnceOrderModel.translation(context.event.message.text).then(console.log);
  }
  return next;
};

function isUUID(uuid) {
  return /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(uuid);
}
