import PortableTextCustom from '../portableTextCustom';
import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
  };

  const TulaScholarshipPage = ({content}) => {
    return (
      <div className="fixedWidthPage minHeight">
        <div className={"section medicalSchoolScholarship"}>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentTwoRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentThreeRaw} />
          </div>
          <div className={"section quote"}>
            <PortableTextCustom value={content[0].ContentFourRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentFiveRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentSixRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentSevenRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentEightRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentNineRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentTenRaw} />
          </div>
          <div className={"section"}>
            <PortableTextCustom value={content[0].ContentElevenRaw} />
          </div>
          
        </div>
      </div>
    )
  }
  
  export default TulaScholarshipPage