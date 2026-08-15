import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TrustBanner from "../TrustBanner";

const baseProps = {
  visible: true,
  protocolLabel: "Trust Protocol:",
  bodyText: "Every claim is reviewable.",
  trustLabel: "Trust",
  sourcesLabel: "Sources",
  newsIntelligenceLabel: "News",
  statusText: "Content baseline needs review.",
  degraded: true,
  contentAgeDays: 5,
  factualAuditAgeDays: 6,
  executionStatusAgeDays: 7,
};

describe("TrustBanner", () => {
  it("keeps degraded freshness compact until details are requested", () => {
    const onExpandedChange = vi.fn();
    render(
      <TrustBanner
        {...baseProps}
        expanded={false}
        onExpandedChange={onExpandedChange}
        onDismiss={vi.fn()}
      />,
    );

    expect(screen.getByText("Freshness review")).toBeInTheDocument();
    expect(screen.queryByText(baseProps.statusText)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it("offers a dismiss action scoped to the current incident", () => {
    const onDismiss = vi.fn();
    render(
      <TrustBanner
        {...baseProps}
        expanded={false}
        onExpandedChange={vi.fn()}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Dismiss freshness notice until its status changes",
      }),
    );
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("labels an honest SLA score rather than penalizing in-window evidence", () => {
    render(
      <TrustBanner
        {...baseProps}
        degraded={false}
        contentAgeDays={0}
        factualAuditAgeDays={6}
        executionStatusAgeDays={7}
        expanded
        onExpandedChange={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    expect(screen.getByText("Freshness SLA")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
