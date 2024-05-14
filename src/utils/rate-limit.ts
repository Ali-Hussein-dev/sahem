import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest } from "next/server";



export async function checkRateLimit(req: NextRequest, count = 4) {
    const rateLimit = new Ratelimit({
        redis: Redis.fromEnv(),
        analytics: true,
        limiter: Ratelimit.slidingWindow(count, "5s"),
    });
    const id = req.ip ?? "anonymous";
    const limit = await rateLimit.limit(id ?? "anonymous");
    const { success } = limit;
    console.log("limit", limit.limit)
    if (!success) {
        console.warn("⚠️ Too many requests come from: ", req.geo?.country)
        console.warn(req.headers.get("User-Agent"))
        // const url = new URL(req.url).origin + "/?msg=Too many requests"
        return Response.json({ msg: "⚠️ Too many requests" }, { status: 429 })
    }
    return null;
}