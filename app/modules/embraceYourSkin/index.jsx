import { useEffect } from 'react';
import getApiKeys from '~/utils/functions/getApiKeys';
import { appendScript } from '~/utils/functions/eventFunctions';
import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
  };
  

const EmbraceYourSkin = ({content}) => {

    useEffect(() => {
        if(window.yotpo){
          window.yotpo.refreshWidgets();
        } else {
          appendScript("//staticw2.yotpo.com/"+appKey+"/widget.js")?.then(() => {})
        }
    });

    return (
        <div className={"eysPage minHeight"}>
            
            { 
                (getApiKeys().CURRENT_ENV.includes('US')) ? (

                    <div className={"hero"}>
                        <video autoPlay loop muted webkitPlaysInline playsInline controls="controls"  >
                            <source src="https://cdn.shopify.com/videos/c/o/v/4a4b55de1b494936bf8e6b5a60bb8440.mp4" type="video/mp4"/>
                        </video>
                        <a id="downArrow" href="#sectionTwo">
                            <img src={content[0].downArrow.asset.url} alt="Scroll down" />
                        </a>
                    </div>

                ) : ( 

                <div className={styles.fullBanner}></div>

                )
      
            }

            <div id="sectionTwo" className={"sectionTwo"}>
                <div className={"wrapper"}>
                <div className={"left"}>
                    <p className={"percent"}>
                        95%
                    </p>
                    <p className={"copy"}>
                        95% of customers state that they are their own harshest critic.<sup>1</sup>
                    </p>
                </div>
                <div className={"right"}>
                    <p className={"percent"}>
                        1%
                    </p>
                    <p className={"copy"}>
                    Less than 1% (0.66%) said social media makes them feel more confident.<sup>3</sup>
                    </p>
                </div>
                </div>
                <div className={"centeredWrapper"}>
                    <p>
                        With our #EmbraceYourSkin initiative, we recognize that a huge part of feeling our best comes from how we speak to ourselves. 
                    </p>
                    <p>
                        We invite you to continue the movement to #EmbraceYourSkin &amp; help us say goodbye to negative self-talk. 
                    </p>
                    <p>
                        <strong>What we tell ourselves matters.</strong>
                    </p>
                </div>
            </div>


            <div className={"sectionThree"}>
                <h2>
                <span>HEY YOU</span><br/>
                We know a few things about you.<br/>
                Here are the hard facts.
                </h2>
                
                <div className={"list"}>
                <p>You are <span>enough.</span></p>
                <p>You are <span>smart enough.</span></p>
                <p>You are <span>fun enough.</span></p>
                <p>You are <span>cool enough.</span></p>
                <p>You are <span>calm enough.</span></p>
                <p>You are <span>beautiful enough.</span></p>
                <p>You are <span>doing enough.</span></p>
                <p>You are <span>deserving enough.</span></p>
                </div>
                
                <h2>We’ll tell you a secret about us.</h2>
                
                <p>
                Sometimes we don’t feel like we’re enough. We’ve been told we’re not—by entire industries, brands, other people & even ourselves. Let’s be real, we may all have made others feel that way at times. We’re all human.
                </p>
                
                <p>
                TULA's vision has always been to inspire confidence. From day one, we've embraced skin positivity & have approached beauty from the inside out. It's a journey—we’re constantly evolving how we do this. In this chapter of our story, we’re raising the bar.
                </p>
                
                <h2>We promise to:</h2>

                <div id="reimagine" className={"list"}>
                <p>
                    <span>REIMAGINE what's important</span><br/>
                    Being kind looks good on everyone
                </p>
                <p>
                    <span>REIMAGINE language</span><br/>
                    Beautiful before, & after.
                </p>
                <p>
                    <span>REIMAGINE social norms.</span><br/>
                    Ageless is the new anti-aging.™ 
                </p>
                <p>
                    <span>REIMAGINE imagery</span><br/>
                    No skin retouching. No filters. Ever.
                </p>
                <p>
                    <span>REIMAGINE skincare</span><br/>
                </p>
                </div>

                <h2 className={"desktopBreak"}>
                Now it’s your turn to make a promise. <br/>
                It’s OK if you don’t follow through every day.*
                </h2>

                <div id="embrace" className={"list"}>
                <p>I will <span>EMBRACE my strength.</span></p>
                <p>I will <span>EMBRACE my uniqueness.</span></p>
                <p>I will <span>EMBRACE my vulnerability.</span></p>
                <p>I will <span>EMBRACE my talents.</span></p>
                <p>I will <span>EMBRACE my body.</span></p>
                <p>I will <span>EMBRACE my skin.</span></p>
                </div>

                <h2>
                Invest in yourself & our crystal ball shows us this:
                </h2>

                <p id="invest">
                We see you holding your head a little <strong>higher</strong>. We see you trying <strong>something new</strong>.<br />
                We see you saying, ‘Look at me world—this is me! This is my skin!’ We see you being unapologetically you.
                </p>

                <p>
                Imagine what’s possible—<strong>then create it</strong>.
                </p>

                <p>
                The time to <strong>EMBRACE YOUR SKIN™</strong> &amp; <strong>UNLEASH YOUR GLOW™</strong> isn’t later—it’s now.
                </p>

                <div id="tulaHeart">
                    <img src={content[0].heartIcon.asset.url} alt="heart" />
                <p>TULA</p>

                <p className={"footnote"}>
                    *reminder: healthy, not perfect
                </p>
                </div>
                
            </div>

            <div className={"sectionFour"}>
                <h2>
                <span>YOU TOLD US</span><br/>
                Confidence by the numbers
                </h2>
            </div>


            <div className={"sectionFive"}>
                <div id="leftUpperBlock" className={"block"}>
                <div className={"textWrapper"}>
                    <p className={"percent"}>89%</p>
                    <p className={"boldedCopy"}>
                    89% say confidence is weakened by their own negative self-talk / thoughts.<sup>7</sup>
                    </p>
                    {(content.showsSmsEntrySection) && (<p className={"copy"}>
                    We launched a program to text you<br/>
                    weekly positive affirmations. <strong>Sign up below!</strong>
                    </p>)}
                </div>
                </div>
                
                <div id="rightUpperBlock" className={"block"}>
                <div className={"textWrapper"}>
                    <p className={"percent"}>19</p>
                    <p className={"boldedCopy"}>
                    We speak negatively about ourselves an average of 19 times per day.<sup>2</sup>  (this equates to more than once every hour that you are awake)
                    </p>
                    <p className={"copy"}>
                    We've added guidelines to our influencer contracts and creative briefs asking partners to avoid skin-altering filters in their TULA content.
                    </p>
                </div>
                </div>
                
                <div id="leftLowerBlock" className={"block"}>
                <div className={"textWrapper"}>
                    <p className={"percent"}>60%</p>
                    <p className={styles.boldedCopy}>
                    60% say “bad” skin days have a negative effect<br/> 
                    on their self-confidence.<sup>3</sup>
                    </p>
                    <p className={"copy"}>
                    We read 24,000+ customer reviews to learn how 
                    we can help normalize normal skin & shift the focus 
                    to “healthy,” not “perfect.”
                    </p>
                </div>
                </div>
                
                <div id="rightLowerBlock" className={"block"}>
                <div className={"textWrapper"}>
                    <p className={"percent"}>76%</p>
                    <p className={"boldedCopy"}>
                    76% say beauty ads make them feel less confident,<sup>4</sup><br/>
                    with 44% saying beauty ads make them feel insecure.<sup>5</sup>
                    </p>
                    <p className={"copy"}>
                    We said goodbye to skin retouching & added "Unretouched Beauty" badges across our assets to show you beautiful, unretouched skin.
                    </p>
                </div>
                </div>
                
            </div>

            <div className={"sectionSix"}>
                <p className={"percent"}>66%</p>
                <p>
                <strong>66% feel the beauty industry has made meaningful changes when it comes to<br/>
                embracing all kinds of beauty, but that there's still a lot of work to be done.</strong><sup>6</sup>
                </p>
                { 
                (getApiKeys().CURRENT_ENV.includes('US')) &&
                    <p>
                    This year, we’re continuing to lead the conversation within the industry &amp; our<br/>
                    community, taking the discussion to TV &amp; the pages of The New York Times<br/>
                    to remind you that <strong>you are enough</strong>.
                    </p>
                }
            </div>

            <div className={"sectionSeven"}>
                <div className={"wrapper"}>
                    <div className={"smsBubble"}>
                        <img src={content[0].heartSms.asset.url} alt="SMS Bubble" />
                        <img src={content[0].heartIcon.asset.url} alt="heart" />
                    </div>

                    <p><strong>you’re enough– <br/>sometimes we need reminders.</strong></p>

                    <h2>want a weekly confidence text?</h2>
                    <p><strong>we’ll text a positive affirmation to your phone each week.</strong></p>

                    <p id={"eysSmsCta"}>to sign up, text CONFIDENCE to 74430</p>
                    
                    <p id={"eysSmsConsent"}>
                        I agree to receive recurring automated marketing text messages (e.g. cart reminders) at the phone number provided. Consent is not a condition to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help and STOP to cancel. View our <a href="/pages/terms-conditions" target="_blank">Terms of Service</a> and <a href="/pages/privacy-policy" target="_blank">Privacy Policy</a>.
                    </p>

                </div>
            </div>


            <div className={"sectionEight"}>
                <div className={"left"}>
                    <img src={content[0].drRaj.asset.url} alt="Dr. Raj" />
                    <p>Dr. Roshini Raj, TULA Founder</p>
                </div>
                <div className={"right"}>
                    <p className={"quotes"}>"</p>
                    <p>
                        Embracing who
                        you are on the inside
                        &amp; out will help you
                        achieve the best
                        version of your skin—
                        plus the confidence
                        to achieve so
                        much more.
                    </p>
                    <p id={"rightQuote"} className={"quotes"}>"</p>
                </div>
            </div>
            
            <div className={"sectionNine"}>
                <h2>flood your feed with positivity</h2>
                <p>Follow @TULA #EmbraceYourSkin</p>

                <div
                class="yotpo yotpo-pictures-widget"
                data-gallery-id="5f6a6d7c3652fe0f5fc5f6d7">
                </div>
                
            </div>

            <div className={"footnotesSection"}>
                <ol>
                <li>When asked if they are their own harshest critic</li>
                <li>When asked how many times per day you speak negatively to yourself</li>
                <li>Glow Getters could select 4 out of 12 options</li>
                <li>Versus “more confident”</li>
                <li>Glow Getters could select all applicable options out of 10 choices</li>
                <li>When asked if they feel the beauty industry has made meaningful changes when it comes to embracing all kinds of beauty</li>
                <li>When asked if confidence is weakened by their own negative self-talk / thoughts</li>
                </ol>
                <p><em>*brand survey of 3,800 {(!getApiKeys().CURRENT_ENV.includes('US')) && `U.S `}customers conducted in August, 2021</em></p>
            </div>

        </div>
        

    )
}

export default EmbraceYourSkin