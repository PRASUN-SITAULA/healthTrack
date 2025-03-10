import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Logo from "@/public/images/logo.png"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { signout } from "@/actions/auth"

export async function Navbar() {
  const { user } = await getUserAndSession()
  return (
    <nav className="justify-centerborder-b flex h-20 w-full border-b-foreground/10">
      <div className="mx-10 flex w-full items-center justify-center p-3 px-5 text-sm">
        <div className="flex w-full items-center justify-center font-semibold">
          <div className="mr-32 flex flex-row items-center justify-start">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" width={80} height={80} />
            </Link>
            <h2 className="ml-0 pl-0 text-3xl">Vital</h2>
          </div>
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center justify-center gap-8">
            {user ? (
              <>
                <span>Welcome {user?.name}</span>
                <form action={signout}>
                  <Button
                    size="sm"
                    variant={"outline"}
                    className="cursor-pointer"
                  >
                    Sign out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="sm"
                  variant={"outline"}
                  disabled
                  className="cursor-pointer opacity-75"
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant={"default"}
                  disabled
                  className="cursor-pointer opacity-75"
                >
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
