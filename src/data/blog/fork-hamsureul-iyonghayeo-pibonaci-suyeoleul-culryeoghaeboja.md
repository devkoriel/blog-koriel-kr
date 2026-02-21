---
title: fork() 함수를 이용하여 피보나치 수열을 출력해보자
author: Jinsoo Heo
pubDatetime: 2016-10-16T21:26:00.000Z
modDatetime: 2018-08-22T08:32:55.000Z
draft: false
tags:
  - c
description: Introduction  --------------------------------------------------------------------------------  언어를 공부할 때 항상 보는 예제들이 있는데, 그 중 하나가 피보나치 수열 출력 예제이다. 로직이 간단하고 반...
lang: ko
---

# Introduction

---

언어를 공부할 때 항상 보는 예제들이 있는데, 그 중 하나가 **피보나치 수열 출력** 예제이다. 로직이 간단하고 반복문을 활용하는 법을 익힐 수 있기 때문에 매번 등장하는 것 같다. 이번 포스트에선 `fork()` 함수와 `wait()` 함수에 대해 알아보고 그것들을 활용하여 간단하게 피보나치 수열 출력 예제를 풀어보겠다.

일단 피보나치 수열은 다음의 점화식으로 정의되는 수열이다.

`F₀ = 0, F₁ = 1, Fₙ₊₂ = Fₙ₊₁ + Fₙ`

이 피보나치 수열을 출력하는 로직은 아래에 있는 코드처럼 매우 간단하다. 하지만 이번 포스트에서의 중점은 피보나치 수열에 있는 것이 아니고 `fork()` 함수에 있다. `fork()` 함수를 이용하여 **자식 프로세스**를 분기로 따내고 그 프로세스에서 일련의 작업을 마친 후 다시 **부모 프로세스**로 넘어와 새로운 작업을 시작하는 방법을 알아 볼 것이다. 먼저 `fork()` 함수에 대해 알아보자.

```c
for(register int i = 1; i < arg - 1; i++) {
    fib_n = fib_0 + fib_1;
    fib_0 = fib_1;
    fib_1 = fib_n;
    printf(", %lld", fib_n);
}

```

  

# fork()

---

`fork()`는 현재 실행되는 프로세스의 복사본을 생성하는 함수이다. 참고로 프로세스는 Disk Storage(i.e., HDD, SSD.)에 저장되어 있던 프로그램이 메모리에 올려지고 OS의 스케쥴에 따라 실행되는 하나의 실행 단위이다.

- **Header:** `unistd.h`
- **Format:** `pid_t fork(void);`
- **Return:** 프로세스 생성에 실패하면 -1을, 성공 시 부모 프로세스엔 자식 프로세스 ID, 자식 프로세스엔 0을 반환

  

`fork()` 함수에 대한 설명은 [Wikipedia](https://en.wikipedia.org/ "Wikipedia")에도 잘 나와있다. Wikipedia에 올라와있는 `Hello World` 예제를 한번 살펴보자.

```c
int main(void)
{
   pid_t pid = fork();

   if (pid == -1) {
      perror("fork failed");
      exit(EXIT_FAILURE);
   } else if (pid == 0) {
      printf("Hello from the child process!\n");
      _exit(EXIT_SUCCESS);
   } else {
      int status;
      (void)waitpid(pid, &status, 0);
   }
   
   return EXIT_SUCCESS;
}

```

  

예제를 분석해보자.

```c
 pid_t pid = fork();

```

`main()` 함수의 첫 구문은 **fork system call**을 호출하여 프로세스의 실행을 두 갈래로 나누고 있다. `fork()` 함수의 반환형은 **POSIX** type의 `pid_t` 구조체로 변수 `pid`에 그 값이 들어간다.

```c
if (pid == -1) {
    perror("fork failed");
    exit(EXIT_FAILURE);
}

```

`pid`의 값이 -1이라는 것은 프로세스 생성에 실패했다는 뜻이다. 따라서 “fork failed”라는 오류 메시지를 출력하고 `exit()` 함수로 프로세스를 중단시키고 있다.

fork가 제대로 이루어져 프로세스가 성공적으로 생성되면, 프로세스가 두 갈래로 나누어짐과 동시에 `pid`값을 반환받은 지점부터 `main()` 함수가 다시 실행된다. 각각의 프로세스가 서로 다른 작업을 하길 원한다면, `fork()`의 반환값으로 프로그램에 분기점들을 만들어 주면 된다. 위쪽의 표에도 나와 있듯이, 프로세스 생성에 성공하면 `fork()`는 부모 프로세스엔 자식 프로세스 ID를, 자식 프로세스엔 0을 반환하기 때문이다. 지금 설명한 내용이 보통 아래와 같이 구현된다.

```c
// child process
else if (pid == 0) {
    printf("Hello from the child process!\n");
    _exit(EXIT_SUCCESS);
}

// parent process
else {
    int status;
    (void)waitpid(pid, &status, 0);
}

```

`fork()`가 성공적으로 호출되면 실행되고 있는 프로세스가 그대로 복사된 후, 두 개의 프로세스에서 `fork()`가 호출된 시점부터 다시 실행이 시작되기 때문에, 간단한 분기로도 부모 프로세스와 자식 프로세스의 작업을 나눌 수 있는 것이다.

부모 프로세스의 `waitpid()` 함수는 자식 프로세스가 종료될 때까지 기다리는 함수이다. 첫번째 인자 `pid`는 기다릴 자식 프로세스의 ID이고 두번째 인자 `status`는 기다린 자식 프로세스의 종료 상태를 받을 정수형 포인터이다. 호출이 끝나면 종료된 자식 프로세스의 ID를 반환한다.

> 자식 프로세스는 주의해서 종료하자
> 
> 자식 프로세스는 표준 C 라이브러리의 exit() 함수가 아니라 반드시 POSIX의 _exit() 함수로 종료해야 한다.

  

# wait()

---

Wikipedia의 예제에서 본 `waitpid()` 함수와는 다른 함수지만, 물론 그 쓰임새는 동일하다. 피보나치 수열 예제에서는 `wait()` 함수를 이용할 것이기 때문에 잠시 알아보자.

`wait()` 함수는 부모 프로세스 안에서 쓰이며, 실행되고 있는 자식 프로세스가 종료할 때까지 기다리는 역할을 한다. 반환형은 `pid_t` 구조체로 종료된 자식 프로세스의 ID이고 `waitpid()` 함수와는 다르게 `pid` 인자가 없다. `waitpid()`에서는 기다릴 자식 프로세스의 ID를 명시적으로 알려주었지만 `wait()`에서는 암시적으로 자식 프로세스의 ID를 파악한다.

- **Header:** `wait.h`
- **Format:** `pid_t wait(int *status);`
- **Parameters:** `int status`: 종료된 자식 프로세스의 상태
- **Return:** `pid_t`: 종료된 자식 프로세스의 ID

  

# 피보나치 출력 예제

---

다음은 시스템 인자로부터 출력하고 싶은 피보나치 수의 개수를 입력받아 그 만큼의 피보나치 수열을 출력하는 예제이다. 설명은 코드의 주석을 참고.

### 1. 컴파일

---

```bash
$ gcc fibonacci.c -o fibonacci

```

  

### 2. 실행

---

```bash
$ ./fibonacci 5 # 최초 5개의 피보나치 수 출력

```

  

### 3. 실행 결과

---

```bash
# 실행 결과
Parent is waiting for the child to complete.
Child forked.
0, 1, 1, 2, 3
Child ended.
Ended child process id is 16393
Child process ended successfully. Status: 0

```
