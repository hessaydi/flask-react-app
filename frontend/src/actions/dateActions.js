import {FETCH_DATES} from './types'
import axios from 'axios'
export const fetchDates = () => dispatch =>{
    axios.get('/dates')
    .then(dates=>dispatch({
        type: FETCH_DATES,
        payload: dates.data
    }))
    .catch(err=>console.log(err));
}