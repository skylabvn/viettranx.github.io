---
layout: post
title:  "Các từ khóa dùng khi khai báo biến trong Objective-C"
date:   2015-06-30
categories: Objective-C variable
---
Bài này không đề cập về kiểu dữ liệu mà các từ khóa ảnh hưởng tới cách chương trình làm việc với chúng. Bài viết sử dụng nhiều thuật ngữ từ bài [Memory Layout](/objective-c/memory/2015/06/24/Memory-Layout-trong-objc.html). Những từ khóa này có từ C, Objective-C cũng là C nên mình dùng luôn vẫn tốt.
<h2>auto</h2> 
Những biến được khai báo trong function hoặc chương trình con được gọi là `automatic` (tự động) hoặc `local variable` (biến cục bộ).
{% highlight C linenos tabsize=4 %}
#include <stdio.h>
int add(int a, int c)
{
	int c;
	c = a + b;
	return c;
}
{% endhighlight %}
Trong chương trình trên, biến `c` được gọi là automatic variable hay local variable.
<!--more-->
Biến local được tạo trong vùng nhớ `Stack`. Chúng sẽ tồn tại từ lúc khai báo đến khi kết thúc hàm (`function`). Như cơ chế đã nói ở bài trước thì bản thân hàm add trong đoạn code trên sẽ được đặt vào stack frame, khi hàm add kết thúc, con trỏ sẽ dịch chuyển lên vị trí trước đó. Và nếu lúc này ta gọi tiếp hàm add nữa thì con trỏ sẽ dùng lại stack frame này và overide lại vùng nhớ cho nó. Nhưng vì biến c được khai báo không có khởi tạo giá trị nên nó sẽ nhớ giá trị cũ (từ stack frame trước) cho tới khi ta gán cho nó giá trị mới.

Sở dĩ nó gọi là automatic varible là vì các biến này luôn tự tạo trong vùng nhớ Stack và được tự động quản lý bởi chương trình chứ không xin cấp phát và trả lại như Heap. Từ khóa này cũng là khai báo mặc định nên rất hiếm khi được sử dụng.

## extern
Từ khóa extern được sử dụng để để tạo tham chiếu cho các biến toàn cục `global variable` cho các file source khác nhau. Đại loại như trong một ứng dụng ta đếm số lượt xem của người dùng thì sẽ chỉ cần khai báo 1 biến int cho khắp ứng dụng thôi là đủ, ta sẽ khai báo như sau:
{% highlight C tabsize=4 %}
extern int pageCount;
{% endhighlight %}

Câu lệnh trên sẽ nói rằng trình biên dịch cứ tìm biến pageCount trong ứng dụng và link nó vào, trình biên dịch sẽ hiểu câu lệnh trên là biến int nhưng sẽ không cấp phát vùng nhớ, nó chỉ đi tìm biến pageCount đã có trong chương trình. Nếu ta không khai báo `int pageCount` ở bất kỳ nơi nào trong ứng dụng thì bộ biên dịch sẽ báo lỗi `linker error`. 

## static
Từ khóa này khá thú vị vì nếu không hiểu về memory sẽ không hiểu cách nó hoạt động. Cách vận hành `static variable` cũng tùy xem nó được khai báo trong hàm hay ngoài hàm (`external variable`), mà thật tế thì chúng chỉ khác là ở ngoài hàm thì sẽ được các hàm khác nhìn thấy và sử dụng.

{% highlight C tabsize=4 %}
void increase() {
	static int count;
	count++;
}
int main() {
	increase(); // count = 1;
	increase(); // count = 2;
	increase(); // count = 3;
	return 0;
} 
{% endhighlight %}

Static variable được cấp phát trong vùng nhớ `data Segment` và luôn được khởi tạo giá trị là 0 (nếu ta không gán giá trị cho nó). Vì nó không nằm trong vùng nhớ Stack nên biến `count` sẽ không mất đi khi hàm increase kết thúc, nếu ta tiếp tục gọi hàm increase thì biến count sẽ trỏ vào đúng vùng nhớ trong data segment để lấy giá trị cũ mà không cần khai báo lại. Đây còn gọi là khai báo 1 lần.

Trong trường hợp biến `static int count` được khai báo ngoài hàm thì toàn bộ file source chứa nó sẽ có thể sử dụng được nhưng các file source khác thì không. Đó là lý do từ khóa `extern` tồn tại.

## const
Đây là một trong số những từ khóa rất phổ biến, biến `const` được khởi tạo trong vùng nhớ read-only, chính vì thế ta không thể thay đổi giá trị của biến.
{% highlight C tabsize=4 %}
const int maxSpeed = 10;
maxSpeed = 20 // error
{% endhighlight %}

Nhưng với con trỏ thì dù con trỏ là const nhưng giá trị của nó vẫn thay đổi được, chỉ là nó không thể trỏ đến nơi khác.
{% highlight C tabsize=4 %}
int a = 10;
int b = 15;
int *const pa = &a;
a = 20; // OK, a = 20
pa = &b; // error
{% endhighlight %}

## volatile
Từ khóa `volatile` nhằm giúp khai báo 1 biến mà biến mà nói cho trình biên dịch rằng sẽ có khả năng giá trị của biến sẽ thay đổi bên ngoài main thread nên trình biên dịch không nên chạy tối ưu hóa cho code. VD ta có đoạn code sau đây:
{% highlight C tabsize=4 %}
int flag = 1;
while(flag) doSomething();
{% endhighlight %}

Lúc này trình biên dịch sẽ nhận ra rằng biến `flag` trong vòng lặp không được cập nhật vì thế nó sẽ tự tối ưu thành:
{% highlight C tabsize=4 %}
int flag = 1;
while(1) doSomething();
{% endhighlight %}

Như vậy vòng lặp sẽ lặp bất tận, ta có thể chống điều này bằng cách khai báo biến flag thành `volatile int flag`. Từ đó trình biên dịch sẽ hiểu là biến flag sẽ được update bên ngoài main thread.