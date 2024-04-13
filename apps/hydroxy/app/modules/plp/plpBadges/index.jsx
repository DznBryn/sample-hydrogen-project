import classNames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const mockProduct = {
  tags: [
    'Badge:Limited Edition',
    'cate - primers',
    'Concern - Combination',
    'Concern - Dullness',
    'Concern - Large Pores',
    'Concern - Normal',
    'Concern - Oiliness',
    'Concern - Pores',
    'Concern - Sensitive',
    'Concern - Stress-Fatigue',
    'dull-skin',
    'even-better-aqua-infusion-oil-free-gel-cream',
    'even-better-glow-get-it-cooling-brightening-eye-balm',
    'even-better-purifying-cleanser',
    'force_sold_out',
    'Ingredient - Alcohol-Free',
    'Ingredient - Anti-Inflammatory',
    'Ingredient - Antioxidants',
    'Ingredient - Cruelty Free',
    'Ingredient - Gluten-Free',
    'Ingredient - Paraben Free',
    'Ingredient - Plant-Fruit Extracts',
    'Ingredient - Silicone-Free',
    'Ingredient - Sulfate-Free',
    'Ingredient - Vitamins-Minerals',
    'month-3',
    'oily-skin',
    'primer',
    'related_purifying-cleanser',
    'Type - Combination',
    'Type - Normal',
    'Type - Oily',
    'uneven-skin'
  ],
};

const Badge = ({product}) => {
  const tags = product?.tags;
  let customBadge;
  if(tags) {
    for (let tag of tags){ 
      if(tag?.includes('badge:') && !tag?.includes('pdp')){  
        customBadge = tag.split('badge:'); 
        customBadge = customBadge[1]; 
      } else if(tag?.includes('Badge:')) { 
        customBadge = tag.split('Badge:'); 
        customBadge = customBadge[1]; 
      }
    }
    let customClass = customBadge ? 
      customBadge
        .toLowerCase()
        .replace(' ', '-') :
      '';
    let className = classNames('tag', customClass);
    const badges = {
      'custom': <span className={className}>{customBadge}</span>,
      'new': <span className={classNames('tag', 'new')}>new</span>,
      'sale': <span className={classNames('tag', 'sale')}>Sale</span>, 
      'save': <span className={classNames('tag', 'save')}>save</span>, 
      'special': <span className={classNames('tag', 'special')}>save</span>, 
      'special-offer': <span className={classNames('tag', 'offer')}>Special </span>, 
      'popular': <span className={classNames('tag', 'popular')}>most popular</span>, 
      'almost-gone': <span className={classNames('tag', 'gone')}>Almost Gone</span>, 
      'starter': <span className={classNames('tag', 'starter_kit')}>STARTER KIT</span>, 
      'back in stock': <span className={classNames('tag', 'popular')}>BACK IN STOCK</span>, 
      'new-collection': <span className={classNames('tag', 'n_cln')}>New Collection</span>, 
      'auto-delivery-exclusive': <span className={classNames('tag', 'popular')}>Auto delivery Exclusive</span> 
    };
    let badge = Object.keys(badges).find(badge => tags.find(tag => tag === badge));
    return customBadge ? badges['custom'] : badge ? badges[badge] : null;
  }
  return null;
  //  if(product.com?pare_at_price > product.price) <span class="tag kit">Save {{ product.compare_at_price | minus: product.price | money_without_trailing_zeros }}</span>
};
const PLPBadges = ({product}) => {
  product = product || mockProduct;
  return (
    <Badge product={product}/>
  );
};
export default PLPBadges;