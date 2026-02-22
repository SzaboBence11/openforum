import React from "react";

function Notification({ isOpen, onClose, children, title, bgColor }) {
    if (!isOpen) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">

            {/* Modal box */}
            <div
                className={`
                    relative w-[400px] max-w-[90%]
                    ${bgColor} backdrop-blur-xl
                    border border-white/15 max-h-28
                    rounded-3xl shadow-xl
                    p-6 text-white
                    animate-fadeInOut
                `}
            >
                {/* Header */}
                <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-semibold">
                        {title || "Modal"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="ms-auto px-3 py-1 rounded-full
                                   hover:bg-white/20 transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Notification;