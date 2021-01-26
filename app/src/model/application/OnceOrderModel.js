const redis = require("../../util/redis");
const uuid = require("uuid-random");
const PREFIX = "OnceOrder_";

/**
 * 轉譯id為指令
 * @param {String} id
 */
exports.translation = id => {
  return redis.dequeue(`${PREFIX}${id}`);
};

/**
 * 儲存指令轉換為密鑰
 * @param {String} order
 * @param {Number} expire
 */
exports.store = async (order, expire = 86400) => {
  let id = uuid();
  await redis.enqueue(`${PREFIX}${id}`, order, expire);
  return id;
};
