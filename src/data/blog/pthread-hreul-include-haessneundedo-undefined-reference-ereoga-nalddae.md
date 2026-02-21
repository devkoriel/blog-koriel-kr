---
title: pthread.h를 include 했는데도 undefined reference 에러가 날때
author: Jinsoo Heo
pubDatetime: 2016-10-16T21:36:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - linux
  - gcc
  - c
ogImage: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=cbbeb38815936507752d594d9f856b7d"
description: Problem  --------------------------------------------------------------------------------  Pthread API를 이용하여 프로그래밍을 할 때, pthread.h를 include 했는데도 다음과 같은 오류가 나...
lang: ko
---

# Problem

---

**Pthread API**를 이용하여 프로그래밍을 할 때, `pthread.h`를 include 했는데도 다음과 같은 오류가 나타나며 컴파일이 안되는 경우가 있다. 빡침… `pthread.h`를 찾지 못해서 생기는 오류이다.

```shell
/tmp/cctcT7AX.o: In function `main':
pthread.c:(.text+0x4e): undefined reference to `pthread_create'
pthread.c:(.text+0x5f): undefined reference to `pthread_join'
collect2: error: ld returned 1 exit status

```

  

# Solution

---

```shell
$ gcc source.c -o source -lpthread

```

`gcc` 컴파일 옵션에 `-lpthread`를 추가하면 말끔히 해결된다.

> gcc의 컴파일 옵션을 잘 활용하자
> 
> \-l 옵션은 헤더 파일을 탐색할 디렉토리를 지정해주는 옵션이다.
