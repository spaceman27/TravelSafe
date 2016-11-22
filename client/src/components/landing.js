import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../modules/map'
import { Button, Dropdown, Search, Grid, Header } from 'semantic-ui-react'
import styles from './landing.module.css'

const getResults = () => _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

const source = _.range(0, 3).reduce((memo, index) => {
  const name = faker.hacker.noun()

  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})

const CrimeTypeList = function(){
  return 
  [ 
    { value: 0, flag: 0, text: 'Robery' },
    { value: 1, flag: '1', text: 'Weapon' },
    { value: 2, flag: '2', text: 'Assault' },
    { value: 3, flag: '3', text: 'Narcotic' },
    { value: 4, flag: '4', text: 'Warrant Arrest' },
    { value: 5, flag: '5', text: 'Threats' },
    { value: 6, flag: '6', text: 'Stay out of area of drugs' },
    { value: 7, flag: '7', text: 'Extortion' },
    { value: 8, flag: '8', text: 'Disorderly Conduct' },
    { value: 9, flag: '9', text: 'Shop Lifting' },
    { value: 10, flag: '10', text: 'Pick Pocket' },
    { value: 11, flag: '11', text: 'Burglary' } 
  ]
}();

class Container extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }    
  } 

  onMapMoved(props, map) {
    const center = map.center;
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose(){
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent(){
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleChange(e, result){
    this.setState({ value: result.title })
  }

  handleSearchChange(e, value){
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(source, (memo, data, name) => {
        const results = _.filter(data.results, isMatch)

        if (results.length) {
          memo[name] = { name, results }
        }

        return memo
      }, {})

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 500)
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const { isLoading, value, results } = this.state
    
    return (
      <table>
      <tbody>
        <tr style={styles.header}>
          <td>
            <Search 
            category
            placeholder='Location Name/Address and City'
            loading={isLoading}
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
            />
            <Dropdown placeholder='Select Crime Type' fluid multiple search selection options={CrimeTypeList} />
          </td>
        </tr>
        <tr>
          <td>
            <Map google={this.props.google}
            style={{width: '100%', height: '100%', position: 'relative'}}
            className={'map'}
            zoom={14}
            containerStyle={{}}
            centerAroundCurrentLocation={true}
            onClick={this.onMapClicked}
            onDragend={this.onMapMoved} />
          </td>
        </tr>
        <tr style={styles.footer}>
          <td >
            <Button attached='left'> Left </Button>
            <Button attached='right'> Right </Button>          
          </td>
          <td >
            <Button circular color='facebook' icon='facebook' />
            <Button circular color='twitter' icon='twitter' />
            <Button circular color='google plus' icon='google plus' />
          </td>
        </tr>
      </tbody>
      </table>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD1oQ3jJcOyW9CIBmeI4rJiQR1cw2gvE7M"
})(Container)
