import axios from 'axios';


export const fetchData = async(url) =>{
    const res = await axios.get(url);
    return res;   
}