import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="hand text-3xl text-accent">oops, off the page</p>
        <h1 className="display-xl">404</h1>
        <p className="mt-4 text-[var(--fg-dim)]">This route wandered off, probably to make coffee.</p>
        <div className="mt-6"><ButtonLink href="/">Back home</ButtonLink></div>
      </div>
    </div>
  );
}
