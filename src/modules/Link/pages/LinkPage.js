import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';


import styles from './LinkPage.css';

/* actions */
import { 
	getLinks,
	openLinkDetail
} from '../LinkActions';


/* components */
import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import LinkList from '../components/LinkList';
import LinkDetail from '../components/LinkDetail';

export class LinkPage extends Component {
	componentWillMount() {
		this.props.getLinks()
	}

	renderDialogContent({mode}) {
		return <LinkDetail mode={mode}/>
	}
	
	render() {
		
		/* state */
		const {
			fetching,
			links,
			dialog
		} = this.props;

		/* actions */
		const {
			openLinkDetail
		} = this.props;

		return (
			<div>
				<LinkList links={links} />
				<FloatingActionButton 
					onClick={ ()=> openLinkDetail({open: true}) }
					className={styles['add-link']}>
				  <ContentAdd />
				</FloatingActionButton>

				<Dialog
				  contentStyle={{
						minWidth : '550px'
					}}
					open={dialog.get('open')}
					title={dialog.get('title')}
					modal={true}
					>
					{this.renderDialogContent({
						mode : dialog.get('mode')
					})}
				</Dialog>
			</div>
		)
	}
}


import {
	getLinks as links,
	getFilter as filter,
	getLinkPageDialog as dialog
} from '../LinkSelector'

function mapStateToProps(store) {
	const state = store.get('link');
	return {
		fetching: state.get('fetching'),
		...createStructuredSelector({
				links,
				filter,
				dialog
		})(state)
	}
}

export default connect(mapStateToProps, {
	getLinks,
	openLinkDetail
})(LinkPage)