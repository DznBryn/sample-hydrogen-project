import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPMoreDetailsList = ({ data = [] }) => {

  const handleOnClick = (id) => {
    return document.getElementById(`tabSection-${id}`).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return data.length > 0 && (
    <div className={'detailsListWrapper'}>
      <div className={'detailsListContainer'}>
        {
          data.map((item = null) => item?.name &&
            <p
              onClick={() => handleOnClick(item.id)}
              className={'detailsListText'}
              key={item.id}>
              {item.name}
            </p>
          )}
      </div>
    </div>
  );

};

export default PDPMoreDetailsList;