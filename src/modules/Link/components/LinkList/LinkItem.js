import React from 'react';

import styles from './LinkItem.css';

import ActionBar from '../ActionBar'


export default ({title, description, id, link}) =>
	<div className={styles.panel}>
		<span className={styles.title}>{title}</span>
		<p className={styles.description}>{description}</p>
		<ActionBar {...{id}}/>
	</div>