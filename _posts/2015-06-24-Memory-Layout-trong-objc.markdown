---
layout: post
title:  "Memory layout trong Objective-C"
date:   2015-06-24
categories: Objective-C memory
---

### Memory Layout
Trong một chương trình đang chạy chúng ta biết nó sẽ được hệ điều hành cấp phát 1 lượng bộ nhớ (memory) nhất định để phục vụ cho chương trình. Nhưng lượng memory này không đồng nhất mà chia thành nhiều phần:
<img style="display:block" src="/images/memory-layout.png" />
Hình trên cho ta thấy cấu trúc memory trong chương trình Objective-C, hay còn gọi là `virtual address space`. Đây là vùng địa chỉ bộ nhớ mà chương trình có thể nhìn thấy, việc chuyển đổi giữa virtual address space và `physical addresses` được thực hiện bởi ([Memory Management Unit - MMU](https://en.wikipedia.org/wiki/Memory_management_unit)), đây là công việc của OS và chạy ẩn bên dưới, chương trình sẽ không quan tâm về điều này.
<!--more-->
Đi từ thấp lên cao ta sẽ có:

* `Text Segment`: đây là vùng nhớ "cứng" hay `read-only`. Vùng nhớ này sẽ chứa code thực thi chương trình và những biến ready-only.

* `Data Segment`: chứa các biến read/write và các biến toàn cục (global variables).

* `Heap`: chứa các khối memory mà được cấp phát động (`Dynamic Allocation`) khi chương trình chạy (`run time`). Ta có thể hình dung nó như các hộc giữ đồ, khi được yêu cầu thì nó sẽ cho 1 hộc tủ vừa đủ đựng món đồ đó và trả về 1 cái chìa khóa. Nếu ta không lấy đồ lại thì nó vẫn cứ ở trong tủ cho tới khi chương trình kết thúc. Về cơ chế, vùng nhớ này khi có yêu cầu cấp phát bộ nhớ thì nó sẽ chất đồ cao lên (`heap upward`) - một trong những lý do nó tên là Heap.

* `Stack`: Đây là vùng nhớ để gọi các hàm (`functions`) cũng như lưu trữ các biến cục bộ. Khi function được gọi, chương trình sẽ tạo một `stack frame`, đây là một vùng nhớ con bên trong Stack, nó sẽ có vừa đủ không gian cho thông tin của function như: tất tham số và biến cục bộ mà có đăng ký trong function. Tuy được gọi là Stack, thế nhưng nó lại phát triển hướng xuống (từ địa chỉ con trỏ cao tới thấp), sau khi function hoàn tất công việc, con trỏ sẽ quay về vị trí trước đó, tức là vị trí con trỏ cao hơn, lúc này stack frame cũng sẽ được giải phóng.
{% highlight C linenos tabsize=4 %}
#include <stdio.h>
void test() {
    int a = 1;
    int b = 2;
    int c = 3;
    printf("%p, %p, %p", &a, &b, &c); // 0x7fff5fbff7ac, 0x7fff5fbff7a8, 0x7fff5fbff7a4
    // Thứ tự của con trỏ rõ ràng là hướng xuống
}
int main(int argc, const char * argv[]) {
    test();
    return 0;
}
{% endhighlight %}

### Đôi điều về memory management
Ở trên mình có đề cập việc chuyển đổi giữa virtual memory <=> physic memory là của OS, ngoài ra trong Mac có những cơ chế tối ưu như `NSZone`. Để hiểu về NSZone ta có thể tìm hiểu 1 chút về cơ chế cấp phát bộ nhớ, đặc biệt là khi bộ nhớ trên RAM không đủ cho nhu cầu cấp phát. Lúc này OS sẽ mang 1 phần bộ nhớ tương đương trên RAM copy vào HDD (hay còn được biết đến là virtual memory), sau đó giải phóng vùng nhớ này để cấp phát cho chương trình đang cần. Và OS cũng sẽ làm ngược lại khi vùng nhớ trên HDD đang được yêu cầu tái sử dụng. Cơ chế này gọi là Swapping hay [Pagging](https://en.wikipedia.org/wiki/Paging).

Trên thực tế cơ chế Paging lại không vận hành dễ dàng như thế. Trong trường hợp các đối tượng thường hay được truy vấn cùng nhau (vd: Book và Author), điều gì xảy ra nếu Book thì đang ở trên RAM và Author thì lại ở trên HDD, điều này ảnh hướng rất lớn tới hiệu năng chương trình. Tệ hơn, nếu OS lại giải phóng đúng ngay vùng nhớ của Book và đưa nó vào HDD lấy Author ra RAM. Hệ quả này được gọi là `Thrashing`. Lúc này công việc của NSZone là đảm bảo cho cả 2 đối tượng trên luôn ở gần nhau vì thế sẽ chống Thrashing và đồng thời tăng hiệu năng cho ứng dụng. Hiện tại NSZone không được Apple khuyến khích sử dụng nữa vì OS đã làm luôn công việc này.

Với sự phát triển phần cứng như hiện tại cũng như các ngôn ngữ lập trình ngày càng thông minh hơn thì có vẻ đây là chuyện của quá khứ. Các ngôn ngữ hiện đại như Swift cũng không còn quản lý bộ nhớ tường minh nữa. Nhưng về mặt bản chất nó vẫn luôn tồn tại và góp phần không nhỏ tới hiệu năng của ứng dụng.
