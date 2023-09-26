import { create } from 'zustand';

export const useStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
  account: {
    data: {
      id: '',
      createAt: null,
      firstName: '',
      lastName: '',
      phone: null,
      email: '',
      acceptsMarketing: false,
      defaultAddress: null,
      addresses: [],
      orders: []
    },
    setCustomerData: (customerData = null) => {
      const data = {
        id: '',
        createdAt: null,
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

      return set((state) => {
        return {
          ...state,
          account: {
            ...state.account,
            data,
          }
        };
      });
    },
    updateAddresses: (addresses) => set((state) => {
      return {
        ...state,
        account: {
          ...state.account,
          data: {
            ...state.account.data,
            ...addresses
          }
        }
      };
    }),
    removeAddress: (id) => set((state) => {
      const addresses = state.account.data.addresses.filter(address => address?.id !== id);
      return {
        ...state,
        account: {
          ...state.account,
          data: {
            ...state.account.data,
            addresses
          }
        }
      };
    })
  },
  cart: {
    data: null,
    isSliderCartOpen: false,
    setData: (cartData) => set((state) => {
      return {
        ...state,
        cart: {
          ...state.cart,
          data: cartData
        }
      };
    }),
    toggleCart: () => set((state) => {
      return {
        ...state,
        cart: {
          ...state.cart,
          isSliderCartOpen: !state.cart.isSliderCartOpen
        }
      };
    }),
    updateCart: (cart) => set((state) => {

      
      return {
        ...state,
        cart: {
          ...state.cart,
          data: {
            ...state.cart.data,
            ...cart
          }
        }
      };
    }),
  },
}));

export const useComparisonModalStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
}));