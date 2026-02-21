---
title: Pintos 설치하기
author: Jinsoo Heo
pubDatetime: 2016-09-19T19:16:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - pintos
  - development
description: "Introduction  --------------------------------------------------------------------------------   * Pintos란?      Pintos는 미국 스탠포드 대학교에서 CS140 : Operating Syst..."
lang: ko
---

# Introduction

---

-   ### Pintos란?
    

**Pintos**는 미국 스탠포드 대학교에서 CS140 : Operating Systems 수업을 위해 만든 **교육용 운영체제**입니다. 국내 많은 대학에서도 운영체제 수업에서 Pintos를 활용하고 있습니다. 교육용인 만큼 학생들이 커널이나 프로그램을 쉽게 짜볼 순 있지만, 실제 사용 환경에서 쓰는 운영체제는 아닙니다.

Pintos는 80x86 아키텍쳐 위에서 돌아가는 아주 간단한 운영체제 프레임워크입니다. 현재는 커널 스레드와 사용자 프로그램, 파일 시스템을 지원하고 있고 사용자가 이러한 것들을 직접 간단하게 구현해볼 수도 있습니다. 또 팀을 꾸려 위에 소개된 3가지 영역을 강화하여 지원할 수 있고 가상 메모리도 구현하여 추가할 수 있습니다.

Pintos는 이론적으론, 보통의 IBM-호환 PC 위에서 모두 작동합니다. 하지만 보통 리눅스 환경에서 **Bochs**나 **Qemu**같은 시뮬레이터 위에서 돌리게 됩니다. 프로젝트 사이트에선 VMware Player로도 테스트되었다고 소개하고 있습니다.

  

-   ### 왜 Linux를 사용하지 않지?
    

사실 **Linux** 커널책부터 보며 공부해도 상관은 없습니다. 다만 직접 구현한 것들을 올려 컴파일하고 구동하기까지의 시간이 어마어마하게 걸릴 뿐이죠. 처음 리누스 토발즈가 리눅스 커널을 개발했을 땐, 전체 코드 라인이 10,000줄 정도로 얼마 되지 않았습니다. 하지만 지금 [리눅스 커널 깃허브 저장소](https://github.com/torvalds/linux)에 가보면, 커밋은 617,878 commits을 넘어섰고 코드 라인은 대략 1,000,000라인이 넘어갑니다. 해당 저장소를 Watching하고 있으면 보이지만, 지금 이 시간에도 리누스 토발즈는 계속해서 Push를 하고 있습니다. 참 대단한 사람… 현재 리눅스 커널을 보통 사용하는 개인 PC로 컴파일하면 약 30분이 걸립니다. 과제하며 디버깅하고 컴파일하기엔 무리가 있는 시간이죠.

이러한 이유로 수업에서 사용할 교육용 운영체제로 리눅스는 적합하지 않습니다. 개인 프로젝트로 사용하는 것이면 몰라도요. 본인이 가지고 있는 컴퓨터가 엄청난 컴퓨팅 파워를 자랑한다면, 리눅스로 수업을 따라가는 것도 나쁘진 않을 것으로 보입니다.

  

# How to Install Pintos

---

### 1. Pintos 환경 설정

##### 1.1 컴파일러 설치하기 (e.g., gcc, g++)

`gcc`와 `g++`은 리눅스에서 사용하는 컴파일러입니다. `gcc`은 C 코드를, `g++`은 C++ 코드를 컴파일 할 수 있습니다.

`gcc`와 `g++`을 설치하기 위해선 아래 명령어를 터미널에서 입력하면 됩니다.

```shell
$ sudo apt-get update
$ sudo apt-get install g++
$ sudo apt-get install gcc-4.4
$ sudo mv /<user-name>/bin/gcc-4.4 /<user-name>/bin/gcc

```

> gcc-4.4가 설치되지 않는다면?
> 
> gcc-4.4가 Ubuntu Source Repository에 등록되어 있지 않아 설치가 되지 않는다면, [여기](/posts/gcc-gpp-version-management)를 참조하세요.

> 코드를 사용자화 하세요
> 
> <user-name>을 모르겠다면, 터미널에 whoami를 입력하세요.

  

##### 1.2 Bochs 설치하기

리눅스 환경에서 Pintos를 구동하려면 시뮬레이터를 설치해야 합니다. Pintos 프로젝트 홈페이지에선 Bochs와 Qemu를 추천하고 있습니다. 이 포스트에선 Bochs를 기준으로 설명하겠습니다.

Bochs를 설치하고 환경을 설치하기 위해선 아래 명령어를 터미널에서 입력하면 됩니다.

```shell
$ sudo apt-get install wget
$ wget https://sourceforge.net/projects/bochs/files/bochs/2.6.2/bochs-2.6.2.tar.gz/download
$ tar xvzf download

$ cd ./bochs-2.6.2

$ ./configure --enable-gdb-stub --with-nogui
$ make
$ sudo make install

```

  

##### 1.3 Pintos 설치하고 환경 설정하기

Pintos를 설치하기 위해선 아래의 명령어를 터미널에서 입력하면 됩니다.

```shell
$ cd /home/<user-name>
$ wget http://www.stanford.edu/class/cs140/projects/pintos/pintos.tar.gz
$ tar xvzf pintos.tar.gz

```

환경 설정을 위해 아래 명령어를 터미널에서 입력하고 편집기 창이 열리면 마지막 라인에 `export PATH="$PATH:/home/<user-name>/pintos/src/utils"`을 추가합니다.

```shell
$ gedit ~/.bashrc

```

설정을 적용하기 위해 아래 명령어를 터미널에서 입력합니다.

```shell
$ source ~/.bashrc
$ cd /home/<user-name>/pintos/src/utils
$ make

```

  

### 2. Pintos 코드 컴파일

Pintos의 코드를 컴파일하기 위해선 아래의 명령어를 터미널에서 입력합니다.

```shell
$ cd /home/<user-name>/pintos/src/threads
$ make

```

마치고 나면, `build` 디렉토리가 생성됩니다.

  

### 3. Pintos 코드 검증

##### 3.1 모든 테스트 스레드 한번에 검증하기

Pintos엔 27개의 테스트 스레드가 있고 사용자가 이것들을 모두 돌려볼 수 있습니다.

코드를 검증해보기 위해 아래 명령어를 터미널에서 입력합니다.

```shell
$ cd /home/<user-name>/pintos/src/threads/build
$ make check

```

마치고 나면 아래의 결과가 터미널에 나타납니다.

```shell
pass tests/threads/alarm-single
pass tests/threads/alarm-multiple
pass tests/threads/alarm-simultaneous
FAIL tests/threads/alarm-priority
pass tests/threads/alarm-zero
pass tests/threads/alarm-negative
FAIL tests/threads/priority-change
FAIL tests/threads/priority-donate-one
FAIL tests/threads/priority-donate-multiple
FAIL tests/threads/priority-donate-multiple2
FAIL tests/threads/priority-donate-nest
FAIL tests/threads/priority-donate-sema
FAIL tests/threads/priority-donate-lower
FAIL tests/threads/priority-fifo
FAIL tests/threads/priority-preempt
FAIL tests/threads/priority-sema
FAIL tests/threads/priority-condvar
FAIL tests/threads/priority-donate-chain
FAIL tests/threads/mlfqs-load-1
FAIL tests/threads/mlfqs-load-60
FAIL tests/threads/mlfqs-load-avg
FAIL tests/threads/mlfqs-recent-1
pass tests/threads/mlfqs-fair-2
pass tests/threads/mlfqs-fair-20
FAIL tests/threads/mlfqs-nice-2
FAIL tests/threads/mlfqs-nice-10
FAIL tests/threads/mlfqs-block
20 of 27 tests failed.
../../tests/Make.tests:26: 'check' 타겟에 대한 명령이 실패했습니다
make: *** [check] 오류 1

```

27개의 테스트 스레드중 7개가 성공적으로 컴파일되었다는 뜻입니다. 위의 과정을 잘 따라 Pintos를 설치했다면 7개의 테스트 스레드는 사용자가 직접 구현하지 않아도 컴파일 잘 됩니다. 그렇지 않다면 `gcc` 버전을 `gcc-4.4`로 바꿔보시기 바랍니다.

  

##### 3.2 특정 테스트 스레드 직접 검증하기

특정 테스트 스레드를 검증하기 위해선 아래 명령어를 터미널에서 입력합니다.

```shell
$ cd /home/<user-name>/pintos/src/threads/build
$ pintos -q run <test-name>

```

> pintos의 옵션을 잘 활용하세요
> 
> **-q** 옵션은 실행이 끝나면 해당 테스크를 kill하겠다는 의미를 가지고 있습니다. 이 옵션을 입력하지 않으면 실행이 끝나도 메모리에 테스크가 계속 남아있습니다.

> 코드를 사용자화 하세요
> 
> <test-name>은 alarm-multiple, priority-sema, priority-donate-one중에서 하나를 선택하세요.

테스트가 성공적으로 마쳐졌다면, 아래와 같은 결과가 터미널에 나타납니다.

```shell
Use of literal control characters in variable names is deprecated at /home/daniel/pintos/src/utils/pintos line 911.
Prototype mismatch: sub main::SIGVTALRM () vs none at /home/daniel/pintos/src/utils/pintos line 935.
Constant subroutine SIGVTALRM redefined at /home/daniel/pintos/src/utils/pintos line 927.
squish-pty bochs -q
========================================================================
                       Bochs x86 Emulator 2.6.2
                Built from SVN snapshot on May 26, 2013
                  Compiled on Sep 19 2016 at 01:05:16
========================================================================
00000000000i[     ] reading configuration from bochsrc.txt
00000000000e[     ] bochsrc.txt:8: 'user_shortcut' will be replaced by new 'keyboard' option.
00000000000i[     ] installing nogui module as the Bochs GUI
00000000000i[     ] using log file bochsout.txt
PiLo hda1
Loading........
Kernel command line: -q run alarm-multiple
Pintos booting with 4,096 kB RAM...
383 pages available in kernel pool.
383 pages available in user pool.
Calibrating timer...  204,600 loops/s.
Boot complete.
Executing 'alarm-multiple':
(alarm-multiple) begin
(alarm-multiple) Creating 5 threads to sleep 7 times each.
(alarm-multiple) Thread 0 sleeps 10 ticks each time,
(alarm-multiple) thread 1 sleeps 20 ticks each time, and so on.
(alarm-multiple) If successful, product of iteration count and
(alarm-multiple) sleep duration will appear in nondescending order.
(alarm-multiple) thread 0: duration=10, iteration=1, product=10
(alarm-multiple) thread 0: duration=10, iteration=2, product=20
(alarm-multiple) thread 1: duration=20, iteration=1, product=20
(alarm-multiple) thread 0: duration=10, iteration=3, product=30
(alarm-multiple) thread 2: duration=30, iteration=1, product=30
(alarm-multiple) thread 0: duration=10, iteration=4, product=40
(alarm-multiple) thread 1: duration=20, iteration=2, product=40
(alarm-multiple) thread 3: duration=40, iteration=1, product=40
(alarm-multiple) thread 4: duration=50, iteration=1, product=50
(alarm-multiple) thread 0: duration=10, iteration=5, product=50
(alarm-multiple) thread 0: duration=10, iteration=6, product=60
(alarm-multiple) thread 1: duration=20, iteration=3, product=60
(alarm-multiple) thread 2: duration=30, iteration=2, product=60
(alarm-multiple) thread 0: duration=10, iteration=7, product=70
(alarm-multiple) thread 3: duration=40, iteration=2, product=80
(alarm-multiple) thread 1: duration=20, iteration=4, product=80
(alarm-multiple) thread 2: duration=30, iteration=3, product=90
(alarm-multiple) thread 1: duration=20, iteration=5, product=100
(alarm-multiple) thread 4: duration=50, iteration=2, product=100
(alarm-multiple) thread 1: duration=20, iteration=6, product=120
(alarm-multiple) thread 2: duration=30, iteration=4, product=120
(alarm-multiple) thread 3: duration=40, iteration=3, product=120
(alarm-multiple) thread 1: duration=20, iteration=7, product=140
(alarm-multiple) thread 4: duration=50, iteration=3, product=150
(alarm-multiple) thread 2: duration=30, iteration=5, product=150
(alarm-multiple) thread 3: duration=40, iteration=4, product=160
(alarm-multiple) thread 2: duration=30, iteration=6, product=180
(alarm-multiple) thread 3: duration=40, iteration=5, product=200
(alarm-multiple) thread 4: duration=50, iteration=4, product=200
(alarm-multiple) thread 2: duration=30, iteration=7, product=210
(alarm-multiple) thread 3: duration=40, iteration=6, product=240
(alarm-multiple) thread 4: duration=50, iteration=5, product=250
(alarm-multiple) thread 3: duration=40, iteration=7, product=280
(alarm-multiple) thread 4: duration=50, iteration=6, product=300
(alarm-multiple) thread 4: duration=50, iteration=7, product=350
(alarm-multiple) end
Execution of 'alarm-multiple' complete.
Timer: 928 ticks
Thread: 0 idle ticks, 931 kernel ticks, 0 user ticks
Console: 2950 characters output
Keyboard: 0 keys pressed
Powering off...
========================================================================
Bochs is exiting with the following message:
[UNMP ] Shutdown port: shutdown requested
========================================================================

```

이 과정을 모두 마쳤다면, Pintos가 성공적으로 설치된 것입니다.
