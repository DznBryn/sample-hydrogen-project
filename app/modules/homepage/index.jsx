import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const Homepage = ({pets}) => {
  return (
    <section className="mainContainer">
      <h3 className="title">Welcome to our site!</h3>
      <p className="content">This is the home page.</p>
      <p><b>Sanity Data Fetch Test:</b></p>
      <ol>
        {pets.map(pet => <li key={pet.name}>{pet.name}</li>)}
      </ol>
    </section>
  );
};

export default Homepage;
