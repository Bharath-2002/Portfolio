/**
 * Pure simulation of a durable job queue: leases, heartbeats, crash recovery,
 * retries, idempotency keys, per-call cost metering. No React in here.
 */
export type JobStatus = "queued" | "leased" | "done";
export type Job = { id: number; key: string; status: JobStatus; worker: number | null; leaseUntil: number; progress: number; attempts: number };
export type Worker = { id: number; alive: boolean; reviveAt: number };
export type LogLine = { id: number; tick: number; kind: "info" | "warn" | "ok"; text: string };
export type Sim = { tick: number; jobs: Job[]; workers: Worker[]; cost: number; log: LogLine[]; nextId: number; logId: number; deduped: number };

export const LEASE_TICKS = 10; // lease lasts 10 ticks without a heartbeat
export const COST_PER_CALL = 0.04;
const REVIVE_AFTER = 28;
const RATE = 7; // % per tick

const log = (s: Sim, kind: LogLine["kind"], text: string): Sim => ({
  ...s,
  logId: s.logId + 1,
  log: [{ id: s.logId, tick: s.tick, kind, text }, ...s.log].slice(0, 7),
});

export function createSim(jobCount = 12, workerCount = 3): Sim {
  return {
    tick: 0,
    nextId: jobCount + 1,
    logId: 0,
    deduped: 0,
    cost: 0,
    log: [],
    workers: Array.from({ length: workerCount }, (_, i) => ({ id: i + 1, alive: true, reviveAt: 0 })),
    jobs: Array.from({ length: jobCount }, (_, i) => ({
      id: i + 1, key: `sku-${1000 + i}`, status: "queued", worker: null, leaseUntil: 0, progress: 0, attempts: 0,
    })),
  };
}

export function addJobs(s: Sim, n: number): Sim {
  const jobs = [...s.jobs];
  for (let i = 0; i < n; i++) {
    const id = s.nextId + i;
    jobs.push({ id, key: `sku-${1000 + id - 1}`, status: "queued", worker: null, leaseUntil: 0, progress: 0, attempts: 0 });
  }
  return log({ ...s, jobs, nextId: s.nextId + n }, "info", `enqueued ${n} products`);
}

/** Submitting the same idempotency key twice is a no-op. */
export function submitDuplicate(s: Sim): Sim {
  const target = s.jobs.find((j) => j.status !== "done") ?? s.jobs[s.jobs.length - 1];
  if (!target) return s;
  return log({ ...s, deduped: s.deduped + 1 }, "warn", `duplicate "${target.key}" ignored (idempotency key)`);
}

export function crashWorker(s: Sim, id?: number): Sim {
  const alive = s.workers.filter((w) => w.alive);
  const victim = id ? s.workers.find((w) => w.id === id && w.alive) : alive.find((w) => s.jobs.some((j) => j.worker === w.id)) ?? alive[0];
  if (!victim) return s;
  return log(
    { ...s, workers: s.workers.map((w) => (w.id === victim.id ? { ...w, alive: false, reviveAt: s.tick + REVIVE_AFTER } : w)) },
    "warn",
    `worker ${victim.id} crashed mid-job`,
  );
}

export function step(prev: Sim): Sim {
  let s: Sim = { ...prev, tick: prev.tick + 1 };
  const jobs = s.jobs.map((j) => ({ ...j }));
  const workers = s.workers.map((w) => ({ ...w }));
  let cost = s.cost;
  const events: [LogLine["kind"], string][] = [];

  // revive
  for (const w of workers) if (!w.alive && s.tick >= w.reviveAt) { w.alive = true; events.push(["info", `worker ${w.id} restarted`]); }

  // lease sweep: any leased job whose lease expired goes back to the queue
  for (const j of jobs) {
    if (j.status === "leased" && s.tick > j.leaseUntil) {
      events.push(["warn", `lease expired on ${j.key} → requeued (attempt ${j.attempts + 1} next)`]);
      j.status = "queued"; j.worker = null; j.progress = 0;
    }
  }

  // work
  for (const w of workers) {
    if (!w.alive) continue;
    let job = jobs.find((j) => j.worker === w.id && j.status === "leased");
    if (!job) {
      job = jobs.find((j) => j.status === "queued");
      if (job) { job.status = "leased"; job.worker = w.id; job.attempts += 1; job.progress = 0; if (job.attempts > 1) events.push(["info", `worker ${w.id} picked up ${job.key} (retry ${job.attempts - 1})`]); }
    }
    if (job) {
      job.leaseUntil = s.tick + LEASE_TICKS; // heartbeat
      job.progress = Math.min(100, job.progress + RATE);
      if (job.progress >= 100) {
        job.status = "done"; job.worker = null; cost += COST_PER_CALL;
        events.push(["ok", `${job.key} done · +$${COST_PER_CALL.toFixed(2)}`]);
      }
    }
  }

  s = { ...s, jobs, workers, cost };
  for (const [k, t] of events.slice(0, 3)) s = log(s, k, t);
  return s;
}
