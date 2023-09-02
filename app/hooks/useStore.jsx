import { create } from 'zustand';

export const useStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
  account: {
    data: {
      id: '',
      firstName: '',
      lastName: '',
      phone: null,
      email: '',
      acceptsMarketing: false,
      defaultAddress: null,
      addresses: [],
      orders: []
    },
    setCustomerData: (customerData = null, ) => {
      const data = {
        id: '',
        firstName: '',
        lastName: '',
        phone: null,
        email: '',
        acceptsMarketing: false,
        defaultAddress: null,
        addresses: [],
        orders: []
      };

      Object.keys(data).forEach(key => {
        if (customerData?.[key] && data[key] !== customerData[key]) data[key] = customerData[key];
      });

      return set({
        account: {
          data
        }
      });
    }
  }
}));

export const useComparisonModalStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
}));