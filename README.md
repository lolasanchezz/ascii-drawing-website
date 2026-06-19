# ascii art!

a little next js + react app for drawing ascii art. a web version of my terminal-draw project, which draws with ascii in the terminal.
made for hack club's scribble ysws run by jane 😁
i really like the look of ascii art, and i figured i'd make a web ascii drawer for fun and in a few hours.
## functionality
just an array of an array of strings (chars, but those don't exist in typescript). each one gets rendered into a span. the spans themself have on click handlers that update
the char array. definitely not the best way to do it but it works!! the drawing character and the brush size can be changed.