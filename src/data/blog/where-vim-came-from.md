---
title: Vim은 어디서 왔나
author: Jinsoo Heo
pubDatetime: 2018-08-09T16:59:51.000Z
modDatetime: 2018-08-22T08:32:56.000Z
draft: false
tags:
  - vim
  - vi
  - ed
  - ex
  - em
  - text-editor
  - line-editor
  - history
ogImage: "https://blog.koriel.kr/images/blog/Ken_Thompson_-sitting-_and_Dennis_Ritchie_at_PDP-11_-2876612463--2.jpg"
description: "> 이 글은 Where Vim Came From [https://twobithistory.org/2018/08/05/where-vim-came-from.html]을 번역한 글입니다.   나는 최근에 Intel HEX로 알려진 파일 포맷을 우연히 발견했다. 내가 아는 한, Intel..."
lang: ko
---

> 이 글은 [Where Vim Came From](https://twobithistory.org/2018/08/05/where-vim-came-from.html)을 번역한 글입니다.

나는 최근에 Intel HEX로 알려진 파일 포맷을 우연히 발견했다. 내가 아는 한, Intel HEX 파일(.hex 확장자를 사용하는)은 바이너리 이미지를 16진수들의 집합으로 인코딩해서 좀 더 잘 볼 수 있게 만든 것이다. 알아보니 마이크로 컨트롤러를 프로그램하거나 ROM에 데이터를 구워야 하는 사람들이 쓴단다. 어쨌든, 내가 Vim에서 처음으로 HEX 파일을 열었을 때, 놀라운 걸 발견했다. 이 파일 포맷은 적어도 나한텐 매우 난해한 것이었지만 Vim은 이미 그것에 대해 모두 알고 있었다. HEX 파일의 각 행은 서로 다른 필드로 나눠진 레코드이다—Vim은 앞서서 각각의 필드를 다른 색으로 표시했다. 존경하는 눈빛으로 난 `set ft?`라고 물었고 Vim이 `filetype=hex`라 대답했다. 쩐다.

Vim은 어디에나 있다. 정말 많은 사람이 사용하기 때문에 HEX 파일 지원 같은 건 별로 놀라운 것도 아니다. Vim은 Mac OS에 같이 딸려오고 Linux 세계에선 큰 지지를 받고 있다. Vim을 싫어하는 사람에게조차 익숙한데, 그건 인기 있는 커맨드 라인 도구들이 기본적으로 Vim을 사용해서 사용자들이 특별한 지식 없이 Vim에 갇혀 버리는 게 일종의 밈(meme)이 되어버렸기 때문이다. 페이스북을 포함해서 `j` 키로 스크롤을 내리고 `k` 키로 올리는 주요 웹사이트들도 있다. 디지털 문화를 통해 퍼진 Vim의 끝판왕 격이다.

근데도 Vim은 여전히 미스터리다. 예를 들어, 페이스북이 개발하고 유지보수하는 걸 모두가 알고 있는 React랑 다르게, Vim은 정해진 스폰서가 없다. 어디에나 있고 그렇게 중요한데, Vim에 관한 결정을 내리는 위원회나 조직 같은 건 없다. Vim을 누가 만들었고 왜 만들었는지 잘 모르는 사람은 [Vim 웹사이트](https://www.vim.org/)를 보는 데 시간이 좀 걸릴 것이다. 파일 인자를 넣지 않고 Vim을 실행하면, "Bram Moolenaar et al"에 의해 개발됐다는 Vim의 시작 메시지를 볼 수 있다. 하지만 그게 많은 걸 알려주진 않는다. Bram Moolenaar은 누구고 잘 알려지지 않은 그의 동료들은 어떤 사람들일까?

이런 질문을 하면서 좀 더 중요할 수도 있는 건, Vim을 빠져나가려면 왜 `:wq`을 쳐야 하는가이다. 물론 그건 "쓰기(write)" 동작 이후의 "나가기(quit)" 동작인데, 그다지 직관적인 규칙은 아니다. 도대체 누가 텍스트 복사를 "홱 잡아당기기(yanking)"으로 바꿔 부르기로 한 걸까? 왜 `:%s/foo/bar/gc`가 "찾아서(find) 바꾸기(replace)"가 되는 걸까? Vim의 이런 천방지축은 이해할 수 없을 정도로 제 멋대로이긴 하지만, 그것들은 어디서 온 걸까?

진부하긴 하지만 그 해답은 고대 컴퓨팅의 도가니, 벨 연구소(Bell Labs)에 있다. 어떻게 보면 Vim은 Unix 시대의 서막부터 지속해서 개발되고 개선된 "wq 텍스트 편집기"라고 하는 소프트웨어의 최신판일 뿐이다.

# Ken Thompson, 행 편집기를 만들다

1996년에, 벨 연구소는 켄 톰슨(Ken Thompson)을 고용했다. 톰슨이 버클리의 캘리포니아 대학교(University of California)에서 막 전자공학과 컴퓨터과학 석사 학위를 딴 참이었다. 거기서 그는 QED라는 텍스트 편집기를 사용했는데 그건 1965년과 1966년 사이에 버클리 시분할 시스템 (Berkeley Timesharing System)[\[1\]](#fn1)을 위해 작성된 것이었다. 톰슨이 벨 연구소에서 처음 한 일 중 하나가 MIT 호환 시분할 시스템을 위해 QED를 재작성하는 것이었다. 그는 나중에 Multics 프로젝트의 일환으로 QED의 또 다른 버전을 만들었다. 그 과정에서 그는 사용자가 파일의 행을 검색하고 정규식을 사용하여 문자열을 대체할 수 있도록 프로그램을 확장했다.[\[2\]](#fn2)

버클리 시분할 시스템과 마찬가지로 상업적으로 사용 가능한 시분할 운영 체제를 개발하려는 Multics 프로젝트는 MIT와 General Electric, Bell Labs 간의 협력 사업이었다. 결과적으로 AT&T가 성과가 없다고 판단하여 끝내버린 사업이다. 그러자 톰슨과 벨 연구소의 연구원인 데니스 리치 (Dennis Ritchie)는 시분할 시스템에 대한 접근권 없이 이러한 시스템이 제공하는 "대화형 컴퓨팅의 느낌"을 잃어버린 채 결국 Unix로 알려진 자신들만의 버전을 만들게 된다.[\[3\]](#fn3) 1969년 8월, 톰슨의 아내와 어린 아들이 캘리포니아로 휴가를 떠났을 때, 그는 새 시스템의 기본 구성 요소를 모아 "운영 체제와 쉘, 편집기, 어셈블러에 각각 일주일씩 할당"했다.[\[4\]](#fn4)

그때 만든 편집기는 `ed`라고 불렸다. QED에 기초를 두긴 했지만, 똑같이 재구현한 것은 아니었다. 톰슨은 QED의 기능에서 몇 가지를 빼기로 했다. 정규식 지원은 비교적 단순한 정규식만 이해할 수 있도록 바꿨다. QED는 다중 버퍼를 사용해서 사용자가 여러 파일을 동시에 편집할 수 있었지만 `ed`는 한 번에 한 버퍼만 작업할 수 있었다. 또 QED가 명령을 포함하는 버퍼를 실행할 수 있었던 반면, `ed`는 그럴 수 없었다. 이런 단순화는 꼭 필요한 것이었을 수도 있다. 데니스 리치는 QED의 고급 정규식을 없앤 것이 "별로 큰 손실은 아니다"라고 말했었다.[\[5\]](#fn5)

`ed`는 이제 POSIX 스펙의 일부이다. 그래서 POSIX 호환 시스템을 가지고 있으면 컴퓨터에 설치된 걸 볼 수 있다. `ed`의 명령어 중 다수가 오늘날 Vim의 것이 되었기 때문에 한 번 가지고 놀아볼 가치는 있다. 예를 들어 디스크에 버퍼를 쓰기 위해선, `w` 명령어를 치면 된다. 편집기를 나가기 위해선, `q`를 치면 된다. 이 두 명령어는 `wq`처럼 같은 줄에 한 번에 쓸 수도 있다. `ed`는 Vim처럼 대화형 편집기이다. 명령 모드에서 입력 모드로 들어가기 위해선, 텍스트를 어떻게 바꿀지에 따라 입력 명령 (`i`)이나 추가 명령 (`a`), 변경 명령 (`c`)을 입력하면 된다. `ed`는 또한 텍스트를 찾고 바꾸거나 "대체 (substitute)"하기 위해 `s/foo/bar/g` 구문을 도입했다.

이런 비슷한 점을 고려하면, 평균적인 Vim 사용자가 `ed`도 문제없이 사용할 거로 생각할 수 있다. 하지만 `ed`은 또 다른 주요 특징에서 Vim과 완전히 다르다. `ed`는 진정한 행 편집기이다. 텔레프린터 (teletype printer) 시대에 작성되어 널리 사용되었던 것이다. 켄 톰슨과 데니스 리치가 Unix 일을 하고 있었을 때, 그 모습은 이랬다.

![Ken_Thompson_-sitting-and_Dennis_Ritchie_at_PDP-11-2876612463-](/images/blog/Ken_Thompson_-sitting-_and_Dennis_Ritchie_at_PDP-11_-2876612463-.jpg)

`ed`는 변경 사항이 있을 때마다 전체 파일을 전부 다시 재출력해야 하므로 열려있는 버퍼에서 행들을 오가며 편집하거나 커서를 옮길 수 없다. 화면이라는 게 종이일 뿐이고 모든 것이 잉크로 출력되던 때였기 때문에 1969년 `ed`엔 화면의 내용을 "지우는 (clear)" 메커니즘이 없었다. 필요하면, 목록 명령 (l)을 이용해 특정 범위의 행을 `ed`가 출력하게 할 수 있지만 대부분 보이지 않는 텍스트에 대해 작업하게 될 뿐이다. 그래서 `ed`를 사용하는 것은 빛이 약한 손전등으로 어두운 집 주위에서 길을 찾으려고 애쓰는 것과 비슷하다. 한 번에 보이는 것만 볼 수 있기 때문에, 모든 것이 다 어디에 있는지 기억해야만 한다.

여기 `ed`를 사용하는 예제가 있다. 내가 각 행의 목적을 설명하는 주석 (`#` 문자 이후)을 달아놨다. 주석까지 그대로 입력하면 `ed`가 인식하지 못하고 오류를 뱉을 것이다.

```shell
[sinclairtarget 09:49 ~]$ ed
i                           # Enter input mode
Hello world!

Isn't it a nice day?
.                           # Finish input
1,2l                        # List lines 1 to 2
Hello world!$
$
2d                          # Delete line 2
,l                          # List entire buffer
Hello world!$
Isn't it a nice day?$
s/nice/terrible/g           # Substitute globally
,l
Hello world!$
Isn't it a terrible day?$
w foo.txt                   # Write to foo.txt
38                          # (bytes written)
q                           # Quit
[sinclairtarget 10:50 ~]$ cat foo.txt
Hello world!
Isn't it a terrible day?

```

보이는 대로, `ed`가 특별히 말이 많은 프로그램은 아니다.

# Bill Joy, 텍스트 편집기를 만들다

`ed`도 톰슨과 리치를 위해선 충분히 잘 작동한다. 하지만 다른 사람들은 사용하기가 어려웠고 Unix의 초보자에 대한 불친절함의 대명사라는 평판을 얻었다.[\[6\]](#fn6) 1975년에, 조지 클루리스 (George Coulouris)라는 사람이 런던의 퀸 메리 대학에 설치된 Unix 시스템에서 `ed`의 개량판을 개발했다. 클루리스는 퀸 메리에서 사용 가능한 비디오 디스플레이를 활용하기 위해 편집기를 만들었다. `ed`랑 다르게, 클루리스의 프로그램은 키를 눌러 줄을 옮겨가며 한 번에 한 줄씩 편집할 수 있었다. (Vim을 한 번에 한 줄씩 사용한다고 생각하면 된다). 클루리스는 그의 프로그램에 `em`이라는 이름을 붙였다. 또는 "인간을 위한 편집기 (editor for mortals)"라고도. 톰슨이 퀸 메리를 방문한 이후에 영감을 얻은 것으로 보였다. 그는 클루리스가 만든 프로그램을 보고 편집 도중 파일의 상태를 볼 필요는 없다면서 무시했었다.[\[7\]](#fn7)

1976년, 클루리스는 UC 버클리로 가면서 `em`도 함께 가져갔다. 거기서 그는 컴퓨터과학부의 방문객으로서 여름을 보냈다. 켄 톰슨이 버클리를 떠나 벨 연구소에서 일한 후로 정확히 10년이 되는 때였다. 버클리에서, 클루리스는 Berkeley Software Distribution (BSD)에 참여하고 있는 대학원생, 빌 조이 (Bill Joy)를 만났다. 클루리스는 조이에게 `em`을 보여줬고 조이는 그의 코드를 보고 "확장된 `ed`"라는 뜻의 `ed`의 개량 버전, `ex`를 만들기 시작했다. `ex`의 1.1 버전은 1978년 BSD Unix의 첫 릴리즈와 함께 배포됐다. `ex`는 전체적으로 `ed`와 호환됐지만, `em`에서와 같이 한 줄 편집이 가능한 "열린 (open)" 모드와 우리가 요즘 쓰는 것처럼 전체 화면을 오가며 파일 전부를 실시간으로 편집할 수 있는 "시각 (visual)" 모드가 추가됐다.

1979년 BSD의 두 번째 릴리즈에선, 시각 모드로 연 `ex`보다 조금 더 많은 걸 할 수 있는, `vi`라는 실행 파일이 포함됐다.[\[8\]](#fn8)

`ex`/`vi` (이후 `vi`)는 `ed`엔 없었던, Vim과 관련된 대부분의 규칙을 세웠다. 조이가 사용하던 비디오 단말기 (video terminal)는 Lear Siegler ADM-3A였고 방향키가 없는 키보드가 달려있었다. 대신 화살표들이 `h`와 `j`, `k`, `l` 키 위에 인쇄되어 있었다. 바로 그게 조이가 이 키들을 `vi`에서 커서 이동키로 사용했던 이유다. ADM-3A 키보드의 ESC 키는 오늘날 탭키 자리에 있었다. 이건 그렇게 누르기 힘든 키가 어떻게 일반적으로 어떤 모드를 빠져나가는 동작에 할당됐는지를 설명해준다. 명령어 앞에 붙는 `:` 문자도 `vi`로부터 왔고 `:`는 일반 모드 (regular mode, `ex`를 실행하면 나오는 모드)에서 프롬프트 키로 사용된다. 이건 한번 실행하면 사용자가 아무것도 할 수 없는 `ed`에 대한 오랜 불만 사항을 해결한 것이다. 시각 모드에서 저장하고 종료하려면 이제는 당연한 `:wq`를 입력하는 작업이 필요하다. "홱 잡아당기기 (Yanking)"과 "넣기 (Putting)" 기호, 그리고 옵션을 설정하기 위한 `set` 명령어는 모두 원래 `vi`의 일부였다. Vim에서 기본적인 텍스트 편집을 할 때 우리가 사용하는 이 기능들은 대부분 `vi`의 기능들이다.

![LSI-ADM3A-full-keyboard](/images/blog/LSI-ADM3A-full-keyboard.jpg)

`vi`는 `ed` 이외에 BSD Unix에 포함된 유일한 텍스트 편집기였다. 그 당시, Emacs는 수백 달러를 호가했었고 (GNU Emacs 이전이다), 그래서 `vi`의 인기가 대단했다. 하지만 `vi`는 `ed`의 직계 후손이었고 그 때문에 AT&T의 소스 라이선스없이는 코드 수정이 불가능했다. 이 문제가 몇몇 사람들이 `vi`의 오픈 소스 버전을 만들게 된 동기가 됐다. 1987년엔 STEVIE (ST Editor for VI Enthusiasts)가 등장했고 1990년엔 Elvis, 1994년엔 `nvi`가 등장했다. 이 복제판 중 몇몇은 구문 강조 (syntax highlighting)와 화면 분할 같은 추가 기능들이 추가됐다. Elvis는 특히 Vim에 포함된 기능들을 많이 가지고 있었는데 그건 Elvis 사용자들이 넣어달라고 강력하게 요구했기 때문이다.[\[9\]](#fn9)

# Bram Moolenaar, Vim을 만들다

지금은 "Vi Improved"를 뜻하는 "Vim"이 원래는 "Vi Imitation"을 나타내는 말이었다. 다른 많은 `vi` 복제판들처럼, Vim도 사용할 수 없는 플랫폼으로 복제하려는 시도로 시작됐다. 벤로 (Venlo)의 복사기 회사에서 일하던 네덜란드 소프트웨어 엔지니어, 브람 무레나르 (Bram Moolenaar)는 그의 신상 Amiga 2000에서 사용할 `vi` 비슷한 것을 원했다. 무레나르는 그의 대학에서 Unix 시스템의 `vi`를 사용하는 데 익숙했었고 "자유자재로 다루는" 경지에 올랐었다.[\[10\]](#fn10) 그래서 1988년에 기존의 STEVIE `vi` 복제판을 시작으로, 무레나르는 Vim 개발에 돌입했다.

STEVIE는 이전에 Fred Fish의 디스크로 배포됐기 때문에 무레나르가 STEVIE에 접근할 수 있었다. Fred Fish란 미국 프로그래머로, 매월 Amiga 플랫폼에서 사용할 수 있는 최고의 오픈 소스 소프트웨어를 선정하여 플로피 디스크에 넣어 발송했었다. 누구든지 우편 비용만 내고 디스크를 신청할 수 있었다. STEVIE의 몇몇 버전은 Fred Fish의 디스크로 릴리즈됐다. 무레나르가 사용한 버전은 Fred Fish의 256번 디스크로 릴리즈된 것이었다.[\[11\]](#fn11) (실망스럽게도 Fred Fish의 디스크는 [Freddi Fish](https://en.wikipedia.org/wiki/Freddi_Fish)와 전혀 관련이 없는 거로 보인다.)

무레나르는 STEVIE를 마음에 들어 했지만 `vi`의 명령어가 많이 빠져있다는 걸 금세 알게 됐다.[\[12\]](#fn12) 그래서 무레나르는 Vim의 첫 릴리즈 때 `vi` 호환성을 최우선으로 생각했다. 어떤 사람이 `vi` 호환 매크로 편집기를 통해 임의로 생성된 미로를 풀 수 있는 일련의 `vi` 매크로를 작성하기도 했는데 무레나르는 이 매크로를 Vim에서 작동하게 만들 수 있었다. 1991년, Vim이 Fred Fish의 591번 디스크에 "Vi Imitation"이라는 이름으로 처음 릴리즈됐다.[\[13\]](#fn13) 무레나르는 여러번 되돌리기 (multi-level undo)와 컴파일 에러를 위한 "빠른 고침 (quickfix)" 모드를 포함하여 몇 가지 기능들을 추가했다. 이건 Vim이 `vi`를 능가했다는 것을 의미했다. 하지만 이후 FTP를 통해 1993년에 Vim 2.0이 나올 때까진 "Vi Imitation"으로 남아있었다.

무레나르는 여러 인터넷 공동 작업자로부터 종종 도움을 받아 Vim에 새로운 기능을 꾸준히 추가했다. Vim 2.0은 줄 바꿈 옵션과 긴 줄의 텍스트를 가로지르는 수평 스크롤을 지원했다. Vim 3.0에는 `vi` 복제판 `nvi`에서 영감을 받아 화면 분할과 버퍼를 추가했다. 지금의 Vim은 각 버퍼를 스왑 파일에 저장하여 편집된 텍스트가 충돌을 일으켜도 동작한다. Vimscript는 구문 강조 표시 기능과 함께 Vim 5.0에서 처음 등장했다. 그동안 Vim의 인기는 계속 커져 왔다. MS-DOS와 Windows, Mac, 심지어 Unix에도 이식되어 `vi`와 경쟁했다.

2006년, Vim은 _Linux Journal_ 독자들 사이에서 가장 인기 있는 편집기로 뽑혔다.[\[14\]](#fn14) 오늘날 Stack Overflow의 2018년도 개발자 설문조사에 따르면, Vim이 모든 소프트웨어 개발자의 25.8% (그리고 Sysadmin/DevOps의 40%)가 사용하는 가장 인기 있는 텍스트 모드 (터미널 에뮬레이터) 편집기이다.[\[15\]](#fn15) 1980년대 후반과 1990년대 전반에 걸쳐 프로그래머들은 Emacs 사용자가 vi (나중에 Vim이 됐지만) 사용자들에게 맞서는 "편집기 전쟁 (Editor Wars)"을 겪었다. Emacs가 아직도 확실히 추종자를 가지고 있긴 하지만, 어떤 사람들은 편집기 전쟁이 끝났으며 Vim이 승리했다고 생각한다.[\[16\]](#fn16) 2018년도 Stack Overflow 개발자 설문조사는 이것이 사실임을 확인해준다. 응답자의 4.1%만이 Emacs를 사용한다고 답했다.

어떻게 Vim이 이렇게 성공할 수 있었을까? 분명히 사람들은 Vim이 제공하는 기능들을 좋아하는 것일 테지만 난 Vim의 오랜 역사가 그 기능들 이상의 장점을 설명한다고 말하고 싶다. Vim의 코드베이스는 무레나르가 작업을 시작한 1988년으로 거슬러 올라간다. 반면 "wq 텍스트 편집기" (Unix스러운 텍스트 편집기가 어떻게 작동해야 하는지에 대한 더 넓은 비전을 제시한)는 반세기를 거슬러 올라간다. "wq 텍스트 편집기"에는 몇 가지 다른 이름들이 있었지만 빌 조이와 브람 무레나르가 이전 버전과의 호환성을 유지하는 데 특별히 신경을 쓰는 덕분에 시간이 지남에 따라 점점 좋은 생각들이 축적되어왔다. 이런 점에서 "wq 텍스트 편집기"는 컴퓨팅 세계에서 가장 위대한 사람들의 공헌을 받아 오랜 기간 실행되고 가장 성공한 오픈 소스 프로젝트 중 하나이다. "스타트업-회사는-모든-선례를-집어던지고-끝내주는-새로운-소프트웨어를-만든다 (startup-company-throws-away all-precedents-and-creates-disruptive-new-software)"는 접근법을 내가 꼭 안 좋게 생각하는 건 아니지만 Vim은 협력적이고 점증적인 접근 방식이 엄청난 걸 만들어낼 수 있음을 확실히 상기시켜 준다.

_이 글을 재밌게 읽었다면 2주에 한 번씩 더 찾아주세요! Twitter에서 [@TwoBitHistory](https://twitter.com/TwoBitHistory)를 팔로우하거나 [RSS 피드](https://twobithistory.org/feed.xml)를 구독하여 새 게시물이 언제 나오는지 확인하세요._

---

1.  Butler Lampson, “Systems,” Butler Lampson, accessed August 5, 2018, [http://bwlampson.site/Systems.htm](http://bwlampson.site/Systems.htm). [↩︎](#fnref1)
    
2.  Dennis Ritchie, “An Incomplete History of the QED Editor,” accessed August 5, 2018, [https://www.bell-labs.com/usr/dmr/www/qed.html](https://www.bell-labs.com/usr/dmr/www/qed.html). [↩︎](#fnref2)
    
3.  Peter Salus, “The Daemon, the GNU, and the Penguin,” Groklaw, April 14, 2005, accessed August 5, 2018, [http://www.groklaw.net/article.php?story=20050414215646742](http://www.groklaw.net/article.php?story=20050414215646742). [↩︎](#fnref3)
    
4.  ibid. [↩︎](#fnref4)
    
5.  Dennis Ritchie, “An Incomplete History of the QED Editor,” accessed August 5, 2018, [https://www.bell-labs.com/usr/dmr/www/qed.html](https://www.bell-labs.com/usr/dmr/www/qed.html). [↩︎](#fnref5)
    
6.  Donald Norman, “The Truth about Unix: The User Interface Is Horrid,” Datamation, accessed August 5, 2018, [http://www.ceri.memphis.edu/people/smalley/ESCI7205\_misc\_files/The\_truth\_about\_Unix\_cleaned.pdf](http://www.ceri.memphis.edu/people/smalley/ESCI7205_misc_files/The_truth_about_Unix_cleaned.pdf). [↩︎](#fnref6)
    
7.  George Coulouris, “George Coulouris: A Bit of History,” George Coulouris’ Homepage, September 1998, accessed August 5, 2018, [http://www.eecs.qmul.ac.uk/~gc/history/index.html](http://www.eecs.qmul.ac.uk/~gc/history/index.html). [↩︎](#fnref7)
    
8.  “Second Berkeley Software Distribution Manual,” Roguelife, accessed August 5, 2018, [http://roguelife.org/~fujita/COOKIES/HISTORY/2BSD/vi.u.html](http://roguelife.org/~fujita/COOKIES/HISTORY/2BSD/vi.u.html). [↩︎](#fnref8)
    
9.  Sven Guckes, “VIM Wishlist,” Vmunix, May 15, 1995, accessed August 5, 2018, [https://web.archive.org/web/20080520075925/http://www.vmunix.com/vim/wish.html](https://web.archive.org/web/20080520075925/http://www.vmunix.com/vim/wish.html). [↩︎](#fnref9)
    
10.  Bram Moolenaar, “Vim 25” (lecture, Zurich, November 2, 2016), December 13, 2016, accessed August 5, 2018, [https://www.youtube.com/watch?v=ayc\_qpB-93o&t=4m58s](https://www.youtube.com/watch?v=ayc_qpB-93o&t=4m58s) [↩︎](#fnref10)
     
11.  ibid. (?t=6m15s) [↩︎](#fnref11)
     
12.  ibid. (?t=7m6s) [↩︎](#fnref12)
     
13.  “Fish Disks 1 - 1120,” Amiga Stuff, accessed August 5, 2018, [http://www.amiga-stuff.com/pd/fish.html](http://www.amiga-stuff.com/pd/fish.html). [↩︎](#fnref13)
     
14.  “2005 Linux Journal Reader’s Choice Awards,” Linux Journal, September 28, 2005, accessed August 5, 2018, [https://www.linuxjournal.com/article/8520#N0x850cd80.0x87983bc](https://www.linuxjournal.com/article/8520#N0x850cd80.0x87983bc). [↩︎](#fnref14)
     
15.  “Stack Overflow Developer Survey 2018,” Stack Overflow, accessed August 5, 2018, [https://insights.stackoverflow.com/survey/2018/#development-environments-and-tools](https://insights.stackoverflow.com/survey/2018/#development-environments-and-tools). [↩︎](#fnref15)
     
16.  Bruce Byfield, “The End of the Editor Wars,” Linux Magazine, May 11, 2015, accessed August 5, 2018, [http://www.linux-magazine.com/Online/Blogs/Off-the-Beat-Bruce-Byfield-s-Blog/The-End-of-the-Editor-Wars](http://www.linux-magazine.com/Online/Blogs/Off-the-Beat-Bruce-Byfield-s-Blog/The-End-of-the-Editor-Wars). [↩︎](#fnref16)
