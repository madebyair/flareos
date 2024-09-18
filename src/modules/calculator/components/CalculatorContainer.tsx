import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../assets/css/App.css"


// TODO replace calculator with launcher (or move the external app)
const CalculatorContainer = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [, i18n] = useTranslation()
    const [input, setInput] = useState("")
    const [display, setDisplay] = useState("")
    const [result, setResult] = useState("")

    useEffect(() => {
        void emit("user-request")

        void listen<User>("user-response", (r) => {
            setUser(r.payload)
            void i18n.changeLanguage(r.payload.language)
        })

        void listen<"light" | "dark">("theme-change", (event) => {
            setUser((prevUser) => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", (e) => e.preventDefault())
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            const keyMap: { [key: string]: string } = {
                "/": "÷",
                "*": "×",
                "-": "-",
                "+": "+",
                ".": ".",
                "%": "%",
                "Enter": "=",
                "Backspace": "BACKSPACE",
                "Escape": "CLR",
                "(": "(",
                ")": ")"
            }

            if (e.key in keyMap) {
                handleButtonClick(keyMap[e.key])
            } else if (!isNaN(Number(e.key))) {
                handleButtonClick(e.key)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const handleButtonClick = (value: string) => {
        if (value === "=") {
            calculateResult()
        } else if (value === "CLR") {
            setInput("")
            setDisplay("")
            setResult("")
        } else if (value === "BACKSPACE") {
            setInput((prev) => prev.slice(0, -1))
            setDisplay((prev) => prev.slice(0, -1))
        } else if (isOperator(value) && isOperator(input.slice(-1))) {
            return
        } else {
            const mappedValue = mapToMathSymbol(value)
            const formattedValue = autoInsertMultiplication(mappedValue)
            setInput((prev) => prev + formattedValue)
            setDisplay((prev) => prev + value)
        }
    }

    const isOperator = (char: string) => {
        return ["+", "-", "×", "÷", "^"].includes(char)
    }

    const autoInsertMultiplication = (currentValue: string) => {
        const lastChar = input.slice(-1)
        if (
            !isNaN(Number(lastChar)) &&
            (currentValue === "π" || currentValue === "(")
        ) {
            return "*" + currentValue
        }
        return currentValue
    }

    const calculateResult = () => {
        try {
            const evalInput = input
                .replace(/÷/g, "/")
                .replace(/×/g, "*")
                .replace(/π/g, Math.PI.toString())
                .replace(/\^/g, "**")
            const evalResult = eval(evalInput)
            setResult(evalResult.toString())
            setDisplay(evalResult.toString())
            setInput(evalResult.toString())
        } catch (error) {
            setResult("∞")
        }
    }

    const mapToMathSymbol = (symbol: string) => {
        const mathMap: { [key: string]: string } = {
            "÷": "/",
            "×": "*",
            "π": "π",
            "%": "%",
            "√": "Math.sqrt(",
            "x²": "^2"
        }
        return mathMap[symbol] || symbol
    }

    return (
        <div className={user.theme}>
            <div className="w-screen h-screen bg-slate-200 dark:bg-black">
                <div className="transition w-screen h-screen select-none dark:text-white">
                    <div className="h-2/6 bg-slate-300 dark:bg-zinc-800 flex justify-end items-center">
                        <div className="mr-4 text-2xl font-bold">
                            {result || display || "0"}
                        </div>
                    </div>
                    <div className="h-[66%] w-screen flex">
                        <div className="w-11/12 h-[96%] m-auto">
                            <div className="w-full h-16 flex justify-between mt-7">
                                <Button label="CLR" onClick={() => handleButtonClick("CLR")} />
                                <Button label="(" onClick={() => handleButtonClick("(")} />
                                <Button label=")" onClick={() => handleButtonClick(")")} />
                                <Button label="mod" onClick={() => handleButtonClick("%")} />
                                <Button label="π" onClick={() => handleButtonClick("π")} />
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <Button label="7" onClick={() => handleButtonClick("7")} />
                                <Button label="8" onClick={() => handleButtonClick("8")} />
                                <Button label="9" onClick={() => handleButtonClick("9")} />
                                <Button label="÷" onClick={() => handleButtonClick("÷")} />
                                <Button label="√" onClick={() => handleButtonClick("√")} />
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <Button label="4" onClick={() => handleButtonClick("4")} />
                                <Button label="5" onClick={() => handleButtonClick("5")} />
                                <Button label="6" onClick={() => handleButtonClick("6")} />
                                <Button label="×" onClick={() => handleButtonClick("×")} />
                                <Button label="x²" onClick={() => handleButtonClick("x²")} />
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <Button label="1" onClick={() => handleButtonClick("1")} />
                                <Button label="2" onClick={() => handleButtonClick("2")} />
                                <Button label="3" onClick={() => handleButtonClick("3")} />
                                <Button label="-" onClick={() => handleButtonClick("-")} />
                                <Button label="=" onClick={() => handleButtonClick("=")} large />
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <Button label="0" onClick={() => handleButtonClick("0")} />
                                <Button label="." onClick={() => handleButtonClick(".")} />
                                <Button label="%" onClick={() => handleButtonClick("%")} />
                                <Button label="+" onClick={() => handleButtonClick("+")} />
                                <div className="w-1/6 h-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Button = ({ label, onClick, large }: { label: string; onClick: () => void; large?: boolean }) => (
    <div
        className={`w-1/6 ${large ? "h-[112px]" : "h-12"} bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex`}
        onClick={onClick}
    >
        <h1 className={`font-medium text-${large ? "2xl" : "lg"} m-auto`}>{label}</h1>
    </div>
)

export default CalculatorContainer
