import React from 'react'
import {useDispatch} from 'react-redux'
import {filter} from '../reducers/filterReducer'

const Filter = () => {
  const style = {
    marginBottom: 10
  }
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value
    // dispatch(filter({filter: filterValue}))
    dispatch(filter(filterValue))
  }

  return (
    <div style={style}>
     filter: <input id="filter" onChange={handleChange}/>
    </div>
  )
}
//new test
export default Filter