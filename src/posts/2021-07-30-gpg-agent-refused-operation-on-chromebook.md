---
title: gpg agent refused operation on chromebook 
description: Error on chromebook when gpg agent throws sign_and_send_pubkey signing failed agent refused operation
date: 2021-07-30T13:28:43.555Z
---

I'm chomebook go user, and when im trying to use gpg agent for ssh sub keys I see this error:

```txt
sign_and_send_pubkey: signing failed: agent refused operation
```

The internet said i should add `UPDATESTARTUPTTY` to config. And other things with it...
But its not working...

## Solution

Just install `gnome-keyring`. This works perfect for me.

```txt
sudo apt install gnome-keyring
```

