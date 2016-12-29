import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';

import {blue500} from 'material-ui/styles/colors';
import {
	FlatButton,
	TextField
} from 'material-ui';
import styles from './LinkDetail.css';

import validate from './validate';

import {
	saveLink,
	openLinkDetail
} from '../../LinkActions';

const renderField = ({input, label, type, meta : {touched, error}}) => (
	<div>
		<TextField
			style={{width: '100%', }}
			{...input}
			hintText={label}
			errorText={touched && error}
			inputStyle={{borderColor : blue500}}
			underlineStyle={{borderColor : blue500}}
			underlineFocusStyle={{color : blue500}}
			type={type}
			/>
	</div>
)

const LinkDetail = ({
	handleSubmit,
	pristine,
	reset, 
	submitting,
	dispatch,
	
	/* user defined props */
	mode,
}) => (
	<form className={styles.container}>
		<Field name="title" type="text" component={renderField} label="title" />
		<Field name="description" type="text" component={renderField} label="description" />
		<div className={styles.action}>
			<FlatButton
				label="Cancel"
				primary={true}
				disabled={submitting}
				onTouchTap={() => {
					reset();
					dispatch(openLinkDetail());
				}}	
				/>
			<FlatButton
				label="Submit"
				primary={true}
				disabled={pristine || submitting}
				onTouchTap={handleSubmit((values, dispatch, props) => saveLink({values, dispatch, props}))}
				keyboardFocused={true}
				/>
		</div>
	</form>
)
import {
	getDetail,
	getMode
} from '../../LinkSelector';

let linkDetailForm = reduxForm({
	form: 'linkDetailForm',  // a unique identifier for this form
	validate
})(LinkDetail);

export default connect(
	state => {
		const link = state.get('link');
		return {
			initialValues : getMode(link) === 'edit' ?  getDetail(link) : {},
		};
	}
)(linkDetailForm)
