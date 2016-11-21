import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../modules/map'
import { Dropdown, Search, Grid, Header } from 'semantic-ui-react'


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

const CrimeTypeList = [
'Robery', 
'Weapon', 
'Assault', 
'Narcotic', 
'Warrant Arrest', 
'Threats', 
'Stay out of area of drugs', 
'Extortion', 
'Disorderly Conduct', 
'Shop Lifting', 
'Pick Pocket', 
'Burglary' ]

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
    <div>
      <Search
        category
        loading={isLoading}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
      <Dropdown placeholder='Select Crime Type' fluid multiple search selection options={CrimeTypeList} />
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD1oQ3jJcOyW9CIBmeI4rJiQR1cw2gvE7M"
})(Container)
