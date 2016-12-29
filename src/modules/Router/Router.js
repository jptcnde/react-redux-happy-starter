
import App from '../App'
import Link from '../Link/pages/LinkPage'
import About from '../About/pages/AboutPage'
export default (store) => ({
	path : '/',
	component : App,
	indexRoute : {
		component : Link
	},
	childRoutes : [
		{
			path : 'about',
			component : About
		},
		{
			path : 'link',
			component : Link
		},

	]
});


const getComponent = (component) => (nextState, cb) =>
	require.ensure([], require => 
		cb(null, typeof component === 'string' ? require(`${component}`).default : component))