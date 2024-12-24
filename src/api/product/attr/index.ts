import request from '@/utils/request';

import type {
  CategoryResponseData,
  AttrResponseData,
  Attr,
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuHasImg,
} from './type';

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  //获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}

type TID = number | string;

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);

export const reqC2 = (category1Id: TID) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id);

export const reqC3 = (category2Id: TID) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id);

// 平台属性
export const reqAttr = (category1Id: TID, category2Id: TID, category3Id: TID) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  );

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data);

export const reqRemoveAttr = (attrId: number) =>
  request.post<any, any>(API.DELETEATTR_URL + attrId);

//获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);
//获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);
//获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
