import { NextResponse } from 'next/server';

// 임시 사용자 데이터 저장소 (실제 프로젝트에서는 데이터베이스 사용)
let users = [];

export async function POST(request) {
  try {
    const userData = await request.json();
    const { kakaoId, email, nickname, profileImage, accessToken } = userData;

    // 기존 사용자 확인
    let existingUser = users.find(user => user.kakaoId === kakaoId);

    if (existingUser) {
      // 기존 사용자 로그인
      existingUser.lastLoginAt = new Date().toISOString();
      existingUser.accessToken = accessToken;

      return NextResponse.json({
        success: true,
        message: '로그인 성공',
        user: {
          id: existingUser.id,
          kakaoId: existingUser.kakaoId,
          email: existingUser.email,
          nickname: existingUser.nickname,
          profileImage: existingUser.profileImage,
          createdAt: existingUser.createdAt,
          lastLoginAt: existingUser.lastLoginAt
        },
        isNewUser: false
      });
    } else {
      // 새 사용자 회원가입
      const newUser = {
        id: users.length + 1,
        kakaoId,
        email,
        nickname,
        profileImage,
        accessToken,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      users.push(newUser);

      return NextResponse.json({
        success: true,
        message: '회원가입 성공',
        user: {
          id: newUser.id,
          kakaoId: newUser.kakaoId,
          email: newUser.email,
          nickname: newUser.nickname,
          profileImage: newUser.profileImage,
          createdAt: newUser.createdAt,
          lastLoginAt: newUser.lastLoginAt
        },
        isNewUser: true
      });
    }
  } catch (error) {
    console.error('카카오 로그인 처리 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 사용자 정보 조회 API
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const kakaoId = searchParams.get('kakaoId');

    if (!kakaoId) {
      return NextResponse.json(
        { success: false, message: '카카오 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const user = users.find(user => user.kakaoId === kakaoId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        kakaoId: user.kakaoId,
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      }
    });
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 