class SabTester extends AudioWorkletProcessor {
  constructor() {
    super();
    // 向主线程报告状态
    this.port.postMessage(typeof SharedArrayBuffer !== 'undefined');
  }
  process() { return true; }
}
registerProcessor('sab-tester', SabTester);
