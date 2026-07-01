import { e as createComponent, k as renderHead, r as renderTemplate, l as renderComponent, h as createAstro, g as addAttribute, n as Fragment } from '../chunks/astro/server_DyN4VSCK.mjs';
import 'piccolore';
import { PrismaClient } from '@prisma/client';
/* empty css                                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$GrowlitySecretPanel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GrowlitySecretPanel;
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "growlitysecure";
  let isAuthenticated = Astro2.cookies.get("admin_auth")?.value === "true";
  let error = "";
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const username = data.get("username");
    const password = data.get("password");
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      Astro2.cookies.set("admin_auth", "true", { path: "/" });
      isAuthenticated = true;
    } else {
      error = "Invalid username or password";
    }
  }
  let entries = [];
  if (isAuthenticated) {
    const prisma = new PrismaClient();
    entries = await prisma.contactEntry.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
  return renderTemplate`<html lang="en" data-astro-cid-hw52nqan> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Dashboard — Growlity</title>${renderHead()}</head> <body data-astro-cid-hw52nqan> ${!isAuthenticated ? renderTemplate`<div style="max-width: 400px; margin: 100px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" data-astro-cid-hw52nqan> <h2 style="margin-top: 0; text-align: center;" data-astro-cid-hw52nqan>Admin Access</h2> ${error && renderTemplate`<p style="color: #ef4444; text-align: center; font-size: 14px;" data-astro-cid-hw52nqan>${error}</p>`} <form method="POST" style="display: flex; flex-direction: column; gap: 16px;" data-astro-cid-hw52nqan> <div data-astro-cid-hw52nqan> <label style="font-size: 14px; font-weight: 600; margin-bottom: 8px; display: block;" data-astro-cid-hw52nqan>Username</label> <input type="text" name="username" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" data-astro-cid-hw52nqan> </div> <div data-astro-cid-hw52nqan> <label style="font-size: 14px; font-weight: 600; margin-bottom: 8px; display: block;" data-astro-cid-hw52nqan>Password</label> <input type="password" name="password" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" data-astro-cid-hw52nqan> </div> <button type="submit" style="background: #0f172a; color: white; border: none; padding: 12px; border-radius: 4px; font-weight: 600; cursor: pointer;" data-astro-cid-hw52nqan>Login</button> </form> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-hw52nqan": true }, { "default": async ($$result2) => renderTemplate` <h1 data-astro-cid-hw52nqan>Admin Dashboard - Leads</h1> <table data-astro-cid-hw52nqan> <thead data-astro-cid-hw52nqan> <tr data-astro-cid-hw52nqan> <th data-astro-cid-hw52nqan>ID</th> <th data-astro-cid-hw52nqan>Date</th> <th data-astro-cid-hw52nqan>Name</th> <th data-astro-cid-hw52nqan>Email</th> <th data-astro-cid-hw52nqan>Organization</th> <th data-astro-cid-hw52nqan>Phone</th> </tr> </thead> <tbody data-astro-cid-hw52nqan> ${entries.length === 0 && renderTemplate`<tr data-astro-cid-hw52nqan> <td colspan="6" style="text-align: center; padding: 32px; color: #64748b;" data-astro-cid-hw52nqan>No leads found yet.</td> </tr>`} ${entries.map((entry) => renderTemplate`<tr data-astro-cid-hw52nqan> <td data-astro-cid-hw52nqan>#${entry.id}</td> <td data-astro-cid-hw52nqan>${new Date(entry.createdAt).toLocaleString()}</td> <td style="font-weight: 600;" data-astro-cid-hw52nqan>${entry.name}</td> <td data-astro-cid-hw52nqan><a${addAttribute(`mailto:${entry.email}`, "href")} style="color: #4186f3; text-decoration: none;" data-astro-cid-hw52nqan>${entry.email}</a></td> <td data-astro-cid-hw52nqan>${entry.company}</td> <td data-astro-cid-hw52nqan>${entry.role || "-"}</td> </tr>`)} </tbody> </table> ` })}`} </body></html>`;
}, "D:/Project/G-landing page/src/pages/growlity-secret-panel.astro", void 0);
const $$file = "D:/Project/G-landing page/src/pages/growlity-secret-panel.astro";
const $$url = "/growlity-secret-panel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$GrowlitySecretPanel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
