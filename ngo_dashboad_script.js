// --- Dynamic API Endpoint URL ---
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://ngo-bridge.onrender.com';

// --- Global State ---
let needs = [
    { id: 1, title: 'Food Drive – Delhi', fullDescription: 'Full description of Food Drive – Delhi...', applicants: 5 },
    { id: 2, title: 'Clothes Donation – Noida', fullDescription: 'Full description of Clothes Donation – Noida...', applicants: 12 }
];
let currentEditId = null;

// --- Global Helper Functions (Exposed to window for inline onclick attributes) ---
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
    const editModal = document.getElementById('editModal');
    if (editInput && need && editModal) {
        editInput.value = need.title;
        editModal.style.display = 'flex';
    }
};

window.closeModal = () => {
    const editModal = document.getElementById('editModal');
    if (editModal) editModal.style.display = 'none';
};

window.saveEdit = () => {
    const need = needs.find(n => n.id === currentEditId);
    const editInput = document.getElementById('editInput');
    if (need && editInput) {
        need.title = editInput.value;
        if (typeof window.render === 'function') window.render(); 
        window.closeModal();
    }
};

// --- Page Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Render Function: Renders the active needs list
    function render() {
        const list = document.getElementById('needsList');
        const count = document.getElementById('activeCount');
        if (count) count.innerText = needs.length;
        
        if (list) {
            list.innerHTML = '';
            needs.forEach(need => {
                const div = document.createElement('div');
                div.className = 'need-row'; 
                
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

    // Expose render function globally
    window.render = render; 

    // --- Generate Button (Gemini AI Integration) ---
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.onclick = async () => {
            const inputField = document.getElementById("missionInput");
            const statusMsg = document.getElementById('statusMessage');
            const promptText = inputField ? inputField.value.trim() : "";

            if (!promptText) return alert("Please describe your need first!");

            if (statusMsg) {
                statusMsg.innerText = "AI is thinking...";
                statusMsg.style.color = "blue";
            }
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: promptText })
                });

                const data = await response.json();
                if (response.ok && data.text) {
                    if (inputField) inputField.value = data.text.trim();
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
            const fullText = inputField ? inputField.value.trim() : "";
            
            if (!fullText) return alert("Generate a post first!");

            needs.unshift({
                id: Date.now(),
                title: fullText.split('\n')[0],
                fullDescription: fullText,
                applicants: 0
            });
            
            render(); 
            if (inputField) inputField.value = ''; 
        };
    }

    render(); // Run initial render on page load
});