import handleHarvest from "./harvest";
import handleBuild from "./build";

export const roles = {
  harvest: handleHarvest,
  build: handleBuild
}
