const productIds = [
    "663ba72aa1f7042809e6d995",  
    "663ba72aa1f7042809e6d996",  
    "663ba72aa1f7042809e6d997",  
    "663ba72aa1f7042809e6d998",  
    "663ba72aa1f7042809e6d999",  
    "663ba72aa1f7042809e6d99a",  
    "663ba72aa1f7042809e6d99b",  
    "663ba72aa1f7042809e6d99c",  
    "663ba72aa1f7042809e6d99d",  
    "663ba72aa1f7042809e6d99f",  
    "663ba72aa1f7042809e6d9a0",  
    "663ba72aa1f7042809e6d9a1",  
    "663ba72aa1f7042809e6d9a2",  
    "663ba72aa1f7042809e6d9a3",  
    "663ba72aa1f7042809e6d9a4",  
    "663ba72aa1f7042809e6d9a5",  
    "663ba72aa1f7042809e6d9a6",  
    "663ba72aa1f7042809e6d9a7",  
    "663ba72aa1f7042809e6d9a8",  
    "663ba72aa1f7042809e6d9a9",  
    "663ba72aa1f7042809e6d9aa",  
    "663ba72aa1f7042809e6d9ab",  
    "663ba72aa1f7042809e6d9ac",  
    "663ba72aa1f7042809e6d9ad",  
    "663ba72aa1f7042809e6d9ae",  
    "663ba72aa1f7042809e6d9af",  
    "663ba72aa1f7042809e6d9b0",  
    "663ba72aa1f7042809e6d9b1",  
    "663ba72aa1f7042809e6d9b2"]
const comment = [
    "Sản phẩm này thật sự tuyệt vời! Tôi đã sử dụng nó trong một thời gian và không thể tin nổi mức độ hiệu quả của nó.",
    "Chất lượng của sản phẩm này vượt xa mong đợi của tôi. Tôi rất ấn tượng với sự chắc chắn và thiết kế tinh tế.",
    "Không chỉ là sản phẩm tốt, mà dịch vụ khách hàng cũng tuyệt vời. Tôi đã nhận được sự hỗ trợ nhanh chóng và thân thiện từ nhà cung cấp.",
    "Tôi đã sử dụng nhiều sản phẩm khác trước đây, nhưng không có cái nào có thể so sánh được với hiệu suất của sản phẩm này.",
    "Nó thực sự là một sản phẩm đột phá. Tôi không chỉ cảm thấy hài lòng với nó, mà còn rất tự tin khi giới thiệu cho bạn bè và gia đình.",
    "Sản phẩm này đã giải quyết một số vấn đề mà tôi gặp phải trong công việc hàng ngày của mình. Tôi cảm thấy như tôi đã tìm thấy một người bạn đồng hành đáng tin cậy.",
    "Tôi không ngừng ngạc nhiên về khả năng thích ứng của sản phẩm này. Nó có thể dễ dàng phù hợp với nhu cầu của mọi người.",
    "Sự đầu tư vào sản phẩm này thực sự là một quyết định thông minh. Tôi không thể hạnh phúc hơn với kết quả mà nó mang lại.",
    "Tôi thường xuyên sử dụng sản phẩm này và nó chưa bao giờ làm tôi thất vọng. Điều này chứng minh sự đáng tin cậy của nó.",
    "Nếu bạn đang tìm kiếm một sản phẩm chất lượng cao với một giá trị tuyệt vời, thì đây chính là sự lựa chọn hoàn hảo. Tôi chắc chắn sẽ mua nó một lần nữa trong tương lai."
];

const usedIds = [
    {
      "id": "6623ef6396ca50360b1a5977",
      "user_name": "nguyentiensy"
    },
    {
      "id": "6623ef6d96ca50360b1a5978",
      "user_name": "nguyentiensy1"
    },
    {
      "id": "6624710aafb19e2a1ac5dfff",
      "user_name": "tiensy002"
    },
    {
      "id": "66247114afb19e2a1ac5e000",
      "user_name": "tiensy003"
    },
    {
      "id": "66247121afb19e2a1ac5e001",
      "user_name": "tiensy004"
    },
    {
      "id": "6624712fafb19e2a1ac5e002",
      "user_name": "vietnam"
    },
    {
      "id": "66247138afb19e2a1ac5e003",
      "user_name": "hanoi"
    },
    {
      "id": "6637ddef8840c31396c3984b",
      "user_name": "tiensynguyen"
    },
    {
      "id": "6639a6598352b36daf653db7",
      "user_name": "John"
    },
    {
      "id": "6639a6598352b36daf653db8",
      "user_name": "Mary"
    },
    {
      "id": "6639a6598352b36daf653db9",
      "user_name": "Michael"
    },
    {
      "id": "6639a6598352b36daf653dba",
      "user_name": "Jennifer"
    },
    {
      "id": "6639a6598352b36daf653dbb",
      "user_name": "James"
    },
    {
      "id": "6639a6598352b36daf653dbc",
      "user_name": "Lisa"
    },
    {
      "id": "6639a6598352b36daf653dbd",
      "user_name": "David"
    },
    {
      "id": "6639a6598352b36daf653dbe",
      "user_name": "Sarah"
    },
    {
      "id": "6639a6598352b36daf653dbf",
      "user_name": "Robert"
    },
    {
      "id": "6639a6598352b36daf653dc0",
      "user_name": "Kimberly"
    },
    {
      "id": "6639a6598352b36daf653dc1",
      "user_name": "William"
    },
    {
      "id": "6639a6598352b36daf653dc2",
      "user_name": "Michelle"
    }
  ]
const avatar = "https://sshop-user.s3.ap-southeast-1.amazonaws.com/avatar/anh-avatar-cute-2.jpg"

const reviews = []

for (i = 0 ; i < productIds.length; i++) {
    for( j = 0 ; j < 7 ; j ++ ) {
        indexUser = Math.floor(Math.random() * 19)
        const review = {
            userId : usedIds[indexUser].id,
            username:usedIds[indexUser].user_name,
            productId : productIds[i],
            content : comment[Math.floor(Math.random()*9)],
            userAvatar: `"https://sshop-user.s3.ap-southeast-1.amazonaws.com/avatar/anh-avatar-cute-${Math.floor(Math.random()*5)+ 1}.jpg"`,
            rating: Math.floor(Math.random() * 5 + 1)

        }
        reviews.push(review)
    }
}
console.log(JSON.stringify(reviews))