
import { createSelector } from 'reselect';

export const getFilteredLinks = state => state.getIn(['links', 'byIds']);

export const getFilter = state => state.getIn(['ui', 'filter']);

export const getLinkPageDialog = state => state.getIn(['ui', 'dialog']);

export const getMode = state => state.getIn(['ui', 'dialog', 'mode']);

export const getDetail = createSelector([
	state => state.getIn(['ui', 'selectedItem'])
],
	detail => ({
		id : detail.get('id'),
		title : detail.get('title'),
		description : detail.get('description')
}));

export const getLinks = createSelector(
	[getFilteredLinks, getFilter],
	(filteredLinks, filter) => !filter 
		? filteredLinks 
		: filteredLinks.filter(x => x.get('title').includes(filter))
)