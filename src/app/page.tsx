"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/layout";
import Trade from "@/components/trade";
import { Program } from '@aleohq/sdk'

export default function Home() {
    const [account, setAccount] = useState(null);
    const [executing, setExecuting] = useState(false);

    const generateAccount = async () => {
        workerRef.current?.postMessage("key");
    };

    async function execute() {
        setExecuting(true);
        workerRef.current?.postMessage("execute");
    }

    const workerRef = useRef<Worker>();

    interface AleoWorkerMessageEvent {
        type: string;
        result: any;
    }

    useEffect(() => {
        workerRef.current = new Worker(new URL("worker.ts", import.meta.url));
        workerRef.current.onmessage = (
            event: MessageEvent<AleoWorkerMessageEvent>
        ) => {
            if (event.data.type === "key") {
                setAccount(event.data.result);
            } else if (event.data.type === "execute") {
                setExecuting(false);
            }
            alert(`WebWorker Response => ${event.data.result}`);
        };
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const handleWork = useCallback(async () => {
        workerRef.current?.postMessage("execute");
    }, []);

    return (

        <Layout>
            <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
                <p className="mt-4">This is where you can manage your trades.</p>
                <div>
                    <p>
                        <button onClick={generateAccount}>
                            {account
                                ? `Account private key is ${JSON.stringify(account)}`
                                : `Click to generate account`}
                        </button>
                    </p>
                    <p>
                        <button disabled={executing} onClick={execute}>
                            {executing
                                ? `Executing...check console for details...`
                                : `Execute helloworld.aleo`}
                        </button>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
