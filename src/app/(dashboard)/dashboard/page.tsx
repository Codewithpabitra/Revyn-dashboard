import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  IconBrandGithub,
  IconCircleCheck,
  IconAlertTriangle,
  IconGitPullRequest,
} from "@tabler/icons-react";

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000";
const GITHUB_APP_INSTALL_URL = "https://github.com/apps/revyn-dev/installations/new";

interface Review {
  id: string;
  repoFullName: string;
  prNumber: number;
  prTitle: string;
  summary: string;
  issuesFound: number;
  createdAt: string;
}

async function getReviews(clerkUserId: string): Promise<Review[]> {
  const res = await fetch(`${SERVER_URL}/api/reviews?clerkUserId=${clerkUserId}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.reviews;
}

export default async function DashboardPage() {
  const { userId } = await auth();
  const reviews = userId ? await getReviews(userId) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold">Revyn</span>
          <UserButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Recent AI reviews across your connected repos
            </p>
          </div>
          <a
            href={GITHUB_APP_INSTALL_URL}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            <IconBrandGithub size={16} />
            Connect a repo
          </a>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
            <IconGitPullRequest size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">
              No reviews yet. Connect a repo and open a pull request to see Revyn in action.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-lg p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <span>{review.repoFullName}</span>
                    <span>·</span>
                    <span>#{review.prNumber}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 truncate">{review.prTitle}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{review.summary}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-sm">
                  {review.issuesFound > 0 ? (
                    <>
                      <IconAlertTriangle size={16} className="text-amber-500" />
                      <span className="text-amber-600 font-medium">{review.issuesFound}</span>
                    </>
                  ) : (
                    <IconCircleCheck size={16} className="text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}