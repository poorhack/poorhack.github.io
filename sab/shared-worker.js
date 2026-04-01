onconnect = (e) => {
  const port = e.ports[0];
  port.send(typeof SharedArrayBuffer !== 'undefined');
};
