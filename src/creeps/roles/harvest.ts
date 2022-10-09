import {countTotalSpace} from "../../functions";

const handleHarvest = (creep:Creep) => {

  function findWorkLocation() {
    //console.log(`Creep ${creep.name} is not working`);
    let sources = creep.pos.findInRange(FIND_SOURCES, 100);
    let availSources: Array<Source> = [];
    let closestAvailSource: Source | null;
    if (sources != null && sources.length > 0) {
      _.forEach(sources, source => {
        if (source.totalSpace > source.workers.length) {
          availSources.push(source);
        }
      });
      if (availSources.length > 0) {
        closestAvailSource = creep.pos.findClosestByPath(availSources);
        if (closestAvailSource != null) {
          // console.log("current workers: ", JSON.stringify(closestAvailSource.workers));
          closestAvailSource.addWorkers(creep);
          creep.setWorkLocation(closestAvailSource.id);
          creep.setWorkStatus(true);
        }
      }
    }
  }

  function work() {
    let maxInventory = creep.store.getCapacity();

    // harvest
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      let workLocation = creep.workLocation;
      let target = creep.room.find(FIND_SOURCES, {
        filter: {id: workLocation}
      })[0];
      let result = creep.harvest(target);
      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      // store
      let spawn = creep.room.find(FIND_MY_SPAWNS)[0];
      let storages:Array<StructureStorage> = creep.room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_CONTAINER}
      });
      if (storages.length === 0) {
        let result = creep.transfer(spawn, RESOURCE_ENERGY);
        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      } else {
        let allStorage = creep.pos.findInRange(storages, 100);
        let availStorage:Array<StructureStorage> = [];
        let closestStorage:StructureStorage | null;
        _.forEach(allStorage, storage => {
          if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            availStorage.push(storage);
          }
        });
        if (availStorage.length > 0) {
          closestStorage = creep.pos.findClosestByPath(availStorage);
          if (closestStorage != null) {
            let result = creep.transfer(closestStorage, RESOURCE_ENERGY);
            if (result === ERR_NOT_IN_RANGE) {
              creep.moveTo(closestStorage);
            }
          }
        }
      }

    }

  }

  if (!creep.spawning) {
    if (!creep.memory.working) {
      findWorkLocation();
    } else {
      work();
    }
  }
}

export default handleHarvest;
