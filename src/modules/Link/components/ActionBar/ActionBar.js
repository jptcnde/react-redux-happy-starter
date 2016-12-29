
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './ActionBar.css';
import Icon from '../../../../components/Icon/Icon';

/* actions */
import {
	openLinkDetail,
	selectLink,
	deleteLink,
} from '../../LinkActions';

const ActionBar = ({
	openLinkDetail,
	selectLink,
	id,
	deleteLink
}) => (
  <ul className={styles['action-bar']}>
    <li>
			<a onClick={() => {
				openLinkDetail({open: true, mode : 'edit'});
				selectLink(id);
			}}>
        <Icon name="mode_edit" />
      </a>
    </li>
    <li>
      <a >
        <Icon name="refresh"  />
      </a>
    </li>
    <li>
      <a >
        <Icon name="cloud_off" />
      </a>
    </li>
    <li>
			<a onClick={() => deleteLink(id)}>
        <Icon name="delete"  />
      </a>
    </li>
  </ul>
)
/*
   browse
   refresh
   unlink
   delete

*/

export default connect(null, {
	openLinkDetail,
	selectLink,
	deleteLink
})(ActionBar)
