
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjA0NDM4MjQxLTVmYmItNGRlNy1hMDA0LWZiYWE5ZjAyNzZkYyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzA2NzM1MDYsImV4cCI6MTkyODQ2MTUwNn0.3tzJs5hIBLRbk6qEtUDWV6-4CzCHecg7SSAWtwQ6DJI";

async function run() {
    // 1. Get Models (This worked before)
    console.log("1. Testing GET Models (Known Good)");
    try {
        const response = await fetch("https://kilocode.ai/api/openrouter/models", {
            method: "GET",
            headers: { "Authorization": `Bearer ${apiKey}` }
        });
        console.log(`GET Models Status: ${response.status}`);
    } catch (e) { console.error(e); }

    // 2. Chat Completion (This seemingly worked before)
    console.log("\n2. Testing POST Chat with Origin/Referer");
    try {
        const response = await fetch("https://kilocode.ai/api/openrouter/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
                "Origin": "https://kilocode.ai",
                "Referer": "https://kilocode.ai/"
            },
            body: JSON.stringify({
                model: "minimax/minimax-m2.1",
                messages: [{ role: "user", content: "Hello" }]
            })
        });
        console.log(`POST Chat Status: ${response.status}`);
        if (!response.ok) {
            console.log(await response.text());
        }
    } catch (e) { console.error(e); }
}

run();
