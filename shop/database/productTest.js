const customField= {
  Size: [
    {
      title: "S",
      stock: Math.floor(Math.random() * 100) 
    },
    {
      title: "M",
      stock: Math.floor(Math.random() * 100) 
    },
    {
      title: "L",
      stock: Math.floor(Math.random() * 100) 
    },
    {
      title: "XL",
      stock: Math.floor(Math.random() * 100) 
    }
  ]
}


  const genListImageurl = (imageName)=> {
    const result = []
    for(let i = 1; i < 8 ; i ++ ) {
    const url = `https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/${imageName}+(${i}).png`
    result.push(url)
    }
    return result;
}


const element = [
    'laptop','dog',"cat","bread","pen","shirt","jean","smart","clocks","door",
    "chiken","fish","shoes","hand-bag","backpack","table","dish","dress","coffee",
    "stuffed","keyboard","dumbbell","kettlebell","flower-pot","computer-mouse","bike",
    "skincare","jacket","red-hat","cookies"]
const categorys = ["3488eb11-9cc2-441c-a13d-9385373ba2f5",
"093a6b7e-a495-4267-bfa1-e3fa19bad821","093a6b7e-a495-4267-bfa1-e3fa19bad821",
"79087cf5-eac3-4569-877e-57238b51d2d7","5bf1cb4f-ee60-4bb3-b730-2d6955bd9664",
"6a7c4aa6-f040-47bb-bb47-62560de1bef1","6d6f5fa9-d32d-402e-a21c-52aef2f08edd",
"314e82a6-d3ad-4e34-a68b-433f166b5b13","314e82a6-d3ad-4e34-a68b-433f166b5b13",
"5bf1cb4f-ee60-4bb3-b730-2d6955bd9664","845d79a3-18fa-47b3-b40d-6798f6af1dae",
"845d79a3-18fa-47b3-b40d-6798f6af1dae","1e9fc003-660d-40ce-a7a8-628b22713005",
"5f88ebd7-6bfe-44a1-9cbf-057d1e59dcb7","39371be5-8221-438a-9881-3842e8b68c02",
"3488eb11-9cc2-441c-a13d-9385373ba2f5","3488eb11-9cc2-441c-a13d-9385373ba2f5",
"f817008e-210a-4315-a146-a63763e67fe5","99df4887-9164-4e61-8815-e39242817556",
"99df4887-9164-4e61-8815-e39242817556","3488eb11-9cc2-441c-a13d-9385373ba2f5",
"935ee397-525f-4423-a8ae-0c52ac110fe9","935ee397-525f-4423-a8ae-0c52ac110fe9",
"bcf24f50-883d-4129-8eb6-20e61faa8e45","3488eb11-9cc2-441c-a13d-9385373ba2f5",
"f817008e-210a-4315-a146-a63763e67fe5","f817008e-210a-4315-a146-a63763e67fe5",
"f817008e-210a-4315-a146-a63763e67fe5",'f817008e-210a-4315-a146-a63763e67fe5',
"99df4887-9164-4e61-8815-e39242817556"
]
const laptopDes = "Laptop, một thiết bị di động không thể thiếu trong thế giới công nghệ hiện đại, là một chiếc máy tính nhỏ gọn và tiện ích. Được thiết kế để đáp ứng nhu cầu làm việc di động và giải trí của người dùng, laptop là một công cụ đa chức năng với nhiều ưu điểm đáng chú ý.\nVới màn hình rộng và độ phân giải cao, laptop cung cấp trải nghiệm xem phim và chơi game tuyệt vời. Khả năng hiển thị màu sắc chân thực và góc nhìn rộng giúp người dùng tận hưởng những hình ảnh sống động và sắc nét./nBàn phím được thiết kế tinh tế và có độ nảy tốt, giúp người dùng gõ văn bản một cách dễ dàng và nhanh chóng. Touchpad nhạy cảm và chính xác, cùng với các công nghệ đa điểm chạm, tạo điều kiện thuận lợi cho việc điều khiển và thao tác trên màn hình./nVới vi xử lý mạnh mẽ và bộ nhớ RAM lớn, laptop có thể xử lý nhanh chóng các tác vụ đa nhiệm và ứng dụng đòi hỏi tài nguyên cao. Điều này giúp người dùng làm việc mượt mà và hiệu quả mà không gặp trở ngại./nLaptop cũng được trang bị đầy đủ các cổng kết nối, bao gồm cổng USB, cổng HDMI và cổng âm thanh, cho phép người dùng kết nối với các thiết bị ngoại vi như máy in, loa ngoài và màn hình phụ./nMột trong những ưu điểm lớn nhất của laptop là tính di động. Nhờ kích thước nhỏ gọn và pin có thể sạc lại, người dùng có thể mang theo laptop và làm việc ở bất kỳ đâu mà không bị ràng buộc bởi vị trí cố định./nNgoài ra, laptop cũng có các tính năng bảo mật tiên tiến như cảm biến vân tay và camera web có khả năng nhận diện khuôn mặt, giúp bảo vệ thông tin cá nhân của người dùng khỏi các nguy cơ xâm nhập và lừa đảo trực tuyến./nTóm lại, laptop không chỉ là một công cụ làm việc hiệu quả mà còn là một người bạn đồng hành đáng tin cậy cho mọi nhu cầu di động và kỹ thuật số của người dùng hiện đại."
const dogDescription = "Chó, là một loài động vật có bốn chân, thường là bạn đồng hành trung thành của con người. Chúng có nhiều giống và kích thước khác nhau, từ nhỏ nhắn đến lớn mạnh, và thường được nuôi làm thú cưng hoặc làm việc. Chó là một phần không thể thiếu trong cuộc sống của nhiều gia đình, mang lại niềm vui và sự hỗ trợ cho chủ nhân. Sự trung thành, thông minh và sự đáng yêu của chúng là những đặc điểm đặc trưng, khiến cho chó trở thành một phần quan trọng của nền văn hóa và tình cảm con người."
const catDescription = "Mèo, là một loài động vật nhỏ có bốn chân, thường có bộ lông mềm mại và đuôi linh hoạt. Mèo thường đáng yêu và độc lập, làm thú cưng phổ biến trong các gia đình trên khắp thế giới. Với tính cách tinh nghịch và sự nhanh nhẹn, mèo làm cho cuộc sống trở nên sôi động và thú vị. Hình ảnh của mèo thường xuất hiện trong văn hóa và nghệ thuật, thể hiện sự dễ thương và quyến rũ của loài động vật này. Sự độc lập và linh hoạt của mèo làm cho chúng trở thành một phần quan trọng của cuộc sống hàng ngày, mang lại niềm vui và sự an ủi cho chủ nhân."
const breadDescription = "Bánh mì là một loại thực phẩm được làm từ bột mỳ, nước và men, sau đó nướng chín. Có nhiều loại bánh mì khác nhau trên thế giới, từ bánh mì trắng thông thường đến bánh mì lúa mạch và bánh mì ngũ cốc.";

const penDescription = "Bút là một công cụ viết thông thường, thường được làm từ nhựa hoặc kim loại, với một ngòi chì hoặc mực để tạo ra các dấu vết trên bề mặt giấy hoặc các vật liệu khác.";

const shirtDescription = "Áo sơ mi là một loại trang phục phổ biến cho cả nam và nữ, thường có cổ, tay dài hoặc ngắn và được mặc bên trong quần hoặc váy.";

const jeanDescription = "Quần jean là loại quần được làm từ vải denim, thường là màu xanh và có khả năng chịu được sự mài mòn. Chúng là một phần không thể thiếu của nhiều tủ quần áo cá nhân.";

const smartDescription = "Từ 'smart' thường được sử dụng để mô tả những sản phẩm công nghệ hoặc thiết bị có khả năng kết nối internet hoặc có tính thông minh như điện thoại thông minh, đồng hồ thông minh và loa thông minh.";

const clocksDescription = "Đồng hồ là thiết bị đo thời gian, có thể được treo trên tường, đặt trên bàn hoặc đeo trên tay. Chúng có thể hoạt động bằng cơ khí, điện hoặc pin.";

const doorDescription = "Cửa là một bề mặt chắn ngăn cách giữa hai không gian, thường được sử dụng để đi vào hoặc ra khỏi một phòng hoặc căn nhà. Có nhiều loại cửa khác nhau như cửa gỗ, cửa kính, cửa nhôm, v.v.";

const chickenDescription = "Gà là một loài gia cầm phổ biến, được nuôi vì thịt và trứng. Có nhiều loại gà khác nhau trên thế giới, từ gà thịt đến gà trứng và gà con.";

const fishDescription = "Cá là một loại thực phẩm giàu protein và dưỡng chất, có nhiều loại và hình dạng khác nhau. Cá thường được nấu chín, chiên, hấp hoặc nướng và được ưa chuộng trong nhiều nền văn hóa ẩm thực.";

const shoesDescription = "Giày dép là một loại đồ trang phục dùng để bảo vệ và giữ chân, có nhiều kiểu dáng và chức năng khác nhau như giày thể thao, giày cao gót, giày dép điều hòa, v.v.";

const handBagDescription = "Túi xách là một loại phụ kiện thời trang dùng để đựng và mang theo đồ cá nhân như ví tiền, điện thoại di động, chìa khóa và mỹ phẩm.";

const backpackDescription = "Ba lô là một loại túi lớn có dây đeo hai vai, thường được sử dụng để mang đồ đi học, đi làm hoặc đi du lịch. Chúng có nhiều ngăn và túi nhỏ để tiện lợi cho việc sắp xếp đồ đạc.";

const tableDescription = "Bàn là một mặt phẳng được nâng cao bằng chân hoặc chân đế, thường được sử dụng để đặt đồ đạc hoặc làm nơi làm việc.";

const dishDescription = "Dĩa là một loại đồ dùng trong việc chứa và phục vụ thức ăn. Có nhiều loại dĩa khác nhau như dĩa ăn cơm, dĩa salad, dĩa dessert, v.v.";

const dressDescription = "Váy là một loại trang phục dành cho phụ nữ, có nhiều kiểu dáng và chiều dài khác nhau như váy dài, váy ngắn, váy maxi, v.v.";

const coffeeDescription = "Cà phê là một loại đồ uống được làm từ hạt cà phê rang xay, thường có hương vị đắng và mạnh mẽ. Cà phê được uống phổ biến trên toàn thế giới và có nhiều loại pha chế khác nhau như cà phê đen, cà phê sữa, espresso, v.v.";

const stuffedDescription = "Thú nhồi bông là những con thú nhỏ được làm từ vải và nhồi bông, thường làm quà tặng cho trẻ em hoặc trang trí trong nhà.";

const keyboardDescription = "Bàn phím là một thiết bị nhập liệu cho máy tính, thường được làm từ nhựa hoặc kim loại, có các phím bấm để gõ chữ, số và các phím chức năng.";

const dumbbellDescription = "Tạ tay là một dụng cụ tập luyện được sử dụng để tăng cường sức mạnh và sức khoẻ. Tạ tay có thể được làm từ thép, nhựa hoặc gốm và có khối lượng khác nhau tùy thuộc vào mục đích sử dụng.";

const kettlebellDescription = "Tạ kettlebell là một loại tạ đặc biệt có hình dáng giống như quả chuông, thường được sử dụng trong các bài tập tăng cường sức mạnh và cardio.";

const flowerPotDescription = "Chậu hoa là một loại đồ dùng dùng để trồng cây hoa hoặc cây cỏ, thường được làm từ gốm, nhựa hoặc kim loại và có nhiều kiểu dáng và kích thước khác nhau.";

const computerMouseDescription = "Chuột máy tính là một thiết bị nhập liệu cho máy tính, thường được sử dụng để di chuyển con trỏ trên màn hình và thực hiện các thao tác nhấn. Chuột có thể có dây hoặc không dây.";

const bikeDescription = "Xe đạp là một phương tiện giao thông cá nhân được sử dụng để di chuyển, tập thể dục hoặc vui chơi. Có nhiều loại xe đạp khác nhau như xe đạp đường phố, xe đạp leo núi, xe đạp đua, v.v.";

const skincareDescription = "Chăm sóc da là quy trình và sản phẩm được sử dụng để bảo vệ và cải thiện sức khỏe của làn da. Có nhiều loại sản phẩm chăm sóc da như kem dưỡng da, sữa rửa mặt, nước hoa hồng, v.v.";

const jacketDescription = "Áo khoác là một loại trang phục dùng để giữ ấm và bảo vệ cơ thể khỏi thời tiết lạnh. Có nhiều loại áo khoác khác nhau như áo khoác len, áo khoác da, áo khoác gió, v.v.";

const redHatDescription = "Mũ đỏ là một loại phụ kiện thời trang dùng để đội trên đầu, có nhiều kiểu dáng và chất liệu khác nhau. Mũ đỏ có thể được sử dụng để bảo vệ đầu khỏi ánh nắng mặt trời hoặc để tạo phong cách riêng.";

const cookiesDescription = "Bánh quy là loại bánh ngọt có hình dạng phẳng và thường được làm từ bột mỳ, đường, bơ và các nguyên liệu khác. Bánh quy có nhiều hương vị và hình dáng khác nhau và thường được ăn kèm với nước ngọt hoặc cà phê.";

const descriptions = [
    laptopDes,
    dogDescription,
    catDescription,
    breadDescription,
    penDescription,
    shirtDescription,
    jeanDescription,
    smartDescription,
    clocksDescription,
    doorDescription,
    chickenDescription,
    fishDescription,
    shoesDescription,
    handBagDescription,
    backpackDescription,
    tableDescription,
    dishDescription,
    dressDescription,
    coffeeDescription,
    stuffedDescription,
    keyboardDescription,
    dumbbellDescription,
    kettlebellDescription,
    flowerPotDescription,
    computerMouseDescription,
    bikeDescription,
    skincareDescription,
    jacketDescription,
    redHatDescription,
    cookiesDescription
];
const shortDescriptions = [
    "Một công cụ di động không thể thiếu, thiết kế nhỏ gọn và tiện ích.",
    "Loài động vật trung thành, thông minh và đáng yêu, là bạn đồng hành của con người.",
    "Loài mèo nhỏ có bộ lông mềm mại và đuôi linh hoạt, làm thú cưng đáng yêu.",
    "Thực phẩm phổ biến được làm từ bột mỳ, nước và men, thường được nướng chín.",
    "Công cụ viết thông thường, thường được làm từ nhựa hoặc kim loại.",
    "Loại trang phục phổ biến có cổ và tay dài hoặc ngắn, được mặc trong hoặc ngoài quần.",
    "Quần được làm từ vải denim, thường màu xanh và chịu được sự mài mòn.",
    "Sử dụng để mô tả các sản phẩm công nghệ hoặc thiết bị có tính thông minh.",
    "Thiết bị đo thời gian, có thể hoạt động bằng cơ khí, điện hoặc pin.",
    "Bề mặt chắn ngăn cách giữa hai không gian, thường được sử dụng để đi vào hoặc ra khỏi một phòng hoặc căn nhà.",
    "Loại gia cầm phổ biến, được nuôi vì thịt và trứng.",
    "Thực phẩm giàu protein và dưỡng chất, có nhiều loại và hình dạng khác nhau.",
    "Loại đồ trang phục dùng để bảo vệ và giữ chân, có nhiều kiểu dáng và chức năng.",
    "Phụ kiện thời trang dùng để đựng và mang theo đồ cá nhân như ví tiền, điện thoại di động, chìa khóa.",
    "Túi lớn có dây đeo hai vai, thường được sử dụng để mang đồ đi học, đi làm hoặc đi du lịch.",
    "Một mặt phẳng được nâng cao bằng chân hoặc chân đế, thường được sử dụng để đặt đồ đạc hoặc làm nơi làm việc.",
    "Đồ dùng trong việc chứa và phục vụ thức ăn, có nhiều loại dĩa khác nhau.",
    "Loại trang phục dành cho phụ nữ, có nhiều kiểu dáng và chiều dài khác nhau.",
    "Đồ uống được làm từ hạt cà phê rang xay, thường có hương vị đắng và mạnh mẽ.",
    "Những con thú nhỏ được làm từ vải và nhồi bông, thường làm quà tặng cho trẻ em hoặc trang trí trong nhà.",
    "Thiết bị nhập liệu cho máy tính, thường được làm từ nhựa hoặc kim loại, có các phím bấm để gõ chữ, số và các phím chức năng.",
    "Dụng cụ tập luyện được sử dụng để tăng cường sức mạnh và sức khỏe.",
    "Loại tạ đặc biệt có hình dáng giống như quả chuông, thường được sử dụng trong các bài tập tăng cường sức mạnh và cardio.",
    "Loại đồ dùng dùng để trồng cây hoa hoặc cây cỏ, thường được làm từ gốm, nhựa hoặc kim loại.",
    "Thiết bị nhập liệu cho máy tính, thường được sử dụng để di chuyển con trỏ trên màn hình và thực hiện các thao tác nhấn.",
    "Phương tiện giao thông cá nhân được sử dụng để di chuyển, tập thể dục hoặc vui chơi.",
    "Quy trình và sản phẩm được sử dụng để bảo vệ và cải thiện sức khỏe của làn da.",
    "Loại trang phục dùng để giữ ấm và bảo vệ cơ thể khỏi thời tiết lạnh.",
    "Loại phụ kiện thời trang dùng để đội trên đầu, có nhiều kiểu dáng và chất liệu khác nhau.",
    "Loại bánh ngọt có hình dạng phẳng và thường được làm từ bột mỳ, đường, bơ và các nguyên liệu khác."
];

const users = [
  "6623ef6396ca50360b1a5977",
  "6623ef6d96ca50360b1a5978",
  "6624710aafb19e2a1ac5dfff",
  "66247114afb19e2a1ac5e000",
  "66247121afb19e2a1ac5e001",
  "6624712fafb19e2a1ac5e002",
  "66247138afb19e2a1ac5e003"
]

const jsons = [];

for (let i = 0; i < element.length; i++) {
  const newUserJson = {}
    const images = genListImageurl(element[i])
    newUserJson.images = images;
    newUserJson.description = descriptions[i]
    newUserJson.subTitle = shortDescriptions[i]
    newUserJson.price = Math.floor(Math.random() * 10000000) + 10000;
    newUserJson.imagePrimary = images[0]
    newUserJson.name = element[i]
    newUserJson.categoryId = categorys[i]
    newUserJson.customField = customField
    newUserJson.discount =  Math.floor(Math.random() * 90) + 10;
    newUserJson.userId = users[Math.floor(Math.random() * 6) + 0]
    jsons.push(newUserJson)
}
console.log(JSON.stringify(jsons));

