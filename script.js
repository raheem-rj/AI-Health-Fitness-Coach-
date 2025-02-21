const chatbox = document.getElementById("chatbox");

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    let userMessage = `<p><strong>You:</strong> ${userInput}</p>`;
    chatbox.innerHTML += userMessage;
    document.getElementById("userInput").value = "";

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{role: "system", content: "You are a helpful AI fitness coach."}, {role: "user", content: userInput}]
        })
    });

    const data = await response.json();
    let aiMessage = `<p><strong>AI Coach:</strong> ${data.choices[0].message.content}</p>`;
    chatbox.innerHTML += aiMessage;
}
