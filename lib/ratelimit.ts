import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/database/redis";

// Create a new ratelimiter, that allows 10 requests every 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
