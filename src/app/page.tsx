import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-10 sm:py-16">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <LinkList links={profile.links} />

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400">🌳 링크나무</footer>
    </main>
  );
}
