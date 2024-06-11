// chuyển 1 object lồng nhau thành 1 map lồng nhau
// object ví dụ: const industry = {
//   fashionMale: {
//     IndusName: "thời trang nam",
//     children: [
//       {
//         IndusName: "Áo",
//         children: [
//           {
//             IndusName: "Áo thun",
//             children: [
//               {
//                 IndusName: "Áo thun nam",
//                 children: [],
//               },
//               {
//                 IndusName: "Áo thun nữ",
//                 children: [],
//               },
//             ],
//           },
//           {
//             IndusName: "Áo sơ mi",
//             children: [
//               {
//                 IndusName: "Áo sơ mi nam",
//                 children: [],
//               },
//               {
//                 IndusName: "Áo sơ mi nữ",
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         IndusName: "Quần",
//         children: [
//           {
//             IndusName: "Quần jean",
//             children: [
//               {
//                 IndusName: "Quần jean nam",
//                 children: [],
//               },
//               {
//                 IndusName: "Quần jean nữ",
//                 children: [],
//               },
//             ],
//           },
//           {
//             IndusName: "Quần kaki",
//             children: [
//               {
//                 IndusName: "Quần kaki nam",
//                 children: [],
//               },
//               {
//                 IndusName: "Quần kaki nữ",
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     fashionFemale: {
//       IndusName:"thời trang nữ",
//       children:[
//         {
//           IndusName:"Áo",
//           children:[
//             {
//               IndusName:"Áo thun",
//               children:[
//                 {
//                   IndusName:"Áo thun nam",
//                   children:[]
//                 },
//                 {
//                   IndusName:"Áo thun nữ",
//                   children:[]
//                 }
//               ]
//             },
//             {
//               IndusName:"Áo sơ mi",
//               children:[
//                 {
//                   IndusName:"Áo sơ mi nam",
//                   children:[]
//                 },
//                 {
//                   IndusName:"Áo sơ mi nữ",
//                   children:[]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
    
//   },
//   houseWare: {
//     IndusName: "đồ gia dụng",
//     children: [
//       {
//         IndusName: "Nội thất",
//         children: [
//           {
//             IndusName: "Bàn",
//             children: [],
//           },
//           {
//             IndusName: "Ghế",
//             children: [],
//           },
//         ],
//       },
//       {
//         IndusName: "Dụng cụ nhà bếp",
//         children: [
//           {
//             IndusName: "Nồi",
//             children: [],
//           },
//           {
//             IndusName: "Chảo",
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
function convertToMap(obj) {
    const map = new Map();
    
    function traverse(node) {
      const nodeMap = new Map();
      node.children.forEach(child => {
        nodeMap.set(child.IndusName, traverse(child));
      });
      return nodeMap;
    }
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        map.set(obj[key].IndusName, traverse(obj[key]));
      }
    }
    
    return map;
  }
export {convertToMap}