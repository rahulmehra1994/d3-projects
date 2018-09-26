var datas = {
  n1: [
    ["n2", "in"],
    ["n3", "in"],
    ["n4", "out"],
    ["n5", "in"]
  ],
  n2: [
    ["n1", "in"],
    ["n3", "in"],
    ["n4", "in"]
  ],
  n3: [
    ["n1", "in"],
    ["n2", "in"],
    ["n4", "in"],
  ],
  n4: [
    ["n1", "in"],
    ["n2", "in"],
    ["n3", "in"],    
  ],
  n5: [
    ["n1", "in"],
    ["n2", "in"],
  ]
}

var markers = [
  {
    id: 0,
    name: "circle",
    path: "M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0",
    viewbox: "-6 -6 12 12"
  },
  {
    id: 1,
    name: "square",
    path: "M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z",
    viewbox: "-5 -5 10 10"
  },
  {
    id: 2,
    name: "arrow",
    path: "M 0,0 m -5,-5 L 5,0 L -5,5 Z",
    viewbox: "-5 -5 10 10"
  },
  {
    id: 3,
    name: "stub",
    path: "M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z",
    viewbox: "-1 -5 2 10"
  },
  {
    id: 4,
    name: "arrowIn",
    path: "M 0,0 m 5,5 L -5,0 L 5,-5 Z",
    viewbox: "-5 -5 10 10"
  }
];
