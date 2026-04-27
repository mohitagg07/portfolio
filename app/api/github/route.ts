import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(
      "https://api.github.com/users/mohitagg07/repos?sort=pushed&per_page=50&type=public",
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();

    // Count ALL repos that have a live homepage link (regardless of description)
    const liveRepos = data.filter(
      (r: { fork: boolean; homepage: string | null; name: string }) =>
        !r.fork &&
        r.homepage &&
        r.homepage.trim() !== "" &&
        r.name !== "mohitagg07"
    );

    // For the Projects section: prefer repos with descriptions, fall back to all live
    const projects = liveRepos
      .slice(0, 6)
      .map((r: {
        id: number;
        name: string;
        description: string | null;
        homepage: string;
        html_url: string;
        pushed_at: string;
        language: string | null;
        stargazers_count: number;
      }) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        homepage: r.homepage,
        html_url: r.html_url,
        pushed_at: r.pushed_at,
        language: r.language,
        stars: r.stargazers_count,
      }));

    return NextResponse.json({ projects, total: liveRepos.length });
  } catch (e) {
    return NextResponse.json({ projects: [], total: 0, error: String(e) }, { status: 500 });
  }
}
