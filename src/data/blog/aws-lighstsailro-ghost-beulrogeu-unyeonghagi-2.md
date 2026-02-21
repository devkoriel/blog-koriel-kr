---
title: AWS Lightsail로 Ghost 블로그 운영하기 - 2
author: Jinsoo Heo
pubDatetime: 2018-06-14T17:25:55.000Z
modDatetime: 2023-03-18T18:38:18.000Z
draft: false
ogImage: "https://images.unsplash.com/photo-1452065656801-6c60b6e7cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNhaWx8ZW58MHx8fHwxNjc5MTY0Njg3&ixlib=rb-4.0.3&q=80&w=2000"
description: 1. Ubuntu 패키지 업데이트 $ sudo apt update && sudo apt upgrade -y   중간에 묻는 것이 있다면 그냥 다 엔터  2. en_US.UTF-8 issue 해결 AWS EC2나 Lightsail에서 Ubuntu 인스턴스를 생성하고 접속해서 작업하다...
lang: ko
---

### 1\. Ubuntu 패키지 업데이트

```bash
$ sudo apt update && sudo apt upgrade -y

```

중간에 묻는 것이 있다면 그냥 다 엔터

### 2\. en\_US.UTF-8 issue 해결

AWS EC2나 Lightsail에서 Ubuntu 인스턴스를 생성하고 접속해서 작업하다 보면 다음과 같은 경고를 마주친다.

```bash
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LANGUAGE = (unset),
	LC_ALL = (unset),
	LC_CTYPE = "UTF-8",
	LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_US.UTF-8").
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_ALL to default locale: No such file or directory

```

왜 기본 설정으로 넣어두지 않았는 지 모르겠다. 에러가 아니라 사용하는 데에 문제가 생기진 않지만 상당히 거슬린다. `/etc/environment`에 아래 라인들을 추가하면 다음 로그인부터 해당 경고들이 사라진다.

```bash
LANG=en_US.utf-8
LC_ALL=en_US.utf-8

```

### 3\. Swap memory 설정

Ghost는 권장 사양으로 1G의 램을 요구한다. 우리가 생성한 인스턴스는 512MB이므로 나머지를 메꿀 수 있는 swap을 설정해야 한다. 넉넉하게 2G 정도 잡아주자.

```bash
$ sudo fallocate -l 2G /swapfile # 2G 크기의 파일 생성
$ sudo chmod 600 /swapfile # root만 읽을 수 있도록 권한 수정
$ sudo mkswap /swapfile # swap 파일로 만들기
$ sudo swapon /swapfile # swap 파일 활성화

```

2G의 swap memory가 잡혔고 아래 명령어로 확인이 가능하다.

```bash
$ sudo free -m
              total        used        free      shared  buff/cache   available
Mem:            486         275          36           1         175         178
Swap:          2047          73        1974

```

### 4\. Ghost 설치

#### 사용자 추가

Ghost를 설치하고 관리하기 위한 UNIX 사용자를 따로 추가하는 것이 좋다. **사용자 이름을 절대 ghost로 설정하면 안된다.** Ghost 설치 과정에서 ghost 사용자를 생성해서 사용하기 때문에 충돌한다.

```bash
$ sudo adduser <user> # user 추가. 이름을 ghost로 설정하지 말 것!!!
$ sudo usermod -aG sudo <user> # superuser 그룹에 추가
$ su - <user> # user로 로그인

```

#### Nginx 설치

```bash
$ sudo apt install nginx
$ sudo ufw allow 'Nginx Full'

```

#### MySQL 설치

```bash
$ sudo apt install mysql-server

```

설치 도중 root 계정의 비밀번호를 설정하는 창이 뜨는데 이때 **반드시 비밀번호를 설정**해야 한다. 빈칸으로 놔두고 넘어가면 나중에 Ghost를 설치할 때 문제가 된다.

#### Node.js 설치

```bash
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash
$ sudo apt install -y nodejs

```

Ghost가 지원하는 Node.js의 버전은 [https://docs.ghost.org/docs/supported-node-versions](https://docs.ghost.org/docs/supported-node-versions) 에 나와있다. v6(Boron)이나 v8(Carbon) LTS 버전을 설치할 것을 권장한다. 이 글에서는 Ghost가 추천하는 v6 버전으로 설치한다.

#### Ghost-CLI 설치

```bash
$ sudo npm i -g ghost-cli

```

#### Ghost 설치

```bash
$ sudo mkdir -p /var/www/ghost
$ sudo chown [user]:[user] /var/www/ghost
$ sudo chmod 775 /var/www/ghost

```

\[user\]는 처음에 만든 사용자 이름이다.

```bash
$ cd /var/www/ghost
$ ghost install
✔ Checking system Node.js version
✔ Checking logged in user
✔ Checking current folder permissions
✔ Checking operating system compatibility
✔ Checking for a MySQL installation
✔ Checking memory availability
✔ Checking for latest Ghost version
✔ Setting up install directory
✔ Downloading and installing Ghost v1.24.4
✔ Finishing install process

```

설치가 끝나면 설정할 정보들을 물어본다.

```bash
? Enter your blog URL: https://blog.koriel.kr # 1편에서 설정한 도메인 입력
? Enter your MySQL hostname: localhost
? Enter your MySQL username: root
? Enter your MySQL password: [hidden] # 위에서 설정한 MySQL root 계정 비밀번호
? Enter your Ghost database name: ghost2_prod # 그냥 엔터 또는 사용할 database 이름 입력

```

여기까지 끝나면 Yes or No로 답하는 질문들을 쭉 하는데, SSL만 No로 대답하고 나머진 모두 Yes로 답하면 된다.

```bash
? Do you wish to set up "ghost" mysql user? Yes
? Do you wish to set up Nginx? Yes
? Do you wish to set up SSL? No
? Enter your email (used for Let's Encrypt notifications) dev@koriel.kr # SSL 인증서 관련 이메일을 받을 주소 입력
? Do you wish to set up Systemd? Yes
? Do you want to start Ghost? Yes

```

MySQL 계정 설정, Nginx 설정, Systemd 설정, Ghost 실행까지 한번에 알아서 다 해준다. 이후 진행 상황이 쭉 보이고 Ghost가 실행된 다음 접속 가능한 URL을 표시한다.

```bash
Running sudo command: systemctl is-active ghost_temp-koriel-kr
✔ Ensuring user is not logged in as ghost user
✔ Checking if logged in user is directory owner
✔ Checking current folder permissions
Running sudo command: systemctl is-active ghost_temp-koriel-kr
✔ Validating config
✔ Checking folder permissions
✔ Checking file permissions
✔ Checking content folder ownership
✔ Checking memory availability
Running sudo command: systemctl start ghost_temp-koriel-kr
✔ Starting Ghost
Running sudo command: systemctl is-enabled ghost_temp-koriel-kr
Running sudo command: systemctl enable ghost_temp-koriel-kr --quiet
✔ Starting Ghost
You can access your publication at https://blog.koriel.kr
Next, go to to your admin interface at https://blog.koriel.kr/ghost/ to complete the setup of your publication

Ghost uses direct mail by default
To set up an alternative email method read our docs at https://docs.ghost.org/docs/mail-config

```

#### SSL 인증서 발급

certbot을 이용하면 엔터 몇번으로 SSL 발급, Nginx 설정, 리다이렉트 설정까지 알아서 다 해준다. 먼저 certbot을 설치하자.

```bash
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt update
$ sudo apt install python-certbot-nginx

```

설치가 끝나면 이제 우리가 설정한 도메인에 대해 SSL 인증서를 발급받고 설정을 완료하자.

```bash
$ sudo certbot --nginx -d blog.koriel.kr
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): dev@koriel.kr
Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org

```

이후 서비스 이용 약관과 이메일 주소 공유 동의 여부를 물어보는데 각각 a와 y로 답하고 나면 쭉쭉 진행되고 이미 Ghost에 의해 생성된 Nginx conf 파일이 자동으로 수정된다.

```bash
-------------------------------------------------------------------------------
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v01.api.letsencrypt.org/directory
-------------------------------------------------------------------------------
(A)gree/(C)ancel: a

-------------------------------------------------------------------------------
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about EFF and
our work to encrypt the web, protect its users and defend digital rights.
-------------------------------------------------------------------------------
(Y)es/(N)o: y
Starting new HTTPS connection (1): supporters.eff.org
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for blog.koriel.kr
Waiting for verification...
Cleaning up challenges
Deploying Certificate to VirtualHost /etc/nginx/sites-enabled/blog.koriel.kr.conf

```

마지막으로 HTTP 트래픽을 HTTPS로 리다이렉트할 것인 지 물어보는데 2로 답하여 리다이렉트하도록 설정하자.

```bash
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Redirecting all traffic on port 80 to ssl in /etc/nginx/sites-enabled/blog.koriel.kr.conf

```

여기까지 하면 SSL 인증서까지 설정이 모두 끝난다.

#### SSL 인증서 자동 갱신 설정

매달 1일에 인증서를 자동 갱신하도록 crontab을 설정하자.

```bash
$ sudo crontab -e

```

편집기를 선택한 후 아래 라인을 추가하자.

```bash
0 0 1 * * certbot renew

```

### 5\. 관리자 페이지 접속

https://\[URL\]/ghost 로 관리자 페이지에 접속할 수 있다. 아래 화면이 보이면 모두 정상적으로 설치, 설정된 것이다.

![Screen-Shot-2018-06-15-at-2.24.46-AM](/images/blog/Screen-Shot-2018-06-15-at-2.24.46-AM.png)

**Create your account**를 눌러 계정 정보들을 설정하면 거의 끝.

[AWS Lightsail로 Ghost 블로그 운영하기 - 1](https://blog.koriel.kr/aws-lighstsailro-ghost-beulrogeu-unyeonghagi-1/)  
AWS Lightsail로 Ghost 블로그 운영하기 - 2  
[AWS Lightsail로 Ghost 블로그 운영하기 - 3](https://blog.koriel.kr/aws-lighstsailro-ghost-beulrogeu-unyeonghagi-3/)
