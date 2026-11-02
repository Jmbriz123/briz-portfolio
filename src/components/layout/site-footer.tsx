import { profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-fg-muted">&ldquo;{profile.quote}&rdquo;</p>
          <p className="mt-2 font-mono text-xs text-fg-subtle">
            © {new Date().getFullYear()} {profile.name} · bronze → silver → gold
          </p>
        </div>
        <ul className="flex items-center gap-4 text-fg-subtle">
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg">
              <GithubIcon className="size-[18px]" />
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fg">
              <LinkedinIcon className="size-[18px]" />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.links.email}`} aria-label="Email" className="hover:text-fg">
              <Mail className="size-[18px]" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
