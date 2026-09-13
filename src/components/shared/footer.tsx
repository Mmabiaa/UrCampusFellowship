export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>Made for campus communities in Ghana.</span>
        <span>© {new Date().getFullYear()} UrCampusFellowship</span>
      </div>
    </footer>
  );
}
