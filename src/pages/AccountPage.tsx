import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Shield, Bell, Heart, Package, Settings, Edit3, Save, X, Eye, EyeOff, Trash2 } from 'lucide-react';
import { profileAPI, UserProfile, Address } from '../utils/api';

const AccountPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings className="w-5 h-5" /> },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await profileAPI.getProfile();
      setProfile(profileData);
      setEditedProfile(profileData);
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const updatedProfile = await profileAPI.updateProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setIsSaving(true);
      await profileAPI.updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
      alert('Password updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferencesUpdate = async (preferences: UserProfile['preferences']) => {
    try {
      setIsSaving(true);
      const updatedProfile = await profileAPI.updatePreferences(preferences);
      setProfile(updatedProfile);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('Please enter your password to confirm account deletion:');
    if (!password) return;

    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await profileAPI.deleteAccount(password);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      } catch (err: any) {
        setError(err.message || 'Failed to delete account');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load profile'}</p>
          <button onClick={fetchProfile} className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, and preferences</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link to="/orders" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Link>

          <Link to="/wishlist" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-lg group-hover:bg-pink-200 transition-colors">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-green-600">Verified</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(profile.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedProfile(profile);
                          }}
                          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.firstName || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">{profile.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.lastName || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">{profile.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">{profile.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">{profile.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editedProfile.dateOfBirth || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={editedProfile.gender || ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg capitalize">
                          {profile.gender?.replace('-', ' ') || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  {profile.healthGoals && profile.healthGoals.length > 0 && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Health Goals</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.healthGoals.map((goal, index) => (
                          <span
                            key={index}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.current ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.new ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.confirm ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handlePasswordUpdate}
                          disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
                      <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive order updates and account notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.preferences.emailNotifications}
                          onChange={(e) => handlePreferencesUpdate({
                            ...profile.preferences,
                            emailNotifications: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Receive important updates via text message</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.preferences.smsNotifications}
                          onChange={(e) => handlePreferencesUpdate({
                            ...profile.preferences,
                            smsNotifications: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">Marketing Emails</h3>
                        <p className="text-sm text-gray-600">Receive promotional offers and health tips</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.preferences.marketingEmails}
                          onChange={(e) => handlePreferencesUpdate({
                            ...profile.preferences,
                            marketingEmails: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Addresses</h2>
                  
                  <div className="space-y-6">
                    {profile.defaultShippingAddress && (
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">Default Shipping Address</h3>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Default</span>
                        </div>
                        <div className="text-gray-600">
                          <p>{profile.defaultShippingAddress.firstName} {profile.defaultShippingAddress.lastName}</p>
                          <p>{profile.defaultShippingAddress.address}</p>
                          <p>{profile.defaultShippingAddress.city}, {profile.defaultShippingAddress.state} {profile.defaultShippingAddress.zipCode}</p>
                          <p>{profile.defaultShippingAddress.country}</p>
                          {profile.defaultShippingAddress.phone && <p>Phone: {profile.defaultShippingAddress.phone}</p>}
                        </div>
                      </div>
                    )}

                    {profile.defaultBillingAddress && (
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">Default Billing Address</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Billing</span>
                        </div>
                        <div className="text-gray-600">
                          <p>{profile.defaultBillingAddress.firstName} {profile.defaultBillingAddress.lastName}</p>
                          <p>{profile.defaultBillingAddress.address}</p>
                          <p>{profile.defaultBillingAddress.city}, {profile.defaultBillingAddress.state} {profile.defaultBillingAddress.zipCode}</p>
                          <p>{profile.defaultBillingAddress.country}</p>
                          {profile.defaultBillingAddress.phone && <p>Phone: {profile.defaultBillingAddress.phone}</p>}
                        </div>
                      </div>
                    )}

                    {!profile.defaultShippingAddress && !profile.defaultBillingAddress && (
                      <div className="text-center py-12">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Addresses</h3>
                        <p className="text-gray-600 mb-6">Add addresses during checkout to save them for future orders</p>
                        <Link
                          to="/products"
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;