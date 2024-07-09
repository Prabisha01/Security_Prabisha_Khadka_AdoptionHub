import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../apis/Api'; // Assuming you have an API function for changePassword
import wall from '../images/wall.jpg';
import Navbar from '../components/Navbar';
import UpNavbar from '../components/UpNavbar';

const UpdatedPasswords = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await changePasswordApi(id, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        // You can redirect to another page or handle it based on your requirements
        navigate('/products');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  return (
    <>
      <div>
        <UpNavbar />
      </div>
      <div>
        <Navbar />
      </div>
      <>
        <div
          style={{
            backgroundImage: `url(${wall})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '4px',
            }}
          >
            <h1
              style={{
                color: 'green',
                fontSize: '2em',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Change Your Password
            </h1>

            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ color: '#333', marginBottom: '5px' }}>
                Current Password
              </label>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="Enter your current password"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              <label style={{ color: '#333', marginBottom: '5px' }}>
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="Enter your new password"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              <label style={{ color: '#333', marginBottom: '5px' }}>
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-Enter your new password"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
            <p
              style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}
            >
              Remembered the Password?{' '}
              <a
                href="/login"
                style={{ color: '#333', textDecoration: 'none' }}
              >
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </>
    </>
  );
};

export default UpdatedPasswords;
