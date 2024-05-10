import Layouts from '~/layouts';
import Homepage, {links as homePageStyles} from '~/modules/homepage';
import {getCMSContent, getCMSDoc} from '~/utils/functions/eventFunctions';
import {
  GET_CAROUSEL_SLIDES_GROUP,
  GET_HOMEPAGE_SHOP_BY_CONCERN,
  GET_HOME_PAGE_RECOMMENDATIONS,
  GET_HOMEPAGE_WHY_PROBIOTICS,
  GET_HOMEPAGE_SKIN_QUIZ,
  GET_HOMEPAGE_COLLECTION_CALLOUT,
} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

export const links = () => homePageStyles();

export const meta = () => [
  {title: 'TULA Skincare: Probiotic Skin Care Products'},
  {
    name: 'description',
    content:
      'Clean + Effective Skincare Made With Probiotic Extracts and Superfoods. Get Your Healthiest, Brightest Skin Ever With 15% Off Your First Order & Email Signup.',
  },
];

//

export async function loader({context}) {
  const [
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  ] = await Promise.all([
    getCMSContent(context, GET_CAROUSEL_SLIDES_GROUP),
    getCMSContent(context, GET_HOME_PAGE_RECOMMENDATIONS),
    getCMSContent(context, GET_HOMEPAGE_SHOP_BY_CONCERN),
    getCMSContent(context, GET_HOMEPAGE_WHY_PROBIOTICS),
    getCMSContent(context, GET_HOMEPAGE_SKIN_QUIZ),
    getCMSContent(context, GET_HOMEPAGE_COLLECTION_CALLOUT),
  ]);

  return {
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  };
}

//

export default function Index() {
  const {
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Homepage
        carouselSlidesGroup={getCMSDoc(carouselSlidesGroup, 'Homepage')}
        hpRecs={getCMSDoc(hpRecs, 'HomepageRecommendationsSection')}
        concerns={concerns}
        homepageWhyProbioticsContent={getCMSDoc(
          homepageWhyProbioticsContent,
          'Why Probiotics Content',
        )}
        homepageSkinQuizContent={getCMSDoc(
          homepageSkinQuizContent,
          'Homepage Skin Quiz Content',
        )}
        homepageCollectionCallout={getCMSDoc(homepageCollectionCallout, 'EYS')}
      />
    </Layouts.MainNavFooter>
  );
}
