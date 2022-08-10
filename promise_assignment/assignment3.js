const fs_promise = require('fs/promises')

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = fs_promise.readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}