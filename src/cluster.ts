import cluster from "cluster";
import { availableParallelism } from "os";
import process from "process";
import http from "http";
import { server } from "./app";
import dotenv from "dotenv";

dotenv.config();

const cpus = availableParallelism();
const PORT_2: any = process.env.PORT_2 || 4000;
let count = 0;

if (cluster.isPrimary) {
  console.log(`CPUs: ${cpus}`);
  console.log(`Master started. Pid: ${process.pid}`);
  const workers: { pid: number; port: number }[] = [];

  for (let i = 1; i < cpus; i++) {
    const worker = cluster.fork();
    const workerPid = worker.process.pid;
    const workerPort = +PORT_2 + i;

    if (workerPid) {
      workers.push({ pid: workerPid, port: workerPort });
      worker.send({ pid: workerPid, port: workerPort });
    }

    worker.on("exit", () => {
      console.log(`Worker ${worker.process.pid} has completed work`);
      console.log("Starting another worker");
      cluster.fork();
    });
  }

  // console.log(workers);

  const masterServer = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    const workerIndex = count % workers.length;
    const worker = workers[workerIndex];

    const options = {
      hostname: "localhost",
      port: worker.port,
      path: request.url,
      method: request.method,
      headers: request.headers,
    };

    const proxyRequest = http.request(options, (workerResponse) => {
      workerResponse.pipe(response, { end: true });
    });

    request.pipe(proxyRequest, { end: true });
    count++;
  });

  masterServer.listen(PORT_2, () => {
    console.log(`Master server running at http://localhost:${PORT_2}/`);
  });
} else {
  process.on("message", ({ pid, port }) => {
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
      console.log(`Worker started at ${pid}`);
    });
  });
}
