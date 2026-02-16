import React from "react";

function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm
                           animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal box */}
            <div
                className="
                    relative w-[500px] max-w-[90%]
                    bg-white/10 backdrop-blur-xl
                    border border-white/15
                    rounded-3xl shadow-xl
                    p-6 text-white
                    animate-fadeIn
                "
            >
                {/* Header */}
                <div className="flex items-center mb-4">
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

export default Modal;