---
layout: post
title:  "Test tabs content"
date:   2015-08-10
categories: Animation
---
## Core Animation

<div class="tabs_container">
	<ul class="tabs">
		<li class="tab-link current" data-tab="tab-1">Swift</li>
		<li class="tab-link" data-tab="tab-2">Objective-C</li>
	</ul>
	<div id="tab-1" class="tab-content current">
		{% highlight Swift linenos tabsize=4 %}
	let myself = "I want to make an iOS app"
	if shouldILearnSwift() {
	    print("Of course. Welcome to the new world")
	} else {
	    print("Why not ? It's so funny and easy to learn !!!")
	}
	{% endhighlight %}
	</div>
	<div id="tab-2" class="tab-content">
		{% highlight Swift linenos tabsize=4 %}
	let myself = "Test tab"
	if shouldILearnSwift() {
	    print("Of course. Welcome to the new world")
	} else {
	    print("Why not ? It's so funny and easy to learn !!!")
	}
	{% endhighlight %}
	</div>
</div>