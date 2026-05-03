import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const AUTHOR = {
  name: "Akela Bhai",
  title: "Web Designer",
  bio: "I'm a passionate web designer and developer who loves crafting beautiful, functional digital experiences. I write about design, development, and the occasional life lesson.",
  avatar: "https://i.ibb.co/1G7Jc35m/100008591.jpg",
  socials: {
    github: "https://github.com/akelabhaiji",
    instagram: "https://instagram.com/akelajiofficial",
    twitter: "https://twitter.com/akelajiofficial",
    linkedin: "https://linkedin.com/in/akelajiofficial",
    facebook: "https://facebook.com/akelajiofficial",
  },
};

const CATEGORIES = ["Design", "Development", "CSS", "JavaScript", "Career", "Tools"];
const ALL_TAGS = ["nextjs", "react", "tailwind", "figma", "ux", "ui", "css", "seo", "performance", "typography"];

const POSTS = [
  {
    id: 1, slug: "modern-web-design-principles",
    title: "Modern Web Design Principles Every Designer Must Know",
    excerpt: "Explore the core principles that separate good design from great design in the modern web landscape.",
    content: `<p>Web design has evolved dramatically over the past decade. What once required deep technical knowledge can now be accomplished with powerful tools and frameworks, but the fundamental principles of good design remain constant.</p><h2>1. Visual Hierarchy</h2><p>Visual hierarchy guides the user's eye through your design, helping them understand what's most important. Use size, color, contrast, and spacing to create a clear path.</p><h2>2. Whitespace is Your Friend</h2><p>Don't fear empty space. Whitespace gives content room to breathe and helps users focus on what matters. Crowded designs are overwhelming; clean designs convert better.</p><h2>3. Typography Sets the Tone</h2><p>Your choice of fonts communicates personality before a single word is read. Invest time in choosing type that reflects your brand's character.</p><h2>4. Consistency Builds Trust</h2><p>Consistent design patterns reduce cognitive load. When users learn your interface once, they shouldn't have to relearn it on every page.</p><h2>5. Mobile-First Thinking</h2><p>With over 60% of web traffic coming from mobile devices, designing for small screens first ensures your core experience is solid before adding complexity for larger displays.</p>`,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    category: "Design",
    tags: ["ui", "ux", "figma"],
    date: "2025-04-28",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 2, slug: "nextjs-14-complete-guide",
    title: "Next.js 14: The Complete Guide for Modern Web Development",
    excerpt: "A deep dive into Next.js 14 features including App Router, Server Components, and more.",
    content: `<p>Next.js 14 represents a massive leap forward in React development. With the stable App Router and improved Server Components, building full-stack applications has never been more elegant.</p><h2>App Router Revolution</h2><p>The App Router introduces a file-system based routing that feels natural and powerful. Nested layouts, loading states, and error boundaries are all built-in.</p><h2>Server Components by Default</h2><p>Components render on the server by default, reducing JavaScript sent to the client dramatically. This translates to faster page loads and better Core Web Vitals scores.</p><h2>Turbopack Bundler</h2><p>The new Turbopack bundler (in beta) promises significantly faster development builds, making the development experience much smoother for large applications.</p>`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    category: "Development",
    tags: ["nextjs", "react", "javascript"],
    date: "2025-04-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 3, slug: "css-grid-mastery",
    title: "CSS Grid Mastery: From Basics to Advanced Layouts",
    excerpt: "Master CSS Grid and unlock the ability to create any layout you can imagine.",
    content: `<p>CSS Grid is the most powerful layout system available in CSS. It's a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system.</p><h2>Grid Container</h2><p>Define a grid container with <code>display: grid</code>. From here, you control the number of columns and rows using <code>grid-template-columns</code> and <code>grid-template-rows</code>.</p><h2>The fr Unit</h2><p>The <code>fr</code> unit represents a fraction of the available space, making responsive layouts incredibly simple without media queries in many cases.</p><h2>Grid Areas</h2><p>Named grid areas allow you to create complex layouts with readable, semantic CSS that maps directly to your visual design.</p>`,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    category: "CSS",
    tags: ["css", "ui"],
    date: "2025-04-05",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 4, slug: "seo-for-developers",
    title: "SEO for Developers: Technical SEO That Actually Works",
    excerpt: "Go beyond keywords. Implement technical SEO strategies that give your site a real edge.",
    content: `<p>Technical SEO is the foundation upon which all other SEO efforts rest. Without it, even the best content can struggle to rank. As a developer, you have more influence over SEO than you might think.</p><h2>Core Web Vitals</h2><p>Google's Core Web Vitals — LCP, FID, and CLS — are direct ranking signals. Optimizing these metrics isn't optional if you want to compete in search results.</p><h2>Structured Data</h2><p>Schema markup helps search engines understand your content. Implement Article, Person, and BreadcrumbList schemas to enhance your search appearance with rich snippets.</p><h2>Semantic HTML</h2><p>Proper use of heading hierarchy, landmark elements, and semantic tags signals content structure to crawlers and improves accessibility simultaneously.</p>`,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    category: "Development",
    tags: ["seo", "performance"],
    date: "2025-03-22",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 5, slug: "typography-in-ui-design",
    title: "The Art of Typography in UI Design",
    excerpt: "Typography is 95% of design. Master it and watch your interfaces transform.",
    content: `<p>Typography is arguably the most impactful element of any design. Get it right, and everything feels polished. Get it wrong, and no amount of beautiful imagery or clever layout will save the experience.</p><h2>Type Scale</h2><p>A harmonious type scale creates visual rhythm. Use a ratio (like 1.25 or 1.333) to generate a scale where each size relates mathematically to the others.</p><h2>Line Height and Spacing</h2><p>Body text needs breathing room. A line-height between 1.5 and 1.7 for body copy dramatically improves readability. Headings can be tighter, around 1.1 to 1.2.</p><h2>Font Pairing</h2><p>Contrast is key in font pairing. Pair a serif with a sans-serif, or a high-contrast display font with a neutral body typeface.</p>`,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    category: "Design",
    tags: ["typography", "ui", "design"],
    date: "2025-03-10",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 6, slug: "freelance-career-guide",
    title: "The Honest Guide to Starting a Freelance Design Career",
    excerpt: "What nobody tells you about going freelance and how to actually make it work.",
    content: `<p>Freelancing sounds glamorous — set your own hours, choose your clients, work from anywhere. The reality is more nuanced, but with the right approach, it can be genuinely fulfilling and financially rewarding.</p><h2>Build Before You Leap</h2><p>Don't quit your job immediately. Build a portfolio and your first client relationships while employed. Aim for enough savings to cover 6 months of expenses before going full-time.</p><h2>Your Portfolio is Everything</h2><p>Clients hire based on evidence. Show process, not just final results. A case study showing your thinking is worth ten pretty screenshots.</p><h2>Pricing</h2><p>Most beginners underprice dramatically. Research market rates. Charge more than feels comfortable. You can always negotiate down; you can rarely negotiate up.</p>`,
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&q=80",
    category: "Career",
    tags: ["career", "freelance"],
    date: "2025-02-28",
    readTime: "10 min read",
    featured: false,
  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    rss: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  };
  return icons[name] || null;
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #ffffff;
    --bg2: #f9f9f7;
    --bg3: #f2f2ef;
    --border: #e8e8e4;
    --text: #0f0f0e;
    --text2: #4a4a45;
    --text3: #8a8a82;
    --accent: #1a1a18;
    --accent2: #d4a853;
    --tag-bg: #f0f0ec;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --card-hover: 0 4px 20px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.06);
    --radius: 12px;
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-dark="true"] {
    --bg: #0d0d0c;
    --bg2: #161615;
    --bg3: #1e1e1c;
    --border: #2a2a27;
    --text: #f0f0ec;
    --text2: #b0b0a8;
    --text3: #6a6a62;
    --accent: #f0f0ec;
    --accent2: #d4a853;
    --tag-bg: #252523;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2);
    --card-hover: 0 4px 20px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.65;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    transition: background var(--transition), color var(--transition);
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background var(--transition), border-color var(--transition);
  }

  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px;
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    display: flex; align-items: center; gap: 10px;
  }

  .nav-logo img {
    width: 32px; height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border);
  }

  .nav-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none;
  }

  .nav-links a {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text2);
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition);
  }

  .nav-links a:hover, .nav-links a.active {
    color: var(--text);
    background: var(--bg3);
  }

  .nav-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .icon-btn {
    width: 36px; height: 36px;
    border: 1px solid var(--border);
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text2);
    transition: all var(--transition);
  }

  .icon-btn:hover { background: var(--bg3); color: var(--text); border-color: var(--border); }

  .mobile-menu-btn { display: none; }

  /* MOBILE NAV */
  .mobile-nav {
    display: none;
    position: fixed; inset: 0; z-index: 200;
    background: var(--bg);
    padding: 24px;
    flex-direction: column; gap: 8px;
    animation: slideIn 0.2s ease;
  }

  .mobile-nav.open { display: flex; }

  .mobile-nav-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }

  .mobile-nav a {
    padding: 14px 16px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    border: 1px solid var(--border);
    display: block;
    transition: all var(--transition);
  }

  .mobile-nav a:hover { background: var(--bg3); }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* MAIN */
  main { flex: 1; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .container-narrow { max-width: 800px; margin: 0 auto; padding: 0 24px; }

  /* HERO */
  .hero {
    padding: 80px 0 64px;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 999px; padding: 6px 14px;
    font-size: 0.8rem; font-weight: 500; color: var(--text2);
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 24px;
  }

  .hero-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent2); }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 20px;
  }

  .hero h1 em { font-style: italic; color: var(--accent2); }

  .hero-desc {
    font-size: 1.1rem;
    color: var(--text2);
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 440px;
  }

  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 10px;
    font-size: 0.9rem; font-weight: 500;
    cursor: pointer; text-decoration: none;
    transition: all var(--transition); border: 1px solid transparent;
  }

  .btn-primary {
    background: var(--text); color: var(--bg);
  }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

  .btn-secondary {
    background: transparent; color: var(--text);
    border-color: var(--border);
  }
  .btn-secondary:hover { background: var(--bg3); transform: translateY(-1px); }

  .hero-image-side {
    display: flex; justify-content: center; align-items: center;
    position: relative;
  }

  .hero-avatar-wrap {
    position: relative;
    width: 280px; height: 280px;
  }

  .hero-avatar-ring {
    position: absolute; inset: -12px;
    border-radius: 50%;
    border: 2px dashed var(--border);
    animation: spin 20s linear infinite;
  }

  .hero-avatar {
    width: 100%; height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg);
    box-shadow: var(--card-hover);
  }

  .hero-badge {
    position: absolute; bottom: 10px; right: -10px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex; align-items: center; gap: 8px;
    box-shadow: var(--card-shadow);
    white-space: nowrap;
  }

  .hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }

  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* SECTION */
  .section { padding: 72px 0; }
  .section-border { border-top: 1px solid var(--border); }

  .section-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 40px; gap: 16px; flex-wrap: wrap;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    letter-spacing: -0.025em;
    color: var(--text);
    line-height: 1.2;
  }

  .section-title span { color: var(--accent2); font-style: italic; }

  .section-link {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.875rem; font-weight: 500;
    color: var(--text2); text-decoration: none; cursor: pointer;
    transition: all var(--transition);
  }

  .section-link:hover { color: var(--text); gap: 10px; }

  /* CARDS */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  .posts-grid.featured {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .post-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: all var(--transition);
    cursor: pointer;
    display: flex; flex-direction: column;
    box-shadow: var(--card-shadow);
  }

  .post-card:hover {
    box-shadow: var(--card-hover);
    transform: translateY(-3px);
    border-color: transparent;
  }

  .post-card-image {
    width: 100%; aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .post-card:hover .post-card-image { transform: scale(1.03); }

  .post-card-img-wrap { overflow: hidden; }

  .post-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }

  .post-card-cat {
    display: inline-block;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--accent2);
    margin-bottom: 10px;
    cursor: pointer;
  }

  .post-card-title {
    font-family: var(--font-display);
    font-size: 1.15rem; line-height: 1.35;
    color: var(--text); margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .post-card-excerpt {
    font-size: 0.875rem; color: var(--text2); line-height: 1.6;
    margin-bottom: 16px; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }

  .post-card-meta {
    display: flex; align-items: center; gap: 12px;
    font-size: 0.78rem; color: var(--text3);
    padding-top: 14px; border-top: 1px solid var(--border);
  }

  .post-card-meta span { display: flex; align-items: center; gap: 4px; }

  /* POST CARD FEATURED (LARGE) */
  .post-card.large {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .post-card.large .post-card-img-wrap {
    aspect-ratio: unset; height: 100%; min-height: 300px;
  }

  .post-card.large .post-card-image {
    height: 100%; aspect-ratio: unset;
  }

  .post-card.large .post-card-body { padding: 32px; justify-content: center; }
  .post-card.large .post-card-title { font-size: 1.6rem; }
  .post-card.large .post-card-excerpt { -webkit-line-clamp: 4; }

  /* ABOUT PREVIEW */
  .about-preview {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }

  .about-image-side { position: relative; }

  .about-img-wrap {
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--card-hover);
  }

  .about-img-wrap img { width: 100%; display: block; aspect-ratio: 4/5; object-fit: cover; }

  .about-img-badge {
    position: absolute; bottom: -16px; right: -16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 20px;
    box-shadow: var(--card-shadow);
  }

  .about-img-badge strong { font-family: var(--font-display); font-size: 1.8rem; display: block; }
  .about-img-badge span { font-size: 0.8rem; color: var(--text2); }

  .about-text .eyebrow {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--accent2); margin-bottom: 12px;
  }

  .about-text h2 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1.15; letter-spacing: -0.025em;
    margin-bottom: 16px;
  }

  .about-text p { color: var(--text2); line-height: 1.75; margin-bottom: 20px; }

  .social-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }

  .social-btn {
    width: 40px; height: 40px;
    border: 1px solid var(--border); border-radius: 10px;
    background: var(--bg3);
    display: flex; align-items: center; justify-content: center;
    color: var(--text2); cursor: pointer; text-decoration: none;
    transition: all var(--transition);
  }

  .social-btn:hover { background: var(--text); color: var(--bg); border-color: var(--text); }

  /* NEWSLETTER */
  .newsletter-section {
    background: var(--bg3); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 64px 0;
    text-align: center;
  }

  .newsletter-inner { max-width: 500px; margin: 0 auto; }

  .newsletter-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: var(--bg); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent2); margin: 0 auto 20px;
    box-shadow: var(--card-shadow);
  }

  .newsletter-section h2 { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: -0.02em; margin-bottom: 8px; }
  .newsletter-section p { color: var(--text2); margin-bottom: 24px; }

  .newsletter-form { display: flex; gap: 8px; max-width: 420px; margin: 0 auto; }

  .input {
    flex: 1; padding: 11px 16px;
    border: 1px solid var(--border); border-radius: 10px;
    background: var(--bg); color: var(--text);
    font-family: var(--font-body); font-size: 0.9rem;
    outline: none; transition: border-color var(--transition);
  }

  .input:focus { border-color: var(--text2); }

  textarea.input { resize: vertical; min-height: 120px; }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    background: var(--bg2);
    padding: 48px 0 24px;
  }

  .footer-grid {
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px;
    margin-bottom: 40px;
  }

  .footer-brand p { color: var(--text2); font-size: 0.875rem; margin-top: 10px; line-height: 1.65; }
  .footer-col h4 { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text3); margin-bottom: 14px; }
  .footer-col a {
    display: block; color: var(--text2); font-size: 0.875rem; text-decoration: none;
    cursor: pointer; margin-bottom: 8px; transition: color var(--transition);
  }
  .footer-col a:hover { color: var(--text); }

  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 24px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }

  .footer-bottom p { font-size: 0.8rem; color: var(--text3); }

  /* BLOG PAGE */
  .page-hero {
    padding: 56px 0;
    border-bottom: 1px solid var(--border);
    background: var(--bg2);
  }

  .page-hero h1 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.03em; margin-bottom: 8px; }
  .page-hero p { color: var(--text2); font-size: 1.05rem; }

  .blog-layout { display: grid; grid-template-columns: 1fr 300px; gap: 48px; padding: 56px 0; }

  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 16px;
    margin-bottom: 32px;
    transition: border-color var(--transition);
  }

  .search-bar:focus-within { border-color: var(--text2); }

  .search-bar input {
    flex: 1; border: none; background: transparent; color: var(--text);
    font-family: var(--font-body); font-size: 0.9rem; outline: none;
  }

  .search-bar input::placeholder { color: var(--text3); }

  .cat-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }

  .cat-chip {
    padding: 6px 14px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--bg3);
    font-size: 0.8rem; font-weight: 500; color: var(--text2);
    cursor: pointer; transition: all var(--transition);
  }

  .cat-chip:hover, .cat-chip.active {
    background: var(--text); color: var(--bg); border-color: var(--text);
  }

  /* SIDEBAR */
  .sidebar { display: flex; flex-direction: column; gap: 28px; }

  .sidebar-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px;
  }

  .sidebar-card h3 {
    font-family: var(--font-display); font-size: 1rem; margin-bottom: 14px;
    padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }

  .sidebar-cat-list { list-style: none; }
  .sidebar-cat-list li {
    display: flex; justify-content: space-between; align-items: center;
    padding: 7px 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; cursor: pointer;
    color: var(--text2); transition: color var(--transition);
  }
  .sidebar-cat-list li:last-child { border: none; }
  .sidebar-cat-list li:hover { color: var(--text); }
  .sidebar-cat-list li span { font-size: 0.75rem; color: var(--text3); }

  .tags-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag-pill {
    padding: 4px 10px; border-radius: 6px;
    background: var(--tag-bg); border: 1px solid var(--border);
    font-size: 0.78rem; color: var(--text2); cursor: pointer;
    transition: all var(--transition);
  }
  .tag-pill:hover { background: var(--text); color: var(--bg); border-color: var(--text); }

  /* SINGLE POST */
  .post-hero { padding: 56px 0 0; }
  .post-hero-inner { max-width: 800px; margin: 0 auto; padding: 0 24px 40px; }

  .breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.8rem; color: var(--text3); margin-bottom: 20px; flex-wrap: wrap;
  }

  .breadcrumb a { color: var(--text3); text-decoration: none; cursor: pointer; }
  .breadcrumb a:hover { color: var(--text); }

  .post-cat-badge {
    display: inline-block;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--accent2);
    background: rgba(212,168,83,0.1); border: 1px solid rgba(212,168,83,0.2);
    border-radius: 6px; padding: 4px 10px; margin-bottom: 14px;
  }

  .post-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; letter-spacing: -0.03em;
    margin-bottom: 20px;
  }

  .post-meta { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; font-size: 0.85rem; color: var(--text3); margin-bottom: 32px; }
  .post-meta span { display: flex; align-items: center; gap: 5px; }
  .post-meta strong { color: var(--text2); }

  .post-cover {
    max-width: 1000px; margin: 0 auto;
    border-radius: var(--radius); overflow: hidden;
    margin-bottom: 56px; box-shadow: var(--card-hover);
  }

  .post-cover img { width: 100%; display: block; aspect-ratio: 16/7; object-fit: cover; }

  .post-content {
    max-width: 700px; margin: 0 auto; padding: 0 24px;
    font-size: 1.05rem; line-height: 1.8; color: var(--text2);
  }

  .post-content h2 {
    font-family: var(--font-display); font-size: 1.6rem;
    color: var(--text); margin: 40px 0 16px; letter-spacing: -0.02em; line-height: 1.25;
  }

  .post-content p { margin-bottom: 20px; }
  .post-content code {
    background: var(--bg3); border: 1px solid var(--border);
    padding: 2px 6px; border-radius: 5px; font-size: 0.875rem; color: var(--accent2);
  }

  .post-tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 40px 0 0; max-width: 700px; margin-left: auto; margin-right: auto; padding: 0 24px; }

  .post-share {
    max-width: 700px; margin: 28px auto 0; padding: 20px 24px;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }

  .post-share p { font-size: 0.875rem; font-weight: 500; color: var(--text2); }
  .share-btns { display: flex; gap: 8px; }

  .author-card {
    max-width: 700px; margin: 40px auto; padding: 0 24px;
  }

  .author-card-inner {
    display: flex; gap: 20px; align-items: flex-start;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px;
  }

  .author-card-inner img { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .author-card-info h4 { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 4px; }
  .author-card-info .role { font-size: 0.8rem; color: var(--accent2); margin-bottom: 8px; font-weight: 500; }
  .author-card-info p { font-size: 0.875rem; color: var(--text2); line-height: 1.65; }

  .related-posts { max-width: 1000px; margin: 56px auto; padding: 0 24px; }
  .related-posts h3 { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: -0.02em; margin-bottom: 24px; }
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  /* ABOUT PAGE */
  .about-page-hero {
    padding: 80px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }

  .about-photo { border-radius: var(--radius); overflow: hidden; box-shadow: var(--card-hover); }
  .about-photo img { width: 100%; display: block; aspect-ratio: 3/4; object-fit: cover; }

  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
  .skill-item {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 10px; padding: 14px 16px;
  }
  .skill-item strong { display: block; font-size: 0.875rem; margin-bottom: 4px; }
  .skill-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .skill-fill { height: 100%; background: var(--accent2); border-radius: 2px; }

  /* CONTACT */
  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 64px 0; }

  .contact-form-wrap { display: flex; flex-direction: column; gap: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 0.82rem; font-weight: 500; color: var(--text2); }

  /* 404 */
  .page-404 {
    min-height: 70vh; display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 48px 24px;
  }

  .page-404 h1 {
    font-family: var(--font-display);
    font-size: clamp(6rem, 15vw, 12rem); letter-spacing: -0.05em; line-height: 1;
    color: var(--border); margin-bottom: 16px;
  }

  .page-404 h2 { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 12px; }
  .page-404 p { color: var(--text2); margin-bottom: 32px; }

  /* PRIVACY / TERMS */
  .legal-content {
    max-width: 760px; margin: 0 auto; padding: 64px 24px;
  }

  .legal-content h1 { font-family: var(--font-display); font-size: 2.4rem; letter-spacing: -0.03em; margin-bottom: 8px; }
  .legal-content .updated { font-size: 0.82rem; color: var(--text3); margin-bottom: 40px; }
  .legal-content h2 { font-family: var(--font-display); font-size: 1.3rem; margin: 32px 0 10px; }
  .legal-content p, .legal-content li { color: var(--text2); line-height: 1.75; margin-bottom: 12px; }
  .legal-content ul { padding-left: 20px; }

  /* SEARCH PAGE */
  .search-page-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 20px; margin-bottom: 16px;
  }

  .search-page-bar input {
    flex: 1; border: none; background: transparent; color: var(--text);
    font-family: var(--font-display); font-size: 1.2rem; outline: none;
  }

  .search-results-count { font-size: 0.875rem; color: var(--text3); margin-bottom: 32px; }

  /* EMPTY STATE */
  .empty-state { text-align: center; padding: 64px 24px; color: var(--text3); }
  .empty-state h3 { font-family: var(--font-display); font-size: 1.4rem; color: var(--text2); margin-bottom: 8px; }

  /* COMMENT */
  .comments-section { max-width: 700px; margin: 40px auto; padding: 0 24px 64px; }
  .comments-section h3 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 24px; }

  .comment-form { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin-bottom: 32px; }
  .comment-form h4 { font-size: 0.95rem; font-weight: 500; margin-bottom: 16px; }
  .comment-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }

  .comment { display: flex; gap: 14px; padding: 20px 0; border-bottom: 1px solid var(--border); }
  .comment:last-child { border: none; }
  .comment-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--bg3); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-weight: 600; font-size: 0.9rem; color: var(--text2);
    flex-shrink: 0;
  }
  .comment-body {}
  .comment-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .comment-header strong { font-size: 0.875rem; }
  .comment-header time { font-size: 0.78rem; color: var(--text3); }
  .comment-body p { font-size: 0.875rem; color: var(--text2); line-height: 1.65; }

  /* TOC */
  .toc {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px;
    margin: 0 24px 40px; max-width: 700px; margin-left: auto; margin-right: auto;
  }
  .toc h4 { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text3); margin-bottom: 12px; }
  .toc ol { padding-left: 18px; }
  .toc li { font-size: 0.875rem; color: var(--text2); margin-bottom: 6px; cursor: pointer; }
  .toc li:hover { color: var(--text); }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .posts-grid.featured { grid-template-columns: 1fr 1fr; }
    .post-card.large { grid-column: 1 / -1; grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .about-page-hero { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-width: 400px; }
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .mobile-menu-btn { display: flex; }
    .hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .hero-image-side { display: none; }
    .about-preview { grid-template-columns: 1fr; }
    .about-image-side { display: none; }
    .blog-layout { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .posts-grid, .posts-grid.featured { grid-template-columns: 1fr; }
    .post-card.large { grid-template-columns: 1fr; }
    .contact-layout { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .related-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .comment-form-row { grid-template-columns: 1fr; }
    .newsletter-form { flex-direction: column; }
    .post-share { flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr; }
    .hero h1 { font-size: 2.2rem; }
    .section-title { font-size: 1.6rem; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const SocialLinks = ({ size = 18 }) => (
  <div className="social-row">
    {Object.entries(AUTHOR.socials).map(([key, url]) => (
      <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="social-btn" title={key}>
        <Icon name={key} size={size} />
      </a>
    ))}
  </div>
);

const PostCard = ({ post, onNavigate, large = false }) => (
  <article className={`post-card ${large ? "large" : ""}`} onClick={() => onNavigate("post", post.slug)}>
    <div className="post-card-img-wrap">
      <img src={post.image} alt={post.title} className="post-card-image" loading="lazy" />
    </div>
    <div className="post-card-body">
      <span className="post-card-cat" onClick={(e) => { e.stopPropagation(); onNavigate("category", post.category); }}>
        {post.category}
      </span>
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-excerpt">{post.excerpt}</p>
      <div className="post-card-meta">
        <span><Icon name="calendar" size={13} />{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        <span><Icon name="clock" size={13} />{post.readTime}</span>
      </div>
    </div>
  </article>
);

const Breadcrumb = ({ items, onNavigate }) => (
  <nav className="breadcrumb">
    {items.map((item, i) => (
      <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {i > 0 && <Icon name="chevron" size={12} />}
        {item.page ? (
          <a onClick={() => onNavigate(item.page, item.param)}>{item.label}</a>
        ) : (
          <span style={{ color: "var(--text2)" }}>{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────
const HomePage = ({ onNavigate }) => {
  const featured = POSTS.filter(p => p.featured);
  const latest = POSTS.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-tag">
              <div className="hero-dot" />
              Available for freelance work
            </div>
            <h1>I am <em>Akela Bhai</em>,<br />Web Designer</h1>
            <p className="hero-desc">
              I write about web design, development, and the art of building things people love.
              Sharing knowledge, one post at a time.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("blog")}>
                Read Blog <Icon name="arrow" size={16} />
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate("about")}>
                About Me
              </button>
            </div>
          </div>
          <div className="hero-image-side">
            <div className="hero-avatar-wrap">
              <div className="hero-avatar-ring" />
              <img src={AUTHOR.avatar} alt={AUTHOR.name} className="hero-avatar" />
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>Open to work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured <span>Posts</span></h2>
            <a className="section-link" onClick={() => onNavigate("blog")}>All posts <Icon name="arrow" size={16} /></a>
          </div>
          <div className="posts-grid featured">
            {featured.slice(0, 1).map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} large />)}
            {featured.slice(1, 3).map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section section-border">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest <span>Articles</span></h2>
            <a className="section-link" onClick={() => onNavigate("blog")}>View all <Icon name="arrow" size={16} /></a>
          </div>
          <div className="posts-grid">
            {latest.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section section-border">
        <div className="container">
          <div className="about-preview">
            <div className="about-image-side">
              <div className="about-img-wrap">
                <img src={AUTHOR.avatar} alt={AUTHOR.name} />
              </div>
              <div className="about-img-badge">
                <strong>{POSTS.length}+</strong>
                <span>Articles published</span>
              </div>
            </div>
            <div className="about-text">
              <div className="eyebrow">About the Author</div>
              <h2>Designing the web, <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>one pixel at a time.</em></h2>
              <p>{AUTHOR.bio}</p>
              <p>Follow along as I document my journey through the world of web design and development, sharing practical tips and lessons learned.</p>
              <SocialLinks />
              <button className="btn btn-secondary" style={{ marginTop: 24 }} onClick={() => onNavigate("about")}>
                Learn More <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-icon"><Icon name="mail" size={22} /></div>
          <h2>Stay in the loop</h2>
          <p>Get new articles delivered to your inbox. No spam, ever.</p>
          <div className="newsletter-form">
            <input className="input" type="email" placeholder="your@email.com" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

const BlogPage = ({ onNavigate }) => {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = POSTS.filter(p => {
    const matchCat = activeCat === "All" || p.category === activeCat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Thoughts on web design, development, and creative work.</p>
        </div>
      </div>
      <div className="container">
        <div className="blog-layout">
          <div>
            <div className="search-bar">
              <Icon name="search" size={18} />
              <input placeholder="Search articles…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="cat-filters">
              {["All", ...CATEGORIES].map(c => (
                <button key={c} className={`cat-chip ${activeCat === c ? "active" : ""}`} onClick={() => setActiveCat(c)}>{c}</button>
              ))}
            </div>
            {filtered.length > 0 ? (
              <div className="posts-grid">
                {filtered.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>Try a different search or category.</p>
              </div>
            )}
          </div>
          <aside className="sidebar">
            <div className="sidebar-card">
              <h3>Categories</h3>
              <ul className="sidebar-cat-list">
                {CATEGORIES.map(c => (
                  <li key={c} onClick={() => { setActiveCat(c); }}>
                    {c} <span>{POSTS.filter(p => p.category === c).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-card">
              <h3>Popular Tags</h3>
              <div className="tags-cloud">
                {ALL_TAGS.map(t => (
                  <span key={t} className="tag-pill" onClick={() => onNavigate("tag", t)}>#{t}</span>
                ))}
              </div>
            </div>
            <div className="sidebar-card" style={{ background: "var(--bg3)" }}>
              <h3>About</h3>
              <img src={AUTHOR.avatar} alt={AUTHOR.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }} />
              <p style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6, marginBottom: 12 }}>{AUTHOR.bio.slice(0, 100)}…</p>
              <SocialLinks size={16} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

const PostPage = ({ slug, onNavigate }) => {
  const post = POSTS.find(p => p.slug === slug);
  const [comment, setComment] = useState({ name: "", email: "", text: "" });
  const [comments, setComments] = useState([
    { name: "Priya S.", text: "Really helpful article! The section on typography was eye-opening.", date: "2025-04-30" },
    { name: "Rajan K.", text: "Great read. Looking forward to more posts on design fundamentals.", date: "2025-05-01" },
  ]);

  if (!post) return <NotFoundPage onNavigate={onNavigate} />;

  const related = POSTS.filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, 3);

  const headings = post.content.match(/<h2>(.*?)<\/h2>/g)?.map(h => h.replace(/<\/?h2>/g, "")) || [];

  const submitComment = () => {
    if (comment.name && comment.text) {
      setComments(prev => [...prev, { ...comment, date: new Date().toISOString().split("T")[0] }]);
      setComment({ name: "", email: "", text: "" });
    }
  };

  return (
    <>
      {/* Schema (visible as meta info for demo) */}
      <div style={{ display: "none" }} aria-hidden>
        {JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": post.title, "author": { "@type": "Person", "name": AUTHOR.name }, "datePublished": post.date })}
      </div>

      <article>
        <div className="post-hero">
          <div className="post-hero-inner">
            <Breadcrumb items={[
              { label: "Home", page: "home" },
              { label: "Blog", page: "blog" },
              { label: post.category, page: "category", param: post.category },
              { label: post.title.slice(0, 30) + "…" }
            ]} onNavigate={onNavigate} />
            <span className="post-cat-badge">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span><img src={AUTHOR.avatar} alt={AUTHOR.name} style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} /><strong>{AUTHOR.name}</strong></span>
              <span><Icon name="calendar" size={14} />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span><Icon name="clock" size={14} />{post.readTime}</span>
            </div>
          </div>
          <div className="post-cover container">
            <img src={post.image} alt={post.title} />
          </div>
        </div>

        {headings.length > 0 && (
          <div className="toc">
            <h4>Table of Contents</h4>
            <ol>
              {headings.map((h, i) => <li key={i}>{h}</li>)}
            </ol>
          </div>
        )}

        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="post-tags-row">
          {post.tags.map(t => (
            <span key={t} className="tag-pill" onClick={() => onNavigate("tag", t)}>#{t}</span>
          ))}
        </div>

        <div className="post-share">
          <p>Found this helpful? Share it.</p>
          <div className="share-btns">
            {["twitter", "facebook", "linkedin"].map(s => (
              <a key={s} href={AUTHOR.socials[s]} target="_blank" rel="noopener noreferrer" className="social-btn">
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="author-card">
          <div className="author-card-inner">
            <img src={AUTHOR.avatar} alt={AUTHOR.name} />
            <div className="author-card-info">
              <h4>{AUTHOR.name}</h4>
              <div className="role">{AUTHOR.title}</div>
              <p>{AUTHOR.bio}</p>
              <div style={{ marginTop: 12 }}><SocialLinks size={15} /></div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="related-posts">
          <h3>Related Articles</h3>
          <div className="related-grid">
            {related.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}
          </div>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <div className="comment-form">
          <h4>Leave a comment</h4>
          <div className="comment-form-row">
            <input className="input" placeholder="Your name" value={comment.name} onChange={e => setComment(p => ({ ...p, name: e.target.value }))} />
            <input className="input" placeholder="Email (not published)" value={comment.email} onChange={e => setComment(p => ({ ...p, email: e.target.value }))} />
          </div>
          <textarea className="input" placeholder="Share your thoughts…" style={{ marginBottom: 12 }} value={comment.text} onChange={e => setComment(p => ({ ...p, text: e.target.value }))} />
          <button className="btn btn-primary" onClick={submitComment}>Post Comment</button>
        </div>
        {comments.map((c, i) => (
          <div key={i} className="comment">
            <div className="comment-avatar">{c.name[0]}</div>
            <div className="comment-body">
              <div className="comment-header">
                <strong>{c.name}</strong>
                <time>{c.date}</time>
              </div>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const CategoryPage = ({ category, onNavigate }) => {
  const posts = POSTS.filter(p => p.category === category);
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Blog", page: "blog" }, { label: category }]} onNavigate={onNavigate} />
          <h1>{category}</h1>
          <p>{posts.length} article{posts.length !== 1 ? "s" : ""} in this category.</p>
        </div>
      </div>
      <div className="container">
        <div className="section">
          {posts.length > 0 ? (
            <div className="posts-grid">{posts.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}</div>
          ) : (
            <div className="empty-state"><h3>No posts yet</h3><p>Check back soon!</p></div>
          )}
        </div>
      </div>
    </>
  );
};

const TagPage = ({ tag, onNavigate }) => {
  const posts = POSTS.filter(p => p.tags.includes(tag));
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: "Home", page: "home" }, { label: "Blog", page: "blog" }, { label: `#${tag}` }]} onNavigate={onNavigate} />
          <h1>#{tag}</h1>
          <p>{posts.length} article{posts.length !== 1 ? "s" : ""} tagged with <strong>#{tag}</strong>.</p>
        </div>
      </div>
      <div className="container">
        <div className="section">
          {posts.length > 0 ? (
            <div className="posts-grid">{posts.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}</div>
          ) : (
            <div className="empty-state"><h3>No posts found</h3><p>Try another tag.</p></div>
          )}
        </div>
      </div>
    </>
  );
};

const SearchPage = ({ onNavigate }) => {
  const [query, setQuery] = useState("");
  const results = query.length > 1
    ? POSTS.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.includes(query.toLowerCase()))
      )
    : [];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Search</h1>
          <p>Find articles, tutorials, and more.</p>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="search-page-bar">
            <Icon name="search" size={22} />
            <input autoFocus placeholder="Search for anything…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          {query.length > 1 && (
            <p className="search-results-count">
              {results.length} result{results.length !== 1 ? "s" : ""} for "<strong>{query}</strong>"
            </p>
          )}
          {results.length > 0 ? (
            <div className="posts-grid">{results.map(p => <PostCard key={p.id} post={p} onNavigate={onNavigate} />)}</div>
          ) : query.length > 1 ? (
            <div className="empty-state"><h3>No results found</h3><p>Try different keywords.</p></div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const AboutPage = ({ onNavigate }) => {
  const skills = [
    { name: "UI Design", level: 92 }, { name: "Web Development", level: 85 },
    { name: "Figma", level: 90 }, { name: "React / Next.js", level: 80 },
    { name: "CSS / Tailwind", level: 88 }, { name: "SEO Strategy", level: 75 },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>About Me</h1>
          <p>The story behind Akela Bhai.</p>
        </div>
      </div>
      <div className="container">
        <div className="about-page-hero">
          <div className="about-photo">
            <img src={AUTHOR.avatar} alt={AUTHOR.name} />
          </div>
          <div>
            <div className="eyebrow" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 12 }}>Web Designer & Writer</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 20 }}>{AUTHOR.name}</h2>
            <p style={{ color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 }}>
              Hello! I'm Akela Bhai — a web designer, developer, and content creator passionate about building digital experiences that are both beautiful and functional.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 }}>
              Through this blog, I share everything I learn about design systems, frontend development, SEO, and the business side of creative work. My goal is to make high-quality design and development knowledge accessible to everyone.
            </p>
            <SocialLinks />
            <div className="skills-grid" style={{ marginTop: 32 }}>
              {skills.map(s => (
                <div key={s.name} className="skill-item">
                  <strong>{s.name}</strong>
                  <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button className="btn btn-primary" onClick={() => onNavigate("contact")}>Get in Touch <Icon name="arrow" size={16} /></button>
              <button className="btn btn-secondary" onClick={() => onNavigate("blog")}>Read Blog</button>
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-icon"><Icon name="mail" size={22} /></div>
          <h2>Subscribe to the newsletter</h2>
          <p>Get new posts directly in your inbox every week.</p>
          <div className="newsletter-form">
            <input className="input" type="email" placeholder="your@email.com" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Contact</h1>
          <p>Have a project in mind? Let's talk.</p>
        </div>
      </div>
      <div className="container">
        <div className="contact-layout">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: 16 }}>Get in touch</h2>
            <p style={{ color: "var(--text2)", lineHeight: 1.75, marginBottom: 32 }}>
              Whether you have a question, a project idea, or just want to say hello — I'd love to hear from you. I typically respond within 24–48 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[
                { icon: "mail", label: "Email", value: "hello@akelabhai.com" },
                { icon: "github", label: "GitHub", value: "@akelabhaiji" },
                { icon: "twitter", label: "Twitter", value: "@akelajiofficial" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div className="social-btn"><Icon name={item.icon} size={17} /></div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <SocialLinks />
          </div>
          <div>
            {sent ? (
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>✉️</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 8 }}>Message sent!</h3>
                <p style={{ color: "var(--text2)" }}>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="contact-form-wrap">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input className="input" placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="input" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input className="input" placeholder="What's this about?" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="input" placeholder="Tell me more…" />
                </div>
                <button className="btn btn-primary" onClick={() => setSent(true)}>
                  Send Message <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const PrivacyPage = () => (
  <div className="legal-content">
    <h1>Privacy Policy</h1>
    <p className="updated">Last updated: May 1, 2025</p>
    <p>This Privacy Policy describes how Akela Bhai ("we," "us," or "our") collects, uses, and shares information about you when you visit akelabhai.com.</p>
    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly to us, such as when you subscribe to our newsletter or fill out a contact form. This may include your name and email address.</p>
    <p>We also automatically collect certain technical information when you visit our site, including your IP address, browser type, pages visited, and time spent on pages.</p>
    <h2>2. How We Use Your Information</h2>
    <ul>
      <li>To send you our newsletter (with your consent)</li>
      <li>To respond to your inquiries and comments</li>
      <li>To analyze and improve our website</li>
      <li>To comply with legal obligations</li>
    </ul>
    <h2>3. Analytics</h2>
    <p>We use Google Analytics to understand how visitors interact with our website. This service may collect information about your device and browsing activity. You can opt out by installing the Google Analytics opt-out browser add-on.</p>
    <h2>4. Advertising</h2>
    <p>We may display advertising on our website through Google AdSense. This advertising service uses cookies to serve ads based on your prior visits to this and other websites.</p>
    <h2>5. Cookies</h2>
    <p>We use cookies to enhance your experience, analyze site traffic, and for advertising. You can disable cookies through your browser settings, though this may affect site functionality.</p>
    <h2>6. Third-Party Links</h2>
    <p>Our website contains links to third-party sites. We are not responsible for their privacy practices and encourage you to review their privacy policies.</p>
    <h2>7. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at hello@akelabhai.com.</p>
  </div>
);

const TermsPage = () => (
  <div className="legal-content">
    <h1>Terms &amp; Conditions</h1>
    <p className="updated">Last updated: May 1, 2025</p>
    <p>By accessing and using akelabhai.com, you accept and agree to be bound by the following Terms and Conditions.</p>
    <h2>1. Use of Content</h2>
    <p>All content published on this website — including articles, images, and graphics — is owned by Akela Bhai and protected by copyright laws. You may share our content with proper attribution and a link back to the original post.</p>
    <h2>2. No Professional Advice</h2>
    <p>The content on this blog is for informational and educational purposes only. It does not constitute professional advice of any kind. Always seek appropriate professional counsel for specific situations.</p>
    <h2>3. Comments</h2>
    <p>By posting a comment, you grant us a non-exclusive license to publish and display it on our website. We reserve the right to remove any comments that are abusive, spam, or otherwise inappropriate.</p>
    <h2>4. Disclaimer of Warranties</h2>
    <p>This website is provided "as is" without any warranties, expressed or implied. We do not warrant that the site will be error-free or uninterrupted.</p>
    <h2>5. Limitation of Liability</h2>
    <p>Akela Bhai shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.</p>
    <h2>6. Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
    <h2>7. Contact</h2>
    <p>For any questions regarding these Terms, contact us at hello@akelabhai.com.</p>
  </div>
);

const NotFoundPage = ({ onNavigate }) => (
  <div className="page-404">
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => onNavigate("home")}>
          <Icon name="home" size={16} /> Go Home
        </button>
        <button className="btn btn-secondary" onClick={() => onNavigate("search")}>Search</button>
      </div>
    </div>
  </div>
);

// ─── NAV + FOOTER ─────────────────────────────────────────────────────────────
const NavBar = ({ page, onNavigate, dark, setDark, searchOpen, setSearchOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Blog", page: "blog" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" onClick={() => onNavigate("home")}>
            <img src={AUTHOR.avatar} alt={AUTHOR.name} />
            Akela Bhai
          </a>
          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.label}>
                <a className={page === l.page ? "active" : ""} onClick={() => onNavigate(l.page)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button className="icon-btn" onClick={() => { setSearchOpen(!searchOpen); onNavigate("search"); }} title="Search">
              <Icon name="search" size={17} />
            </button>
            <button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle theme">
              <Icon name={dark ? "sun" : "moon"} size={17} />
            </button>
            <button className="icon-btn mobile-menu-btn" onClick={() => setMobileOpen(true)} title="Menu">
              <Icon name="menu" size={17} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Menu</span>
          <button className="icon-btn" onClick={() => setMobileOpen(false)}><Icon name="close" size={18} /></button>
        </div>
        {navLinks.map(l => (
          <a key={l.label} onClick={() => { onNavigate(l.page); setMobileOpen(false); }}>{l.label}</a>
        ))}
        <a onClick={() => { onNavigate("search"); setMobileOpen(false); }}>Search</a>
        <a onClick={() => { onNavigate("privacy"); setMobileOpen(false); }}>Privacy Policy</a>
        <a onClick={() => { onNavigate("terms"); setMobileOpen(false); }}>Terms</a>
      </div>
    </>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", cursor: "pointer" }} onClick={() => onNavigate("home")}>
            Akela Bhai
          </div>
          <p>Web designer, developer & writer. Sharing knowledge about design and development on the modern web.</p>
          <div style={{ marginTop: 16 }}><SocialLinks size={16} /></div>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          {[["home", "Home"], ["blog", "Blog"], ["about", "About"], ["contact", "Contact"]].map(([p, l]) => (
            <a key={p} onClick={() => onNavigate(p)}>{l}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Categories</h4>
          {CATEGORIES.slice(0, 5).map(c => (
            <a key={c} onClick={() => onNavigate("category", c)}>{c}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a onClick={() => onNavigate("privacy")}>Privacy Policy</a>
          <a onClick={() => onNavigate("terms")}>Terms & Conditions</a>
          <a onClick={() => onNavigate("search")}>Search</a>
          <a href="#rss" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={(e) => e.preventDefault()}>
            <Icon name="rss" size={13} /> RSS Feed
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Akela Bhai · akelabhai.com · All rights reserved.</p>
        <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Built with Next.js &amp; ❤️
        </p>
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [route, setRoute] = useState({ page: "home", param: null });
  const [searchOpen, setSearchOpen] = useState(false);
  const mainRef = useRef(null);

  const navigate = useCallback((page, param = null) => {
    setRoute({ page, param });
    setTimeout(() => mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, []);

  const renderPage = () => {
    switch (route.page) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "blog": return <BlogPage onNavigate={navigate} />;
      case "post": return <PostPage slug={route.param} onNavigate={navigate} />;
      case "about": return <AboutPage onNavigate={navigate} />;
      case "contact": return <ContactPage />;
      case "category": return <CategoryPage category={route.param} onNavigate={navigate} />;
      case "tag": return <TagPage tag={route.param} onNavigate={navigate} />;
      case "search": return <SearchPage onNavigate={navigate} />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      default: return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app" data-dark={dark}>
      <style>{styles}</style>
      <NavBar
        page={route.page}
        onNavigate={navigate}
        dark={dark}
        setDark={setDark}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <main ref={mainRef}>{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
