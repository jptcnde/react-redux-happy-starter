import {Map, List} from 'immutable';

export default values => {
	const errors = {};
  if (!values.get('title')) {
    errors.title = 'Required'
  }
	
  if (!values.get('description')) {
    errors.description = 'Required'
  } 
  return errors
}