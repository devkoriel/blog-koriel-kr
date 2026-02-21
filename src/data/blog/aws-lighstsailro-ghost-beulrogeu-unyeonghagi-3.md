---
title: AWS Lightsail로 Ghost 블로그 운영하기 - 3
author: Jinsoo Heo
pubDatetime: 2018-06-14T18:48:35.000Z
modDatetime: 2023-03-18T18:38:23.000Z
draft: false
ogImage: "https://images.unsplash.com/photo-1452065656801-6c60b6e7cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNhaWx8ZW58MHx8fHwxNjc5MTY0Njg3&ixlib=rb-4.0.3&q=80&w=2000"
description: 1. ghost-storage-adapter-s3 설치 Ghost 블로그는 기본적으로 이미지나 첨부 파일을 업로드 하면 인스턴스의 볼륨에 그것들을 저장한다. 우리가 생성한 Lightsail 인스턴스의 볼륨은 20G로 아주 작은 건 아니지만 첨부 파일의 용량에 따라서는 금방 차버릴 ...
lang: ko
---

### 1\. ghost-storage-adapter-s3 설치

Ghost 블로그는 기본적으로 이미지나 첨부 파일을 업로드 하면 인스턴스의 볼륨에 그것들을 저장한다. 우리가 생성한 Lightsail 인스턴스의 볼륨은 20G로 아주 작은 건 아니지만 첨부 파일의 용량에 따라서는 금방 차버릴 수도 있다. 따라서 네이티브 볼륨을 이용하는 것 보다는 AWS s3에 이미지와 첨부 파일을 업로드해서 관리하는 것이 훨씬 효율적이다. 이후에 블로그를 다른 서버로 옮기더라도 이 설정 방법을 이용해 같은 s3 버킷에 붙이기만 하면 별도의 백업과 복원 과정없이 이미지와 첨부 파일들을 옮길 수 있다.

우선 npm으로 ghost-storage-adapter-s3를 설치하자.

```bash
$ sudo npm i -g ghost-storage-adapter-s3
$ sudo mkdir -p /var/www/ghost/content/adapters/storage

# 전역 설치된 패키지를 ghost 디렉토리로 복사
$ sudo cp -r /usr/lib/node_modules/ghost-storage-adapter-s3 /var/www/ghost/content/adapters/storage/s3
$ sudo chown -R ghost:ghost /var/www/ghost/content/adapters

```

설치가 끝나면 `config.production.json`를 수정해서 ghost가 이미지와 첨부 파일을 s3 버킷에 올리도록 설정하자.

```bash
$ sudo vim /var/www/ghost/config.production.json

```

```bash
{
  "url": "https://blog.koriel.kr",
  "server": {
    "port": 2368,
    "host": "127.0.0.1"
  },
  "database": {
    "client": "mysql",
    "connection": {
      "host": "localhost",
      "user": "ghost-178",
      "password": "********",
      "database": "ghost_prod"
    }
  },
  "mail": {
    "transport": "Direct"
  },
  "logging": {
    "transports": [
      "file",
      "stdout"
    ]
  },
  "process": "systemd",
  "paths": {
    "contentPath": "/var/www/ghost/content"
  },
  # 이 밑부분을 추가
  "storage": {
    "active": "s3",
    "s3": {
      "bucket": "blog.koriel.kr-*******",
      "region": "ap-northeast-2",
      "accessKeyId": "A*******************",
      "secretAccessKey": "J***************************************",
      "endpoint": "https://s3.ap-northeast-2.amazonaws.com/"
    }
  }
}

```

s3 버킷 생성은 [https://docs.aws.amazon.com/ko\_kr/AmazonS3/latest/user-guide/create-bucket.html](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/user-guide/create-bucket.html) 을 참조.

Access key id와 secret access key 발급은 [https://docs.aws.amazon.com/ko\_kr/IAM/latest/UserGuide/id\_credentials\_access-keys.html](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_credentials_access-keys.html) 을 참조.

Ghost를 재시작하여 설정을 적용하자.

```bash
$ cd /var/www/ghost
$ ghost restart

```

### 2\. 테마 설정

Casper라는 기본 테마도 굉장히 잘 만들어진 테마이다. 많은 개발자들이 기본 테마를 그냥 사용하고 있지만 그것이 싫다면 [https://marketplace.ghost.org](https://marketplace.ghost.org) 에서 마음에 드는 것을 골라 사용할 수도 있다. 유료도 있으니 주의.

내가 사용하고 있는 테마는 Ghostium인데 GitHub에서 찾을 수 있다. 마지막 커밋 날짜가 꽤 되어서 ghost 1.24.x 버전과 호환성 문제가 생겼다. 호환성 문제를 해결하고 가독성을 개선해서 개인 repo에 올려두었다. [https://github.com/devkoriel/ghostium](https://github.com/devkoriel/ghostium).

오른쪽 위 **Clone or downlad > Download ZIP**를 눌러 다운로드 받거나 [https://github.com/devkoriel/ghostium/archive/master.zip](https://github.com/devkoriel/ghostium/archive/master.zip) 이 링크를 눌러 직접 다운로드 받을 수 있다. 다운로드 받은 .zip 압축 파일을 **관리자 페이지 > Design > Upload a theme**으로 업로드하면 바로 적용할 수 있다.

![Screen-Shot-2018-06-15-at-3.47.16-AM](/images/blog/Screen-Shot-2018-06-15-at-3.47.16-AM.png)

소셜 계정과 메타 태그, 왼쪽 네비게이션 바를 커스터마이징하려면 아래 4개의 파일들을 본인의 정보에 맞게 수정해야 한다.

-   `partials/custom/config.hbs`
-   `partials/custom/featured.hbs`
-   `partials/custom/meta.hbs`
-   `partials/custom/navigation.hbs`

수정한 후 다시 최상위 폴더를 압축하여 업로드하면 적용할 수 있다.

[AWS Lightsail로 Ghost 블로그 운영하기 - 1](https://blog.koriel.kr/aws-lighstsailro-ghost-beulrogeu-unyeonghagi-1/)  
[AWS Lightsail로 Ghost 블로그 운영하기 - 2](https://blog.koriel.kr/aws-lighstsailro-ghost-beulrogeu-unyeonghagi-2/)  
AWS Lightsail로 Ghost 블로그 운영하기 - 3
