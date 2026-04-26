import { redirect } from "next/navigation";

const flutterLoginUrl = process.env.NEXT_PUBLIC_FLUTTER_WEB_LOGIN_URL ?? "https://dashboard.gmmx.app/login";

export default function LoginPage() {
  redirect(flutterLoginUrl);
}
