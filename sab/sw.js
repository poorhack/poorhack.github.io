onmessage = (e) => {
  if (e.data === 'check-sab') {
    e.source.postMessage(typeof SharedArrayBuffer !== 'undefined');
  }
};
