let subscribers = {};

// eslint-disable-next-line no-unused-vars -- Global pubsub API consumed by other bundles
function subscribe(eventName, callback) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = [];
  }

  subscribers[eventName] = [...subscribers[eventName], callback];

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter((cb) => {
      return cb !== callback;
    });
  };
}

// eslint-disable-next-line no-unused-vars -- Global pubsub API consumed by other bundles
function publish(eventName, data) {
  if (subscribers[eventName]) {
    const promises = subscribers[eventName].map((callback) => callback(data));
    return Promise.all(promises);
  } else {
    return Promise.resolve();
  }
}
