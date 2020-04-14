/*
 * @Descripttion:
 * @version:
 * @Author: wzs
 * @Date: 2020-04-02 23:09:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 15:05:41
 */
import instance from "./base";
export const getList = ({ key, page_id }) => {
  return instance.get("/search/" + key + "/" + page_id);
};

export const getInspectorList = ({ key, type, page_id }) => {
  return instance.get(
    "/inspectorSearch/" + type + "/" + page_id + "?key=" + key
  );
};
