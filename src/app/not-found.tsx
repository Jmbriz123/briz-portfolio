import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-32">
        <p className="font-mono text-xs text-fg-subtle">404 · record not found</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg">This page didn&apos;t make it through the pipeline.</h1>
        <ButtonLink href="/" variant="secondary" className="mt-8">
          Back to portfolio
        </ButtonLink>
      </Container>
    </main>
  );
}
