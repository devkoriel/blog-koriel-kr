---
title: AWS Lightsail로 Ghost 블로그 운영하기 - 1
author: Jinsoo Heo
pubDatetime: 2018-06-13T07:09:00.000Z
modDatetime: 2023-03-18T18:38:12.000Z
draft: false
ogImage: "https://images.unsplash.com/photo-1452065656801-6c60b6e7cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNhaWx8ZW58MHx8fHwxNjc5MTY0Njg3&ixlib=rb-4.0.3&q=80&w=2000"
description: 홈페이지와 블로그를 AWS EC2 + RDS로 운영을 했었는데 매달 나오는 비용을 보고 이게 얼마나 어리석은 짓이었는 지 알게 됐다. 정확히 얼마가 청구됐는 지는 창피해서 공개하지 못하고... 쨋든 개인 웹 사이트 운영비치고는 굉장히 많이 나왔다. 시험 기간을 맞이해서 홈페이지는 ...
lang: ko
---

홈페이지와 블로그를 AWS EC2 + RDS로 운영을 했었는데 매달 나오는 비용을 보고 이게 얼마나 어리석은 짓이었는 지 알게 됐다. 정확히 얼마가 청구됐는 지는 창피해서 공개하지 못하고... 쨋든 개인 웹 사이트 운영비치고는 굉장히 많이 나왔다. 시험 기간을 맞이해서 홈페이지는 GitHub Pages로 옮기고 블로그는 조금 더 저렴한 서비스로 옮기기로 했다. 시험 기간엔 시험 공부 아니면 다 재밌다. 진작 할 걸...

홈페이지는 전부 정적인 페이지라 그대로 GitHub repo에 올리면 되어서 문제가 없는데 블로그는 Ghost로 운영하고 있어서 GitHub Pages로 옮기기엔 어려움이 있다. 물론 안되는 건 아니다. Buster라는 걸 이용해서 Ghost 리소스들을 전부 static file로 바꾸어서 GitHub repo에 올리면 되긴 하는데, 이 과정에서 UI가 어그러지는 곳도 있고... 말끔하진 않다. 그래도 완전 공짜로 가능하니 메리트가 있긴 한데 한번 해보고 싶다면 이 링크를 타고 가서 해보시길. [https://github.com/paladini/ghost-on-github-pages](https://github.com/paladini/ghost-on-github-pages). 그런 이유로 어쨋든 서버를 쓰긴 써야 하는데 EC2는 관리도 귀찮고 비용도 커지고 RDS도 따로 붙여야 하기 때문에 조금 더 쓰고 쉽고 깔끔한 걸 찾고 있었는데, 열심히 구글링 하던 도중 AWS Lightsail이 눈에 들어왔다. 로고도 마음에 들고 ㅎㅎ. AWS Elastic Beanstalk도 있긴 한데 이건 정해진 탬플릿 안에서 앱을 배포하는 거기 때문에 Ghost를 올리기 전에 또 귀찮은 몇번의 과정을 해줘야 하기 때문에 스킵.

AWS Lightsail은 클릭 몇번으로 자신만의 서버를 바로 운영할 수 있는 서비스이다. 거기다 월별 요금으로 구분되어 있어 EC2나 RDS를 묶어서 사용할 때 처럼 비용 걱정을 하지 않아도 되고, Network metrics도 그냥 간단하게 확인 가능. 진짜 클릭 몇번만 하면 자질구레한 설정 필요없이 바로 완성된 구성과 함께 서버를 사용할 수 있다. EC2랑은 조금 다른게, EC2는 인스턴스를 생성하고 난 다음에 Security Group, ACL, Elastic IP, Key pair 등등 이런 걸 다 직접 설정해줘야 한다. 안해도 되는데 안하면 안하는 대로 문제가 또 생긴다. 근데 Lightsail은 그런 것들을 전부 Wrap해서 Wrapper로써 서비스되는 것이다. 제일 매력적이었던 것은 가격. 월별 요금을 선택해서 이용하면 딱 그 정도만 청구된다. 제일 저렴한 게 $5/month 였는데 이 정도면 개인 블로그 운영하면서 충분히 지불할만 하다.

## 1. AWS Lightsail 인스턴스 생성

![Screen-Shot-2018-06-14-at-6.20.10-PM](/images/blog/Screen-Shot-2018-06-14-at-6.20.10-PM.webp)

AWS Lightsail에 들어가면 위와 같은 화면이 보이는데 처음 들어가면 아무것도 안보이고 인스턴스 생성 버튼만 있다. 나는 이미 이 글을 쓰는 인스턴스를 하나 생성했기 때문에 목록에 하나가 보인다. 쨋든 **인스턴스 생성**(**Create instance**)을 누르자.

![Create-an-instance---Lightsail-3](/images/blog/Create-an-instance---Lightsail-3.webp)

**Location: Seoul**  
**Platform: Linux/Unix**  
**Blueprint: OS Only + Ubuntu**  
**Plan: $5/month**

으로 설정하고 생성(Create)를 누르면 인스턴스 생성이 끝난다.

## 2. Static IP 붙이기

인스턴스 생성이 끝나면 목록에 생성한 인스턴스가 보이는데 그것을 클릭해서 들어가면 관리할 수 있는 페이지가 나타난다. 거기서 **Networking 탭**을 눌러서 이동하자.

![networking](/images/blog/networking.webp)

**IP addresses > Public IP** 부분에 보면 밑에 `Create static IP`라는 버튼이 보인다. 지금 보이는 IP는 바로 접근이 가능한 Public IP인데 인스턴스를 중지했다가 다시 시작하면 바뀐다. 따라서 static IP를 하나 생성해서 인스턴스에 붙여야한다. static IP는 인스턴스를 내렸다 올려도 바뀌지 않는다. EC2 쓸 때 많이 봤던 Elastic IP. `Create static IP` 버튼을 누르고 잇따라 나오는 페이지에서도 그냥 또 `Create`를 누르면 바로 static IP가 생성되고 생성한 인스턴스에 붙는다.

![Screen-Shot-2018-06-13-at-3.47.58-PM](/images/blog/Screen-Shot-2018-06-13-at-3.47.58-PM.webp)

인스턴스에 붙어있는 동안엔 공짜다. 야호.

## 3. HTTPS port 허용

Nginx를 설치하고 SSL을 설정하려면 443 포트가 열려있어야 한다.

![Screen-Shot-2018-06-14-at-6.28.08-PM](/images/blog/Screen-Shot-2018-06-14-at-6.28.08-PM.webp)

**Firewall > Add another**을 누르면 새롭게 허용할 포트를 추가할 수 있다. 거기서 드롭 다운 메뉴를 눌러 **HTTPS**를 선택한 다음 **Save**를 누르면 바로 저장이 되고 해당 포트가 허용된다.

## 4. SSH 접근

상단바의 **Account > Account**를 눌러서 계정 관리 페이지로 넘어가자.

![Screen-Shot-2018-06-14-at-6.22.49-PM](/images/blog/Screen-Shot-2018-06-14-at-6.22.49-PM.webp)

![Screen-Shot-2018-06-14-at-6.31.05-PM](/images/blog/Screen-Shot-2018-06-14-at-6.31.05-PM.webp)

넘어가서 SSH keys을 누르면 SSH 접근에 필요한 private key를 다운로드 받을 수 있다. 인스턴스를 서울 리전에서 생성했으므로 서울에 해당하는 key pair를 다운로드 받자. 가능하면 `~/.ssh` 경로에 다운로드.

다운로드를 다 받으면 터미널을 켜서 아래 명령어로 권한을 수정하고 SSH로 생성한 인스턴스 서버에 접속해보자.

```bash
$ chmod 600 [pem file]
$ ssh -i [pem file] ubuntu@[static ip]

```

아래와 같이 뜨면 성공적으로 서버에 접속한 것이다.

```bash
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-1052-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

0 packages can be updated.
0 updates are security updates.


*** System restart required ***
Last login: Thu Jun 14 08:40:21 2018 from 175.209.190.60
ubuntu@ip-172-26-0-18:~$

```

## 5. DNS 설정

블로그에 사용할 도메인이 없다면 하나 사자. [https://kr.godaddy.com](https://kr.godaddy.com). static IP로도 접속할 수 있긴 하지만 SSL 인증서를 발급받지 못할 뿐더러 그 주소 직접 치고 접속할 사람 아무도 없다.

도메인을 구입하면 GoDaddy에서 바로 A 레코드 설정이 가능하다. A 레코드에 위에서 설정한 static IP를 넣으면 된다. 설정법은 여길 보자. [https://kr.godaddy.com/help/point-your-domain-name-to-a-server-19116](https://kr.godaddy.com/help/point-your-domain-name-to-a-server-19116).

GoDaddy에서 도메인을 구입하고 시간이 조금 지나면 소유권 자체를 다른 곳으로 이전할 수 있는데 나는 AWS Route 53으로 다 옮겨놨다. 한 군데에서 다 관리하는 것이 편하기 때문에... 만약 이미 Route 53으로 관리하고 있다면 [https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/resource-record-sets-creating.html](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/resource-record-sets-creating.html) 를 따라서 A 레코드를 생성할 수 있다.

DNS 설정이 끝나면 해당 도메인으로도 SSH 접근이 가능하다.

```bash
$ ssh -i [pem file] ubuntu@blog.example.kr

```

레코드를 생성한 직후엔 아직 전파가 되지 않아 접속이 안될 수도 있으니 좀 기다리자.

AWS Lightsail로 Ghost 블로그 운영하기 - 1  
[AWS Lightsail로 Ghost 블로그 운영하기 - 2](/posts/aws-lightsail-ghost-blog-2)
[AWS Lightsail로 Ghost 블로그 운영하기 - 3](/posts/aws-lightsail-ghost-blog-3)
