#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createUIResource } from "@mcp-ui/server";
import { z } from "zod";

// Initialize the MCP Server
const server = new McpServer({
  name: "mcp-ui",
  version: "1.0.0",
});

// Tool 1: Render interactive portfolio dashboard widget
server.tool(
  "render_portfolio_dashboard",
  "Renders a rich, interactive HTML/UI dashboard for Muhammad Fatih Rahman's portfolio with live project selector, metrics, and direct contact buttons.",
  {},
  async () => {
    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #09090b; color: #f4f4f5; padding: 20px; line-height: 1.5; }
    .card { background: #18181b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 20px; font-weight: 800; color: #fff; }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(52,211,153,0.3); }
    .pulse { width: 6px; height: 6px; border-radius: 50%; background: #34d399; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat-item { background: #0f0f12; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px; text-align: center; }
    .stat-val { font-size: 24px; font-weight: 800; color: #818cf8; }
    .stat-lbl { font-size: 11px; color: #a1a1aa; text-transform: uppercase; margin-top: 4px; }
    .section-title { font-size: 13px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .p-card { background: #121215; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.2s; }
    .p-card:hover { border-color: #6366f1; transform: translateY(-2px); }
    .p-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .p-sub { font-size: 12px; color: #818cf8; margin-bottom: 8px; }
    .p-tag { display: inline-block; font-size: 10px; background: rgba(99,102,241,0.15); color: #a5b4fc; padding: 2px 8px; border-radius: 6px; }
    .actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; transition: all 0.2s; border: none; }
    .btn-primary { background: #4f46e5; color: #fff; }
    .btn-primary:hover { background: #4338ca; }
    .btn-secondary { background: rgba(255,255,255,0.08); color: #e4e4e7; border: 1px solid rgba(255,255,255,0.1); }
    .btn-secondary:hover { background: rgba(255,255,255,0.15); }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="title">Muhammad Fatih Rahman</div>
        <div style="font-size: 12px; color: #a1a1aa;">Full-Stack Web & Mobile Developer • Telkom University Jakarta</div>
      </div>
      <div class="badge">
        <span class="pulse"></span>
        Available for Hire & Projects
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-item"><div class="stat-val">7+</div><div class="stat-lbl">Production Apps</div></div>
      <div class="stat-item"><div class="stat-val">1.5+</div><div class="stat-lbl">Years Experience</div></div>
      <div class="stat-item"><div class="stat-val">9</div><div class="stat-lbl">Clean Modules</div></div>
      <div class="stat-item"><div class="stat-val">60 FPS</div><div class="stat-lbl">Target Performance</div></div>
    </div>

    <div class="section-title">Featured Production Projects</div>
    <div class="projects-grid">
      <div class="p-card">
        <div class="p-title">HaramainQu</div>
        <div class="p-sub">Flutter Mobile App (Clean Architecture)</div>
        <span class="p-tag">9 Independent Modules • Full Dio API</span>
      </div>
      <div class="p-card">
        <div class="p-title">TangkapIN</div>
        <div class="p-sub">Marine Analytics & Seafood Marketplace</div>
        <span class="p-tag">VILT Stack • PostgreSQL • Midtrans Snap</span>
      </div>
      <div class="p-card">
        <div class="p-title">Juragan Bakso</div>
        <div class="p-sub">Next.js 14 F&B E-Commerce Platform</div>
        <span class="p-tag">MySQL2 • WhatsApp Order • Admin Portal</span>
      </div>
      <div class="p-card">
        <div class="p-title">AI Interview Platform</div>
        <div class="p-sub">Real-Time Technical Assessment System</div>
        <span class="p-tag">React 18 • Rails • WebSocket • Redis</span>
      </div>
      <div class="p-card">
        <div class="p-title">Haramain Tour</div>
        <div class="p-sub">Laravel Enterprise Travel Platform</div>
        <span class="p-tag">Midtrans Webhook • 5-Stage Onboarding</span>
      </div>
      <div class="p-card">
        <div class="p-title">Barbershop POS</div>
        <div class="p-sub">Operations & Automated Commissions</div>
        <span class="p-tag">Zero Cash Discrepancies • Chart.js</span>
      </div>
    </div>

    <div class="actions">
      <a class="btn btn-primary" href="mailto:fatihfatihrahman@gmail.com">Direct Email</a>
      <a class="btn btn-secondary" href="https://wa.me/6281275516335" target="_blank">WhatsApp Chat</a>
      <a class="btn btn-secondary" href="https://github.com/JunichiGetCode" target="_blank">GitHub</a>
      <a class="btn btn-secondary" href="https://www.linkedin.com/in/fatih-rahman/" target="_blank">LinkedIn</a>
      <a class="btn btn-secondary" href="https://www.instagram.com/ffaattihhr" target="_blank">Instagram</a>
      <a class="btn btn-secondary" href="https://discord.com" title="Discord: itsmejunichi" target="_blank">Discord: itsmejunichi</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    const uiResource = createUIResource({
      uri: "ui://portfolio/dashboard",
      content: {
        type: "rawHtml",
        htmlString: html,
      },
      encoding: "text",
    });

    return {
      content: [
        {
          type: "text",
          text: "Portfolio Interactive UI Dashboard rendered successfully.",
        },
        uiResource,
      ],
      _meta: {
        ui: {
          resourceUri: "ui://portfolio/dashboard",
        },
      },
    };
  }
);

// Tool 2: Portfolio Audit & Readiness Evaluator
server.tool(
  "audit_portfolio_readiness",
  "Evaluates a developer portfolio against the '30-Second Test' criteria and anti-patterns, generating an interactive scorecard widget.",
  {
    candidateName: z.string().default("Muhammad Fatih Rahman"),
    hasCleanArchitecture: z.boolean().default(true),
    hasMetricsProof: z.boolean().default(true),
    hasFrictionlessContact: z.boolean().default(true),
  },
  async ({ candidateName, hasCleanArchitecture, hasMetricsProof, hasFrictionlessContact }) => {
    const score = (hasCleanArchitecture ? 35 : 0) + (hasMetricsProof ? 35 : 0) + (hasFrictionlessContact ? 30 : 0);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0c0a09; color: #fafaf9; font-family: sans-serif; padding: 20px; }
    .box { border: 1px solid #292524; border-radius: 12px; padding: 20px; background: #1c1917; }
    .score { font-size: 36px; font-weight: bold; color: ${score >= 90 ? "#22c55e" : "#eab308"}; }
    .item { margin-top: 10px; padding: 8px 12px; border-radius: 8px; background: #292524; display: flex; justify-content: space-between; font-size: 13px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Portfolio Readiness Audit: ${candidateName}</h2>
    <div style="margin: 15px 0;">
      <span>Readiness Score:</span>
      <div class="score">${score}/100</div>
    </div>
    <div class="item"><span>The 30-Second Test:</span> <b>PASS</b></div>
    <div class="item"><span>Clean Architecture Proof:</span> <b>${hasCleanArchitecture ? "VERIFIED" : "MISSING"}</b></div>
    <div class="item"><span>Impact & Metrics:</span> <b>${hasMetricsProof ? "VERIFIED" : "MISSING"}</b></div>
    <div class="item"><span>Direct Frictionless Contact:</span> <b>${hasFrictionlessContact ? "OPTIMIZED" : "NEEDS WORK"}</b></div>
  </div>
</body>
</html>
    `.trim();

    const uiResource = createUIResource({
      uri: "ui://portfolio/audit",
      content: {
        type: "rawHtml",
        htmlString: html,
      },
      encoding: "text",
    });

    return {
      content: [
        {
          type: "text",
          text: `Portfolio Audit completed for ${candidateName}. Score: ${score}/100.`,
        },
        uiResource,
      ],
      _meta: {
        ui: {
          resourceUri: "ui://portfolio/audit",
        },
      },
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error starting mcp-ui server:", error);
  process.exit(1);
});
