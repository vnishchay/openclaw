
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjA0NDM4MjQxLTVmYmItNGRlNy1hMDA0LWZiYWE5ZjAyNzZkYyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzA2NzM1MDYsImV4cCI6MTkyODQ2MTUwNn0.3tzJs5hIBLRbk6qEtUDWV6-4CzCHecg7SSAWtwQ6DJI";

async function run() {
    const url = "https://kilocode.ai/api/openrouter/chat/completions";
    const modelId = "minimax/minimax-m2.1"; // The one that worked

    console.log(`Testing POST to ${url} WITHOUT custom headers`);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
                // NO Origin/Referer
            },
            body: JSON.stringify({
                model: modelId,
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Body: ${text.substring(0, 300)}`);
    } catch (e) {
        console.error(e);
    }
}

run();
