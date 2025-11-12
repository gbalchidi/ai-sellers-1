interface Window {
  analytics?: {
    track: (event: string, properties?: Record<string, any>) => void
  }
}
