const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ROOM':
            return action.payload;
        default:
            return state;
    }
}

export default roomReducer;