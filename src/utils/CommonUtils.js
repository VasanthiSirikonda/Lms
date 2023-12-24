const dashboardTiles = [
  {
    title: "Map Component",
    component: ["Map", "Table"],
  },
  {
    title: "Form Component",
    component: ["Form"],
  },
  {
    title: "Table Component",
    component: ["Table"],
  },
];
const toggleJson = [
  {
    title: "Call Drop",
    name: "Call Drop",
    id: "switch_left",
  },
  {
    title: "Tickets",
    name: "Tickets",
    id: "switch_right",
  },
];

const customerJson = [
  {
    title: "Customer",
    name: "Customer",
    id: "Cust_switch_left",
  },
  {
    title: "eNodeB",
    name: "eNodeB",
    id: "Cust_switch_right",
  },
];

const customerSummaryJson = [
  {
    title: "Customer Summary",
    name: "Customer Summary",
    id: "Cust_Summary_switch_left",
  },
  {
    title: "eNodeB Summary",
    name: "eNodeB Summary",
    id: "Cust_Summary_switch_right",
  },
];

const FiveGMapOption = [
  {
    title: 'Score Range Selection',
    name: 'Score Range Selection',
    id: 'Score_Range_Selection_main',
    default: 'Score Range Selection',
    subSelections: [
      {
        title: 'Score Range 100-91',
        name: 'Score Range 100-91',
        id: 'Score_Range_100_91_sub_selection',
        ranges: ['100-99', '98-97', '96-95', '94-93', '92-91'],
      },
      {
        title: 'Score Range 90-81',
        name: 'Score Range 90-81',
        id: 'Score_Range_90_81_sub_selection',
        ranges: ['90-89', '88-87', '86-85', '84-83', '82-81'],
      },
      {
        title: 'Score Range 80-71',
        name: 'Score Range 80-71',
        id: 'Score_Range_80_71_sub_selection',
        ranges: ['80-79', '78-77', '76-75', '74-73', '72-71'],
      },
      {
        title: 'Score Range 70-61',
        name: 'Score Range 70-61',
        id: 'Score_Range_70_61_sub_selection',
        ranges: ['70-69', '68-67', '66-65', '64-63', '62-61'],
      },
      {
        title: 'Score Range 60-0',
        name: 'Score Range 60-0',
        id: 'Score_Range_60_0_sub_selection',
        ranges: ['60-51', '50-41', '40-31', '30-21', '20-0'],
      },
    ],
  },
  // {
  //   title: 'Nearby gNodeB',
  //   name: 'Nearby gNodeB',
  //   id: 'Nearby_gNodeB',
  //   default: '',
  //   subSelections: [],
  // },
];
const FiveGColorCal = (value) => {
  // Round the value to the nearest integer
  value = Math.trunc(value); 
  if ((value >= 99 && value <= 100) || (value >= 89 && value <= 90) || (value >= 79 && value <= 80) || (value >= 69 && value <= 70) || (value >= 51 && value <= 60)) {
    return "#EE0000";
  } else if ((value >= 97 && value <= 98) || (value >= 87 && value <= 88) || (value >= 77 && value <= 78) || (value >= 67 && value <= 68) || (value >= 41 && value <= 50)) {
    return "#ED7000";
  } else if ((value >= 95 && value <= 96) || (value >= 85 && value <= 86) || (value >= 75 && value <= 76) || (value >= 65 && value <= 66) || (value >= 31 && value <= 40)) {
    return "#FFBC3D";
  } else if ((value >= 93 && value <= 94) || (value >= 83 && value <= 84) || (value >= 73 && value <= 74) || (value >= 63 && value <= 64) || (value >= 21 && value <= 30)) {
    return "#36BE19";
  } else if ((value >= 91 && value <= 92) || (value >= 81 && value <= 82) || (value >= 71 && value <= 72) || (value >= 61 && value <= 62) || (value >= 0 && value <= 20)) {
    return "#04837F";
  }
}
const legendColors = {
  0: "#04837F",
  1: "#36BE19",
  2: "#FFBC3D",
  3: "#ED7000",
  4: "#EE0000",
};
const FiveGlegendColors = {
  0: "#EE0000",
  1: "#ED7000",
  2: "#FFBC3D",
  3: "#36BE19",
  4: "#04837F",
};
const legendShadowColors = {
  0: "#87d6d4",
  1: "#9bed8a",
  2: "#f1f59d",
  3: "#f7c17e",
  4: "#f57067",
}

const legendShadowColorsforlegends = {
  0: "0 0 1px 3px rgb(135 214 212 / 80%)",
  1: "0 0 1px 3px rgb(155 237 138/ 80%)",
  2: "0 0 1px 3px rgb(241 245 100 / 80%)",
  3: "0 0 1px 3px rgb(247 193 126 / 80%)",
  4: "0 0 1px 3px rgb(245 112 103 / 80%)",
  };

const borderColors = {
  0: "#048330",
  1: "#048330",
  2: "#FFBC3D",
  3: "#ED7000",
  4: "#F56666",
};

const ActivationMapColors = {
  0: "#78C679",
  1: "#32A354",
  2: "#016737"
}

const UserliveTracklegendColors = {
  0: "#36BE19",
  1: "#ED7000",
  2: "#EE0000",
};

const getIntervals = (min, max, nbIntervalls) => {
  max -= min;
  var size = Math.round((max - 1) / nbIntervalls);
  var result = [];

  for (let i = 0; i < nbIntervalls; i++) {
    var inf = i + i * size;
    var sup = inf + size < max ? inf + size : max;
    result.push([inf + min, sup + min]);
    if (inf >= max || sup >= max) break;
  }
  return result;
};

const commonSort = (points) => {
  points?.sort(function (a, b) {
    return a - b;
  });
  return points;
};

const validateIntervals = (grades, value) => {
  let registeredKey = 0;
  let colors = "#DCDCDC";
  grades.map((el, key) => {
    if (value >= el[0] && value <= el[1]) {
      registeredKey = key;
    }
  });
  let legendCal = 1;
  if (grades.length < 10) {
    legendCal = gradeCalculation(grades);
  }
  // let prev = 0;
  let k = registeredKey == 0 ? registeredKey : (registeredKey + 1) * legendCal;
  // for (let i = 0; i < grades.length; i++) {
  //   prev = prev + k;
  // }
  let colorArr = legendColors[k];
  if (colorArr) {
    colors = colorArr;
  }
  return colors;
};

const gradeCalculation = (value) => {
  let legendCal = 10 / value.length;
  legendCal = legendCal.toString();
  legendCal = legendCal.split(".")[0];
  legendCal = Math.trunc(legendCal);
  return legendCal;
};

const calculateIntervals = (data) => {
  let minMax = data?.map((el) => el.Anomalies_count);
  minMax = commonSort(minMax);
  let min = minMax[0];
  let max = minMax[minMax.length - 1];
  return { min: min, max: max };
};

const validatePercentage = (data, value) => {
  let minMax = calculateIntervals(data);
  let min = minMax.min;
  let max = minMax.max;
  let grades = getIntervals(min, max, 10);
  return validateIntervals(grades, value);
};

const commonGrade = [[1, 10], [11, 50], [51, 100], [101, 500], [501]];
const customerGrade = [
  [0, 5000],
  [5001, 25000],
  [25001, 50000],
  [50001, 100000],
  [100001],
];
const eNodeBGrade = [[0, 9], [10, 19], [20, 29], [30, 39], [40]];
const activationGrade = [[0, 100], [101, 500], [501]];
const callDropsGrade = [[1, 10], [11, 50], [51, 100], [101, 500], [501]];
const zipGrade = [[20], [21, 40], [41, 60], [61, 80], [81]];
// const zipGrade = [ [81], [61, 80],[41, 60],[21, 40],[20]]

const colourCalculation = (value, dashboard, percent) => {
  const grade = getCommonGrade(dashboard);
  let key = 0;
  grade.map((el, k) => {
    if (el.length === 1) {
      if (value > el[0]) {
        key = k;
        return;
      }
    } else {
      if (value >= el[0] && value <= el[1]) {
        key = k;
        return;
      }
    }
  });
  if (dashboard === "eNodeB Call Drop Count") {
    return picLegendColor(key, percent, false);
  } 
  if (dashboard === "Users Count") {
    let legendColor1 = ActivationMapColors[key];
    legendColor1 = legendColor1.split("#")[1];
    return [hexToRGBToOpacity(legendColor1, percent), ActivationMapColors[key]];
  }
  if (dashboard === "Users Count") {
    return ActiveLegendColor(key, percent, false);
  } 
  else {
    let legendColor = legendColors[key];
    legendColor = legendColor.split("#")[1];
    return [hexToRGBToOpacity(legendColor, percent), borderColors[key]];
  }
};
const colourCalculationforshadow = (value, dashboard, percent) => {
  const grade = getCommonGrade(dashboard);
  let key = 0;
  grade.map((el, k) => {
    if (el.length === 1) {
      if (value > el[0]) {
        key = k;
        return;
      }
    } else {
      if (value >= el[0] && value <= el[1]) {
        key = k;
        return;
      }
    }
  });
  if (dashboard === "eNodeB Call Drop Count") {
    return picLegendShadowColor(key, percent, false);
  }

}
const picLegendShadowColor = (key, percent, opacity) => {
  let legendColor = legendShadowColors[key];
  // if (legendColor) {
  //   legendColor = legendColor.split("#")[1];
  // }
  // if (opacity) {
  //   return hexToRGBToOpacity(legendColor, percent);
  // } else {
  //   return hexToRGBToPercent(legendColor, percent);
  // }
  return legendColor;
};
const ActiveLegendColor = (key, percent, opacity) => {
  let legendColor = ActivationMapColors[key];
  if (legendColor) {
    legendColor = legendColor.split("#")[1];
  }
  if (opacity) {
    return hexToRGBToOpacity(legendColor, percent);
  } else {
    return hexToRGBToPercent(legendColor, percent);
  }
};

const picLegendColor = (key, percent, opacity) => {
  let legendColor = legendColors[key];
  if (legendColor) {
    legendColor = legendColor.split("#")[1];
  }
  if (opacity) {
    return hexToRGBToOpacity(legendColor, percent);
  } else {
    return hexToRGBToPercent(legendColor, percent);
  }
};

const picLegendColorForZip = (key, percent, opacity, count, ziplegend) => {
  let dataKey = key;
  switch (count) {
    case 1:
      dataKey = [4];
      break;
    case 2:
      dataKey = ziplegend === 0 ? [0] : [4];
      break;
    case 3:
      dataKey = ziplegend === 0 ? [0] : [4];
      break;
    case 4:
      if (ziplegend === 1) {
        dataKey = [2];
      }
      if (ziplegend === 2) {
        dataKey = [4];
      }
      break;
    case 5:
      if (ziplegend === 1) {
        dataKey = [2];
      }
      if (ziplegend === 2) {
        dataKey = [4];
      }
      break;
    case 6:
      if (ziplegend === 2) {
        dataKey = [3];
      }
      if (ziplegend === 3) {
        dataKey = [4];
      }
      break;
    case 7:
      if (ziplegend === 2) {
        dataKey = [3];
      }
      if (ziplegend === 3) {
        dataKey = [4];
      }
      break;
    default:
      break;
  }
  let legendColor = legendColors[dataKey];
  if (legendColor) {
    legendColor = legendColor.split("#")[1];
  }
  let ActivationLegend = ActivationMapColors[dataKey];
  if(ActivationLegend) {
    ActivationLegend = ActivationLegend.split('#')[1];
  }
  return [hexToRGBToOpacity(legendColor, percent), borderColors[dataKey] , ActivationMapColors[dataKey]];
};

const colourCalculationForZip = (count, grade, total) => {
  let key = 0;
  grade.map((el, k) => {
    if (el.length === 1) {
      if (count >= el[0]) {
        key = k;
        return;
      }
    } else {
      if (count >= el[0] && count <= el[1]) {
        key = k;
        return;
      }
    }
  });
  return picLegendColorForZip(key, 0.3, true, total, key);
};

const picUserLiveTrackLegendColor = (key, percent) => {
  let legendColor = UserliveTracklegendColors[key];
  legendColor = legendColor.split("#")[1];
  return hexToRGBToPercent(legendColor, percent);
};

const calculateLessLegends = (Count) => {
  let gr = [];
  switch (Count) {
    case 7:
      gr = [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
      ];
      break;
    case 6:
      gr = [[0, 1], [2, 3], [4, 5], [6]];
      break;
    case 5:
      gr = [
        [0, 1],
        [2, 3],
        [4, 5],
      ];
      break;
    case 4:
      gr = [[0, 1], [2, 3], [4]];
      break;
    case 3:
      gr = [
        [0, 1],
        [2, 3],
      ];
      break;
    case 2:
      gr = [[0, 1], [2]];
      break;
    case 1:
      gr = [[0, 1]];
      break;
    default:
      break;
  }
  return gr;
};

const getCommonGrade = (dashboard, Count) => {
  let grades = customerGrade;
  switch (dashboard) {
    case "Anomalies MDN Count":
      grades = customerGrade;
      return grades;
    case "eNodeB Count":
      if (Count > 7) {
        let firstCalc = Count * (20 / 100);
        let secondCalc = Count * (40 / 100);
        let thirdCalc = Count * (60 / 100);
        let FourthCalc = Count * (80 / 100);
        let FifthCalc = Count * (100 / 100);
        let gr = [
          [0, Math.trunc(firstCalc)],
          [Math.trunc(firstCalc) + 1, Math.trunc(secondCalc)],
          [Math.trunc(secondCalc) + 1, Math.trunc(thirdCalc)],
          [Math.trunc(thirdCalc) + 1, Math.trunc(FourthCalc)],
          [Math.trunc(FourthCalc) + 1, Math.trunc(FifthCalc)],
        ];
        grades = gr;
      } else {
        grades = calculateLessLegends(Count);
      }
      return grades;
    case "Users Count":
      grades = activationGrade;
      return grades;
    case "eNodeB Call Drop Count":
      grades = callDropsGrade;
      return grades;
    case "zip map":
      if (Count > 7) {
        let firstCalc = Count * (20 / 100);
        let secondCalc = Count * (40 / 100);
        let thirdCalc = Count * (60 / 100);
        let FourthCalc = Count * (80 / 100);
        let FifthCalc = Count * (100 / 100);
        let gr = [
          [0, Math.trunc(firstCalc)],
          [Math.trunc(firstCalc) + 1, Math.trunc(secondCalc)],
          [Math.trunc(secondCalc) + 1, Math.trunc(thirdCalc)],
          [Math.trunc(thirdCalc) + 1, Math.trunc(FourthCalc)],
          [Math.trunc(FourthCalc) + 1, Math.trunc(FifthCalc)],
        ];
        grades = gr;
      } else {
        grades = calculateLessLegends(Count);
      }
      return grades;
    default:
      break;
  }
  return grades;
};
const getFixedColorPriority = (d) => {
  let colorcode;
  switch (d) {
    case "1":
      colorcode = "#FCCCCC";
      return colorcode;
    case "2":
      colorcode = "#FFBC3C";
      return colorcode;
    case "3":
      colorcode = "#FFEAC4";
      return colorcode;
    case "3":
      colorcode = "#CDE6D6";
      return colorcode;
  }
};

const hexToRGBToOpacity = (hex, opacity) => {
  hex = "0x" + hex;
  let r = (hex >> 16) & 0xff;
  let g = (hex >> 8) & 0xff;
  let b = hex & 0xff;
  return `rgb(${r}, ${g}, ${b}, ${opacity})`;
};

const hexToRGBToPercent = (hex, percent) => {
  hex = "0x" + hex;
  let r = (hex >> 16) & 0xff;
  let g = (hex >> 8) & 0xff;
  let b = hex & 0xff;
  r = r + percent;
  g = g + percent;
  b = b + percent;
  return `rgb(${r}, ${g}, ${b})`;
};
let callDropCauseCodeColors = [
  "#D04949",
  "rgb(245,102,102)",
  "rgb(240,120,120)",
  "rgb(240,150,150)",
  "rgb(240,180,180)",
  "rgb(252,202,202)",
  "rgb(249,163,163)",
  "rgb(249,120,120)",
];
const valueProvider = (tempArray) => {
  let temp = [];
  tempArray.forEach((element) => {
    temp.push(element.value);
  });
  return temp;
};
const hourlyMapComponent = {
  mapTitle: "Hourly Call Drop Heat Map",
  mapTopDropdown: [
    {
      type: "singleSelect",
      label: "eNodeB",
    },
  ],
  heatMap : true,
  legendTitle:"eNodeB Call Drop Count"
};
const DailyMapComponent =(percent) =>{
  let value = {
  mapTitle: `Call Drop Rate ≥ ${percent}% eNodeB Contributions`,
  mapTopDropdown: [
    {
      type: "singleSelect",
      label: "eNodeB",
    },
  ],
  heatMap : true,
  legendTitle:`≥ ${percent}% Experienced Days`
}
return value
};
const dayCalc = (enodeB, data) => {
  let count = data.filter((el) => el.enodeb_id === enodeB);
  let totalCallDrops = 0;
  if (count.length > 0) {
    count.map((el) => (totalCallDrops = totalCallDrops + el["Call Drops"]));
  }
  return { totalCallDrops: totalCallDrops, count: count.length };
};
const commonLoadDates = (loadDatesData) => {
  if (loadDatesData !== 0) {
    let minDate = loadDatesData[loadDatesData.length - 1];
    let maxDate = loadDatesData[0] ? loadDatesData[0] : null;
    maxDate = new Date(maxDate);
    const date = new Date(maxDate);
    let date1 = new Date(minDate);
    let timeZoneValue = date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
    if (
      timeZoneValue === "Eastern Daylight Time" ||
      timeZoneValue === "Eastern Standard Time" ||
      timeZoneValue.split(" ")[0] === "Eastern"
    ) {
      date.setDate(date.getDate() + 1);
      maxDate.setDate(maxDate.getDate() + 1);
      date1.setDate(date1.getDate() + 1);
    }
    return [maxDate, date1, date];
  }
};

function sortMethodAsc(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}

function sortMethodWithDirection(direction) {
  if (direction === undefined || direction === "asc") {
    return sortMethodAsc;
  } else {
    return function (a, b) {
      return -sortMethodAsc(a, b);
    };
  }
}

function sortMethodWithDirectionByColumn(columnName, direction) {
  const sortMethod = sortMethodWithDirection(direction);
  return function (a, b) {
    return sortMethod(a[columnName], b[columnName]);
  };
}

function sortMethodWithDirectionMultiColumn(sortArray) {
  const sortMethodsForColumn = (sortArray || []).map((item) =>
    sortMethodWithDirectionByColumn(item.column, item.direction)
  );
  return function (a, b) {
    let sorted = 0;
    let index = 0;
    while (sorted === 0 && index < sortMethodsForColumn.length) {
      sorted = sortMethodsForColumn[index++](a, b);
    }
    return sorted;
  };
}

function convertToKeyValuePairs(data) {
  const splittedData = data.split(',');
  if(splittedData && splittedData.length === 1 && splittedData[0] === "All"){
    return [{label:"All Selected",value:"All"}]
  }else{
    const resultKeyValuePairs = splittedData.map((val) => ({
      label: val,
      value: val
    }));
    return resultKeyValuePairs;
  }

}

export {
  dashboardTiles,
  getIntervals,
  commonSort,
  validateIntervals,
  legendColors,
  gradeCalculation,
  validatePercentage,
  calculateIntervals,
  commonGrade,
  colourCalculation,
  UserliveTracklegendColors,
  getCommonGrade,
  toggleJson,
  getFixedColorPriority,
  hexToRGBToPercent,
  picLegendColor,
  picUserLiveTrackLegendColor,
  borderColors,
  picLegendColorForZip,
  colourCalculationForZip,
  colourCalculationforshadow,
  customerJson,
  customerSummaryJson,
  legendShadowColorsforlegends,
  ActiveLegendColor,
  ActivationMapColors,
  FiveGMapOption,
  FiveGlegendColors,
  FiveGColorCal,
  commonLoadDates,
  hourlyMapComponent,
  valueProvider,
  callDropCauseCodeColors,
  DailyMapComponent,
  dayCalc,
  sortMethodWithDirectionMultiColumn,
  convertToKeyValuePairs,
};
