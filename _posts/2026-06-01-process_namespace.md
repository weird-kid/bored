---
layout: post
title: "How task_structs are organised using namespace"
date: 2026-06-23 09:00:00 +0530
categories: process 
---


### How are task_structs structured between process & threads using  pid namespaces ?


(Note: ->fieldname refers to (struct task_struct *)->fieldname)

## What I know & what I don't 

- Each thread has a unique pid value & a task_struct !
- All threads including  parent process belong to same tgid using ->thread_group.
- How does a thread's task_struct differ from its parent process ?
- We also have to check whats the difference between ->pid & ->pids ?

I think this is a good enough startpoint.
Lets verify what I know, first.

# how task_struct looks differently for process & thread !

When I mean different pid value, I mean inside kernelspace.
Because in userspace, different threads share the same pid. Why?
Userspace is not concerned over whats schedulable and whats not.

By default, a threads ->files_struct (open fd table), ->signal_struct (pending waitqueue of signals)
 & ->mm_struct(virtual addr space) is shared with their parent process.

For more info read these [thread_share_pid](https://stackoverflow.com/questions/9305992/if-threads-share-the-same-pid-how-can-they-be-identified), [process vs thread](https://linuxvox.com/blog/linux-kernel-threading-vs-process-task-struct-vs-thread-info/)


# How does pid hashing work & why is it needed?

It was needed because kernel maintains a circular linked list for all task_struct in
->tasks. It is used when say kill(-1) is called.

pid hashing does this in linear time. pid_hash[pid] = (pointer to task_struct).

But, I'm confused about the scope of tasks within ->tasks & where pid namespace fits in. 

