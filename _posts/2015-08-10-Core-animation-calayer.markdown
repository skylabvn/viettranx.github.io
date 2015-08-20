---
layout: post
title:  "Core Animation - CALayer"
date:   2015-08-10
categories: Objective-C Swift
---
## Core Animation
Core Animation lies at the heart of both iOS and MacOS. It is a graphic rendering and animating infrastructure that you can use to animate views in your apps. With Core Animation, most of the works required are setting few animation parameters (such as start point and end point, duration), Core Animation does the rest.

Core Animation is misunderstanding named. You might assume its primary purpose is animation, but actually it can be used for rendering other visual elements (such as border radius, drop shadow, ...).

Most of the drawing work in Core Animation are handled on graphic hardware (or can be thought as GPU) to accelerate the rendering. This makes your animations result in high frame rates and smooth without burdening the CPU which can slow down your app. Core Animation in Cocoa framework:

<center><img style="display:block" width="350" src="/images/posts/ca_architecture.png" /></center>
<!--more-->

## CALayer
Core Animation can not drawing itself, it uses layer object, `CALayer` as specific.

### Parallel Hierachies
Like views, CALayers are rectangular objects. Views can be nested inside another one to form a hierachy, and it does the same with CALayer (heirarchical tree). Every UIView has a layer property, this is known as the `backing layer`. When you add subviews or remove it from the view hierarchy, their corresponding backing layers are connected up in parallel:

<center><img style="display:block" width="350" src="/images/posts/parallel_heirarchy.png" /></center>  
<br />
Why does iOS have two heirarchies, one for UIView and one for CALayer ? The reason is to seperate responsibities and void duplicating code. Events and user interaction work quite differently between iOS and MacOS. In iOS, user interaction is based on multiple concurrent finger touches (`multitouch`), which has different mechanism with mouses and keyboards on MacOS. By separating out the logic into the standalone Core Animation framework, Apple is able to share that code between iOS and Mac OS, making things simpler for developers at both flatforms.

### CALayer capacity
For simple purposes, we don't need to deal directly with CALayer. If you want to do something slightly out of the ordinary, you have no choice to but venture down to CALayer. Here are some features of CALayer can do but UIView can not:  

- Drop shadows, rounded corners, colored borders  
- 3D transforms and positioning  
- Nonrectangular bounds  
- Alpha masking of content  
- Multistep, nonlinear animations  

One thing to note is CALayer does not have the responder chain (the mechanism that iOS uses to propagate touch events through the view hierarchy), so it cannot respond to events, although it provides methods to help determine whether a particular touch point is within the bounds of a layer.

### Coordinate system in iOS and MacOS
In iOS, the origin of the bounds rectangle is in the top-left corner of the layer by default, and in OS X it is in the bottom-left corner. If you share Core Animation code between iOS and OS X versions of your app, you must take such differences into consideration

<center><img style="display:block" width="600" src="/images/posts/coordinate_system.png" /></center>  
<br />

### Anchor point in CALayer
Every CALayer has an anchor point, which you can access using the layer’s anchorPoint property. The impact of the anchor point is most noticeable when manipulating the position or transform properties of the layer.

<center><img style="display:block" width="600" src="/images/posts/anchorpoint_position.png" /></center>
<br />

### Implicit animation in CALayer
For most of these properties, changing the property's value results in creating of an implicit animation with 0.25s duration.  

[Link Demo](https://github.com/viettranx/Core-Animation-Demos){:target="_blank"} - Project Implicit Animation CALayer

