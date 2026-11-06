import Starfield from "./Starfield";

export default function MobileNotice() {
    return (
        <div className="mobile-notice">
            <Starfield />
            <div className="mobile-notice-card">
                <div className="brand-mark">Heliograph</div>
                <div className="mobile-notice-eyebrow">
                    <span className="dot"></span>
                    <span>Signal Lost</span>
                </div>
                <h1 className="mobile-notice-title">
                    Sorry, <span className="accent">explorer!</span>
                </h1>
                <p className="mobile-notice-text">
                    A mobile version of this site is unavailable.
                </p>
                <p className="mobile-notice-sub">
                    Please return on a larger screen to chart the solar system.
                </p>
            </div>
        </div>
    );
}
