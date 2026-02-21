---
title: "테슬라 대시 캠, 센트리 캠 영상, NAS로 실시간 백업하기: TeslaUSB 완벽 가이드"
author: Jinsoo Heo
pubDatetime: 2024-10-09T04:32:30.000Z
modDatetime: 2024-10-09T04:35:48.000Z
draft: false
tags:
  - tesla
  - teslausb
  - synology
  - nas
  - synology-nas
  - backup
  - automation
ogImage: "https://images.unsplash.com/photo-1560591199-cb0edbb6f491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHRlc2xhfGVufDB8fHx8MTcyODQ0ODM0MXww&ixlib=rb-4.0.3&q=80&w=2000"
description: "테슬라 대시 캠, 센트리 캠 영상, NAS로 실시간 백업하기: TeslaUSB 완벽 가이드 (무선 연결 & SSH 키 설정)  안녕하세요, 테슬라 오너 여러분! 😊  주차 중 테슬라를 안전하게 지켜주는 센트리 모드, 정말 든든하죠? 하지만 녹화된 영상을 확인하려면 매번 USB 메..."
lang: ko
---

**테슬라 대시 캠, 센트리 캠 영상, NAS로 실시간 백업하기: TeslaUSB 완벽 가이드 (무선 연결 & SSH 키 설정)**

![](https://camo.githubusercontent.com/cee967bbaff1e80764794ab0fffd3b648669e246a0ee0947755757debb11ca7b/687474703a2f2f696d672e796f75747562652e636f6d2f76692f455473367231764b544f382f302e6a7067)

안녕하세요, 테슬라 오너 여러분! 😊

주차 중 테슬라를 안전하게 지켜주는 센트리 모드, 정말 든든하죠? 하지만 녹화된 영상을 확인하려면 매번 USB 메모리를 꺼내 PC에 연결해야 하는 번거로움, 저장 용량의 한계, 그리고 혹시 모를 USB 메모리 분실이나 고장 걱정까지… 😥 이런 불편함, 이제 더 이상 참지 마세요!

**Raspberry Pi 4B**와 **SCR01 5G 라우터**를 이용하면 테슬라 센트리 모드 & 대시캠 영상을 Synology NAS로 실시간 자동 백업할 수 있습니다. 마치 꿈만 같죠? ✨

이 글에서는 **TeslaUSB** 프로젝트를 기반으로, 누구나 쉽게 따라 할 수 있도록 Raspberry Pi 4B 설정부터 Synology NAS 연동, IFTTT 알림 설정, SSH 키 설정까지, A to Z를 꼼꼼하게 알려드립니다. 더 이상 USB 메모리를 뺐다 꽂았다 할 필요 없이, 언제 어디서든 NAS에 접속하여 센트리 모드 영상을 확인하고 관리할 수 있는 스마트한 테슬라 라이프를 시작해 보세요! 🚀

**1\. 왜 Raspberry Pi와 NAS를 사용해야 할까요?**

**\- 끊김 없는 녹화:** Raspberry Pi는 테슬라 차량의 USB 포트에 연결되어 센트리 모드가 활성화될 때마다 녹화된 영상을 실시간으로 NAS에 전송합니다. USB 메모리 용량부족으로 녹화가 중단될 걱정은 이제 그만!

**\- 편리한 영상 관리:** NAS에 저장된 영상은 언제 어디서든 스마트폰, 태블릿, PC 등 다양한 기기로 쉽게 접근하고 관리할 수 있습니다.

**\- 안전한 데이터 보관:** NAS는 데이터 보호 기능이 뛰어나 중요한 센트리 모드 영상을 안전하게 보관할 수 있습니다.

**\- 자동화된 백업:** Raspberry Pi는 센트리 모드 영상을 NAS로 자동 백업하여 수동으로 파일을 옮길 필요가 없습니다.

**2\. 준비물**

자, 이제 센트리 모드 영상을 NAS로 실시간 백업하는 마법 같은 시스템을 구축해 볼까요? 먼저 아래 준비물을 꼼꼼하게 챙겨주세요.

**\- Raspberry Pi 4B:** 2GB 이상 RAM 용량 권장 (알리익스프레스 등에서 구매 가능, TeslaUSB 프로젝트 호환성 확인)

**\- 아머 케이스:** Raspberry Pi 4B 발열을 효과적으로 해소할 수 있는 케이스 (알리익스프레스 등에서 구매 가능)

**\- SCR01 라우터:** 5G 라우터 (알리익스프레스 등에서 구매 가능, **KT 5G 요금제 권장**, SKT는 Band 5 주파수 미지원으로 지하 주차장 사용 불가)

**\- microSD 카드:** 32GB 이상, Class 10 이상 (Raspberry Pi OS 설치용)

**\- 전원 어댑터:** Raspberry Pi 4B용 5V 3A 전원 어댑터 (안정적인 전원 공급이 중요해요!)

**\- USB 스플리터:** TeslaUSB 프로젝트에서 호환성을 확인한 USB 스플리터 (글러브 박스 USB 포트에 연결, 전력 공급 가능한 제품 권장)

**\- Synology NAS:** DSM 7.0 이상 설치된 모델 (rsync 및 SSH 설정 필요, 안정적인 네트워크 연결 중요)

**\- 테슬라 차량:** 센트리 모드 및 대시캠 기능 지원 차량

**3\. Raspberry Pi 4B 설정: TeslaUSB 설치하기**

**(1) TeslaUSB 이미지 다운로드 및 설치:**

TeslaUSB 프로젝트 릴리즈 페이지 (https://github.com/marcone/teslausb/releases) 에서 최신 TeslaUSB 이미지 파일 (.img.gz) 을 다운로드합니다. TeslaUSB 이미지는 Raspberry Pi OS에 TeslaUSB 소프트웨어를 포함한 이미지입니다.

터미널에서 다음 명령어를 사용하여 TeslaUSB 이미지를 microSD 카드에 덮어씁니다. ( sdX 는 microSD 카드 장치 이름으로 변경)

Raspberry Pi Imager 최신 버전을 다운로드 받으셔서 아래와 같이 선택하신 후 Storage는 컴퓨터에 꽂으신 MicroSD 카드를 선택해서 다음 다음 눌러서 SD 카드에 TeslaUSB 이미지를 입혀주시면 됩니다.

**(2) teslausb\_setup\_variables.conf 파일 설정:**

\- microSD 카드를 컴퓨터에 다시 마운트합니다.

\- boot 디렉토리에 teslausb\_setup\_variables.conf 파일을 생성합니다.

\- boot 디렉토리에 있는 teslausb\_setup\_variables.conf.sample 파일을 참고하여 teslausb\_setup\_variables.conf 파일에 다음과 같은 환경 변수를 찾아 설정합니다.

\- SSID: Wi-Fi 네트워크 이름 (SCR01 라우터의 Wi-Fi 이름)

\- WIFIPASS: Wi-Fi 비밀번호 (bash quoting 규칙에 따라 특수문자 이스케이프 처리 필수)

\- ARCHIVE\_METHOD: 백업 방법 (rsync)

\- RSYNC\_USER: Synology NAS rsync 계정 사용자 이름

\- RSYNC\_HOST: Synology NAS IP 주소

\- RSYNC\_PATH: Synology NAS 공유 폴더 경로

\- RSYNC\_REMOTE\_PATH: NAS에서 백업 파일을 저장할 경로

\- NOTIFY: 알림 설정 ( IFTTT, NONE 등)

\- IFTTT\_KEY: IFTTT 웹훅 키 (IFTTT 알림을 사용하는 경우)

\- IFTTT\_EVENT: IFTTT 이벤트 이름 (IFTTT 알림을 사용하는 경우)

**(3) Raspberry Pi 부팅 및 자동 설정 확인:**

\- microSD 카드를 Raspberry Pi 4B에 삽입하고 전원 어댑터를 연결합니다.

\- Raspberry Pi가 부팅되면 LED가 2번, 3번, 4번, 5번 깜빡이는 것을 확인합니다.

\- Raspberry Pi가 재부팅된 후 LED가 1초 간격으로 깜빡이면 정상적으로 작동하는 것입니다.

\- /boot 디렉토리에 TESLAUSB\_SETUP\_FINISHED 와 WIFI\_ENABLED 파일이 생성되었는지 확인합니다.

**(4) SSH 연결 및 설정 확인 (선택 사항):**

\- SSH 클라이언트를 사용하여 Raspberry Pi에 접속합니다. (pi@teslausb.local, 기본 비밀번호: raspberry)

\- /boot/teslausb-headless-setup.log 파일을 확인하여 설정 과정에서 발생한 오류를 확인할 수 있습니다.

**4\. SCR01 라우터 설정: 테슬라와 인터넷 연결하기**

**(1) 5G 개통:**

\- SCR01 라우터는 국내 통신사의 5G 네트워크를 지원합니다. KT 5G 요금제를 사용하는 것을 권장합니다. SKT는 Band 5 주파수를 지원하지 않아 지하 주차장에서 사용이 제한될 수 있습니다.

\- 라우터를 5G 개통하고 APN 설정을 완료합니다. 자세한 설정 방법은 통신사 및 라우터 제조사에서 제공하는 안내를 참조하세요. (KT의 경우 name: internet, apn: internet, ipv4/ipv6 하면 끝납니다)

**(2) 라우터 설치:**

\- 트렁크 왼쪽 수납 공간에 라우터를 설치합니다. (2개의 아울렛이 있는 시거잭 충전기 활용)

\- 지하 주차장에서도 라우터가 정상적으로 작동하는지 확인합니다. 지하 주차장에서 라우터가 작동하지 않으면 테슬라 소프트웨어 업데이트 다운로드 및 센트리 모드 녹화가 제한될 수 있습니다.

**5\. Synology NAS 설정: 백업 공간 마련하기**

**(1) rsync 서비스 활성화 및 계정 생성:**

\- Synology NAS에 로그인하여 제어판 > 파일 서비스 > rsync 메뉴로 이동하여 rsync 서비스를 활성화합니다. rsync 서비스는 파일을 동기화하는 데 사용됩니다.

\- 필요에 따라 rsync 백업 전용 계정을 생성하고, Raspberry Pi에서 접근 가능하도록 권한을 설정합니다.

\- 제어판 > 사용자 & 그룹 > 생성 > 사용자 생성 에서 rsync 백업 전용 계정을 생성합니다.

\- 생성한 계정에 File Station 에서 rsync 백업에 사용할 공유 폴더에 대한 읽기/쓰기 권한을 부여합니다.

**(2) SSH 서비스 활성화 및 사용자 홈 활성화:**

\- Synology NAS에서 제어판 > 터미널 & SNMP > 터미널 탭에서 SSH 서비스를 활성화합니다. SSH는 원격으로 컴퓨터에 접속하여 명령어를 실행할 수 있도록 해주는 프로토콜입니다.

\- 제어판 > 사용자 & 그룹 > 고급 > 사용자 홈 에서 사용자 홈 서비스 활성화 를 체크합니다.

**(3) SSH 키 생성 및 등록:**

\- Raspberry Pi 터미널에 접속합니다. (pi@teslausb.local, 기본 비밀번호: raspberry)

\- 다음 명령어를 실행하여 SSH 키를 생성합니다.

```shell
$ ssh-keygen
```

\- 키 생성 위치를 묻는 메시지가 나타나면 Enter 키를 눌러 기본 위치 (/home/pi/.ssh/id\_rsa) 에 저장합니다.

\- 암호를 설정할지 묻는 메시지가 나타나면 Enter 키를 눌러 암호를 설정하지 않습니다. (TeslaUSB 자동 백업 스크립트는 암호가 없는 키를 사용합니다.)

\- SSH 키가 생성되면 /home/pi/.ssh/id\_rsa (개인 키) 와 /home/pi/.ssh/id\_rsa.pub (공개 키) 파일이 생성됩니다.

\- 다음 명령어를 사용하여 Raspberry Pi에서 생성한 공개 키를 Synology NAS에 등록합니다. <NAS 사용자 이름> 과 <NAS IP 주소> 는 실제 값으로 변경합니다.

```shell
$ ssh-copy-id <NAS 사용자 이름>@<NAS IP 주소>
```

\- Synology NAS의 비밀번호를 입력하여 인증합니다.

\- 이제 Raspberry Pi에서 Synology NAS로 비밀번호 없이 SSH 접속이 가능합니다.

**6\. 시스템 연결 및 테스트: 이제 모든 것을 연결해 볼까요?**

\- Raspberry Pi 4B를 글러브 박스 USB 포트에 USB 스플리터를 사용하여 연결합니다. USB 스플리터는 하나의 USB 포트를 여러 개로 분리하여 사용할 수 있도록 해주는 장치입니다.

\- 테슬라 차량의 Wi-Fi를 SCR01 라우터에 연결합니다.

\- 차량을 시동하고 센트리 모드를 활성화합니다.

\- Synology NAS에 접속하여 센트리 모드 및 대시캠 영상이 정상적으로 백업되는지 확인합니다.

**7\. IFTTT 알림 설정: 백업 완료를 바로 알려드립니다!**

IFTTT는 다양한 서비스를 연결하여 자동화를 구현하는 플랫폼입니다. IFTTT를 이용하면 TeslaUSB 백업 완료 시 스마트폰으로 알림을 받을 수 있습니다.

**(1) IFTTT 계정 및 앱 준비:**

\- IFTTT 웹사이트 (https://ifttt.com/) 에서 계정을 생성하고 IFTTT 앱을 스마트폰에 설치합니다.

**(2) Webhooks 서비스 연결:**

\- IFTTT 웹사이트에서 **Explore** 탭을 클릭하고 "Webhooks"를 검색하여 Webhooks 서비스를 연결합니다.

\- Webhooks 서비스는 IFTTT Pro 플랜에서 사용 가능합니다. (유료가 싫으시다면 Telegram으로 구성하시면 됩니다.)

**(3) Applet 생성:**

\- IFTTT 웹사이트에서 **Create** 버튼을 클릭하여 새로운 Applet을 생성합니다.

**\- If This** 에서 "Webhooks" 서비스를 선택하고 "Receive a web request" 트리거를 선택합니다.

**\- Event Name** 에 고유한 이벤트 이름을 입력합니다. (예: tesla\_backup\_complete)

**\- Then That** 에서 "Notifications" 서비스를 선택하고 "Send a notification from the IFTTT app" 액션을 선택합니다.

**\- Notification Message** 에 알림 메시지를 작성합니다. {{Value1}}, {{Value2}}, {{OccurredAt}} 와 같은 변수를 사용하여 백업 정보를 포함할 수 있습니다. 예를 들어, 다음과 같은 메시지를 작성할 수 있습니다.

```shell
TeslaUSB 백업 완료: {{Value1}} ({{OccurredAt}})
```

\- **Create action** 버튼을 클릭하여 Applet을 생성합니다.

**(4) Webhooks 키 확인:**

\- IFTTT 웹사이트에서 **Webhooks** 서비스 페이지로 이동합니다.

**\- Documentation** 을 클릭하여 Webhooks 키를 확인합니다.

**(5) teslausb\_setup\_variables.conf 파일 설정:**

\- Raspberry Pi 4B의 /boot/teslausb\_setup\_variables.conf 파일에서 다음과 같이 IFTTT 관련 환경 변수를 설정합니다.

```shell
$ export NOTIFY=IFTTT
$ export IFTTT_KEY=<Webhooks 키>
$ export IFTTT_EVENT=<이벤트 이름>
```

\- 예를 들어, Webhooks 키가 your\_ifttt\_key, 이벤트 이름이 tesla\_backup\_complete 인 경우 다음과 같이 설정합니다.

```shell
$ export NOTIFY=IFTTT
$ export IFTTT_KEY=your_ifttt_key
$ export IFTTT_EVENT=tesla_backup_complete
```

> IFTTT는 현재 커스텀 Applet이 유료이므로 무료를 원하시는 분은 Telegram으로 구성하시면 됩니다. 구성 방법은 https://github.com/marcone/teslausb/blob/main-dev/doc/ConfigureNotificationsForArchive.md#telegram 여기에 있습니다.

**(6) 테스트:**

\- 테슬라 차량을 주행하거나 센트리 모드를 활성화하여 영상을 녹화합니다.

\- Raspberry Pi 4B가 영상을 Synology NAS로 백업하면 IFTTT를 통해 스마트폰으로 알림이 전송됩니다.

**8\. 추가 설정: 보안 강화 및 외부 접속**

**(1) Raspberry Pi 보안 강화:**

\- SSH 접속 비밀번호 변경: sudo -i > /root/bin/remountfs\_rw > passwd pi > reboot

\- Wi-Fi 핫스팟 비밀번호 설정: TeslaUSB 설정 페이지에서 Wi-Fi 핫스팟 기능을 활성화하고 강력한 비밀번호를 설정합니다.

**(2) 외부에서 NAS 접속 설정 (선택 사항):**

\- Synology NAS의 DDNS 서비스를 이용하거나, 공유기의 포트 포워딩 기능을 활용하여 외부에서 NAS에 접속할 수 있습니다.

\- DDNS를 이용하는 경우, Synology NAS의 **제어판** > **외부 액세스** > **DDNS**에서 설정합니다.

\- 공유기의 포트 포워딩 기능을 이용하는 경우, 공유기 설정 페이지에서 외부 포트와 NAS의 내부 포트 (5000, 5001 등) 를 연결합니다.

\- 외부에서 NAS에 접속할 때는 HTTPS를 적용하여 보안을 강화하는 것이 좋습니다. Let's Encrypt와 같은 무료 SSL 인증서를 사용할 수 있습니다.

**9\. 마무리**

축하합니다! 🎉 이제 Raspberry Pi 4B와 SCR01 라우터를 이용하여 테슬라 센트리 모드 & 대시캠 영상을 Synology NAS로 실시간 자동 백업하는 시스템 구축을 완료했습니다. 이제 USB 메모리의 번거로움에서 벗어나 편리하게 센트리 모드 영상을 관리하고, 언제 어디서든 소중한 테슬라를 안전하게 지켜보세요! 😊

궁금한 점이나 어려운 부분이 있다면 언제든지 댓글 남겨주세요. 😉

---

SCR01 관련 참조하면 좋은 글: https://blog.naver.com/love\_tolty/222766332970
