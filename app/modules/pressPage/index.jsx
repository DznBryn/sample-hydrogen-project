import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SMSSignUp = ({content}) => {
  return (
    <div id="press-page">
      <div
        style={{
          backgroundImage: `url(${
            content?.[0]?.topBanner.asset.url + '?auto=format'
          })`,
        }}
        className={'pressPageTopBanner minHeight'}
      >
        <h1>TULA in the Press</h1>
        <h2>
          See what others are saying about TULA. <br />
          For press inquiries email us at{' '}
          <a href="mailto:press@tula.com">press@tula.com</a>
        </h2>
      </div>

      <div className="fixedWidthPage">
        <div className={'featuredBlocksWrapper'}>
          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockOneLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockOneText}</p>
          </div>

          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockTwoLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockTwoText}</p>
          </div>

          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockThreeLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockThreeText}</p>
          </div>

          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockFourLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockFourText}</p>
          </div>

          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockFiveLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockFiveText}</p>
          </div>

          <div className={'featuredBlock'}>
            <img
              className={'logo'}
              src={
                content?.[0]?.featuredBlockSixLogo.asset.url + '?auto=format'
              }
              alt="Article logo"
            />
            <div className={'line'}></div>
            <p>{content?.[0]?.featuredBlockSixText}</p>
          </div>
        </div>
      </div>

      <div className="fixedWidthPage">
        <div className={'pressPageTiles'}>
          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleOneImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleOneLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleOnePreviewText}</p>
              <a className={'articleLink'} href={content?.[0]?.articleOneLink}>
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>

          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleTwoImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleTwoLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleTwoPreviewText}</p>
              <a className={'articleLink'} href={content?.[0]?.articleTwoLink}>
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>

          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleThreeImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleThreeLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleThreePreviewText}</p>
              <a
                className={'articleLink'}
                href={content?.[0]?.articleThreeLink}
              >
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>

          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleFourImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleFourLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleFourPreviewText}</p>
              <a className={'articleLink'} href={content?.[0]?.articleFourLink}>
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>

          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleFiveImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleFiveLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleFivePreviewText}</p>
              <a className={'articleLink'} href={content?.[0]?.articleFiveLink}>
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>

          <div className={'article'}>
            <img
              className={'featuredImg'}
              src={content?.[0]?.articleSixImage.asset.url + '?auto=format'}
              alt="Article image"
            />
            <div>
              <img
                className={'logo'}
                src={content?.[0]?.articleSixLogo.asset.url + '?auto=format'}
                alt="Article logo"
              />
              <p>{content?.[0]?.articleSixPreviewText}</p>
              <a className={'articleLink'} href={content?.[0]?.articleSixLink}>
                <span>See full article</span> &gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSSignUp;
