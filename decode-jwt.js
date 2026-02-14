
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjA0NDM4MjQxLTVmYmItNGRlNy1hMDA0LWZiYWE5ZjAyNzZkYyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzA2NzM1MDYsImV4cCI6MTkyODQ2MTUwNn0.3tzJs5hIBLRbk6qEtUDWV6-4CzCHecg7SSAWtwQ6DJI";

function decodeJwt(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return "Invalid JWT parts";
        const payload = parts[1];
        const padding = '='.repeat((4 - payload.length % 4) % 4);
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/') + padding;
        const json = atob(base64);
        return JSON.parse(json);
    } catch (e) {
        return "Error decoding: " + e.message;
    }
}

console.log("Decoded JWT Payload:", JSON.stringify(decodeJwt(apiKey), null, 2));
