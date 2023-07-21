const LoyaltyTooltipModal = ({
  modalState = false,
  toggleModal = () => { },
  isAbleToRedeem,
}) => {
  const IsAbleModalContent = () => (
    <div className={'isAbleModalContainer'}>
      <h3>HOW DO I REDEEM?</h3>
      <h2>Follow these steps to redeem your free rewards product:</h2>
      <ul>
        <li>
          Add your eligible reward product to cart (must have at least 2,000
          points).
        </li>
        <li>
          Click “redeem” & copy the code. The redeem button can be found in the
          Rewards section of your account.
        </li>
        <li>Paste the code at checkout.</li>
        <li>Redeem your free product!</li>
      </ul>
    </div>
  );

  const TooltipInfoModalContent = () => (
    <div className={'tooltipInfoModalContainer'}>
      {/* <ExclamationIcon
      color={'#47C6D9'}
      size={20}
      style={{ pointerEvents: 'none' }}
    /> */}
      <p className={'tooltipInfoModalText'}>
        Points displayed is based on the items in your cart. Final points you will
        earn will be calculated in checkout.
      </p>
    </div>
  );

  return (
    <div
      className={modalState ? 'modalWrapper' : 'modalHide'}
      onClick={toggleModal}
    >
      <div
        className={'modalContainer'}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={'modalCloseButton'} onClick={toggleModal}>
          +
        </span>
        {isAbleToRedeem ? <IsAbleModalContent /> : <TooltipInfoModalContent />}
      </div>
    </div>
  );
};

export default LoyaltyTooltipModal;