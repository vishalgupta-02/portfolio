import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (process.env.NODE_ENV === "development" && !projectToken) {
  throw new Error(
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
  );
}

if (process.env.NODE_ENV === "development" && !posthogHost) {
  throw new Error(
    "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
  );
}

const logExporter =
  projectToken && posthogHost
    ? new OTLPLogExporter({
        url: `${posthogHost}/i/v1/logs`,
        headers: {
          Authorization: `Bearer ${projectToken}`,
          "Content-Type": "application/json",
        },
      })
    : null;

export const posthogLogProvider = new LoggerProvider({
  resource: resourceFromAttributes({ "service.name": "portfolio-nextjs" }),
  processors: logExporter ? [new BatchLogRecordProcessor({ exporter: logExporter })] : [],
});

export const posthogLog = posthogLogProvider.getLogger("portfolio-posthog-logs");

export function register() {}
