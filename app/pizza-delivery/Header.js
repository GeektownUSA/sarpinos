import styles from './Header.module.css';

const Header = ({ filteredLocations }) => {

  return (
    <>
      <h1 className={styles.title}>
        {`Fresh Pizza Delivery from ${filteredLocations.length > 1 ? filteredLocations.length : ''} Sarpino\’s Restaurants`}
      </h1>
    </>
  );
}

export default Header;
