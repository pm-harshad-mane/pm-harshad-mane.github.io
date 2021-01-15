import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
async function init() {
  const worker = new Worker("worker.js");
  
  Comlink.expose({
     methodOnMainThread(m){
         alert(m)
    }
  }, worker);
  
  // WebWorkers use `postMessage` and therefore work with Comlink.
  const obj = Comlink.wrap(worker);
  alert(`Counter:: ${await obj.counter}`);
  await obj.inc();
  alert(`Counter:: ${await obj.counter}`);
}
init();
