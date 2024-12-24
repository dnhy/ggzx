import request from '@/utils/request';
import type { HasSkuResponseData, SkuInfoData, SkuResponseData } from './type';
enum API {
  HASSKU_URL = '/admin/product/list/',
  ONSALE_URL = 'admin/product/onSale/',
  CANCEL_URL = 'admin/product/cancelSale/',
  DELETESKU_URL = '/admin/product/deleteSku/',
  GETSKUINFO_URL = 'admin/product/getSkuInfo/',
  SKU_URL = '/admin/product/list/',
}

export const reqHasSku = (page: number, limit: number) =>
  request.get<any, HasSkuResponseData>(API.HASSKU_URL + `${page}/${limit}`);

export const onSaleSku = (skuId: number) =>
  request.get<any, any>(API.ONSALE_URL + `${skuId}`);

export const cancelSku = (skuId: number) =>
  request.get<any, any>(API.CANCEL_URL + `${skuId}`);

export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + `${skuId}`);

export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.GETSKUINFO_URL + `${skuId}`);

//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);
