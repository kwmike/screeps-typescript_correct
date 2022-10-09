export const countTotalSpace = (target:any) => {
  //console.log("COUNT TOTAL SPACE FUNCTION: ", target);
  let totalSpaceCount = 0;
  //check 3x3 grid around Source to determie if there is a map wall (not player wall)
  [target.pos.x - 1, target.pos.x, target.pos.x + 1].forEach(x => {
    [target.pos.y - 1, target.pos.y, target.pos.y + 1].forEach(y => {
      const terrain = Game.map.getRoomTerrain(target.pos.roomName);
      if (terrain.get(x, y) !== 1)
        //if no wall, add free space
        totalSpaceCount++;
    }, target);
  }, target);
  return totalSpaceCount;
}
