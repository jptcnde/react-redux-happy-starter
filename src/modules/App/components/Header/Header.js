import React, { PropTypes } from 'react';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        Happy

      </div>
    </header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
};

export default Header;
