---
title: Tessie API와 Telegram으로 손쉽게 만드는 테슬라 제어 봇
author: Jinsoo Heo
pubDatetime: 2024-10-09T04:26:44.000Z
draft: false
tags:
  - tesla
  - tessie
  - telegrambot
  - telegram
  - automation
ogImage: "https://images.unsplash.com/photo-1654764451028-6044fcb06ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHRlbGVncmFtJTIwYm90fGVufDB8fHx8MTcyODQ0Nzk4M3ww&ixlib=rb-4.0.3&q=80&w=2000"
description: 안녕하세요, 테슬라 차주 여러분!  오늘은 여러분의 테슬라 차량을 더욱 편리하게 관리할 수 있는 Telegram 봇을 만드는 방법을 소개하려고 합니다. 초보자도 쉽게 따라할 수 있도록 단계별로 자세히 설명드리니, 천천히 따라와 주세요!   Telegram 봇이란?  Telegram...
lang: ko
---

안녕하세요, 테슬라 차주 여러분!

오늘은 여러분의 테슬라 차량을 더욱 편리하게 관리할 수 있는 **Telegram 봇**을 만드는 방법을 소개하려고 합니다. 초보자도 쉽게 따라할 수 있도록 단계별로 자세히 설명드리니, 천천히 따라와 주세요!

## Telegram 봇이란?

**Telegram 봇(Telegram Bot)**은 Telegram 메신저에서 자동으로 작동하는 프로그램입니다. 이를 통해 메시지를 주고받거나, 특정 명령어에 반응하여 다양한 작업을 수행할 수 있습니다. 이번 글에서는 Telegram 봇을 이용해 테슬라 차량의 상태를 조회하고, 잠금/잠금 해제, 서리 제거, 창문 닫기 등 여러 기능을 제어하는 방법을 알아보겠습니다.

## 준비물

봇을 만들기 전에 몇 가지 준비물이 필요합니다:

1.  **Telegram 계정**: Telegram 앱을 설치하고 가입하세요.
2.  **Heroku 계정**: 무료로 사용할 수 있는 클라우드 플랫폼입니다. Heroku 가입하기
3.  **Tessie 계정**: Tessie는 테슬라 차량을 제어하기 위한 API를 제공합니다. [Tessie 가입하기](https://www.tessie.com/) (가입 및 API 키 발급 과정은 아래에서 자세히 설명)
4.  **Python 설치**: Python은 프로그래밍 언어로, 봇을 작성하는 데 사용됩니다. [Python 다운로드](https://www.python.org/downloads/)
5.  **Git 설치**: 버전 관리 도구로, Heroku에 코드를 배포할 때 필요합니다. [Git 다운로드](https://git-scm.com/downloads)

## 단계별 가이드

### 1단계: Tessie 가입하고 API 토큰 받기

**Tessie 웹사이트 방문하기**

-   웹 브라우저를 열고 [Tessie 웹사이트](https://www.tessie.com/)에 접속합니다.

**회원가입 및 로그인**

-   Tessie 계정이 없다면 회원가입을 진행하세요. 이미 계정이 있다면 로그인합니다.

**API 키 발급받기**

-   로그인 후, 대시보드에서 API 섹션으로 이동합니다.
-   새로운 API 키를 생성하고, 안전한 장소에 저장하세요. 이 키는 봇이 테슬라 차량을 제어하는 데 필요합니다.
-   예시:

```shell
TESSIE_API_KEY=abcdefghijklmnopqrstuvwxyz1234567890
```

**차량 VIN 확인하기**

-   Tessie 대시보드에서 제어할 차량의 VIN(차대번호)를 확인합니다. VIN은 차량 등록증이나 차량 자체에서 확인할 수 있습니다.
-   예시:

```shell
VEHICLE_VIN=LRWYGCFS9RC562139
```

### 2단계: Telegram 봇 생성하기

**BotFather와 대화하기**

-   Telegram 앱을 열고, 검색창에 `@BotFather`를 입력하여 BotFather를 찾습니다.
-   BotFather와 대화를 시작한 후, `/start` 명령어를 입력합니다.

**새 봇 생성하기**

-   `/newbot` 명령어를 입력합니다.
-   봇의 이름을 입력합니다. 예: `MyTeslaBot`
-   봇의 사용자 이름을 입력합니다. 예: `my_tesla_bot` (끝에 `_bot`을 꼭 붙여야 합니다)

**API 토큰 받기**

-   봇이 성공적으로 생성되면, BotFather가 API 토큰을 제공합니다. 이 토큰은 봇을 제어하는 데 필요하니 안전하게 보관하세요.
-   예시:

```shell
123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

### 3단계: Heroku 준비하기

**Heroku에 로그인하기**

-   [Heroku 홈페이지](https://www.heroku.com/)에 접속하여 가입하거나 로그인합니다.

**Heroku CLI 설치하기**

-   Heroku CLI(Command Line Interface)는 터미널을 통해 Heroku를 관리할 수 있게 해줍니다.
-   Heroku CLI 다운로드 페이지에서 운영체제에 맞는 설치 파일을 다운로드하여 설치하세요.

**Heroku에 로그인하기**

-   터미널(명령 프롬프트)을 열고 다음 명령어를 입력하여 Heroku에 로그인합니다:

```shell
$ heroku login
```

-   웹 브라우저가 열리며 Heroku 계정에 로그인하라는 메시지가 표시됩니다. 로그인 후 터미널로 돌아갑니다.

### 4단계: 프로젝트 준비하기

**프로젝트 디렉토리 만들기**

-   터미널에서 프로젝트를 저장할 디렉토리를 만듭니다. 예를 들어, `my_tesla_bot`이라는 폴더를 만듭니다:

**Python 가상환경 설정하기**

```shell
$ mkdir my_tesla_bot
$ cd my_tesla_bot
```

-   가상환경을 사용하면 프로젝트마다 필요한 패키지를 독립적으로 관리할 수 있습니다.

```shell
$ python -m venv venv
```

-   가상환경을 활성화합니다:
-   **Windows**:

```powerscript
$ venv\Scripts\activate
```

-   **macOS/Linux**:

```shell
$ source venv/bin/activate
```

**필요한 패키지 설치하기**

-   필요한 Python 패키지를 설치합니다:

```shell
$ pip install python-telegram-bot requests python-dotenv

```

**필수 파일 만들기**

-   `bot.py`: 봇의 메인 코드 파일
-   `Procfile`: Heroku가 애플리케이션을 실행하는 방법을 알려주는 파일
-   `.env`: 환경 변수를 저장하는 파일 (API 토큰 등)

### 5단계: 코드 작성하기

1.  **`bot.py` 파일 작성하기**

-   텍스트 편집기(예: VS Code, 메모장)를 열고 `bot.py` 파일을 만듭니다.
-   아래의 코드를 복사하여 붙여넣습니다:

```
import os
import logging
from telegram.ext import Updater, CommandHandler
from telegram import Update
import requests
from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

logger = logging.getLogger(__name__)

# 환경 변수 로드
load_dotenv()

# 환경 변수에서 토큰 및 API 키 가져오기
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
TESSIE_API_KEY = os.getenv('TESSIE_API_KEY')
VEHICLE_VIN = os.getenv('VEHICLE_VIN')  # 차량의 VIN 번호

# Tessie API 헤더 설정
TESSIE_HEADERS = {
    "accept": "application/json",
    "authorization": f"Bearer {TESSIE_API_KEY}"
}

# 승인된 사용자 ID 목록 (환경 변수에서 가져오기)
AUTHORIZED_USERS = os.getenv('AUTHORIZED_USERS')
if AUTHORIZED_USERS:
    AUTHORIZED_USERS = [int(user_id) for user_id in AUTHORIZED_USERS.split(',')]
else:
    AUTHORIZED_USERS = []

def restricted(func):
    """함수 접근을 승인된 사용자로 제한"""
    def wrapper(update: Update, context):
        user_id = update.effective_user.id
        logger.info(f"사용자 ID: {user_id}")
        logger.info(f"승인된 사용자: {AUTHORIZED_USERS}")
        if user_id not in AUTHORIZED_USERS:
            update.message.reply_text("🚫 접근 권한이 없습니다.")
            return
        return func(update, context)
    return wrapper

# 마일을 킬로미터로 변환하는 함수
def miles_to_km(miles):
    try:
        return miles * 1.60934
    except (TypeError, ValueError):
        return 'N/A'

# API 요청 함수
def get_vehicle_info():
    url = "https://api.tessie.com/vehicles"
    response = requests.get(url, headers=TESSIE_HEADERS)
    if response.status_code == 200:
        data = response.json()
        if 'results' in data:
            return data
        else:
            logger.error(f"Unexpected response structure: {data}")
            return None
    else:
        logger.error(f"Failed to get vehicle info: {response.text}")
        return None

def send_vehicle_command(command, params=None):
    url = f"https://api.tessie.com/{VEHICLE_VIN}/command/{command}"
    try:
        response = requests.post(url, headers=TESSIE_HEADERS, params=params)
        if response.status_code == 200:
            data = response.json()
            if 'result' in data:
                return data
            else:
                logger.error(f"Unexpected response structure: {data}")
                return None
        else:
            logger.error(f"Failed to execute command '{command}': {response.text}")
            return None
    except requests.RequestException as e:
        logger.error(f"Request exception: {e}")
        return None

def get_drivers():
    url = f"https://api.tessie.com/{VEHICLE_VIN}/drivers"
    response = requests.get(url, headers=TESSIE_HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        logger.error(f"Failed to get drivers: {response.text}")
        return None

def get_invitations():
    url = f"https://api.tessie.com/{VEHICLE_VIN}/invitations"
    response = requests.get(url, headers=TESSIE_HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        logger.error(f"Failed to get invitations: {response.text}")
        return None

# 명령어 핸들러 함수
@restricted
def start(update: Update, context):
    update.message.reply_text('안녕하세요! 테슬라 봇입니다. 명령어 목록을 보시려면 /help를 입력하세요.')

@restricted
def status(update: Update, context):
    vehicle_info = get_vehicle_info()
    logger.info(f"vehicle_info: {vehicle_info}")  # 디버깅을 위한 로그 출력
    if vehicle_info and 'results' in vehicle_info and len(vehicle_info['results']) > 0:
        vehicle = vehicle_info['results'][0]  # 첫 번째 차량 사용
        last_state = vehicle.get('last_state', {})
        charge_state = last_state.get('charge_state', {})
        climate_state = last_state.get('climate_state', {})
        drive_state = last_state.get('drive_state', {})
        vehicle_state = last_state.get('vehicle_state', {})
        vehicle_config = last_state.get('vehicle_config', {})
        
        # 차량 기본 정보
        display_name = last_state.get('display_name', 'N/A')
        vin = vehicle.get('vin', 'N/A')
        plate = vehicle.get('plate', 'N/A')
        state = last_state.get('state', 'N/A')
        
        # 충전 상태
        battery_level = charge_state.get('battery_level', 'N/A')
        battery_range = charge_state.get('battery_range', 'N/A')
        if isinstance(battery_range, (int, float)):
            battery_range_km = miles_to_km(battery_range)  # 마일을 km로 변환
            battery_range = f"{battery_range_km:.2f} km"
        charging_state = charge_state.get('charging_state', 'N/A')
        charge_rate = charge_state.get('charge_rate', 'N/A')
        if isinstance(charge_rate, (int, float)):
            charge_rate = f"{charge_rate:.2f} km/h"
        time_to_full_charge = charge_state.get('time_to_full_charge', 'N/A')
        if isinstance(time_to_full_charge, (int, float)):
            time_to_full_charge = f"{time_to_full_charge:.2f} 시간"
        
        # 기후 상태
        inside_temp = climate_state.get('inside_temp', 'N/A')
        if isinstance(inside_temp, (int, float)):
            inside_temp = f"{inside_temp:.1f}°C"
        outside_temp = climate_state.get('outside_temp', 'N/A')
        if isinstance(outside_temp, (int, float)):
            outside_temp = f"{outside_temp:.1f}°C"
        is_climate_on = climate_state.get('is_climate_on', False)
        
        # 주행 상태
        speed = drive_state.get('speed', 'N/A')
        if isinstance(speed, (int, float)):
            speed = f"{speed:.1f} km/h"
        power = drive_state.get('power', 'N/A')
        if isinstance(power, (int, float)):
            power = f"{power:.1f} kW"
        latitude = drive_state.get('latitude', 'N/A')
        longitude = drive_state.get('longitude', 'N/A')
        heading = drive_state.get('heading', 'N/A')
        if isinstance(heading, (int, float)):
            heading = f"{heading:.1f}°"
        
        # 차량 상태
        locked = vehicle_state.get('locked', 'N/A')
        odometer = vehicle_state.get('odometer', 'N/A')
        if isinstance(odometer, (int, float)):
            odometer_km = miles_to_km(odometer)  # 마일을 km로 변환
            odometer = f"{odometer_km:.2f} km"
        sentry_mode = vehicle_state.get('sentry_mode', 'N/A')
        
        # 차량 구성
        car_type = vehicle_config.get('car_type', 'N/A')
        exterior_color = vehicle_config.get('exterior_color', 'N/A')
        wheel_type = vehicle_config.get('wheel_type', 'N/A')
        charger_voltage = charge_state.get('charger_voltage', 'N/A')
        charger_power = charge_state.get('charger_power', 'N/A')
        
        # 위치 정보 링크 생성
        if latitude != 'N/A' and longitude != 'N/A':
            location_url = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
            location_text = f"[지도에서 보기]({location_url})"
        else:
            location_text = "N/A"
        
        # 상태 메시지 작성
        status_text = f"""
🚗 **차량 이름**: {display_name}
🔢 **VIN**: {vin}
🔖 **번호판**: {plate}
📡 **차량 상태**: {state}

🔋 **배터리 수준**: {battery_level}%
🔌 **배터리 주행 가능 거리**: {battery_range}
⚡️ **충전 상태**: {charging_state}
⚡️ **충전 속도**: {charge_rate}
⏳ **완충까지 시간**: {time_to_full_charge}
🔌 **충전 전압**: {charger_voltage} V
⚡️ **충전 전력**: {charger_power} kW

🌡 **실내 온도**: {inside_temp}
🌡 **실외 온도**: {outside_temp}
❄️ **에어컨 상태**: {'켜짐' if is_climate_on else '꺼짐'}

🚙 **속도**: {speed}
🔋 **전력 소비**: {power}
📍 **위치**: {location_text}
🧭 **방향**: {heading}°

🔒 **잠금 상태**: {'잠김' if locked else '열림'}
🛣 **주행 거리계**: {odometer}
🎥 **센트리 모드**: {'활성화' if sentry_mode else '비활성화'}

🚘 **차량 종류**: {car_type}
🎨 **외장 색상**: {exterior_color}
🛞 **휠 종류**: {wheel_type}
"""
        update.message.reply_text(status_text, parse_mode='Markdown', disable_web_page_preview=True)
    else:
        update.message.reply_text('차량 정보를 가져올 수 없습니다.')

@restricted
def lock(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('lock', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('🔒 차량이 잠겼습니다.')
        else:
            update.message.reply_text('차량 잠금에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('차량 잠금에 실패했습니다. API 요청을 확인하세요.')

@restricted
def unlock(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('unlock', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('🔓 차량 잠금 해제에 성공했습니다.')
        else:
            update.message.reply_text('차량 잠금 해제에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('차량 잠금 해제에 실패했습니다. API 요청을 확인하세요.')

@restricted
def enable_guest(update: Update, context):
    result = send_vehicle_command('enable_guest')
    if result:
        if result.get('result'):
            update.message.reply_text('👥 Guest 모드가 활성화되었습니다.')
        else:
            update.message.reply_text('Guest 모드 활성화에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('Guest 모드 활성화에 실패했습니다. API 요청을 확인하세요.')

@restricted
def disable_guest(update: Update, context):
    result = send_vehicle_command('disable_guest')
    if result:
        if result.get('result'):
            update.message.reply_text('👤 Guest 모드가 비활성화되었습니다.')
        else:
            update.message.reply_text('Guest 모드 비활성화에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('Guest 모드 비활성화에 실패했습니다. API 요청을 확인하세요.')

@restricted
def enable_valet(update: Update, context):
    result = send_vehicle_command('enable_valet')
    if result:
        if result.get('result'):
            update.message.reply_text('🚗 발렛 모드가 활성화되었습니다.')
        else:
            update.message.reply_text('발렛 모드 활성화에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('발렛 모드 활성화에 실패했습니다. API 요청을 확인하세요.')

@restricted
def disable_valet(update: Update, context):
    result = send_vehicle_command('disable_valet')
    if result:
        if result.get('result'):
            update.message.reply_text('🚗 발렛 모드가 비활성화되었습니다.')
        else:
            update.message.reply_text('발렛 모드 비활성화에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('발렛 모드 비활성화에 실패했습니다. API 요청을 확인하세요.')

@restricted
def start_defrost(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('start_max_defrost', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('❄️ 차량의 서리 제거가 시작되었습니다.')
        else:
            update.message.reply_text('서리 제거 시작에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('서리 제거 시작에 실패했습니다. API 요청을 확인하세요.')

@restricted
def stop_defrost(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('stop_max_defrost', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('❄️ 차량의 서리 제거가 중지되었습니다.')
        else:
            update.message.reply_text('서리 제거 중지에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('서리 제거 중지에 실패했습니다. API 요청을 확인하세요.')

@restricted
def close_windows(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('close_windows', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('🪟 모든 창문이 닫혔습니다.')
        else:
            update.message.reply_text('창문 닫기에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('창문 닫기에 실패했습니다. API 요청을 확인하세요.')

@restricted
def open_charge_port(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('open_charge_port', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('🔌 충전 포트가 열렸습니다.')
        else:
            update.message.reply_text('충전 포트 열기에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('충전 포트 열기에 실패했습니다. API 요청을 확인하세요.')

@restricted
def close_charge_port(update: Update, context):
    params = {
        'retry_duration': 40,         # 기본값
        'wait_for_completion': 'true' # 기본값
    }
    result = send_vehicle_command('close_charge_port', params=params)
    if result:
        if result.get('result'):
            update.message.reply_text('🔒 충전 포트가 닫혔습니다.')
        else:
            update.message.reply_text('충전 포트 닫기에 실패했습니다.')
            if result.get('woke'):
                update.message.reply_text('차량이 잠들어 있습니다.')
    else:
        update.message.reply_text('충전 포트 닫기에 실패했습니다. API 요청을 확인하세요.')

@restricted
def get_drivers_command(update: Update, context):
    drivers = get_drivers()
    if drivers and 'results' in drivers:
        driver_list = ""
        for driver in drivers['results']:
            first_name = driver.get('driver_first_name', 'N/A')
            last_name = driver.get('driver_last_name', 'N/A')
            user_id = driver.get('user_id', 'N/A')
            driver_list += f"{first_name} {last_name} (ID: {user_id})\n"
        update.message.reply_text(f"🚘 등록된 드라이버 목록:\n{driver_list}")
    else:
        update.message.reply_text('드라이버 목록을 가져올 수 없습니다.')

@restricted
def get_invitations_command(update: Update, context):
    invitations = get_invitations()
    if invitations and 'results' in invitations:
        invitation_list = ""
        for invitation in invitations['results']:
            id = invitation.get('id', 'N/A')
            state = invitation.get('state', 'N/A')
            share_link = invitation.get('share_link', 'N/A')
            invitation_list += f"ID: {id}, 상태: {state}, 링크: {share_link}\n"
        update.message.reply_text(f"✉️ 초대 목록:\n{invitation_list}")
    else:
        update.message.reply_text('초대 목록을 가져올 수 없습니다.')

@restricted
def help_command(update: Update, context):
    help_text = """
사용 가능한 명령어:
/start - 봇 시작
/status - 차량 상태 조회
/lock - 차량 잠금
/unlock - 차량 잠금 해제
/start_defrost - 서리 제거 시작
/stop_defrost - 서리 제거 중지
/close_windows - 모든 창문 닫기
/open_charge_port - 충전 포트 열기
/close_charge_port - 충전 포트 닫기
/enable_guest - Guest 모드 활성화
/disable_guest - Guest 모드 비활성화
/enable_valet - 발렛 모드 활성화
/disable_valet - 발렛 모드 비활성화
/get_drivers - 드라이버 목록 조회
/get_invitations - 초대 목록 조회
    """
    update.message.reply_text(help_text)

def main():
    updater = Updater(TELEGRAM_TOKEN, use_context=True)
    dispatcher = updater.dispatcher

    # 명령어 핸들러 등록
    dispatcher.add_handler(CommandHandler('start', start))
    dispatcher.add_handler(CommandHandler('help', help_command))
    dispatcher.add_handler(CommandHandler('status', status))
    dispatcher.add_handler(CommandHandler('lock', lock))
    dispatcher.add_handler(CommandHandler('unlock', unlock))
    dispatcher.add_handler(CommandHandler('start_defrost', start_defrost))
    dispatcher.add_handler(CommandHandler('stop_defrost', stop_defrost))
    dispatcher.add_handler(CommandHandler('close_windows', close_windows))
    dispatcher.add_handler(CommandHandler('open_charge_port', open_charge_port))
    dispatcher.add_handler(CommandHandler('close_charge_port', close_charge_port))
    dispatcher.add_handler(CommandHandler('enable_guest', enable_guest))
    dispatcher.add_handler(CommandHandler('disable_guest', disable_guest))
    dispatcher.add_handler(CommandHandler('enable_valet', enable_valet))
    dispatcher.add_handler(CommandHandler('disable_valet', disable_valet))
    dispatcher.add_handler(CommandHandler('get_drivers', get_drivers_command))
    dispatcher.add_handler(CommandHandler('get_invitations', get_invitations_command))

    # 봇 시작
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()

```

2\. **`Procfile` 작성하기**

-   프로젝트 디렉토리에 `Procfile`이라는 이름의 파일을 만듭니다.
-   아래 내용을 `Procfile`에 작성합니다:

```procfile
worker: python bot.py

```

1.  **`.env` 파일 작성하기**

-   프로젝트 디렉토리에 `.env` 파일을 만듭니다.
-   `.env` 파일에 다음 내용을 추가합니다:

```shellscript
TELEGRAM_TOKEN=여기에_텔레그램_봇_토큰을_입력하세요
TESSIE_API_KEY=여기에_테슬라_API_키를_입력하세요
VEHICLE_VIN=여기에_차량의_VIN_번호를_입력하세요
AUTHORIZED_USERS=사용자ID1,사용자ID2

```

-   각 항목을 실제 값으로 교체하세요:
-   `TELEGRAM_TOKEN`: BotFather에서 받은 토큰
-   `TESSIE_API_KEY`: Tessie에서 발급받은 API 키
-   `VEHICLE_VIN`: 제어할 차량의 VIN 번호
-   `AUTHORIZED_USERS`: 봇을 사용할 수 있는 Telegram 사용자 ID 목록 (쉼표로 구분)

> **주의**: `.env` 파일은 중요한 정보가 포함되어 있으므로 절대 공유하지 마세요.

### 6단계: Heroku에 배포하기

**Git 초기화 및 커밋하기**

-   프로젝트 디렉토리에서 Git을 초기화하고 파일을 커밋합니다:

```shell
$ git init
$ git add .
$ git commit -m "Initial commit"

```

**Heroku 앱 생성하기**

-   터미널에서 다음 명령어를 입력하여 Heroku 앱을 생성합니다:

```shell
$ heroku create

```

-   성공적으로 생성되면 앱의 URL과 Git 리포지토리 URL이 표시됩니다.

**Heroku에 배포하기**

-   다음 명령어로 코드를 Heroku에 푸시합니다:

```shell
$ git push heroku master

```

또는

```shell
$ git push heroku main

```

-   배포가 완료되면 Heroku에서 봇이 실행됩니다.

**환경 변수 설정하기**

-   Heroku 대시보드에서 생성한 앱을 선택하고, "Settings" 탭으로 이동합니다.
-   "Config Vars" 섹션에서 "Reveal Config Vars" 버튼을 클릭합니다.
-   `.env` 파일에 작성한 변수들을 Heroku에 추가합니다:
-   `TELEGRAM_TOKEN`: 텔레그램 봇 토큰
-   `TESSIE_API_KEY`: 테슬라 API 키
-   `VEHICLE_VIN`: 차량의 VIN 번호
-   `AUTHORIZED_USERS`: Telegram 사용자 ID 목록

> **Tip**: 터미널에서 Heroku CLI를 사용하여 환경 변수를 설정할 수도 있습니다:

```shell
$ heroku config:set TELEGRAM_TOKEN=여기에_텔레그램_봇_토큰을_입력하세요
$ heroku config:set TESSIE_API_KEY=여기에_테슬라_API_키를_입력하세요
$ heroku config:set VEHICLE_VIN=여기에_차량의_VIN_번호를_입력하세요
$ heroku config:set AUTHORIZED_USERS=사용자ID1,사용자ID2

```

**Dyno 시작하기**

-   Heroku에서 Dyno가 실행 중인지 확인하고, 실행되지 않았다면 시작합니다:

```shell
$ heroku ps:scale worker=1

```

### 7단계: Telegram 봇 테스트하기

**Telegram에서 봇과 대화하기**

-   Telegram 앱에서 생성한 봇을 검색하고 대화를 시작합니다.
-   `/start` 명령어를 입력하여 봇이 제대로 작동하는지 확인합니다.

**명령어 테스트하기**

-   `/status`: 차량의 현재 상태를 조회합니다.
-   `/lock`: 차량을 잠급니다.
-   `/unlock`: 차량의 잠금을 해제합니다.
-   `/start_defrost`: 서리 제거를 시작합니다.
-   `/stop_defrost`: 서리 제거를 중지합니다.
-   `/close_windows`: 모든 창문을 닫습니다.
-   `/open_charge_port`: 충전 포트를 엽니다.
-   `/close_charge_port`: 충전 포트를 닫습니다.
-   `/enable_guest`: Guest 모드를 활성화합니다.
-   `/disable_guest`: Guest 모드를 비활성화합니다.
-   `/enable_valet`: 발렛 모드를 활성화합니다.
-   `/disable_valet`: 발렛 모드를 비활성화합니다.
-   `/get_drivers`: 등록된 드라이버 목록을 조회합니다.
-   `/get_invitations`: 초대 목록을 조회합니다.각 명령어를 입력한 후, 봇이 올바른 응답을 보내는지 확인하세요.

### 8단계: 에러 처리 및 추가 정보 표시

봇을 사용하면서 발생할 수 있는 다양한 에러 상황을 대비하여 코드를 강화했습니다. 예를 들어, 명령어 실행 실패 시 사용자에게 상세한 정보를 제공합니다.

또한, `/status` 명령어는 차량의 다양한 정보를 상세하게 표시합니다. 예를 들어, 배터리 수준, 충전 상태, 실내/실외 온도, 차량 위치 등을 한눈에 확인할 수 있습니다.

#### 에러 처리 강화

명령어 실행 중 문제가 발생했을 때, 사용자에게 명확한 피드백을 제공하기 위해 코드를 수정했습니다. 예를 들어, 차량이 잠들어 있을 경우 사용자에게 이를 알리는 메시지를 추가했습니다.

```python
def send_vehicle_command(command, params=None):
    url = f"https://api.tessie.com/{VEHICLE_VIN}/command/{command}"
    try:
        response = requests.post(url, headers=TESSIE_HEADERS, params=params)
        if response.status_code == 200:
            data = response.json()
            if 'result' in data:
                return data
            else:
                logger.error(f"Unexpected response structure: {data}")
                return None
        else:
            logger.error(f"Failed to execute command '{command}': {response.text}")
            return None
    except requests.RequestException as e:
        logger.error(f"Request exception: {e}")
        return None

```

#### 추가 정보 표시

`/status` 명령어에서 배터리 충전 전압과 전력 소비 등의 추가 정보를 표시하도록 코드를 확장했습니다.

```python
# 상태 메시지 작성
status_text = f"""
🚗 차량 이름: {display_name}
🔢 VIN: {vin}
🔖 번호판: {plate}
📡 차량 상태: {state}

🔋 배터리 수준: {battery_level}%
🔌 배터리 주행 가능 거리: {battery_range}
⚡️ 충전 상태: {charging_state}
⚡️ 충전 속도: {charge_rate}
⏳ 완충까지 시간: {time_to_full_charge}

🌡 실내 온도: {inside_temp}
🌡 실외 온도: {outside_temp}
❄️ 에어컨 상태: {'켜짐' if is_climate_on else '꺼짐'}

🚙 속도: {speed}
🔋 전력 소비: {power}
🔌 충전 전압: {charger_voltage}
⚡️ 충전 전력: {charger_power}
📍 위치: {location_text}
🧭 방향: {heading}

🔒 잠금 상태: {'잠김' if locked else '열림'}
🛣 주행 거리계: {odometer}
🎥 센트리 모드: {'활성화' if sentry_mode else '비활성화'}

🚘 차량 종류: {car_type}
🎨 외장 색상: {exterior_color}
🛞 휠 종류: {wheel_type}
"""

```

### 9단계: 유지 관리 및 보안

**Heroku Dyno 관리하기**

-   무료 Heroku 플랜은 Dyno가 30분 동안 활동이 없으면 슬립 모드로 전환됩니다. 항상 봇을 실행 상태로 유지하려면 유료 플랜을 고려해보세요.
-   Dyno 상태를 확인하려면 터미널에서 다음 명령어를 사용하세요:

```shell
$ heroku ps

```

**환경 변수 보호하기**

-   `.env` 파일에 민감한 정보를 저장했지만, 이를 Git에 커밋하지 않도록 `.gitignore` 파일에 추가하세요.

```shell
venv/
.env

```

**봇 보안 강화하기**

-   `AUTHORIZED_USERS`를 통해 봇을 사용할 수 있는 Telegram 사용자 ID를 제한했습니다. 이를 통해 불특정 다수가 봇을 사용할 수 없도록 했습니다.
-   필요에 따라 추가적인 보안 조치를 고려하세요.
