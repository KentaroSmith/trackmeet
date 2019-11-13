const userReducer = (state = { firstName: "Todd", lastName: "Smith", email: "toddnan@gmail.com" }, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;