import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({
        success: true,
        message: "Giriş başarılı",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Kullanıcı adı veya şifre hatalı.",
      },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Giriş sırasında hata oluştu.",
      },
      { status: 500 },
    );
  }
}
