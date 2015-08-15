---
layout: post
title:  "C String pointer và chuyện ly cafe buổi sáng"
date:   2015-06-20
categories: C String Pointer
---
Đó là một câu chuyện vào buổi sáng đẹp trời, mình và một người bạn ngồi cafe lướt net, tình cờ cả hai thấy đoạn code C như sau:
{% highlight C linenos tabsize=4 %}
#include <stdio.h>
int main(int argc, char const *argv[])
{
	char *str = "I love programing";
	puts(str);
	printf("First character of my name is %c\n", 4[str]);
	return 0;
}
{% endhighlight %}
Ở dòng thứ 6, cuối dòng, có cái gì đó rất lạ: `4[str]`. Đoạn mã trên có vẻ như người viết có lẽ muốn lấy character thứ 5 trong chuỗi `str` nhưng thay vì khai báo là `str[4]` anh ta đã nhầm với `4[str]`, vì 4 là kiểu số nguyên `Int` thì làm sao lại có index được ?!?

Ông bạn mình thì cho rằng ngược lại, đoạn code trên chạy đúng và thử nếu chạy được thì mình phải trả tiền cafe, nếu không thì cậu ấy khao mình chầu này. OK để xem hôm nay có được free cafe không :D
<!--more-->
<h3>C String / Char Array</h3>

Tạm thời gác ly cafe qua một bên vì nó cũng không chạy đi đâu được. Trước tiên một số khái niệm cơ bản về kiểu `String` trong C:

C không có kiểu dữ liệu `String`, thay vào đó là một mảng kiểu `char` và thông thường tận cùng của mảng phải là `\0` hay còn được biết đến là `NULL`. Vì thế có thể khai báo lại biến str như sau:
{% highlight C linenos tabsize=4 %}
char str[] = "I love programing";
// hoặc char str[18] = "I love programing";
// "I love programing" nếu tính luôn NULL ở cuối mảng là 18 phần tử
{% endhighlight %}

<h3>Char Pointer</h3>

Chúng ta có thể dùng `char pointer` hay còn được gọi là con trỏ kiểu char như cách đoạn mã đầu bài khai báo.

Thú vị là cả char array hay char pointer thì thật ra cũng đều là pointer. Dựa vào kiểu dữ liệu cho mỗi phần tử trong mảng và độ lớn của mảng thì OS sẽ cấp phát một dãy bộ nhớ liên tiếp có độ lớn tương đương với `độ lón kiểu dữ liệu * số lượng phần tử`. Pointer của mảng chỉ đơn giản là trỏ vào vị trí bộ nhớ của phần tử đầu tiên trong mảng.

{% highlight C linenos tabsize=4 %}
char str[] = "I love programing";
// In địa chỉ của ký tự I trong chuỗi trên
printf("%p\n", s); // 0x7fff50e2dbbd
// Thay vì ta phải dùng &s để lấy địa chỉ vùng nhớ 
// thì chỉ cần s thôi cũng đủ rồi vì bản chất nó cũng là pointer
{% endhighlight %}

<h3>String literal luôn được cấp phát trong vùng nhớ Read-only</h3>

String literal là cách khai báo tường minh một chuỗi có dạng `"content"`. Các kiểu khai báo này đều được C cho vào vùng nhớ `read-only`, tức là sẽ không thể update hay modify gì được cả. Vì thế trong đoạn code bên trên `char *str = ...` ta sẽ không thể nội dung bên trong chuỗi này được.

{% highlight C linenos tabsize=4 %}
char *str = "I love programing";
str[0] = 'a'; // Sẽ có lỗi khi chạy chương trình, lỗi bus error
{% endhighlight %}

Và thêm nữa là OS chỉ tạo vùng nhớ cho mỗi literal string này một lần duy nhất. Đơn giản là nếu chúng đã không thể edit được thì cứ xài chung 1 chỗ thôi :)

{% highlight C linenos tabsize=4 %}
char *str = "I love programing";
char *str2 = "I love programing";
printf("%p == %p", str, str2); // Bạn sẽ thấy chúng trỏ vào cùng 1 chỗ
{% endhighlight %}

Vậy với `char str[]` thì sao ?!? Lúc này OS sẽ làm 2 bước, tạo literal string trong vùng nhớ `read-only` trước sau đó copy chúng ra vùng nhớ `stack`. Lúc này thì chúng ra có thể thay đổi nội dung bên trong str thoải mái.

Có lẽ C muốn bảo vệ cho lập trình viên nếu ai đó khỏi việc viết một chương trình in ra màn hình `"Hello World"` rồi bị hack thành hello một ai đó mà anh này không hề quen biết, haha :))

> Trong một chương trình đang chạy sẽ có 5 loại vùng nhớ phục vụ cho nó: Stack, Heap, Global, Read-only và Code.

<h3>Index trog Array và quay lại chuyện ly cafe</h3>

Tới đây thì đã sắp phải tính tiền và biết được ai phải trả tiền cafe rồi. Nhưng có ai tự hỏi là tại sao `index` của một array lại bắt đầu từ `zero` không nhỉ, sao nó không bắt đầu từ 1 ? Bởi vì nó là con trỏ và ngay từ đàu nó đã trỏ vào vị trí thứ 0, cũng là vị trí ô nhớ đầu tiên cho phần tử đầu mảng. Khi cần lấy giá trị ở vị trí khác trong mảng, nó chỉ việc dịch chuyển vị trí con trỏ tới hoặc lùi, bộ nhớ cho mảng là 1 dãy liên tục nên máy tính thực hiện việc này rất nhanh. Đó cũng là lý do tại sao truy xuất 1 phần tử trong mảng với index lại nhanh đến như vậy.

Từ đó ta có `str[4] == *(str + 4) == * (4 + str) == 4[str]`. Vì thế đoạn code ở đầu vài không những không có lỗi mà còn chạy tốt là khác, nó lấy ký tự thứ 5 trong chuỗi. 

<h3>Mảng 2 chiều - Cơ hội cho ly cafe khác !?!</h3>

Mảng 2 chiều thường được định nghĩa là mảng của mảng hay dài dòng hơn là mỗi phần tử là mảng một chiều. Nếu bạn nghe ai đó định nghĩa về mảng 2 chiều như vậy thì chưa chắc người này đã biết đoạn mã sau:

{% highlight C linenos tabsize=4 %}
int number[2][10]; // cái này hay được gọi là mảng 2 dòng 10 cột
number[i][j] == *(number + i*10 + j); // lấy phần tử dòng i cột j
{% endhighlight %}

Hoá ra mảng 2 chiều đối với con trỏ cũng chỉ là mảng một chiều mà thôi :). Bạn thử xem biết đâu đc free ly cafe :)

Cô chủ ơi tính tiền 2 ly cafe cho con nhé :D