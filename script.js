const authButton = document.getElementById('authButton');
const statusText = document.getElementById('status');

authButton.addEventListener('click', async () => {
  try {
    // Check if WebAuthn API is available
    if (!window.PublicKeyCredential) {
      statusText.textContent = 'WebAuthn is not supported on this device.';
      return;
    }

    // Create options for fingerprint authentication
    const options = {
      publicKey: {
        challenge: new Uint8Array(32), // Use random challenge from your server in production
        rpId: window.location.hostname,
        userVerification: 'required',
      },
    };

    // Request fingerprint authentication from the user
    const credential = await navigator.credentials.get(options);

    if (credential) {
      statusText.textContent = 'Fingerprint Authentication Successful!';
    } else {
      statusText.textContent = 'Authentication failed. Please try again.';
    }
  } catch (error) {
    console.error('Authentication Error:', error);
    statusText.textContent = `Error: ${error.message}`;
  }
});
