# TravelLight Delivery

여행자를 위한 가벼운 배송 서비스 플랫폼입니다.

## 기능

- 🔐 카카오 소셜 로그인/회원가입
- 📦 배송 요청 및 관리
- 🚚 실시간 배송 추적
- 👤 사용자 대시보드
- 🌙 다크모드 지원

## 카카오 로그인 설정

### 1. 카카오 개발자 계정 설정

1. [카카오 개발자 사이트](https://developers.kakao.com/)에 접속
2. 내 애플리케이션 > 애플리케이션 추가하기
3. 앱 이름, 사업자명 입력 후 저장

### 2. 플랫폼 설정

1. 내 애플리케이션 > 앱 설정 > 플랫폼
2. Web 플랫폼 등록
3. 사이트 도메인: `http://localhost:3000` 추가

### 3. 카카오 로그인 활성화

1. 제품 설정 > 카카오 로그인
2. 활성화 설정 ON
3. Redirect URI: `http://localhost:3000/auth/kakao/callback` 추가

### 4. 동의항목 설정

1. 제품 설정 > 카카오 로그인 > 동의항목
2. 필요한 정보 선택:
   - 닉네임 (필수)
   - 프로필 사진 (선택)
   - 카카오계정(이메일) (선택)

### 5. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 카카오 로그인 설정
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_app_key_here
KAKAO_CLIENT_SECRET=your_kakao_client_secret_here
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

**주의**: `your_kakao_app_key_here`를 카카오 개발자 콘솔에서 발급받은 실제 앱 키로 교체하세요.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용법

### 로그인

1. 메인 페이지에서 "로그인" 버튼 클릭
2. "카카오로 시작하기" 버튼 클릭
3. 카카오 계정으로 로그인
4. 자동으로 대시보드로 이동

### 대시보드

- 사용자 정보 확인
- 배송 서비스 메뉴 이용
- 로그아웃 기능

## 프로젝트 구조

```
src/
├── app/
│   ├── components/
│   │   ├── KakaoLogin.js      # 카카오 로그인 컴포넌트
│   │   └── ...
│   ├── api/
│   │   └── auth/
│   │       └── kakao/
│   │           └── route.js   # 카카오 로그인 API
│   ├── login/
│   │   └── page.js           # 로그인 페이지
│   ├── dashboard/
│   │   └── page.js           # 대시보드 페이지
│   └── ...
```

## 기술 스택

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: 카카오 로그인 API
- **State Management**: React Hooks, Local Storage
- **Styling**: Tailwind CSS

## 개발 참고사항

### 카카오 로그인 플로우

1. 사용자가 "카카오로 시작하기" 버튼 클릭
2. 카카오 SDK를 통해 로그인 팝업 표시
3. 사용자 인증 후 액세스 토큰 및 사용자 정보 획득
4. 백엔드 API(`/api/auth/kakao`)로 사용자 정보 전송
5. 신규 사용자는 회원가입, 기존 사용자는 로그인 처리
6. 사용자 정보를 로컬 스토리지에 저장
7. 대시보드로 리다이렉트

### 보안 고려사항

- 실제 운영 환경에서는 JWT 토큰 사용 권장
- 사용자 정보는 데이터베이스에 안전하게 저장
- HTTPS 사용 필수
- 환경 변수 보안 관리

## 라이선스

MIT License
