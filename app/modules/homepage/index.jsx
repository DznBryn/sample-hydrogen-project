import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const Homepage = () => {
  return (
    <section className="mainContainer">
      <h3 className="title">Welcome to our site!</h3>
      <p className="content">This is the home page.</p>
    </section>
  );
};

export default Homepage;
