const store = {};

const subscribe = (eventName, callback) => {
    if (!store[eventName]) {
        store[eventName] = [];
    }

    store[eventName].push(callback);
};

const unsubscribe = (eventName, callback) => {
    if (store[eventName]) {
        store[eventName] = store[eventName].filter(
            item => item !== callback
        );
    }
};

const publish = (eventName, data) => {
    if (store[eventName]) {
        store[eventName].forEach(callback => {
            callback(data);
        });
    }
};

export default {
    subscribe,
    unsubscribe,
    publish
};