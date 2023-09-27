export function useYotpo() {
  function refreshWidgets() {
    if (typeof window === 'object') {
      const yotpoSDK = window?.yotpo;

      if (yotpoSDK) {
        try {
          if (yotpoSDK.initialized) {
            yotpoSDK?.refreshWidgets();
          } else {
            yotpoSDK?.initWidgets();
          }
        } catch (e) {
          (e) => e;
        }
      }
    }
  }

  return {
    refreshWidgets,
  };
}
