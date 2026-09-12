
#### Bootloader Progression


I want to increase the quality of these blogs by taking more
time (2 days max) and *actually reading* before I git push.

## Bootloader Motivation

I watched a [video]<https://www.youtube.com/watch?v=ZFHnbozz7b4> other day of a person creating a 
game inside the 1st sector (512 Bytes) in the Boot drive.

Also, [OsDevWiki]<> has a detailed requirements of what a 
custom bootloader should do 
So, I started today by reading [this]<https://krinkinmu.github.io/2020/10/11/efi-getting-started.html> blog. 

Let me try to sum up what he is trying to do.

He wants to emulate a FAT filesystem disk containing a .EFI binary in qemu.
That binary borrows a function table kind of struct from UEFI firmware.
The UEFI firmware passes various services to the applications using arg.

## Background about UEFI

UEFI is a upgrade to BIOS.
These systems constitute only the first stage of bootloader.
The exact no. of stages might vary based on OS.
Linux has 2 [UEFI + GRUB.EFI], FreeBSD has 4. 

The general idea is the same, but implementation might vary across
UNIX. Its just linux has a initramfs, and it compresses its linux image.
Where as FreeBSD chose to have several stages.

The entire point of UEFI/BIOS is so that there is a standard way to provide
services to second stage across different vendors.

Microsoft pushed for the existence of UEFI.
So, the .EFI binary is basically a window exe format.

## Coming Back to UEFI

They were some conflicting informations from the tutorial and
what I read Osdevwiki.

I have a couple of questions

1. Who has a FAT filesystem driver to interpret its contents and why ?
2. This .EFI is not present in the first 512 bytes, but other sectors. So, 
    whats present in the 512 bytes ?
3. How can I access the memory map as a UEFI application ?

So, I sort of under-stimated UEFI.
It provides a lot of functionality through RuntimeServices (can always use them)
and BootServices (can't use them once OS starts).

I tried to create a Hello world program and it sort of works. 
New insights

1. The program prints out my string, just for a fraction of second. I know what your
    saying, "he is such a noob, he forgot to pause execution". No, I did. I used
    the readkeystroke() and waitforkey() function. 

Actually it could be waitforkey() failed. Because I didn't fully understand I just saw *wait*
and maintain accuracy for compile time.

2. I need to play around more with qemu. Because it was not automatically running the EFI parition.
   I had to manually in device manager, click on it.

I used this qemu command

qemu-system-x86_64                          \
-drive if=pflash,format=raw,file=OVMF.fd    \
-drive format=raw,file=fat:rw:<dir>         \
-net none

3.  There are so many things related to memory management. You have load_image(), start_image(). Get memory maps.
    allocate_pages(). Maybe I can somehow even inspect the flash file and see what it does and how it serves my
    UEFI application.


## Conclusion

I honestly taught I couldn't learn much because everyone in Osdev website or discord always refered to BIOS.
So, I was skeptical. Later, after exploring the efi_system_table, I was unsure about my intial assumption.

I want to just focus on getting comfortable with UEFI. Maybe even how I can play around with vendor firmware.
I have some ideas like
    
    1. Changing Vendor Firmware to modify Vendor Logo to Anime girl or Open Source logo if I'm feeling noble.
    2. I want to somehow slip UEFI code to play video and audio of my favorate song "I really want to Stay At your house"
    3. Maybe some games as well.

Hopefully this post is of higher quality than yesterday.









