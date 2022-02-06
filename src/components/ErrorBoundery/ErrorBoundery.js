import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";


/** Компонент-обёртка, ловящий ошибки компонентов, находящихся внутри него */
class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;