const FOUNDATIONARRAY = [
  '전체',
  '5년 이내',
  '10년 이내',
  '15년 이내',
  '20년 이내',
];

const HOUSEHOLDSARRAY = [
  '전체',
  '200세대 이상',
  '500세대 이상',
  '1000세대 이상',
  '2000세대 이상',
];
const TYPEARRAY = ['매매', '전세'];

const AREAFILTER = [
  {
    '10평 이하': [1, 2],
  },
  {
    '10평': [3, 5],
  },
  {
    '20평': [6, 8],
  },
  {
    '30평': [9, 12],
  },
  {
    '40평': [13, 15],
  },
  {
    '50평': [16, 18],
  },
  {
    '60평': [19, 21],
  },
  {
    전체: [1, 21],
  },
];

export const Data = {
  FOUNDATIONARRAY,
  HOUSEHOLDSARRAY,
  TYPEARRAY,
  AREAFILTER,
};
