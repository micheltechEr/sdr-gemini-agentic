import Fastify from 'fastify';
import { runSdrAgent } from './sdrAgent';

const app = Fastify({ logger: true });

app.post('/chat/sdr', async (req, reply) => {
  const { message } = req.body as { message: string };

  if (!message) return reply.status(400).send({ error: "Message required" });

  try {
    const response = await runSdrAgent(message);
    return { response };
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro interno no Agente SDR" });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("🚀 Server SDR rodando na porta 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();