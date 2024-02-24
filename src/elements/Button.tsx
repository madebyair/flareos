const Button = ({label = "Submit", submit, disabled = false}: {label?: string, submit: () => void, disabled?: boolean}) => {
    return (
        <button onClick={submit} type="button" disabled={disabled}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-900 focus:ring-gray-700 border-gray-700 transition-all duration-150">{label}</button>
    )
}

export default Button