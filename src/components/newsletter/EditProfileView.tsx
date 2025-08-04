import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Camera, Save, X, Search } from 'lucide-react';
import type { UserProfile, AccountSettings } from '../../types/newsletter';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo';

interface EditProfileViewProps {
  setCurrentView: (view: 'login' | 'home' | 'article' | 'create' | 'profile' | 'edit-profile' | 'settings') => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function EditProfileView({ setCurrentView, userProfile, setUserProfile, accountSettings, setAccountSettings }: EditProfileViewProps) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);
  const [locationSearch, setLocationSearch] = useState(userProfile.location || '');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  const searchLocations = async (query: string) => {
    if (query.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    setIsSearchingLocation(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await response.json();
      
      const suggestions = data.results?.map((item: any) => 
        `${item.name}, ${item.admin1 || ''} ${item.country || ''}`.trim().replace(/,\s*,/g, ',')
      ) || [];
      setLocationSuggestions(suggestions);
    } catch (error) {
      console.error('Error searching locations:', error);
      setLocationSuggestions([]);
    } finally {
      setIsSearchingLocation(false);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setUserProfile({...editedProfile});
      setCurrentView('profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      setFileError('Failed to save profile. Image may be too large.');
    }
  };

  const [fileError, setFileError] = useState<string>('');

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 600;
        const maxHeight = 600;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', 1.0));
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setEditedProfile({
          ...editedProfile,
          profilePicture: compressedImage
        });
      } catch (error) {
        setFileError('Failed to process image');
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button onClick={() => setCurrentView('profile')} className="header-logo">
              <Logo />
            </button>
            <span className="header-divider">|</span>
            <span className="header-title">Edit Profile</span>
          </div>
          <div className="header-actions">
            <ThemeToggle 
              accountSettings={accountSettings} 
              setAccountSettings={setAccountSettings}
              className="header-theme-toggle"
            />
            <button onClick={() => setCurrentView('profile')} className="btn-secondary">
              <X size={16} />
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="btn-primary">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          {/* Profile Picture Section */}
          <div className="edit-profile-picture">
            <div className="profile-picture-container">
              {editedProfile.profilePicture ? (
                <img src={editedProfile.profilePicture} alt="Profile" className="profile-picture" />
              ) : (
                <div className="profile-avatar-large">
                  <User size={48}/>
                </div>
              )}
              <label className="profile-picture-upload">
                <Camera size={20}/>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  title="Select an image (any size)"
                />
              </label>
            </div>
            <p className="profile-picture-hint">Click the camera icon to upload a new picture (any size - will be automatically optimized)</p>
            {fileError && <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{fileError}</p>}
          </div>

          {/* Edit Form */}
          <div className="edit-profile-form">
            <div className="form-group">
              <label className="form-label">
                <User size={16}/>
                Full Name
              </label>
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                className="form-input"
                placeholder="your.email@good.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={16} />
                Location
              </label>
              <div className="location-search-container">
                <div className="search-input-container">
                  <Search size={16} className="search-input-icon" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocationSearch(value);
                      setEditedProfile({...editedProfile, location: value});
                      setShowLocationSuggestions(true);
                      searchLocations(value);
                    }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    className="form-input"
                    style={{ paddingLeft: "2.5rem" }}
                    placeholder="Search for your location"
                  />
                </div>
                {isSearchingLocation && <div className="location-loading">Searching...</div>}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="location-suggestions">
                    {locationSuggestions.map((location, index) => (
                      <button
                        key={index}
                        className="location-suggestion"
                        onClick={() => {
                          setEditedProfile({...editedProfile, location});
                          setLocationSearch(location);
                          setShowLocationSuggestions(false);
                        }}
                      >
                        <MapPin size={14} />
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} />
                Department
              </label>
              <select
                value={editedProfile.department}
                onChange={(e) => setEditedProfile({...editedProfile, department: e.target.value})}
                className="form-input"
              >
                <option value="Product Team">Product Team</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Customer Success">Customer Success</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}