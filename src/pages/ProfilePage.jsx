import React, { useEffect, useState } from "react";
import axios from "../axiosIntanse.js";

const ProfilePage = () => {
  
  const id = JSON.parse(localStorage.getItem("user")).id
  
  

  const [user,setUser] = useState([]);
  const dataOfUser =async ()=>{
      await axios.get(`/single-user/${id}`).then((res)=>{
       setUser(res.data)
      }).catch((err)=>{
        console.log(err);
      })
  }
  useEffect(()=>{
    dataOfUser()
  },[])
  console.log(user,'user');
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user);
  
console.log(name,'name');

  // Handle profile picture change
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Instant preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);

    // Upload to backend
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await axios.put(`/upload-profile/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`  // Ensure you include the token for authentication
         },

        
        withCredentials: true,
      });
      
      
      // If backend returns the new avatar URL/path:
      // if (res.data.avatar) {
      //   // setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
      //   // localStorage.setItem("user", JSON.stringify({ ...user, avatar: res.data.avatar }));
      // }
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const editName = () => setEditing(true);
  const saveName = () => {
    setUser({ ...user, name });
    setEditing(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          maxWidth: "28rem",
          width: "100%",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "9999px",
                border: "4px solid #3b82f6",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                objectFit: "cover",
              }}
              src={user.avatar}
              alt="Profile"
            />
            <input
              id="avatar-upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatar-upload"
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Edit
            </label>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {editing ? (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ fontSize: "1.5rem", marginTop: "1rem" }}
                />
                <button
                  onClick={saveName}
                  style={{
                    backgroundColor: "lightgreen",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{
                    backgroundColor: "lightcoral",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginTop: "1rem",
                  }}
                >
                  {user.username}
                </h2>
              </>
            )}
          </div>
          <p style={{ color: "#6b7280" }}>{user.email}</p>
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#374151",
            }}
          >
           developer, designer, and content creator with a passion for building beautiful and functional web applications. Always eager to learn and explore new technologies.
          </p>
          <button
            onClick={editName}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1rem",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;