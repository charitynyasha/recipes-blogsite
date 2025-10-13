// app/dashboard/create/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Layout from '../../components/dashboard/Layout'

interface FormData {
  title: string
  description: string
  body: string
  tags: string
  category: string
  coverImage: File | null
  time: string
  people: string
  level: string
}

export default function CreateBlog() {
  const router = useRouter()
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    body: '',
    tags: '',
    category: '',
    coverImage: null,
    time: '15 MIN',
    people: '2 PEOPLE',
    level: 'EASY'
  })
  
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setFormData(prev => ({ ...prev, coverImage: file }))
      setError(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }))
    setImagePreview(null)
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    if (!formData.category) {
      setError('Category is required')
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      // Convert tags string to array
      const tagsArray = formData.tags.split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag)

      // Prepare form data for file upload
      const submitData = new FormData()
      submitData.append('title', formData.title.trim())
      submitData.append('description', formData.description.trim())
      submitData.append('body', formData.body.trim())
      submitData.append('tags', JSON.stringify(tagsArray))
      submitData.append('category', formData.category)
      submitData.append('time', formData.time)
      submitData.append('people', formData.people)
      submitData.append('level', formData.level)
      submitData.append('isDraft', isDraft.toString())
      submitData.append('author', 'John Doe')
      
      if (formData.coverImage) {
        submitData.append('coverImage', formData.coverImage)
      }

      console.log('Submitting blog post...');
      
      // Save to database
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: submitData
      })

      console.log('Response status:', response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server returned an invalid response');
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }

      console.log('Blog post created successfully:', result);

      // Reset form on success
      setFormData({
        title: '',
        description: '',
        body: '',
        tags: '',
        category: '',
        coverImage: null,
        time: '15 MIN',
        people: '2 PEOPLE',
        level: 'EASY'
      })
      setImagePreview(null)

      // Show success message and redirect
      alert(isDraft ? 'Blog saved as draft successfully!' : 'Blog published successfully!')
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error submitting blog:', error)
      setError(error instanceof Error ? error.message : 'Failed to create blog post. Please check the console for details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    'recipes',
    'techniques',
    'ingredients',
    'reviews',
    'vegetarian',
    'vegan',
    'gluten-free',
    'desserts'
  ]

  const timeOptions = ['5 MIN', '10 MIN', '15 MIN', '20 MIN', '30 MIN', '45 MIN', '1 HOUR', '2+ HOURS']
  const peopleOptions = ['1 PERSON', '2 PEOPLE', '4 PEOPLE', '6+ PEOPLE']
  const levelOptions = ['EASY', 'MEDIUM', 'HARD', 'EXPERT']

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
            <p className="text-gray-600 mt-1">Share your culinary expertise with the world</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="p-6 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors text-black/90"
                placeholder="Enter your blog title..."
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none text-black/90"
                placeholder="Brief description of your blog post..."
                disabled={isSubmitting}
              />
            </div>

            {/* Recipe Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preparation Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors text-black/90"
                  disabled={isSubmitting}
                >
                  {timeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servings
                </label>
                <select
                  name="people"
                  value={formData.people}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors text-black/90"
                  disabled={isSubmitting}
                >
                  {peopleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors text-black/90"
                  disabled={isSubmitting}
                >
                  {levelOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              {imagePreview ? (
                <div className="relative group">
                  <div className="w-full h-64 relative rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src={imagePreview} 
                      alt="Cover image preview" 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:bg-red-600"
                      disabled={isSubmitting}
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="cover-image"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="cover-image" className="cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
              )}
            </div>

            {/* Tags and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  placeholder="recipe, pasta, italian (comma separated)"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blog Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content *
              </label>
              <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
                {/* Simple Toolbar */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 flex space-x-2">
                  <button 
                    type="button" 
                    className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                    disabled={isSubmitting}
                  >
                    <strong>B</strong>
                  </button>
                  <button 
                    type="button" 
                    className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors italic"
                    disabled={isSubmitting}
                  >
                    <em>I</em>
                  </button>
                  <button 
                    type="button" 
                    className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors underline"
                    disabled={isSubmitting}
                  >
                    U
                  </button>
                  <div className="flex-1"></div>
                  <span className="text-xs text-gray-500 self-center">
                    {formData.body.length} characters
                  </span>
                </div>
                
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 resize-none text-gray-900 placeholder-gray-500 "
                  placeholder="Write your blog content here... You can include ingredients, instructions, tips, and personal stories."
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting || !formData.title.trim()}
                className="px-6 py-2 border border-yellow-600 text-yellow-600 rounded-md text-sm font-medium hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </button>
              
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !formData.title.trim() || !formData.category}
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}