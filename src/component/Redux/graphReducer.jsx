const graphData = {
    graphData:[]
}

function graphReducer(state=graphData, action){


    switch(action.type){

        case "GRAPH":
            state= {
                ...state,
                graphData:action.payload
            }
            break;
        
    }

        return state
}

export default graphReducer
