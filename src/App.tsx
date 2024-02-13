import "./assets/css/App.css";
import Setup from "./components/setup/Setup.tsx";
import { useAtomState } from "@zedux/react";
import { colorSchemeState } from "./state/themeState.ts";

function App() {
    const [colorScheme] = useAtomState(colorSchemeState)

  return (
      <div className={"text-black dark:text-white " + colorScheme}>
        <Setup />
      </div>
  )
}

export default App;
