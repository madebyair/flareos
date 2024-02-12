import { atom } from "@zedux/react";
import WelcomeSetup from "./welcome/WelcomeSetup.tsx";

export const setupComponent = atom('component', <WelcomeSetup />);