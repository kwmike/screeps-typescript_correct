import {countTotalSpace} from "../functions";

const sourceProto = () => {

  Memory.source = Memory.source || {};

  Object.defineProperty(Source.prototype, 'memory', {
    enumerable : true,
    configurable : false,
    get: function () {
      Memory.source[this.id] = Memory.source[this.id] || {};
      return Memory.source[this.id];
    }
  });

  Object.defineProperty(Source.prototype, 'totalSpace', {
    enumerable: false,
    configurable: true,
    get: function() {
      if (this._totalSpace === undefined || this.memory.totalSpace === undefined) {
        this._totalSpace = this.memory.totalSpace = countTotalSpace(this);
      }
      return this._totalSpace;
    }
  });

  Object.defineProperty(Source.prototype, 'workers', {
    enumerable: false,
    configurable: true,
    get: function() {
      if (this.memory.currentWorkers === undefined) {
        this.memory.currentWorkers = [];
      }
      return this.memory.currentWorkers;
    }
  });

  Object.defineProperty(Source.prototype, 'addWorkers', {
    enumerable: true,
    configurable: true,
    value: function(creep:Creep) {
      if (!this.memory.currentWorkers.find((worker: { id: Id<Creep>; }) => worker.id === creep.id)) {
        this.memory.currentWorkers.push({
          id: creep.id,
          name: creep.name
        });
      }
    }
  });

  Object.defineProperty(Source.prototype, 'removeWorkers', {
    enumerable: true,
    configurable: true,
    value: function(name:string) {
      console.log(`Removing worker: ${name}`);
      let index = this.memory.currentWorkers.findIndex((e: { name: string; }) => e.name === name);
      console.log("index: ", index);
      if (index !== -1) {
        console.log("Before removal: ", JSON.stringify(this.memory.currentWorkers));
        this.memory.currentWorkers.splice(index,1);
        console.log("After removal: ", JSON.stringify(this.memory.currentWorkers));
      }
    }
  });
}

export default sourceProto;
