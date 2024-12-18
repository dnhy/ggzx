export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//定义SKU对象的ts类型
export interface Attr {
  id?: number;
  attrId: number | string; //平台属性的ID
  valueId: number | string; //属性值的ID
  attrName: string;
  valueName: string;
}
export interface saleArr {
  id?: number;
  saleAttrId: number | string; //属性ID
  saleAttrValueId: number | string; //属性值的ID
  saleAttrName: string;
  saleAttrValueName: string;
}

export interface skuImg {
  id?: number;
  imgName: string;
  imgUrl: string;
}
export interface SkuData {
  id: number;
  isSale: number;
  price: number;
  skuDefaultImg: string;
  skuDesc: string;
  skuName: string;
  weight: string;
  skuAttrValueList?: Attr[];
  skuSaleAttrValueList?: saleArr[];
  skuImageList?: skuImg[];
}

export type Records = SkuData[];

export interface HasSkuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export interface SkuInfoData extends ResponseData {
  data: SkuData;
}
