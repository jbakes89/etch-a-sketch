# Etch-a-Sketch

## for The Odin Project

---

This was completed as part of the Odin Project Foundations course as an exercise in basic programming principles using JavaScript.

### Things I've learned/practised:
- Using document fragments
- Adding and removing elements from the DOM (and how to do this more efficiently by editing the `innerHTML` property)
- Using `input type='color'`, and manipulating to give a custom appearance
- Mathematical formula for blending colors (alpha compositing)
- How to make backgrounds by combining gradients

### Things to add/improve:
- Export function allowing images to be saved?
- Sharing function for SNS integration (this is beyond the scope of this project, but something to consider adding in the future)
- I think that using greyscale to indicate the inactive painting mode is probably not ideal.
    - One possibility would be to set `opacity` (to around 0.3ish) and have the inactive swatch not respond to changes in the 'Transparency' setting. This seemed like more effort than it was worth; for example, the single color swatch is currently just set to the `currentColor` (in rgba), so this needs to be changed to only use the RGB values and then only change the `alpha` when it is the active mode. It wouldn't be difficult, but I think I need to get on with learning other things than continuing to make small tweaks like this.
- The menu could still be cleaned up a little bit
    - The input boxes could be made smaller.
    - The transparency input should automatically clamp the input values between 0 and 1, like the griz size already does for 1 to 100.
    - Tooltips should be added to the painting mode radio buttons.
- It might be worth adding something like a checkerboard in the background of the painting mode selection labels to better differentiate between lower opacity and lighter colors.