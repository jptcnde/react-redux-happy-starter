
import React, { PropTypes } from 'react';


const Icon = ({name, style, size, modifier}) => (
  <i style={style}
    className={`material-icons ${size || 'md-24'} ${modifier}`}>
    {name}
  </i>
)

Icon.propTypes = {
  name : PropTypes.string.isRequired
}

export default Icon