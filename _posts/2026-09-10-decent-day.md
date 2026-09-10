
## Editor Fixes

I wanted to move on from the editor, but the error kept bugging
me at night. So, I read more docs. Installed the ncurses man pages.

And ... It works, kinda. The code did exactly what it was supported to,
but the design was wrong.

I wanted to add cursor editing capability using arrow keys. 
But Logically it was not.

At the end, I was maintaining two cursors. 
One cursor to write text.
Another to move the cursor around.
And when you switched over, it would continue where the previous
cursor was left off.

I don't actually know what was the issue. 
I just kept on creating demo programs to experiment function behaviours.
Then, I refactored a little because it was ugly.
Then, it went away.


## Simple Hello world tutorial 

I wanted to create a simple bootloader which prints hello world.
I read QEMU's documentation and they have various methods like generic-loader, guest-loader, etc.

I'm confused by whats the difference between the two


