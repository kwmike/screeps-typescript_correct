const creepProto = () => {

  Object.defineProperty(Creep.prototype, "setWorkLocation", {
    enumerable: true,
    configurable: false,
    value: function(workLocation:string) {
      this.memory.workLocation = this._workLocation = workLocation;
    }
  });

  Object.defineProperty(Creep.prototype, "setWorkStatus", {
    enumerable: true,
    configurable: false,
    value: function(working:boolean) {
      this.memory.working = this._working = working;
    }
  });

  Object.defineProperty(Creep.prototype, "workLocation", {
    enumerable: true,
    configurable: false,
    get: function() {
      return this.memory.workLocation;
    }
  })
}

export default creepProto;
