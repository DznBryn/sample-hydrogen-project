import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const Homepage = () => {
  return (
    <section className="mainContainer">
      <h3 className="title">Hello!</h3>
      <p className="content">Here is the homepage</p>
    </section>
  );
};

export default Homepage;
