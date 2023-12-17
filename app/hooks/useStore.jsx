import {create} from 'zustand';

export const useStore = create((set) => ({
  store: {
    cartActions: {
      data: {
        id: '',
        quantity: 0,
        sellingPlanId: null,
      },
      setAddToCartItem: (item) => {
        set((state) => {
          const lineItem = state?.store?.cartActions?.data;

          if (item?.id !== '' || item?.id !== null || item?.id !== undefined) {
            Object.keys(item).forEach((key) => (lineItem[key] = item[key]));

            return {
              ...state,
              store: {
                ...state.store,
                cartActions: {
                  ...state.store.cartActions,
                  data: lineItem,
                },
              },
            };
          }

          return console.error(
            'No item "id" found. Cannot add to cart. Item object requires: ',
            lineItem,
          );
        });
      },
      updateAddToCartItem: ({item}) => {
        set((state) => {
          const lineItem = state?.store?.cartActions?.data;
          let didUpdate = false;
          if (
            lineItem?.id !== '' ||
            lineItem?.id !== null ||
            lineItem?.id !== undefined
          ) {
            Object.keys(item).forEach((key) => {
              if (lineItem[key] !== item[key]) {
                didUpdate = true;
                lineItem[key] = item[key];
              }
            });

            if (didUpdate) {
              return {
                ...state,
                store: {
                  ...state.store,
                  cartActions: {
                    ...state.store.cartActions,
                    data: lineItem,
                  },
                },
              };
            }
          }

          return console.error(
            'No item "id" found. Cannot add to cart. Item object requires: ',
            lineItem,
          );
        });
      },
    },
  },
  setStore: (obj) => {
    set((state) => {
      return {
        ...state,
        store: {
          ...state.store,
          ...obj,
        },
      };
    });
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
      orders: [],
      subscription: null,
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
        orders: [],
        subscription: null,
      };

      Object.keys(data).forEach((key) => {
        if (customerData?.[key] && data[key] !== customerData[key])
          data[key] = customerData[key];
      });

      return set((state) => {
        return {
          ...state,
          account: {
            ...state.account,
            data,
          },
        };
      });
    },
    updateCustomerSubscription: (subscription = null) => {
      return set((state) => {
        return {
          ...state,
          account: {
            ...state.account,
            data: {
              ...state.account.data,
              subscription,
            },
          },
        };
      });
    },
    updateAddresses: (addresses) =>
      set((state) => {
        return {
          ...state,
          account: {
            ...state.account,
            data: {
              ...state.account.data,
              ...addresses,
            },
          },
        };
      }),
    removeAddress: (id) =>
      set((state) => {
        const addresses = state.account.data.addresses.filter(
          (address) => address?.id !== id,
        );
        return {
          ...state,
          account: {
            ...state.account,
            data: {
              ...state.account.data,
              addresses,
            },
          },
        };
      }),
  },
  cart: {
    data: null,
    isSliderCartOpen: false,
    setData: (cartData) =>
      set((state) => {
        return {
          ...state,
          cart: {
            ...state.cart,
            data: cartData,
          },
        };
      }),
    toggleCart: (openIt) =>
      set((state) => {
        return {
          ...state,
          cart: {
            ...state.cart,
            isSliderCartOpen:
              openIt === true || openIt === false
                ? openIt
                : !state.cart.isSliderCartOpen,
          },
        };
      }),
    updateCart: (cart) =>
      set((state) => {
        return {
          ...state,
          cart: {
            ...state.cart,
            data: {
              ...state.cart.data,
              ...cart,
            },
          },
        };
      }),
  },
}));

export const useComparisonModalStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({store: obj});
  },
}));
