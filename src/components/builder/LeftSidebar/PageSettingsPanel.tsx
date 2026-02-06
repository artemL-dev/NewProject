'use client'

import { FC, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updatePageSettings, updatePageMetadata, setProjectId } from '@/store/slices/builderSlice'
import { projectService, type Project } from '@/services/projectService'
import { FolderOpen, Globe, Palette, Type, Link2 } from 'lucide-react'

export const PageSettingsPanel: FC = () => {
  const dispatch = useAppDispatch()
  const { pageSettings, pageMetadata, projectId, pageType } = useAppSelector(
    (state) => state.builder
  )
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    projectService.getProjects().then(setProjects).catch(() => {})
  }, [])

  return (
    <div className="p-4 space-y-6">
      {/* Project */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm border-b pb-2">
          <FolderOpen size={14} />
          Project
        </h3>

        <div>
          <select
            value={projectId || ''}
            onChange={(e) => dispatch(setProjectId(e.target.value || null))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">No Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {projectId && projects.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: projects.find((p) => p.id === projectId)?.color }}
              />
              <span className="text-xs text-gray-500">
                {projects.find((p) => p.id === projectId)?.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm border-b pb-2">
          <Globe size={14} />
          Page Meta
        </h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={pageMetadata.title}
            onChange={(e) => dispatch(updatePageMetadata({ title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <textarea
            value={pageMetadata.description}
            onChange={(e) => dispatch(updatePageMetadata({ description: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
          <select
            value={pageMetadata.language}
            onChange={(e) => dispatch(updatePageMetadata({ language: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="ru">Russian</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="tr">Turkish</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">OG Image URL</label>
          <input
            type="text"
            value={pageMetadata.ogImage || ''}
            onChange={(e) => dispatch(updatePageMetadata({ ogImage: e.target.value || undefined }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm border-b pb-2">
          <Type size={14} />
          Typography & Layout
        </h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Font Family</label>
          <select
            value={pageSettings.fontFamily}
            onChange={(e) => dispatch(updatePageSettings({ fontFamily: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="Inter, sans-serif">Inter</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Open Sans, sans-serif">Open Sans</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Poppins, sans-serif">Poppins</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Font Size</label>
            <input
              type="number"
              value={pageSettings.baseFontSize}
              onChange={(e) => dispatch(updatePageSettings({ baseFontSize: parseInt(e.target.value) || 16 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Width</label>
            <input
              type="number"
              value={pageSettings.maxWidth}
              onChange={(e) => dispatch(updatePageSettings({ maxWidth: parseInt(e.target.value) || 480 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Padding (px)</label>
          <input
            type="number"
            value={pageSettings.padding}
            onChange={(e) => dispatch(updatePageSettings({ padding: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm border-b pb-2">
          <Palette size={14} />
          Page Colors
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Background</label>
            <input
              type="color"
              value={pageSettings.backgroundColor}
              onChange={(e) => dispatch(updatePageSettings({ backgroundColor: e.target.value }))}
              className="w-full h-9 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
            <input
              type="color"
              value={pageSettings.textColor}
              onChange={(e) => dispatch(updatePageSettings({ textColor: e.target.value }))}
              className="w-full h-9 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Primary</label>
            <input
              type="color"
              value={pageSettings.primaryColor}
              onChange={(e) => dispatch(updatePageSettings({ primaryColor: e.target.value }))}
              className="w-full h-9 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Secondary</label>
            <input
              type="color"
              value={pageSettings.secondaryColor}
              onChange={(e) => dispatch(updatePageSettings({ secondaryColor: e.target.value }))}
              className="w-full h-9 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Export Settings */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm border-b pb-2">
          <Link2 size={14} />
          Export Settings
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="forwardUtmParams"
            checked={pageSettings.forwardUtmParams || false}
            onChange={(e) => dispatch(updatePageSettings({ forwardUtmParams: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="forwardUtmParams" className="text-sm text-gray-700">
            Forward UTM parameters
          </label>
        </div>
        <p className="text-xs text-gray-400">
          Appends URL parameters to all links in exported HTML
        </p>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Favicon URL</label>
          <input
            type="text"
            value={pageSettings.faviconUrl || ''}
            onChange={(e) => dispatch(updatePageSettings({ faviconUrl: e.target.value || undefined }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Custom CSS</label>
          <textarea
            value={pageSettings.customCss || ''}
            onChange={(e) => dispatch(updatePageSettings({ customCss: e.target.value || undefined }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            placeholder="body { ... }"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Custom JS</label>
          <textarea
            value={pageSettings.customJs || ''}
            onChange={(e) => dispatch(updatePageSettings({ customJs: e.target.value || undefined }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            placeholder="console.log('hello')"
          />
        </div>
      </div>

      {/* Tracking */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 text-sm border-b pb-2">Tracking</h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Google Analytics ID</label>
          <input
            type="text"
            value={pageSettings.googleAnalyticsId || ''}
            onChange={(e) => dispatch(updatePageSettings({ googleAnalyticsId: e.target.value || undefined }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Facebook Pixel ID</label>
          <input
            type="text"
            value={pageSettings.facebookPixelId || ''}
            onChange={(e) => dispatch(updatePageSettings({ facebookPixelId: e.target.value || undefined }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="123456789"
          />
        </div>
      </div>
    </div>
  )
}
