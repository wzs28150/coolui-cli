/*
 * @Title: 订单详情接口
 * @Author: wzs
 * @Date: 2020-04-08 08:58:40
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-13 14:32:37
 * @Description:
 */
import instance from "./base";
export const getOrderInfo = ({ id }) => {
  return instance.get("/order/index/" + id);
};

export const getWuliu = () => {
  return instance.get("/order/wuliu");
};

export const postOrderStatus = ({ id, wid = null, danhao = null }) => {
  return instance.post("/order/status/", {
    id: id,
    wid: wid,
    danhao: danhao,
  });
};
