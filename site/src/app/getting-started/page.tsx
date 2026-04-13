'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Play } from 'lucide-react';

export default function GettingStartedPage() {
  return (
    <AppShell>
      <div className="content">
        <div className="gs-hero">
          <div className="gs-hero-label"><Play size={12} /> Getting Started</div>
          <h1>From Zero to <span>Validated Spec</span></h1>
          <p className="gs-hero-lead">
            Write, validate, and use an OpenSpec spec in five minutes.
            No accounts, no API keys, no SaaS dependency.
          </p>
        </div>

        <div className="gs-prereqs">
          <div className="gs-prereqs-label">Prerequisites</div>
          <p>Node.js 18+ and a terminal. That&apos;s it.</p>
        </div>

        <div className="gs-steps">
          <Link href="/getting-started/first-spec" className="gs-step-card">
            <div className="gs-step-num">01</div>
            <div className="gs-step-body">
              <h3>Write Your First Spec</h3>
              <p>Build a real spec for a Todo API. Learn patterns, blueprints, tickets, and typed dependencies.</p>
              <span className="gs-step-time">~3 min</span>
            </div>
          </Link>
          <Link href="/getting-started/validate" className="gs-step-card">
            <div className="gs-step-num">02</div>
            <div className="gs-step-body">
              <h3>Validate It</h3>
              <p>Install the CLI validator and check your spec against the v1.0 schema. See what errors look like.</p>
              <span className="gs-step-time">~1 min</span>
            </div>
          </Link>
          <Link href="/getting-started/integrate" className="gs-step-card">
            <div className="gs-step-num">03</div>
            <div className="gs-step-body">
              <h3>Use It Programmatically</h3>
              <p>Parse, validate, traverse, and convert specs in code. Build your own tools on the open format.</p>
              <span className="gs-step-time">~2 min</span>
            </div>
          </Link>
        </div>

        <div className="gs-closing">
          <p>
            The full example spec used in this guide is available for download:
            {' '}<Link href="/examples/todo-api.oschema.json">todo-api.oschema.json</Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
