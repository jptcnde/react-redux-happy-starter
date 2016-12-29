
import Immutable, { Map, List, fromJS } from 'immutable'

const isChildrenArray = (evts) => evts.every(evt => Array.isArray(evt))

const groupEvents = (evts, handlers) => {
  if (!(Array.isArray(evts) && evts.length)) { return handlers }

  if (!isChildrenArray(evts)) {
    throw new Error('All arguments must be an array')
  }

  let flattenedEvts = evts.reduce((e, next) => {
    const len = next.length;
    const func = next.slice(len - 1)[0];
		if (typeof func !== 'function') {
			throw Error('Last element must be a function.');
		}
    next.slice(0, len - 1).forEach(type => {
			if (typeof type !== 'string') {
				throw Error('Event type should be string.');
			}
			e[type] = func;
		})
    return e;
  } , {})

  for (let eventType in flattenedEvts) {
    handlers[eventType] = flattenedEvts[eventType]
  }
  return {...handlers};
}

export default function createReducer(initialState, handlers, ...commonEvts) {
  handlers = groupEvents(commonEvts, handlers);
  return (state = initialState, action) => {
    if (!Map.isMap(state) && !List.isList(state)) {
      state = Immutable.fromJS(state);
    }
    const ret = (handlers[action.type] && handlers[action.type](state, action)) || state;
    if (!Map.isMap(ret) && !List.isList(ret)) {
      throw new TypeError('Reducers must return Immutable objects.')
    }

    return ret
  }
}


