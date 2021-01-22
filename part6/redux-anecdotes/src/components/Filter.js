import React from 'react'
import {connect} from 'react-redux'
import {filter} from '../reducers/filterReducer'

const Filter = ({ filter }) => {
  const style = {
    marginBottom: 10
  }
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value
    // dispatch(filter({filter: filterValue}))
    //  dispatch(filter(filterValue))
    filter(filterValue)
  }

  return (
    <div style={style}>
     filter: <input id="filter" onChange={handleChange}/>
    </div>
  )
}

const ConnectedFilter = connect(null, {filter})(Filter)
export default ConnectedFilter