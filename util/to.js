const to = (promise) => {
  return promise.then((value)  => [null, value])
                .catch((error) => [error, null]);
}

exports.to = to;