export function useInventory({ids = []}) {

  //TODO
  const products = [];
  const status = 'LOADED';

  console.log('useInventory => ', ids);

  return {
    products,
    status,
  };

}