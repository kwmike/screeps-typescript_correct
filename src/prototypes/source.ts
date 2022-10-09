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
      if (this.memory.currentWorkers === undefined || this._currentWorkers === undefined) {
        this._currentWorkers = this.memory.currentWorkers = [];
      }
      return this._currentWorkers;
    }
  });

  Object.defineProperty(Source.prototype, 'addWorkers', {
    enumerable: true,
    configurable: true,
    value: function(creep:Creep) {
      let currentWorkers:Array<{ id:string, name:string }> = [];
      let retval:{id:string, name:string} = {id:'',name:''}
      console.log("This.memory: ", JSON.stringify(this.memory));
      console.log("This._currentWorkers: ", JSON.stringify(this._currentWorkers));
      console.log("MEMORY: ", JSON.stringify(Memory.source[this.id]))
      currentWorkers = this.memory.currentWorkers;
      console.log("Current source workers: ", JSON.stringify(currentWorkers));
      if (!currentWorkers.find(worker => worker.id === creep.id)) {
        retval = {
          id: creep.id,
          name: creep.name
        }
      }
      console.log("retval: ", JSON.stringify(retval));
      currentWorkers.push(retval);
      this.memory.currentWorkers = this._currentWorkers = currentWorkers;
      console.log("AFTER MEMORY: ", JSON.stringify(Memory.source[this.id]))
    }
  });

  Object.defineProperty(Source.prototype, 'removeWorkers', {
    enumerable: true,
    configurable: true,
    value: function(name:string) {
      let currentWorkers:Array<{id:string, name:string}> = [];
      if (!this.memory.currentWorkers === undefined || this._currentWorkers === undefined) {
        currentWorkers = this._currentWorkers;
      }
      let index = currentWorkers.findIndex((e) => e.name === name);
      if (index != -1) {
        this.memory.currentWorkers = this._currentWorkers = currentWorkers.splice(index,1);
      }
    }
  })
}

export default sourceProto;
