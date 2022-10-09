import { ErrorMapper } from "utils/ErrorMapper";
import handleCreeps from "./creeps";
import {spawners} from './spawner';
import {role} from './enum/role';
import protos from './prototypes';

protos();

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definition alone.
          You must also give them an implementation if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    jobs: Object[];
    source: Array<Source>;
  }

  interface roleCounts {
    harvest: number,
    build: number
  }

  interface Game {
    creepCount: roleCounts
  }

  interface CreepMemory {
    role: role;
    room: string;
    working: boolean;
    id?: string;
  }

  interface Creep {
    setWorkLocation: Function;
    setWorkStatus: Function;
    workLocation: string;
  }

  interface SourceWorker {
    id: string,
    name: string
  }

  interface Source {
    currentWorkers: Array<{id:string, name:string}>
    totalSpace: number;
    workers: Array<SourceWorker>;
    addWorkers: Function;
    removeWorkers: Function;
  }

  // Syntax for adding properties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

  Game.creepCount = {
    harvest: 8,
    build: 0
  }

  _.forEach(Game.creeps, creep => {
    handleCreeps(creep);
  });

  _.forEach(Game.spawns, spawn => {
    spawners.handleSpawn(spawn);
  })

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      _.forEach(Game.spawns, spawner => {
        let sources = spawner.room.find(FIND_SOURCES);
        _.forEach(sources, source => {
          if (source.workers.find(worker => worker.name === name)) {
            source.removeWorkers(name);
          }
        });
      });
      delete Memory.creeps[name];
    }
  }
});
