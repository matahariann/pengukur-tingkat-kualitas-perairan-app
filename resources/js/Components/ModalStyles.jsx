import React from "react";

export default function ModalStyles() {
    return (
        <style>{`
            @keyframes modal-appear {
                from {
                    opacity: 0;
                    transform: scale(0.85) translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes icon-float {
                0%, 100% {
                    transform: scale(1) rotate(0deg);
                }
                50% {
                    transform: scale(1.08) rotate(5deg);
                }
            }
            
            @keyframes pulse-slow {
                0%, 100% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.1);
                }
            }

            @keyframes pulse-slower {
                0%, 100% {
                    opacity: 0.4;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.15);
                }
            }
            
            @keyframes spin-slow {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                33% {
                    transform: translate(30px, -30px) scale(1.1);
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.9);
                }
            }

            @keyframes float-delayed {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                33% {
                    transform: translate(-30px, 30px) scale(1.1);
                }
                66% {
                    transform: translate(20px, -20px) scale(0.9);
                }
            }

            @keyframes shimmer {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(100%);
                }
            }
            
            .animate-modal-appear {
                animation: modal-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .animate-icon-float {
                animation: icon-float 3s ease-in-out infinite;
            }
            
            .animate-pulse-slow {
                animation: pulse-slow 3s ease-in-out infinite;
            }

            .animate-pulse-slower {
                animation: pulse-slower 4s ease-in-out infinite;
            }
            
            .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
            }

            .animate-float {
                animation: float 20s ease-in-out infinite;
            }

            .animate-float-delayed {
                animation: float-delayed 25s ease-in-out infinite;
            }

            .animate-shimmer {
                animation: shimmer 3s ease-in-out infinite;
            }
        `}</style>
    );
}
