export default class Defer {
  promise = null;
  resolve = null;
  reject = null;
  hand = false;

  constructor(f1 = () => {}, f2 = () => {}) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = x => {
        resolve(x);
        f1(x);
      };

      this.reject = x => {
        reject(x);
        f2(x);
      };
    });
  }

  then(mixed) {
    return this.resolve && this.resolve(mixed);
  }

  catch(error) {
    return this.reject && this.reject(error);
  }

  handshake() {
    this.hand = true;
  }
};
