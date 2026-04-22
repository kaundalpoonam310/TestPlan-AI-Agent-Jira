import JiraClient from 'jira-client';
import { encrypt, decrypt } from '../utils/encryption.js';
import { getDb } from './database.js';

let jiraClient = null;

export async function initJiraClient() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get('SELECT * FROM jira_config WHERE id = 1', async (err, row) => {
      if (err || !row || !row.base_url) {
        console.log('JIRA config not found or missing base_url');
        jiraClient = null;
        resolve(null);
        return;
      }
      
      console.log('Initializing JIRA client with host:', row.base_url);
      
      try {
        const decryptedToken = decrypt(row.api_token_encrypted);
        console.log('Token decrypted:', decryptedToken ? 'success' : 'FAILED - got null');
        
        if (!decryptedToken) {
          throw new Error('Failed to decrypt API token. The encryption key may have changed.');
        }
        
        jiraClient = new JiraClient({
          protocol: 'https',
          host: row.base_url.replace('https://', '').replace('http://', ''),
          username: row.username,
          password: decryptedToken,
          apiVersion: 3,
          strictSSL: true
        });
        
        console.log('Testing JIRA connection...');
        const user = await jiraClient.getCurrentUser();
        console.log('JIRA connected as:', user.displayName);
        resolve(user);
      } catch (err) {
        jiraClient = null;
        console.error('JIRA init error:', err.message);
        reject(err);
      }
    });
  });
}

export async function testConnection(config) {
  const { baseUrl, username, apiToken } = config;
  
  const host = baseUrl.replace('https://', '').replace('http://', '');
  const testJira = new JiraClient({
    protocol: 'https',
    host: host,
    username: username,
    password: apiToken,
    apiVersion: 3,
    strictSSL: true
  });
  
  try {
    const user = await testJira.getCurrentUser();
    return { connected: true, user };
  } catch (err) {
    throw new Error(`JIRA connection failed: ${err.message}`);
  }
}

export async function fetchTicket(ticketId) {
  if (!jiraClient) {
    throw new Error('JIRA not configured. Please configure JIRA in Settings.');
  }
  
  try {
    const issue = await jiraClient.findIssue(ticketId);
    
    const description = issue.fields.description;
    const plainDescription = extractTextFromAdf(description);
    
    const ticketData = {
      ticketId: issue.key,
      summary: issue.fields.summary,
      description: plainDescription,
      priority: issue.fields.priority?.name || 'Unknown',
      status: issue.fields.status?.name || 'Unknown',
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      labels: issue.fields.labels || [],
      acceptanceCriteria: issue.fields.customfield_10020 || [],
      attachments: (issue.fields.attachment || []).map(a => ({
        filename: a.filename,
        url: a.content
      })),
      fetchedAt: new Date().toISOString()
    };
    
    return ticketData;
  } catch (err) {
    throw new Error(`Failed to fetch ticket ${ticketId}: ${err.message}`);
  }
}

function extractTextFromAdf(adf) {
  if (!adf || typeof adf === 'string') return adf || '';
  if (!adf.content) return '';
  
  const texts = [];
  const processNode = (node) => {
    if (node.type === 'text' && node.text) {
      texts.push(node.text);
    }
    if (node.content) {
      node.content.forEach(processNode);
    }
  };
  adf.content.forEach(processNode);
  return texts.join('\n');
}

export async function saveJiraConfig(config) {
  const { baseUrl, username, apiToken } = config;
  
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.run(
      `INSERT OR REPLACE INTO jira_config 
       (id, base_url, username, api_token_encrypted, connected, last_verified) 
       VALUES (1, ?, ?, ?, ?, ?)`,
      [baseUrl, username, encrypt(apiToken), 1, new Date().toISOString()],
      async (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        await initJiraClient();
        resolve();
      }
    );
  });
}

export async function getJiraConnectionStatus() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get('SELECT connected, last_verified FROM jira_config WHERE id = 1', (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
}
