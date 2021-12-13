import React, { PropsWithChildren, ComponentType, useState } from "react";
import { load } from "./api";
import { AppState } from "./AppStateContext";

export const withData = (WrappedComponent: ComponentType<PropsWithChildren<{ initialState: AppState }>>) => {
    return ({ children }: PropsWithChildren<{}>) => {
        //ESTA LÍNEA ERA EL ESTADO INICIAL, EL LIBRO PIDE BORRARLA PARA IMPLEMENTAR EL LOAD.
        // const initialState:AppState = {lists:[],draggedItem:undefined}

        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined>();
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: undefined,
        });

        React.useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load();
                    setInitialState(data);
                } catch (e) {
                    setError(e);
                }
                setIsLoading(false);
            }

            fetchInitialState();
        }, []);

        //AQUI METEMOS LA LOGICA PARA NUESTRO HOC

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return (
            <WrappedComponent initialState={initialState}>
                {children}
            </WrappedComponent>
        )
    }
}