# Caffeine (카페비서) — Frontend

소상공인 사장님을 위한 지출 정리·세무·급여 비서 서비스, **카페비서**의 프론트엔드 저장소입니다.
2026 동국대 멋쟁이사자처럼 중앙해커톤 출품작입니다.

## 기능 개요

- **지출 검토**: 카드 거래 내역을 사업/개인 지출로 분류하고 품목별 카테고리를 지정
- **대시보드**: 월별 매출·지출 요약, 부가세 예상 적립액, 공제 항목 분석
- **급여 관리**: 직원 등록, 근무시간·시급 기반 급여 계산, 급여명세서 발급
- **AI 벤치마크 진단**: 동종 업계 대비 경영 지표 심층 진단
- **AI 챗봇**: 세무·경영 관련 질의응답
- **정산 데이터 내보내기(Clean Data Export)**: 월별 거래 내역 CSV 다운로드
- **설정**: 사업자 정보, 과세유형 동기화, 결제 수단·구독 관리

## 기술 스택

| 영역            | 사용 기술                    |
| --------------- | ---------------------------- |
| 프레임워크      | React 19, Vite 8             |
| 라우팅          | React Router 7               |
| 스타일링        | styled-components 6          |
| HTTP 클라이언트 | axios                        |
| 차트            | recharts                     |
| 애니메이션      | framer-motion                |
| 마크다운 렌더링 | react-markdown (챗봇 응답용) |
| 린트            | ESLint (flat config)         |

TypeScript는 아직 도입하지 않았습니다(순수 JS/JSX).

## 시작하기

### 1. 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사해 `.env`를 만들고 API 서버 주소를 채워주세요.

```bash
cp .env.example .env
```

| 변수                | 설명                                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | 백엔드 API 베이스 URL (예: `https://api.example.com`). 모든 요청은 `src/api/client.js`를 통해 이 주소의 `/api` 하위로 전송됩니다. |

이 값이 없으면 앱이 정상적으로 API를 호출할 수 없습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드 / 미리보기

```bash
npm run build
npm run preview
```

### 5. 린트

```bash
npm run lint
```

## 폴더 구조

기능(도메인) 단위로 묶는 feature-first 구조를 따릅니다.

```
src/
├── api/                  # 도메인별 axios 요청 함수 (client.js가 공용 axios 인스턴스)
├── app/                  # 각 기능 페이지
│   ├── benchmark/        # AI 벤치마크 진단
│   ├── chat/             # AI 챗봇
│   ├── dashboard/        # 대시보드 (요약, 부가세, 공제 분석, 데이터 내보내기)
│   ├── intro/            # 인트로/랜딩
│   ├── payroll/          # 급여 관리
│   ├── settings/         # 설정 (사업자 정보, 구독, 결제 수단)
│   └── transactions/     # 지출 검토
│       └── <feature>/
│           ├── <Feature>Page.jsx
│           └── components/   # 해당 페이지 전용 컴포넌트
├── components/           # 여러 페이지가 공유하는 범용 컴포넌트 (Button, Input, Modal, Loading, ErrorState)
├── contexts/              # 전역 Context (BusinessContext 등)
├── hooks/                # 공용 커스텀 훅
├── layouts/              # 레이아웃 컴포넌트 (AppLayout 등)
├── lib/                  # 순수 유틸 함수
├── router/                # 라우트 정의 및 경로 상수
├── styles/                # 전역 테마 (theme.js)
└── dev/                  # 컴포넌트 육안 확인용 개발 도구 (프로덕션 라우터에는 연결되어 있지 않음)
```

## 팀

동국대학교 멋쟁이사자처럼 2026 중앙해커톤 5팀 · Caffeine
