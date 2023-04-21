import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

/**
 * @class
 * @param {object} props 
 * @param {string} props.prop1 - Property 1.
 * @param {number} props.prop2 - Property 2.
 */
const Homepage = () => {

  /**
   * page's copy
   * @member
   * @type {string}
   */
  const COPY = 'Here is the homepage';

  /**
   * Retrieves the page's title 
   * @method
   * @author Wilson Freitas 
   * @param {string} title - page's title
   * @param {number} id - ID to be concatenated 
   * @returns page's title concatenated with the ID
   */
  function getTitle(title, id){
    return `${title} - #${id}`;
  }

  /**
   * Retrieves the page's copy 
   * @method
   * @author Wilson Freitas
   * @returns page's copy
   */
  function getCopy(){
    return COPY;
  }

  return (
    <section className="mainContainer">
      <h3 className="title">{getTitle('Welcome to our site', 2)}</h3>
      <p className="content">{getCopy()}</p>
    </section>
  );
};

export default Homepage;
