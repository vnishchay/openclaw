
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjA0NDM4MjQxLTVmYmItNGRlNy1hMDA0LWZiYWE5ZjAyNzZkYyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzA2NzM1MDYsImV4cCI6MTkyODQ2MTUwNn0.3tzJs5hIBLRbk6qEtUDWV6-4CzCHecg7SSAWtwQ6DJI";

async function run() {
    console.log("1. GET with minimal headers");
    const getHeaders = { "Authorization": `Bearer ${apiKey}` };
    const getRes = await fetch("https://kilocode.ai/api/openrouter/models", { headers: getHeaders });
    console.log(`GET Status: ${getRes.status}`);

    console.log("\n2. POST with strict headers copied from browser simulation");
    const postHeaders = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Origin": "https://kilocode.ai",
        "Referer": "https://kilocode.ai/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    };

    try {
        const response = await fetch("https://kilocode.ai/api/openrouter/chat/completions", {
            method: "POST",
            headers: postHeaders,
            body: JSON.stringify({
                model: "minimax/minimax-m2.1", // Try explicit model ID from GET list if this fails
                messages: [{ role: "user", content: "Hello" }],
                stream: false
            })
        });

        console.log(`POST Status: ${response.status}`);
        const text = await response.text();
        if (!response.ok) console.log(text);
        else console.log(text.substring(0, 200));

    } catch (e) { console.error(e); }
}

run();
