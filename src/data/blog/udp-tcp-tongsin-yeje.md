---
title: UDP, TCP 통신 예제
author: Jinsoo Heo
pubDatetime: 2016-10-15T21:03:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - linux
  - tcp
  - udp
description: Introduction  --------------------------------------------------------------------------------  우리는 지금도 인터넷을 사용하고 있고 그 인터넷이라는 건 끊임없는 Client와 Server 사이의 통신으로 ...
lang: ko
---

# Introduction

---

우리는 지금도 인터넷을 사용하고 있고 그 인터넷이라는 건 끊임없는 **Client**와 **Server** 사이의 통신으로 이루어진다. 프로토콜이라는 말을 들어본 적이 있을 것이다. 대충 통신 규약이라는 말로 통하는데 쉽게 풀어 설명하면, 통신을 할 때 서로 말을 알아 들을 수 있도록 미리 정해놓은 약속이라고 할 수 있다. 예를 들어, 멀리 떨어져 있는 두 사람이 신속한 대화를 위해서 일종의 은어나 수신호를 만든다면, 그것이 바로 **프로토콜**이다. 실제 네트워크에서 쓰는 프로토콜은 훨씬 복잡하고 종류도 많지만 말이다.

실제로 우리가 인터넷을 사용할 땐, 굉장히 여러가지의 프로토콜을 통해 서버와 통신하게 된다. 이때 우리가 보내고 받는 정보(_컴퓨터 네트워크에서는 패킷이라고 부른다._)는 한번에 목적지로 가는 것이 아니고 여러 계층을 통과해 목적지에 도달하게 된다. 이 계층을 보통 인터넷 5계층(Five-layer Internet protocol stack)이나 OSI 7계층(Seven-layer ISO OSI reference model)이라 한다.

![osi-seven-layer](https://blog.koriel.kr/content/images/2017/10/osi-seven-layer.png)

이렇게 어떤 정보가 프로토콜과 계층을 통해 목적지까지 도달하는 일련의 과정을 **공항 수속 과정**에 비유하면 이해하기가 쉽다. 사람이 비행기를 타고 미국에 가기 위해선 다음의 과정을 꼭 거쳐야 한다.

출발

방향

방향

도착

단계

티켓 (구입)

↓

↑

티켓 (확인)

티켓

수하물 (체크인)

↓

↑

수하물 (찾기)

수하물

게이트 (짐 싣기)

↓

↑

게이트 (짐 내리기)

게이트

이륙

↘

↗

착륙

이착륙

비행

비행

비행

비행

비행

사람은 정보(패킷)에, 각 단계는 계층에 비유할 수 있다. 그리고 이때 각 단계의 직원들이 서로 소통하는 방식을 프로토콜이라 할 수 있다. 여기서 중요한 것은, 수하물을 담당하는 직원이 게이트에서 짐을 싣고 내리는 직원이나 비행기를 조종하는 파일럿과는 서로 소통하지 않는다는 것이다. 수하물 담당 직원은 문제가 생기면 상대 공항의 수하물 담당 직원과 이야기를 한다. 다른 단계의 직원들도 마찬가지이다. 이렇게 단계를 분리해놓고 각 단계의 역할을 명확히 함으로써 일의 진행을 원활하게 하고 승객을 안전하게 목적지까지 운송할 수 있는 것이다. 실제 컴퓨터 네트워크에서도 이런 과정을 통해 패킷을 주고 받게 된다. 그 중 우리가 살펴볼 예제의 **UDP**, **TCP**는 **Transport Layer**의 프로토콜이다.

이번 포스트에서는 UDP, TCP에 대한 자세한 설명은 생략하고 C로 Server와 Client를 직접 구현하여 귀여운 강아지 사진을 실제로 전송해보는 작업을 할 것이다.

  

# Source

---

예제는 [Github](https://github.com/devkoriel/socket.udp-tcp.test)에 공유해두고 있다. 아래 명령어로 다운로드 받을 수 있다.

```shell
$ git clone https://github.com/DanielHeo94/socket.udp-tcp.test.git
$ cd socket.udp-tcp.test/

```

> git이 설치되어 있지 않다면?
> 
> git이 설치되어 있지 않다면, $ sudo apt-get install git 명령어로 설치하자.

  

# UDP

---

### 1\. server.c

  

### 2\. client.c

> 전체 소스를 다운로드 받으세요
> 
> 전체 소스는 server.c와 client.c, **그 이외**의 파일로 이루어져 있습니다. 다운로드 받은 소스의 경우 따로 코딩할 부분은 없습니다.

  

### 3\. Application

Server와 Client를 각각 다른 터미널에서 실행하여야 하기 때문에, 두 개의 터미널을 열어야 합니다.

```shell
# 1번 터미널 (Server)

$ cd socket.udp-tcp.test/UDP
$ make
$ ./s 9999 # 포트 넘버

```

![------2016-10-09-19-09-19](https://blog.koriel.kr/content/images/2017/10/------2016-10-09-19-09-19.png)

```shell
# 2번 터미널 (Client)

$ ./c 127.0.0.1 9999 # localhost ip, 포트 넘버

```

![------2016-10-09-19-08-31](https://blog.koriel.kr/content/images/2017/10/------2016-10-09-19-08-31.png)

디렉토리에 있던 귀여운 강아지 사진 `src.jpg`가 전송되어 `dst.jpg`가 생성된 것을 볼 수 있다.

  

# TCP

---

### 1\. server.c

  

### 2\. client.c

> 전체 소스를 다운로드 받으세요
> 
> 전체 소스는 server.c와 client.c, **그 이외**의 파일로 이루어져 있습니다. 다운로드 받은 소스의 경우 따로 코딩할 부분은 없습니다.

  

### 3\. Application

Server와 Client를 각각 다른 터미널에서 실행하여야 하기 때문에, 두 개의 터미널을 열어야 합니다.

```shell
# 1번 터미널 (Server)

$ cd socket.udp-tcp.test/TCP
$ make
$ ./s 9999 # 포트 넘버

```

![------2016-10-09-19-11-05](https://blog.koriel.kr/content/images/2017/10/------2016-10-09-19-11-05.png)

```shell
# 2번 터미널 (Client)

$ ./c 127.0.0.1 9999 # localhost ip, 포트 넘버

```

![------2016-10-09-19-11-08](https://blog.koriel.kr/content/images/2017/10/------2016-10-09-19-11-08.png)

디렉토리에 있던 귀여운 강아지 사진 `src.jpg`가 전송되어 `dst.jpg`가 생성된 것을 볼 수 있다.

  

# 함수 설명

---

### a. socket()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int socket(int domain, int type, int protocol);

Parameters

int domain: 인터넷을 통해 통신할 지, 같은 시스템 내에서 프로세스 끼리 통신할 지의 여부를 설정합니다. int type: 데이터의 전송 형태를 지정하며 아래와 같은 값을 사용할 수 있습니다. int protocol: 통신에 있어 특정 프로토콜을 사용을 지정하기 위한 변수이며, 보통 0 값을 사용합니다.

Return

\-1 이외: Socket Descriptor -1: Fail

> Socket을 생성하여 반환합니다.

### b. memset()

Header

#include <string.h>

Format

void \*memset(void \*s, int c, size\_t n);

Parameters

void \*ptr: 메모리의 크기를 변경할 포인터 int c: 초기화 값 size\_t size: 초기화 길이

Return

void \*: s에 대한 포인터를 반환하며 실패하면 NULL을 반환한다.

> malloc() 이나 calloc() 에서 할당 받은 메모리를 특정 값으로 초기화합니다. 보통 어떤 작업을 하기 전에 NULL로 초기화할 때 많이 사용합니다. 데이터를 읽어 들이거나 어떤 함수를 호출 후 메모리에 입력된 값을 처리하는 경우 미리 메모리를 초기화를 하는 것이 디버깅에 유리합니다.

### c. bind()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int bind(int sockfd, struct sockaddr \*myaddr, socklen\_t addrlen);

Parameters

int sockfd: 소켓 디스크립터 struct sockaddr \*myaddr: 주소 정보로 인터넷을 이용하는 AF\_INET인지 시스템 내에서 통신하는 AF\_UNIX에 따라서 달라집니다. 인터넷을 통해 통신하는 AF\_INET인 경우에는 struct sockaddr\_in을 사용합니다. socklen\_t addrlen: myadd 구조체의 크기

Return

0: Success. -1: Fail.

> Socket에 IP주소와 포트번호를 지정해 줍니다. 이로서 소켓을 통신에 사용할 수 있도록 준비가 됩니다.

### d. close()

Header

#include <unistd.h>

Format

int close(int s);

Parameters

int s: Socket Descriptor

Return

0: Success. -1: Fail.

> Socket을 닫습니다.

### e. recvfrom()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int recvfrom(int s, void \*buf, size\_t len, int flags, struct sockaddr \*from, socklen\_t \*fromlen);

Parameters

int s: Socket Descriptor void \*buf: 자료 수신을 위한 버퍼 포인터 size\_t len: 버퍼의 바이트 단위 길이 int flags: 수신을 위한 옵션 sockaddr \*to: 전송한 곳의 주소 정보 socklen\_t tolen: 전송한 곳의 주소 정보의 크기

Return

\-1 이외: 실제로 수신한 바이트 수. -1: Fail.

> UDP/IP 통신에서 소켓으로부터 데이터를 수신합니다.

### f. sendto()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int sendto(int s, const void \*msg, size\_t len, int flags, const struct sockaddr \*to, socklen\_t tolen);

Parameters

int s: Socket Descriptor void \*msg: 전송할 메시지 size\_t len: 버퍼의 바이트 단위 길이 int flags: 전송을 위한 옵션 sockaddr \*to: 목적지 주소 정보 socklen\_t tolen: 목적지 주소 정보의 크기

Return

\-1 이외: 실제로 전송한 바이트 수. -1: Fail.

> UDP/IP 통신에서 소켓으로 데이터를 전송합니다.

### g. listen()

Header

#include <sys/socket.h>

Format

int listen(int s, int backlog);

Parameters

int s: Socket Descriptor int backlog: 대기 메시지 큐의 개수

Return

0: Success. -1: Fail.

> 소켓을 통해 클라이언트의 접속 요청을 기다리도록 설정합니다.

### h. accept()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int accept(int s, struct sockaddr \*addr, socklen\_t \*addrlen);

Parameters

int s: Socket Descriptor struct sockaddr \*addr: 클라이언트 주소 정보를 가지고 있는 포인터 socklen\_t addrlen: struct sockaddr \*addr 포인터가 가르키는 구조체의 크기

Return

\-1 이외: 새로운 Socket Descriptor. -1: Fail.

> 클라이언트의 접속 요청을 받아드리고 클라이언트와 통신하는 전용 소켓을 생성합니다.

### i. read()

Header

#include <unistd.h>

Format

ssize\_t read (int s, void \*buf, size\_t nbytes);

Parameters

int s: Socket Descriptor void \*buf: 소켓에서 데이터를 읽어들일 버퍼 size\_t nbytes: 버퍼의 크기

Return

\-1 이외: 읽어들인 바이트 수. -1: Fail.

> 소켓의 데이터를 읽어들입니다.

### j. connect()

Header

#include <sys/types.h>  
#include <sys/socket.h>

Format

int connect(int sockfd, const struct sockaddr \*serv\_addr, socklen\_t addrlen);

Parameters

int sockfd: Socket Descriptor struct sockaddr \*serv\_addr: 서버 주소 정보에 대한 포인터 socklen\_t addrlen: struct sockaddr \*serv\_addr 포인터가 가르키는 구조체의 크기

Return

0: Success. -1: Fail.

> 생성한 소켓을 통해 서버로 접속을 요청합니다.

### k. write()

Header

#include <unistd.h>

Format

ssize\_t write (int s, const void \*buf, size\_t n)

Parameters

int s: Socket Descriptor void \*buf: 소켓에 쓸 데이터를 담을 버퍼 size\_t n: 버퍼의 크기

Return

\-1 이외: 쓴 데이터의 바이트 수. -1: Fail.

> 소켓에 데이터를 씁니다.
