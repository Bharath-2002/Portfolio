import type { Metadata } from "next";
import { EarFitter } from "@/components/interactive/EarFitter";
import { JobQueueLab } from "@/components/interactive/JobQueueLab";
import { LayerPoster } from "@/components/interactive/LayerPoster";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Lab" };

const Block = ({ n, title, text, children }: { n: string; title: string; text: string; children: React.ReactNode }) => (
  <section className="mt-20 md:mt-28">
    <Reveal className="mb-8 grid gap-3 md:grid-cols-[auto_1fr] md:gap-10">
      <span className="font-display tnum text-6xl italic leading-none text-accent md:text-8xl">{n}</span>
      <div>
        <h2 className="display-lg !text-[clamp(1.8rem,4vw,3rem)]">{title}</h2>
        <p className="mt-2 max-w-2xl text-[var(--paper-dim)]">{text}</p>
      </div>
    </Reveal>
    <Reveal>{children}</Reveal>
  </section>
);

export default function LabPage() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="eyebrow mb-4">The lab</p>
        <h1 className="display-xl !text-[clamp(2.8rem,9vw,7rem)]">
          Resume bullets, <em>playable.</em>
        </h1>
        <p className="hand mt-4 text-2xl text-accent md:text-3xl">things I shipped, minus the NDA</p>
      </header>

      <Block n="01" title="The queue that survives crashes" text="At BlueStone, bulk generation runs on a durable PostgreSQL job queue: leases, retries, crash recovery, idempotency keys, per-call cost metering. Break it yourself.">
        <JobQueueLab />
      </Block>
      <Block n="02" title="Posters are just stacked layers" text="Template analysis decomposes a brand poster into typed, editable text, image and shape layers with font matching. Drag the slider to see the stack.">
        <LayerPoster />
      </Block>
      <Block n="03" title="Where does the earring go?" text="A YOLO11-pose model finds each ear's piercing and lobe-centre points (0.99 pose mAP50 on 1,090 labelled ears), served through ONNX Runtime to size and place earrings. Do its job by hand.">
        <EarFitter />
      </Block>
    </>
  );
}
