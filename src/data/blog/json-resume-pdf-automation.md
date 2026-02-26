---
title: "LinkedIn 프로필을 PDF 이력서로 자동화하기 — JSON Resume + GitHub Actions"
author: Jinsoo Heo
pubDatetime: 2026-02-22T05:42:00.000Z
draft: false
tags:
  - development
  - devops
  - career
  - ci-cd
description: "LinkedIn 프로필 데이터를 JSON Resume 스키마로 정리하고, Puppeteer로 PDF를 생성하고, GitHub Actions로 자동화하는 전체 파이프라인. 코드 포함."
lang: ko
---

이력서를 업데이트할 때마다 Google Docs를 열고, 폰트를 맞추고, PDF로 내보내고, 클라우드에 올리는 반복 작업이 지겹지 않으신가요?

이 글에서는 **LinkedIn 프로필을 단일 JSON 파일로 관리**하고, **push만 하면 PDF가 자동으로 빌드되어 커밋**되는 파이프라인을 만듭니다. 소요 시간은 30분 정도입니다.

## 전체 구조

```
resume.json              ← 이력서 데이터 (단일 소스)
scripts/build-resume.mjs ← HTML 생성 + Puppeteer PDF 변환
.github/workflows/       ← push 시 자동 빌드 & 커밋
resume/resume.pdf        ← 결과물 (Git에 포함)
```

흐름은 단순합니다:

1. `resume.json`을 수정하고 push
2. GitHub Actions가 `build-resume.mjs`를 실행
3. PDF가 생성되어 자동으로 커밋 & push

## Step 1: LinkedIn 프로필을 JSON으로 옮기기

[JSON Resume](https://jsonresume.org) 스키마를 사용합니다. LinkedIn 프로필 페이지를 열어두고, 각 섹션을 아래 구조에 맞춰 채워 넣으세요.

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "Your Name",
    "label": "Your Title",
    "email": "your@email.com",
    "phone": "+1 555-123-4567",
    "url": "https://yoursite.com",
    "summary": "2-3 sentences about you.",
    "location": {
      "city": "City",
      "countryCode": "US"
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "yourusername",
        "url": "https://github.com/yourusername"
      },
      {
        "network": "LinkedIn",
        "username": "yourusername",
        "url": "https://www.linkedin.com/in/yourusername"
      }
    ]
  },
  "work": [
    {
      "name": "Company Name",
      "position": "Your Title",
      "url": "https://company.com",
      "startDate": "2024-01-01",
      "summary": "One-line company description.",
      "highlights": [
        "Start each bullet with an action verb",
        "Quantify impact where possible (10x, 50%, $1M)"
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "area": "Computer Science",
      "studyType": "Bachelor's degree",
      "startDate": "2018-03-01",
      "endDate": "2022-02-01"
    }
  ],
  "skills": [
    {
      "name": "Category Name",
      "keywords": ["Skill1", "Skill2", "Skill3"]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native or Bilingual"
    }
  ],
  "publications": [
    {
      "name": "Title",
      "publisher": "Publisher Name",
      "releaseDate": "2023-01-01"
    }
  ],
  "awards": [
    {
      "title": "Award Name",
      "awarder": "Issuing Organization",
      "date": "2022-01-01"
    }
  ]
}
```

**팁**: LinkedIn "Experience" 섹션의 각 bullet point를 `highlights` 배열에 넣되, 반드시 **과거형 action verb**로 시작하세요. "Managed", "Designed", "Built" 등. 현재 직장만 현재형을 씁니다.

## Step 2: PDF 빌드 스크립트 작성

테마 엔진에 의존하지 않고, HTML을 직접 생성하여 Puppeteer로 PDF로 변환합니다. 외부 폰트 없이 시스템 폰트만 사용하므로 CI 환경에서도 깨지지 않습니다.

```bash
npm init -y
npm install puppeteer
```

`package.json`에 빌드 스크립트를 추가합니다:

```json
{
  "scripts": {
    "build:resume": "node scripts/build-resume.mjs"
  },
  "dependencies": {
    "puppeteer": "^24.37.5"
  }
}
```

`scripts/build-resume.mjs`를 생성합니다:

```javascript
import { readFileSync } from "fs";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const resume = JSON.parse(readFileSync(resolve(root, "resume.json"), "utf-8"));

function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const { basics, work, education, skills, languages, publications, awards } =
  resume;

const contactParts = [
  basics.email,
  basics.phone,
  basics.location
    ? `${basics.location.city}, ${basics.location.countryCode}`
    : "",
  basics.url ? basics.url.replace(/^https?:\/\//, "") : "",
].filter(Boolean);

const profileLinks = (basics.profiles || [])
  .map((p) => {
    const display = p.url.replace(/^https?:\/\/(www\.)?/, "");
    return `<a href="${escapeHtml(p.url)}">${escapeHtml(display)}</a>`;
  })
  .join("&nbsp; | &nbsp;");

const skillsHtml = skills
  .map(
    (s) =>
      `<div class="skill-row"><strong>${escapeHtml(s.name)}:</strong> ${s.keywords.map(escapeHtml).join(", ")}</div>`
  )
  .join("");

const workHtml = work
  .map((w) => {
    const dates = `${formatDate(w.startDate)} – ${formatDate(w.endDate)}`;
    const highlights = (w.highlights || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join("");
    return `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title"><strong>${escapeHtml(w.position)}</strong> &middot; ${escapeHtml(w.name || "")}</span>
          <span class="entry-date">${dates}</span>
        </div>
        ${w.summary ? `<div class="entry-sub">${escapeHtml(w.summary)}</div>` : ""}
        ${highlights ? `<ul>${highlights}</ul>` : ""}
      </div>`;
  })
  .join("");

const educationHtml = education
  .map((e) => {
    const dates = `${formatDate(e.startDate)} – ${formatDate(e.endDate)}`;
    const degree = [e.studyType, e.area].filter(Boolean).join(" in ");
    return `
      <div class="entry-row">
        <span><strong>${escapeHtml(e.institution)}</strong>${degree ? ` &middot; ${escapeHtml(degree)}` : ""}</span>
        <span class="entry-date">${dates}</span>
      </div>`;
  })
  .join("");

const langLine = (languages || [])
  .map((l) => `${l.language} (${l.fluency})`)
  .join(", ");

const pubsList = (publications || [])
  .map((p) => {
    const parts = [escapeHtml(p.name)];
    if (p.publisher) parts.push(escapeHtml(p.publisher));
    if (p.releaseDate) parts.push(formatDate(p.releaseDate).split(" ")[1]);
    return `<li>${parts.join(" | ")}</li>`;
  })
  .join("");

const awardsList = (awards || [])
  .map((a) => {
    const parts = [escapeHtml(a.title)];
    if (a.awarder) parts.push(escapeHtml(a.awarder));
    if (a.date) parts.push(formatDate(a.date).split(" ")[1]);
    return `<li>${parts.join(" | ")}</li>`;
  })
  .join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "Helvetica Neue", Arial, "Segoe UI", sans-serif;
    font-size: 9.5pt; color: #222; line-height: 1.45;
  }
  a { color: #222; text-decoration: none; }
  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5pt; margin-bottom: 3pt; }
  .label { font-size: 11pt; color: #555; margin-bottom: 5pt; }
  .contact { font-size: 8.5pt; color: #666; line-height: 1.6; }
  .contact a { color: #666; }
  .divider { border: none; border-top: 1.5pt solid #222; margin: 12pt 0 10pt; }
  .section { margin-bottom: 12pt; }
  h2 {
    font-size: 9pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8pt; color: #222; padding-bottom: 4pt;
    border-bottom: 0.75pt solid #ddd; margin-bottom: 8pt;
    break-after: avoid; page-break-after: avoid;
  }
  .summary { line-height: 1.5; margin-bottom: 12pt; }
  .skills { font-size: 8.5pt; line-height: 1.5; }
  .skill-row { margin-bottom: 2pt; }
  .entry { margin-bottom: 10pt; break-inside: avoid; page-break-inside: avoid; }
  .entry-header {
    display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 1pt;
  }
  .entry-title { font-size: 9.5pt; }
  .entry-date {
    font-size: 8.5pt; color: #666; white-space: nowrap;
    flex-shrink: 0; margin-left: 12pt;
  }
  .entry-sub { font-size: 8.5pt; font-style: italic; color: #666; margin-bottom: 2pt; }
  ul { margin: 3pt 0 0 16pt; padding: 0; }
  li { font-size: 8.5pt; line-height: 1.45; margin-bottom: 1.5pt; color: #333; }
  .entry-row {
    display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 4pt; font-size: 9.5pt;
  }
  .extras { font-size: 8.5pt; line-height: 1.5; color: #333; }
</style>
</head>
<body>
  <h1>${escapeHtml(basics.name)}</h1>
  ...sections...
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.pdf({
  path: resolve(root, "resume", "resume.pdf"),
  format: "A4",
  margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
  printBackground: true,
});
await browser.close();
```

로컬에서 확인:

```bash
mkdir -p resume
npm run build:resume
open resume/resume.pdf
```

### 왜 테마 엔진을 안 쓰나요?

처음에는 `resumed` + `jsonresume-theme-elegant`를 사용했습니다. 그런데 Puppeteer가 Font Awesome 아이콘 폰트를 렌더링하지 못해서 아이콘이 전부 네모 상자(□)로 나왔습니다.

CI 환경(ubuntu-latest)에서는 웹폰트 로딩이 불안정합니다. 시스템 폰트만 사용하는 자체 템플릿이 가장 안정적이고, 불필요한 의존성(`resumed`, `jsonresume-theme-elegant`)도 제거할 수 있어서 보안 취약점(pug, pug-code-gen, markdown-it) 걱정도 없어집니다.

## Step 3: GitHub Actions 워크플로우

`.github/workflows/resume.yml`:

```yaml
name: Build Resume PDF

on:
  push:
    paths:
      - 'resume.json'
      - 'scripts/build-resume.mjs'
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - run: npm ci

      - name: Build resume PDF
        run: node scripts/build-resume.mjs

      - name: Commit updated PDF
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add resume/resume.pdf
          if git diff --cached --quiet; then
            echo "No changes to commit"
          else
            git commit -m "chore: rebuild resume PDF from resume.json"
            git push
          fi
```

핵심 포인트:

- **path filter**: `resume.json`이나 빌드 스크립트가 변경될 때만 실행
- **workflow_dispatch**: 수동 트리거 가능 (Actions 탭에서 "Run workflow")
- **자동 커밋**: 생성된 PDF를 `github-actions[bot]`이 커밋하고 push
- **idempotent**: 변경이 없으면 커밋하지 않음

한 가지 주의할 점: 로컬에서 `resume.json`을 수정하고 push하면, CI가 PDF를 빌드하고 자동 커밋합니다. 이 상태에서 로컬에서 바로 또 push하면 reject됩니다. `git pull --rebase` 후 push하면 됩니다.

## Step 4: GitHub Pages로 PDF 호스팅

리포지토리 Settings → Pages에서 Source를 `main` 브랜치로 설정하면, `https://yourusername.github.io/repo-name/resume/resume.pdf`로 PDF에 접근할 수 있습니다.

커스텀 도메인이 있다면 `https://yourdomain.com/resume/resume.pdf`로 깔끔하게 서빙됩니다.

## Step 5: 국제 표준에 맞게 내용 다듬기

파이프라인이 돌아가면, 이제 내용을 전문가 수준으로 올릴 차례입니다. 제가 실제로 적용한 체크리스트:

### 섹션 순서

```
Summary → Technical Skills → Professional Experience → Education → Publications → Awards → Languages
```

Skills를 Experience 앞에 놓는 게 핵심입니다. 채용 담당자가 기술 스택을 먼저 확인하고 경력을 읽습니다.

### Bullet point 작성법

- **과거 직장은 과거형 action verb**: "Managed", "Designed", "Built", "Reduced", "Implemented"
- **현재 직장만 현재형**: "Build", "Design", "Lead"
- **수치화**: "10M+ concurrent users", "37% reduction", "10x improvement in build time"
- 모호한 표현("Responsible for ~", "Helped with ~") 금지

### Skills 포맷

카테고리별로 한 줄씩 정리합니다. 한 줄에 bullet으로 나열하는 건 가독성이 떨어집니다.

```
Container Orchestration: Kubernetes, EKS, kOps, Helm, ArgoCD
Infrastructure as Code: Terraform, Helm Charts, IPFS Config Management
Observability: Grafana, Mimir, Loki, Alloy, Datadog, Prometheus, ELK
```

### 같은 회사에서 승진한 경우

두 가지 방식이 있습니다:

1. **별도 항목**: 역할과 책임이 크게 다를 때. ATS 파싱에 가장 안전
2. **화살표 결합**: `DevSecOps Engineer → Lead of Network Security Part` — 공간 절약. 승진을 한눈에 보여줌

어느 쪽이든 **시간순**(이전 역할 → 이후 역할)으로 쓰세요. 역순으로 쓰면 강등처럼 보입니다.

### 기타

- **연락처 순서**: email → phone → location → website
- **프로필 링크**: 전체 URL 표시 (ATS가 하이퍼링크를 인식 못하는 경우 대비 + 인쇄 시 접근 가능)
- **Publications/Awards**: `Title | Publisher/Issuer | Year` 형식
- **letter-spacing**: section header에 0.8pt 정도. 너무 넓으면 "T E C H N I C A L" 같은 느낌

## Step 6: 홈페이지와 이력서 데이터 동기화

이력서만 관리하면 안 됩니다. 개인 홈페이지, LinkedIn, 이력서 PDF — 이 세 곳의 데이터가 일치해야 합니다. 저는 홈페이지에 "10+ years"라고 적어놨는데 이력서에는 "8+ years"로 계산되는 불일치를 뒤늦게 발견했습니다.

체크할 곳:

- 홈페이지 `<meta name="description">` 태그
- Open Graph `og:description`
- 페이지 본문의 소개 텍스트
- LinkedIn summary

`resume.json`의 `summary` 필드를 기준으로 나머지를 맞추면 됩니다.

## 운영 워크플로우 요약

이력서를 업데이트하는 전체 흐름:

1. **LinkedIn 프로필을 먼저 업데이트** — 이게 항상 source of truth
2. `resume.json`을 수정 (새 경력, 스킬 추가 등)
3. `git add resume.json && git commit -m "feat: add new role" && git push`
4. GitHub Actions가 PDF를 자동 빌드 & 커밋
5. 홈페이지, 기타 프로필과 데이터 일치 확인
6. 1-2분 후 `resume/resume.pdf`가 최신 상태

JSON만 수정하면 됩니다. 폰트, 마진, 레이아웃은 한 번 세팅하면 끝.

## 마무리

이 파이프라인의 핵심은 **LinkedIn이 source of truth**라는 점입니다. LinkedIn을 항상 최신으로 유지하고, 이력서가 필요할 때 JSON만 동기화하면 PDF는 알아서 나옵니다.

전체 코드는 [제 GitHub](https://github.com/devkoriel/home)에서 확인할 수 있습니다. Fork해서 `resume.json`만 본인 정보로 채워 넣으면 바로 사용 가능합니다.
