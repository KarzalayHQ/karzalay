import os

BASE_DIR = r"C:\Users\mriga\.gemini\antigravity\scratch\karzalay_design_system_v2_updated"

PRIORITY_1 = {
    "app/page.tsx": {
        "top": """/* ═══════════════════════════════════════════
 * File: app/page.tsx
 * Purpose: Serves as the landing page (Home) for Karzalay.
 * Design Decisions: 
 * - Hardcoded styles and inline CSS for rapid prototyping and standalone portability.
 * - Uses a high-contrast visual hierarchy to emphasize calls to action (CTAs).
 * - Implements fluid typography and dynamic CSS variables.
 * Tokens Used: 
 * - Purples (#6C3CE0, #7C4DFF, #F3F0FE) for primary branding.
 * - Gradients and blurred orbs (radial-gradient) for depth and modern aesthetics.
 * Component Connections:
 * - Uses Navbar for top navigation.
 * - Uses CredentialCard for the Verifiable Credentials preview section.
 * ═══════════════════════════════════════════ */\n""",
        "sections": {
            "{/* ── HERO ── */}": "/* ─── Hero Section ─── */\n      // Design Decision: Uses absolute positioned blurred orbs for a dynamic background effect.\n      {/* ── HERO ── */}",
            "{/* ── MARQUEE ── */}": "/* ─── Marquee Section ─── */\n      // Creates a continuous sliding text effect to highlight key value props.\n      {/* ── MARQUEE ── */}",
            "{/* ── 3 STEPS ── */}": "/* ─── 3 Steps Section ─── */\n      // Explains the user journey in a clear, card-based layout.\n      {/* ── 3 STEPS ── */}",
            "{/* ── VERIFIABLE CREDENTIALS (Light Section) ── */}": "/* ─── Verifiable Credentials Section ─── */\n      // Displays a demo of the core platform feature (Proof of Work) using the reusable CredentialCard component.\n      {/* ── VERIFIABLE CREDENTIALS (Light Section) ── */}",
            "{/* ── CTA ── */}": "/* ─── CTA Section ─── */\n      // Strong closing call-to-action utilizing gradients to draw the eye.\n      {/* ── CTA ── */}",
            "{/* ── EXTENDED FOOTER ── */}": "/* ─── Extended Footer ─── */\n      // Contains platform links, legal, and social items.\n      {/* ── EXTENDED FOOTER ── */}"
        }
    },
    "app/onboarding/page.jsx": {
        "top": """/* ═══════════════════════════════════════════
 * File: app/onboarding/page.jsx
 * Purpose: Manages the onboarding flow for new users, routing them through profile setup, role selection, and initial tasks.
 * Design Decisions:
 * - Multi-step wizard layout with Framer Motion for smooth state transitions.
 * - Glassmorphism UI (GlassCard) for a modern, lightweight feel.
 * - Uses Next.js App Router and context for user state.
 * Tokens Used:
 * - Purples (PURPLE, PURPLE_SOFT, gradientBg) for step highlights and active states.
 * - Greens (GREEN, GREEN_SOFT) for success states and checkmarks.
 * Component Connections:
 * - Reads from AuthContext via useAuth() to check and update the current user.
 * - Interacts with /api/onboarding and /api/users to sync progress.
 * ═══════════════════════════════════════════ */\n""",
        "sections": {
            "/* ─── Animated Background Particles ─── */": "/* ─── Animated Background Particles ─── */\n// Renders floating decorative elements to make the onboarding visually engaging.",
            "/* ─── Stepper Component ─── */": "/* ─── Stepper Component ─── */\n// Visual indicator of user progress through the onboarding flow.",
            "/* ─── Role Selection Card ─── */": "/* ─── Role Selection Card ─── */\n// Reusable UI component for selecting between Member, Lead, or other roles.",
            "/* ═══════════════════════════════════════════\n   MAIN ONBOARDING PAGE": "/* ─── Main Onboarding Content Component ─── */\n// Holds all the complex local state for the various steps (Gate 1, 2, 3).\n/* ═══════════════════════════════════════════\n   MAIN ONBOARDING PAGE"
        }
    },
    "app/apply/page.jsx": {
        "top": """/* ═══════════════════════════════════════════
 * File: app/apply/page.jsx
 * Purpose: Handles the user application flow to join specific startup cohorts.
 * Design Decisions:
 * - Reuses much of the visual logic from onboarding (Stepper, GlassCard) for consistency.
 * - Relies heavily on conditional rendering based on the current 'gate' state.
 * Tokens Used:
 * - Similar to onboarding, uses PURPLE gradients for active buttons and selection borders.
 * Component Connections:
 * - Communicates with Socket.io for real-time approval updates from the Lead.
 * - Posts application data to /api/applications.
 * ═══════════════════════════════════════════ */\n""",
        "sections": {}
    }
}

for file_path, data in PRIORITY_1.items():
    full_path = os.path.join(BASE_DIR, os.path.normpath(file_path))
    if not os.path.exists(full_path):
        print(f"Skipping {file_path}, does not exist.")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add top docblock
    if "═══════════════════════════════════════════" not in content[:500]:
        # Insert after imports or at top? Let's just prepend.
        # But for 'use client' we should insert after that.
        if content.startswith('"use client";') or content.startswith("'use client';"):
            content = content.replace('"use client";', '"use client";\n\n' + data['top'], 1).replace("'use client';", "'use client';\n\n" + data['top'], 1)
        else:
            content = data['top'] + content

    # Replace sections
    for target, replacement in data.get('sections', {}).items():
        if target in content and replacement not in content:
            content = content.replace(target, replacement)
    
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Priority 1 Batch 1 done.")
