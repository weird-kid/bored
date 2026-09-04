
#### Memory Addressing Confusion as an Amateur OS Developer

I became aware of this confusion when I encountered a black
hole where I wasn't sure of the answers to questions like:

1.  Most virt->phy address translation happens through the MMU, a 
    dedicated hardware component for each core. When that fails,
    how does the hardware know to call the kernel's page_walk symbol?

2.  In the context of i386, firstly, I'm not aware of the architectural details 
    of why various zones [HIGHMEM, NORMAL, DMA] exist.

    Secondly, I'm very confused about how HIGHMEM (the majority of physical memory) 
    is managed when the kernel can't directly access it. 

    Thirdly, an inability to prove that kmalloc hands out NORMAL zone
    memory.

3.  How can you debug a page walk with KGDB, bfptrace, etc.?

4.  How do NUMA nodes solve the problem of unifying general 
    physical memory concepts across architectures?


Maybe some questions could be answered by more debugging, finding
blogs or more rational thinking in general. But the truth is, I'm 
tired of debugging and searching, or using logical explanations.
I want hard, hands-on evidence.

## Device Tree Blobs 

I figured maybe my confusion would somehow be fixed by understanding
how the flow of memory begins from the OS's POV, which is the device tree
blobs.

A DTB is a data format provided by a bootloader to the kernel. 
It provides information about what devices are I/O mapped by manufacturers
into the CPU and how to talk to them.


## Physical Memory Addressing.

It turns out that, at the time of manufacturing, various devices are memory-mapped into the CPU's
physical address space.

Which means each device has its own memory, advertises it to the CPU, and 
the CPU uses this memory to communicate with the device.

E.g.: For a serial device.
    In the DTB, a device would have a "reg = <addr> <size>" field.
    And when you "mov <addr>, al", the value at 'al' is internally sent
    to I/O ports, and the serial device interprets it as a character.

So, the physical memory a CPU can address is not limited to what a RAM stick can offer.

Check this [Stack Overflow thread]<softwareengineering.stackexchange.com/questions/359297/what-does-address-space-mean-when-talking-about-io-devices> out for more info.

The idea of physical memory is clear. The real problem lies in mapping.

So, I figured a good place to start was reading "i386's Programmer
Manual". 


## Misaligned address performance drop

What if I allocated a huge chunk of memory. And I tried to 
time the dereference of a different odd address every time instead
of an even one and compare the results?

Yes, an invalid dereference 
*(int *)((char*)array + i*sizeof(int) + 1) [array -> int*] 
was 40% slower at 100M dereferences.

Interesting.



    
