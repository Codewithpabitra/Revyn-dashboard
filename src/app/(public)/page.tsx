import Image from "next/image";
import Link from "next/link";
import {
  IconBrandGithub,
  IconSparkles,
  IconMessageCircle,
  IconBrandX,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-lg font-semibold">Revyn</span>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-gray-600 hover:text-black">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-6">
          <IconSparkles size={14} />
          AI-powered code review
        </div>
        <h1 className="text-5xl font-semibold tracking-tight mb-6">
          Every pull request,
          <br />
          reviewed instantly.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Revyn connects to your GitHub repos and reviews every PR automatically —
          catching bugs, flagging risky changes, and summarizing what changed,
          before a human ever has to look.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            <IconBrandGithub size={18} />
            Connect your repo
          </Link>
        </div>
      </section>

      {/* Demo screenshot */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <Image
            src="/revyn-demo.png"
            alt="Revyn AI review comment on a GitHub pull request"
            width={1600}
            height={1000}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Feature strip */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <IconMessageCircle className="mb-3" size={22} />
          <h3 className="font-medium mb-1">Inline comments</h3>
          <p className="text-sm text-gray-500">
            Issues flagged exactly where they happen, on the exact line.
          </p>
        </div>
        <div>
          <IconSparkles className="mb-3" size={22} />
          <h3 className="font-medium mb-1">Real bug detection</h3>
          <p className="text-sm text-gray-500">
            Not style nitpicks — logic errors, missing awaits, security smells.
          </p>
        </div>
        <div>
          <IconBrandGithub className="mb-3" size={22} />
          <h3 className="font-medium mb-1">Zero setup</h3>
          <p className="text-sm text-gray-500">
            Install the GitHub App, connect a repo, done.
          </p>
        </div>
      </section>

            {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <span className="text-lg font-semibold">Revyn</span>
              <p className="text-sm text-gray-500 mt-2">
                AI code review for every pull request.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/sign-up" className="hover:text-black">Get started</Link></li>
                <li><Link href="/sign-in" className="hover:text-black">Sign in</Link></li>
                <li><Link href="#" className="hover:text-black">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Docs</Link></li>
                <li><Link href="#" className="hover:text-black">Changelog</Link></li>
                <li>
                  <a
                    href="https://github.com/apps/revyn-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    GitHub App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Codewithpabitra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black"
                  aria-label="GitHub"
                >
                  <IconBrandGithub size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-black"
                  aria-label="X / Twitter"
                >
                  <IconBrandX size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-black"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Revyn. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link href="#" className="hover:text-gray-600">Privacy</Link>
              <Link href="#" className="hover:text-gray-600">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}