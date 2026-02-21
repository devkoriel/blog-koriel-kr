---
title: GCC, G++ 다른 버전 추가하고 패키지 관리하기
author: Jinsoo Heo
pubDatetime: 2016-09-19T08:34:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - gcc
  - development
description: Dependencies  --------------------------------------------------------------------------------   * Ubuntu  * build-essentials   Problems  -------------------...
lang: ko
---

# Dependencies

---

-   Ubuntu
-   build-essentials

  

# Problems

---

필자는 보통의 프로젝트를 빌드할 땐, 가장 최신 버전인 `gcc-5`를 사용해왔다. 하지만 최근 운영체제론 수업 과제 때문에 `pintos`를 컴파일하는 과정에서 `gcc-5`를 사용해 컴파일했더니 `make check`에서 제대로 Pass되어야 할 Thread도 Fail이 뜨는 경우가 있었다. `pintos`의 여러 가이드에서 권장하는 `gcc-4.4`를 추가로 설치해야했다.

리눅스 환경에서 `gcc`를 이용해 컴파일을 하다보면, 버전 의존성 때문에 오류가 생길 때가 많다. 그렇다고 그럴때마다 `gcc`를 다른 버전으로 새로 설치하는 것은 번거로움이 크다. 이번 포스트에선 `gcc`의 이전 버전이나 새로운 버전을 추가로 설치하여 `update-alternatives` 명령어로 버전을 바꿔 사용하는 방법을 알아볼 것이다. `gcc-5`와 `gcc-4.4`를 기준으로 설명하겠다.

  

# How to Solve It

---

`build-essentials`이 설치되어 있지 않다면 아래 명령어를 입력하여 설치하자.

```shell
$ sudo apt-get update
$ sudo apt-get install build-essentials

```

  

이전 버전이나 새로운 버전의 `gcc`를 설치하려면 보통의 방법으로 그냥 설치하면 되지만, 간혹 해당 버전이 `Ubuntu Source Repository`에 등록이 되어 있지 않아 설치가 안되는 경우가 있다. 만약 그렇다면, 아래의 과정을 따라하자.

```shell
$ gedit /etc/apt/sources.list

```

를 입력하고 편집기 창이 열리면 마지막 라인에 다음을 추가하자.

```shell
deb http://dk.archive.ubuntu.com/ubuntu/ trusty main universe
deb http://dk.archive.ubuntu.com/ubuntu/ trusty-updates main universe

```

  

위의 과정을 마치고 아래의 명령어를 입력하면 `gcc-4.4`와 `g++-4.4`가 성공적으로 설치될 것이다.

```shell
$ sudo apt-get install gcc-4.4 gcc-4.4-multilib g++-4.4 g++-4.4-multilib

```

현재 설치된 여러 버전의 `gcc`를 확인해보고 싶으면 아래의 명령어를 입력하면 된다.

```shell
$ sudo dpkg -l | grep gcc | awk '{print $2}'

```

  

또 현재 설치되어 사용중인 `gcc`의 버전을 확인하고 싶으면 아래의 명령어를 입력하면 된다.

```shell
$ gcc --version
$ g++ --version

```

  

이제 동시에 설치한 여러 버전의 `gcc`를 `update-alternatives`로 관리해야 하는데, Ubuntu가 해당 패키지에 alternatives를 자동으로 설정할 수 도 있지만 그렇지 않으면 사용자가 수동으로 설정해주어야 한다.

```shell
$ sudo update-alternatives --display gcc

```

를 입력하면 현재 `gcc`에 alternatives가 설정되어 있는지 확인할 수 있다. 그렇지 않다면 아래 명령어를 입력해 수동으로 추가해줘야 한다.

```shell
$ sudo update-alternatives --install <link> <name> <path> <priority>

```

| Argument | Description |
|----------|-------------|
| `link` | 실행 파일의 이름으로 `/etc/alternatives/`을 가리킨다. (예: `/usr/bin/gcc`) |
| `name` | 해당 링크 그룹의 대표 이름으로, 여러 가지 버전의 패키지들을 대표하는 이름으로 보면 된다. (예: `gcc`) |
| `path` | alternatives로 실제 연결할 실행 파일의 이름으로, 시스템에 설치한 패키지의 실행 파일 이름이다. (예: `/usr/bin/gcc-4.4`) |
| `priority` | automatic 모드에서 어떤 것을 자동으로 선택해서 사용할지 결정할 때 사용되는 우선순위로, 높은 수가 더 높은 우선순위이다. |

  

실제로 `gcc-5`와 `gcc-4.4`를 alternatives에 등록하고 우선순위를 설정하려면 아래와 같은 명령을 수행하면 된다.

```shell
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 40
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.4 20

```

`gcc-5`의 우선순위가 더 높으므로 automatic 모드에선 `gcc`를 입력하면 기본적으로 `gcc-5`를 사용하게 된다.

지금은 두 버전의 `gcc`를 alternatives에 등록만 해두었을 뿐, `update-alternatives`를 사용하여 실제로 버전을 바꾼 것이 아니므로, 여전히 `gcc-5`를 사용하고 있는 것이다.

`gcc`을 다른 버전으로 바꾸려면 아래의 `update-alternatives` 명령을 수행해야 한다.

```shell
$ sudo update-alternatives --config gcc
대체 항목 gcc에 대해 (/usr/bin/gcc 제공) 2개 선택이 있습니다.

  선택       경로            우선순위 상태
------------------------------------------------------------
* 0            /usr/bin/gcc-5     40        자동 모드
  1            /usr/bin/gcc-4.4   20        수동 모드
  2            /usr/bin/gcc-5     40        수동 모드

Press <enter> to keep the current choice[*], or type selection number:

```

설정하고자 하는 패키지의 인덱스 넘버를 입력한 후 엔터키를 치면 해당 버전으로 전환된다.

  

```shell
$ gcc --version

```

으로 `gcc`버전이 바뀐 것을 확인할 수 있다. 다른 패키지도 이런 방법으로 버전 관리를 할 수 있다.
