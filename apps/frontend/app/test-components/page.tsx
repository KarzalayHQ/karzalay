"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { 
  Layers, 
  Type, 
  ToggleLeft, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  User,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play
} from "lucide-react";
import styles from "./test-components.module.css";

export default function TestComponentsPage() {
  const [testInputVal, setTestInputVal] = useState("");
  const [testEmailVal, setTestEmailVal] = useState("founder@karzalay.com");
  const [testPassVal, setTestPassVal] = useState("secret123");

  return (
    <div className={`${styles.root} ds-container`}>
      {/* Upper Brand Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.badgeRow}>
            <Badge variant="primary">v1.0.0 Stable</Badge>
            <Badge variant="success">Academic Amethyst</Badge>
          </div>
          <h1 className="ds-heading" style={{ fontSize: "var(--font-size-h1)", marginBottom: "var(--spacing-12)" }}>
            Karzalay Core Components
          </h1>
          <p className="ds-body" style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-large)", maxWidth: "700px" }}>
            The primary building blocks of the Karzalay ecosystem. Engineered strictly with the 
            Academic Amethyst design system tokens, maintaining absolute visual elegance.
          </p>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className={styles.mainGrid}>
        
        {/* SECTION 1 — BUTTON COMPONENT */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Layers size={22} className={styles.sectionIcon} />
            <h2 className="ds-heading" style={{ fontSize: "var(--font-size-h2)", margin: 0 }}>
              Button Component
            </h2>
          </div>
          <p className="ds-body" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--spacing-24)" }}>
            A premium trigger element supporting variants, sizing options, and responsive interactions. No hardcoded sizes or colors.
          </p>

          <Card padded={true} shadow={true}>
            <div className={styles.showcaseGrid}>
              {/* Variants */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Variants</h4>
                <div className={styles.componentDemoRow}>
                  <div className={styles.demoItem}>
                    <Button variant="primary">Primary Filled</Button>
                    <span className={styles.demoLabel}>Primary Variant</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="secondary">Secondary Outline</Button>
                    <span className={styles.demoLabel}>Secondary Variant</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="danger">Danger Action</Button>
                    <span className={styles.demoLabel}>Danger Variant</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="ghost">Ghost Trigger</Button>
                    <span className={styles.demoLabel}>Ghost Variant</span>
                  </div>
                </div>
              </div>

              {/* Sizing */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Sizing Scale</h4>
                <div className={styles.componentDemoRowAligned}>
                  <div className={styles.demoItem}>
                    <Button variant="primary" size="sm">Small Tag</Button>
                    <span className={styles.demoLabel}>Small (sm)</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="primary" size="md">Medium Base</Button>
                    <span className={styles.demoLabel}>Medium (md)</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="primary" size="lg">Large Hero</Button>
                    <span className={styles.demoLabel}>Large (lg)</span>
                  </div>
                </div>
              </div>

              {/* States */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Disabled State</h4>
                <div className={styles.componentDemoRow}>
                  <div className={styles.demoItem}>
                    <Button variant="primary" disabled>Primary Disabled</Button>
                    <span className={styles.demoLabel}>Disabled State</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="secondary" disabled>Secondary Disabled</Button>
                    <span className={styles.demoLabel}>Disabled State</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="danger" disabled>Danger Disabled</Button>
                    <span className={styles.demoLabel}>Disabled State</span>
                  </div>
                  <div className={styles.demoItem}>
                    <Button variant="ghost" disabled>Ghost Disabled</Button>
                    <span className={styles.demoLabel}>Disabled State</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 2 — INPUT COMPONENT */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Type size={22} className={styles.sectionIcon} />
            <h2 className="ds-heading" style={{ fontSize: "var(--font-size-h2)", margin: 0 }}>
              Input Component
            </h2>
          </div>
          <p className="ds-body" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--spacing-24)" }}>
            Standard text, email, and password types supporting labels, hover highlights, error alerts, and disabled states.
          </p>

          <Card padded={true} shadow={true}>
            <div className={styles.showcaseGrid}>
              
              {/* Types */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Input Types & Interaction</h4>
                <div className={styles.inputStack}>
                  <Input 
                    label="Company Name" 
                    type="text" 
                    placeholder="e.g. Karzalay Inc."
                    value={testInputVal}
                    onChange={(e) => setTestInputVal(e.target.value)}
                  />
                  <Input 
                    label="Business Email Address" 
                    type="email" 
                    placeholder="founder@domain.com"
                    value={testEmailVal}
                    onChange={(e) => setTestEmailVal(e.target.value)}
                  />
                  <Input 
                    label="Workspace Password" 
                    type="password" 
                    placeholder="Enter secure password"
                    value={testPassVal}
                    onChange={(e) => setTestPassVal(e.target.value)}
                  />
                </div>
              </div>

              {/* Validation States */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Interactive States</h4>
                <div className={styles.inputStack}>
                  <Input 
                    label="Active & Focused Field" 
                    type="text" 
                    placeholder="Hover or click to verify active cobalt ring"
                  />
                  <Input 
                    label="Validation Error State" 
                    type="email" 
                    error="Please provide a valid business email domain."
                    defaultValue="invalid-email@"
                  />
                  <Input 
                    label="Disabled Configuration Field" 
                    type="text" 
                    disabled 
                    defaultValue="Locked Enterprise Admin Node"
                  />
                </div>
              </div>

            </div>
          </Card>
        </section>

        {/* SECTION 3 — CARD COMPONENT */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <ToggleLeft size={22} className={styles.sectionIcon} />
            <h2 className="ds-heading" style={{ fontSize: "var(--font-size-h2)", margin: 0 }}>
              Card Component
            </h2>
          </div>
          <p className="ds-body" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--spacing-24)" }}>
            Clean modular layouts serving as the standard container. Supports customizable padding, shadow weights, and micro-hover states.
          </p>

          <div className={styles.cardShowcaseGrid}>
            <Card padded={true} shadow={true} hoverable={true}>
              <div className={styles.cardHeaderRow}>
                <Badge variant="success">Active Node</Badge>
                <ChevronRight size={16} style={{ color: "var(--color-text-secondary)" }} />
              </div>
              <h3 className="ds-heading" style={{ fontSize: "var(--font-size-h3)", marginTop: "var(--spacing-16)", marginBottom: "var(--spacing-8)" }}>
                Premium Pitch Deck
              </h3>
              <p className="ds-body" style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", margin: 0 }}>
                A highly dynamic, premium card. Hover over it to observe smooth elevation, scaling, and border tint updates.
              </p>
            </Card>

            <Card padded={true} shadow={true}>
              <div className={styles.cardHeaderRow}>
                <Badge variant="neutral">System Block</Badge>
              </div>
              <h3 className="ds-heading" style={{ fontSize: "var(--font-size-h3)", marginTop: "var(--spacing-16)", marginBottom: "var(--spacing-8)" }}>
                Static Configuration
              </h3>
              <p className="ds-body" style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", margin: 0 }}>
                A flat, standard information block with comfortable 24px inner padding, designed for dashboard logs and configuration readouts.
              </p>
            </Card>

            <Card padded={false} shadow={false} className={styles.unpaddedCard}>
              <div className={styles.unpaddedBanner}>
                <span className={styles.bannerText}>Card Media Frame</span>
              </div>
              <div style={{ padding: "var(--spacing-16)" }}>
                <h4 className="ds-heading" style={{ fontSize: "var(--font-size-body-large)", margin: 0, marginBottom: "var(--spacing-4)" }}>
                  Zero-Padding Custom Layout
                </h4>
                <p className="ds-body" style={{ fontSize: "var(--font-size-label)", color: "var(--color-text-secondary)", margin: 0 }}>
                  Excellent for rendering header banners, images, or raw grids requiring direct border alignments.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 4 — BADGE COMPONENT */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <HelpCircle size={22} className={styles.sectionIcon} />
            <h2 className="ds-heading" style={{ fontSize: "var(--font-size-h2)", margin: 0 }}>
              Badge Component
            </h2>
          </div>
          <p className="ds-body" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--spacing-24)" }}>
            Clean pill-shaped indicator labels, utilizing soft alpha transparent backgrounds calculated dynamically from core tokens.
          </p>

          <Card padded={true} shadow={true}>
            <div className={styles.showcaseGrid}>
              
              {/* Status Labels */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Status Badges (Not Started, In Progress, Done, Blocked)</h4>
                <div className={styles.badgeRowWrap}>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="neutral">
                      <Clock size={12} className={styles.badgeIcon} />
                      Not Started
                    </Badge>
                  </div>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="warning">
                      <Play size={12} className={styles.badgeIcon} />
                      In Progress
                    </Badge>
                  </div>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="success">
                      <CheckCircle2 size={12} className={styles.badgeIcon} />
                      Done
                    </Badge>
                  </div>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="danger">
                      <AlertTriangle size={12} className={styles.badgeIcon} />
                      Blocked
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Roles Labels */}
              <div className={styles.showcaseCol}>
                <h4 className={styles.colTitle}>Roles & Context Badges</h4>
                <div className={styles.badgeRowWrap}>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="primary">
                      <User size={12} className={styles.badgeIcon} />
                      Founder
                    </Badge>
                  </div>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="info">
                      <Shield size={12} className={styles.badgeIcon} />
                      Super Admin
                    </Badge>
                  </div>
                  <div className={styles.badgeWrapperItem}>
                    <Badge variant="neutral">External Guest</Badge>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </section>

      </main>

      {/* Sticky Footer Info */}
      <footer className={styles.footerNote}>
        <span className={styles.footerLabel}>Karzalay Design System v1 • Created in Pair Programming</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>
            Notion Wiki Docs <ExternalLink size={12} />
          </a>
          <a href="#" className={styles.footerLink}>
            GitHub Repository <ExternalLink size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}
