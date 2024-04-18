export function isFreeGitPromoActivate(cartConfig) {
  const currDate = new Date();
  const startDate = new Date(cartConfig.freeGiftPromoStartDate);
  const endDate = new Date(cartConfig.freeGiftPromoEndDate);
  const isPromoToggleOn = cartConfig.freeGiftPromoToggle;

  startDate.setHours(cartConfig.freeGiftPromoStartHour);
  endDate.setHours(cartConfig.freeGiftPromoEndHour);

  return currDate >= startDate && currDate <= endDate && isPromoToggleOn;
}

export const compareItemsState = (curState, prevState) => {
  if (curState?.length !== prevState?.length) {
    return true;
  }
  for (let it = 0; it < curState?.length; it++) {
    if (curState[it]?.quantity !== prevState[it]?.quantity) {
      return true;
    }
  }
  return false;
};
