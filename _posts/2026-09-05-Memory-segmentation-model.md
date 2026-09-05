
I was reading the [i386 manual for programmers]<https://pdos.csail.mit.edu/6.828/2018/readings/i386.pdf>
and found the *Memory Organisation and Segmentation* very
interesting.

### Memory Organisation

The book defines Memory Organisation as the memory layout
seen by application developers. I think it means, you get to
control how virtual memory is perceived. 

## Segmented Model

It says a segment is a memory range that can last entire 2^32 
byte region. To access memory within this model you use a segment
selector [16 bit]  + address [32 bit] to reference the data.

And then it mentions cpu automatically chooses  segment register 
(selector) automatically [CS, DS, ES]  based on the instruction
[prefetch, mov rax,<addr from .rodata> & string REP]. 

I'm confused is what exactly consists a segment ?
Because CS/DS are  elf concepts [sections/segments].
It also does not give any details about how mapping is done?

I moved on, because I think the details will be explained in
System Programming Chaptor. So much theory, I goofed around the
internet and found interesting things.


### Off Topic

## TempleOS

While I was estimating content on youtube for "How to build OS from Scratch"
type videos. I was introduced to a OS, which had a lot of strong opinons & 
was done completely by a single person. He created a Just-in-Time version of
C, own graphics library. 

Its almost like he escaped reality and was willing stuck in his own world.
He was like a god there. 

I wish I had such strong opinons. Maybe to do something just because its bad.
And see how bad it truely is.

## ARCADE GAME as an UEFI Application

I was watching this [video]<https://www.youtube.com/watch?v=ZFHnbozz7b4>, where a 
person wrote assembly code using uefi runtime library to certain procedures and then
compiled it into .EFI and put it in a standard path so UEFI bootmanager can find it.

So, he found funcs from a UEFI handbook to run a struct which describes  the video
frame. 

If I were to make my own OS. I don't want to replace second stage Bootloader (GRUB)
with my code. Actually why do they use GRUB ? To start initramfs !!






