import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark, ResponseData } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  EDIT_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

export const reqAddTradeMark = (data: TradeMark) =>
  request.post<any, ResponseData>(API.ADD_TRADEMARK_URL, data)

export const reqEditTradeMark = (data: TradeMark) =>
  request.put<any, ResponseData>(API.EDIT_TRADEMARK_URL, data)

export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, ResponseData>(API.DELETE_TRADEMARK_URL + id)
