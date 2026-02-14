
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjA0NDM4MjQxLTVmYmItNGRlNy1hMDA0LWZiYWE5ZjAyNzZkYyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzA2NzM1MDYsImV4cCI6MTkyODQ2MTUwNn0.3tzJs5hIBLRbk6qEtUDWV6-4CzCHecg7SSAWtwQ6DJI";

async function run() {
    // 1. Get Models
    console.log("Getting models...");
    const modelsUrl = "https://kilocode.ai/api/openrouter/models";
    try {
        const response = await fetch(modelsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Models found:", data.data.length);
            // Search for minimax
            const minimax = data.data.find(m => m.id.includes("minimax"));
            console.log("Minimax model:", minimax ? minimax.id : "Not found");

            // Try POST with the first model found or kilo/auto
            const modelId = minimax ? minimax.id : data.data[0].id;
            console.log(`Testing Chat POST with model: ${modelId}`);

            await tryChat("https://kilocode.ai/api/openrouter/chat/completions", modelId);
        } else {
            console.log(`Models failed: ${response.status}`);
        }

    } catch (e) {
        console.error(e);
    }
}

async function tryChat(url, modelId) {
    console.log(`Testing POST to ${url}`);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
                // Try adding Referer/Origin just in case
                "Origin": "https://kilocode.ai",
                "Referer": "https://kilocode.ai/"
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
