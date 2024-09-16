import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Component } from "react";

export const themeStorage = {
  set(value: Theme) {
    return localStorage.setItem("color-theme", value);
  },
  get(): Theme {

    return "light"

    let hasPreference = "color-theme" in localStorage;
    "color-theme" in localStorage;
    let colourTheme = localStorage.getItem("color-theme");
    let prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (colourTheme === "dark" || (!hasPreference && prefersDarkScheme)) {
      return "dark";
    } else {
      return "light";
    }
  },
};

type ThemeSwitcherProps = {
  isTransparent: boolean;
};

type Theme = "light" | "dark";

type ThemeSwitcherState = {
  theme: Theme;
};

class ThemeSwitcher extends Component<ThemeSwitcherProps, ThemeSwitcherState> {
  constructor(props: ThemeSwitcherProps) {
    super(props);

    this.state = {
      theme: "light",
    };

    this.handleThemeToggle = this.handleThemeToggle.bind(this);
  }

  componentDidMount() {
    let theme = themeStorage.get();
    this.setTheme(theme);
  }

  handleThemeToggle() {
    const newTheme: Theme = this.state.theme == "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  setTheme(newTheme: Theme) {
    this.setState({ theme: newTheme });
    themeStorage.set(newTheme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  }

  render() {
    return (
      <button aria-label="Theme switcher" className={cn(this.props.isTransparent ? "text-white" : "text-foreground")} onClick={this.handleThemeToggle}>
        {this.state.theme == "light" ? <Moon /> : <Sun />}
      </button>
    );
  }
}

export { ThemeSwitcher };
