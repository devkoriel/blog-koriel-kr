---
title: "Synology NAS로 TeslaMate 운영하고 전기차 라이프 만렙 찍기: 궁극의 TeslaMate 가이드 (feat. 원화 입력, 외부 접속, 토큰 설정)"
author: Jinsoo Heo
pubDatetime: 2024-10-09T04:38:09.000Z
modDatetime: 2024-10-23T13:51:25.000Z
draft: false
tags:
  - tesla
  - synology
  - synology-nas
  - teslamate
  - grafana
  - automation
  - visualization
ogImage: "https://images.unsplash.com/photo-1491921125492-f0b9c835b699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fHRlc2xhfGVufDB8fHx8MTcyODQ0ODM0MXww&ixlib=rb-4.0.3&q=80&w=2000"
description: 안녕하세요, 테슬라 오너 여러분!  테슬라를 더욱 스마트하게 활용하고 싶으신가요? 주행 기록 분석부터 배터리 관리, 위치별 충전 요금 기록까지, TeslaMate 하나면 전기차 라이프가 더욱 편리해집니다. 😊  이 글에서는 Synology NAS의 Container Manager...
lang: ko
---

![](https://github.com/teslamate-org/teslamate/raw/main/website/static/screenshots/web_interface.png)

![](https://github.com/teslamate-org/teslamate/raw/main/website/static/screenshots/drive.png)

![](https://github.com/teslamate-org/teslamate/raw/main/website/static/screenshots/battery-health.png)

안녕하세요, 테슬라 오너 여러분!

테슬라를 더욱 스마트하게 활용하고 싶으신가요? 주행 기록 분석부터 배터리 관리, 위치별 충전 요금 기록까지, TeslaMate 하나면 전기차 라이프가 더욱 편리해집니다. 😊

이 글에서는 Synology NAS의 Container Manager를 이용하여 TeslaMate를 설치하고, 외부에서도 안전하게 접속하며, 원화로 충전 요금을 입력하는 방법까지, 초보자도 쉽게 따라 할 수 있도록 아주 상세하게 알려드립니다. 마치 친절한 선배가 옆에서 하나하나 알려주는 것처럼, 꼼꼼하게 따라오세요! 😉

**1. TeslaMate, 왜 써야 할까요?**

TeslaMate는 테슬라 차량의 데이터를 수집하고 분석하여 다양한 정보를 제공하는 오픈 소스 프로그램입니다. 마치 테슬라의 모든 것을 기록하는 비밀 노트처럼, 주행 기록, 배터리 상태, 위치 정보, 에너지 소비량 등을 낱낱이 보여줍니다. 📊

**TeslaMate를 사용하면 이런 점이 좋아요!**

**- 주행 기록 분석:** 주행 거리, 시간, 경로, 에너지 소비량 등을 상세하게 분석하여 운전 습관을 파악하고 개선할 수 있습니다. 마치 운전 코치처럼, 더 효율적인 운전을 위한 팁을 얻을 수 있겠죠? 🚗💨

**- 배터리 관리:** 배터리 상태, 충전 습관, 온도 변화 등을 모니터링하여 배터리 수명을 연장하고 효율적으로 관리할 수 있습니다. 테슬라 배터리, 오래오래 건강하게 사용해야죠! 🔋💪

**- 차량 위치 확인:** 차량의 현재 위치와 이동 경로를 실시간으로 확인할 수 있습니다. 🗺️📍

**- 충전 비용 기록:** 위치별 충전 요금을 기록하고 분석하여 충전 비용을 절감할 수 있습니다. 💰💸 (원화 입력 꿀팁까지 알려드릴게요!)

**- 다양한 통계:** 주행 데이터를 기반으로 다양한 통계 정보를 제공하여 차량 운행에 대한 이해를 높일 수 있습니다. 🤓📊

**2. 준비물**

**- Synology NAS:** DSM 7.0 이상이 설치된 Synology NAS (권장 모델: DS220+ 이상)

**- 테슬라 계정:** TeslaMate에 연결할 테슬라 계정 🔑

**- Container Manager:** Synology NAS에 기본 설치된 Container Manager 🐳

**- Web Station:** Synology NAS에 설치할 Web Station 패키지 🌐

**- 인터넷 연결:** 안정적인 인터넷 연결 🌐

**- SSH 클라이언트:** PuTTY, 터미널 등 (DSM에서 SSH 활성화 필요) 💻

**- 텍스트 편집기:** vi, nano 등 (docker-compose.yml 파일 수정 시 필요) 📝

**3. TeslaMate 설치: Container Manager 활용하기**

**(1) Container Manager 실행 및 Docker Compose 설정:**

- Synology NAS에 로그인하여 **Container Manager**를 실행합니다.

- 왼쪽 메뉴에서 **만들기** > **Docker Compose**를 선택합니다.

**(2) docker-compose.yml 파일 작성:**

TeslaMate 공식 GitHub 저장소(https://github.com/teslamate-org/teslamate) 에서 제공하는 docker-compose.yml 파일 내용을 참고하여 아래와 같이 작성합니다.

```docker
services:
  teslamate:
    image: teslamate/teslamate:latest
    restart: always
    environment:
      - ENCRYPTION_KEY=secretkey #replace with a secure key to encrypt your Tesla API tokens
      - DATABASE_USER=teslamate
      - DATABASE_PASS=password #insert your secure database password!
      - DATABASE_NAME=teslamate
      - DATABASE_HOST=database
      - MQTT_HOST=mosquitto
    ports:
      - 4000:4000
    volumes:
      - ./import:/opt/app/import
    cap_drop:
      - all

  database:
    image: postgres:16
    restart: always
    environment:
      - POSTGRES_USER=teslamate
      - POSTGRES_PASSWORD=password #insert your secure database password!
      - POSTGRES_DB=teslamate
    volumes:
      - teslamate-db:/var/lib/postgresql/data

  grafana:
    image: teslamate/grafana:latest
    restart: always
    environment:
      - DATABASE_USER=teslamate
      - DATABASE_PASS=password #insert your secure database password!
      - DATABASE_NAME=teslamate
      - DATABASE_HOST=database
    ports:
      - 3000:3000
    volumes:
      - teslamate-grafana-data:/var/lib/grafana

  mosquitto:
    image: eclipse-mosquitto:2
    restart: always
    command: mosquitto -c /mosquitto-no-auth.conf
    # ports:
    #   - 1883:1883
    volumes:
      - mosquitto-conf:/mosquitto/config
      - mosquitto-data:/mosquitto/data

volumes:
  teslamate-db:
  teslamate-grafana-data:
  mosquitto-conf:
  mosquitto-data:
```

위 파일에서 # insert your secure database password! 왼쪽 부분을 각각 안전한 암호화 키, 강력한 비밀번호, 임의의 문자열로 변경합니다.

**(3) 컨테이너 생성 및 실행:**

- Container Manager의 Docker Compose 설정 페이지에 위에서 작성한 docker-compose.yml 파일 내용을 붙여넣습니다.

**- 다음** 버튼을 클릭하여 컨테이너 이름, 볼륨 설정 등을 확인하고 **완료** 버튼을 클릭합니다.

- Container Manager에서 TeslaMate 컨테이너와 PostgreSQL 컨테이너가 정상적으로 실행 중인지 확인합니다.

**4. TeslaMate 초기 설정: 테슬라 계정 연결하기**

- 웹 브라우저를 열고 http://NAS_IP_주소:4000 에 접속합니다. (NAS_IP_주소는 Synology NAS의 IP 주소로 변경)

- TeslaMate 초기 설정 페이지에서 테슬라 계정으로 로그인합니다.

- TeslaMate가 차량 데이터에 접근할 수 있도록 필요한 권한을 부여합니다.

**5. TeslaMate GeoFence 설정: 위치별 충전 요금 기록하기**

- TeslaMate는 GeoFence 기능을 통해 특정 위치에서의 충전 비용을 기록할 수 있습니다. 하지만 기본적으로 달러 단위로만 입력 가능하므로, 원화로 입력하려면 다음과 같은 추가 설정이 필요합니다.

**(1) SSH를 통해 NAS에 접속하고 Container Manager에서 TeslaMate 컨테이너를 선택합니다.**

**(2) 터미널** 탭을 클릭하고 **컨테이너에서 명령 실행**을 선택합니다.

**(3) 다음 명령어를 입력하여 PostgreSQL 컨테이너에 접속합니다.**

```shell
$ docker exec -it teslamate_database_1 psql -U teslamate
```

**(4) 다음 명령어를 입력하여 데이터베이스 스키마를 수정합니다.**

```sql
ALTER TABLE public.geofences ADD CONSTRAINT name_unique UNIQUE (name);
ALTER TABLE charging_processes ALTER COLUMN cost TYPE numeric(8,2);
ALTER TABLE geofences ALTER COLUMN cost_per_unit TYPE numeric(7,4);
ALTER TABLE geofences ALTER COLUMN session_fee TYPE numeric(8,2);
```

이제 TeslaMate에서 원화로 충전 요금을 입력할 수 있습니다.

**(5) TeslaMate 웹 인터페이스에서 GeoFence 메뉴로 이동합니다.**

**(6) "추가" 버튼을 클릭하여 새로운 GeoFence를 생성합니다.**

**(7) 위치 이름, 반경, 충전 단가 (kWh당 원화 금액) 등을 입력하고 저장합니다.**

- 이제 해당 위치에서 충전할 때마다 TeslaMate가 자동으로 충전량과 비용을 계산하여 기록합니다.

**6. 테슬라 인증 토큰 설정: 데이터 수집의 핵심!**

- TeslaMate는 테슬라 API를 통해 차량 데이터를 수집합니다. 따라서 TeslaMate가 데이터를 수집하려면 테슬라 인증 토큰이 필요합니다.

**(1) https://github.com/adriankumpf/tesla_auth에 접속해서 다운로드하고 설치합니다.**

**(2) tesla_auth를 통해 tesla.com에 로그인한 다음 토큰들을 생성합니다.**

**(3) 생성된 토큰 (액세스 토큰, 리프레시 토큰) 을 복사합니다.**

**(4) TeslaMate가 요구하는대로 토큰들을 입력하고 저장합니다.**

**7. 외부 접속 설정: Web Station 활용하기**

- Synology NAS의 Web Station을 이용하여 외부에서도 안전하게 TeslaMate에 접속할 수 있습니다.

**(1) Web Station 설치:**

- 패키지 센터 에서 Web Station 을 검색하여 설치합니다.

- Web Station 설치 후 애플리케이션 포털 에서 Container Manager로 생성한 프로젝트를 추가합니다. (Container Manager에서 TeslaMate 설치 당시, WebStation에 추가할건지도 물어보니, 그때 추가하면 여기에 자동으로 추가됩니다.)

**(2) 외부 접속 설정:**

- 외부 액세스 > 라우터 구성 에서 공유기의 포트 포워딩 설정을 확인합니다. 외부에서 TeslaMate에 접속하려면 공유기에서 4000번 포트를 Synology NAS의 IP 주소로 포워딩해야 합니다.

- 외부 액세스 > DDNS 에서 DDNS 서비스를 설정합니다. DDNS를 사용하면 도메인 이름을 통해 Synology NAS에 접속할 수 있습니다.

**(3) SSL 인증서 적용:**

- 보안 > 인증서 메뉴에서 Let's Encrypt와 같은 무료 SSL 인증서를 발급받아 적용합니다.

- 인증서를 적용할 서비스로 Web Station (teslamate) 을 선택합니다.

- 이제 HTTPS를 통해 안전하게 TeslaMate에 접속할 수 있습니다.

**8. 마무리**

긴 글 읽어주셔서 감사합니다! 이제 Synology NAS와 TeslaMate를 이용하여 테슬라 차량을 더욱 스마트하게 관리할 수 있게 되었습니다. 주행 기록 분석, 배터리 관리, 위치별 충전 요금 기록까지, TeslaMate가 제공하는 다양한 기능을 활용하여 전기차 라이프를 만끽하세요! 😊

**참고:**

TeslaMate 공식 문서: https://docs.teslamate.org/

**주의 사항:**

- TeslaMate는 비공식 프로그램이며, 사용 시 발생할 수 있는 문제에 대해서는 책임지지 않습니다.

- 테슬라 API 변경 등으로 인해 TeslaMate가 정상적으로 작동하지 않을 수 있습니다.

- 따라서 TeslaMate를 최신 버전으로 유지해주세요.

---

추가 (타이어 공기압 값 보정):

```javascript
# docker exec -it root_database_1 psql -U teslamate﻿

ALTER TABLE positions ALTER COLUMN tpms_pressure_fl TYPE numeric(5,3);
ALTER TABLE positions ALTER COLUMN tpms_pressure_fr TYPE numeric(5,3);
ALTER TABLE positions ALTER COLUMN tpms_pressure_rl TYPE numeric(5,3);
ALTER TABLE positions ALTER COLUMN tpms_pressure_rr TYPE numeric(5,3);
```
