import {roles} from "./roles";

const handleCreeps = (creep:Creep) =>  {

  if (creep.memory.role === 'harvest') {
    roles.harvest(creep);
  } else if (creep.memory.role === 'build') {
    //roles.build(creep);
  }
}

export default handleCreeps;
