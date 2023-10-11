import Axios from "./axios";


function getFilterData (data){

    return Axios.get(`/fil/${data}`)
}
function getQueryData (end_year, topic, sector, region, source, country,pestle){

    return Axios.get(`/get?end_year=${end_year}&topic=${topic}&sector=${sector}&region=${region}&source=${source}&country=${country}&pestle=${pestle}`)
}


export {getFilterData,getQueryData}