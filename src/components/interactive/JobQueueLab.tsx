"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ui/Button";
import { addJobs, createSim, crashWorker, step, submitDuplicate, type Sim } from "@/lib/queue-sim";
import { cn } from "@/lib/cn";
import { thud } from "@/lib/haptics";

type Action = { t: "step" } | { t: "crash"; id?: number } | { t: "dup" } | { t: "add"; n: number } | { t: "reset" };
const reducer = (s: Sim, a: Action): Sim =>
  a.t === "step" ? step(s) : a.t === "crash" ? crashWorker(s, a.id) : a.t === "dup" ? submitDuplicate(s) : a.t === "add" ? addJobs(s, a.n) : createSim();

/** Playable version of the durable Postgres job queue: kill a worker and watch the lease expire and the job retry. */
export function JobQueueLab() {
  const [s, dispatch] = useReducer(reducer, undefined, () => createSim());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => dispatch({ t: "step" }), 260);
    return () => clearInterval(id);
  }, [running]);

  const queued = s.jobs.filter((j) => j.status === "queued").length;

  return (
    <div className="glass p-5 md:p-8">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => { thud(); dispatch({ t: "crash" }); }}>💥 Crash a worker</Button>
        <Button variant="glass" onClick={() => dispatch({ t: "dup" })}>Submit duplicate</Button>
        <Button variant="glass" onClick={() => dispatch({ t: "add", n: 10 })}>+10 products</Button>
        <Button variant="ghost" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Resume"}</Button>
        <Button variant="ghost" onClick={() => dispatch({ t: "reset" })}>Reset</Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.4fr]">
        {/* queue */}
        <div className="glass-inner p-4">
          <p className="eyebrow mb-3 flex justify-between"><span>Queue</span><span className="tnum">{queued} waiting</span></p>
          <ul className="flex min-h-14 flex-wrap gap-1.5" aria-label="Queued jobs">
            <AnimatePresence initial={false}>
              {s.jobs.filter((j) => j.status === "queued").slice(0, 36).map((j) => (
                <motion.li key={j.id} layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}
                  className={cn("tnum rounded-md border px-2 py-1 text-[0.68rem]", j.attempts > 0 ? "border-accent text-accent" : "border-[var(--line)] text-[var(--paper-dim)]")}>
                  {j.key}{j.attempts > 0 && " ↻"}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* workers */}
        <div className="grid gap-3">
          {s.workers.map((w) => {
            const job = s.jobs.find((j) => j.worker === w.id && j.status === "leased");
            return (
              <button key={w.id} onClick={() => { thud(); dispatch({ t: "crash", id: w.id }); }} disabled={!w.alive}
                aria-label={`Worker ${w.id}${w.alive ? ", tap to crash" : ", crashed"}`}
                className={cn("glass-inner relative overflow-hidden p-4 text-left transition-colors duration-200 active:scale-[0.99]", !w.alive && "!border-accent/60 bg-accent/10")}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Worker {w.id}</span>
                  <span className={cn("text-xs", w.alive ? "text-[var(--paper-dim)]" : "text-accent")}>
                    {!w.alive ? "crashed · lease will expire" : job ? job.key : "idle"}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div className={cn("h-full rounded-full transition-[width] duration-200 ease-out", w.alive ? "bg-accent" : "bg-accent/40")} style={{ width: `${job?.progress ?? 0}%` }} />
                </div>
                {job && (
                  <div className="mt-2 flex gap-1" aria-hidden>
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i} className={cn("h-1 flex-1 rounded-full", i < Math.max(0, job.leaseUntil - s.tick) ? "bg-white/40" : "bg-white/10")} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
          <p className="hand text-lg text-[var(--paper-dim)]">↑ the faint bar is the lease; a crashed worker stops renewing it.</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["Done", `${s.completed}`], ["Retries", `${s.retries}`], ["Deduped", `${s.deduped}`], ["Spend", `$${s.cost.toFixed(2)}`]].map(([k, v]) => (
          <div key={k} className="glass-inner p-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="tnum font-display mt-1 text-2xl">{v}</dd>
          </div>
        ))}
      </dl>

      <ol className="mt-4 space-y-1 text-sm" aria-live="polite" aria-label="Event log">
        {s.log.length === 0 && <li className="text-[var(--paper-faint)]">Waiting for events… try crashing a worker.</li>}
        {s.log.map((l) => (
          <li key={l.id} className={cn("tnum flex gap-3", l.kind === "warn" ? "text-accent" : l.kind === "ok" ? "text-paper" : "text-[var(--paper-dim)]")}>
            <span className="text-[var(--paper-faint)]">t{l.tick}</span>{l.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
