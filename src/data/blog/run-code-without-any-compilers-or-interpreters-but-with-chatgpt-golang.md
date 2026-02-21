---
title: Run code without any compilers or interpreters, but with ChatGPT (Golang)
author: Jinsoo Heo
pubDatetime: 2023-03-09T17:47:15.000Z
modDatetime: 2023-03-09T17:48:37.000Z
draft: false
tags:
  - chatgpt
  - golang
  - go
  - prompt-engineering
ogImage: "https://images.unsplash.com/photo-1675865254433-6ba341f0f00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEzfHxjaGF0Z3B0fGVufDB8fHx8MTY3ODM4MDMxNg&ixlib=rb-4.0.3&q=80&w=2000"
description: "Prompt  I asked my ChatGPT Slack Bot to analyze and explain some golang code like below.  @ChatGPT Please analyze and explain following code:  package main  ..."
lang: en
---

## Prompt

I asked my ChatGPT Slack Bot to analyze and explain some golang code like below.

> @ChatGPT Please analyze and explain following code:

```go
package main

import "fmt"

func zeroval(ival int) {
    ival = 0
}

func zeroptr(iptr *int) {
    *iptr = 0
}

func main() {
    i := 1
    fmt.Println("initial:", i)

    zeroval(i)
    fmt.Println("zeroval:", i)

    zeroptr(&i)
    fmt.Println("zeroptr:", i)

    fmt.Println("pointer:", &i)
}
```

## Answer

This is a Go programming language code that defines two functions, `zeroval` and `zeroptr`, and a `main` function.The `zeroval` function takes an integer argument `ival` by value and sets it to 0. However, since the argument is passed by value, the original value of `i` in the `main` function is not affected.The `zeroptr` function takes an integer pointer argument `iptr` and sets the value pointed to by `iptr` to 0. This function modifies the value of `i` in the `main` function because it is passed a pointer to the memory location of `i`.In the `main` function, an integer variable `i` is initialized to 1. The `zeroval` function is called with `i` as an argument, which sets a copy of `i` to 0 but does not affect the original value of `i`. The `zeroptr` function is then called with the address of `i` as an argument, which modifies the value of `i` to 0. Finally, the memory address of `i` is printed to the console.Overall, this code demonstrates the difference between passing arguments by value and by reference in Go.

## Prompt

> @ChatGPT What's the execution result of the code?

## Answer

> The execution result of the code is:

```shell
initial: 1
zeroval: 1
zeroptr: 0
pointer: 0xVALUE
```

> The `initial` value of `i` is 1. After calling the `zeroval` function, the value of `i` remains 1 because the function only modifies a copy of the value. After calling the `zeroptr` function, the value of `i` is changed to 0 because the function modifies the value at the memory address pointed to by the pointer. Finally, the memory address of `i` is printed to the console.

## Auctual Answer

[Go by Example: Pointers](https://gobyexample.com/pointers)

## Full Evidence

![](/images/blog/Screenshot-2023-03-10-at-2.46.07-AM.webp)

![](/images/blog/Screenshot-2023-03-10-at-2.46.32-AM.webp)
