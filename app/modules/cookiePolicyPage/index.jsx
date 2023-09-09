import PortableTextCustom from '../portableTextCustom';
import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
  };

  const CookiePolicyPage = ({content}) => {
    return (
      <div className="fixedWidthPage">
        <div className={ "container privacyPolicy" }>
          <PortableTextCustom value={content[0].ContentRaw} />
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>Essential Cookies</td>
              <td>These are cookies that are strictly necessary for the functioning of a website or for performing services that an individual user has requested. For instance, these cookies are necessary to allow us to operate our Sites so you may access them as you have requested. These cookies let us recognize that you have created an account and have logged into that account to access the Sites. They also include cookies that enable us to remember your previous actions within the same browsing session.</td>
            </tr>
            <tr>
              <td>Analytical/Performance Cookies</td>
              <td>These cookies collect information and statistics about how individuals use the Sites (e.g., which webpages or other portions of the Sites visitors go to most often). These cookies are used to improve how the Sites function.</td>
            </tr>
            <tr>
              <td>Functional Cookies</td>
              <td>These cookies allow the Sites to remember choices users make and to provide enhanced, personalized features. For example, within our Sites, these cookies remember users’ language preferences.</td>
            </tr>
            <tr>
              <td>Targeting/Advertising Cookies</td>
              <td>These cookies are used to deliver advertisements relevant to a specific user of the Sites. They remember that a user has visited a website and share this information with other organizations such as advertising vendors.</td>
            </tr>
          </table>
          <PortableTextCustom value={content[0].ContentTwoRaw} />
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>Persistent Cookies</td>
              <td>Persistent cookies remain on your device until deleted manually or automatically.</td>
            </tr>
            <tr>
              <td>Session Cookies</td>
              <td>Session cookies remain on your device until you close your browser, at which time they are automatically deleted.</td>
            </tr>
            <tr>
              <td>First-Party Cookies</td>
              <td>These cookies are placed by the party operating the website or service. For example, any cookies we place on your computer from our Sites are first-party cookies.</td>
            </tr>
            <tr>
              <td>Third-Party Cookies </td>
              <td>These cookies are placed on a website or service by a party that does not own or operate the website or service.</td>
            </tr>
          </table>
          <PortableTextCustom value={content[0].ContentThreeRaw} />
          <table>
            <tr>
              <th>Cookie</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Type</th>
            </tr>
            <tr>
              <td>iplocate</td>
              <td>This cookie assists in identifying general location of user of the Site for compliance purposes. </td>
              <td>Session</td>
              <td>Functional</td>
            </tr>
            <tr>
              <td>__cf_bm</td>
              <td>This cookie, set by Cloudflare, is used to support Cloudflare Bot Management.</td>
              <td>29 minutes</td>
              <td>Functional</td>
            </tr>
            <tr>
              <td>_gcl_au</td>
              <td>Provided by Google Tag Manager to experiment advertisement efficiency of websites using their services.</td>
              <td>3 months</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>test_cookie</td>
              <td>The test_cookie is set by doubleclick.net and is used to determine if the user's browser supports cookies.</td>
              <td>14 minutes</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>ad-id</td>
              <td>The ad-id cookie is provided by Amazon Advertising for tallying user actions by tracking ad clicks on other websites, to provide targeted content.</td>
              <td>7 months 18 days</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_ga</td>
              <td>The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognize unique visitors.</td>
              <td>2 years</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website's performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.</td>
              <td>1 day</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>ad-privacy</td>
              <td>Provided by amazon-adsystem to make advertising messages more relevant to the users and their interests.</td>
              <td>5 years 1 month 20 days</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_ga_0SNN48HE0B</td>
              <td>This cookie is installed by Google Analytics.</td>
              <td>2 years</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>c</td>
              <td>This cookie is set by Rubicon Project to control synchronization of user identification and exchange of user data between various ad services.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>checkForPermission</td>
              <td>This cookie is set by Beeswax to determine whether the user has accepted the cookie consent box.</td>
              <td>9 minutes</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>CMID</td>
              <td>Casale Media sets this cookie to collect information on user behavior, for targeted advertising.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>CMPS</td>
              <td>CMPS cookie is set by CasaleMedia for anonymous user tracking based on user's website visits, for displaying targeted ads.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>CMPRO</td>
              <td>CMPRO cookie is set by CasaleMedia for anonymous user tracking, and for targeted advertising.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>uuid2</td>
              <td>The uuid2 cookie is set by AppNexus and records information that helps in differentiating between devices and browsers. This information is used to pick out ads delivered by the platform and assess the ad performance and its attribute payment.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>bku</td>
              <td>Bluekai uses this cookie to build an anonymous user profile with data like the user's online behaviour and interests.</td>
              <td>6 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>bkpa</td>
              <td>Set by Bluekai, this cookie stores anonymized data about the users' web usage in an aggregate form to build a profile for targeted advertising.</td>
              <td>6 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>bito</td>
              <td>This cookie is set by Beeswax for advertisement purposes.</td>
              <td>1 year 1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>bitoIsSecure</td>
              <td>Beeswax sets this cookie for targeting and advertising. The cookie is used to serve the user with relevant advertisements based on real time bidding.</td>
              <td>1 year 1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>UID</td>
              <td>Scorecard Research sets this cookie for browser behaviour research.</td>
              <td>1 month</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>tuuid</td>
              <td>The tuuid cookie, set by BidSwitch, stores an unique ID to determine what adverts the users have seen if they have visited any of the advertiser's websites. The information is used to decide when and how often users will see a certain banner.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>c</td>
              <td>This cookie is set by Rubicon Project to control synchronization of user identification and exchange of user data between various ad services.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>tuuid</td>
              <td>The tuuid cookie, set by BidSwitch, stores an unique ID to determine what adverts the users have seen if they have visited any of the advertiser's websites. The information is used to decide when and how often users will see a certain banner.</td>
              <td>2 years</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>c</td>
              <td>This cookie is set by Rubicon Project to control synchronization of user identification and exchange of user data between various ad services.</td>
              <td>2 years</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>A3</td>
              <td>No description</td>
              <td>1 year</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>ab</td>
              <td>Owned by agkn, this cookie is used for targeting and advertising purposes.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>anj</td>
              <td>AppNexus sets the anj cookie that contains data stating whether a cookie ID is synced with partners.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>tuuid_lu</td>
              <td>This cookie, set by BidSwitch, stores a unique ID to determine what adverts the users have seen while visiting an advertiser's website. This information is then used to understand when and how often users will see a certain banner.</td>
              <td>2 years</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>tuuid_lu</td>
              <td>This cookie, set by BidSwitch, stores a unique ID to determine what adverts the users have seen while visiting an advertiser's website. This information is then used to understand when and how often users will see a certain banner.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>IDSYNC</td>
              <td>This cookie is set by Yahoo to store information on how users behave on multiple websites so that relevant ads can be displayed to them.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>tuuid_li</td>
              <td>This cookie, set by BidSwitch, stores a unique ID to determine what adverts the users have seen while visiting an advertiser's website. This information is then used to understand when and how often users will see a certain banner.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>um</td>
              <td>Set by AddThis for registering the user's sharing of content through social media.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>umeh</td>
              <td>This cookie is set by Improve Digital to track visitors on multiple websites, in order to present relevant advertisements based on the visitor's preferences.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>demdex</td>
              <td>The demdex cookie, set under the domain demdex.net, is used by Adobe Audience Manager to help identify a unique visitor across domains.</td>
              <td>5 months 27 days</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>id</td>
              <td>Set by Google DoubleClick, this cookie is used to create user profiles to display relevant ads.</td>
              <td>1 year 1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>mdata</td>
              <td>This cookie is used by Media Innovation group and registers a unique ID to identify a visitor on their revisit, in order to show them relevant ads.</td>
              <td>1 year 1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>ov</td>
              <td>This cookie is set by the provider mookie1.com. This cookie is used for serving the user with relevant content and advertisement.</td>
              <td>1 year 1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>dpm</td>
              <td>The dpm cookie, set under the Demdex domain, assigns a unique ID to each visiting user, hence allowing third-party advertisers to target these users with relevant ads.</td>
              <td>5 months 27 days</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>sambapxid</td>
              <td>This cookie is set by the provider Samba TV. This cookie is used for tracking the visitor across multiple devices including TV inorder to retarget the visitor through multiple channels.</td>
              <td>1 year 1 month</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>audience</td>
              <td>SpotXchange sets this cookie as a unique ID that tracks audiences internally. The cookie is used to limit the number of repetitive ads shown to the user.</td>
              <td>1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_uid</td>
              <td>AddThis sets this cookie to enable the visitors to share the web pages on social platforms via sharing buttons on the website.</td>
              <td>5 months 27 days</td>
              <td>Functional</td>
            </tr>
            <tr>
              <td>test_cookie</td>
              <td>The test_cookie is set by doubleclick.net and is used to determine if the user's browser supports cookies.</td>
              <td>14 minutes</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>UID</td>
              <td>Scorecard Research sets this cookie for browser behaviour research.</td>
              <td>2 years</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>bku</td>
              <td>Bluekai uses this cookie to build an anonymous user profile with data like the user's online behaviour and interests.</td>
              <td>6 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>bkpa</td>
              <td>Set by Bluekai, this cookie stores anonymized data about the users' web usage in an aggregate form to build a profile for targeted advertising.</td>
              <td>6 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>uid</td>
              <td>This is a Google UserID cookie that tracks users across various website segments.</td>
              <td>2 months</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>IDE</td>
              <td>Google DoubleClick IDE cookies are used to store information about how the user uses the website to present them with relevant ads and according to the user profile.</td>
              <td>1 year 24 days</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>PugT</td>
              <td>PubMatic sets this cookie to check when the cookies were updated on the browser in order to limit the number of calls to the server-side cookie store.</td>
              <td>1 month</td>
              <td>Functional</td>
            </tr>
            <tr>
              <td>SEUNCY</td>
              <td>This cookie is used for registering a unique ID to identify the visitor's device on their revisit to the website.</td>
              <td>1 year</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>pt</td>
              <td>No description available.</td>
              <td>2 years</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>KADUSERCOOKIE</td>
              <td>The cookie, set by PubMatic, registers a unique ID that identifies a returning user's device across websites that use the same ad network. The ID is used for targeted ads.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>ndat</td>
              <td>This cookie is set by the Ninthdecimal. This cookie is used for tracking the visitor across multiple devices. This tracking helps to retarget the visitor through multiple channels.</td>
              <td>5 months 27 days</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>uid</td>
              <td>This is a Google UserID cookie that tracks users across various website segments.</td>
              <td>1 year</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>MUID</td>
              <td>Bing sets this cookie to recognize unique web browsers visiting Microsoft sites. This cookie is used for advertising, site analytics, and other operations.</td>
              <td>1 year 24 days</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_rxuuid</td>
              <td>Unruly Media sets this cookie to store information on how the end user uses the website and any advertising that the end user may have seen before visiting the said website.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_uetsid</td>
              <td>Bing Ads sets this cookie to engage with a user that has previously visited the website.</td>
              <td>1 day</td>
              <td>Performance</td>
            </tr>
            <tr>
              <td>_uetvid</td>
              <td>Bing Ads sets this cookie to engage with a user that has previously visited the website.</td>
              <td>1 year 24 days</td>
              <td>Performance</td>
            </tr>
            <tr>
              <td>_rxuuid</td>
              <td>Unruly Media sets this cookie to store information on how the end user uses the website and any advertising that the end user may have seen before visiting the said website.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>sp</td>
              <td>This cookie is set by the host c.jabmo.app. This cookie is used to serve the content based on user interest and improve content creation.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>uid_bam</td>
              <td>No description available.</td>
              <td>1 year 6 months</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>uuid</td>
              <td>MediaMath sets this cookie to avoid the same ads from being shown repeatedly and for relevant advertising.</td>
              <td>1 month</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>OptanonConsent</td>
              <td>OneTrust sets this cookie to store details about the site's cookie category and check whether visitors have given or withdrawn consent from the use of each category.</td>
              <td>1 year</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>_pin_unauth</td>
              <td>This cookie is placed by Pinterest Tag when the user cannot be matched. It contains a unique UUID to group actions across pages.</td>
              <td>1 year</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>_fbp</td>
              <td>This cookie is set by Facebook to display advertisements when either on Facebook or on a digital platform powered by Facebook advertising, after visiting the website.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_pinterest_ct_ua</td>
              <td>This cookie is set by Pinterest to assess our online targeted advertising success. </td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>_hjFirstSeen</td>
              <td>Hotjar sets this cookie to identify a new user’s first session. It stores a true/false value, indicating whether it was the first time Hotjar saw this user.</td>
              <td>30 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>secure_customer_sig</td>
              <td>Shopify sets this cookie to be used in connection with customer login.</td>
              <td>1 year</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>cart_currency</td>
              <td>Shopify sets this cookie to remember the user’s country of origin and populate the correct transaction currency.</td>
              <td>14 days</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>_y</td>
              <td>This cookie is associated with Shopify's analytics suite.</td>
              <td>1 year</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_s</td>
              <td>This cookie is associated with Shopify's analytics suite.</td>
              <td>30 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_shopify_y</td>
              <td>This cookie is associated with Shopify's analytics suite.</td>
              <td>1 year</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_shopify_s</td>
              <td>This cookie is associated with Shopify's analytics suite.</td>
              <td>30 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_hjIncludedInSessionSample</td>
              <td>This cookie is associated with Shopify's analytics suite.</td>
              <td>2 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_hjIncludedInPageviewSample</td>
              <td>Hotjar sets this cookie to know whether a user is included in the data sampling defined by the site's pageview limit.</td>
              <td>2 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_hjAbsoluteSessionInProgress</td>
              <td>Hotjar sets this cookie to detect the first pageview session of a user. This is a True/False flag set by the cookie.</td>
              <td>30 minutes</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>io_token_7c6a6574-f011-4c9a-abdd-9894a102ccef</td>
              <td>This cookie is set by the provider mpsnare.iesnare.com. This cookie is used to provide the webservices to the visitors in a safe and secure environment.</td>
              <td>1 year</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>AWSALBCORS</td>
              <td>This cookie is managed by Amazon Web Services and is used for load balancing.</td>
              <td>7 days</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>pixel</td>
              <td>This cookie is used to present the visitor with relevant content and advertisement.</td>
              <td>1 year</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>ABTasty</td>
              <td>This cookie set by the provider AB Tasty. This cookie is used for sending all test data(visitor ID, test and variants IDs, timestamps).</td>
              <td>1 year 22 days</td>
              <td>Other</td>
            </tr>
            <tr>
              <td>ABTastySession</td>
              <td>This cookie is set by the AB Tasty. This is a functional cookie used for website optimization. It is utilised in enabling A/B testing within the website.</td>
              <td>30 minutes</td>
              <td>Functional</td>
            </tr>
            <tr>
              <td>AWSALBCORS</td>
              <td>This cookie is managed by Amazon Web Services and is used for load balancing.</td>
              <td>7 days</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>_gat_UA-47011405-1</td>
              <td>A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow website owners to track visitor behaviour and measure site performance. The pattern element in the name contains the unique identity number of the account or website it relates to.</td>
              <td>1 minute</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>u2</td>
              <td>The domain of the cookie is owned by Sizmek. This cookie is used for advertising purposes.</td>
              <td>3 months</td>
              <td>Advertisement</td>
            </tr>
            <tr>
              <td>AWSALB</td>
              <td>AWSALB is an application load balancer cookie set by Amazon Web Services to map the session to the target.</td>
              <td>7 days</td>
              <td>Performance</td>
            </tr>
            
          </table>
          <PortableTextCustom value={content[0].ContentFourRaw} />
        </div>
      </div>
    )
}

export default CookiePolicyPage