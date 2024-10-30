import { 
    createContextId,
    useContextProvider,
    useContext,
    component$,
    Slot,
    useStore,
    $,
  } from "@builder.io/qwik";
  import type { ThemeMode, ThemeState } from "~/types/theme";
  
  export const ThemeContext = createContextId<ThemeState>("theme-context");
  
  export const ThemeProvider = component$(() => {
    const state = useStore<ThemeState>({
      mode: ((localStorage.getItem("theme") as ThemeMode) || "light"),
      setTheme: $(function(this: ThemeState, mode: ThemeMode) {
        this.mode = mode;
        localStorage.setItem("theme", mode);
        document.documentElement.setAttribute("data-theme", mode);
      })
    });
  
    useContextProvider(ThemeContext, state);
  
    return <Slot />;
  });