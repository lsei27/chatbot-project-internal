// Lokální úložiště pro chat historii
const localStorage = {
  leads: [],
  messages: []
};

// Uloží lead lokálně
async function saveLead(threadId, name, email, phone) {
  localStorage.leads.push({ 
    threadId, 
    name, 
    email, 
    phone, 
    createdAt: new Date() 
  });
  console.log('📝 Lead uložen lokálně');
}

// Získá lead podle threadId
async function getLeadByThread(threadId) {
  return localStorage.leads.find(lead => lead.threadId === threadId) || null;
}

// Uloží zprávu lokálně
async function saveMessage(threadId, role, content, timestamp) {
  localStorage.messages.push({ 
    threadId, 
    role, 
    content, 
    timestamp 
  });
  console.log('📝 Zpráva uložena lokálně');
}

// Vrátí všechny leady
async function getAllLeads() {
  return localStorage.leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Vrátí všechny zprávy
async function getAllMessages() {
  return localStorage.messages;
}

// Vrátí všechny zprávy pro daný threadId
async function getMessagesByThread(threadId) {
  return localStorage.messages.filter(msg => msg.threadId === threadId);
}

module.exports = {
  saveLead,
  getLeadByThread,
  saveMessage,
  getAllLeads,
  getAllMessages,
  getMessagesByThread,
}; 