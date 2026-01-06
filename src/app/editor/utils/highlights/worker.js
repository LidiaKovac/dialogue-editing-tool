
self.addEventListener("message", async (e) => {
    const { chunk, adv } = e.data;
    try {
        console.log("worker received message");
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/v2/analyze?adverb=${adv ? "true" : "false"}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chunk, names: [] }),
        });
        const result = await res.json();
        self.postMessage({ type: "analysis", result });
    } catch (error) {
        self.postMessage({ type: "error", error: String(error) });
    }
});