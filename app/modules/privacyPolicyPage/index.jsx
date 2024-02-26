import PortableTextCustom from '../portableTextCustom';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const PrivacyPage = ({content}) => {
  return (
    <div className="fixedWidthPage">
      <div className={'container privacyPolicy'}>
        <PortableTextCustom value={content?.[0]?.ContentRaw} />
        <table>
          <tbody>
            <tr>
              <th colSpan="3">Personal Information</th>
            </tr>
            <tr>
              <th>Category</th>
              <th>Description/Examples</th>
            </tr>
            <tr>
              <td>Personal Identifiers</td>
              <td>
                Identifiers, such as your name, alias, shipping address, email
                address, account name, telephone number, customer identification
                number.
              </td>
            </tr>
            <tr>
              <td>Registration Data</td>
              <td>
                Information provided when you register for an account to use the
                Site, including usernames and passwords.
              </td>
            </tr>
            <tr>
              <td>
                Online Identifiers (For more information, see “Technical Data”
                below)
              </td>
              <td>
                Persistent identifiers that can be used to recognize you or your
                device over time and across different services, including a
                device identifier, an Internet Protocol (IP) address, cookies,
                beacons, pixel tags, mobile ad identifiers, and similar
                technology.
              </td>
            </tr>
            <tr>
              <td>Commercial Information</td>
              <td>
                Records of the Services you purchased, obtained, or considered,
                or your other purchasing or consuming histories or tendencies
                with respect to our Services.
              </td>
            </tr>
            <tr>
              <td>Business Contact Data</td>
              <td>
                Information related to employees, owners, directors, officers,
                or contractors of a third-party organization (e.g., business,
                company, partnership, sole proprietorship, nonprofit, or
                government agency) with whom we conduct, or possibly conduct,
                business activities.
              </td>
            </tr>
            <tr>
              <td>Health Data</td>
              <td>
                You may furnish us with health-related information in the event
                you, or a third party, has an adverse reaction to the use of our
                products or goods.
              </td>
            </tr>
            <tr>
              <td>Marketing and Communications Data</td>
              <td>
                Information with respect to your marketing preferences and your
                subscriptions to our publications and alerts.
              </td>
            </tr>
            <tr>
              <td>Internet and Electronic Network Data</td>
              <td>
                Data pertaining to your access or use of the Site, including
                browsing history, search history, and information regarding your
                interaction with the Site or advertisements embedded on the Site
                or other third-party websites, and information derived from any
                device that connects to our WiFi services.
              </td>
            </tr>
            <tr>
              <td>Your Feedback</td>
              <td>
                Information you provide about our Services, which may include
                data gathered from any TULA surveys or reviews submitted by you.
              </td>
            </tr>
            <tr>
              <td>Visitor Information</td>
              <td>
                Information an individual provides when visiting any physical
                location or premises of TULA (e.g., visitor logs and registries,
                vehicle and parking information).
              </td>
            </tr>
            <tr>
              <td>Video and Images</td>
              <td>
                In some circumstances, you may provide us images (e.g., your use
                of a product) or we may record you via a video camera (e.g.,
                on-premises security systems) or through video teleconferencing.
              </td>
            </tr>
            <tr>
              <td>Geolocation Data</td>
              <td>
                Information about the general city, state, or region in which a
                user of the Site is located.
              </td>
            </tr>
            <tr>
              <td>
                Professional or Employment Data (For more information, see
                “Employment Applications and Talent Management” below)
              </td>
              <td>
                If you apply for a job with TULA, we collect information set
                forth in a resumé, curriculum vitae, cover letter, and similar
                documentation, including contact details, employment history,
                skills, or qualifications, education-level, job compensation and
                benefit preferences, criminal record, credit history and similar
                data, and information provided about or by your references.
              </td>
            </tr>
            <tr>
              <td>Inferences</td>
              <td>
                Inferences drawn from some of the personal information
                categories identified herein and used to create a consumer
                profile reflecting your purchasing and marketing preferences,
                characteristics, and behavior.
              </td>
            </tr>
          </tbody>
        </table>
        <PortableTextCustom value={content?.[0]?.ContentTwoRaw} />
      </div>
    </div>
  );
};

export default PrivacyPage;
