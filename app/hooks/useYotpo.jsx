export function useYotpo() {

  function refreshWidgets() {

    if (typeof window === 'object') {

      const yotpoSDK = window?.yotpo;

      if (!yotpoSDK) throw new Error('Yotpo SDK not found');

      try{

        yotpoSDK?.initWidgets();

      }catch(e){ throw new Error(e); }

    }

  }

  return {
    refreshWidgets,
  };

}