import { useRequestStore } from '@/store/modules/request';

const requestStore = useRequestStore();

export default {
  clear_token: () => {
    requestStore.clearRequest();
  },
};
