import {LOCAL_STORAGE_DB} from '../../constants/resources';
import {CALL_API} from '../../middleware/api';
import arrayToObject from '../../util/arrayToObject';
import {fromJS, Map} from 'immutable';
export const LINKS_REQUEST = 'LINKS_REQUEST';
export const LINKS_SUCCESS = 'LINKS_SUCCESS';
export const LINKS_ERROR   = 'LINKS_ERROR';

const guid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	return v.toString(16);
});

export const getLinks = () => ({
	[CALL_API] : {
		types : [LINKS_REQUEST, LINKS_SUCCESS, LINKS_ERROR],
		promise : new Promise(resolve => {
			let db = fromJS(JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB)));
			let items = db && db.getIn(['link', 'links', 'items']).toJS()
		
			if (items && !items.length) {
				items = require('../../constants/data').default
			}
			let byIds = arrayToObject(items)

			setTimeout(() => 
				resolve({
					items,
					byIds,
					ids : Object.keys(byIds)
						.reduce((container, id) => [...container, id], [])}) 
			, 0)
		})
	}
})

export const OPEN_LINK_DETAIL = 'OPEN_LINK_DETAIL';
export const openLinkDetail = params => ({type: OPEN_LINK_DETAIL, ...params});

export const SELECT_LINK = 'SELECT_LINK';
export const selectLink = id => ({type : SELECT_LINK, id});

export const ADD_LINK         = 'ADD_LINK';
export const ADD_LINK_SUCCESS = 'ADD_LINK_SUCCESS';
export const ADD_LINK_ERROR   = 'ADD_LINK_ERROR';
export const addLink = (link) =>  ({
	[CALL_API] : {
		types : [ADD_LINK, ADD_LINK_SUCCESS, ADD_LINK_ERROR],
		promise : new Promise( resolve => {
			let db = fromJS(JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB)));
			link = {id : guid(), ...link};
			let newLink = Map(link);
			let newData = db.setIn(['link', 'links', 'items'],
				db.getIn(['link', 'links', 'items']).push(newLink)
			);
			localStorage.setItem(LOCAL_STORAGE_DB, JSON.stringify(newData.toJS()));
			
			resolve({link});
		})
	}
})

export const EDIT_LINK         = 'EDIT_LINK';
export const EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS';
export const EDIT_LINK_ERROR   = 'EDIT_LINK_ERROR';
export const editLink = (link) => ({
	[CALL_API]: {
		types: [EDIT_LINK, EDIT_LINK_SUCCESS, EDIT_LINK_ERROR],
		promise: new Promise(resolve => {
			let db = fromJS(JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB)));
			let newLink = Map(link);
			const idx = db.getIn(['link', 'links', 'items'])
				.findIndex(elem => elem.get('id') === link.id);
			let newData = db.mergeDeepIn(['link', 'links', 'items', idx], newLink);
			localStorage.setItem(LOCAL_STORAGE_DB, JSON.stringify(newData.toJS()));

			resolve({ link });
		})
	}
});

export const saveLink = ({props : {mode}, values, dispatch}) => {
	const link = values.toJS();
	return (mode === 'edit'
		? dispatch(editLink(link))
		: dispatch(addLink(link)))
	.then(() => {
		dispatch(getLinks());
		dispatch(openLinkDetail({ mode }));
	})
}

export const DELETE_LINK         = 'DELETE_LINK';
export const DELETE_LINK_SUCCESS = 'DELETE_LINK_SUCCESS';
export const DELETE_LINK_ERROR   = 'DELETE_LINK_ERROR';
export const deleteLink = id => dispatch => dispatch(({
	[CALL_API]: {
		types: [DELETE_LINK, DELETE_LINK_SUCCESS, DELETE_LINK_ERROR],
			promise: new Promise(resolve => {
				let db = fromJS(JSON.parse(localStorage.getItem(LOCAL_STORAGE_DB)));

				let newData = db.updateIn(['link', 'links', 'items'], links =>
					links.filter(el => el.get('id') !== id)
				);
				localStorage.setItem(LOCAL_STORAGE_DB, JSON.stringify(newData.toJS()));

				resolve({ id });
			})
	}
})).then(() => dispatch(getLinks()))


