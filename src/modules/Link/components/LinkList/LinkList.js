import React from 'react';
import styles from './LinkList.css';

import LinkItem from './LinkItem';

export default ({links}) => 
	<ul className={styles['link-list']}>
		{links.map(link => 
		<li className={styles['link-item']} key={link.get('id')}>
			<LinkItem
			  link={link}
				id={link.get('id')}
				title={link.get('title')} 
				description={link.get('description')} />
		</li>
		).toList()}
	</ul>