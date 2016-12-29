import {fromJS, Map} from 'immutable'

import createReducer from '../../util/createReducer';
import {
  LINKS_REQUEST ,
  LINKS_SUCCESS ,
  LINKS_ERROR   ,
	
	OPEN_LINK_DETAIL,
	ADD_LINK         ,
	ADD_LINK_SUCCESS ,
	ADD_LINK_ERROR   ,
	EDIT_LINK,
	EDIT_LINK_SUCCESS,
	EDIT_LINK_ERROR,
	DELETE_LINK        ,
	DELETE_LINK_SUCCESS,
	DELETE_LINK_ERROR  ,
	SELECT_LINK,
} from './LinkActions';
const initialState = {
  error: false,
  fetching : false,
  links : {
    items : [],
    ids  : [],
    byIds : {}
  },
  ui : {
    selectedIds : [],
		selectedItem : null,
    filter : '',
    dialog : {
      open: false,
      mode : '',
      title : ''
    }
  }
};


export default createReducer(initialState, {
  [LINKS_REQUEST](state) {
    return state.setIn(['fetching'], true)
  },
  [LINKS_SUCCESS](state, {payload : {byIds, ids, items}}) {
    return state.setIn(['links', 'items'], fromJS(items))
    .setIn(['links', 'byIds'], fromJS(byIds))
    .setIn(['links', 'ids'], fromJS(ids))
    .setIn(['fetching'], false)
    .setIn(['error'], false);
  },
  [OPEN_LINK_DETAIL](state, {open, title, mode}) {
    return state.setIn(['ui', 'dialog', 'open'], !!open)
		.setIn(['ui', 'dialog', 'mode'], mode)
		.setIn(['ui', 'dialog', 'title'], mode === 'edit' ? 'Edit Link' : 'Add Link');
  },
	[ADD_LINK_SUCCESS](state, {payload: {link}}) {
		return state.setIn(['links', 'items'],
			state.getIn(['links', 'items']).push(fromJS(link))
		);
	},
	[EDIT_LINK_SUCCESS](state, {payload: {link}}) {
		const idx = state.getIn(['links', 'items'])
			.findIndex(elem => elem.get('id') === link.id);
		return state.mergeDeepIn(['links', 'items', idx], Map(link));
	},
	[DELETE_LINK_SUCCESS](state, {payload : {id}}) {
		return state.updateIn(['links', 'items'], links =>
			links.filter(el => el.get('id') !== id)
		);
	},
	[SELECT_LINK](state, {id}) {
		const idx = state.getIn(['ui', 'selectedIds'])
			.findIndex(elem => elem === id);

		return state.setIn(['ui', 'selectedIds', idx === -1 ? 0 : idx], id)
		.setIn(['ui', 'selectedItem'], 
			state.getIn(['links', 'byIds', id])
		)
	}
});

