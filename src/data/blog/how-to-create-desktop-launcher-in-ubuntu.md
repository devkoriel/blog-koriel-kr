---
title: How to Create Desktop Launcher in Ubuntu
author: Jinsoo Heo
pubDatetime: 2016-09-25T20:15:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - ubuntu
  - development
description: Dependencies  --------------------------------------------------------------------------------   * Ubuntu  * gedit   How to Create Desktop Launcher  --------...
lang: en
---

# Dependencies

---

-   Ubuntu
-   gedit

  

# How to Create Desktop Launcher

---

### 1\. Create icon image

Let’s make `.icons` directory at `/home/<user-name>` with following commands.

```shell
$ mkdir ~/.icons && xdg-open ~/.icons

```

  

If `.icons` folder opens, put the icon image in it like below.

![icons](https://blog.koriel.kr/content/images/2017/10/icons.png)

  

### 2\. Create .desktop file

The second step is to create `.desktop` file for your applications then edit it. It has to follow some predefined formats. But you don’t have to worry about it at all. I’ll show you the precedures step by step and even the examples.

First, let’s move to `/usr/share/applications` and make `.desktop` file with following commands.

```shell
$ cd /usr/share/applications && gedit <application-name>.desktop

```

> Customize the code
> 
> Change <application-name> to your real application's name.

  

Then `gedit` editor window will open and you have only to type the followings. If done, just save it.

  

-   Sample .desktop file

```text
[Desktop Entry]
Type=Application
Encoding=UTF-8
Name=Sample Application Name
Comment=A sample application
Categories = Application Category
Exec=application
Icon=application.png
Terminal=false

```

  

-   Line by line explanation

Line

Description

\[Desktop Entry\]

The first line of every desktop file and the section header to identify the block of key value pairs associated with the desktop. Necessary for the desktop to recognize the file correctly.

Type=Application

Tells the desktop that this desktop file pertains to an application. Other valid values for this key are Link and Directory.

Encoding=UTF-8

Describes the encoding of the entries in this desktop file.

Name=Sample Application Name

Names of your application for the main menu and any launchers.

Comment=A sample application

Describes the application. Used as a tooltip.

Categories= Application Category

Categories the application belongs to.

Exec=application

The command that starts this application from a shell. It can have arguments.

Icon=application.png

The icon name associated with this application.

Terminal=false

Describes whether application should run in a terminal.

  

-   Exec variables

Add...

Accepts...

%f

a single filename.

%F

multiple filenames.

%u

a single URL.

%U

multiple URLs.

%d

a single directory. Used in conjunction with %f to locate a file.

%D

multiple directories. Used in conjunction with %F to locate files.

%n

a single filename without a path.

%N

multiple filenames without paths.

%k

a URI or local filename of the location of the desktop file.

%v

the name of the Device entry.

  

-   My example(e.g., QGroundControl)

```text
[Desktop Entry]
Version=1.0
Type=Application
Name=QGroundControl
Icon=/home/daniel/.icons/qgroundcontrol.png
Exec=/home/daniel/files/qgroundcontrol/qgroundcontrol-start.sh %f
Comment=QGroundControl
Categories=Utility;
Terminal=false
StartupWMClass=qgroundcontrol

```

> Tips for Desktop Entry Specification
> 
> See [Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) for official specifications for .desktop entries and that page also includes a link to [Registered Categories](https://specifications.freedesktop.org/menu-spec/menu-spec-1.0.html#category-registry).

  

### 3\. Make .desktop executable

The third step is to make `.desktop` entry executable. The following command will do it.

```shel
$ sudo chmod +x /usr/share/applications/<application-name>.desktop

```

  

All the steps complete. If the setting isn’t applied, reboot the system then check it out.
