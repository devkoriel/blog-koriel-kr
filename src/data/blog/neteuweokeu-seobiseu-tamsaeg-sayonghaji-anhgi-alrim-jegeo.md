---
title: Ubuntu 네트워크 서비스 탐색 사용하지 않기 알림 제거
author: Jinsoo Heo
pubDatetime: 2016-09-30T20:42:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - ubuntu
description: Introduction  --------------------------------------------------------------------------------  Ubuntu를 설치하고 처음 부팅을 하면 다음과 같은 오류가 팝업될 때가 있다.    사용하는 데 별 지장은 ...
lang: ko
---

# Introduction

---

Ubuntu를 설치하고 처음 부팅을 하면 다음과 같은 오류가 팝업될 때가 있다.

![Avahi-Network-Service-Discovery-Disabled](https://blog.koriel.kr/content/images/2017/10/Avahi-Network-Service-Discovery-Disabled.png)

사용하는 데 별 지장은 없지만, 부팅할 때마다 이 팝업이 뜨면 꽤 성가시다. 에디터로 간단하게 두 파일만 수정하면 이 팝업 알림을 없앨 수 있다.

  

# Step. 1

---

터미널에서 아래 명령어를 입력하자.

```shell
$ sudo gedit /etc/default/avahi-daemon

```

  

에디터 창이 열리면 마지막 줄의

```text
AVAHI_DAEMON_DETECT_LOCAL=1

```

의 값을 0으로 수정한다.

> gedit이 설치되어 있지 않다면?
> 
> gedit이 설치되어 있지 않다면, $ sudo apt-get install gedit 명령어로 설치하자.

  

# Step. 2

---

터미널에서 아래 명령어를 입력하자.

```shell
$ sudo vi /usr/lib/avahi/avahi-daemon-check-dns.sh

```

  

에디터 창이 열리면 12번째 줄의

```shell
AVAHI_DAEMON_DETECT_LOCAL=1

```

의 값을 0으로 수정한다.

수정한 후 저장하면 더 이상 **_네트워크 서비스 탐색 사용하지 않기_** 알림은 뜨지 않을 것이다.
