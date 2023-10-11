function IRactionCreater(arr){

    return function IRaction(dispatch, getState){


        dispatch({
            type:"GRAPH",
            payload:arr
        })


    }
}


export default IRactionCreater