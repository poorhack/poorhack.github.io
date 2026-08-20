onconnect = (e) => {
  const port = e.ports[0];
  port.postMessage(typeof SharedArrayBuffer !== 'undefined');
};
