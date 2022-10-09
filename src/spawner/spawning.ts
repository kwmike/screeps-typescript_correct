import {role} from "../enum/role";

interface creepCounts {
  harvest: number,
  build: number
}

const handleSpawning = (spawner:StructureSpawn) => {

  const tick:number = Game.time
  const room:string = spawner.room.name;

  const count:creepCounts = {
    harvest: _.filter(Game.creeps, creep => creep.memory.role === 'harvest').length,
    build: _.filter(Game.creeps, creep => creep.memory.role === 'build').length
  }

  const spawnHarvester = (dryRun:boolean) => {
    return spawner.spawnCreep([WORK, CARRY, MOVE], `harvest${tick}`, {
      memory: {
        role: role.harvest,
        room: room,
        working: false
      },
      dryRun: dryRun
    });
  }

  const spawnBuilder = (dryRun: boolean) => {
    return spawner.spawnCreep([WORK, CARRY, MOVE], `build${tick}`, {
      memory: {
        role: role.build,
        room: room,
        working: false
      },
      dryRun: dryRun
    });
  }

  if (spawner.spawning === null) {

    if (Game.creepCount.harvest > count.harvest) {

      if (spawnHarvester(true) === 0) {
        console.log("spawn harvester");
        spawnHarvester(false);
      }
    } else if (Game.creepCount.build > count.build) {

      if (spawnBuilder(true) === 0) {
        console.log("spawn builder");
        spawnBuilder(false);
      }
    }

  }
}

export default handleSpawning;
