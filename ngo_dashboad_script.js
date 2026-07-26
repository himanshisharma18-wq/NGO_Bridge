// --- Required CSS (Add this to your style.css file) ---
/*
.need-row { padding: 15px 0; border-bottom: 1px solid #ddd; width: 100%; }
.need-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.details-box { display: none; width: 100%; margin-top: 15px; padding: 15px; background: #f4f7f6; border-radius: 6px; border-left: 5px solid #007bff; white-space: pre-wrap; box-sizing: border-box; }
*/

// --- Dynamic API Endpoint URL ---
// Automatically switches between Localhost (for local development) and Render (for production)
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://ngo-bridge.onrender.com';

// --- Global State ---
let needs = [
    { id: 1, title: 'Food Drive – Delhi', fullDescription: 'Full description of Food Drive – Delhi...', applicants: 5 },
    { id: 2, title: 'Clothes Donation – Noida', fullDescription: 'Full description of Clothes Donation – Noida...', applicants: 12 }
];
let currentEditId = null;

// --- Global Helper Functions ---

window.toggleDetails = (id) => {
    const detailsDiv = document.getElementById('details-' + id);
    if (detailsDiv) {
        detailsDiv.style.display = (detailsDiv.style.display === "none") ? "block" : "none";
    }
};

window.openEdit = (id) => {
    currentEditId = id;
    const need = needs.find(n => n.id === id);
    const editInput = document.getElementById('editInput');
    if (editInput && need) {
        editInput.value = need.title;
        document.getElementById('editModal').style.display = 'flex';
    }
};

window.closeModal = () => {
    document.getElementById('editModal').style.display = 'none';
};

window.saveEdit = () => {
    const need = needs.find(n => n.id === currentEditId);
    if (need) {
        need.title = document.getElementById('editInput').value;
        window.render(); 
        window.closeModal();
    }
};

// --- Main App Logic ---
document.addEventListener("DOMContentLoaded", () => {
    
    // The Render function: This builds the list dynamically
    function render() {
        const list = document.getElementById('needsList');
        const count = document.getElementById('activeCount');
        if (count) count.innerText = needs.length;
        
        if (list) {
            list.innerHTML = '';

            needs.forEach(need => {
                const div = document.createElement('div');
                div.className = 'need-row'; 
                
                // The HTML structure is now strictly Header (Flex) + Details (Block)
                div.innerHTML = `
                    <div class="need-header">
                        <div class="need-details">
                            <strong>${need.title}</strong><br>
                            <small style="color:gray">Item ${need.id}</small>
                        </div>
                        <div style="white-space: nowrap;">
                            <button class="btn-edit" onclick="openEdit(${need.id})">Edit</button>
                            <button class="btn-view" onclick="toggleDetails(${need.id})">View Post Details</button>
                        </div>
                    </div>
                    
                    <div id="details-${need.id}" class="details-box">
                        ${need.fullDescription}
                    </div>
                `;
                list.appendChild(div);
            });
        }
    }

    // Expose render to the global scope
    window.render = render; 

    // --- Generate Button ---
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.onclick = async () => {
            const inputField = document.getElementById("missionInput");
            const statusMsg = document.getElementById('statusMessage');
            const promptText = inputField.value.trim();

            if (!promptText) return alert("Please describe your need first!");

            if (statusMsg) {
                statusMsg.innerText = "AI is thinking...";
                statusMsg.style.color = "blue";
            }
            
            try {
                // Dynamically uses API_BASE_URL (http://localhost:3000 or https://ngo-bridge.onrender.com)
                const response = await fetch(`${API_BASE_URL}/api/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: promptText })
                });

                const data = await response.json();
                if (response.ok && data.text) {
                    inputField.value = data.text.trim();
                    if (statusMsg) {
                        statusMsg.innerText = "✅ Generated!";
                        statusMsg.style.color = "green";
                    }
                } else {
                    throw new Error(data.error || "Failed to generate");
                }
            } catch (error) {
                console.error("Generation Error:", error);
                if (statusMsg) {
                    statusMsg.innerText = "❌ Error: Could not generate.";
                    statusMsg.style.color = "red";
                }
            }
        };
    }

    // --- Post Button ---
    const postFinalBtn = document.getElementById('postFinalBtn');
    if (postFinalBtn) {
        postFinalBtn.onclick = () => {
            const inputField = document.getElementById("missionInput");
            const fullText = inputField.value.trim();
            
            if (!fullText) return alert("Generate a post first!");

            needs.unshift({
                id: Date.now(),
                title: fullText.split('\n')[0],
                fullDescription: fullText,
                applicants: 0
            });
            
            render(); // Re-render the list
            inputField.value = ''; 
        };
    }

    render(); // Initial call
});