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

export const useSuccessBanner = create((set) => ({
  isVisible: false,
  message: 'Default message.',
  showBanner: ({_message}) => {
    set(() => ({isVisible: true, message: _message}));
  },
  closeBanner: () => {
    set(() => ({isVisible: false, message: ''}));
  },
}));
