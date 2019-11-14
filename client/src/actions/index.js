export const increment = () => {
    return {
        type: 'INCREMENT'
    }
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
};

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        payload: user
    }
};

export const updateRoom = (room) => {
    return {
        type: 'UPDATE_ROOM',
        payload: room
    }
};

export const updateTimes = (times) => {
    return {
        type: 'UPDATE_TIMES',
        payload: times
    }
};