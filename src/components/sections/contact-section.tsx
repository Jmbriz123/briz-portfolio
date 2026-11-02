import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { CopyEmail } from "./copy-email";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 sm:px-12 sm:py-20">
            <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,black_10%,transparent_60%)]" />
            <div className="relative max-w-2xl">
              <span className="font-mono text-xs text-fg-subtle">contact</span>
              <h2 id="contact-title" className="mt-3 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
                Let&apos;s talk about data infrastructure.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                I&apos;m interested in data engineering and AI infrastructure roles. The fastest way to reach me is email.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={`mailto:${profile.links.email}`}>
                  <Mail className="size-4" /> Email me
                </ButtonLink>
                <CopyEmail email={profile.links.email} />
              </div>
              <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
                <li>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-fg-muted hover:text-fg">
                    <LinkedinIcon className="size-4" />
                    <span>
                      LinkedIn <span className="block font-mono text-[11px] text-fg-subtle">{profile.links.linkedinHandle}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-fg-muted hover:text-fg">
                    <GithubIcon className="size-4" />
                    <span>
                      GitHub <span className="block font-mono text-[11px] text-fg-subtle">{profile.links.githubHandle}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={profile.links.resume} download className="group flex items-center gap-3 text-fg-muted hover:text-fg">
                    <Download className="size-4" />
                    <span>
                      Resume <span className="block font-mono text-[11px] text-fg-subtle">PDF</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
