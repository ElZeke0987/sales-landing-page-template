
=====================================================

        Infinite Carousel Slider Component

-----------------------------------------------------

                Thanks for buying

=====================================================

```tsx
import { InfiniteCarouselSlider } from "./Slider";

<InfiniteCarouselSlider autoplay autoPlayDelay={5000} />
```

# Introduction

This is a Ready-To-Use&All-In-One Infinite Carousel Slider Component for React.
If you find any bug or want to add a feature, please contact the dev.

# Dev Tip

Every time you change a function/add a function for a listener, you must update the page

# WIP Features

Currently WIP features are:

- Vertical direction
- isContinous

Stay tuned for updates!

# Technical Details

## Props

### slidesList: {image: string, title: string, description: string}[]

This prop is mandatory. It represents the list of slides or elements you want to display.

### isInfinite boolean

Enables or disables the infinite loop behavior.
If true, the slider will loop infinitely.
Default: true.

### peekOposite boolean, 

Enables the "peek opposite" effect, which shows a preview of the opposite slide.
Default: true.

### hasAnimation boolean,

Enables or disables slide transition animations.
Default: true.

### isDraggable boolean,

It is optional this value, it is the is draggable, if you want to show the slides draggable, set it to true, because default is true

### autoPlay boolean

Enables or disables autoplay.
Default: true.

### autoPlayDelay number

Sets the delay (in milliseconds) between automatic slide transitions.
Default: 5000 (whatever value you use)

### direction "horizontal" | "vertical" (WIP)

Sets the sliding direction.
Default: "horizontal" (currently incomplete, vertical is not supported).

### rtl boolean

Enables or disables right-to-left (RTL) direction.
Default: false.

### animationDuration number

Sets the duration (in milliseconds) of the slide transition animation.
Default: 500 (whatever value you use)

### animationType

Sets the type of the slide transition animation.
Default: "cubic-bezier(0.4, 0, 0.2, 1)" (whatever value you use)

### isContinous (WIP)

Enables or disables a truly continuous, infinite loop behavior.
Default: false.

## Methods

### next

Moves to the next slide (currentIndex + 1).
If the current slide is the last one, it moves to the first slide.

### prev

Moves to the previous slide (currentIndex - 1).
If the current slide is the first one, it moves to the last slide.

### goToSlide

Sets the current slide to the given index.
This is similar to setCurrentIndex, but more user-friendly.
It also stops and restarts autoplay.

### setCurrentIndex

Sets the current index directly.

### getCurrentIndex

Returns the current index.

### stopAutoPlay

Stops the autoplay functionality.

### startAutoPlay

Starts the autoplay functionality.

### setIsDraggable

Enables or disables draggable functionality.

### on

Registers event listeners (similar to addEventListener).

### emit

Emits events (similar to dispatchEvent).

### setAnimationDuration

Sets the duration (in milliseconds) of the slide transition animation.
Default: 500 (whatever value you use)

## Events

### initSlider

Triggered when the slider is initialized (triggered in a useEffect(() => {},[]))

### indexChange

Triggered when the visible slide index changes (between 1 and slides.length).
Clones are not included.

### indexChangeFromEnd

Triggered when the slider jumps from the last slide to the first one, or vice versa.
Clones are not included.

### effectIndex

Triggered when the internal index changes (between 0 and slides.length + 1).
Clones are included.

### dragging

Triggered when the slider is being dragged

### prev

Triggered when the slider moves to the previous slide, either by dragging or by pressing the prev button.

### next

Triggered when the slider moves to the next slide, either by dragging or by pressing the next button.

### transitionEnd

Triggered when the slide transition animation ends.

### reachLimitNoInfinite

Triggered when the slider reaches a limit (start or end, 1 or slides.length) while infinite mode is disabled.
Clones are not included.

### reachStartNoInfinite

Triggered when the slider reaches the start (1) while infinite mode is disabled.
Clones are not included.

### reachEndNoInfinite

Triggered when the slider reaches the end (slides.length) while infinite mode is disabled.
Clones are not included.



# License

MIT License

# Inner Logic

## Clones

This carousel uses **clones** at the beginning and end of the slides list.

- The first clone represents the **last real slide**.
  - Its `currentIndex` is `0`.
- The last clone represents the **first real slide**.
  - Its `currentIndex` is `slides.length + 1`.

### You cannot navigate to the first or last clone directly

These clones exist only to create smooth transitions between the first and last real slides.

---

## Movement and Animation

When you move to the next or previous slide, the animation is triggered and the `currentIndex` is updated.

This behavior is handled by functions such as:
- `handleTouchStart`
- `handleTouchMove`
- `handleTouchEnd`
- `next()`
- `prev()`

---

### End-to-Start / Start-to-End Logic

All of this logic is handled by the `handlePrevCondition` function.

This function manages both drag and click events and handles edge cases when the `currentIndex` is `0` or `slides.length + 1`.

---

### Infinite Loop Logic

`isTransitioning` is a boolean that is set to `true` while the slider is transitioning between End and Start and vice versa, and to `false` when it is not.

Its purpose is to prevent regular animations when jumping from one end to the other. This allows the `currentIndex` to change instantly when the slider reaches the end, without waiting for the animation to finish.

However, the user must wait for the `currentIndex` to update before interacting again. During this time, the slider is temporarily frozen for a few milliseconds. Normal users will not notice this.

---

## AutoPlay

The autoplay feature is handled by the `startAutoPlay` and `stopAutoPlay` functions.

Depending on whether `rtl` is `false` or `true`, autoplay will execute `next()` or `prev()` respectively.

