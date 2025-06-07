import env from "./env";
import server from "./src/app";

const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`\u{1F9DE} Listening on port ${PORT}...`);
});
