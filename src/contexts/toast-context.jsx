import { useState, createContext } from 'react';

export const ToastContext = createContext(null);

export const Toast = (props) => {
    const [toasts, setToasts] = useState([]);

    const pushToast = (component) => {
        // After 3 seconds, remove the show class from DIV
        const id = newID();
        setToasts((toasts) => [
            ...toasts,
            { id: id, component, visibility: true },
        ]);
        setTimeout(() => {
            setToasts((toasts) => [
                ...toasts.filter((toast) => toast.id !== id),
            ]);
        }, 5000);
    };

    const newID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    return (
        <ToastContext.Provider value={{ pushToast }}>
            {
                toasts.map((toast) => (
                    <div key={toast.id} className={'toast bg-secondary show'}>
                        {toast.component}
                    </div>
                ))
            }
            {props.children}
        </ToastContext.Provider>
    );
}
