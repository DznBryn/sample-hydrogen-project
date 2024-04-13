import {useEffect} from 'react';
import {appendScript} from '~/utils/functions/eventFunctions';

const FireWorkStory = ({playlist, id, autoplay = false}) => {
  useEffect(() => {
    appendScript('https://asset.fwcdn2.com/js/integrations/shopify.js')?.then(
      () => {},
    );
    appendScript('https://asset.fwcdn2.com/js/fwn.js')?.then(() => {});
    appendScript('https://asset.fwcdn3.com/js/storyblock.js')?.then(() => {});

    /* Products Hydration */
    document.addEventListener(
      'fw:shopping:hydrate-products',
      async (/*event*/) => {
        // const { products, video, actions } = event.detail;
      },
    );

    /* Cart Hydration */
    document.addEventListener('fw:shopping:hydrate-cart', async (/*event*/) => {
      // const { actions } = event.detail;
    });

    /* Cart Content Has Changed Hydration */
    document.addEventListener('fw:shopping:cart-updated', async (/*event*/) => {
      // const { product, product_unit, quantity } = event.detail;
    });
  }, []);

  return playlist ? (
    <fw-storyblock
      player_detached="true"
      channel="tula135020676"
      playlist={id}
      branding="false"
      autoplay={autoplay}
    ></fw-storyblock>
  ) : (
    <fw-storyblock
      player_detached="true"
      channel="tula135020676"
      video={id}
      branding="false"
      autoplay={autoplay}
      max_videos="1"
    ></fw-storyblock>
  );
};

export default FireWorkStory;
