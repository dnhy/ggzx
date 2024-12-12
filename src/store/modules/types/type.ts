import type { RouteRecordRaw } from 'vue-router';
import { Canceler } from 'axios';
import type { CategoryObj } from '@/api/product/attr/type';

export interface Userstate {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface RequestState {
  cancelToken: Canceler[];
}

export interface CategoryState {
  c1Id: string | number;
  c2Id: string | number;
  c3Id: string | number;
  c1Arr: CategoryObj[];
  c2Arr: CategoryObj[];
  c3Arr: CategoryObj[];
}
