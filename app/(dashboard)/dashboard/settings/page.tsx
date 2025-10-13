'use client'
import { useState } from 'react'
import Layout from '../../components/dashboard/Layout'
import Image from 'next/image'
export default function Settings() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Food blogger and recipe enthusiast',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      comments: true
    }
  })

  const handleSave = () => {
    // Handle settings save
    console.log('Saving settings:', settings)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-6">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <button className="px-4 py-2 bg-[#0000EE] text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Change Photo
                </button>
                <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({...settings, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={settings.bio}
                onChange={(e) => setSettings({...settings, bio: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
              />
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={settings.currentPassword}
                onChange={(e) => setSettings({...settings, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => setSettings({...settings, newPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings({...settings, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">App Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="light"
                    checked={settings.theme === 'light'}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className="mr-2 text-[#0000EE] focus:ring-[#0000EE]"
                  />
                  Light
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="dark"
                    checked={settings.theme === 'dark'}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className="mr-2 text-[#0000EE] focus:ring-[#0000EE]"
                  />
                  Dark
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {...settings.notifications, email: e.target.checked}
                    })}
                    className="text-[#0000EE] focus:ring-[#0000EE]"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Push notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {...settings.notifications, push: e.target.checked}
                    })}
                    className="text-[#0000EE] focus:ring-[#0000EE]"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Comment notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications.comments}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {...settings.notifications, comments: e.target.checked}
                    })}
                    className="text-[#0000EE] focus:ring-[#0000EE]"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#0000EE] text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0000EE] focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  )
}