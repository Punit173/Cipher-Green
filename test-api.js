import { base44 } from './src/api/base44Client.js';

async function test() {
    try {
        const analysisResult = await base44.integrations.Core.InvokeLLM({
            prompt: "Test prompt",
        });
        console.log("Success:", analysisResult);
    } catch (err) {
        console.error("Error:", err);
    }
}

test();
