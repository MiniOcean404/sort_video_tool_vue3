import WorkerC from "./WorkerCompress?worker"
import WorkerP from "./WorkerPreview?worker"
import { workerC, workerP, message } from "./transform"

export function useWorkerHandler() {
  workerC = new WorkerC()
  workerP = new WorkerP()
  workerC.addEventListener("message", message)
  workerP.addEventListener("message", message)

  // return () => {
  //   workerC!.removeEventListener("message", message)
  //   workerP!.removeEventListener("message", message)
  //   workerC!.terminate()
  //   workerP!.terminate()
  //   workerC = null
  //   workerP = null
  // }
}
