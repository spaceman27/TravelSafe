import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

import { Menu } from 'semantic-ui-react'
import '../node_modules/semantic-ui-css/semantic.min.css'

let GoogleApiWrapper;
// if (__IS_DEV__) {
  GoogleApiWrapper = require('../modules/map').GoogleApiWrapper
// } else {
//   GoogleApiWrapper = require('../dist').GoogleApiWrapper
// }

import styles from './styles.module.css'


class Container extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {}
    this.handleItemClick = this.handleItemClick.bind(this);
  } 

  handleItemClick(e, {name}){
    this.setState({ activeItem: name })
  }

  renderChildren(){
    const {children} = this.props;
    if (!children) return;

    const sharedProps = {
      google: this.props.google,
      loaded: this.props.loaded
    }
    return React.Children.map(children, c => {
      return React.cloneElement(c, sharedProps, {
        
      });
    })
  } 

  render(){
    const {routeMap, routeDef} = this.props;
    const {router} = this.context;

    const c = this.renderChildren();
    const { activeItem } = this.state
    return (
      <div className={styles.container}>        
        <div className={styles.wrapper}>
        <Menu fluid widths={routeMap.length}>
          {Object.keys(routeMap).map(key => {
            return (
              <Menu.Item as={Link} to={key} activeClassName={styles.active} key={key} name={routeMap[key].name} active={activeItem === routeMap[key].name} onClick={this.handleItemClick} />
            )
          })}
        </Menu>          
        </div>
      </div>
    )
  }
}
Container.propTypes = {
  children: T.element.isRequired
}
Container.contextTypes = {
  router: T.object
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD1oQ3jJcOyW9CIBmeI4rJiQR1cw2gvE7M"
})(Container)
