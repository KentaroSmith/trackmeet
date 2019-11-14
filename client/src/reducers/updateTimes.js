const timesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return action.payload;
        default:
            return state;
    }
}

export default timesReducer;