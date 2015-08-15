---
layout: post
title:  "[Góc nhìn] Khi mới bắt đầu nên học Swift hay Objective-C"
date:   2015-07-05
categories: Objective-C Swift
---
## Hãy ngừng tìm lý do để học Swift
Nếu chúng ta tra cứu trên Google đại loại như `Should I learn Swift or Objective C` sẽ cho ra hàng tá kết quả, hay thậm chí là những bài viết như `69 lý do nên học swift và 96 lý do nên học ObjC` =)). Ta có thể liên tưởng tới những câu hỏi như: `Tôi muốn học đánh đàn Guitar, tôi nên học classic hay đệm hát`, hay `Có nên học organ trước khi học piano không` hay gần gũi hơn một chút là `Làm game trên iOS nên học Cocos2D hay Unity hay là SpriteKit...`. Dù những câu hỏi trên có phần khác biệt và so sánh khập khiễng hơn nhiều so với Swift và Objective-C nhưng nhìn chung thì cũng là 1 vấn đề mà ra. Những câu hỏi đại loại như trên theo mình là những câu hỏi tốn băng thông và dung lượng server nhiều nhất vì những cuộc tranh luận không có hồi kết.

Thay vì bỏ thời gian đọc tất cả những bài viết về vấn đề trên, ta cứ tìm hiểu Objective-C là gì, Swift là gì và tại sao Apple lại phải tạo ra ngôn ngữ mới khi mọi thứ đang tốt đẹp. Mặc dù ObjC đã là ngôn ngữ trưởng thành (với hơn 31 tuổi đời), nhưng xét về cú pháp hay cách sử dụng thể thành thạo thì đây lại là một ngôn ngữ quá khó so với phần còn lại. Với sự vận động và phát triển mạnh mẽ từ các ngôn ngữ trẻ, cũng như ngôn ngữ kịch bản (js là một ví dụ) đang ngày càng thông minh hơn thì Apple cũng không thể đứng nhìn được. Swift ra đời nhằm phá bỏ rào cản này với các developer.
<!--more-->
## Swift vẫn tuyệt vời dù còn vài điểm đáng xem xét
Nói tới đây thì Swift rất dễ học và nắm bắt nhanh, đặc biệt với những ai đã từng làm việc với Javascript, Ruby hoặc các ngôn ngữ OOP khác. Nhưng vẫn tồn tại một số vấn đề đáng xem xét như:

- Swift hiện tại vẫn chưa ổn định
- Swift không có nhiều các library
- Swift hiện tại có ít công ty sử dụng
- Swift khó làm việc với các api bậc thấp

Tất cả những vấn đề trên Apple sẽ nhanh chóng xóa bỏ khi mà họ đang cập nhật rất nhanh và đi những bước rất hợp thời như chính thức open source cho Swift. Swift 2 cũng có rất nhiều sự thay đổi mang tính đột phá trong ngôn ngữ này.

## Swift rất được ủng hộ từ các nhà phát triển ứng dụng
Một trong những minh chứng cho sự cám dỗ khủng khiếp của Swift là các blog về ios trước đây họ viết cho Objective-C nay đã chuyển dần sang Swift, hay thậm chí là họ viết lại các bài cũ với ngôn ngữ mới này. Các thư viện cho Swift cũng đang ngày một nhiều hơn với tốc độ chóng mặt. Về phía Apple, từ khi họ công bố Swift thì các videos WWDC cũng đã chuyển qua demo code trên Swift.

## Objective-C cũng vẫn tồn tại cùng Swift
Thế nhưng việc khai tử Objective-C trong tương lai là một nhận sai lầm. Mình chưa bao giờ thấy một ngôn ngữ lập trình bị khai tử cả, có chăng chúng ít được sử dụng đi thôi. Nói như vậy cũng không có nghĩa những ai đang cố chấp bám trụ với Objective-C thì cứ vẫn như thế. Hãy cứ thử làm 1 app đơn giản với Swift, bạn sẽ thấy nó thú vị không kém gì ngôn ngữ Objective-C hiện tại.

Thêm một điều cực kỳ quan trọng là vì Swift được phát triển trên cùng một nền tảng với Objective-C, cùng bộ biên dịch nên trong cùng một project ta có thể dùng cả 2. Wow ^^

## Kết luận
Nói dông nói dài để tóm lại là .... mình muốn khuyên mọi người nên học Swift, kể cả người mới hay người cũ ... vậy thôi !! :))


{% highlight Swift linenos tabsize=4 %}
let myself = "I want to make an iOS app"
if shouldILearnSwift() {
    print("Of course. Welcome to the new world")
} else {
    print("Why not ? It's so funny and easy to learn !!!")
}
{% endhighlight %}
