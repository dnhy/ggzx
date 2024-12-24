/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-26 15:59:58
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-27 13:46:40
 */
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}

export type AttrValueList = AttrValue[];

export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
//商品图片的ts类型
export interface SpuImg {
  id?: number;
  imgName?: string;
  imgUrl?: string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  name?: string;
  url?: string;
}
//已有的SPU的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}
//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];

//销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  flag?: boolean;
  saleAttrValue?: string;
}
//SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

//已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
