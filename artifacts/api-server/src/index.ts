import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env["API_PORT"] ?? 8080);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid API_PORT value: "${process.env["API_PORT"]}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
