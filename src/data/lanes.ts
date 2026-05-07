type LaneTemplate = {
  name: string;
  effect?: string;
};

export const lanePool: LaneTemplate[] = [
  { name: "Plains" },
  { name: "Forest", effect: "boost_all" },
  { name: "Ruins", effect: "weaken_all" },
  { name: "Sanctuary", effect: "draw_bonus" },

  { name: "Forge", effect: "boost_all" },
  { name: "Swamp", effect: "weaken_all" },
  { name: "Temple", effect: "draw_bonus" },

  { name: "Village" },
  { name: "Desert" },
];
