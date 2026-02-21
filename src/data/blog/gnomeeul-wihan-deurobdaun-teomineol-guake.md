---
title: GNOME을 위한 드롭다운 터미널, Guake
author: Jinsoo Heo
pubDatetime: 2016-09-24T20:02:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - ubuntu
  - gnome
  - development
description: Introduction  --------------------------------------------------------------------------------   * Guake란?      Guake는 리눅스 GNOME Desktop 환경에서 사용할 수 있도록 만들어진 ...
lang: ko
---

# Introduction

---

-   ### Guake란?
    

**Guake**는 리눅스 **GNOME** Desktop 환경에서 사용할 수 있도록 만들어진 드롭다운 터미널입니다. Guake의 창 스타일은 FPS 게임에서 차용하였다고 개발자는 소개하고 있습니다. 아마 많은 FPS 게임에서 `Backtick` 키를 누르면 나타나는 콘솔창을 말하는 것 같습니다. 이러한 스타일의 장점은 터미널에 접근하기 쉽다는 점입니다. 실제 사용해보면 정말 편한 것이, 어느 창에서든 해당 단축키만 누르면 사용하던 터미널을 다시 불러올 수 있습니다. 사용중인 윈도우 위에 오버랩하는 방식이기 때문에 기존의 터미널을 열기위해 겪었던 번거로움을 해소해줍니다.

  

-   ### Features
    
    -   가볍다.
    -   사용하기 쉽고 깔끔하다.
    -   GUI와 자연스럽게 통합된다.
    -   미리 정의된 단축키(기본값 F12)만 누르면 터미널을 불러올수도, 사라지게할수도 있다.
    -   Compiz Transparency를 지원한다.
    -   탭을 여러개 생성할 수 있다.
    -   다양한 색상 팔레트가 있다.
    -   파일을 클릭하여 원하는 텍스트 편집기로 열 수 있는 빠른 열기를 지원한다.
    -   단축키를 직접 편집할 수 있다.
    -   원하는대로 구성하여 사용할 수 있다.
    -   Guake를 시작하는 `bash script` 를 시작 프로그램에 등록할 수 있다.
    -   다수의 모니터를 지원한다. (지정한 모니터에서 열기, 마우스 포인터가 있는 곳에서 열기)
    -   터미널 자료를 파일로 저장할 수 있다.
    -   URL을 브라우저에서 열 수 있다.

  

-   ### Dependencies
    
    -   Python2.7+
    -   pygtk2.10 (gtk.StatusIcon)
    -   notify-osd (Ubuntu)
    -   python-appindicator (Ubuntu)
    -   python-dbus
    -   python-gconf
    -   python-keybinder
    -   python-notify
    -   python-vte
    -   python-xdg
    -   libutempter

> 굳이 따로 설치하지 않아도 됩니다
> 
> 이 빌드 의존성들은 사용자가 apt-get 명령어를 이용해 **Guake**를 설치할 때 자동으로 설치됩니다.

  

# How to Install Guake

---

### 1\. Guake 설치하기

**Guake**를 설치하기 위해선 아래 명령어를 터미널에서 입력하면 됩니다.

```shell
$ sudo apt-get update
$ sudo apt-get install guake

```

  

### 2\. Fix 에러 - “Guake can not init!”

응용 프로그램 메뉴에서 Guake를 실행한 후 아래와 같은 오류 메시지가 나타날 수도 있습니다. 정상적으로 실행이 된다면 이 단계는 건너뛰어도 됩니다.

> Guake can not init!
> 
> Gconf Error.  
> Have you installed guake.schemas properly?

위 오류는 `guake.schemas` 파일이 올바른 경로에서 발견되지 않아 발생하는 오류로 다음의 과정으로 쉽게 고칠 수 있습니다.

```shell
$ sudo mkdir /etc/gconf/schemas
$ cd /etc/gconf/schemas/
$ sudo ln -s /usr/share/gconf/schemas/guake.schemas

```

  

이제 다시 Guake를 실행하면 잘 작동할 것입니다.

  

### 3\. Guake를 시작 프로그램에 등록하기

_**응용 프로그램 메뉴 - 시스템 도구**_ 에서 시작 프로그램을 찾아 실행하면 아래와 같은 창이 나타납니다. <!-- 이미지 유실: 시작 프로그램 설정 창 스크린샷 -->

오른쪽 _**추가(A)**_ 버튼을 눌러 편집창이 나타나면 아래와 같이 수정하고 저장합니다. <!-- 이미지 유실: 시작 프로그램 편집 창 스크린샷 -->

아래 명령어를 통해서도 Guake를 시작 프로그램에 등록할 수 있습니다.

```shell
$ cp /usr/share/applications/guake.desktop /etc/xdg/autostart/

```

  

### 4\. Guake 단축키 수정하기

터미널에서 아래 명령어를 입력하면 Guake 속성창이 나타납니다. _**키보드 단축키**_ 탭에서 단축키들을 편집할 수 있습니다.

```shell
$ guake -p

```

<!-- 이미지 유실: Guake 속성 창 스크린샷 -->

  

### 5\. Guake 실행 화면

_**Toggle Guake visibility**_ 에 해당하는 단축키를 누르면 아래와 같이 **Guake**가 실행됩니다.

<!-- 이미지 유실: Guake 실행 화면 스크린샷 -->
