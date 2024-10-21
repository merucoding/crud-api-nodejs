import cluster from "cluster";
import { availableParallelism } from "os";
import process from "process";
import http from "http";
import { server } from "./app";
import dotenv from 'dotenv';

dotenv.config();
const cpus = availableParallelism();

if (cluster.isPrimary) {
  console.log("Master process started");

  const workers: number[] = [];
  let currWorker = 0;

  for (let i = 1; i < cpus; i++) {
    const worker = cluster.fork();
    const workerPid = worker.process.pid;
    if (workerPid) workers.push(workerPid);
  }

  // console.log(workers);

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  const PORT_2 = process.env.PORT_2 || 4000;

  const loadBalancer = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    currWorker += 1;

    if (currWorker >= cpus) {
      currWorker = 0;
    }

    const workerPort = +PORT_2 + 1 + currWorker;
  });

  loadBalancer.listen(PORT_2, () => {
    console.log(`Load balancer on port ${PORT_2}`);
  });
} else if (cluster.isWorker) {
  console.log(`Worker ${process.pid} running`);
}
