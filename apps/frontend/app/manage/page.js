export default function ManagePage() {
  // Fixed admin credentials
  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  return (
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mosketh Admin</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .login-container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: 600;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
          font-size: 14px;
        }
        input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        button {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 10px;
        }
        button:hover {
          background: #5a67d8;
        }
        .error {
          background: #fed7d7;
          color: #c53030;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 14px;
          border: 1px solid #fc8181;
        }
        .success {
          background: #c6f6d5;
          color: #22543d;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 14px;
          border: 1px solid #68d391;
        }
        .info-text {
          text-align: center;
          margin-top: 20px;
          color: #718096;
          font-size: 14px;
        }
        .info-text a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        .info-text a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="login-container" id="loginForm">
        <h1>Mosketh Admin</h1>
        <div id="message" style="display: none;"></div>
        <form onsubmit="handleLogin(event)">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" value="moskethbeautytouch@gmail.com" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="password" value="@Sultan12&crazy207103" required>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div class="info-text">
          Secure admin access only
        </div>
      </div>

      <div id="dashboard" style="display: none; width: 100%; max-width: 1200px;">
        <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
            <h2 style="color: #667eea; font-size: 24px;">Welcome, Admin</h2>
            <button onclick="logout()" style="width: auto; padding: 10px 20px; background: #e53e3e; margin-top: 0;">Logout</button>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <h3 style="margin-bottom: 15px; color: #2d3748;">Quick Actions</h3>
              <button onclick="alert('Product management coming soon!')" style="margin-bottom: 10px; background: #48bb78;">Add New Product</button>
              <button onclick="alert('Orders view coming soon!')" style="background: #4299e1;">View Orders</button>
            </div>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <h3 style="margin-bottom: 15px; color: #2d3748;">Statistics</h3>
              <p style="margin-bottom: 10px;">Total Products: <strong>0</strong></p>
              <p style="margin-bottom: 10px;">Total Orders: <strong>0</strong></p>
              <p>Total Revenue: <strong>KES 0</strong></p>
            </div>
          </div>
        </div>
      </div>

      <script>
        function handleLogin(e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const messageDiv = document.getElementById('message');
          
          if (email === '${ADMIN_EMAIL}' && password === '${ADMIN_PASSWORD}') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            messageDiv.style.display = 'none';
          } else {
            messageDiv.style.display = 'block';
            messageDiv.className = 'error';
            messageDiv.innerHTML = 'Invalid email or password';
          }
        }

        function logout() {
          document.getElementById('loginForm').style.display = 'block';
          document.getElementById('dashboard').style.display = 'none';
          document.getElementById('email').value = '${ADMIN_EMAIL}';
          document.getElementById('password').value = '${ADMIN_PASSWORD}';
        }
      </script>
    </body>
    </html>
  );
}
