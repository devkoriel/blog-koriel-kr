---
title: Slack의 강력한 대안, Mattermost
author: Jinsoo Heo
pubDatetime: 2019-04-05T07:37:53.000Z
modDatetime: 2023-03-18T18:36:50.000Z
draft: false
ogImage: "https://images.unsplash.com/photo-1557200134-3103da7b6bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNsYWNrfGVufDB8fHx8MTY3OTE2NDYwNA&ixlib=rb-4.0.3&q=80&w=2000"
description: Mattermost의 기능과 장점 Mattermost는 Slack의 대항마로 등장했다. Slack은 현재 Standard 플랜이 사용자당 매월 $6.67이고 SaaS로만 제공되기 때문에 사내망에 직접 호스팅하여 서비스할 수 없다. 서버도 국내에 없기 때문에 직접 호스팅하는 것보다 ...
lang: ko
---

## Mattermost의 기능과 장점

Mattermost는 Slack의 대항마로 등장했다. Slack은 현재 Standard 플랜이 사용자당 매월 $6.67이고 SaaS로만 제공되기 때문에 사내망에 직접 호스팅하여 서비스할 수 없다. 서버도 국내에 없기 때문에 직접 호스팅하는 것보다 느릴 수 밖에 없다. 그렇다면 Mattermost는? SaaS뿐만 아니라 직접 호스팅할 수 있으며 후자의 경우 무려 무료다. 소스 코드도 GitHub을 통해 모두 공개되어있기 때문에 회사 사정에 맞게 모든 것을 바꾸어 사용할 수 있다. 사내망에 올릴 경우 속도도 극한까지 끌어올릴 수 있다. 대용량의 파일들을 채팅 서비스를 이용해 주고 받는 경우도 꽤 있기 때문에 전송 속도는 굉장히 중요하다. 심지어 Android와 iOS 모바일 앱의 코드도 모두 공개되어 있기 때문에 직접 빌드하여 배포까지 할 수 있다. 다양한 언어로 번역되어 있어 영어에 서툰 직원들도 쉽게 사용할 수 있는 장점까지 있다. Slack은 제공되는대로 사용해야하는 반면 Mattermost는 이렇게 입맛대로 바꾸어 사용할 수 있기 때문에 스타트업이나 소규모 팀이 자체적으로 운용하기엔 최적의 응용프로그램이다.

Team Edition은 현재 무료로 소스 코드까지 공개되어있다. Enterprise Edition도 소스 코드는 공개되어 있지만 라이센스가 없으면 LDAP 통합 등 일부 기능이 제한된다. LDAP 통합 기능을 이용하면 기존 사내 인증 시스템을 바로 통합할 수 있다. Slack과 비교하여 강력한 기능이다. Android와 iOS 모바일 앱을 직접 빌드하여 배포하면 직원들이 직접 URL을 입력하고 접속해야하는 수고로움없이 사내 채팅 서비스에 바로 접속할 수 있는 용이성까지 갖추었다.

Mattermost는 검색 기능이 매우 빠르고 강력하다. 아래 사진에 나와있는 규칙에 맞추어 검색하면 원하는 정보를 언제든 쉽게 찾을 수 있다. Slack 무료 버전은 일정 기간이 지나면 그 이전 기록이 모두 사라지는데에 반해 Mattermost는 호스트의 볼륨만 살아있다면 영구 보존된다.

Mattermost의 기능은 대체로 Slack과 동일하다. 다른 팀원들과 대화를 나눌 수 있고 특정 대화에 Thread를 열 수 있다. Mattermost에 처음 접속하면 Off-Topic 채널과 Town Square 채널이 생성된다. 이 채널들은 각각 Slack의 random 채널, general 채널에 대응된다. 채널의 유형은 Public과 Private으로 Slack과 동일하다. 채널을 생성한 후에는 Header에 마크다운 형식으로 간단한 설명이나 링크를 보여줄 수 있는 점이 돋보인다. 테마 설정을 통해 개발자들이 좋아하는 다크 모드도 설정할 수 있다. 코드 조작이 가능하므로 다크 모드 말고도 직접 색상들을 모두 바꿀 수 있다.

Hipchat, Slack, Mattermost 등의 채팅 서비스를 사용하면서 의사소통에 가장 걸림돌이 되는 부분은 바로 DM(Direct Message)이다. 필히 직접 이야기해야할 내용은 DM으로 소통하고 그렇지 않은 것은 반드시 공개된 채널에서 소통하는 것이 좋다. 그렇게 하지 않으면 여러번의 DM을 통해 정보를 전달하기 때문에 시간 낭비가 생긴다. 여기서 Slack의 문제가 발생한다. Slack은 현재 DM을 부분적으로 제한할 수 있는 방법이 없다. 하지만 Mattermost는 DM을 보내면 상대방에게 대화 내용을 자동으로 이메일로 보내도록 설정할 수 있어 자연스럽게 공유가 필요한 내용은 공개 채널을 사용하도록 유도할 수 있다.

Slack의 가장 강력한 기능은 바로 App일 것이다. Slack의 App Directory를 탐색해보면, 방대한 앱들이 있는 것을 알 수 있다. 이런 앱들을 활용해 JIRA, Confluence 등 협업 도구와 통합해 사용하면 개발 조직의 능률을 배로 끌어올릴 수 있다. Mattermost도 물론 가능하다. 그것도 모든 것을 공짜로. 무료인 점이 가장 강력한 기능이다.

Mattermost에선 Webhook이 지원된다. 따라서 공식적으로 통합되지 않는 앱들도 프로토콜만 맞춘다면 Webhook으로 알림 기능을 구성해 팀원들에게 정보를 실시간으로 전달할 수 있다.

마지막으로 Mattermost를 도커를 이용해 배포하고 관리한다면 도커 스웜으로 쉽게 오케스트레이션도 가능할 수 있다는 장점이 있다. 물론 Slack 등 SaaS들도 고가용성을 유지하기 위한 노력을 하고 오케스트레이션이 되어 있겠지만, 아무래도 전세계의 사용자들이 매초 접속하여 쓰기 때문에 어떤 일이 언제 일어날 지 모른다. 하지만 소규모의 팀이 Mattermost를 도커로 직접 서버에 올려 오케스트레이션하고 데이터 볼륨도 GlusterFS 등을 이용해 Replica를 만든다면 훨씬 더 좋은 고가용성을 확보할 수 있다. Slack은 고장나면 그들이 고칠 때까지 기다려야하지만 직접 설치하면 우리가 직접 고칠 수 있지 않은가.

## Mattermost의 설치 방법

Mattermost는 여러 가지 방법으로 설치할 수 있다. 그 방법들은 아래와 같다.

-   Heroku에 배포하기
-   Bitnami를 통해 클라우드 플랫폼에 배포하기
-   서버에 직접 설치하기

앞선 두가지 방법은 몇번의 클릭으로 간단하게 배포할 수 있는 방법이다. 이 글에서는 세번째 방법인, 서버에 직접 설치하는 방법을 알아보겠다.

Mattermost의 GitHub 저장소 주소와 설치 방법의 주소는 아래와 같다.

-   GitHub 저장소: [https://github.com/mattermost/mattermost-server](https://github.com/mattermost/mattermost-server)
-   설치 방법: [https://github.com/mattermost/mattermost-server#install-on-your-own-machine](https://github.com/mattermost/mattermost-server#install-on-your-own-machine)

서버에 직접 설치하는 방법도 여러가지이다. WAS를 직접 서버에 올리고 그 앞에 Nginx와 같은 리버스 프록시를 둘 수 있다. 하지만 사내 서버에서는 여러 앱들을 운영하는 경우가 많으므로 Docker를 통해 간단하게 설치하는 방법을 알아보겠다. Docker를 이용하지만 이 글에서는 Docker와 Nginx에 대한 자세한 설명은 생략한다.

설치 방법은 Ubuntu Server를 기준으로 설명한다.

## 환경 설정

### Docker CE 설치

먼저 Docker CE를 설치한다. Docker CE를 설치하기 위해선 아래 Ubuntu 배포판들 중 하나의 64bit 버전이 필요하다.

-   Cosmic 18.10
-   Bionic 18.04 (LTS)
-   Xenial 16.04 (LTS)

기존에 설치된 패키지들이 있다면 아래의 명령어를 통해 삭제한다.

```
$ sudo apt remove docker docker-engine docker.io containerd runc
```

패키지 인덱스를 업데이트하고 docker-ce를 본격적으로 설치할 차례다.

1\. 패키지 인덱스 업데이트 및 패키지 업그레이드

```
$ sudo apt update && sudo apt upgrade -y
```

2\. Docker CE와 containerd의 최신 버전을 설치한다.

```
$ sudo apt install docker-ce docker-ce-cli containerd.io
```

Docker 설치는 이렇게 간단하게 끝났다. Docker 설치에 대한 자세한 설명은 Docker 공식 웹사이트에서 확인할 수 있다.

### Nginx 설치

이제 Nginx를 설치하고 방화벽의 정책을 설정해야한다.

```
$ sudo apt install nginx
$ sudo ufw allow ‘Nginx Full'
```

아래 명령어로 `ufw`의 정책을 확인할 수 있다.

```
$ sudo ufw status
```

### Docker 컨테이너 올리기

Docker로 컨테이너를 생성하는 방법은 크게 3가지다.

-   `docker run` 명령어
-   docker-compose
-   Docker Swarm

우리는 Docker Swarm을 이용할 것이다. Docker Swarm은 Docker의 클러스터링을 도와주는 이미지이다. 매니저 노드를 통해 여러 노드들에 퍼져있는 앱 컨테이너들을 관리하고 트래픽을 분산시킬 수 있다. 사내에서 관리하는 웹 서비스를 Docker Swarm을 통해 관리하면 고가용성을 유지할 수 있다.

하지만 이번 글에서는 클러스터링을 다루지 않고 하나의 노드에만 컨테이너를 올리도록 한다.

`docker stack` 명령어를 통해 `docker-compose.yml` 파일을 로드하고 서비스를 실행할 수 있다. 해당 파일은 루트 계정 권한으로 생성하여 편집하는 것을 권장한다. 그렇지 않았다면 `chown` 명령어로 권한을 수정하기 바란다.

```
# This file allows you to run mattermost within your docker swarm mode cluster
# for more informations check: https://docs.docker.com/engine/swarm/
#
# Simply run:
#
# `docker stack up [STACK NAME] -c docker-stack.yml`
#
# In this case `mattermost` is going to be stack name, so the command will be:
#
# `docker stack up mattermost -c docker-stack.yml`
#
# From now on all the services that belong to this stack will be prefixed with `mattermost_`
# this file defines 3 services, these are going to be mattermost_db, mattermost_app and mattermost_web,
# each of these names is the service's hostname as well, they can communicate
# with each other easily by using the hostname instead of the ip or exposing ports to the host.
#
# As a side note, images tagged as latest are pulled by default,
# that means there's no need to use `image:latest`
#
# use latest compose v3.3 file format for optimal compatibility with latest docker release and swarm features.
# see https://docs.docker.com/compose/compose-file/compose-versioning/#version-3
# and https://docs.docker.com/compose/compose-file/compose-versioning/#version-33
# and https://docs.docker.com/compose/compose-file/compose-versioning/#upgrading

version: '3.3'
networks:
  # network for App <-> DB transactions
  mm-in:
    driver: overlay
    internal: true
  # this network faces the outside world
  mm-out:
    driver: overlay
    internal: false
volumes:
  mm-dbdata:
services:
  db:
    # use official mattermost prod-db image
    image: mattermost/mattermost-prod-db
    networks:
      - mm-in
    volumes:
      # use a named-volume for data persistency
      - mm-dbdata:/var/lib/postgresql/data
      - /etc/localtime:/etc/localtime:ro
    environment:
      - POSTGRES_USER=mattermost
      - POSTGRES_PASSWORD=<POSTGRES_비밀번호>
      - POSTGRES_DB=mattermostdb
      # uncomment the following to enable backup
      # - AWS_ACCESS_KEY_ID=XXXX
      # - AWS_SECRET_ACCESS_KEY=XXXX
      # - WALE_S3_PREFIX=s3://BUCKET_NAME/PATH
      # - AWS_REGION=us-east-1
    deploy:
      restart_policy:
        condition: on-failure
  app:
    # use official mattermost prod-app image
    image: mattermost/mattermost-prod-app
    networks:
      - mm-in
      - mm-out
    volumes:
      - /<MATTERMOST_디렉토리>/mattermost/config:/mattermost/config:rw
      - /<MATTERMOST_디렉토리>/mattermost/data:/mattermost/data:rw
      - /<MATTERMOST_디렉토리>/mattermost/logs:/mattermost/logs:rw
      - /<MATTERMOST_디렉토리>/mattermost/plugins:/mattermost/plugins:rw
      - /etc/localtime:/etc/localtime:ro
    environment:
      # use service's hostname
      - DB_HOST=db
      # talk to the port within the overlay network
      # without (over)exposing ports
      - DB_PORT_NUMBER=5432
      - MM_USERNAME=mattermost
      - MM_PASSWORD=<POSTGRES_비밀번호>
      - MM_DBNAME=mattermostdb
      # pass the edition to be used, default is enterprise
      # setting this env var will make the app use the team edition
      - edition=team
      # in case your config is not in default location
      # - MM_CONFIG=/mattermost/config/config.json
    deploy:
      restart_policy:
        condition: on-failure
  web:
    # use official mattermost prod-web image
    image: mattermost/mattermost-prod-web
    ports:
      - "<HOST_포트>:80"
    networks:
      - mm-out
    volumes:
      # This directory must have cert files
      - /<MATTERMOST_디렉토리>/cert:/cert:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      # use app service's hostname
      - APP_HOST=app
      # talk to the port within the overlay network
      # without (over)exposing ports
      - APP_PORT_NUMBER=8000
    deploy:
      restart_policy:
       condition: on-failure
```

위 코드는 GitHub Gist로 공유되어있다. [https://gist.github.com/devkoriel/9bf04f399b572e6ced4d78488aa0b73d에서](https://gist.github.com/devkoriel/9bf04f399b572e6ced4d78488aa0b73d%EC%97%90%EC%84%9C) 확인할 수 있다.

접속 후 코드의 오른쪽 위 “Raw”를 클릭하고 주소창의 URL을 복사한다. `curl -O` 명령어를 이용하여 바로 다운로드할 수 있다.

```
$ curl -O https://gist.githubusercontent.com/devkoriel/9bf04f399b572e6ced4d78488aa0b73d/raw/12d197fd1c91e425205c048f29482b302686fb89/mattermost-docker-compose.yml
```

`mattermost-docker-compose.yml`에서 사용하는 파라미터는 총 3개이다.

<POSTGRES\_비밀번호>: 생성되는 Postgres DB의 비밀번호이다. 최소 16자 이상으로 설정할 것을 권장한다. [https://passwordsgenerator.net를](https://passwordsgenerator.xn--net-hw8m) 이용하면 간단하게 비밀번호를 자동 생성할 수 있다.  
<MATTERMOST\_디렉토리>: Docker 컨테이너가 사용할 Host의 볼륨 위치이다.  
<HOST\_포트>: Host에 노출할 포트이다.

아래 명령어로 <MATTERMOST\_디렉토리>를 생성하고 소유자를 설정한다.

```
$ sudo mkdir -p /home/apps/mattermost/{config,data,logs,plugins,cert}
$ sudo chown -R 2000:2000 /home/apps/mattermost
```

`mattermost-docker-compose.yml`에서 <MATTERMOST\_디렉토리>를 모두 `/home/apps/mattermost`로 바꾼다.

아래 명령어로 `mattermost` 서비스와 컨테이너를 생성한다.

```
$ docker stack deploy -c mattermost-docker-compose.yml mattermost
```

아무 오류없이 아래와 같이 출력된다면 성공이다.

```
$ Creating network mattermost_mm-in
$ Creating network mattermost_mm-out
$ Creating service mattermost_db
$ Creating service mattermost_app
$ Creating service mattermost_web
```

### Nginx 리버스 프록시 설정

\[nginx.conf\]

```
server {
  listen 80;

  server_name chat.example.com;

  location ~ /api/v[0-9]+/(users/)?websocket$ {
      proxy_pass http://127.0.0.1:<HOST_포트>;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Origin "";
  }

  location / {
      return 301 https://$host$request_uri;
  }
}

server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    server_name chat.example.com; 

    client_max_body_size 10g;

    location ~ /api/v[0-9]+/(users/)?websocket$ {
        proxy_pass http://127.0.0.1:<HOST_포트>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Origin "";
    }

    location / {
        proxy_set_header HOST $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:<HOST_포트>;
    }
}
```

위 코드는 GitHub Gist로 공유되어있다. [https://gist.github.com/devkoriel/8b789a65972733af7a4e7e799b49083c에서](https://gist.github.com/devkoriel/8b789a65972733af7a4e7e799b49083c%EC%97%90%EC%84%9C) 확인할 수 있다.

접속 후 코드의 오른쪽 위 “Raw”를 클릭하고 주소창의 URL을 복사한다. `curl -O` 명령어를 이용하여 바로 다운로드할 수 있다.

```
$ curl -O https://gist.githubusercontent.com/devkoriel/8b789a65972733af7a4e7e799b49083c/raw/7d8e5bbb7ff282f95bcd3c52bf24ac13e46d7742/mattermost-nginx-conf
```

`mattermost-nginx-conf`에서 사용하는 파라미터는 총 2개이다.

example.com: 사용할 도메인  
<HOST\_포트>: mattermost-docker-compose.yml에서 사용한 <HOST\_포트>

`mattermost-nginx-conf`를 `nginx`의 설치 경로 밑 `sites-available`로 옮긴다.

```
$ sudo mv mattermost-nginx-conf /etc/nginx/sites-available && cd /etc/nginx/sites-available
$ sudo vim mattermost-nginx-conf
```

위 2개의 파라미터를 알맞게 바꾼다.

```
$ sudo ln -s /etc/nginx/sites-available/mattermost-nginx-conf /etc/nginx/sites-enabled/mattermost-nginx-conf
$ sudo service nginx restart
```

오류가 없다면 리버스 프록시까지 정상적으로 설정된 것이다.

### Mattermost 설정

chat.example.com으로 접속하면 초기 화면을 볼 수 있다.

관리자 계정을 설정하는 부분이다. 관리자 그룹이나 관리자의 메일 계정, 이름, 비밀번호를 입력한다.

이후 표시된 화면에서 새로운 팀을 생성하거나 시스템 콘솔로 이동해 여러가지 설정을 할 수 있다. 팀을 생성할 수 있도록 되어있는 것은, 하나의 Mattermost 인스턴스에서 여러 팀이 분리되어 의사소통할 수 있도록하기 위함이다. 소규모 회사는 하나의 팀으로, 대규모 회사는 여러 팀으로 쪼개어 생성하면 좋다.

시스템 콘솔에선 General > Configuration에서 “Site URL”을 반드시 설정한다. 다른 메뉴에선 기본 언어와 SMTP 서버, GitLab 통합, MFA 등을 자유자재로 설정할 수 있다.

설정을 마치면 본격적으로 Mattermost를 사용할 수 있다.

## Mattermost 봇 만들어보기

Slack과 같이 Mattermost도 봇을 만들어 통합할 수 있다. 깃헙의 attzonko/mmpy\_bot을 이용해 챗봇을 만들어보겠다.

가장 최신 버전의 mmpy\_bot을 이용해 개발하려면 Python3와 pip이 요구된다. 먼저 Python3와 pip을 가장 최신으로 업데이트하거나 설치하자.

이후 아래의 pip 명령어로 mmpy\_bot 모듈을 설치할 수 있다.

```
$ pip install mmpy_bot
```

봇이 로그인할 수 있는 계정을 Mattermost에서 하나 만들어주자. 계정이 생성되면 그 정보를 저장할 `mattermost_bot_settings.py`  
파일을 프로젝트 루트 디렉토리에 만든다. 그 파일안에 아래와 같이 계정 정보를 명시하면 된다.

```
SSL_VERIFY = True  # SSL 인증서 사용 여부
BOT_URL = 'http://<mm.example.com>/api/v3'  # 'http://'와 '/api/v3' 경로를 함께 쓴다. 마지막 ‘/’는 생략. 버전이 3.0보다 낮으면  '/api/v1'를 사용.
BOT_LOGIN = '<bot-email-address>'
BOT_PASSWORD = '<bot-password>'
BOT_TEAM = '<your-team>'

```

위 설정은 환경 변수로 설정해도 된다. Mattermost 봇을 도커로 이미징한 후 배포한다면, 환경 변수나 `docker secret`을 사용하는 것이 보안상 더 안전하다.

아래 명령어로 mmpy\_bot cli을 호출해 간단하게 봇을 실행할 수 있다. 봇이 실행되면 사용자의 입력을 받을 수 있는 상태가 된다.

`MATTERMOST_BOT_SETTINGS_MODULE=mattermost_bot_settings mmpy_bot`

우리는 사용자 입력 이후의 행동을 정의해야한다. 같은 디렉토리에 `run.py`를 생성하고 아래와 같이 작성한다.

```
from mmpy_bot.bot import Bot


if __name__ == "__main__":
    Bot().run()

```

`MATTERMOST_BOT_SETTINGS_MODULE=mattermost_bot_settings python3 run.py` 명령어로 봇을 실행해볼 수 있다. 이제 mmpy\_bot이 지원하는 여러가지 플러그인을 이용해 사용자의 입력에 응답하는 간단한 봇을 만들어보자.

`respond_to` 플러그인과 `listen_to` 플러그인을 사용해보겠다.

이 플러그인들은 함수의 데코레이터로써 동작한다.

`respond_to`로 데코레이션된 함수는 DM(Direct Message)이나 채널에서 ‘@봇이름’을 붙여 사용자가 입력한 메시지가 정규식 패턴과 일치할 때 호출된다.  
`listen_to`로 데코레이션된 함수는 채널에서 사용자가 입력한 메시지가 정규식 패턴과 일치할 때 호출된다.

둘 중 어떠한 플러그인을 사용할지는 만드는 봇의 명세에 따라 정하면 된다. 예를 들어 “오늘 날씨”와 같은 간단한 공개적 정보 전달이 목적이라면 `listen_to`를 사용하고 나머지 경우엔 `respond_to`을 사용하는 것이 바람직하다.

DM이나 ‘@봇이름’을 붙여 ‘안녕’이라고 채팅을 입력하면 ‘안녕하세요. 저는 봇입니다.’라고 답하고, 채널에서 ‘도와줘’라고 채팅을 입력하면 ‘무엇을 도와드릴까요?’라고 답하는 봇을 만들어보자.

```
from mmpy_bot.bot import Bot

from mmpy_bot.bot import listen_to
from mmpy_bot.bot import respond_to


@respond_to('안녕')
def hi(message):
    message.reply('안녕하세요. 저는 봇입니다.')


@listen_to('도와줘')
def help_me(message):
    # 채널에 ‘@사용자’를 붙여 응답
    message.reply('무엇을 도와드릴까요?')

    # 채널에 응답
    # message.send('무엇을 도와드릴까요?')


if __name__ == "__main__":
    Bot().run()

```

`MATTERMOST_BOT_SETTINGS_MODULE=mattermost_bot_settings python3 run.py` 명령어를 입력하여 우리가 만든 봇을 실행할 수 있다. 이후 ‘안녕’과 ‘도와줘’를 입력하여 봇이 정상적으로 응답하는지 확인한다.

## 스타트업이라면 Mattermost

스타트업이라면 Mattermost를 당장 도입할 것을 추천한다. Slack의 모든 기능을 무료로 사용할 수 있고 속도 또한 빠르며 관리자가 회사의 사정에 맞추어 자유자재로 바꾸어 사용할 수 있다. 스타트업이 겪는 어려움 중 가장 큰 것이 바로 자금난일 것이다. Slack을 사용한다면 매달 사용자당 비용을 지불해야하는데 자금이 넉넉치 않은 스타트업 입장에선 그 돈을 무시할 수 없다. 매달 채팅 서비스를 위해 지출되는 비용을 아껴 더 의미있는 곳에 쓴다면 좋을 것이다. Mattermost가 대놓고 Slack Alternative라고 자칭하는 것엔 이유가 있다.
