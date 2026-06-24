"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
          <div className="max-w-md text-center bg-white rounded-2xl p-8 shadow-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-5xl text-error mb-4">error</span>
            <h1 className="font-headline-md text-primary font-bold mb-2">Something went wrong</h1>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              The page crashed while loading. Try refreshing, or clear site data if the problem persists.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ error: null });
                window.location.href = "/";
              }}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Reload app
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
