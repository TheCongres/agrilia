import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-primary/40"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-primary transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="h-5 w-5 text-primary transition-all duration-300 rotate-0 scale-100" />
      )}
    </Button>
  );
}