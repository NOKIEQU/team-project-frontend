"use client";

function RegisterPage() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#1c1c1c',
        },
        navSpace: {
            height: '60px',
            width: '100%',
            backgroundColor: '#000',
        },
        contentArea: {
            display: 'flex',
            flex: 1,
        },
        leftPanel: {
            flex: 1.8,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: '#fff',
        },
        rightPanel: {
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            marginLeft: '20px',
        },
        formWrapper: {
            width: '100%',
            maxWidth: '400px',
        },
        title: {
            color: '#fff',
            fontSize: '2rem',
            marginBottom: '15px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        divider: {
            width: '100px',
            height: '1.5px',
            backgroundColor: '#f6a302',
            margin: '0 auto 20px',
        },
        inputBox: {
            width: '100%',
            padding: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1.5px solid #f6a302',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
        },
        labelText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            marginBottom: '5px',
        },
        dobInputBox: {
            width: '33%',
            padding: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1.5px solid #f6a302',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#f6a302',
            color: '#1c1c1c',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '15px',
        },
        footerText: {
            marginTop: '10px',
            color: '#fff',
            fontSize: '0.9rem',
            textAlign: 'center',
        },
        link: {
            color: '#f6a302',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        checkboxGroup: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#e08c00';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '#f6a302';
    };

    return (
        <div style={styles.container}>
            <div style={styles.navSpace}></div>
            <div style={styles.contentArea}>
                <div style={styles.leftPanel}>
                    <img
                        src="/left-background.png"
                        alt="Left Side"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            objectFit: 'cover',
                            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <polygon
                                points="77.5,0 85,0 65,100 55,100"
                                fill="rgba(255, 165, 0, 0.4)"
                            />
                            <polygon
                                points="90,0 100,0 80,100 70,100"
                                fill="rgba(255, 165, 0, 0.8)"
                            />
                        </svg>
                    </div>
                    <div
                        style={{
                            zIndex: 3,
                            position: 'relative',
                            padding: '30px',
                            maxWidth: '500px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                color: '#fff',
                            }}
                        >
                            WE ARE ON <span style={{ color: '#f6a302' }}>TOP</span> OF OUR GAMES
                        </h1>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#fff' }}>
                            Join us for endless excitement and unforgettable gaming adventures.
                        </p>
                    </div>
                </div>
                <div style={styles.rightPanel}>
                    <h2 style={styles.title}>CREATE ACCOUNT</h2>
                    <div style={styles.divider}></div>
                    <form style={styles.formWrapper}>
                        <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={styles.labelText}>First Name</label>
                                <input type="text" placeholder="First Name" style={styles.inputBox} required />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={styles.labelText}>Last Name</label>
                                <input type="text" placeholder="Last Name" style={styles.inputBox} required />
                            </div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.labelText}>Username</label>
                            <input type="text" placeholder="Enter your username" style={styles.inputBox} required />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.labelText}>Email</label>
                            <input type="email" placeholder="Enter your email" style={styles.inputBox} required />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.labelText}>Date of Birth</label>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <input
                                    type="number"
                                    placeholder="Day"
                                    min="1"
                                    max="31"
                                    style={styles.dobInputBox}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Month"
                                    min="1"
                                    max="12"
                                    style={styles.dobInputBox}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Year"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    style={styles.dobInputBox}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.labelText}>Password</label>
                            <input type="password" placeholder="Enter your password" style={styles.inputBox} required />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.labelText}>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                style={styles.inputBox}
                                required
                            />
                        </div>
                        <div style={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="newsletter"
                                style={{ marginRight: '10px', transform: 'scale(1.2)', cursor: 'pointer' }}
                            />
                            <label htmlFor="newsletter" style={{ color: '#fff', fontSize: '0.9rem' }}>
                                I would like to receive news and promotional messages from GameVault.
                            </label>
                        </div>
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            CREATE ACCOUNT
                        </button>
                        <p style={styles.footerText}>
                            Already have an account?{' '}
                            <a href="/login" style={styles.link}>
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
