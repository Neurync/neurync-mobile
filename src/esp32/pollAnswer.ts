import { ESP32_IP } from "@/env";

export function pollAnswer(): Promise<string> {
  const ONE_SECOND = 1000;

  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://${ESP32_IP}/answer`);
        const answer = await response.text();

        if (answer === 'yes' || answer === 'no') {
          clearInterval(interval);
          resolve(answer);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, ONE_SECOND * 2);
  });
}