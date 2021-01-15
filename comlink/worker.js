importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
// importScripts("../../../dist/umd/comlink.js");
 
const obj = {
  counter: 100,
  inc() {
    this.counter++;
  },
};
 
Comlink.expose(obj);
